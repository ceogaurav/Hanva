import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { SchemaOrg } from "@/components/shared/schema-org";
import { TrackedDemoLink, TrackedPhoneLink } from "@/components/analytics/tracked-links";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Phone,
  HelpCircle,
  ExternalLink,
  BookOpen,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "TRAI DLT Compliance & Registration Guide",
  description:
    "A pragmatic enterprise guide to Telecom Regulatory Authority of India (TRAI) Distributed Ledger Technology (DLT) registration for voice headers and SMS templates.",
  alternates: {
    canonical: "https://hanva.in/resources/dlt-compliance-guide/",
  },
};

const dltGuideSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "TRAI DLT Compliance & Entity Registration Guide for Indian Businesses",
  description:
    "Step-by-step guidance on registering as a Principal Entity (PE), securing approved voice caller IDs, and whitelisting message templates on Indian telecom DLT portals.",
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  url: "https://hanva.in/resources/dlt-compliance-guide/",
};

const dltSteps = [
  {
    step: "STEP 01",
    title: "Principal Entity (PE) Registration",
    description:
      "Register your legal business entity on any authorized telecom DLT portal (e.g., Vilpower / Vi, Jio DLT, Airtel DLT, or Tata DLT). You will receive a unique Principal Entity ID.",
    requirements: [
      "Company PAN Card & Certificate of Incorporation",
      "GST Registration Certificate (GSTIN)",
      "Proof of Authorized Signatory & Letter of Authorization (LOA)",
      "Registered Business Address Proof",
    ],
  },
  {
    step: "STEP 02",
    title: "Header (Sender ID) Registration",
    description:
      "Apply for your 6-character alphanumeric SMS headers (e.g., HNVSLS, HNVTRX) and register your dedicated voice caller IDs matching your brand or corporate trade name.",
    requirements: [
      "Exact match or phonetic abbreviation of registered company name",
      "Trademark Certificate (if using a distinct brand name)",
      "Header categorization: Promotional, Service Implicit, or Service Explicit",
    ],
  },
  {
    step: "STEP 03",
    title: "Content Template Approval",
    description:
      "Submit message templates with standardized dynamic variables ({#var#}) for booking confirmations, OTP verifications, follow-ups, and service notifications.",
    requirements: [
      "Clearly defined brand name in template body",
      "Restricted variable length (maximum 30 characters per variable)",
      "Strict separation of transactional alerts and promotional marketing",
    ],
  },
  {
    step: "STEP 04",
    title: "Carrier DID Mapping on Hanva",
    description:
      "Provide your approved Entity ID, Header ID, and Template IDs to your Hanva onboarding engineer to bind them directly to your cloud telephony DIDs and WhatsApp workflows.",
    requirements: [
      "Principal Entity ID verification letter",
      "Approved Header screenshot or portal export",
      "Active telecom carrier trunk mapping",
    ],
  },
];

const faqs: FAQItem[] = [
  {
    question: "Do we need to register on all telecom operator DLT portals?",
    answer:
      "No. Under TRAI regulations, registering as a Principal Entity on any one telecom operator's DLT portal (such as Vodafone Idea Vilpower, Jio DLT, Airtel, or Tata Teleservices) creates a central record that is automatically synchronized across all Indian telecom networks through the Distributed Ledger.",
  },
  {
    question: "What is the difference between Service Implicit and Promotional templates?",
    answer:
      "Service Implicit templates are reserved for essential transactional messages requested by the customer (such as appointment confirmations, OTP verification codes, and purchase invoices) and can be sent to DND-registered numbers 24/7. Promotional templates contain marketing offers, discounts, or sales solicitations and can only be delivered to non-DND numbers between 10:00 AM and 9:00 PM IST.",
  },
  {
    question: "Does Hanva assist with the DLT registration process?",
    answer:
      "Yes. Hanva's Bengaluru onboarding team provides end-to-end guidance. We help review your documentation, draft compliant template copy, and map your approved Entity ID and Headers directly to your virtual numbers and CRM pipelines.",
  },
  {
    question: "What are the new 140 and 160 series telemarketing numbering directives?",
    answer:
      "Under recent TRAI and DoT directives, commercial outbound marketing calls are allocated dedicated 140 series numbering, while transactional and service calls (such as bank alerts and customer support callbacks) are transitioned to dedicated 160 series numbering blocks. Hanva assists in correctly categorizing outbound calling trunks, subject to licensed telecom service provider numbering inventory, allocation timelines, and carrier trunk availability.",
  },
];

export default function DltComplianceGuidePage() {
  return (
    <div className="py-10 lg:py-16 bg-white min-h-screen">
      <SchemaOrg data={dltGuideSchema} />

      <Container className="space-y-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/resources/" className="hover:text-blue-600 transition-colors">
            Resources
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">DLT Compliance Guide</span>
        </nav>

        {/* Hero Header */}
        <div className="space-y-4">
          <Badge variant="default" className="text-xs">
            Regulatory & Statutory Compliance
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            TRAI DLT Registration & Compliance Guide for Indian Enterprises
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A practical, step-by-step roadmap for Indian businesses to register as a Principal Entity, secure approved sender headers, whitelist message templates, and maintain structured alignment with TRAI and DoT telecommunications regulations.
          </p>
        </div>

        {/* Important Regulatory Context */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-6 space-y-3 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-center space-x-2 font-semibold text-blue-900 text-sm">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span>Why DLT Registration is Mandatory in India</span>
          </div>
          <p>
            Under the Telecom Commercial Communications Customer Preference Regulations (TCCCPR, 2018) enacted by the Telecom Regulatory Authority of India (TRAI), any business initiating commercial SMS alerts, voice broadcasts, or automated telephony calls to Indian phone numbers must be registered on an authorized telecom blockchain Distributed Ledger Technology (DLT) platform.
          </p>
          <p>
            Unregistered entities face immediate message scrubbing, telecom channel blocking, and statutory financial penalties. Hanva assists all enterprise clients with obtaining expedited Principal Entity approvals.
          </p>
        </div>

        {/* 4-Step Registration Process */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Step-by-Step DLT Registration Blueprint</h2>
            <p className="text-xs text-slate-500 mt-1">Execute these four steps to align with TRAI commercial DLT requirements.</p>
          </div>

          <div className="space-y-6">
            {dltSteps.map((step, idx) => (
              <Card key={idx} className="border-slate-200 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                      {step.step}
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      Mandatory
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-slate-900 mt-1">{step.title}</CardTitle>
                  <CardDescription className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-semibold text-slate-800 block">Required Documentation:</span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {step.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-center">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Compliance Pitfalls */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-6 space-y-4">
          <div className="flex items-center space-x-2 text-sm font-semibold text-amber-950">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
            <span>Critical DLT Mistakes to Avoid</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-amber-900">
            <div className="space-y-1">
              <strong>1. Mismatched Brand & Entity Names:</strong>
              <p className="text-amber-800 leading-normal">
                Applying for headers that do not match your Certificate of Incorporation or registered trademark will result in immediate portal rejection.
              </p>
            </div>
            <div className="space-y-1">
              <strong>2. Unbounded Variable Lengths:</strong>
              <p className="text-amber-800 leading-normal">
                Templates where variable fields exceed 30 characters or contain promotional wording inside transactional categories are scrubbed by telecom firewalls.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">DLT Compliance FAQs</h2>
            <p className="text-xs text-slate-500 mt-1">Common regulatory questions and compliance requirements.</p>
          </div>
          <FAQAccordion items={faqs} />
        </div>

        {/* Consultation Callout */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Need Assistance with DLT Registration?</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Our compliance desk assists Hanva clients with DLT portal account setup, Letter of Authorization drafting, and fast-track template approvals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild variant="primary" size="lg">
              <TrackedDemoLink
              href="/company/contact/?product=smart-ivr&intent=dlt-compliance"
              ctaLocation="dlt_compliance_guide_bottom"
              ctaLabelKey="request_compliance_assistance"
              productSlug="smart-ivr"
            >
                Request Compliance Assistance
              </TrackedDemoLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-300">
              <TrackedPhoneLink href="tel:+918423711043" ctaLocation="dlt_compliance_guide_bottom">
                <Phone className="mr-2 h-4 w-4 text-blue-600" />
                Call Desk: +91 8423711043
              </TrackedPhoneLink>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
