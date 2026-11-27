/**
 * HANVA CRM — REUSABLE AUTHENTICATION, RBAC, TENANT ISOLATION, WEBHOOK HMAC,
 * FAIL-CLOSED CRON, RATE-LIMITING & REDACTED AUDIT LOGGING REFERENCE MODULE
 *
 * Location for CRM deployment after repo reconciliation: lib/security/crm-guards.ts
 * Purpose (Phase 23.1): Eliminate duplicated/fail-open auth checks across all 51 CRM API routes.
 */

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export type CrmRole =
  | "super_admin"
  | "tenant_admin"
  | "owner"
  | "admin"
  | "team_leader"
  | "marketing_manager"
  | "kyc_team"
  | "telecaller";

const PRIVILEGED_TENANT_ROLES = new Set<CrmRole>([
  "super_admin",
  "tenant_admin",
  "owner",
  "admin",
]);

const CREATOR_GRANTABLE_ROLES: Record<CrmRole, ReadonlyArray<CrmRole>> = {
  super_admin: [
    "super_admin",
    "tenant_admin",
    "owner",
    "admin",
    "team_leader",
    "marketing_manager",
    "kyc_team",
    "telecaller",
  ],
  tenant_admin: ["admin", "team_leader", "marketing_manager", "kyc_team", "telecaller"],
  owner: ["tenant_admin", "admin", "team_leader", "marketing_manager", "kyc_team", "telecaller"],
  admin: ["team_leader", "marketing_manager", "kyc_team", "telecaller"],
  team_leader: [],
  marketing_manager: [],
  kyc_team: [],
  telecaller: [],
};

export interface VerifiedSessionContext {
  userId: string;
  tenantId: string;
  role: CrmRole;
  isActive: boolean;
}

export class SecurityConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SecurityConfigError";
  }
}

/**
 * 1. FAIL-CLOSED SECRET ACCESSOR
 * Never falls back to hardcoded strings, 'placeholder-key', or stringified undefined.
 */
export function requireServerSecret(envName: string, minLength = 16): string {
  const value = process.env[envName]?.trim();
  if (!value || value.length < minLength) {
    throw new SecurityConfigError(
      `Missing or insufficient server secret env var: ${envName}`
    );
  }
  return value;
}

/**
 * 2. CONSTANT-TIME SECRET EQUALITY
 */
export function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/**
 * 3. FAIL-CLOSED CRON AUTHENTICATION
 * Rejects missing CRON_SECRET, rejects NODE_ENV bypasses, rejects ?key= URL tokens,
 * and prevents "Bearer undefined" bypass.
 */
export function verifyCronAuthorization(authHeader: string | null): {
  ok: boolean;
  reason?: string;
} {
  let expectedSecret: string;
  try {
    expectedSecret = requireServerSecret("CRON_SECRET", 24);
  } catch {
    return { ok: false, reason: "CRON_SECRET_UNCONFIGURED" };
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { ok: false, reason: "MISSING_BEARER_TOKEN" };
  }

  const presented = authHeader.slice("Bearer ".length).trim();
  if (!presented || !constantTimeEquals(presented, expectedSecret)) {
    return { ok: false, reason: "INVALID_CRON_TOKEN" };
  }

  return { ok: true };
}

/**
 * 4. WEBHOOK HMAC-SHA256 + TIMESTAMP REPLAY PROTECTION
 * Never skips check when signature header is absent (fixes Razorpay webhook fail-open bug).
 */
export function verifyHmacWebhook(params: {
  rawBody: string;
  signatureHeader: string | null;
  secretEnvName: string;
  timestampHeader?: string | null;
  maxSkewSeconds?: number;
  signaturePrefix?: string;
}): { ok: boolean; reason?: string } {
  let secret: string;
  try {
    secret = requireServerSecret(params.secretEnvName, 16);
  } catch {
    return { ok: false, reason: "WEBHOOK_SECRET_UNCONFIGURED" };
  }

  if (!params.signatureHeader) {
    return { ok: false, reason: "MISSING_SIGNATURE" };
  }

  const prefix = params.signaturePrefix ?? "";
  const presentedHex =
    prefix && params.signatureHeader.startsWith(prefix)
      ? params.signatureHeader.slice(prefix.length).trim()
      : params.signatureHeader.trim();

  if (!/^[a-fA-F0-9]{64}$/.test(presentedHex)) {
    return { ok: false, reason: "MALFORMED_SIGNATURE" };
  }

  let signedPayload = params.rawBody;
  if (params.timestampHeader !== undefined) {
    const tsSec = Number(params.timestampHeader);
    const maxSkew = params.maxSkewSeconds ?? 300;
    const nowSec = Math.floor(Date.now() / 1000);
    if (!Number.isFinite(tsSec) || Math.abs(nowSec - tsSec) > maxSkew) {
      return { ok: false, reason: "STALE_OR_INVALID_TIMESTAMP" };
    }
    signedPayload = `${tsSec}.${params.rawBody}`;
  }

  const expectedHex = createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  if (!constantTimeEquals(presentedHex.toLowerCase(), expectedHex.toLowerCase())) {
    return { ok: false, reason: "SIGNATURE_MISMATCH" };
  }

  return { ok: true };
}

/**
 * 5. ROLE HIERARCHY & PRIVILEGE ESCALATION GUARD
 * Prevents tenant_admin / admin from creating or promoting users to super_admin,
 * and rejects any client attempt to override tenant_id unless super_admin.
 */
export function assertCanGrantRole(
  actorRole: CrmRole,
  requestedRole: CrmRole
): { allowed: boolean; reason?: string } {
  const allowedList = CREATOR_GRANTABLE_ROLES[actorRole] ?? [];
  if (!allowedList.includes(requestedRole)) {
    return {
      allowed: false,
      reason: `Role '${actorRole}' is forbidden from assigning role '${requestedRole}'.`,
    };
  }
  return { allowed: true };
}

export function resolveAuthoritativeTenantId(params: {
  sessionContext: VerifiedSessionContext;
  requestedTenantId?: string | null;
}): { ok: true; tenantId: string } | { ok: false; reason: string } {
  const { sessionContext, requestedTenantId } = params;
  if (!sessionContext.isActive || !sessionContext.tenantId) {
    return { ok: false, reason: "INACTIVE_OR_UNBOUND_USER" };
  }

  if (
    requestedTenantId &&
    requestedTenantId !== sessionContext.tenantId &&
    sessionContext.role !== "super_admin"
  ) {
    return { ok: false, reason: "CROSS_TENANT_OVERRIDE_FORBIDDEN" };
  }

  return {
    ok: true,
    tenantId:
      sessionContext.role === "super_admin" && requestedTenantId
        ? requestedTenantId
        : sessionContext.tenantId,
  };
}

export function isTenantAdminRole(role: string | null | undefined): boolean {
  return PRIVILEGED_TENANT_ROLES.has(role as CrmRole);
}

/**
 * 6. ZERO-PII STRUCTURED SECURITY AUDIT LOGGER
 * Hashes phone/email identifiers cleanly and strips tokens/passwords/message bodies.
 */
export function buildSafeSecurityAuditRecord(input: {
  eventType:
    | "auth_login_success"
    | "auth_login_failed"
    | "role_changed"
    | "tenant_membership_changed"
    | "lead_bulk_assigned"
    | "broadcast_executed"
    | "webhook_auth_failed"
    | "admin_action";
  actorUserId: string | null;
  tenantId: string | null;
  route: string;
  outcome: "allowed" | "denied" | "error";
  reason?: string;
  targetPhoneOrEmail?: string | null;
  resourceCount?: number;
}) {
  const digest = input.targetPhoneOrEmail
    ? `sha256:${createHash("sha256")
        .update(input.targetPhoneOrEmail.trim().toLowerCase(), "utf8")
        .digest("hex")
        .slice(0, 12)}`
    : null;

  return {
    timestamp: new Date().toISOString(),
    event_type: input.eventType,
    actor_user_id: input.actorUserId,
    tenant_id: input.tenantId,
    route: input.route,
    outcome: input.outcome,
    reason: input.reason ?? null,
    subject_digest: digest,
    resource_count: input.resourceCount ?? null,
  };
}
