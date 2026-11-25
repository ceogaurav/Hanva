import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import { CheckCircle2, Sparkles, ArrowRight, Phone, MessageSquare, HelpCircle, Check, Minus, FileText, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Cloud Telephony & CRM Pricing Plans — Hanva Technologies",
  description:
    "Transparent cloud telephony and telecalling CRM pricing for Indian businesses. Dedicated virtual numbers, 15-second OBD pulse option, and customized commercial quotations.",
  alternates: {
    canonical: "https://hanva.in/pricing/",
  },
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Hanva Cloud Telephony & CRM Pricing Plans",
  url: "https://hanva.in/pricing/",
  description:
    "Commercial cloud telephony and telecalling CRM plans for Indian businesses. Dedicated virtual numbers, 15-second OBD pulse option, and custom quotations based on volume.",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    telephone: "+91-8423711043",
  },
};

export default function PricingPage() {
  const whatsappUrl = `https://wa.me/918423711043?text=${encodeURIComponent(
    "Hello Hanva Team, I would like to request a quotation for your cloud telephony and CRM plans."
  )}`;

  return (
    <div className="py-12 lg:py-16 bg-white space-y-16">
      <SchemaOrg schema={pricingSchema} />

      {/* Header */}
      <Container>
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="default">Transparent Commercial Tariffs</Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Predictable Cloud Telephony & CRM Plans
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            No hidden setup fees. Dedicated Indian telecom numbering blocks allocated across Vodafone Idea and Tata Teleservices with customized pulse billing options.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/pricing/calculator/">
              <Button variant="whatsapp" size="default">
                <Sparkles className="mr-2 h-4 w-4" />
                Open Voice Pulse Savings Calculator
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="default">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with Sales Desk
              </Button>
            </a>
          </div>
        </div>
      </Container>

      {/* Verified Commercial Invoice Showcase */}
      <Container>
        <div className="max-w-4xl mx-auto rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-emerald-200/80">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                  Documented Commercial Billing Benchmark
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Documented 15-Second Outbound OBD Pulse Tariff
                </h2>
              </div>
            </div>
            <Badge variant="success" className="bg-emerald-600 text-white font-semibold">
              Audited Enterprise Benchmark
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
              <div className="text-slate-500 text-[11px]">Billed Tariff Metric</div>
              <div className="text-base font-bold text-emerald-700 mt-0.5">₹0.15 / 15s OBD Pulse</div>
              <div className="text-slate-400 text-[10px] mt-1">Equivalent to ₹0.60/minute base rate</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
              <div className="text-slate-500 text-[11px]">Delivery Gateway</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">CloudConnect Telecom</div>
              <div className="text-slate-400 text-[10px] mt-1">Dedicated Vi & Tata DID carrier trunks</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
              <div className="text-slate-500 text-[11px]">Commercial Status</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">Custom Quotation</div>
              <div className="text-slate-400 text-[10px] mt-1">Quoted based on volume & concurrency</div>
            </div>
          </div>

          <p className="text-[11px] text-slate-600 mt-4 leading-relaxed">
            *This historical billing benchmark reflects documented enterprise billing for outbound OBD voice broadcasts (SAC 998419) and CRM user licensing (SAC 763522). This tariff specifically applies to outbound OBD voice broadcast campaigns and is not a universal rate for inbound IVR, 10-digit virtual numbers, or interactive agent calling. All new commercial accounts receive customized quotations based on required DID blocks, concurrent channels, and formal Service Level Agreements. Subject to statutory DoT KYC and 18% GST.
          </p>
        </div>
      </Container>

      {/* Plan Cards Grid */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Tier 1: Starter */}
          <Card className="flex flex-col justify-between border-slate-200">
            <CardHeader className="pb-4">
              <Badge variant="secondary" className="w-fit mb-2">SMB Inbound</Badge>
              <CardTitle className="text-2xl">Starter Cloud Voice</CardTitle>
              <CardDescription className="text-xs">
                Essential cloud telephony and smart IVR for growing teams taking inbound customer inquiries.
              </CardDescription>
              <div className="pt-4">
                <span className="text-2xl font-bold text-slate-900">Custom Quotation</span>
                <span className="text-xs text-slate-500 block mt-1">Tailored for SMB call volume</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 flex-1 text-xs">
              <div className="font-semibold text-slate-900 text-sm">Included Capabilities:</div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> 1 Dedicated 10-Digit Virtual DID</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Multi-Level Smart IVR Menu</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Up to 5 Agent Call Forwarding Channels</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Encrypted Call Recording & Storage</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Assisted Statutory KYC Verification</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Standard Email & Phone Support</li>
              </ul>
            </CardContent>
            <CardFooter className="pt-4 border-t border-slate-100">
              <Link href="/company/contact/" className="w-full">
                <Button variant="outline" className="w-full">Request Starter Quotation</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Tier 2: Growth Pro (Featured) */}
          <Card className="flex flex-col justify-between border-blue-500 shadow-lg relative bg-white">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="default" className="bg-blue-600 text-white font-semibold">
                Most Popular for Outbound
              </Badge>
            </div>
            <CardHeader className="pb-4">
              <Badge variant="default" className="w-fit mb-2">Growth Teams</Badge>
              <CardTitle className="text-2xl">Telecalling Pro + CRM</CardTitle>
              <CardDescription className="text-xs">
                Unified progressive auto-dialer and telecalling CRM for active inside sales teams.
              </CardDescription>
              <div className="pt-4">
                <span className="text-2xl font-bold text-slate-900">Custom Quotation</span>
                <span className="text-xs text-slate-500 block mt-1">Includes CRM seats & dialer licensing</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 flex-1 text-xs">
              <div className="font-semibold text-slate-900 text-sm">Everything in Starter, plus:</div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> Telecalling CRM User Seats</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> Progressive Outbound Auto-Dialer</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> 1-Click Click-to-Call from Browser</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> 15-Second OBD Voice Pulse Option</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> Live Agent Activity & Call Recording Review</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> WhatsApp Notification Triggers</li>
              </ul>
            </CardContent>
            <CardFooter className="pt-4 border-t border-slate-100">
              <Link href="/company/contact/" className="w-full">
                <Button variant="primary" className="w-full">Request Pro Quotation</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Tier 3: Enterprise */}
          <Card className="flex flex-col justify-between border-slate-200">
            <CardHeader className="pb-4">
              <Badge variant="secondary" className="w-fit mb-2">Enterprise Contact Center</Badge>
              <CardTitle className="text-2xl">Enterprise BPO Suite</CardTitle>
              <CardDescription className="text-xs">
                High-density predictive dialer, custom SIP trunking, and tailored SLAs for 25+ agents.
              </CardDescription>
              <div className="pt-4">
                <span className="text-2xl font-bold text-slate-900">Custom Quotation</span>
                <span className="text-xs text-slate-500 block mt-1">High concurrency & volume commitments</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 flex-1 text-xs">
              <div className="font-semibold text-slate-900 text-sm">Enterprise Capabilities:</div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> High-Concurrency Dialer & Carrier Signaling AMD</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Dedicated PRI / SIP Trunk Allocations</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Negotiated Pulse Duration & Rates</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Custom REST API & Webhook Integrations</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> WhatsApp Business API Integration Support</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Dedicated Account Manager & Priority SLA</li>
              </ul>
            </CardContent>
            <CardFooter className="pt-4 border-t border-slate-100">
              <Link href="/company/contact/" className="w-full">
                <Button variant="outline" className="w-full">Contact Enterprise Sales</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </Container>

      {/* Comprehensive Feature Comparison Matrix */}
      <Container>
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">Plan Feature Comparison Matrix</h2>
            <p className="text-xs text-slate-500 mt-1">Detailed breakdown of capabilities across service tiers.</p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                  <th className="p-3.5 font-semibold">Platform Feature</th>
                  <th className="p-3.5 font-semibold text-center">Starter Plan</th>
                  <th className="p-3.5 font-semibold text-center bg-blue-50/60 text-blue-700">Growth Pro</th>
                  <th className="p-3.5 font-semibold text-center">Enterprise Suite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3.5 font-medium text-slate-900">Virtual Mobile DIDs Included</td>
                  <td className="p-3.5 text-center">1 Dedicated DID</td>
                  <td className="p-3.5 text-center bg-blue-50/30 font-medium text-slate-900">Dedicated DIDs (Add-ons available)</td>
                  <td className="p-3.5 text-center">Custom Range (10+)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-slate-900">Telecalling CRM User Seats</td>
                  <td className="p-3.5 text-center">Custom Add-on</td>
                  <td className="p-3.5 text-center bg-blue-50/30 font-medium text-slate-900">Included in Quote</td>
                  <td className="p-3.5 text-center">25+ Seats Included</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-slate-900">Multi-Level Smart IVR</td>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3.5 text-center bg-blue-50/30"><Check className="h-4 w-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-slate-900">Progressive Auto-Dialer</td>
                  <td className="p-3.5 text-center"><Minus className="h-4 w-4 text-slate-300 mx-auto" /></td>
                  <td className="p-3.5 text-center bg-blue-50/30"><Check className="h-4 w-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-slate-900">Predictive Dialing with Carrier AMD (Enterprise Trunks)</td>
                  <td className="p-3.5 text-center"><Minus className="h-4 w-4 text-slate-300 mx-auto" /></td>
                  <td className="p-3.5 text-center bg-blue-50/30"><Minus className="h-4 w-4 text-slate-300 mx-auto" /></td>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-slate-900">15s OBD Pulse Billing Option</td>
                  <td className="p-3.5 text-center"><Minus className="h-4 w-4 text-slate-300 mx-auto" /></td>
                  <td className="p-3.5 text-center bg-blue-50/30"><Check className="h-4 w-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-slate-900">Agent Call Recording & QA Auditing</td>
                  <td className="p-3.5 text-center"><Minus className="h-4 w-4 text-slate-300 mx-auto" /></td>
                  <td className="p-3.5 text-center bg-blue-50/30"><Check className="h-4 w-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-slate-900">Audio Recording Retention</td>
                  <td className="p-3.5 text-center">Standard Schedule</td>
                  <td className="p-3.5 text-center bg-blue-50/30">Extended Schedule</td>
                  <td className="p-3.5 text-center">Custom Enterprise Terms</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-slate-900">Support Level</td>
                  <td className="p-3.5 text-center">Standard Support</td>
                  <td className="p-3.5 text-center bg-blue-50/30 font-medium">WhatsApp + Phone</td>
                  <td className="p-3.5 text-center font-medium">24/7 Dedicated Manager</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
            *All service agreements are subject to Department of Telecommunications (DoT) statutory KYC validation and applicable Goods and Services Tax (GST 18%). Rates and terms depend on formal written quotations and volume commitments.
          </p>
        </div>
      </Container>
    </div>
  );
}
