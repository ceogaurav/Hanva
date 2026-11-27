/**
 * Hanva Technologies — Website Ingestion Security, Rate Limiting, Size Guards & Redacted Observability
 * Phase 23 (Stage D): Zero-PII structured logs, SHA-256/HMAC helpers, and bounded rate limiter.
 */

import { createHash, createHmac, randomUUID } from "node:crypto";

export const MAX_LEAD_BODY_BYTES = 16 * 1024; // 16 KB strict payload ceiling
const RATE_STORE_MAX_KEYS = 5000;

interface RateLimitState {
  hits: number[];
}

const rateLimitStore = new Map<string, RateLimitState>();

export function sha256Hex(input: string): string {
  return createHash("sha256").update(input, "utf8").digest("hex");
}

export function signHmacSha256Hex(secret: string, data: string): string {
  return createHmac("sha256", secret).update(data, "utf8").digest("hex");
}

export function generateCorrelationId(): string {
  return `req_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
}

export function extractClientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }

  return "127.0.0.1";
}

export function checkRateLimit(clientKey: string): {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
} {
  const maxRequests = Math.max(1, Number(process.env.LEAD_RATE_LIMIT_MAX || 25));
  const windowMs = Math.max(1000, Number(process.env.LEAD_RATE_LIMIT_WINDOW_MS || 60_000));
  const now = Date.now();
  const cutoff = now - windowMs;

  if (rateLimitStore.size > RATE_STORE_MAX_KEYS) {
    // Evict expired or oldest keys cleanly to keep memory bounded
    for (const [key, entry] of rateLimitStore.entries()) {
      const active = entry.hits.filter((ts) => ts > cutoff);
      if (active.length === 0) {
        rateLimitStore.delete(key);
      }
      if (rateLimitStore.size <= RATE_STORE_MAX_KEYS / 2) break;
    }
  }

  const current = rateLimitStore.get(clientKey)?.hits.filter((ts) => ts > cutoff) ?? [];

  if (current.length >= maxRequests) {
    const oldestActive = current[0] ?? now;
    const retryAfterSeconds = Math.max(1, Math.ceil((oldestActive + windowMs - now) / 1000));
    rateLimitStore.set(clientKey, { hits: current });
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  current.push(now);
  rateLimitStore.set(clientKey, { hits: current });
  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - current.length),
    retryAfterSeconds: 0,
  };
}

export function checkOriginAllowed(request: Request): { ok: true } | { ok: false; origin: string } {
  const origin = request.headers.get("origin")?.trim();
  if (!origin) {
    return { ok: true };
  }

  const host = request.headers.get("host")?.trim().toLowerCase();
  const allowedHosts = new Set([
    "https://www.hanva.in",
    "https://hanva.in",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
  ]);

  if (host) {
    allowedHosts.add(`https://${host}`);
    allowedHosts.add(`http://${host}`);
  }

  if (allowedHosts.has(origin.toLowerCase())) {
    return { ok: true };
  }

  return { ok: false, origin };
}

export async function parseSafeLeadJson(
  request: Request
): Promise<
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; httpStatus: 400 | 413 | 415; errorCode: string; message: string }
> {
  const contentType = request.headers.get("content-type")?.toLowerCase() || "";
  if (!contentType.includes("application/json")) {
    return {
      ok: false,
      httpStatus: 415,
      errorCode: "UNSUPPORTED_MEDIA_TYPE",
      message: "Content-Type must be application/json.",
    };
  }

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_LEAD_BODY_BYTES) {
    return {
      ok: false,
      httpStatus: 413,
      errorCode: "PAYLOAD_TOO_LARGE",
      message: `Request body exceeds maximum allowed size of ${MAX_LEAD_BODY_BYTES} bytes.`,
    };
  }

  let rawText = "";
  try {
    rawText = await request.text();
  } catch {
    return {
      ok: false,
      httpStatus: 400,
      errorCode: "INVALID_BODY",
      message: "Unable to read request body.",
    };
  }

  if (Buffer.byteLength(rawText, "utf8") > MAX_LEAD_BODY_BYTES) {
    return {
      ok: false,
      httpStatus: 413,
      errorCode: "PAYLOAD_TOO_LARGE",
      message: `Request body exceeds maximum allowed size of ${MAX_LEAD_BODY_BYTES} bytes.`,
    };
  }

  if (!rawText.trim()) {
    return {
      ok: false,
      httpStatus: 400,
      errorCode: "EMPTY_BODY",
      message: "JSON request body is required.",
    };
  }

  try {
    const parsed: unknown = JSON.parse(rawText);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {
        ok: false,
        httpStatus: 400,
        errorCode: "INVALID_JSON_OBJECT",
        message: "Payload must be a JSON object.",
      };
    }
    return { ok: true, data: parsed as Record<string, unknown> };
  } catch {
    return {
      ok: false,
      httpStatus: 400,
      errorCode: "INVALID_JSON",
      message: "Malformed JSON request body.",
    };
  }
}

export interface RedactedAuditEvent {
  correlationId: string;
  event: string;
  httpStatus: number;
  integrationMode: string;
  productSlug?: string;
  routingQueue?: string;
  phoneCountry?: string;
  contactDigestPrefix?: string;
  leadReference?: string;
  errorCode?: string;
  latencyMs: number;
}

/**
 * Emits a zero-PII structured audit log line. Never includes plaintext names, emails, phones, notes, or secrets.
 */
export function emitRedactedLeadLog(entry: RedactedAuditEvent): void {
  const payload = JSON.stringify({
    timestamp: new Date().toISOString(),
    service: "hanva-web-lead-gateway",
    correlation_id: entry.correlationId,
    event: entry.event,
    http_status: entry.httpStatus,
    integration_mode: entry.integrationMode,
    product_slug: entry.productSlug ?? null,
    routing_queue: entry.routingQueue ?? null,
    phone_country: entry.phoneCountry ?? null,
    contact_digest_prefix: entry.contactDigestPrefix ?? null,
    lead_reference: entry.leadReference ?? null,
    error_code: entry.errorCode ?? null,
    latency_ms: entry.latencyMs,
  });

  if (entry.httpStatus >= 500) {
    console.error(payload);
  } else if (entry.httpStatus >= 400) {
    console.warn(payload);
  } else {
    console.info(payload);
  }
}
