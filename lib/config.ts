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
  const cleanEmail = payload.workEmail.trim();
  const cleanPhone = payload.phone.trim();
  const cleanTeamSize = (payload.teamSize || "").trim();
  const cleanProduct = (payload.product || "").trim();
  const cleanNotes = (payload.notes || "").trim();

  const lines: string[] = [
    "Hello Hanva Team,",
    "",
    "I would like to enquire about your business communication solutions.",
    "",
    `Name: ${cleanName}`,
  ];

  if (cleanCompany) {
    lines.push(`Company: ${cleanCompany}`);
  }

  lines.push(`Work Email: ${cleanEmail}`);
  lines.push(`Mobile: ${cleanPhone}`);

  if (cleanTeamSize) {
    lines.push(`Team Size: ${cleanTeamSize}`);
  }

  if (cleanProduct) {
    lines.push(`Interested Product: ${cleanProduct}`);
  }

  if (cleanNotes) {
    lines.push("", "Requirements:", cleanNotes);
  }

  lines.push("", "Please contact me regarding the next steps.", "", "Thank you.");

  const message = lines.join("\n");
  return `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}
