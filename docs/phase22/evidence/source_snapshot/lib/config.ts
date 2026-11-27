/**
 * Hanva Technologies — Centralized Contact & Business Configuration
 * Canonical single source of truth for communication channels, legal identity,
 * and WhatsApp routing parameters across the platform.
 */

export const CONTACT_CONFIG = {
  // Primary Voice & Telephony
  phoneDisplay: "+91 8423711043",
  phoneTel: "+918423711043",
  
  // WhatsApp Business Routing
  whatsappMsisdn: "918423711043",
  whatsappBaseUrl: "https://wa.me/918423711043",
  
  // Official Corporate Correspondence
  email: "info@hanva.in",
  corporateEmail: "gaurav@hanva.in",
  
  // Legal Corporate Entity
  companyLegalName: "Hanva Technologies Private Limited",
  cin: "U78100KA2025PTC205168",
  gstin: "29AAICH0526K1ZF",
  pan: "AAICH0526K",
  address: "Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya, Bengaluru - 560068, Karnataka, India",
  
  // Working Hours & SLAs
  supportHours: "Monday to Saturday, 9:00 AM – 7:00 PM IST",
  responseTimeSLA: "Within 2 business hours"
} as const;

export const SAAS_DEMO_WHATSAPP_MESSAGES = {
  crm: "I'm interested in a demo of Hanva CRM.",
  salon: "I'm interested in a demo of Hanva Salon Software.",
  pos: "I'm interested in a demo of Hanva Restaurant POS.",
} as const;

export type SaasProductKey = keyof typeof SAAS_DEMO_WHATSAPP_MESSAGES;

export function buildSaasDemoWhatsAppUrl(product: SaasProductKey): string {
  return `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
    SAAS_DEMO_WHATSAPP_MESSAGES[product]
  )}`;
}

export function buildServiceWhatsAppUrl(message: string): string {
  return `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export interface ContactEnquiryPayload {
  fullName: string;
  companyName?: string;
  workEmail: string;
  phone: string;
  teamSize?: string;
  product?: string;
  notes?: string;
}

/**
 * Constructs a structured, human-readable WhatsApp message and returns
 * the fully-encoded https://wa.me/ URL for direct browser handoff.
 */
export function buildWhatsAppContactUrl(payload: ContactEnquiryPayload): string {
  const cleanName = payload.fullName.trim();
  const cleanCompany = (payload.companyName || "").trim();
  const cleanEmail = (payload.workEmail || "").trim();
  const cleanPhone = payload.phone.trim();
  const cleanTeamSize = (payload.teamSize || "").trim();
  const cleanProduct = (payload.product || "").trim();
  const cleanNotes = (payload.notes || "").trim();

  const introLine = cleanProduct
    ? `I would like to enquire about ${cleanProduct}.`
    : "I would like to enquire about your software products and IT solutions.";

  const lines: string[] = [
    "Hello Hanva Team,",
    "",
    introLine,
    "",
    `Name: ${cleanName}`,
  ];

  if (cleanCompany) {
    lines.push(`Company: ${cleanCompany}`);
  }

  if (cleanEmail) {
    lines.push(`Email: ${cleanEmail}`);
  }

  lines.push(`Mobile: ${cleanPhone}`);

  if (cleanTeamSize) {
    lines.push(`Scale / Team: ${cleanTeamSize}`);
  }

  if (cleanProduct) {
    lines.push(`Interested Product / Service: ${cleanProduct}`);
  }

  if (cleanNotes) {
    lines.push("", "Requirements:", cleanNotes);
  }

  lines.push("", "Please contact me regarding the next steps.", "", "Thank you.");

  const message = lines.join("\n");
  return `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export interface RouteConversionContext {
  productSlug: string | null;
  whatsappUrl: string;
  contactHref: string;
  subjectLabel: string;
  isSaasProduct: boolean;
}

/**
 * Resolves exact product-specific or service-specific WhatsApp messages and
 * contact prefill links based on the visitor's active route.
 */
export function resolveRouteContext(pathname?: string | null): RouteConversionContext {
  const path = (pathname || "/").toLowerCase();

  // 1. Hanva Salon Software cluster
  if (path.includes("salon-software") || path.includes("salon-billing") || path.includes("salon-appointment") || path.includes("salon-management")) {
    return {
      productSlug: "salon-software",
      whatsappUrl: buildSaasDemoWhatsAppUrl("salon"),
      contactHref: "/company/contact/?product=salon-software",
      subjectLabel: "Hanva Salon Software",
      isSaasProduct: true,
    };
  }

  // 2. Hanva Restaurant POS cluster
  if (path.includes("restaurant-pos") || path.includes("restaurant-billing") || path.includes("cloud-kitchen")) {
    return {
      productSlug: "restaurant-pos",
      whatsappUrl: buildSaasDemoWhatsAppUrl("pos"),
      contactHref: "/company/contact/?product=restaurant-pos",
      subjectLabel: "Hanva Restaurant POS",
      isSaasProduct: true,
    };
  }

  // 3. Hanva CRM cluster
  if (
    path.startsWith("/products/crm") ||
    path.includes("ivr-crm-for-businesses") ||
    path.includes("lead-management-process") ||
    path.includes("crm-with-ivr-vs-telecalling-crm")
  ) {
    return {
      productSlug: "crm",
      whatsappUrl: buildSaasDemoWhatsAppUrl("crm"),
      contactHref: "/company/contact/?product=crm",
      subjectLabel: "Hanva CRM",
      isSaasProduct: true,
    };
  }

  // 4. Digital Marketing cluster
  if (path.startsWith("/digital-marketing") || path.includes("local-seo") || path.includes("seo-vs-google-ads")) {
    return {
      productSlug: "digital-marketing",
      whatsappUrl: buildServiceWhatsAppUrl(
        "Hello Hanva Team, I would like to enquire about Digital Marketing (SEO, Google Ads & Social Media) services."
      ),
      contactHref: "/company/contact/?product=digital-marketing",
      subjectLabel: "Digital Marketing Services",
      isSaasProduct: false,
    };
  }

  // 5. Software Development cluster
  if (
    path.startsWith("/software-development") ||
    path.includes("custom-crm-development") ||
    path.includes("saas-vs-custom") ||
    path.includes("software-development-cost")
  ) {
    return {
      productSlug: "software-development",
      whatsappUrl: buildServiceWhatsAppUrl(
        "Hello Hanva Team, I would like to enquire about Custom Software Development services."
      ),
      contactHref: "/company/contact/?product=software-development",
      subjectLabel: "Custom Software Development",
      isSaasProduct: false,
    };
  }

  // 6. Telecom & Voice sub-products
  const telecomMappings: Array<[string, string, string]> = [
    ["telecalling-crm", "telecalling-crm", "Telecalling CRM"],
    ["whatsapp-crm", "whatsapp-crm", "WhatsApp Business CRM"],
    ["whatsapp-business-api", "whatsapp-crm", "WhatsApp Business API"],
    ["cloud-telephony", "cloud-telephony", "Cloud Telephony & PBX"],
    ["smart-ivr", "smart-ivr", "Smart Multi-Level IVR"],
    ["ivr-system", "ivr-system", "IVR Service"],
    ["how-ivr", "ivr-system", "IVR Service"],
    ["auto-dialer", "auto-dialer", "Auto Dialer"],
    ["predictive-dialer", "predictive-dialer", "Predictive Dialer"],
    ["call-center", "call-center-software", "Call Center Software"],
    ["virtual-numbers", "virtual-numbers", "Virtual Numbers"],
    ["toll-free", "toll-free-numbers", "1800 Toll-Free Numbers"],
    ["dlt-compliance", "cloud-telephony", "TRAI DLT & Cloud Telephony"],
  ];

  for (const [needle, slug, label] of telecomMappings) {
    if (path.includes(needle)) {
      return {
        productSlug: slug,
        whatsappUrl: buildServiceWhatsAppUrl(
          `Hello Hanva Team, I would like to enquire about ${label}.`
        ),
        contactHref: `/company/contact/?product=${slug}`,
        subjectLabel: label,
        isSaasProduct: false,
      };
    }
  }

  return {
    productSlug: null,
    whatsappUrl: buildServiceWhatsAppUrl(
      "Hello Hanva Team, I would like to enquire about your SaaS products and IT solutions."
    ),
    contactHref: "/company/contact/",
    subjectLabel: "Hanva Solutions",
    isSaasProduct: false,
  };
}
