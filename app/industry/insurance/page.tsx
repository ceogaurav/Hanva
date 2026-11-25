import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Insurance Renewal Telecalling & Claims IVR",
  description:
    "Automate policy renewal cadences, manage claims assistance IVR queues, dispatch quote comparisons via WhatsApp, and archive 100% of policyholder calls.",
  alternates: {
    canonical: "https://hanva.in/industry/insurance/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hanva.in/industry/insurance/",
    siteName: "Hanva Technologies",
    title: "Insurance Renewal Telecalling & Claims IVR | Hanva Technologies",
    description:
      "Automate policy renewal cadences, manage claims assistance IVR queues, dispatch quote comparisons via WhatsApp, and archive 100% of policyholder calls.",
    images: [{ url: "https://hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Insurance Telephony" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insurance Renewal Telecalling & Claims IVR | Hanva Technologies",
    description:
      "Automate policy renewal cadences, manage claims assistance IVR queues, dispatch quote comparisons via WhatsApp, and archive 100% of policyholder calls.",
    images: ["https://hanva.in/og-image.png"],
  },
};

const insuranceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Insurance Telecalling & Claims Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "Automated insurance policy renewal dialers, multi-lingual claims assistance IVR, WhatsApp policy quote delivery, and regulatory call recording archival in India.",
  areaServed: "IN",
};

export default function InsuranceIndustryPage() {
  return (
    <SolutionLayout
      categoryBadge="Insurance Brokerages & Agencies"
      title="Policy Renewal Telecalling, Claims IVR & Compliance Archival"
      subtitle="Protect your annual renewal book. Automate multi-touch policy expiry calling cadences, dispatch quote comparisons via WhatsApp, and streamline emergency claims routing."
      executiveSummary="General and life insurance brokerages face severe lapse ratios when policy renewal notices are left to manual phone outreach or unopened emails. Simultaneously, inbound emergency claims lines experience peak congestion during business hours. Hanva provides automated renewal cadence dialing, WhatsApp quote comparison delivery, 24/7 claims intake IVR routing, and encrypted call recording archives aligned with insurance regulatory requirements."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industry/" },
        { label: "Insurance" },
      ]}
      whatsappRef="/industry/insurance/"
      challenges={[
        {
          challenge: "Up to 35% of motor and health insurance policies lapse because policyholders forget expiration dates and agents miss renewal follow-ups.",
          solution: "Automated renewal cadences trigger progressive calling campaigns 30, 15, and 3 days prior to policy expiry dates.",
        },
        {
          challenge: "Policyholders seeking urgent roadside or hospitalization claims assistance face long hold times on general office phone lines.",
          solution: "Dedicated Claims Assistance IVR priority trees route callers directly to senior claims coordinators with zero queue delay.",
        },
        {
          challenge: "Clients request premium quote breakdowns and plan comparisons during calls, but agents struggle to dispatch them quickly.",
          solution: "Tagging a call disposition as 'Quote Requested' immediately triggers an approved WhatsApp template with the premium comparison PDF.",
        },
        {
          challenge: "Regulatory guidelines require insurance intermediaries to maintain verifiable voice recordings of policy terms disclosures and customer consent.",
          solution: "100% automated stereo voice recording with role-based playback access and tamper-evident audit trails stored in Indian cloud storage.",
        },
      ]}
      workflowTitle="The 4-Stage Insurance Renewal & Claims Cycle"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Expiry List Ingestion",
          description: "Policy expiry schedules upload from your core insurance software, categorizing accounts by policy type (Motor, Health, Term) and expiry window.",
        },
        {
          step: "STAGE 02",
          title: "Automated Renewal Cadence",
          description: "The dialing engine initiates outbound renewal reminder calls across dedicated Tata/Vi DIDs, connecting policyholders to renewal advisors.",
        },
        {
          step: "STAGE 03",
          title: "WhatsApp Quote Delivery",
          description: "Upon wrap-up, an automated WhatsApp message delivers comprehensive premium comparisons, coverage additions, and payment gateway links.",
        },
        {
          step: "STAGE 04",
          title: "Renewal Confirmation & Recording Archival",
          description: "When the policyholder renews, the transaction receipt dispatches via WhatsApp, and the verification call audio is securely archived for regulatory compliance.",
        },
      ]}
      pillars={[
        {
          metric: "Multi-Touch",
          metricLabel: "Renewal Cadence",
          title: "Automated Expiry Follow-Ups",
          description: "Target policyholders at Day -30, -15, and -3 with coordinated phone calls and WhatsApp reminders to maximize renewal retention rates.",
        },
        {
          metric: "Instant",
          metricLabel: "Claims Triage",
          title: "Emergency Claims Priority Routing",
          description: "High-priority IVR routing allows policyholders in distress to bypass standard menus and reach hospital desk or roadside support immediately.",
        },
        {
          metric: "100%",
          metricLabel: "Voice Archival",
          title: "Regulatory Call Recording",
          description: "Centralized dual-channel audio recording archive stored securely in India to substantiate verbal terms disclosures and prevent mis-selling disputes.",
        },
      ]}
      synergies={[
        {
          title: "Smart Multi-Level IVR",
          description: "Design multi-lingual call trees for Renewals, New Policies, and Emergency Claims triage.",
          href: "/products/smart-ivr/",
        },
        {
          title: "Auto-Dialer Software",
          description: "Automate outbound high-volume policy renewal campaigns with smart retry algorithms.",
          href: "/products/auto-dialer/",
        },
        {
          title: "Toll-Free 1800 Numbers",
          description: "Establish a trusted nationwide zero-cost helpline for policyholders across India.",
          href: "/products/toll-free-numbers/",
        },
      ]}
      faqs={[
        {
          question: "Can we send insurance policy PDFs and renewal payment links on WhatsApp?",
          answer: "Yes. Using Hanva's official WhatsApp Business Platform integration, your team can trigger pre-approved template messages containing premium summary PDFs, policy schedules, and secure payment links upon call completion.",
        },
        {
          question: "How long are call recordings retained for compliance purposes?",
          answer: "Call recordings are stored in encrypted cloud storage with configurable retention policies (e.g., 1 year, 3 years, or permanent archival) to align with statutory documentation requirements.",
        },
        {
          question: "Can policyholders request automated renewal callbacks via missed call?",
          answer: "Yes. Hanva supports missed-call automation: when a policyholder gives a missed call to your designated virtual number, the system automatically registers the request and schedules a priority callback for the renewal team.",
        },
      ]}
      schemaData={insuranceSchema}
    />
  );
}
