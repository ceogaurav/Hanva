"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    workEmail: "",
    phone: "",
    teamSize: "5-15 agents",
    product: "Smart IVR & Telephony",
    notes: "",
    honeypot: "", // Spam prevention
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard for bots

    setLoading(true);
    // Simulate staging submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="py-12 lg:py-16 bg-slate-50 min-h-screen">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Corporate Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Sales & Support Desk
              </span>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Let&apos;s Build Your Voice Architecture
              </h1>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Connect directly with our Bengaluru telephony engineers. We assist with statutory KYC compliance, DID provisioning, and CRM workflows.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <a
                href="tel:+918423711043"
                className="flex items-center space-x-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors"
              >
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Direct Inbound Line</div>
                  <div className="text-sm font-semibold text-slate-900">+91 8423711043</div>
                </div>
              </a>

              <a
                href="https://wa.me/918423711043?text=Hello%20Hanva%20Team%2C%20I%20would%20like%20to%20request%20a%20sales%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors"
              >
                <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Instant Messaging</div>
                  <div className="text-sm font-semibold text-slate-900">WhatsApp Sales Desk</div>
                </div>
              </a>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="leading-snug">
                  <div className="text-[11px] text-slate-400">Commercial Operational Office</div>
                  <div className="font-semibold text-slate-900 mt-0.5">HANVA TECHNOLOGIES PVT. LTD.</div>
                  <div className="text-slate-500 mt-1">
                    Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya, Bengaluru - 560068, Karnataka
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 font-mono space-y-1">
              <div>CIN: U78100KA2025PTC205168</div>
              <div>GSTIN: 29AAICH0526K1ZF</div>
              <div>PAN: AAICH0526K</div>
            </div>
          </div>

          {/* Right Column: High-Conversion Consultation Form */}
          <div className="lg:col-span-7">
            <Card className="border-slate-200 shadow-md bg-white">
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="text-xl">Request Demo & Custom Quotation</CardTitle>
                <CardDescription>
                  Our telecom consultants respond within 2 business hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {submitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Request Acknowledged in Preview</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you, {formData.fullName}. Your request has been acknowledged in this preview. To ensure our team receives your enquiry immediately, please contact us directly through WhatsApp or call our team.
                    </p>
                    <div className="pt-4">
                      <a
                        href={`https://wa.me/918423711043?text=Hello%20Hanva%20Team%2C%20I%20just%20submitted%20a%20demo%20request%20for%20${encodeURIComponent(formData.product)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="whatsapp">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Chat on WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot hidden input */}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        id="fullName"
                        name="fullName"
                        label="Full Name *"
                        placeholder="e.g. Rajesh Kumar"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                      <Input
                        id="workEmail"
                        name="workEmail"
                        label="Work Email *"
                        type="email"
                        placeholder="e.g. rajesh@company.com"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        id="phone"
                        name="phone"
                        label="Mobile / WhatsApp Number *"
                        type="tel"
                        placeholder="e.g. +91 9876543210"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />

                      <div className="space-y-1.5">
                        <label htmlFor="team-size" className="block text-xs font-medium text-slate-700">Team Size</label>
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
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="product-interest" className="block text-xs font-medium text-slate-700">Primary Product Interest</label>
                      <select
                        id="product-interest"
                        className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                        value={formData.product}
                        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      >
                        <option value="Smart IVR & Telephony">Smart IVR & Cloud Telephony</option>
                        <option value="Auto & Predictive Dialers">Auto & Predictive Dialers</option>
                        <option value="Telecalling CRM">Telecalling & Sales CRM</option>
                        <option value="WhatsApp Business CRM">WhatsApp Business CRM</option>
                        <option value="Virtual Numbers & Toll-Free">Virtual Numbers & 1800 Toll-Free</option>
                        <option value="Enterprise Suite">Enterprise Telecom & CRM Suite</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-notes" className="block text-xs font-medium text-slate-700">Specific Requirements (Optional)</label>
                      <textarea
                        id="contact-notes"
                        rows={3}
                        className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none placeholder:text-slate-400"
                        placeholder="Tell us about your current calling volume, pulse requirements, or team setup..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>

                    <Button type="submit" variant="primary" className="w-full h-12 text-base font-semibold" disabled={loading}>
                      {loading ? "Transmitting..." : "Submit Consultation Request"}
                    </Button>

                    <p className="text-[11px] text-slate-400 text-center">
                      We respect your privacy. No unsolicited promotional messages. Information is governed by our Privacy Policy.
                    </p>
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
