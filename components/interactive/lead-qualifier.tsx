"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG, buildSaasDemoWhatsAppUrl, buildServiceWhatsAppUrl, SERVICE_WHATSAPP_MESSAGES } from "@/lib/config";
import { trackEnquiryHandoff, trackProductInterest, trackQualificationCompleted, trackWhatsAppClick } from "@/lib/analytics";
import {
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Phone,
  Building2,
  MapPin,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export type QualificationProduct =
  | "crm"
  | "salon"
  | "pos"
  | "digital-marketing"
  | "software-development"
  | "telecom";

interface LeadQualifierProps {
  initialProduct?: QualificationProduct;
  title?: string;
  subtitle?: string;
  onSuccess?: () => void;
}

const PRODUCT_CONFIGS: Record<
  QualificationProduct,
  {
    name: string;
    badge: string;
    accent: string;
    border: string;
    waMessage: string;
    subtypes: string[];
    scaleLabel: string;
    scaleOptions: string[];
  }
> = {
  crm: {
    name: "Hanva CRM & Telecalling",
    badge: "Sales & Calling CRM",
    accent: "text-blue-600",
    border: "border-blue-200",
    waMessage: "I'm interested in a demo of Hanva CRM.",
    subtypes: ["Outbound Sales & Telecalling", "Lead Management & Pipelines", "Call Center / BPO", "Real Estate / Financial"],
    scaleLabel: "Team Scale / Calling Seats",
    scaleOptions: ["1-5 Telecallers", "6-15 Telecallers", "16-50 Telecallers", "50+ Enterprise Seats"],
  },
  salon: {
    name: "Hanva Salon Software",
    badge: "Salon & Spa Operations",
    accent: "text-rose-600",
    border: "border-rose-200",
    waMessage: "I'm interested in a demo of Hanva Salon Software.",
    subtypes: ["Unisex / Hair Salon", "Day Spa & Wellness", "Beauty Studio / Aesthetics", "Nail & Lash Lounge"],
    scaleLabel: "Outlet Scale & Chairs",
    scaleOptions: ["1-3 Chairs / Solo Studio", "4-8 Chairs / Single Outlet", "9-15 Chairs / Multi-Floor", "Multi-Outlet Chain"],
  },
  pos: {
    name: "Hanva Restaurant POS",
    badge: "Restaurant & F&B POS",
    accent: "text-amber-800",
    border: "border-amber-200",
    waMessage: "I'm interested in a demo of Hanva Restaurant POS.",
    subtypes: ["Dine-In Restaurant", "Cafe & Bakery", "Quick-Service / QSR", "Cloud Kitchen / Virtual Brand"],
    scaleLabel: "Outlet Format & Tables",
    scaleOptions: ["Counter-Only / Takeaway", "1-10 Tables (Small Cafe)", "11-30 Tables (Casual Dine-In)", "30+ Tables / Multi-Station"],
  },
  "digital-marketing": {
    name: "Digital Marketing Services",
    badge: "Search & Performance",
    accent: "text-emerald-700",
    border: "border-emerald-200",
    waMessage: SERVICE_WHATSAPP_MESSAGES.digitalMarketing,
    subtypes: ["SEO Services (Organic Growth)", "Google Ads (High-Intent Search)", "Social Media Marketing", "Full-Funnel Lead Generation"],
    scaleLabel: "Monthly Growth Goal",
    scaleOptions: ["Local City Visibility", "State / Regional Expansion", "Pan-India Acquisition", "International Export"],
  },
  "software-development": {
    name: "Custom Software Development",
    badge: "Bespoke Engineering",
    accent: "text-indigo-600",
    border: "border-indigo-200",
    waMessage: SERVICE_WHATSAPP_MESSAGES.softwareDevelopment,
    subtypes: ["Custom Web Application", "Android / Mobile App", "Bespoke CRM / ERP System", "API Integration & Automation"],
    scaleLabel: "Target Implementation Timeline",
    scaleOptions: ["Urgent (Within 30 Days)", "Standard (60-90 Days)", "Enterprise (90+ Days)", "Architecture Discovery Phase"],
  },
  telecom: {
    name: "Telecom & Cloud Telephony",
    badge: "Voice Infrastructure",
    accent: "text-sky-600",
    border: "border-sky-200",
    waMessage: SERVICE_WHATSAPP_MESSAGES.telecom,
    subtypes: ["Smart Multi-Level IVR", "Cloud Telephony & Virtual DIDs", "1800 Toll-Free Numbers", "Auto & Predictive Dialers"],
    scaleLabel: "Expected Calling Volume",
    scaleOptions: ["Under 5,000 Mins / Month", "5,000 - 25,000 Mins / Month", "25,000 - 100,000 Mins", "100,000+ Enterprise Pulse"],
  },
};

export function LeadQualifier({
  initialProduct = "crm",
  title = "Interactive Lead Qualification & Demo Routing",
  subtitle = "Select your requirements in 3 clicks to generate a tailored WhatsApp walkthrough with our senior software specialists.",
}: LeadQualifierProps) {
  const [selectedProduct, setSelectedProduct] = React.useState<QualificationProduct>(initialProduct);
  const [businessType, setBusinessType] = React.useState<string>(PRODUCT_CONFIGS[initialProduct].subtypes[0]);
  const [scale, setScale] = React.useState<string>(PRODUCT_CONFIGS[initialProduct].scaleOptions[1] || PRODUCT_CONFIGS[initialProduct].scaleOptions[0]);
  const [city, setCity] = React.useState<string>("");
  const [contactName, setContactName] = React.useState<string>("");

  const currentConfig = PRODUCT_CONFIGS[selectedProduct];

  // Construct structured WhatsApp message
  const generatedWhatsAppUrl = React.useMemo(() => {
    const baseMessage = currentConfig.waMessage;
    const details: string[] = [baseMessage, ""];
    if (contactName.trim()) details.push(`Name: ${contactName.trim()}`);
    if (businessType) details.push(`Business Category: ${businessType}`);
    if (scale) details.push(`Scale / Requirement: ${scale}`);
    if (city.trim()) details.push(`City / Location: ${city.trim()}`);
    details.push("", "Please connect with me regarding next steps.", "Thank you.");

    const fullText = details.join("\n");
    return `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(fullText)}`;
  }, [currentConfig.waMessage, contactName, businessType, scale, city]);

  const handleProductSwitch = (prod: QualificationProduct) => {
    setSelectedProduct(prod);
    setBusinessType(PRODUCT_CONFIGS[prod].subtypes[0]);
    setScale(PRODUCT_CONFIGS[prod].scaleOptions[1] || PRODUCT_CONFIGS[prod].scaleOptions[0]);
    trackProductInterest(prod, "qualifier_tab");
  };

  const handleWhatsAppSubmit = () => {
    trackQualificationCompleted(selectedProduct, {
      business_category: businessType,
      scale_requirement: scale,
    });
    trackEnquiryHandoff(selectedProduct, "whatsapp");
  };

  return (
    <div className={`rounded-2xl border ${currentConfig.border} bg-white shadow-xs p-5 sm:p-7 space-y-6`}>
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {currentConfig.badge}
          </Badge>
          <span className="text-xs text-slate-500 font-mono">Direct WhatsApp Handoff</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{subtitle}</p>
      </div>

      {/* Step 1: Product Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          1. Choose Product or Service Area:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {(Object.keys(PRODUCT_CONFIGS) as QualificationProduct[]).map((prod) => {
            const isSelected = prod === selectedProduct;
            return (
              <button
                key={prod}
                type="button"
                onClick={() => handleProductSwitch(prod)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {PRODUCT_CONFIGS[prod].name.split(" ")[1] || PRODUCT_CONFIGS[prod].name.split(" ")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Specific Sub-Category & Scale */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            2. Business Format / Segment:
          </label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {currentConfig.subtypes.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            3. {currentConfig.scaleLabel}:
          </label>
          <select
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {currentConfig.scaleOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Step 3: Contact & City (Optional Minimal Fields) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            Your Name / Business Name (Optional):
          </label>
          <Input
            placeholder="e.g. Rahul / Metro Studios"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="text-xs h-9"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            Target City (Optional):
          </label>
          <Input
            placeholder="e.g. Bengaluru, Mumbai, Pune, Delhi NCR"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="text-xs h-9"
          />
        </div>
      </div>

      {/* Generated WhatsApp Handoff Action */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            Prefilled Enquiry Summary:
          </span>
          <span className="text-[11px] font-mono text-slate-500">Contact us for pricing</span>
        </div>
        <div className="rounded-lg bg-white border border-slate-200 p-2.5 text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
          {currentConfig.waMessage}
          {businessType && ` • ${businessType}`}
          {scale && ` • ${scale}`}
          {city && ` • City: ${city}`}
        </div>

        <Button asChild size="lg" className="w-full bg-[#25D366] text-slate-950 hover:bg-[#20BD5A] font-bold">
          <TrackedWhatsAppLink
            href={generatedWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            ctaLocation="contact_page"
            productName={selectedProduct === "crm" ? "hanva_crm" : selectedProduct === "salon" ? "hanva_salon_software" : selectedProduct === "pos" ? "hanva_restaurant_pos" : "general_enquiry"}
            ctaType="product_demo_whatsapp"
            onClick={handleWhatsAppSubmit}
          >
            <MessageSquare className="mr-2 h-4 w-4 shrink-0" />
            <span>Connect on WhatsApp with My Requirements</span>
            <ExternalLink className="ml-2 h-4 w-4 shrink-0" />
          </TrackedWhatsAppLink>
        </Button>

        <p className="text-[11px] text-slate-500 text-center">
          Clicking opens a chat with <span className="font-semibold text-slate-800">{CONTACT_CONFIG.phoneDisplay}</span> to initiate a personalized demo walkthrough. No spam, no automated robo-calls.
        </p>
      </div>
    </div>
  );
}
