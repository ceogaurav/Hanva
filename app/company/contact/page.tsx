"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageSquare, ArrowRight, RotateCcw, AlertCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { CONTACT_CONFIG, buildWhatsAppContactUrl, type ContactEnquiryPayload } from "@/lib/config";

interface FormErrors {
  fullName?: string;
  workEmail?: string;
  phone?: string;
  general?: string;
}

export default function ContactPage() {
  const [handoffInitiated, setHandoffInitiated] = React.useState(false);
  const [generatedUrl, setGeneratedUrl] = React.useState("");
  const [formData, setFormData] = React.useState<ContactEnquiryPayload & { honeypot: string }>({
    fullName: "",
    companyName: "",
    workEmail: "",
    phone: "",
    teamSize: "5-15 agents",
    product: "Smart IVR & Telephony",
    notes: "",
    honeypot: "", // Bot prevention
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Validate form fields locally
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full Name
    const nameTrimmed = formData.fullName.trim();
    if (!nameTrimmed) {
      newErrors.fullName = "Please enter your full name.";
    } else if (nameTrimmed.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    }

    // 2. Work Email
    const emailTrimmed = formData.workEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      newErrors.workEmail = "Please enter your work email.";
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.workEmail = "Please enter a valid business email address.";
    }

    // 3. Mobile / WhatsApp Number
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your mobile or WhatsApp number.";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Silent ignore for bots filling honeypot
    if (formData.honeypot) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Build structured WhatsApp URL with strict encoding
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
      setHandoffInitiated(true);

      // Attempt safe user-initiated new-tab opening
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }
    } catch {
      setErrors({ general: "Unable to prepare WhatsApp message. Please use the direct contact numbers below." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditEnquiry = () => {
    setHandoffInitiated(false);
  };

  return (
    <div className="pt-8 pb-28 lg:py-16 bg-slate-50 min-h-screen">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Corporate Credentials */}
          <div className="lg:col-span-5 space-y-6 min-w-0 w-full">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Sales & Support Desk
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1 break-words">
                Let&apos;s Build Your Voice Architecture
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed break-words">
                Connect directly with our Bengaluru telephony engineers. We assist with statutory KYC compliance, DID provisioning, and CRM workflows.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 w-full">
              {/* Direct Telephone */}
              <a
                href={`tel:${CONTACT_CONFIG.phoneTel}`}
                className="flex items-center space-x-3 p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors w-full min-w-0"
              >
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-slate-400">Direct Inbound Line</div>
                  <div className="text-sm font-semibold text-slate-900 truncate">{CONTACT_CONFIG.phoneDisplay}</div>
                </div>
              </a>

              {/* Direct WhatsApp Sales Desk */}
              <a
                href={CONTACT_CONFIG.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors w-full min-w-0"
              >
                <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-slate-400">Instant Messaging</div>
                  <div className="text-sm font-semibold text-slate-900 truncate">WhatsApp Sales Desk</div>
                </div>
              </a>

              {/* Physical Office Address */}
              <div className="flex items-start space-x-3 p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs w-full min-w-0">
                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="leading-snug min-w-0 flex-1">
                  <div className="text-[11px] text-slate-400">Commercial Operational Office</div>
                  <div className="font-semibold text-slate-900 mt-0.5 break-words">{CONTACT_CONFIG.companyLegalName}</div>
                  <div className="text-slate-500 mt-1 break-words">{CONTACT_CONFIG.address}</div>
                </div>
              </div>
            </div>

            {/* Corporate Regulatory Credentials */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 font-mono space-y-1 w-full min-w-0 break-all">
              <div>CIN: {CONTACT_CONFIG.cin}</div>
              <div>GSTIN: {CONTACT_CONFIG.gstin}</div>
              <div>PAN: {CONTACT_CONFIG.pan}</div>
            </div>
          </div>

          {/* Right Column: WhatsApp Handoff Consultation Form */}
          <div className="lg:col-span-7 min-w-0 w-full">
            <Card className="border-slate-200 shadow-md bg-white w-full overflow-hidden">
              <CardHeader className="border-b border-slate-100 p-4 sm:p-6 pb-4">
                <CardTitle className="text-lg sm:text-xl break-words">Request Demo & Custom Quotation</CardTitle>
                <CardDescription className="text-xs sm:text-sm break-words">
                  Prepare your enquiry for direct review with our sales engineers via WhatsApp.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {handoffInitiated ? (
                  /* Step 4: Transparent Handoff Status — No false submission claims */
                  <div className="py-4 sm:py-6 text-center space-y-5 min-w-0">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>

                    <div className="space-y-2">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Action Required in WhatsApp
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 break-words">
                        WhatsApp Handoff Prepared
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed break-words">
                        WhatsApp has been opened with your enquiry details. Please review the prefilled message and press <strong>Send</strong> to contact Hanva.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full">
                      <a
                        href={generatedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                      >
                        <Button variant="whatsapp" className="w-full sm:w-auto font-semibold min-h-[44px]">
                          <MessageSquare className="mr-2 h-4 w-4 shrink-0" />
                          <span>Open WhatsApp Again</span>
                          <ExternalLink className="ml-2 h-3.5 w-3.5 shrink-0" />
                        </Button>
                      </a>

                      <Button
                        variant="outline"
                        onClick={handleEditEnquiry}
                        className="w-full sm:w-auto text-slate-700 min-h-[44px]"
                      >
                        <RotateCcw className="mr-2 h-4 w-4 shrink-0" />
                        <span>Edit Enquiry Details</span>
                      </Button>
                    </div>

                    {/* Fallback Notice */}
                    <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1.5 break-words">
                      <p>
                        Unable to open WhatsApp? Please contact Hanva directly at{" "}
                        <a
                          href={`tel:${CONTACT_CONFIG.phoneTel}`}
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {CONTACT_CONFIG.phoneDisplay}
                        </a>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Note: Hanva does not store your enquiry on our servers. The enquiry reaches our team only after you click Send within WhatsApp.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Step 1 & 2: User Form with Inline Validation */
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

                    {errors.general && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{errors.general}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        id="fullName"
                        name="fullName"
                        label="Full Name *"
                        placeholder="e.g. Rajesh Kumar"
                        required
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        error={errors.fullName}
                        aria-invalid={!!errors.fullName}
                      />

                      <Input
                        id="companyName"
                        name="companyName"
                        label="Company Name"
                        placeholder="e.g. Acme FinTech Pvt. Ltd."
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        id="workEmail"
                        name="workEmail"
                        label="Work Email *"
                        type="email"
                        placeholder="e.g. rajesh@company.com"
                        required
                        value={formData.workEmail}
                        onChange={(e) => {
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
                        required
                        value={formData.phone}
                        onChange={(e) => {
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
                          className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                          value={formData.teamSize}
                          onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
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
                          className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                          value={formData.product}
                          onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                        >
                          <option value="Smart IVR & Cloud Telephony">Smart IVR & Cloud Telephony</option>
                          <option value="Auto & Predictive Dialers">Auto & Predictive Dialers</option>
                          <option value="Telecalling CRM">Telecalling & Sales CRM</option>
                          <option value="WhatsApp Business CRM">WhatsApp Business CRM</option>
                          <option value="Virtual Numbers & Toll-Free">Virtual Numbers & 1800 Toll-Free</option>
                          <option value="Enterprise Telecom Suite">Enterprise Telecom & CRM Suite</option>
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
                        className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none placeholder:text-slate-400"
                        placeholder="Tell us about your current calling volume, pulse requirements, or team setup..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                        <MessageSquare className="mr-2 h-5 w-5" />
                        {isSubmitting ? "Preparing WhatsApp..." : "Continue to WhatsApp"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>

                      {/* Explicit Guidance Text per Specification */}
                      <p className="text-xs text-slate-600 text-center leading-relaxed">
                        Your enquiry details will be prepared in WhatsApp. Review the message and press Send to contact the Hanva team.
                      </p>
                    </div>

                    {/* Privacy & Data Transfer Disclosure */}
                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 text-center space-y-1">
                      <p className="leading-relaxed">
                        Your enquiry details are formatted directly in your browser into a prepared WhatsApp message. When you click <strong>Continue to WhatsApp</strong>, these details will be shared with WhatsApp to open your chat. No enquiry data is stored on Hanva servers.
                      </p>
                      <p className="text-slate-400">
                        Governed by the Hanva{" "}
                        <Link href="/company/privacy-policy/" className="underline hover:text-slate-600">
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
