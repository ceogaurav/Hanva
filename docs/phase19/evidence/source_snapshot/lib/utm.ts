/**
 * Hanva Technologies — Consent-Aware UTM & Marketing Attribution Helper
 * Phase 19: Supports standard UTM parameters without storing PII or bypassing user consent.
 */

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

export type TrafficChannel =
  | "paid_search"
  | "paid_social"
  | "organic_search"
  | "social"
  | "referral"
  | "direct";

export interface UtmAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  traffic_channel: TrafficChannel;
  landing_path: string;
}

const SESSION_KEY = "hanva_utm_attribution";

// Ephemeral in-memory cache of the initial entry URL attribution while consent is undecided.
// Discarded on consent rejection and never persisted until consent === "granted".
let ephemeralLandingAttribution: UtmAttribution | null = null;

function sanitizeUtmValue(raw: string | null): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  // Reject email-like or phone-like accidental PII in query values
  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(trimmed)) return undefined;
  if (/^\+?\d[\d\s-]{7,}\d$/.test(trimmed)) return undefined;
  const cleaned = trimmed.replace(/[^a-zA-Z0-9._:/ -]/g, "").slice(0, 100).trim();
  return cleaned || undefined;
}

function classifyReferrerChannel(referrer: string): TrafficChannel {
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (!host || host === "www.hanva.in" || host === "hanva.in" || host === "localhost") {
      return "direct";
    }
    if (/(?:google|bing|yahoo|duckduckgo|ecosia|search\.brave)\./i.test(host)) {
      return "organic_search";
    }
    if (/(?:facebook|fb|instagram|linkedin|lnkd|twitter|x\.com|t\.co|youtube|youtu\.be)/i.test(host)) {
      return "social";
    }
    return "referral";
  } catch {
    return "direct";
  }
}

function classifyTrafficChannel(utmSource?: string, utmMedium?: string, referrer?: string): TrafficChannel {
  const med = (utmMedium || "").toLowerCase();
  const src = (utmSource || "").toLowerCase();

  if (/(?:cpc|ppc|paid_search|sem|google_ads|adwords)/.test(med)) {
    return "paid_search";
  }
  if (/(?:paid_social|paidsocial|social_ads|meta_ads|linkedin_ads)/.test(med)) {
    return "paid_social";
  }
  if (/(?:organic)/.test(med) || (!med && /^(?:google|bing|yahoo|duckduckgo)$/.test(src))) {
    return "organic_search";
  }
  if (/(?:social)/.test(med) || /(?:linkedin|facebook|instagram|twitter|youtube|whatsapp)/.test(src)) {
    return "social";
  }
  if (utmSource || utmMedium) {
    return "referral";
  }
  return classifyReferrerChannel(referrer || "");
}

function extractAttributionFromCurrentLocation(pathname: string): UtmAttribution {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(search);
  const utm_source = sanitizeUtmValue(params.get("utm_source"));
  const utm_medium = sanitizeUtmValue(params.get("utm_medium"));
  const utm_campaign = sanitizeUtmValue(params.get("utm_campaign"));
  const utm_content = sanitizeUtmValue(params.get("utm_content"));
  const utm_term = sanitizeUtmValue(params.get("utm_term"));
  const referrer = typeof document !== "undefined" ? document.referrer : "";

  const result: UtmAttribution = {
    traffic_channel: classifyTrafficChannel(utm_source, utm_medium, referrer),
    landing_path: pathname || "/",
  };

  if (utm_source) result.utm_source = utm_source;
  if (utm_medium) result.utm_medium = utm_medium;
  if (utm_campaign) result.utm_campaign = utm_campaign;
  if (utm_content) result.utm_content = utm_content;
  if (utm_term) result.utm_term = utm_term;

  return result;
}

function hasAnyUtmParams(attr: UtmAttribution | null): boolean {
  if (!attr) return false;
  return Boolean(
    attr.utm_source || attr.utm_medium || attr.utm_campaign || attr.utm_content || attr.utm_term
  );
}

export function clearUtmAttribution(): void {
  ephemeralLandingAttribution = null;
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore storage unavailability
  }
}

export function stageLandingUtmInMemory(pathname: string): void {
  if (typeof window === "undefined") return;
  if (ephemeralLandingAttribution && hasAnyUtmParams(ephemeralLandingAttribution)) {
    return;
  }
  ephemeralLandingAttribution = extractAttributionFromCurrentLocation(pathname);
}

export function syncUtmAttribution(pathname: string, consentGranted: boolean): UtmAttribution | null {
  if (typeof window === "undefined") return null;

  if (!consentGranted) {
    // Hold only in ephemeral memory while consent is undecided (cleared explicitly on denial)
    stageLandingUtmInMemory(pathname);
    return null;
  }

  try {
    const rawExisting = window.sessionStorage.getItem(SESSION_KEY);
    if (rawExisting) {
      const parsed = JSON.parse(rawExisting) as UtmAttribution;
      if (parsed && typeof parsed.traffic_channel === "string") {
        // Preserve existing valid session attribution without overwriting during navigation
        return parsed;
      }
    }
  } catch {
    // Proceed to reconstruct safely
  }

  const currentUrlAttr = extractAttributionFromCurrentLocation(pathname);
  const chosen: UtmAttribution =
    hasAnyUtmParams(currentUrlAttr) || !ephemeralLandingAttribution
      ? currentUrlAttr
      : ephemeralLandingAttribution;

  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(chosen));
  } catch {
    // Ignore storage restriction errors
  }

  return chosen;
}

export function getStoredUtmAttribution(consentGranted: boolean): UtmAttribution | null {
  if (typeof window === "undefined" || !consentGranted) return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UtmAttribution;
    return parsed && typeof parsed.traffic_channel === "string" ? parsed : null;
  } catch {
    return null;
  }
}
