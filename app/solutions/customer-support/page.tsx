import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Inbound Customer Support & IVR Routing Solutions",
  description:
    "Enterprise customer support routing: multi-level smart IVR, automatic call distribution (ACD), call recording audits, and CRM timeline syncing.",
  alternates: {
    canonical: "https://hanva.in/solutions/customer-support/",
  },
};

const customerSupportSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Customer Support Telephony Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "Smart inbound IVR routing, automated queue distribution, and multi-agent customer support telephony platform in India.",
  areaServed: "IN",
};

export default function CustomerSupportPage() {
  return (
    <SolutionLayout
      categoryBadge="Customer Support & Operations"
      title="Inbound Support Routing & Contact Center Architecture"
      subtitle="Minimize missed inquiries through automated queue distribution and callback triggers. Route callers to qualified agents with multi-level IVRs, automatic call distribution, and integrated CRM history."
      executiveSummary="Customer support operations depend on timely first-response workflows and contextual agent conversations. Hanva's Customer Support solution combines 10-digit virtual landline/mobile DIDs, multi-level IVR greeting trees in regional Indian languages, skill-based agent routing, and centralized call recording audits. Support agents answer calls with immediate visibility into the caller's purchase history, open tickets, and past interactions."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions/" },
        { label: "Customer Support" },
      ]}
      whatsappRef="/solutions/customer-support/"
      challenges={[
        {
          challenge: "Callers endure long hold queues or get routed to the wrong department, driving high customer churn and negative brand reviews.",
          solution: "Multi-level IVR menus categorize intent upfront (e.g., 'Press 1 for Support, Press 2 for Billing') and route calls to specialized agent groups.",
        },
        {
          challenge: "Support agents lack previous ticket context when answering calls, forcing customers to repeatedly explain their issue.",
          solution: "Screen-pop displays caller profile, past support tickets, and recent call recording notes directly upon incoming call presentation.",
        },
        {
          challenge: "After-hours callers get busy tones or unanswered disconnects, creating customer frustration and lost inquiries.",
          solution: "Time-of-day routing plays custom after-hours greetings and automatically sends an SMS/WhatsApp confirmation with a self-service ticketing link.",
        },
        {
          challenge: "Supervisors have no visibility into agent responsiveness, hold times, or adherence to compliance scripts.",
          solution: "Live operational dashboards display queue depths, agent statuses, and centralized call recording audits with QA scoring.",
        },
      ]}
      workflowTitle="The 4-Stage Inbound Resolution Journey"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Inbound Call Ingestion",
          description: "Customers dial your 10-digit virtual number or 1800 enterprise toll-free line, connecting directly over carrier interconnects.",
        },
        {
          step: "STAGE 02",
          title: "Smart IVR Navigation",
          description: "Callers choose language preferences and department queues via clear, studio-recorded prompts in Hindi, English, or regional languages.",
        },
        {
          step: "STAGE 03",
          title: "ACD & Agent Connection",
          description: "Automatic Call Distribution routes the call to the longest-idle or most skilled available agent across desktop softphones or mobile devices.",
        },
        {
          step: "STAGE 04",
          title: "Resolution & QA Logging",
          description: "The interaction, audio recording, and resolution disposition are saved directly to the central customer timeline for quality compliance.",
        },
      ]}
      pillars={[
        {
          metric: "Automated",
          metricLabel: "Call Distribution",
          title: "Multi-Level Smart IVR Trees",
          description: "Automate customer greeting prompts, department selection, and VIP caller priority routing with high telecom reliability.",
        },
        {
          metric: "Centralized",
          metricLabel: "Call Activity Records",
          title: "Automated Omnichannel Fallback",
          description: "If an agent is unavailable, callers receive an automated WhatsApp confirmation confirming their queue position or self-service links.",
        },
        {
          metric: "Centralized",
          metricLabel: "Recording & Evaluation",
          title: "Recording & QA Scorecards",
          description: "Centralized audio recording archives with keyword tagging and agent evaluation scorecards ensure strict service compliance.",
        },
      ]}
      synergies={[
        {
          title: "Smart IVR Service Provider",
          description: "Explore IVR design capabilities, pre-recorded audio prompts, and queue management.",
          href: "/products/ivr-system/",
        },
        {
          title: "Cloud Call Center Operations",
          description: "Deep dive into ACD routing algorithms, supervisor wallboards, and agent scorecards.",
          href: "/products/call-center-software/",
        },
        {
          title: "Toll-Free 1800 Enterprise Numbers",
          description: "Learn how pan-India 1800 numbers eliminate friction for nationwide customer service.",
          href: "/products/toll-free-numbers/",
        },
      ]}
      faqs={[
        {
          question: "Can support agents take customer calls while working remotely?",
          answer: "Yes. Hanva's cloud telephony platform allows distributed support agents to answer calls via our browser-based WebRTC softphone on laptops or forwarded directly to their mobile phones, maintaining centralized call logs and recordings.",
        },
        {
          question: "How are after-hours or holiday calls handled?",
          answer: "You can configure time-based routing rules. Outside business hours, callers can hear customized holiday announcements, leave voicemails, or receive automated WhatsApp self-service links.",
        },
        {
          question: "What audio formats are supported for custom IVR greetings?",
          answer: "Hanva supports standard high-fidelity audio files (WAV and MP3 in 8kHz/16-bit mono or stereo formats) in any Indian regional language. Our onboarding engineers assist with uploading and testing audio quality.",
        },
      ]}
      schemaData={customerSupportSchema}
    />
  );
}
