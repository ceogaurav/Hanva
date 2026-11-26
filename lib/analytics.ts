/**
 * Hanva Technologies — Privacy-Preserving Conversion Analytics Helper
 * Phase 11: Strictly non-PII, consent-aware, zero-external-account event dispatch.
 *
 * Governance rules:
 * 1. Never store or emit PII (phone numbers, emails, names, company names, notes, or raw ?text= queries).
 * 2. Strip any URL parameter down to pathname/origin only before recording.
 * 3. `demo_form_submit` MUST NOT be invoked unless a genuine verified server backend accepts the lead.
 */

export type PageCategory =
  | "home"
  | "product"
  | "solution"
  | "industry"
  | "location"
  | "compare"
  | "resource"
  | "pricing"
  | "calculator"
  | "contact"
  | "company"
  | "other";

export type SafeAnalyticsEventName =
  | "whatsapp_cta_click"
  | "phone_cta_click"
  | "demo_cta_click"
  | "demo_form_start"
  | "pricing_calculator_start"
  | "pricing_calculator_complete"
  | "product_page_to_contact"
  | "contact_method_selected";

export interface AnalyticsEventRecord {
  event: SafeAnalyticsEventName;
  timestamp: string;
  page_path: string;
  page_category: PageCategory;
  device_class: "mobile" | "tablet" | "desktop";
  params: Record<string, string | number | boolean>;
}

declare global {
  interface Window {
    __hanvaAnalyticsQueue?: AnalyticsEventRecord[];
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const DISALLOWED_PII_KEYS = new Set([
  "fullname",
  "name",
  "email",
  "workemail",
  "phone",
  "mobile",
  "tel",
  "msisdn",
  "company",
  "companyname",
  "notes",
  "message",
  "text",
  "href",
  "url",
  "generatedurl",
]);

export function inferPageCategory(pathname: string): PageCategory {
  if (!pathname || pathname === "/") return "home";
  if (pathname.startsWith("/products")) return "product";
  if (pathname.startsWith("/solutions")) return "solution";
  if (pathname.startsWith("/industry")) return "industry";
  if (pathname.startsWith("/locations")) return "location";
  if (pathname.startsWith("/compare")) return "compare";
  if (pathname.startsWith("/resources")) return "resource";
  if (pathname.startsWith("/pricing/calculator")) return "calculator";
  if (pathname.startsWith("/pricing")) return "pricing";
  if (pathname.startsWith("/company/contact")) return "contact";
  if (pathname.startsWith("/company")) return "company";
  return "other";
}

function getDeviceClass(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function sanitizeParams(raw: Record<string, string | number | boolean | undefined>): Record<string, string | number | boolean> {
  const safe: Record<string, string | number | boolean> = {};
  for (const [key, val] of Object.entries(raw)) {
    if (val === undefined || val === null) continue;
    if (DISALLOWED_PII_KEYS.has(key.toLowerCase())) continue;
    if (typeof val === "string") {
      // Strip query strings / hashes / emails / long phone strings defensively
      const cleaned = val
        .split("?")[0]
        .split("#")[0]
        .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted]")
        .replace(/(?:\+?\d[\d\s-]{8,}\d)/g, "[redacted]")
        .slice(0, 120);
      safe[key] = cleaned;
    } else {
      safe[key] = val;
    }
  }
  return safe;
}

export function trackConversionEvent(
  event: SafeAnalyticsEventName,
  params: Record<string, string | number | boolean | undefined> = {}
): AnalyticsEventRecord | null {
  if (typeof window === "undefined") return null;

  const pagePath = window.location.pathname || "/";
  const record: AnalyticsEventRecord = {
    event,
    timestamp: new Date().toISOString(),
    page_path: pagePath,
    page_category: inferPageCategory(pagePath),
    device_class: getDeviceClass(),
    params: sanitizeParams(params),
  };

  if (!Array.isArray(window.__hanvaAnalyticsQueue)) {
    window.__hanvaAnalyticsQueue = [];
  }
  window.__hanvaAnalyticsQueue.push(record);
  if (window.__hanvaAnalyticsQueue.length > 100) {
    window.__hanvaAnalyticsQueue.shift();
  }

  // Emit DOM CustomEvent for verifiable local browser QA & future consent-gated adapter
  window.dispatchEvent(new CustomEvent("hanva:analytics", { detail: record }));

  // Forward only if an externally configured dataLayer exists (no external SDK bundled here)
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: record.event,
      page_path: record.page_path,
      page_category: record.page_category,
      device_class: record.device_class,
      ...record.params,
    });
  }

  return record;
}
