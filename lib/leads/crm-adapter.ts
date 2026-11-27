/**
 * Hanva Technologies — Gated & Fail-Closed CRM Dispatch Adapter
 * Phase 23 (Stage D): Production CRM sync remains hard-blocked until Stage A security approval.
 * Executes either local sandbox mock validation or fail-closed 503 with zero secret fallback.
 */

import type { NormalizedLeadRecord } from "@/lib/leads/schema";
import { signHmacSha256Hex } from "@/lib/leads/security";

export type CrmIntegrationMode = "disabled" | "sandbox_mock" | "live_signed_gateway";

export interface CrmDispatchResult {
  ok: boolean;
  httpStatus: 201 | 502 | 503;
  integrationMode: CrmIntegrationMode;
  productionCrmSynced: boolean;
  crmLeadId: string | null;
  errorCode?: string;
  message: string;
}

const OUTBOUND_TIMEOUT_MS = 5000;

export function resolveCrmIntegrationMode(): CrmIntegrationMode {
  const raw = (process.env.CRM_INTEGRATION_MODE || "sandbox_mock").trim().toLowerCase();
  if (raw === "disabled") return "disabled";
  if (raw === "live_signed_gateway") return "live_signed_gateway";
  return "sandbox_mock";
}

function validateLiveGatewayGate():
  | { ready: true; url: string; token: string; hmacSecret: string }
  | { ready: false; reason: string } {
  if (process.env.CRM_STAGE_A_SECURITY_APPROVED !== "true") {
    return {
      ready: false,
      reason: "Production CRM integration is blocked pending Stage A security sign-off.",
    };
  }

  const url = process.env.CRM_WEBSITE_INGEST_URL?.trim() || "";
  const token = process.env.CRM_WEBSITE_INGEST_TOKEN?.trim() || "";
  const hmacSecret = process.env.CRM_WEBSITE_HMAC_SECRET?.trim() || "";

  if (!url.startsWith("https://") || token.length < 32 || hmacSecret.length < 32) {
    return {
      ready: false,
      reason: "Signed CRM gateway URL or high-entropy credentials are missing.",
    };
  }

  return { ready: true, url, token, hmacSecret };
}

export async function dispatchNormalizedLead(
  lead: NormalizedLeadRecord,
  leadReference: string,
  correlationId: string
): Promise<CrmDispatchResult> {
  const mode = resolveCrmIntegrationMode();

  if (mode === "disabled") {
    return {
      ok: false,
      httpStatus: 503,
      integrationMode: "disabled",
      productionCrmSynced: false,
      crmLeadId: null,
      errorCode: "CRM_INTEGRATION_BLOCKED",
      message:
        "Direct CRM lead ingestion is currently disabled. Please continue via WhatsApp, Email, or Phone.",
    };
  }

  if (mode === "sandbox_mock") {
    return {
      ok: true,
      httpStatus: 201,
      integrationMode: "sandbox_mock",
      productionCrmSynced: false,
      crmLeadId: `sandbox_${leadReference.toLowerCase()}`,
      message:
        "Validated in non-production sandbox mode only (live CRM write disabled pending Stage A remediation).",
    };
  }

  // Fail-closed live signed gateway check
  const gate = validateLiveGatewayGate();
  if (!gate.ready) {
    return {
      ok: false,
      httpStatus: 503,
      integrationMode: "live_signed_gateway",
      productionCrmSynced: false,
      crmLeadId: null,
      errorCode: "CRM_INTEGRATION_BLOCKED",
      message: gate.reason,
    };
  }

  const wirePayload = JSON.stringify({
    schema_version: lead.schemaVersion,
    lead_idempotency_key: lead.idempotencyKey,
    dedupe_fingerprint: lead.dedupeFingerprint,
    created_at: lead.createdAt,
    source: lead.source,
    lead_category: lead.classification.category,
    lead_category_label: lead.classification.categoryLabel,
    product_slug: lead.classification.slug,
    product_label: lead.classification.label,
    routing_queue: lead.classification.routingQueue,
    priority: lead.classification.priority,
    status: "new",
    contact: {
      full_name: lead.contact.fullName,
      company_name: lead.contact.companyName,
      email: lead.contact.email,
      phone_e164: lead.contact.phoneE164,
      phone_country: lead.contact.phoneCountry,
    },
    qualification: {
      team_size: lead.qualification.teamSize,
      city: lead.qualification.city,
      notes: lead.qualification.notes,
      preferred_channel: lead.qualification.preferredChannel,
    },
    attribution: {
      source_page: lead.attribution.sourcePage,
      utm_source: lead.attribution.utmSource,
      utm_medium: lead.attribution.utmMedium,
      utm_campaign: lead.attribution.utmCampaign,
    },
    consent: lead.consent,
  });

  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = signHmacSha256Hex(gate.hmacSecret, `${timestamp}.${wirePayload}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), OUTBOUND_TIMEOUT_MS);

    try {
      const response = await fetch(gate.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${gate.token}`,
          "X-Hanva-Timestamp": timestamp,
          "X-Hanva-Signature": `v1=${signature}`,
          "X-Idempotency-Key": lead.idempotencyKey,
          "X-Correlation-Id": correlationId,
        },
        body: wirePayload,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        let parsedId: string | null = null;
        try {
          const json = (await response.json()) as { lead_id?: string };
          parsedId = typeof json.lead_id === "string" ? json.lead_id : null;
        } catch {
          parsedId = null;
        }
        return {
          ok: true,
          httpStatus: 201,
          integrationMode: "live_signed_gateway",
          productionCrmSynced: true,
          crmLeadId: parsedId,
          message: "Lead recorded securely.",
        };
      }

      if (response.status >= 400 && response.status < 500) {
        return {
          ok: false,
          httpStatus: 502,
          integrationMode: "live_signed_gateway",
          productionCrmSynced: false,
          crmLeadId: null,
          errorCode: "CRM_UPSTREAM_REJECTED",
          message: "Unable to complete CRM sync cleanly. Please continue via WhatsApp or Email below.",
        };
      }
    } catch {
      clearTimeout(timeoutId);
    }
  }

  return {
    ok: false,
    httpStatus: 503,
    integrationMode: "live_signed_gateway",
    productionCrmSynced: false,
    crmLeadId: null,
    errorCode: "CRM_UPSTREAM_UNAVAILABLE",
    message: "CRM ingestion service is temporarily unavailable. Use WhatsApp, Email, or Phone below.",
  };
}
