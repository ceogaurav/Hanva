/**
 * Hanva Technologies — Centralized, Typed, Consent-Aware Analytics & GA4/GTM Layer
 * Phase 19: Non-PII, opt-in consent gated, zero duplicate scripts/events, safe on unavailability.
 *
 * Governance rules:
 * 1. Never store or emit PII (names, emails, phone numbers, company names, form field contents, or WhatsApp message text).
 * 2. Never load external GA4/GTM scripts or emit events when consent is "unset" or "denied".
 * 3. Never fabricate Measurement or Container IDs; read only validated NEXT_PUBLIC_GA_MEASUREMENT_ID / NEXT_PUBLIC_GTM_ID.
 * 4. Do NOT emit `generate_lead` on WhatsApp clicks or client-only WhatsApp handoffs. Reserve `generate_lead` strictly for verified backend confirmation.
 */

import {
  clearUtmAttribution,
  getStoredUtmAttribution,
  stageLandingUtmInMemory,
  syncUtmAttribution,
} from "@/lib/utm";

export type AnalyticsConsentState = "unset" | "granted" | "denied";

export type AllowedSaasProductName =
  | "hanva_crm"
  | "hanva_salon_software"
  | "hanva_restaurant_pos";

export type TrackedSubjectName =
  | AllowedSaasProductName
  | "digital_marketing"
  | "software_development"
  | "cloud_telephony"
  | "general_enquiry";

export type CtaLocation =
  | "header"
  | "hero"
  | "product_section"
  | "pricing_section"
  | "footer"
  | "floating_button"
  | "contact_page"
  | "article_banner"
  | "location_section"
  | "calculator_summary";

export type WhatsAppCtaType =
  | "product_demo_whatsapp"
  | "service_whatsapp"
  | "general_whatsapp"
  | "handoff_whatsapp";

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
  | "digital_marketing"
  | "software_development"
  | "other";

export type AnalyticsEventName =
  | "page_view"
  | "view_item_list"
  | "select_item"
  | "scroll_depth"
  | "contact_page_view"
  | "product_view"
  | "pricing_view"
  | "product_comparison_view"
  | "cta_view"
  | "cta_click"
  | "whatsapp_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "phone_click"
  | "demo_cta_click"
  | "pricing_calculator_start"
  | "pricing_calculator_complete";

// Legacy event names from Phase 11 retained solely as alias input mapping into Phase 19 taxonomy
export type LegacyConversionEventName =
  | AnalyticsEventName
  | "whatsapp_cta_click"
  | "phone_cta_click"
  | "demo_form_start"
  | "product_page_to_contact"
  | "contact_method_selected";

export type AnalyticsParamValue = string | number | boolean;

export interface AnalyticsEventRecord {
  event: AnalyticsEventName;
  timestamp: string;
  page_path: string;
  page_category: PageCategory;
  device_class: "mobile" | "tablet" | "desktop";
  params: Record<string, AnalyticsParamValue>;
}

declare global {
  interface Window {
    __hanvaAnalyticsQueue?: AnalyticsEventRecord[];
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_STORAGE_KEY = "hanva_analytics_consent";

const SAAS_ROUTE_PRODUCT_MAP: Record<string, { name: AllowedSaasProductName; title: string; category: string }> = {
  "/products/crm": { name: "hanva_crm", title: "Hanva CRM", category: "saas_product" },
  "/products/salon-software": { name: "hanva_salon_software", title: "Hanva Salon Software", category: "saas_product" },
  "/products/restaurant-pos": { name: "hanva_restaurant_pos", title: "Hanva Restaurant POS", category: "saas_product" },
};

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
  "whatsappurl",
  "whatsapp_url",
  "generatedurl",
  "query",
  "rawurl",
]);

let inMemoryConsentFallback: AnalyticsConsentState = "unset";
let lastTrackedPageViewPath: string | null = null;
const firedCtaViewKeys = new Set<string>();
const consentListeners = new Set<() => void>();

export function getConfiguredAnalyticsIds(): {
  gtmId: string | null;
  gaId: string | null;
  activeProvider: "gtm" | "ga4" | "unconfigured";
} {
  const rawGtm = (process.env.NEXT_PUBLIC_GTM_ID || "").trim();
  const rawGa = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "").trim();

  const gtmId = /^GTM-[A-Z0-9]{4,20}$/.test(rawGtm) ? rawGtm : null;
  const gaId = /^G-[A-Z0-9]{4,20}$/.test(rawGa) ? rawGa : null;

  if (gtmId) {
    return { gtmId, gaId, activeProvider: "gtm" };
  }
  if (gaId) {
    return { gtmId, gaId, activeProvider: "ga4" };
  }
  return { gtmId: null, gaId: null, activeProvider: "unconfigured" };
}

export function getAnalyticsConsent(): AnalyticsConsentState {
  if (typeof window === "undefined") return "unset";
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw === "granted" || raw === "denied") {
      return raw;
    }
    return inMemoryConsentFallback;
  } catch {
    return inMemoryConsentFallback;
  }
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsent() === "granted";
}

export function setAnalyticsConsent(choice: "granted" | "denied"): void {
  inMemoryConsentFallback = choice;
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Fallback remains in memory if storage disabled
  }

  if (choice === "denied") {
    clearUtmAttribution();
    lastTrackedPageViewPath = null;
    if (Array.isArray(window.__hanvaAnalyticsQueue)) {
      window.__hanvaAnalyticsQueue = [];
    }
  } else {
    syncUtmAttribution(window.location.pathname || "/", true);
  }

  try {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: choice,
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  } catch {
    // Safe fallback if gtag unavailable
  }

  consentListeners.forEach((listener) => listener());
  window.dispatchEvent(new CustomEvent("hanva:consent-change", { detail: { consent: choice } }));
}

export function subscribeConsentChange(callback: () => void): () => void {
  consentListeners.add(callback);
  if (typeof window === "undefined") {
    return () => {
      consentListeners.delete(callback);
    };
  }
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_STORAGE_KEY) callback();
  };
  const onCustom = () => callback();
  window.addEventListener("storage", onStorage);
  window.addEventListener("hanva:consent-change", onCustom);
  return () => {
    consentListeners.delete(callback);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("hanva:consent-change", onCustom);
  };
}

export function openConsentPreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("hanva:consent-open"));
}

export function normalizePathname(pathname?: string): string {
  if (!pathname) return "/";
  const clean = pathname.split("?")[0].split("#")[0] || "/";
  return clean !== "/" && !clean.endsWith("/") ? `${clean}/` : clean;
}

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
  if (pathname.startsWith("/digital-marketing")) return "digital_marketing";
  if (pathname.startsWith("/software-development")) return "software_development";
  return "other";
}

function getDeviceClass(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function sanitizeParams(
  raw: Record<string, string | number | boolean | undefined>
): Record<string, AnalyticsParamValue> {
  const safe: Record<string, AnalyticsParamValue> = {};
  for (const [key, val] of Object.entries(raw)) {
    if (val === undefined || val === null) continue;
    if (DISALLOWED_PII_KEYS.has(key.toLowerCase())) continue;
    if (typeof val === "string") {
      const cleaned = val
        .split("?")[0]
        .split("#")[0]
        .replace(/https?:\/\/wa\.me\/[^\s]*/gi, "[redacted]")
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

export function normalizeCtaLocation(raw?: string): CtaLocation {
  const val = (raw || "").toLowerCase();
  if (!val) return "hero";
  if (val.includes("header") || val.includes("drawer")) return "header";
  if (val.includes("mobile_action_bar") || val.includes("floating")) return "floating_button";
  if (val.includes("footer")) return "footer";
  if (val.includes("contact")) return "contact_page";
  if (val.includes("calculator")) return "calculator_summary";
  if (val.includes("pricing")) return "pricing_section";
  if (val.includes("article") || val.includes("resource")) return "article_banner";
  if (val.includes("location")) return "location_section";
  if (
    val.includes("saas") ||
    val.includes("products_hub") ||
    val.includes("mid") ||
    val.includes("product_section")
  ) {
    return "product_section";
  }
  if (val.includes("bottom") && (val.includes("crm") || val.includes("salon") || val.includes("pos"))) {
    return "footer";
  }
  if (val.includes("bottom")) return "footer";
  return "hero";
}

export function inferSubjectFromContext(pathOrRef?: string): TrackedSubjectName {
  const ref = (pathOrRef || "").toLowerCase();
  if (ref.includes("salon")) return "hanva_salon_software";
  if (
    ref.includes("restaurant") ||
    ref.includes("cloud-kitchen") ||
    ref === "pos" ||
    ref.includes("/pos") ||
    ref.includes("_pos")
  ) {
    return "hanva_restaurant_pos";
  }
  if (
    ref.includes("sales crm") ||
    ref.includes("hanva crm") ||
    ref.includes("ivr-crm") ||
    ref.includes("lead-management") ||
    ref.includes("crm-with-ivr") ||
    ref.includes("/crm") ||
    ref === "crm" ||
    ref.includes("crm_")
  ) {
    return "hanva_crm";
  }
  if (ref.includes("telecalling-crm")) return "cloud_telephony";
  if (
    ref.includes("digital-marketing") ||
    ref.includes("seo") ||
    ref.includes("google-ads") ||
    ref.includes("marketing")
  ) {
    return "digital_marketing";
  }
  if (
    ref.includes("software-development") ||
    ref.includes("saas-vs-custom") ||
    ref.includes("custom-crm") ||
    ref.includes("cost-factors")
  ) {
    return "software_development";
  }
  if (
    ref.includes("cloud-telephony") ||
    ref.includes("telecalling") ||
    ref.includes("ivr") ||
    ref.includes("dialer") ||
    ref.includes("virtual-numbers") ||
    ref.includes("toll-free") ||
    ref.includes("call-center") ||
    ref.includes("whatsapp-crm") ||
    ref.includes("dlt") ||
    ref.includes("obd")
  ) {
    return "cloud_telephony";
  }
  return "general_enquiry";
}

function inferCtaType(productName: TrackedSubjectName, ctaLocation: CtaLocation): WhatsAppCtaType {
  if (ctaLocation === "contact_page" && productName !== "general_enquiry") {
    return "handoff_whatsapp";
  }
  if (
    productName === "hanva_crm" ||
    productName === "hanva_salon_software" ||
    productName === "hanva_restaurant_pos"
  ) {
    return "product_demo_whatsapp";
  }
  if (productName !== "general_enquiry") {
    return "service_whatsapp";
  }
  return "general_whatsapp";
}

export function trackAnalyticsEvent(
  event: AnalyticsEventName,
  params: Record<string, string | number | boolean | undefined> = {}
): AnalyticsEventRecord | null {
  if (typeof window === "undefined") return null;

  try {
    const rawPath = window.location.pathname || "/";
    if (!hasAnalyticsConsent()) {
      // Hold landing attribution purely in ephemeral memory while consent is undecided
      if (getAnalyticsConsent() === "unset") {
        stageLandingUtmInMemory(normalizePathname(rawPath));
      }
      return null;
    }

    const pagePath = normalizePathname(rawPath);
    const utm = getStoredUtmAttribution(true) || syncUtmAttribution(pagePath, true);
    const mergedParams = sanitizeParams({
      ...(utm
        ? {
            traffic_channel: utm.traffic_channel,
            utm_source: utm.utm_source,
            utm_medium: utm.utm_medium,
            utm_campaign: utm.utm_campaign,
            utm_content: utm.utm_content,
            utm_term: utm.utm_term,
          }
        : {}),
      ...params,
      page_path: pagePath,
    });

    const record: AnalyticsEventRecord = {
      event,
      timestamp: new Date().toISOString(),
      page_path: pagePath,
      page_category: inferPageCategory(pagePath),
      device_class: getDeviceClass(),
      params: mergedParams,
    };

    if (!Array.isArray(window.__hanvaAnalyticsQueue)) {
      window.__hanvaAnalyticsQueue = [];
    }
    window.__hanvaAnalyticsQueue.push(record);
    if (window.__hanvaAnalyticsQueue.length > 100) {
      window.__hanvaAnalyticsQueue.shift();
    }

    if (process.env.NODE_ENV === "development") {
      console.debug(`[hanva:analytics] ${record.event}`, record.params);
    }

    window.dispatchEvent(new CustomEvent("hanva:analytics", { detail: record }));

    const { activeProvider } = getConfiguredAnalyticsIds();
    if (typeof window.gtag === "function" && activeProvider === "ga4") {
      window.gtag("event", record.event, {
        page_category: record.page_category,
        device_class: record.device_class,
        ...record.params,
      });
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: record.event,
        page_category: record.page_category,
        device_class: record.device_class,
        ...record.params,
      });
    }

    return record;
  } catch {
    // Analytics errors must never interrupt UI or WhatsApp navigation
    return null;
  }
}

export function resetPageViewDeduplication(): void {
  lastTrackedPageViewPath = null;
  firedCtaViewKeys.clear();
}

export function trackRouteViewEvents(pathnameInput: string, force = false): void {
  if (typeof window === "undefined") return;
  const pagePath = normalizePathname(pathnameInput);

  if (!hasAnalyticsConsent()) {
    if (getAnalyticsConsent() === "unset") {
      stageLandingUtmInMemory(pagePath);
    }
    return;
  }

  if (!force && lastTrackedPageViewPath === pagePath) {
    return;
  }
  lastTrackedPageViewPath = pagePath;
  firedCtaViewKeys.clear();

  syncUtmAttribution(pagePath, true);
  trackAnalyticsEvent("page_view", {
    page_title: typeof document !== "undefined" ? document.title.slice(0, 120) : undefined,
  });

  const cleanNoTrailing = pagePath === "/" ? "/" : pagePath.replace(/\/$/, "");
  const matchedSaas = SAAS_ROUTE_PRODUCT_MAP[cleanNoTrailing];

  if (matchedSaas) {
    trackAnalyticsEvent("product_view", {
      product_name: matchedSaas.name,
      product_category: matchedSaas.category,
    });
  } else if (cleanNoTrailing === "/products") {
    trackAnalyticsEvent("view_item_list", {
      item_list_id: "hanva_saas_products",
      item_list_name: "Hanva SaaS & Telecom Products",
      item_count: 3,
      items_csv: "hanva_crm,hanva_salon_software,hanva_restaurant_pos",
    });
    trackAnalyticsEvent("product_comparison_view", {
      comparison_scope: "saas_portfolio_matrix",
      item_count: 3,
    });
  } else if (cleanNoTrailing.startsWith("/compare/")) {
    trackAnalyticsEvent("product_comparison_view", {
      comparison_scope: cleanNoTrailing.replace("/compare/", ""),
    });
  } else if (cleanNoTrailing === "/pricing" || cleanNoTrailing === "/pricing/calculator") {
    trackAnalyticsEvent("pricing_view", {
      pricing_surface: cleanNoTrailing === "/pricing/calculator" ? "pulse_calculator" : "commercial_pricing",
    });
  } else if (cleanNoTrailing === "/company/contact") {
    trackAnalyticsEvent("contact_page_view", {
      page_category: "contact",
    });
  }
}

export function trackCtaView(options: {
  ctaLocation: string;
  productName?: TrackedSubjectName;
  ctaType?: string;
  experimentId?: string;
  variantId?: string;
}): AnalyticsEventRecord | null {
  if (typeof window === "undefined") return null;
  if (!hasAnalyticsConsent()) return null;

  const pagePath = normalizePathname(window.location.pathname || "/");
  const normalizedLocation = normalizeCtaLocation(options.ctaLocation);
  const dedupKey = `${pagePath}::${options.ctaLocation}::${options.ctaType || "section"}`;
  if (firedCtaViewKeys.has(dedupKey)) return null;
  firedCtaViewKeys.add(dedupKey);

  return trackAnalyticsEvent("cta_view", {
    product_name: options.productName || inferSubjectFromContext(pagePath),
    cta_location: normalizedLocation,
    cta_surface: options.ctaLocation,
    cta_type: options.ctaType || "conversion_section",
    experiment_id: options.experimentId,
    variant_id: options.variantId,
  });
}

export function trackCtaClick(options: {
  ctaLocation: string;
  productName?: TrackedSubjectName;
  ctaType?: string;
  experimentId?: string;
  variantId?: string;
}): AnalyticsEventRecord | null {
  const currentPath = typeof window !== "undefined" ? normalizePathname(window.location.pathname) : "/";
  const normalizedLocation = normalizeCtaLocation(options.ctaLocation);
  return trackAnalyticsEvent("cta_click", {
    product_name: options.productName || inferSubjectFromContext(currentPath),
    cta_location: normalizedLocation,
    cta_surface: options.ctaLocation,
    cta_type: options.ctaType || "primary_cta",
    experiment_id: options.experimentId,
    variant_id: options.variantId,
  });
}

export function trackWhatsAppClick(options: {
  ctaLocation: string;
  productName?: TrackedSubjectName;
  ctaType?: WhatsAppCtaType;
  contextRef?: string;
}): AnalyticsEventRecord | null {
  const currentPath = typeof window !== "undefined" ? normalizePathname(window.location.pathname) : "/";
  const normalizedLocation = normalizeCtaLocation(options.ctaLocation);
  const resolvedProduct =
    options.productName || inferSubjectFromContext(options.contextRef || currentPath);
  const resolvedType = options.ctaType || inferCtaType(resolvedProduct, normalizedLocation);

  return trackAnalyticsEvent("whatsapp_click", {
    product_name: resolvedProduct,
    cta_location: normalizedLocation,
    cta_type: resolvedType,
    cta_surface: options.ctaLocation,
  });
}

export function trackProductSelect(options: {
  productName: AllowedSaasProductName;
  itemListName: string;
  ctaLocation: string;
}): AnalyticsEventRecord | null {
  return trackAnalyticsEvent("select_item", {
    product_name: options.productName,
    item_list_name: options.itemListName,
    cta_location: normalizeCtaLocation(options.ctaLocation),
  });
}

export function trackFormStart(formName: string, firstFieldName: string): AnalyticsEventRecord | null {
  return trackAnalyticsEvent("form_start", {
    form_name: formName,
    first_field_name: firstFieldName,
  });
}

export function trackFormError(
  formName: string,
  errorFields: string[]
): AnalyticsEventRecord | null {
  return trackAnalyticsEvent("form_error", {
    form_name: formName,
    error_count: errorFields.length,
    error_fields: errorFields.join(","),
  });
}

export function trackFormSubmit(options: {
  formName: string;
  productInterest: string;
  teamSizeBucket: string;
  handoffMethod: string;
  popupBlocked: boolean;
}): AnalyticsEventRecord | null {
  // Explicitly records client-side handoff preparation (`delivery_confirmed: false`); never fires `generate_lead`.
  return trackAnalyticsEvent("form_submit", {
    form_name: options.formName,
    product_name: inferSubjectFromContext(options.productInterest),
    selected_team_size_bucket: options.teamSizeBucket,
    handoff_method: options.handoffMethod,
    popup_blocked: options.popupBlocked,
    delivery_confirmed: false,
  });
}

/**
 * Legacy-compatible adapter preserved for existing Phase 11/14/17 call sites.
 * Normalizes event names into the Phase 19 GA4 taxonomy without emitting duplicate events.
 */
export function trackConversionEvent(
  event: LegacyConversionEventName,
  params: Record<string, string | number | boolean | undefined> = {}
): AnalyticsEventRecord | null {
  if (event === "whatsapp_cta_click") {
    return trackWhatsAppClick({
      ctaLocation: String(params.cta_location || "hero"),
      contextRef: params.context_ref ? String(params.context_ref) : undefined,
      productName: params.product_name ? (String(params.product_name) as TrackedSubjectName) : undefined,
    });
  }
  if (event === "phone_cta_click") {
    return trackAnalyticsEvent("phone_click", {
      ...params,
      cta_location: normalizeCtaLocation(params.cta_location ? String(params.cta_location) : "header"),
    });
  }
  if (event === "demo_form_start") {
    return trackAnalyticsEvent("form_start", {
      form_name: "contact_demo_enquiry",
      ...params,
    });
  }
  if (event === "product_page_to_contact") {
    return trackAnalyticsEvent("select_item", {
      product_name: inferSubjectFromContext(String(params.product_slug || "")),
      cta_location: normalizeCtaLocation(String(params.cta_location || "hero")),
      target_path: "/company/contact/",
    });
  }
  if (event === "contact_method_selected") {
    return trackAnalyticsEvent("demo_cta_click", params);
  }
  return trackAnalyticsEvent(event, params);
}
