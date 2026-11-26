import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import { TrackedDemoLink, TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG } from "@/lib/config";
import { CheckCircle2, Sparkles, ArrowRight, Phone, MessageSquare, Check, Minus, FileText, ShieldCheck, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Cloud Telephony & CRM Pricing Plans",
  description:
    "Transparent cloud telephony and telecalling CRM pricing for Indian businesses. Dedicated virtual numbers, 15-second OBD pulse option, and customized commercial quotations.",
  alternates: {
    canonical: "https://www.hanva.in/pricing/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/pricing/",
    siteName: "Hanva Technologies",
    title: "Cloud Telephony & CRM Pricing Plans | Hanva Technologies",
    description: "Transparent cloud telephony and telecalling CRM pricing for Indian businesses. Dedicated virtual numbers, 15-second OBD pulse option, and customized commercial quotations.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Cloud Telephony & CRM Pricing Plans" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Telephony & CRM Pricing Plans | Hanva Technologies",
    description: "Transparent cloud telephony and telecalling CRM pricing for Indian businesses. Dedicated virtual numbers, 15-second OBD pulse option, and customized commercial quotations.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Hanva Cloud Telephony & CRM Pricing Plans",
  url: "https://www.hanva.in/pricing/",
  description:
    "Commercial cloud telephony and telecalling CRM plans for Indian businesses. Dedicated virtual numbers, 15-second OBD pulse option, and custom quotations based on volume.",
  provider: {
    "@type": "Organization",
    name: CONTACT_CONFIG.companyLegalName,
    telephone: "+91-8423711043",
  },
};

export default function PricingPage() {
  const whatsappUrl = `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
    "Hello Hanva Team, I would like to request a formal quotation for your cloud telephony and CRM plans."
  )}`;

  return (
    <div className="pt-12 pb-28 lg:py-16 bg-white space-y-16">
      <SchemaOrg schema={pricingSchema} />

      {/* Header */}
      <Container>
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="default">Transparent Commercial Framework</Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Predictable Cloud Telephony &amp; CRM Plans
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Dedicated Indian telecom numbering blocks provisioned via Vodafone Idea and Tata Teleservices gateways with customized pulse billing options and formal written quotations.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
            <Button asChild variant="primary" size="default" className="w-full sm:w-auto">
              <Link href="/pricing/calculator/">
                <Sparkles className="mr-2 h-4 w-4 text-emerald-300" aria-hidden="true" />
                <span>Simulate Costs in Pulse Calculator</span>
              </Link>
            </Button>
            <div className="flex flex-col items-center w-full sm:w-auto">
              <Button asChild variant="whatsapp" size="default" className="w-full sm:w-auto">
                <TrackedWhatsAppLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="pricing_hero"
                contextRef="/pricing/"
               
              >
                  <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Request Quote on WhatsApp</span>
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                </TrackedWhatsAppLink>
              </Button>
            </div>
          </div>
          <p className="text-[11px] text-slate-600">
            WhatsApp button opens a pre-filled message in WhatsApp — press Send to chat with our team.
          </p>
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
              <div className="text-slate-600 text-[11px]">Billed Tariff Metric</div>
              <div className="text-base font-bold text-emerald-700 mt-0.5">₹0.15 / 15s OBD Pulse</div>
              <div className="text-slate-600 text-[10px] mt-1">Equivalent to ₹0.60/minute base rate</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
              <div className="text-slate-600 text-[11px]">Delivery Gateway</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">CloudConnect Telecom</div>
              <div className="text-slate-600 text-[10px] mt-1">Dedicated Vi & Tata DID carrier trunks</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
              <div className="text-slate-600 text-[11px]">Commercial Status</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">Custom Quotation</div>
              <div className="text-slate-600 text-[10px] mt-1">Quoted based on volume & concurrency</div>
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
              <Button asChild variant="outline" className="w-full">
                <TrackedDemoLink
                href="/company/contact/?plan=starter&product=cloud-telephony"
                ctaLocation="pricing_starter_card"
                ctaLabelKey="request_starter_quotation"
                className="w-full"
              >Request Starter Quotation</TrackedDemoLink>
              </Button>
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
              <CardDescription className="text-xs text-slate-600">
                Unified progressive auto-dialer and telecalling CRM for active inside sales teams.
              </CardDescription>
              <div className="pt-4">
                <span className="text-2xl font-bold text-slate-900">Custom Quotation</span>
                <span className="text-xs text-slate-600 block mt-1">Historical seat benchmark: ₹499/user/mo + usage</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 flex-1 text-xs">
              <div className="font-semibold text-slate-900 text-sm">Everything in Starter, plus:</div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> Telecalling CRM User Seats</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> Progressive Outbound Auto-Dialer</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> 1-Click Click-to-Call from Browser</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> 15-Second OBD Voice Pulse Option</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> Live Agent Activity &amp; Call Recording Review</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 shrink-0" /> WhatsApp Notification Triggers</li>
              </ul>
            </CardContent>
            <CardFooter className="pt-4 border-t border-slate-100">
              <Button asChild variant="primary" className="w-full">
                <TrackedDemoLink
                href="/company/contact/?plan=growth-pro&product=auto-dialer"
                ctaLocation="pricing_growth_card"
                ctaLabelKey="request_pro_quotation"
                className="w-full"
              >Request Pro Quotation</TrackedDemoLink>
              </Button>
            </CardFooter>
          </Card>

          {/* Tier 3: Enterprise */}
          <Card className="flex flex-col justify-between border-slate-200">
            <CardHeader className="pb-4">
              <Badge variant="secondary" className="w-fit mb-2">Enterprise Contact Center</Badge>
              <CardTitle className="text-2xl">Enterprise BPO Suite</CardTitle>
              <CardDescription className="text-xs text-slate-600">
                High-density predictive dialer, custom SIP trunking, and tailored SLAs for 25+ agents.
              </CardDescription>
              <div className="pt-4">
                <span className="text-2xl font-bold text-slate-900">Custom Quotation</span>
                <span className="text-xs text-slate-600 block mt-1">High concurrency &amp; volume commitments</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 flex-1 text-xs">
              <div className="font-semibold text-slate-900 text-sm">Enterprise Capabilities:</div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> High-Concurrency Dialer &amp; Carrier Signaling AMD</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Dedicated PRI / SIP Trunk Allocations</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Negotiated Pulse Duration &amp; Rates</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Custom REST API &amp; Webhook Integrations</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> WhatsApp Business API Integration Support</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" /> Dedicated Account Manager &amp; Priority SLA</li>
              </ul>
            </CardContent>
            <CardFooter className="pt-4 border-t border-slate-100">
              <Button asChild variant="outline" className="w-full">
                <TrackedDemoLink
                href="/company/contact/?plan=enterprise&product=enterprise"
                ctaLocation="pricing_enterprise_card"
                ctaLabelKey="contact_enterprise_sales"
                className="w-full"
              >Contact Enterprise Sales</TrackedDemoLink>
              </Button>
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

          <div
            className="relative overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs"
            tabIndex={0}
            role="region"
            aria-label="Plan feature comparison matrix"
          >
            <table className="w-full text-xs text-left border-collapse">
              <caption className="sr-only">Comparison of Starter, Growth Pro, and Enterprise cloud telephony plans</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                  <th scope="col" className="p-3.5 font-semibold">Platform Feature</th>
                  <th scope="col" className="p-3.5 font-semibold text-center">Starter Plan</th>
                  <th scope="col" className="p-3.5 font-semibold text-center bg-blue-50/60 text-blue-700">Growth Pro</th>
                  <th scope="col" className="p-3.5 font-semibold text-center">Enterprise Suite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <th scope="row" className="p-3.5 font-medium text-slate-900">Virtual Mobile DIDs Included</th>
                  <td className="p-3.5 text-center">1 Dedicated DID</td>
                  <td className="p-3.5 text-center bg-blue-50/30 font-medium text-slate-900">Dedicated DIDs (Add-ons available)</td>
                  <td className="p-3.5 text-center">Custom Range (10+)</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3.5 font-medium text-slate-900">Telecalling CRM User Seats</th>
                  <td className="p-3.5 text-center">Custom Add-on</td>
                  <td className="p-3.5 text-center bg-blue-50/30 font-medium text-slate-900">Included in Quote</td>
                  <td className="p-3.5 text-center">25+ Seats Included</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3.5 font-medium text-slate-900">Multi-Level Smart IVR</th>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" aria-hidden="true" /><span className="sr-only">Included</span></td>
                  <td className="p-3.5 text-center bg-blue-50/30"><Check className="h-4 w-4 text-emerald-600 mx-auto" aria-hidden="true" /><span className="sr-only">Included</span></td>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" aria-hidden="true" /><span className="sr-only">Included</span></td>
                </tr>
                <tr>
                  <th scope="row" className="p-3.5 font-medium text-slate-900">Progressive Auto-Dialer</th>
                  <td className="p-3.5 text-center"><Minus className="h-4 w-4 text-slate-400 mx-auto" aria-hidden="true" /><span className="sr-only">Not included</span></td>
                  <td className="p-3.5 text-center bg-blue-50/30"><Check className="h-4 w-4 text-emerald-600 mx-auto" aria-hidden="true" /><span className="sr-only">Included</span></td>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" aria-hidden="true" /><span className="sr-only">Included</span></td>
                </tr>
                <tr>
                  <th scope="row" className="p-3.5 font-medium text-slate-900">Predictive Dialing with Carrier AMD (Enterprise Trunks)</th>
                  <td className="p-3.5 text-center"><Minus className="h-4 w-4 text-slate-400 mx-auto" aria-hidden="true" /><span className="sr-only">Not included</span></td>
                  <td className="p-3.5 text-center bg-blue-50/30"><Minus className="h-4 w-4 text-slate-400 mx-auto" aria-hidden="true" /><span className="sr-only">Not included</span></td>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" aria-hidden="true" /><span className="sr-only">Included</span></td>
                </tr>
                <tr>
                  <th scope="row" className="p-3.5 font-medium text-slate-900">15s OBD Pulse Billing Option</th>
                  <td className="p-3.5 text-center"><Minus className="h-4 w-4 text-slate-400 mx-auto" aria-hidden="true" /><span className="sr-only">Not included</span></td>
                  <td className="p-3.5 text-center bg-blue-50/30"><Check className="h-4 w-4 text-emerald-600 mx-auto" aria-hidden="true" /><span className="sr-only">Included</span></td>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" aria-hidden="true" /><span className="sr-only">Included</span></td>
                </tr>
                <tr>
                  <th scope="row" className="p-3.5 font-medium text-slate-900">Agent Call Recording &amp; QA Auditing</th>
                  <td className="p-3.5 text-center"><Minus className="h-4 w-4 text-slate-400 mx-auto" aria-hidden="true" /><span className="sr-only">Not included</span></td>
                  <td className="p-3.5 text-center bg-blue-50/30"><Check className="h-4 w-4 text-emerald-600 mx-auto" aria-hidden="true" /><span className="sr-only">Included</span></td>
                  <td className="p-3.5 text-center"><Check className="h-4 w-4 text-emerald-600 mx-auto" aria-hidden="true" /><span className="sr-only">Included</span></td>
                </tr>
                <tr>
                  <th scope="row" className="p-3.5 font-medium text-slate-900">Audio Recording Retention</th>
                  <td className="p-3.5 text-center">Standard Schedule</td>
                  <td className="p-3.5 text-center bg-blue-50/30">Extended Schedule</td>
                  <td className="p-3.5 text-center">Custom Enterprise Terms</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3.5 font-medium text-slate-900">Support Level</th>
                  <td className="p-3.5 text-center">Standard Support</td>
                  <td className="p-3.5 text-center bg-blue-50/30 font-medium">WhatsApp + Phone</td>
                  <td className="p-3.5 text-center font-medium">24/7 Dedicated Manager</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed">
            *All service agreements are subject to Department of Telecommunications (DoT) statutory KYC validation and applicable Goods and Services Tax (GST 18%). Rates and terms depend on formal written quotations and volume commitments.
          </p>

          {/* Bottom Pricing Conversion Callout */}
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white text-center space-y-4">
            <h2 className="text-2xl font-bold">Need a Custom Quotation Tailored to Your Team?</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Share your expected agent count, regional STD/virtual numbers, and outbound dialer requirements for a clear written commercial proposal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                <TrackedDemoLink
                href="/company/contact/?plan=custom"
                ctaLocation="pricing_bottom_banner"
                ctaLabelKey="request_custom_quotation"
               
              >
                  <span>Request Custom Quotation</span>
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </TrackedDemoLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-slate-600 text-white hover:bg-slate-800">
                <Link href="/resources/cloud-telephony-pricing-guide/">
                  Read Indian Pricing Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
