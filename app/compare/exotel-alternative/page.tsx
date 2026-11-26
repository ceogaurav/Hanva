import * as React from "react";
import { CompareLayout } from "@/components/shared/compare-layout";

export const metadata = {
  title: "Exotel Alternative in India — Unified Telephony & CRM",
  description:
    "Evaluating an Exotel alternative? Compare Hanva's native telecalling CRM, 15-second OBD pulse billing option, and transparent commercial models.",
  alternates: {
    canonical: "https://www.hanva.in/compare/exotel-alternative/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/compare/exotel-alternative/",
    siteName: "Hanva Technologies",
    title: "Exotel Alternative in India — Unified Telephony & CRM | Hanva Technologies",
    description: "Evaluating an Exotel alternative? Compare Hanva's native telecalling CRM, 15-second OBD pulse billing option, and transparent commercial models.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Exotel Alternative in India — Unified Telephony & CRM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exotel Alternative in India — Unified Telephony & CRM | Hanva Technologies",
    description: "Evaluating an Exotel alternative? Compare Hanva's native telecalling CRM, 15-second OBD pulse billing option, and transparent commercial models.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const exotelCompareSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Hanva vs Exotel Alternative Comparison",
  description:
    "Architectural and commercial comparison between Exotel cloud telephony APIs and Hanva unified cloud telephony CRM platform in India.",
  url: "https://www.hanva.in/compare/exotel-alternative/",
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
};

export default function ExotelAlternativePage() {
  return (
    <CompareLayout
      competitorName="Exotel"
      title="Hanva vs. Exotel: An Objective Architectural Comparison"
      subtitle="Discover why Indian sales and support teams switch from developer-centric telephony APIs to Hanva's integrated, business-ready telecalling CRM platform."
      executiveSummary="While Exotel is a well-established developer-first CPaaS provider, implementing end-to-end business workflows often requires subscribing to third-party CRMs, writing extensive API middleware, and managing double-leg billing deductions. Hanva unifies cloud voice infrastructure, multi-level IVRs, progressive auto-dialers, and inside sales pipelines into one turnkey SaaS platform backed by dedicated Vi and Tata carrier DIDs and an available 15-second OBD pulse option."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compare" },
        { label: "Exotel Alternative" },
      ]}
      whatsappRef="/compare/exotel-alternative/"
      keyDifferentiators={[
        {
          badge: "Turnkey Architecture",
          title: "Native Unified CRM & Softphone",
          description: "Hanva bundles click-to-call, lead pipelines, disposition tagging, and call recordings out-of-the-box without requiring third-party CRM licensing or custom API development.",
        },
        {
          badge: "Granular Metering",
          title: "15-Second OBD Pulse Option",
          description: "For high-volume outbound voice broadcast campaigns, Hanva provides an available 15-second billing pulse option rather than standard 60-second retail rounding.",
        },
        {
          badge: "Direct Support",
          title: "Direct Engineering Onboarding",
          description: "Direct WhatsApp and voice access to Bengaluru telephony engineers who assist with DLT template approvals, DID provisioning, and telecaller training.",
        },
      ]}
      matrixRows={[
        {
          parameter: "Primary Architecture",
          competitor: "Developer-centric CPaaS / Raw Telephony APIs",
          hanva: "Turnkey Telephony + Integrated Sales CRM",
          advantage: "Pre-built platform workflows and CRM integration",
        },
        {
          parameter: "CRM Workflow Layer",
          competitor: "Typically pairs with external CRM (LeadSquared / Zoho / Salesforce)",
          hanva: "Native inside sales CRM with deal stages & dispositions",
          advantage: "Built-in CRM without separate software licensing",
        },
        {
          parameter: "Outbound Dialing Modes",
          competitor: "Standard API-triggered calls / Click-to-call widgets",
          hanva: "Progressive auto-dialer with 2-click outcome tagging",
          advantage: "Streamlined telecaller outbound cadence",
        },
        {
          parameter: "Broadcast Pulse Billing",
          competitor: "Standard 60-second pulse rounding across campaigns",
          hanva: "Available 15-second OBD pulse billing option",
          advantage: "Granular metering on short broadcast calls",
        },
        {
          parameter: "WhatsApp Integration",
          competitor: "Exotel Ameyo / separate messaging API contracts",
          hanva: "Automated post-call brochure triggers via authorized BSP",
          advantage: "Built-in post-call collateral drops",
        },
        {
          parameter: "Mobile Telecalling Mode",
          competitor: "Requires softphone app or PSTN call forwarding",
          hanva: "Dual Mode: Cloud DID softphone + Android SIM calling",
          advantage: "Flexibility for distributed remote reps",
        },
        {
          parameter: "Carrier Interconnects",
          competitor: "Multi-carrier routing via proprietary cloud",
          hanva: "Vodafone Idea & Tata Teleservices carrier gateways",
          advantage: "Transparent enterprise DID origin",
        },
        {
          parameter: "Customer Onboarding",
          competitor: "Self-serve documentation or enterprise ticket desk",
          hanva: "Assisted DLT registration & dedicated Bengaluru desk",
          advantage: "Hands-on regulatory onboarding and local compliance assistance",
        },
      ]}
      architecturalPillars={[
        {
          title: "Turnkey Deployment vs. API Integration Overheads",
          description: "Building an enterprise sales desk on top of raw telephony APIs requires dedicated software engineering resources, webhook listeners, and third-party CRM connectors. Hanva provides an integrated operational telephony and CRM suite ready on Day 1.",
        },
        {
          title: "Transparent Commercial Modeling",
          description: "Instead of two-legged call forwarding where both legs incur simultaneous per-minute credit deductions, Hanva structures custom commercial proposals with clear pulse intervals and unified user seat licensing.",
        },
        {
          title: "Empirical Billing Benchmarks",
          description: "Hanva demonstrates real-world billing capability through documented commercial benchmarks (such as verified 15-second outbound OBD broadcast arrangements). All client commercials are structured via custom quotations tailored to call volumes and concurrency.",
        },
        {
          title: "Data Privacy & Governance Architecture",
          description: "Customer call records and contact pipelines are protected utilizing industry-standard encryption at rest with data management practices aligned with applicable telecommunications and data privacy guidelines.",
        },
      ]}
      faqs={[
        {
          question: "Can we migrate our existing Exotel virtual numbers to Hanva?",
          answer: "Virtual numbers in India belong to the underlying telecom service provider (TSP) such as Vodafone Idea or Tata. If your current provider permits number portability, or if you provision new dedicated DIDs through Hanva, our team assists with a coordinated cutover plan. Actual porting turnaround depends on operator approvals and technical readiness.",
        },
        {
          question: "How does Hanva eliminate the need for a separate CRM subscription?",
          answer: "Hanva includes an integrated sales CRM designed specifically for calling teams: visual pipeline stages, contact timelines, 2-click call disposition modals, daily talk-time tracking, and automated task reminders—all within the same monthly agreement.",
        },
        {
          question: "How long does onboarding and DLT KYC verification take?",
          answer: "Once standard Department of Telecommunications (DoT) KYC documentation is submitted (Company PAN, Certificate of Incorporation, GSTIN, and Authorized Signatory ID), virtual DIDs and CRM accounts are typically fully operational within 24 to 48 hours.",
        },
      ]}
      schemaData={exotelCompareSchema}
    />
  );
}
