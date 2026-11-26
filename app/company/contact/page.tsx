"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  ExternalLink,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import { CONTACT_CONFIG, buildWhatsAppContactUrl, type ContactEnquiryPayload } from "@/lib/config";
import {
  trackAnalyticsEvent,
  trackFormError,
  trackFormStart,
  trackFormSubmit,
  trackWhatsAppClick,
  inferSubjectFromContext,
} from "@/lib/analytics";

interface FormErrors {
  fullName?: string;
  workEmail?: string;
  phone?: string;
  general?: string;
}

const PRODUCT_OPTION_MAP: Record<string, string> = {
  "cloud-telephony": "Smart IVR & Cloud Telephony",
  "ivr-system": "Smart IVR & Cloud Telephony",
  "smart-ivr": "Smart IVR & Cloud Telephony",
  "auto-dialer": "Auto & Predictive Dialers",
  "predictive-dialer": "Auto & Predictive Dialers",
  "call-center-software": "Auto & Predictive Dialers",
  crm: "Telecalling & Sales CRM",
  "telecalling-crm": "Telecalling & Sales CRM",
  "whatsapp-crm": "WhatsApp Business CRM",
  "virtual-numbers": "Virtual Numbers & 1800 Toll-Free",
  "toll-free-numbers": "Virtual Numbers & 1800 Toll-Free",
  enterprise: "Enterprise Telecom & CRM Suite",
};

function mapTeamSizeFromSeats(seats: number): string {
  if (seats <= 4) return "1-5 agents";
  if (seats <= 15) return "5-15 agents";
  if (seats <= 50) return "15-50 agents";
  return "50+ agents";
}

function deriveSearchParamContext(searchParams: ReturnType<typeof useSearchParams>) {
  const updates: Partial<ContactEnquiryPayload> = {};
  const notesParts: string[] = [];
  const badges: string[] = [];

  if (!searchParams) {
    return { updates, summary: null as string | null };
  }

  const prodParam = searchParams.get("product");
  const planParam = searchParams.get("plan");
  const cityParam = searchParams.get("city");
  const industryParam = searchParams.get("industry");
  const calcCalls = searchParams.get("calcCalls");
  const calcDur = searchParams.get("calcDur");
  const calcSeats = searchParams.get("calcSeats");
  const calcMode = searchParams.get("calcMode");

  if (prodParam && PRODUCT_OPTION_MAP[prodParam]) {
    updates.product = PRODUCT_OPTION_MAP[prodParam];
    badges.push(PRODUCT_OPTION_MAP[prodParam]);
  } else if (planParam === "enterprise") {
    updates.product = "Enterprise Telecom & CRM Suite";
    updates.teamSize = "50+ agents";
  } else if (planParam === "growth-pro") {
    updates.product = "Auto & Predictive Dialers";
  }

  if (planParam) {
    const cleanPlan = planParam.replace(/[^a-z0-9-]/gi, " ").trim().slice(0, 40).toUpperCase();
    if (cleanPlan) {
      notesParts.push(`Requested Plan: ${cleanPlan}`);
      badges.push(`Plan: ${cleanPlan}`);
    }
  }

  if (cityParam) {
    const cleanCity = cityParam.replace(/[^a-z0-9-\s]/gi, "").slice(0, 40);
    if (cleanCity) notesParts.push(`Target City/Circle: ${cleanCity}`);
  }

  if (industryParam) {
    const cleanInd = industryParam.replace(/[^a-z0-9-\s&]/gi, "").slice(0, 50);
    if (cleanInd) notesParts.push(`Industry: ${cleanInd}`);
  }

  if (calcCalls && calcDur && calcSeats) {
    const rawCalls = Number(calcCalls);
    const rawDur = Number(calcDur);
    const rawSeats = Number(calcSeats);
    if (Number.isFinite(rawCalls) && Number.isFinite(rawDur) && Number.isFinite(rawSeats)) {
      const callsNum = Math.min(100000, Math.max(1000, Math.round(rawCalls)));
      const durNum = Math.min(180, Math.max(15, Math.round(rawDur)));
      const seatsNum = Math.min(50, Math.max(1, Math.round(rawSeats)));
      updates.teamSize = mapTeamSizeFromSeats(seatsNum);
      const modeLabel = calcMode === "telecalling" ? "Interactive Telecalling + CRM" : "OBD Broadcast Simulation";
      notesParts.push(
        `Calculator Context (${modeLabel}): ${callsNum.toLocaleString()} calls/mo, avg ${durNum}s duration, ${seatsNum} agent seats.`
      );
      badges.push(`${callsNum.toLocaleString()} calls/mo · ${seatsNum} seats`);
    }
  }

  if (notesParts.length > 0) {
    updates.notes = notesParts.join("\n");
  }

  return {
    updates,
    summary: badges.length > 0 ? badges.join(" · ") : null,
  };
}

function ContactPageContent() {
  const searchParams = useSearchParams();
  const initialContext = React.useMemo(() => deriveSearchParamContext(searchParams), [searchParams]);

  const [handoffInitiated, setHandoffInitiated] = React.useState(false);
  const [popupBlocked, setPopupBlocked] = React.useState(false);
  const [generatedUrl, setGeneratedUrl] = React.useState("");
  const [copyStatus, setCopyStatus] = React.useState<"idle" | "copied" | "error">("idle");
  const contextSummary = initialContext.summary;

  const [formData, setFormData] = React.useState<ContactEnquiryPayload & { honeypot: string }>(() => ({
    fullName: "",
    companyName: "",
    workEmail: "",
    phone: "",
    teamSize: initialContext.updates.teamSize || "5-15 agents",
    product: initialContext.updates.product || "Smart IVR & Cloud Telephony",
    notes: initialContext.updates.notes || "",
    honeypot: "",
  }));

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formStartedRef = React.useRef(false);
  const errorSummaryRef = React.useRef<HTMLDivElement>(null);
  const handoffHeadingRef = React.useRef<HTMLHeadingElement>(null);
  const fullNameInputRef = React.useRef<HTMLInputElement>(null);

  const markFormStarted = (fieldName: string) => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackFormStart("contact_demo_enquiry", fieldName);
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    const nameTrimmed = formData.fullName.trim();
    if (!nameTrimmed) {
      newErrors.fullName = "Please enter your full name.";
    } else if (nameTrimmed.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    }

    const emailTrimmed = formData.workEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      newErrors.workEmail = "Please enter your work email.";
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.workEmail = "Please enter a valid business email address.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your mobile or WhatsApp number.";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits).";
    }

    return newErrors;
  };

  const buildPlainPreviewText = () => {
    const lines = [
      "Hello Hanva Team,",
      "I would like to enquire about your business communication solutions.",
      `Name: ${formData.fullName.trim()}`,
      formData.companyName?.trim() ? `Company: ${formData.companyName.trim()}` : null,
      `Work Email: ${formData.workEmail.trim()}`,
      `Mobile: ${formData.phone.trim()}`,
      `Team Size: ${formData.teamSize}`,
      `Interested Product: ${formData.product}`,
      formData.notes?.trim() ? `Requirements:\n${formData.notes.trim()}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      trackFormError("contact_demo_enquiry", Object.keys(newErrors));
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 10);
      return;
    }

    setIsSubmitting(true);

    try {
      const waUrl = buildWhatsAppContactUrl({
        fullName: formData.fullName,
        companyName: formData.companyName,
        workEmail: formData.workEmail,
        phone: formData.phone,
        teamSize: formData.teamSize,
        product: formData.product,
        notes: formData.notes,
      });

      setGeneratedUrl(waUrl);

      let wasBlocked = false;
      if (typeof window !== "undefined") {
        const openedWindow = window.open(waUrl, "_blank", "noopener,noreferrer");
        wasBlocked = !openedWindow;
      }

      setPopupBlocked(wasBlocked);
      setHandoffInitiated(true);
      setCopyStatus("idle");

      // Truthfulness rule: fire client-side form_submit (`delivery_confirmed: false`) — NEVER `generate_lead`
      trackFormSubmit({
        formName: "contact_demo_enquiry",
        productInterest: formData.product || "unspecified",
        teamSizeBucket: formData.teamSize || "unspecified",
        handoffMethod: "whatsapp_client_url",
        popupBlocked: wasBlocked,
      });

      setTimeout(() => {
        handoffHeadingRef.current?.focus();
      }, 20);
    } catch {
      trackFormError("contact_demo_enquiry", ["general"]);
      setErrors({ general: "Unable to prepare WhatsApp message. Please use Email or Phone below." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditEnquiry = () => {
    setHandoffInitiated(false);
    setPopupBlocked(false);
    setTimeout(() => {
      fullNameInputRef.current?.focus();
    }, 20);
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(buildPlainPreviewText());
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 3000);
    } catch {
      setCopyStatus("error");
    }
  };

  const emailSubject = `Enquiry: ${formData.product || "Cloud Telephony & CRM"}`;
  const directMailtoHref = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(
    "Enquiry: Cloud Telephony & Telecalling CRM"
  )}`;
  const handoffMailtoHref = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(buildPlainPreviewText())}`;

  const errorList = Object.entries(errors).filter(
    ([key, val]) => key !== "general" && Boolean(val)
  ) as Array<[keyof FormErrors, string]>;

  return (
    <div className="pt-8 pb-28 lg:py-16 bg-slate-50 min-h-screen">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info, SLA & Corporate Credentials */}
          <div className="lg:col-span-5 space-y-6 min-w-0 w-full">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Sales & Support Desk
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1 break-words">
                Let&apos;s Build Your Voice Architecture
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed break-words">
                Connect directly with our Bengaluru telephony engineers for statutory DoT KYC guidance, Vi/Tata DID provisioning, and CRM scoping.
              </p>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 w-full">
              {/* Direct Telephone */}
              <a
                href={`tel:${CONTACT_CONFIG.phoneTel}`}
                onClick={() =>
                  trackAnalyticsEvent("phone_click", {
                    cta_location: "contact_page",
                    cta_surface: "contact_direct_card",
                    target_channel: "sales_desk",
                  })
                }
                className="flex items-center space-x-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors w-full min-w-0"
              >
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-slate-600">Direct Voice Line</div>
                  <div className="text-sm font-semibold text-slate-900 truncate">{CONTACT_CONFIG.phoneDisplay}</div>
                </div>
              </a>

              {/* Direct Email Alternative */}
              <a
                href={directMailtoHref}
                onClick={() =>
                  trackAnalyticsEvent("demo_cta_click", {
                    method: "email",
                    cta_location: "contact_page",
                    cta_surface: "contact_direct_card",
                  })
                }
                className="flex items-center space-x-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors w-full min-w-0"
              >
                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-slate-600">Email Sales Desk (No WhatsApp Required)</div>
                  <div className="text-sm font-semibold text-slate-900 truncate">{CONTACT_CONFIG.email}</div>
                </div>
              </a>

              {/* Direct WhatsApp Sales Desk */}
              <a
                href={`${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
                  "Hello Hanva Team, I would like to speak with your sales engineering desk."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppClick({
                    ctaLocation: "contact_page",
                    productName: "general_enquiry",
                    ctaType: "general_whatsapp",
                    contextRef: "contact_direct_card",
                  });
                }}
                className="flex items-center space-x-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors w-full min-w-0"
              >
                <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-slate-600">Quick Chat (Opens WhatsApp — Press Send)</div>
                  <div className="text-sm font-semibold text-slate-900 truncate flex items-center gap-1.5">
                    <span>WhatsApp Sales Desk</span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500 shrink-0" aria-hidden="true" />
                  </div>
                </div>
              </a>

              {/* Operating Hours & Response SLA */}
              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs w-full min-w-0">
                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="leading-snug min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-slate-600">Operating Hours &amp; Response Expectation</div>
                  <div className="font-semibold text-slate-900 mt-0.5">{CONTACT_CONFIG.supportHours}</div>
                  <div className="text-slate-600 mt-0.5">Typical engineer reply: {CONTACT_CONFIG.responseTimeSLA}</div>
                </div>
              </div>

              {/* Physical Office Address */}
              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs w-full min-w-0">
                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="leading-snug min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-slate-600">Commercial Operational Office</div>
                  <div className="font-semibold text-slate-900 mt-0.5 break-words">{CONTACT_CONFIG.companyLegalName}</div>
                  <div className="text-slate-600 mt-1 break-words">{CONTACT_CONFIG.address}</div>
                </div>
              </div>
            </div>

            {/* Corporate Regulatory Credentials */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-mono space-y-1 w-full min-w-0 break-all">
              <div>CIN: {CONTACT_CONFIG.cin}</div>
              <div>GSTIN: {CONTACT_CONFIG.gstin}</div>
              <div>PAN: {CONTACT_CONFIG.pan}</div>
            </div>
          </div>

          {/* Right Column: Structured Enquiry Formatter (WhatsApp / Email Handoff) */}
          <div className="lg:col-span-7 min-w-0 w-full">
            <Card className="border-slate-200 shadow-md bg-white w-full overflow-hidden">
              <CardHeader className="border-b border-slate-100 p-4 sm:p-6 pb-4">
                <CardTitle as="h2" className="text-lg sm:text-xl break-words">Request Demo &amp; Custom Quotation</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-600 break-words">
                  Format your technical requirements for direct handoff to our sales engineers via WhatsApp or Email.
                </CardDescription>
                {contextSummary && !handoffInitiated && (
                  <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs text-blue-800 font-medium">
                    Pre-selected context: {contextSummary}
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {handoffInitiated ? (
                  /* Step 2: Transparent Handoff Status — Popup check, copy preview, email fallback, zero false claims */
                  <div className="py-2 sm:py-4 space-y-5 min-w-0">
                    <div className="text-center space-y-2">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <MessageSquare className="h-6 w-6" aria-hidden="true" />
                      </div>

                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          popupBlocked
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {popupBlocked ? "Pop-up Blocked — Manual Action Required" : "Action Required in WhatsApp"}
                      </div>

                      <h2
                        ref={handoffHeadingRef}
                        tabIndex={-1}
                        className="text-lg sm:text-xl font-bold text-slate-900 break-words focus:outline-none"
                      >
                        {popupBlocked ? "Click Below to Open WhatsApp or Email" : "WhatsApp Handoff Prepared"}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed break-words">
                        {popupBlocked ? (
                          <>
                            Your browser prevented the automatic WhatsApp pop-up. Use the buttons below to launch WhatsApp manually, copy your enquiry text, or send directly via Email.
                          </>
                        ) : (
                          <>
                            WhatsApp has been launched with your formatted enquiry. Review the prefilled message below and press <strong>Send</strong> inside WhatsApp to deliver it to Hanva.
                          </>
                        )}
                      </p>
                    </div>

                    {/* Message Preview Box */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-left space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                          Prepared Enquiry Preview
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyMessage}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          {copyStatus === "copied" ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Copy Text</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div aria-live="polite" className="text-[11px] min-h-[16px]">
                        {copyStatus === "copied" && (
                          <span className="text-emerald-700 font-medium">
                            Enquiry text copied to clipboard.
                          </span>
                        )}
                        {copyStatus === "error" && (
                          <span className="text-red-700 font-medium">
                            Clipboard blocked by browser — please select and copy the preview text below manually.
                          </span>
                        )}
                      </div>
                      <pre className="text-xs text-slate-700 whitespace-pre-wrap break-words font-sans leading-relaxed max-h-40 overflow-y-auto">
                        {buildPlainPreviewText()}
                      </pre>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-1 w-full">
                      <Button asChild variant="whatsapp" className="w-full sm:w-auto font-semibold min-h-[44px]">
                        <a
                        href={generatedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick({
                            ctaLocation: "contact_page",
                            productName: inferSubjectFromContext(formData.product),
                            ctaType: "handoff_whatsapp",
                            contextRef: "contact_handoff_retry",
                          })
                        }
                       
                      >
                          <MessageSquare className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>{popupBlocked ? "Open WhatsApp" : "Open WhatsApp Again"}</span>
                          <ExternalLink className="ml-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </a>
                      </Button>

                      <Button asChild variant="secondary" className="w-full sm:w-auto font-semibold min-h-[44px]">
                        <a
                        href={handoffMailtoHref}
                        onClick={() =>
                          trackAnalyticsEvent("demo_cta_click", {
                            method: "email_fallback",
                            cta_location: "contact_page",
                            cta_surface: "contact_handoff_panel",
                          })
                        }
                       
                      >
                          <Mail className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>Send via Email App</span>
                        </a>
                      </Button>

                      <Button
                        variant="outline"
                        onClick={handleEditEnquiry}
                        className="w-full sm:w-auto text-slate-700 min-h-[44px]"
                      >
                        <RotateCcw className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Edit Enquiry Details</span>
                      </Button>
                    </div>

                    {/* Transparent Fallback & Privacy Notice */}
                    <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 text-center space-y-1.5 break-words">
                      <p>
                        Prefer voice? Call our desk directly at{" "}
                        <a
                          href={`tel:${CONTACT_CONFIG.phoneTel}`}
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {CONTACT_CONFIG.phoneDisplay}
                        </a>{" "}
                        ({CONTACT_CONFIG.supportHours}).
                      </p>
                      <p className="text-[11px] text-slate-600">
                        Notice: Hanva does not save this form submission on website servers. Your enquiry reaches our team only after you click Send in WhatsApp or your Email client.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Step 1: Accessible Form with Error Summary & Inline Validation */
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Bot Honeypot */}
                    <input
                      type="text"
                      name="website_url_check"
                      aria-hidden="true"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <p className="text-xs text-slate-600">
                      Fields marked with <span className="text-red-600 font-semibold">*</span> are required.
                    </p>

                    {errorList.length > 0 && (
                      <div
                        ref={errorSummaryRef}
                        tabIndex={-1}
                        role="alert"
                        aria-labelledby="contact-error-summary-title"
                        className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <div id="contact-error-summary-title" className="font-bold flex items-center gap-1.5">
                          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" aria-hidden="true" />
                          <span>Please fix {errorList.length} {errorList.length === 1 ? "issue" : "issues"} before continuing:</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-0.5">
                          {errorList.map(([field, message]) => (
                            <li key={field}>
                              <a href={`#${field}`} className="underline font-medium hover:text-red-950">
                                {message}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {errors.general && (
                      <div role="alert" className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{errors.general}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        ref={fullNameInputRef}
                        id="fullName"
                        name="fullName"
                        label="Full Name *"
                        placeholder="e.g. Rajesh Kumar"
                        autoComplete="name"
                        required
                        value={formData.fullName}
                        onFocus={() => markFormStarted("fullName")}
                        onChange={(e) => {
                          markFormStarted("fullName");
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        error={errors.fullName}
                        aria-invalid={!!errors.fullName}
                      />

                      <Input
                        id="companyName"
                        name="companyName"
                        label="Company Name (Optional)"
                        placeholder="e.g. Acme FinTech Pvt. Ltd."
                        autoComplete="organization"
                        value={formData.companyName}
                        onFocus={() => markFormStarted("companyName")}
                        onChange={(e) => {
                          markFormStarted("companyName");
                          setFormData({ ...formData, companyName: e.target.value });
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        id="workEmail"
                        name="workEmail"
                        label="Work Email *"
                        type="email"
                        placeholder="e.g. rajesh@company.com"
                        autoComplete="email"
                        required
                        value={formData.workEmail}
                        onFocus={() => markFormStarted("workEmail")}
                        onChange={(e) => {
                          markFormStarted("workEmail");
                          setFormData({ ...formData, workEmail: e.target.value });
                          if (errors.workEmail) setErrors({ ...errors, workEmail: undefined });
                        }}
                        error={errors.workEmail}
                        aria-invalid={!!errors.workEmail}
                      />

                      <Input
                        id="phone"
                        name="phone"
                        label="Mobile / WhatsApp Number *"
                        type="tel"
                        placeholder="e.g. +91 9876543210"
                        autoComplete="tel"
                        required
                        value={formData.phone}
                        onFocus={() => markFormStarted("phone")}
                        onChange={(e) => {
                          markFormStarted("phone");
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        error={errors.phone}
                        aria-invalid={!!errors.phone}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="team-size" className="block text-xs font-medium text-slate-700">
                          Team Size
                        </label>
                        <select
                          id="team-size"
                          className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                          value={formData.teamSize}
                          onFocus={() => markFormStarted("teamSize")}
                          onChange={(e) => {
                            markFormStarted("teamSize");
                            setFormData({ ...formData, teamSize: e.target.value });
                          }}
                        >
                          <option value="1-5 agents">1 - 5 calling agents</option>
                          <option value="5-15 agents">5 - 15 calling agents</option>
                          <option value="15-50 agents">15 - 50 calling agents</option>
                          <option value="50+ agents">50+ enterprise contact center</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="product-interest" className="block text-xs font-medium text-slate-700">
                          Primary Product Interest
                        </label>
                        <select
                          id="product-interest"
                          className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                          value={formData.product}
                          onFocus={() => markFormStarted("product")}
                          onChange={(e) => {
                            markFormStarted("product");
                            setFormData({ ...formData, product: e.target.value });
                          }}
                        >
                          <option value="Smart IVR & Cloud Telephony">Smart IVR &amp; Cloud Telephony</option>
                          <option value="Auto & Predictive Dialers">Auto &amp; Predictive Dialers</option>
                          <option value="Telecalling & Sales CRM">Telecalling &amp; Sales CRM</option>
                          <option value="WhatsApp Business CRM">WhatsApp Business CRM</option>
                          <option value="Virtual Numbers & 1800 Toll-Free">Virtual Numbers &amp; 1800 Toll-Free</option>
                          <option value="Enterprise Telecom & CRM Suite">Enterprise Telecom &amp; CRM Suite</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-notes" className="block text-xs font-medium text-slate-700">
                        Specific Requirements (Optional)
                      </label>
                      <textarea
                        id="contact-notes"
                        rows={3}
                        maxLength={1000}
                        className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 placeholder:text-slate-400"
                        placeholder="Tell us about your current calling volume, pulse requirements, or team setup..."
                        value={formData.notes}
                        onFocus={() => markFormStarted("notes")}
                        onChange={(e) => {
                          markFormStarted("notes");
                          setFormData({ ...formData, notes: e.target.value });
                        }}
                      />
                    </div>

                    {/* Primary CTA */}
                    <div className="space-y-2 pt-1">
                      <Button
                        type="submit"
                        variant="whatsapp"
                        className="w-full h-12 text-base font-semibold shadow-sm"
                        disabled={isSubmitting}
                      >
                        <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" />
                        <span>{isSubmitting ? "Preparing WhatsApp..." : "Prepare & Continue to WhatsApp"}</span>
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Button>

                      <p className="text-xs text-slate-600 text-center leading-relaxed">
                        Opens WhatsApp with your structured enquiry ready to review. You must press <strong>Send</strong> inside WhatsApp (or choose Email on the next screen) to contact Hanva.
                      </p>
                    </div>

                    {/* Privacy & Data Transfer Disclosure */}
                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 text-center space-y-1">
                      <p className="leading-relaxed">
                        Your enquiry details are formatted locally in your browser without server storage. When you continue to WhatsApp, details are passed via URL so WhatsApp pre-fills your message.
                      </p>
                      <p className="text-slate-600">
                        Governed by the Hanva{" "}
                        <Link href="/company/privacy-policy/" className="underline hover:text-slate-900">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function ContactPage() {
  return (
    <React.Suspense fallback={<div className="pt-8 pb-28 lg:py-16 bg-slate-50 min-h-screen" />}>
      <ContactPageContent />
    </React.Suspense>
  );
}
