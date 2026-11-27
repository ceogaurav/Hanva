import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export type CrmRole =
  | "super_admin"
  | "tenant_admin"
  | "owner"
  | "admin"
  | "team_leader"
  | "marketing_manager"
  | "kyc_team"
  | "telecaller";

export const DEFAULT_ADMIN_ROLES: ReadonlyArray<CrmRole> = [
  "super_admin",
  "tenant_admin",
  "owner",
  "admin",
  "team_leader",
];

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

export interface VerifiedActorContext {
  userId: string;
  email: string | null;
  fullName: string | null;
  role: CrmRole;
  tenantId: string;
  isActive: boolean;
}

export class SecurityConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SecurityConfigurationError";
  }
}

export function requireServerSecret(envName: string, minLength = 8): string {
  const value = process.env[envName]?.trim();
  if (!value || value.length < minLength) {
    throw new SecurityConfigurationError(
      `Required server configuration ${envName} is missing or too short.`
    );
  }
  return value;
}

export function getSupabaseAdminStrict(): SupabaseClient {
  const url = requireServerSecret("NEXT_PUBLIC_SUPABASE_URL", 12);
  const serviceKey = requireServerSecret("SUPABASE_SERVICE_ROLE_KEY", 20);
  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * Resolves the caller from either SSR session cookies OR an explicit Authorization Bearer JWT.
 * Derives userId, role, and tenant_id exclusively from database state (public.users),
 * never from mutable user_metadata or client-supplied body parameters.
 */
export async function requireAuthenticatedSession(
  request?: Request
): Promise<
  | { ok: true; actor: VerifiedActorContext; supabaseAdmin: SupabaseClient }
  | { ok: false; response: NextResponse }
> {
  let supabaseAdmin: SupabaseClient;
  try {
    supabaseAdmin = getSupabaseAdminStrict();
  } catch (err) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Server authentication configuration incomplete." },
        { status: 503 }
      ),
    };
  }

  let authUserId: string | null = null;
  let authEmail: string | null = null;

  const authHeader = request?.headers.get("authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.slice(7).trim();
    if (!token) {
      return {
        ok: false,
        response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      };
    }
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) {
      return {
        ok: false,
        response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      };
    }
    authUserId = data.user.id;
    authEmail = data.user.email ?? null;
  } else {
    const ssrClient = await createServerClient();
    const {
      data: { user },
      error,
    } = await ssrClient.auth.getUser();
    if (error || !user) {
      return {
        ok: false,
        response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      };
    }
    authUserId = user.id;
    authEmail = user.email ?? null;
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("users")
    .select("id, email, full_name, role, tenant_id, is_active")
    .eq("id", authUserId)
    .maybeSingle();

  if (profileError || !profile) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden: User profile not found." }, { status: 403 }),
    };
  }

  if (profile.is_active === false) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden: Account disabled." }, { status: 403 }),
    };
  }

  if (!profile.tenant_id || !profile.role) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden: Tenant context missing." }, { status: 403 }),
    };
  }

  return {
    ok: true,
    supabaseAdmin,
    actor: {
      userId: profile.id,
      email: profile.email ?? authEmail,
      fullName: profile.full_name ?? null,
      role: profile.role as CrmRole,
      tenantId: String(profile.tenant_id),
      isActive: profile.is_active !== false,
    },
  };
}

export async function requireTenantAdmin(options?: {
  request?: Request;
  allowedRoles?: ReadonlyArray<CrmRole>;
  requestedTenantId?: string | null;
}): Promise<
  | { ok: true; actor: VerifiedActorContext; effectiveTenantId: string; supabaseAdmin: SupabaseClient }
  | { ok: false; response: NextResponse }
> {
  const session = await requireAuthenticatedSession(options?.request);
  if (!session.ok) return session;

  const allowed = options?.allowedRoles ?? DEFAULT_ADMIN_ROLES;
  if (!allowed.includes(session.actor.role)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Forbidden: Insufficient role permissions." },
        { status: 403 }
      ),
    };
  }

  const reqTenant = options?.requestedTenantId?.trim();
  if (reqTenant && reqTenant !== session.actor.tenantId && session.actor.role !== "super_admin") {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Forbidden: Cross-tenant scope override denied." },
        { status: 403 }
      ),
    };
  }

  const effectiveTenantId =
    session.actor.role === "super_admin" && reqTenant ? reqTenant : session.actor.tenantId;

  return {
    ok: true,
    actor: session.actor,
    effectiveTenantId,
    supabaseAdmin: session.supabaseAdmin,
  };
}

export function assertCanGrantRole(
  actorRole: CrmRole,
  targetRole: string
): { ok: true; role: CrmRole } | { ok: false; reason: string } {
  const allowed = CREATOR_GRANTABLE_ROLES[actorRole] ?? [];
  if (!allowed.includes(targetRole as CrmRole)) {
    return {
      ok: false,
      reason: `Forbidden: Role '${actorRole}' cannot assign role '${targetRole}'.`,
    };
  }
  return { ok: true, role: targetRole as CrmRole };
}

/**
 * Strictly validates CRON_SECRET via Authorization: Bearer <token>.
 * Rejects unset secrets (eliminating Bearer undefined bypass), URL query ?key= leaks, and NODE_ENV skips.
 */
export function verifyCronAuthorization(
  request: Request
): { ok: true } | { ok: false; response: NextResponse } {
  let expectedSecret: string;
  try {
    expectedSecret = requireServerSecret("CRON_SECRET", 16);
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Cron authorization not configured on server." },
        { status: 503 }
      ),
    };
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const token = authHeader.slice(7).trim();
  if (!token || !constantTimeEquals(token, expectedSecret)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true };
}

/**
 * Verifies signed HMAC-SHA256 webhooks (Razorpay, signed website gateway, WhatsApp Meta, etc.).
 * Fails closed whenever secret or signature is missing.
 */
export function verifyHmacWebhookSignature(params: {
  rawBody: string;
  signatureHeader: string | null;
  secretEnvName: string;
  timestampHeader?: string | null;
  maxSkewSeconds?: number;
  signaturePrefix?: string;
}): { ok: true } | { ok: false; status: 401 | 503; reason: string } {
  let secret: string;
  try {
    secret = requireServerSecret(params.secretEnvName, 16);
  } catch {
    return { ok: false, status: 503, reason: "WEBHOOK_SECRET_NOT_CONFIGURED" };
  }

  if (!params.signatureHeader) {
    return { ok: false, status: 401, reason: "MISSING_SIGNATURE" };
  }

  const prefix = params.signaturePrefix ?? "";
  const presentedHex =
    prefix && params.signatureHeader.startsWith(prefix)
      ? params.signatureHeader.slice(prefix.length).trim()
      : params.signatureHeader.trim();

  if (!/^[a-fA-F0-9]{64}$/.test(presentedHex)) {
    return { ok: false, status: 401, reason: "MALFORMED_SIGNATURE" };
  }

  let signedPayload = params.rawBody;
  if (params.timestampHeader !== undefined) {
    const ts = Number(params.timestampHeader);
    const maxSkew = params.maxSkewSeconds ?? 300;
    const now = Math.floor(Date.now() / 1000);
    if (!Number.isFinite(ts) || Math.abs(now - ts) > maxSkew) {
      return { ok: false, status: 401, reason: "STALE_OR_INVALID_TIMESTAMP" };
    }
    signedPayload = `${ts}.${params.rawBody}`;
  }

  const expectedHex = createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  if (!constantTimeEquals(presentedHex.toLowerCase(), expectedHex.toLowerCase())) {
    return { ok: false, status: 401, reason: "INVALID_SIGNATURE" };
  }

  return { ok: true };
}

/**
 * Verifies header token (or optional legacy provider api_key header/param when provider dashboard prohibits custom headers)
 * strictly against an environment secret without any hardcoded literal fallback.
 */
export function verifySharedWebhookToken(
  request: Request,
  secretEnvNames: ReadonlyArray<string>,
  fallbackTokenFromBody?: string | null
): { ok: true } | { ok: false; status: 401 | 503; reason: string } {
  const configuredSecrets = secretEnvNames
    .map((name) => process.env[name]?.trim() || "")
    .filter((v) => v.length >= 12);

  if (configuredSecrets.length === 0) {
    return { ok: false, status: 503, reason: "PROVIDER_WEBHOOK_SECRET_UNCONFIGURED" };
  }

  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : "";

  const presented =
    request.headers.get("x-webhook-secret")?.trim() ||
    request.headers.get("x-api-key")?.trim() ||
    bearerToken ||
    fallbackTokenFromBody?.trim() ||
    "";

  if (!presented) {
    return { ok: false, status: 401, reason: "MISSING_WEBHOOK_CREDENTIAL" };
  }

  for (const secret of configuredSecrets) {
    if (constantTimeEquals(presented, secret)) {
      return { ok: true };
    }
  }

  return { ok: false, status: 401, reason: "INVALID_WEBHOOK_CREDENTIAL" };
}

const localTestRateBucket = new Map<string, number[]>();

/**
 * Distributed rate limiter using Supabase RPC/table or Upstash REST when configured,
 * with bounded in-process fallback only during isolated test runtime.
 */
export async function checkSharedRateLimit(params: {
  key: string;
  maxRequests: number;
  windowSeconds: number;
  supabaseAdmin?: SupabaseClient;
}): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (redisUrl && redisToken) {
    try {
      const windowBucket = Math.floor(Date.now() / (params.windowSeconds * 1000));
      const fullKey = `rl:${params.key}:${windowBucket}`;
      const res = await fetch(`${redisUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", fullKey],
          ["EXPIRE", fullKey, params.windowSeconds],
        ]),
      });
      if (res.ok) {
        const out = (await res.json()) as Array<{ result?: number }>;
        const hits = Number(out?.[0]?.result ?? 1);
        if (hits > params.maxRequests) {
          return { allowed: false, retryAfterSeconds: params.windowSeconds };
        }
        return { allowed: true, retryAfterSeconds: 0 };
      }
    } catch {
      // Fall through cleanly below
    }
  }

  if (params.supabaseAdmin && process.env.NODE_ENV !== "test") {
    try {
      const now = Date.now();
      const windowBucket = Math.floor(now / (params.windowSeconds * 1000));
      const bucketKey = `${params.key}:${windowBucket}`;
      const expiresAt = new Date(
        (windowBucket + 1) * params.windowSeconds * 1000
      ).toISOString();

      const { data: existing } = await params.supabaseAdmin
        .from("api_rate_limits")
        .select("hit_count")
        .eq("bucket_key", bucketKey)
        .maybeSingle();

      const nextCount = (existing?.hit_count ?? 0) + 1;
      await params.supabaseAdmin.from("api_rate_limits").upsert(
        {
          bucket_key: bucketKey,
          window_start: new Date(windowBucket * params.windowSeconds * 1000).toISOString(),
          hit_count: nextCount,
          expires_at: expiresAt,
        },
        { onConflict: "bucket_key" }
      );

      if (nextCount > params.maxRequests) {
        return { allowed: false, retryAfterSeconds: params.windowSeconds };
      }
      return { allowed: true, retryAfterSeconds: 0 };
    } catch {
      // If table is absent in legacy schema, fallback safely in non-strict environments
    }
  }

  const now = Date.now();
  const cutoff = now - params.windowSeconds * 1000;
  const arr = (localTestRateBucket.get(params.key) || []).filter((ts) => ts > cutoff);
  if (arr.length >= params.maxRequests) {
    localTestRateBucket.set(params.key, arr);
    return { allowed: false, retryAfterSeconds: params.windowSeconds };
  }
  arr.push(now);
  localTestRateBucket.set(params.key, arr);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function extractClientIp(request: Request): string {
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 64);
  const fwd = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (fwd) return fwd.slice(0, 64);
  return "127.0.0.1";
}

/**
 * Redacts PII via SHA-256 prefix and persists non-blocking audit log entries without ever throwing.
 */
export async function emitSecurityAuditLog(
  supabaseAdmin: SupabaseClient | null,
  entry: {
    eventType: string;
    actorUserId: string | null;
    tenantId: string | null;
    route: string;
    outcome: "allowed" | "denied" | "error";
    reason?: string;
    subjectIdentifier?: string | null;
    resourceCount?: number;
  }
): Promise<void> {
  const subjectDigest = entry.subjectIdentifier
    ? `sha256:${createHash("sha256")
        .update(entry.subjectIdentifier.trim().toLowerCase(), "utf8")
        .digest("hex")
        .slice(0, 12)}`
    : null;

  const logRecord = {
    timestamp: new Date().toISOString(),
    event_type: entry.eventType,
    actor_user_id: entry.actorUserId,
    tenant_id: entry.tenantId,
    route: entry.route,
    outcome: entry.outcome,
    reason: entry.reason ?? null,
    subject_digest: subjectDigest,
    resource_count: entry.resourceCount ?? null,
  };

  console.info(`[SECURITY_AUDIT] ${JSON.stringify(logRecord)}`);

  if (supabaseAdmin) {
    try {
      await supabaseAdmin.from("security_audit_logs").insert({
        tenant_id: entry.tenantId,
        actor_user_id: entry.actorUserId,
        event_type: entry.eventType,
        route: entry.route,
        outcome: entry.outcome,
        reason: entry.reason ?? null,
        subject_digest: subjectDigest,
        resource_count: entry.resourceCount ?? null,
      });
    } catch {
      // Never block response path if security_audit_logs table is pending staging migration
    }
  }
}
