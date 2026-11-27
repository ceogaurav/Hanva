/**
 * Hanva Technologies — Website Lead Ingestion Validation, Normalization & Classification
 * Phase 23 (Stage D): Zero-trust server-side validator enforcing India + International E.164
 * phone parsing, product/service taxonomy classification, DPDP consent, and privilege stripping.
 */

import { CONTACT_CONFIG, buildWhatsAppContactUrl } from "@/lib/config";
import { sha256Hex } from "@/lib/leads/security";

export type LeadCategory = "product_enquiry" | "service_enquiry";
export type PreferredChannel = "whatsapp" | "phone" | "email" | "api_enquiry";

export interface ProductClassification {
  slug: string;
  label: string;
  category: LeadCategory;
  categoryLabel: "Product enquiry" | "Service enquiry";
  priority: "high" | "medium";
  routingQueue: string;
}

export interface NormalizedLeadRecord {
  schemaVersion: "hanva.lead.v1";
  idempotencyKey: string;
  idempotencyKeyExplicit: boolean;
  dedupeFingerprint: string;
  payloadHash: string;
  createdAt: string;
  source: "website";
  classification: ProductClassification;
  contact: {
    fullName: string;
    companyName: string | null;
    email: string | null;
    phoneE164: string;
    phoneCountry: string;
  };
  qualification: {
    teamSize: string | null;
    city: string | null;
    notes: string | null;
    preferredChannel: PreferredChannel;
  };
  attribution: {
    sourcePage: string;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
  };
  consent: {
    privacyPolicyVersion: "2026-11-26";
    consentAccepted: true;
    consentTimestamp: string;
  };
}

export interface ValidationFailure {
  ok: false;
  httpStatus: 400;
  errorCode:
    | "INVALID_INPUT"
    | "INVALID_PHONE"
    | "INVALID_EMAIL"
    | "INVALID_PRODUCT"
    | "CONSENT_REQUIRED"
    | "PRIVILEGED_FIELD_FORBIDDEN"
    | "SPAM_DETECTED";
  message: string;
  fieldErrors?: Record<string, string>;
}

export interface ValidationSuccess {
  ok: true;
  lead: NormalizedLeadRecord;
}

const FORBIDDEN_PRIVILEGED_FIELDS = new Set([
  "tenant_id",
  "tenantid",
  "organization_id",
  "organizationid",
  "org_id",
  "orgid",
  "assigned_to",
  "assignedto",
  "status",
  "role",
  "score",
  "is_admin",
  "isadmin",
  "verified_user_id",
]);

const CLASSIFICATION_TABLE: Record<string, ProductClassification> = {
  crm: {
    slug: "crm",
    label: "Hanva CRM",
    category: "product_enquiry",
    categoryLabel: "Product enquiry",
    priority: "high",
    routingQueue: "saas_crm_demo",
  },
  "salon-software": {
    slug: "salon-software",
    label: "Hanva Salon Software",
    category: "product_enquiry",
    categoryLabel: "Product enquiry",
    priority: "high",
    routingQueue: "saas_salon_demo",
  },
  "restaurant-pos": {
    slug: "restaurant-pos",
    label: "Hanva Restaurant POS",
    category: "product_enquiry",
    categoryLabel: "Product enquiry",
    priority: "high",
    routingQueue: "saas_pos_demo",
  },
  "telecalling-crm": {
    slug: "telecalling-crm",
    label: "Telecalling & Sales CRM",
    category: "product_enquiry",
    categoryLabel: "Product enquiry",
    priority: "high",
    routingQueue: "telecom_crm_desk",
  },
  "whatsapp-crm": {
    slug: "whatsapp-crm",
    label: "WhatsApp Business CRM",
    category: "product_enquiry",
    categoryLabel: "Product enquiry",
    priority: "high",
    routingQueue: "telecom_crm_desk",
  },
  "digital-marketing": {
    slug: "digital-marketing",
    label: "Digital Marketing Services (SEO, Google Ads & Social)",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "medium",
    routingQueue: "digital_marketing_desk",
  },
  "seo-services": {
    slug: "seo-services",
    label: "SEO & Organic Growth Services",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "medium",
    routingQueue: "digital_marketing_desk",
  },
  "performance-marketing": {
    slug: "performance-marketing",
    label: "Google Ads & Performance Marketing",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "medium",
    routingQueue: "digital_marketing_desk",
  },
  "social-media-marketing": {
    slug: "social-media-marketing",
    label: "Social Media Marketing Services",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "medium",
    routingQueue: "digital_marketing_desk",
  },
  "software-development": {
    slug: "software-development",
    label: "Custom Software, CRM/ERP & AI Development",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "high",
    routingQueue: "custom_engineering_desk",
  },
  "custom-crm-development": {
    slug: "custom-crm-development",
    label: "Custom CRM & ERP Development",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "high",
    routingQueue: "custom_engineering_desk",
  },
  "cloud-telephony": {
    slug: "cloud-telephony",
    label: "Smart IVR & Cloud Telephony",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "high",
    routingQueue: "cloud_telephony_desk",
  },
  "ivr-system": {
    slug: "ivr-system",
    label: "Smart IVR & Cloud Telephony",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "high",
    routingQueue: "cloud_telephony_desk",
  },
  "smart-ivr": {
    slug: "smart-ivr",
    label: "Smart IVR & Cloud Telephony",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "high",
    routingQueue: "cloud_telephony_desk",
  },
  "auto-dialer": {
    slug: "auto-dialer",
    label: "Auto & Predictive Dialers",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "high",
    routingQueue: "cloud_telephony_desk",
  },
  "predictive-dialer": {
    slug: "predictive-dialer",
    label: "Auto & Predictive Dialers",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "high",
    routingQueue: "cloud_telephony_desk",
  },
  "call-center-software": {
    slug: "call-center-software",
    label: "Auto & Predictive Dialers",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "high",
    routingQueue: "cloud_telephony_desk",
  },
  "virtual-numbers": {
    slug: "virtual-numbers",
    label: "Virtual Numbers & 1800 Toll-Free",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "medium",
    routingQueue: "cloud_telephony_desk",
  },
  "toll-free-numbers": {
    slug: "toll-free-numbers",
    label: "Virtual Numbers & 1800 Toll-Free",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "medium",
    routingQueue: "cloud_telephony_desk",
  },
  enterprise: {
    slug: "enterprise",
    label: "Enterprise Telecom & CRM Suite",
    category: "product_enquiry",
    categoryLabel: "Product enquiry",
    priority: "high",
    routingQueue: "enterprise_solutions_desk",
  },
  general: {
    slug: "general",
    label: "General Product & IT Consultation",
    category: "service_enquiry",
    categoryLabel: "Service enquiry",
    priority: "medium",
    routingQueue: "general_sales_triage",
  },
};

const LABEL_TO_SLUG: Record<string, string> = {
  "hanva crm": "crm",
  "hanva crm (sales, ivr & whatsapp)": "crm",
  "hanva salon software": "salon-software",
  "hanva restaurant pos": "restaurant-pos",
  "digital marketing services": "digital-marketing",
  "digital marketing services (seo, google ads & social)": "digital-marketing",
  "custom software development": "software-development",
  "custom software, crm/erp & ai development": "software-development",
  "smart ivr & cloud telephony": "cloud-telephony",
  "cloud telephony & telecom": "cloud-telephony",
  "auto & predictive dialers": "auto-dialer",
  "telecalling & sales crm": "telecalling-crm",
  "whatsapp business crm": "whatsapp-crm",
  "virtual numbers & 1800 toll-free": "virtual-numbers",
  "enterprise telecom & crm suite": "enterprise",
};

const XSS_PATTERN = /(<\s*script\b|javascript:|<\s*iframe\b|<\s*svg\b|on(?:error|load|click|mouseover)\s*=)/i;
const CONTROL_CHAR_EXCEPT_NEWLINE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function cleanText(raw: unknown, allowNewlines = false): string | null {
  if (typeof raw !== "string") return null;
  let cleaned = raw.replace(CONTROL_CHAR_EXCEPT_NEWLINE, " ").trim();
  if (!allowNewlines) {
    cleaned = cleaned.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  }
  return cleaned;
}

function hasInjectionRisk(value: string): boolean {
  return XSS_PATTERN.test(value);
}

function detectPrivilegedField(obj: Record<string, unknown>, depth = 0): string | null {
  if (depth > 3) return null;
  for (const [key, value] of Object.entries(obj)) {
    if (FORBIDDEN_PRIVILEGED_FIELDS.has(key.toLowerCase())) {
      return key;
    }
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nestedHit = detectPrivilegedField(value as Record<string, unknown>, depth + 1);
      if (nestedHit) return nestedHit;
    }
  }
  return null;
}

export function normalizePhoneNumber(
  rawPhone: unknown
): { ok: true; phoneE164: string; phoneCountry: string } | { ok: false; message: string } {
  const cleanedRaw = cleanText(rawPhone);
  if (!cleanedRaw) {
    return { ok: false, message: "Phone number is required." };
  }

  if (!/^[0-9+\-().\s]+$/.test(cleanedRaw)) {
    return { ok: false, message: "Phone number contains unsupported characters." };
  }

  const compact = cleanedRaw.replace(/[\s\-().]/g, "");
  const normalizedPrefix = compact.startsWith("00") ? `+${compact.slice(2)}` : compact;

  if (normalizedPrefix.startsWith("+")) {
    const digits = normalizedPrefix.slice(1);
    if (!/^[1-9]\d{8,14}$/.test(digits)) {
      return { ok: false, message: "Enter a valid international E.164 phone number (9-15 digits)." };
    }
    if (/^(\d)\1+$/.test(digits)) {
      return { ok: false, message: "Phone number appears invalid." };
    }

    if (digits.startsWith("91")) {
      const localIn = digits.slice(2);
      if (!/^[6-9]\d{9}$/.test(localIn)) {
        return { ok: false, message: "Indian +91 mobile numbers must contain 10 digits starting with 6-9." };
      }
      return { ok: true, phoneE164: `+91${localIn}`, phoneCountry: "IN" };
    }

    const countryMap: Array<[string, string]> = [
      ["971", "AE"],
      ["65", "SG"],
      ["44", "GB"],
      ["61", "AU"],
      ["1", "US_CA"],
    ];
    const matchedCountry = countryMap.find(([code]) => digits.startsWith(code))?.[1] || "INTL";
    return { ok: true, phoneE164: `+${digits}`, phoneCountry: matchedCountry };
  }

  const digitsOnly = normalizedPrefix.replace(/\D/g, "");
  if (digitsOnly.length === 10 && /^[6-9]\d{9}$/.test(digitsOnly) && !/^(\d)\1+$/.test(digitsOnly)) {
    return { ok: true, phoneE164: `+91${digitsOnly}`, phoneCountry: "IN" };
  }

  if (digitsOnly.length === 11 && digitsOnly.startsWith("0") && /^0[6-9]\d{9}$/.test(digitsOnly)) {
    return { ok: true, phoneE164: `+91${digitsOnly.slice(1)}`, phoneCountry: "IN" };
  }

  if (digitsOnly.length === 12 && digitsOnly.startsWith("91") && /^91[6-9]\d{9}$/.test(digitsOnly)) {
    return { ok: true, phoneE164: `+${digitsOnly}`, phoneCountry: "IN" };
  }

  return {
    ok: false,
    message: "Provide a valid 10-digit Indian mobile number or international number with + country code.",
  };
}

export function classifyLeadSubject(rawSubject: unknown): ProductClassification | null {
  const cleaned = cleanText(rawSubject);
  if (!cleaned || hasInjectionRisk(cleaned)) return null;

  const lower = cleaned.toLowerCase();
  if (CLASSIFICATION_TABLE[lower]) {
    return CLASSIFICATION_TABLE[lower];
  }
  const mappedSlug = LABEL_TO_SLUG[lower];
  if (mappedSlug && CLASSIFICATION_TABLE[mappedSlug]) {
    return CLASSIFICATION_TABLE[mappedSlug];
  }
  return null;
}

export function validateAndNormalizeLead(
  payload: Record<string, unknown>
): ValidationSuccess | ValidationFailure {
  const privilegedField = detectPrivilegedField(payload);
  if (privilegedField) {
    return {
      ok: false,
      httpStatus: 400,
      errorCode: "PRIVILEGED_FIELD_FORBIDDEN",
      message: `Client submission must not include privileged CRM field: ${privilegedField}.`,
    };
  }

  const honeypot = cleanText(payload.website_url_check) ?? cleanText(payload.honeypot);
  if (honeypot && honeypot.length > 0) {
    return {
      ok: false,
      httpStatus: 400,
      errorCode: "SPAM_DETECTED",
      message: "Automated spam trap triggered.",
    };
  }

  const fieldErrors: Record<string, string> = {};

  const fullName = cleanText(payload.full_name ?? payload.fullName);
  if (!fullName || fullName.length < 2 || fullName.length > 100 || hasInjectionRisk(fullName)) {
    fieldErrors.full_name = "Full name must be 2-100 safe characters.";
  }

  const phoneResult = normalizePhoneNumber(payload.phone);
  if (!phoneResult.ok) {
    fieldErrors.phone = phoneResult.message;
  }

  let normalizedEmail: string | null = null;
  const rawEmail = payload.email ?? payload.workEmail;
  if (rawEmail !== undefined && rawEmail !== null && String(rawEmail).trim() !== "") {
    const emailCandidate = cleanText(rawEmail)?.toLowerCase() ?? "";
    if (
      !emailCandidate ||
      emailCandidate.length > 254 ||
      hasInjectionRisk(emailCandidate) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailCandidate)
    ) {
      fieldErrors.email = "Enter a valid email address or leave blank.";
    } else {
      normalizedEmail = emailCandidate;
    }
  }

  const classification = classifyLeadSubject(payload.product_or_service ?? payload.product);
  if (!classification) {
    fieldErrors.product_or_service = "Select a valid Hanva SaaS product or IT/telecom service.";
  }

  const rawSourcePage = cleanText(payload.source_page);
  if (
    !rawSourcePage ||
    !rawSourcePage.startsWith("/") ||
    rawSourcePage.length > 256 ||
    rawSourcePage.includes("://") ||
    hasInjectionRisk(rawSourcePage)
  ) {
    fieldErrors.source_page = "source_page must be a valid relative path starting with '/'.";
  }

  if (payload.consent_accepted !== true) {
    fieldErrors.consent_accepted = "Explicit consent acknowledgment (consent_accepted: true) is required.";
  }

  const companyName = cleanText(payload.company_name ?? payload.companyName);
  if (companyName && (companyName.length > 120 || hasInjectionRisk(companyName))) {
    fieldErrors.company_name = "Company name must not exceed 120 safe characters.";
  }

  const teamSize = cleanText(payload.team_size ?? payload.teamSize);
  if (teamSize && (teamSize.length > 60 || hasInjectionRisk(teamSize))) {
    fieldErrors.team_size = "Team size must not exceed 60 safe characters.";
  }

  const city = cleanText(payload.city);
  if (city && (city.length > 80 || hasInjectionRisk(city))) {
    fieldErrors.city = "City must not exceed 80 safe characters.";
  }

  const notes = cleanText(payload.notes, true);
  if (notes && (notes.length > 1000 || hasInjectionRisk(notes))) {
    fieldErrors.notes = "Notes must not exceed 1000 safe characters or contain HTML scripts.";
  }

  const rawIdempotency = cleanText(payload.lead_idempotency_key);
  if (rawIdempotency && !/^[a-zA-Z0-9:_-]{16,128}$/.test(rawIdempotency)) {
    fieldErrors.lead_idempotency_key = "lead_idempotency_key must be 16-128 URL-safe characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    const firstCode: ValidationFailure["errorCode"] = fieldErrors.consent_accepted
      ? "CONSENT_REQUIRED"
      : fieldErrors.phone && Object.keys(fieldErrors).length === 1
        ? "INVALID_PHONE"
        : fieldErrors.email && Object.keys(fieldErrors).length === 1
          ? "INVALID_EMAIL"
          : fieldErrors.product_or_service && Object.keys(fieldErrors).length === 1
            ? "INVALID_PRODUCT"
            : "INVALID_INPUT";

    return {
      ok: false,
      httpStatus: 400,
      errorCode: firstCode,
      message: Object.values(fieldErrors)[0] || "Lead validation failed.",
      fieldErrors,
    };
  }

  const validPhone = phoneResult as { ok: true; phoneE164: string; phoneCountry: string };
  const validClassification = classification as ProductClassification;
  const nowIso = new Date().toISOString();
  const utcDay = nowIso.slice(0, 10);

  const channelRaw = cleanText(payload.preferred_channel)?.toLowerCase();
  const allowedChannels: PreferredChannel[] = ["whatsapp", "phone", "email", "api_enquiry"];
  const preferredChannel: PreferredChannel = allowedChannels.includes(channelRaw as PreferredChannel)
    ? (channelRaw as PreferredChannel)
    : "whatsapp";

  const utmSlug = (val: unknown, maxLen: number): string | null => {
    const cleaned = cleanText(val);
    if (!cleaned || cleaned.length > maxLen || hasInjectionRisk(cleaned)) return null;
    return /^[a-zA-Z0-9._-]+$/.test(cleaned) ? cleaned : null;
  };

  const normalizedFingerprintInput = `${validPhone.phoneE164}|${validClassification.slug}`;
  const dedupeFingerprint = `sha256:${sha256Hex(normalizedFingerprintInput)}`;

  const payloadHashInput = JSON.stringify({
    fullName,
    phoneE164: validPhone.phoneE164,
    email: normalizedEmail,
    slug: validClassification.slug,
    companyName: companyName || null,
    notes: notes || null,
  });
  const payloadHash = `sha256:${sha256Hex(payloadHashInput)}`;

  const autoKey = `auto:${sha256Hex(
    `${validPhone.phoneE164}|${normalizedEmail ?? ""}|${validClassification.slug}|${utcDay}`
  ).slice(0, 32)}`;

  return {
    ok: true,
    lead: {
      schemaVersion: "hanva.lead.v1",
      idempotencyKey: rawIdempotency || autoKey,
      idempotencyKeyExplicit: Boolean(rawIdempotency),
      dedupeFingerprint,
      payloadHash,
      createdAt: nowIso,
      source: "website",
      classification: validClassification,
      contact: {
        fullName: fullName as string,
        companyName: companyName || null,
        email: normalizedEmail,
        phoneE164: validPhone.phoneE164,
        phoneCountry: validPhone.phoneCountry,
      },
      qualification: {
        teamSize: teamSize || null,
        city: city || null,
        notes: notes || null,
        preferredChannel,
      },
      attribution: {
        sourcePage: rawSourcePage as string,
        utmSource: utmSlug(payload.utm_source, 64),
        utmMedium: utmSlug(payload.utm_medium, 64),
        utmCampaign: utmSlug(payload.utm_campaign, 80),
      },
      consent: {
        privacyPolicyVersion: "2026-11-26",
        consentAccepted: true,
        consentTimestamp: nowIso,
      },
    },
  };
}

export function buildFallbackChannels(lead?: Partial<NormalizedLeadRecord> | null) {
  const waUrl = lead?.contact
    ? buildWhatsAppContactUrl({
        fullName: lead.contact.fullName || "Website Visitor",
        companyName: lead.contact.companyName || undefined,
        workEmail: lead.contact.email || "",
        phone: lead.contact.phoneE164 || "",
        teamSize: lead.qualification?.teamSize || undefined,
        product: lead.classification?.label || undefined,
        notes: lead.qualification?.notes || undefined,
      })
    : `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
        "Hello Hanva Team, I would like to enquire about your software products and IT solutions."
      )}`;

  return {
    whatsapp_url: waUrl,
    email: CONTACT_CONFIG.email,
    phone: CONTACT_CONFIG.phoneDisplay,
  };
}
