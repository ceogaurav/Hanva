import { ProductLayout } from "@/components/shared/product-layout";

export const metadata = {
  title: "Auto Dialer Software for Sales Teams in India — Progressive Dialing",
  description:
    "Automate outbound telecalling. Connect sales agents only when a live human answers, skipping busy tones and manual dialing. Supports 15s pulse billing.",
  alternates: {
    canonical: "https://www.hanva.in/products/auto-dialer/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/products/auto-dialer/",
    siteName: "Hanva Technologies",
    title: "Auto Dialer Software for Sales Teams in India — Progressive Dialing | Hanva Technologies",
    description: "Automate outbound telecalling. Connect sales agents only when a live human answers, skipping busy tones and manual dialing. Supports 15s pulse billing.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Auto Dialer Software for Sales Teams in India — Progressive Dialing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Dialer Software for Sales Teams in India — Progressive Dialing | Hanva Technologies",
    description: "Automate outbound telecalling. Connect sales agents only when a live human answers, skipping busy tones and manual dialing. Supports 15s pulse billing.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const autoDialerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Progressive Auto-Dialer",
  serviceType: "Enterprise Cloud Telephony & CRM Software",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description: "Progressive auto dialer software for sales telecalling teams with disposition logging and SIM/cloud calling.",
};

export default function AutoDialerPage() {
  return (
    <ProductLayout
      categoryBadge="Outbound Sales Automation"
      title="Progressive Auto-Dialer Software for Sales Teams"
      subtitle="Maximize active talk time and eliminate manual dialing latency by automatically connecting telecallers only when a genuine prospect answers."
      problemStatement="Telecallers dialing numbers manually spend significant portions of every working hour listening to ringtones, busy signals, and voicemails. Hanva progressive auto-dialers automate outbound dial sequencing for calling agents."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/" },
        { label: "Auto Dialer" },
      ]}
      whatsappRef="/products/auto-dialer/"
      workflowTitle="Progressive Outbound Dialing Sequence"
      workflowSteps={[
        {
          step: "01. CAMPAIGN ACTIVATION",
          title: "Select Lead List in CRM",
          description: "Managers assign lead lists, filter by city or status (e.g., 'Uncontacted Inquiries'), and assign campaigns to telecaller teams.",
        },
        {
          step: "02. AUTOMATED DIALING",
          title: "System Dials Number",
          description: "As soon as an agent finishes wrapping up a call, the Hanva engine automatically dials the next verified phone number on the list.",
        },
        {
          step: "03. LIVE CONNECTION",
          title: "Automated Audio Bridging",
          description: "When the customer answers, the call bridges directly to the agent while popping up the prospect's CRM profile on screen.",
        },
        {
          step: "04. 2-CLICK DISPOSITION",
          title: "Outcome Tagging & Next Call",
          description: "The agent tags the outcome ('Interested', 'Callback', 'Not Reachable') and schedules follow-up tasks before the dialer triggers the next call.",
        },
      ]}
      capabilities={[
        {
          title: "Progressive Auto-Dialing",
          description: "Dials one contact per available agent, eliminating agent-unavailability drop calls and silent delays.",
          badge: "Progressive",
        },
        {
          title: "1-Click Click-to-Call",
          description: "Agents can also browse their CRM lead list and initiate calls directly by clicking any phone icon.",
          badge: "Productivity",
        },
        {
          title: "SIM & Cloud Calling Modes",
          description: "Choose between high-throughput cloud telephony DIDs or run the dialer over your existing mobile SIM card plans via our Android app.",
          badge: "Dual Mode",
        },
        {
          title: "15-Second OBD Pulse Option",
          description: "Outbound broadcast campaigns can leverage our verified 15-second billing pulse option rather than paying for full 60-second retail pulses.",
          badge: "Voice Savings",
        },
        {
          title: "Automated Disposition Logic",
          description: "Unanswered calls can be programmed to retry automatically after 2 hours or shift to an alternate time slot.",
          badge: "Recycling Rules",
        },
        {
          title: "Real-Time Agent Talk-Time Metrics",
          description: "Supervisors track connected calls, talk time ratios, and conversion rates across individual telecallers live.",
          badge: "Analytics",
        },
      ]}
      useCases={[
        {
          audience: "Real Estate Inside Sales",
          title: "High-Volume Portal Inquiries",
          description: "Dial hundreds of property portal leads within minutes of submission to qualify buyers while their interest is peak.",
        },
        {
          audience: "Insurance & Financial Renewals",
          title: "Policy Expiry Telecalling",
          description: "Automate outbound reminder calls for policy renewals and loan applications with pre-filled customer details on agent screens.",
        },
        {
          audience: "EdTech Admissions Teams",
          title: "Course Counseling Outreach",
          description: "Reach student inquiries systematically during competitive academic admission windows with automated disposition tracking.",
        },
      ]}
      ecosystemSynergies={[
        {
          title: "Predictive Dialer Engine",
          description: "For teams with 25+ telecallers, explore predictive pacing algorithms that dial multiple numbers ahead of agent wrap-up.",
          href: "/products/predictive-dialer/",
        },
        {
          title: "Telecalling & Lead CRM",
          description: "Pair the auto-dialer with comprehensive pipeline stages, site-visit tracking, and follow-up reminders.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Automatically send brochures or quotations to prospects immediately after an auto-dialed call disconnects.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      faqs={[
        {
          question: "What is the difference between an auto-dialer and a predictive dialer?",
          answer: "A progressive auto-dialer dials one number for an agent as soon as they become ready, preventing silent delays and dropped calls. A predictive dialer uses statistical algorithms to dial multiple numbers ahead of time based on expected answer rates, which is ideal for large contact centers.",
        },
        {
          question: "Can we use our existing GSM mobile SIM cards with the dialer?",
          answer: "Yes. Hanva supports a companion mobile SIM telecalling mode via our Android application that logs call durations and dispositions into your Hanva CRM dashboard (centralized call audio recording applies to cloud/WebRTC trunk sessions).",
        },
        {
          question: "How does the 15-second OBD voice pulse work?",
          answer: "For outbound broadcast dialer campaigns, voice usage can be billed in 15-second increments (e.g. ₹0.15 / 15 sec) based on client contract terms. A 35-second call is billed for 45 seconds (3 pulses) rather than rounded up to 60 or 120 seconds.",
        },
        {
          question: "Can the auto-dialer detect voicemail or answering machines?",
          answer: "Yes. Standard telecom busy signals, switched-off alerts, and network disconnect tones are automatically filtered at the carrier gateway before bridging to agents.",
        },
      ]}
      schemaData={autoDialerSchema}
    />
  );
}
