import { NextResponse } from "next/server";
import {
  resolveCrmIntegrationMode,
  dispatchNormalizedLead,
} from "@/lib/leads/crm-adapter";
import {
  commitLeadDeduplication,
  evaluateLeadDeduplication,
} from "@/lib/leads/dedupe";
import {
  buildFallbackChannels,
  validateAndNormalizeLead,
} from "@/lib/leads/schema";
import {
  checkOriginAllowed,
  checkRateLimit,
  emitRedactedLeadLog,
  extractClientIp,
  generateCorrelationId,
  parseSafeLeadJson,
  sha256Hex,
} from "@/lib/leads/security";

export const dynamic = "force-dynamic";

function methodNotAllowedResponse() {
  return NextResponse.json(
    {
      ok: false,
      error_code: "METHOD_NOT_ALLOWED",
      message: "Only POST requests are supported on /api/leads/.",
    },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function GET() {
  return methodNotAllowedResponse();
}

export async function PUT() {
  return methodNotAllowedResponse();
}

export async function DELETE() {
  return methodNotAllowedResponse();
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const correlationId = generateCorrelationId();
  const integrationMode = resolveCrmIntegrationMode();

  const originCheck = checkOriginAllowed(request);
  if (!originCheck.ok) {
    emitRedactedLeadLog({
      correlationId,
      event: "lead_origin_rejected",
      httpStatus: 403,
      integrationMode,
      errorCode: "FORBIDDEN_ORIGIN",
      latencyMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      {
        ok: false,
        error_code: "FORBIDDEN_ORIGIN",
        correlation_id: correlationId,
        message: "Origin is not permitted for website lead ingestion.",
        fallback: buildFallbackChannels(null),
      },
      { status: 403 }
    );
  }

  const clientKey = sha256Hex(extractClientIp(request));
  const rateCheck = checkRateLimit(clientKey);
  if (!rateCheck.allowed) {
    emitRedactedLeadLog({
      correlationId,
      event: "lead_rate_limited",
      httpStatus: 429,
      integrationMode,
      errorCode: "RATE_LIMIT_EXCEEDED",
      latencyMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      {
        ok: false,
        error_code: "RATE_LIMIT_EXCEEDED",
        correlation_id: correlationId,
        message: "Too many enquiry attempts. Please wait briefly or reach us directly on WhatsApp.",
        fallback: buildFallbackChannels(null),
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateCheck.retryAfterSeconds),
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const parsedJson = await parseSafeLeadJson(request);
  if (!parsedJson.ok) {
    emitRedactedLeadLog({
      correlationId,
      event: "lead_payload_rejected",
      httpStatus: parsedJson.httpStatus,
      integrationMode,
      errorCode: parsedJson.errorCode,
      latencyMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      {
        ok: false,
        error_code: parsedJson.errorCode,
        correlation_id: correlationId,
        message: parsedJson.message,
        fallback: buildFallbackChannels(null),
      },
      { status: parsedJson.httpStatus, headers: { "Cache-Control": "no-store" } }
    );
  }

  const headerIdempotencyKey = request.headers.get("x-idempotency-key")?.trim();
  const payloadWithHeader =
    headerIdempotencyKey && !parsedJson.data.lead_idempotency_key
      ? { ...parsedJson.data, lead_idempotency_key: headerIdempotencyKey }
      : parsedJson.data;

  const validated = validateAndNormalizeLead(payloadWithHeader);
  if (!validated.ok) {
    emitRedactedLeadLog({
      correlationId,
      event: "lead_validation_failed",
      httpStatus: validated.httpStatus,
      integrationMode,
      errorCode: validated.errorCode,
      latencyMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      {
        ok: false,
        error_code: validated.errorCode,
        correlation_id: correlationId,
        message: validated.message,
        field_errors: validated.fieldErrors ?? {},
        fallback: buildFallbackChannels(null),
      },
      { status: validated.httpStatus, headers: { "Cache-Control": "no-store" } }
    );
  }

  const lead = validated.lead;
  const contactDigestPrefix = sha256Hex(lead.contact.phoneE164).slice(0, 12);
  const dedupe = evaluateLeadDeduplication(lead);

  if (dedupe.action === "idempotency_conflict") {
    emitRedactedLeadLog({
      correlationId,
      event: "lead_idempotency_conflict",
      httpStatus: 409,
      integrationMode,
      productSlug: lead.classification.slug,
      routingQueue: lead.classification.routingQueue,
      phoneCountry: lead.contact.phoneCountry,
      contactDigestPrefix,
      errorCode: "IDEMPOTENCY_KEY_CONFLICT",
      latencyMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      {
        ok: false,
        status: "idempotency_conflict",
        error_code: "IDEMPOTENCY_KEY_CONFLICT",
        correlation_id: correlationId,
        message: "Idempotency key has already been used for a different enquiry payload.",
        fallback: buildFallbackChannels(lead),
      },
      { status: 409, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (dedupe.action === "duplicate_replay") {
    emitRedactedLeadLog({
      correlationId,
      event: "lead_idempotent_replay",
      httpStatus: 200,
      integrationMode,
      productSlug: lead.classification.slug,
      routingQueue: lead.classification.routingQueue,
      phoneCountry: lead.contact.phoneCountry,
      contactDigestPrefix,
      leadReference: dedupe.leadReference,
      latencyMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      {
        ok: true,
        status: "duplicate_replay",
        duplicate_detected: true,
        correlation_id: correlationId,
        lead_reference: dedupe.leadReference,
        integration_mode: integrationMode,
        production_crm_synced: integrationMode === "live_signed_gateway",
        classification: {
          category: lead.classification.categoryLabel,
          product: lead.classification.label,
          product_slug: lead.classification.slug,
          routing_queue: lead.classification.routingQueue,
          priority: lead.classification.priority,
        },
        fallback: buildFallbackChannels(lead),
      },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (dedupe.action === "duplicate_conflict") {
    emitRedactedLeadLog({
      correlationId,
      event: "lead_duplicate_conflict",
      httpStatus: 409,
      integrationMode,
      productSlug: lead.classification.slug,
      routingQueue: lead.classification.routingQueue,
      phoneCountry: lead.contact.phoneCountry,
      contactDigestPrefix,
      leadReference: dedupe.leadReference,
      errorCode: "DUPLICATE_SUBMISSION",
      latencyMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      {
        ok: false,
        status: "duplicate_conflict",
        duplicate_detected: true,
        error_code: "DUPLICATE_SUBMISSION",
        correlation_id: correlationId,
        lead_reference: dedupe.leadReference,
        message:
          "A recent enquiry for this phone number and product already exists. Existing lead records were preserved without overwrite.",
        fallback: buildFallbackChannels(lead),
      },
      { status: 409, headers: { "Cache-Control": "no-store" } }
    );
  }

  const dispatch = await dispatchNormalizedLead(lead, dedupe.leadReference, correlationId);
  if (!dispatch.ok) {
    emitRedactedLeadLog({
      correlationId,
      event: "lead_crm_dispatch_blocked_or_failed",
      httpStatus: dispatch.httpStatus,
      integrationMode: dispatch.integrationMode,
      productSlug: lead.classification.slug,
      routingQueue: lead.classification.routingQueue,
      phoneCountry: lead.contact.phoneCountry,
      contactDigestPrefix,
      errorCode: dispatch.errorCode,
      latencyMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      {
        ok: false,
        error_code: dispatch.errorCode || "CRM_UNAVAILABLE",
        correlation_id: correlationId,
        integration_mode: dispatch.integrationMode,
        production_crm_synced: false,
        message: dispatch.message,
        fallback: buildFallbackChannels(lead),
      },
      { status: dispatch.httpStatus, headers: { "Cache-Control": "no-store" } }
    );
  }

  commitLeadDeduplication(lead, dedupe.leadReference);

  emitRedactedLeadLog({
    correlationId,
    event: "lead_created",
    httpStatus: 201,
    integrationMode: dispatch.integrationMode,
    productSlug: lead.classification.slug,
    routingQueue: lead.classification.routingQueue,
    phoneCountry: lead.contact.phoneCountry,
    contactDigestPrefix,
    leadReference: dedupe.leadReference,
    latencyMs: Date.now() - startedAt,
  });

  return NextResponse.json(
    {
      ok: true,
      status: "created",
      duplicate_detected: false,
      correlation_id: correlationId,
      lead_reference: dedupe.leadReference,
      integration_mode: dispatch.integrationMode,
      production_crm_synced: dispatch.productionCrmSynced,
      message: dispatch.message,
      classification: {
        category: lead.classification.categoryLabel,
        product: lead.classification.label,
        product_slug: lead.classification.slug,
        routing_queue: lead.classification.routingQueue,
        priority: lead.classification.priority,
      },
      normalized_contact: {
        phone_e164: lead.contact.phoneE164,
        phone_country: lead.contact.phoneCountry,
        email_provided: Boolean(lead.contact.email),
      },
      fallback: buildFallbackChannels(lead),
    },
    { status: 201, headers: { "Cache-Control": "no-store" } }
  );
}
