import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Telecalling & BPO CRM Solutions — Cloud Calling & Lead Allocation",
  description:
    "High-velocity CRM and cloud telephony architecture for outbound sales teams, telecalling agencies, and BPOs: 1-click C2C calling, auto-dialers, and call recordings.",
  alternates: {
    canonical: "https://www.hanva.in/industry/telecalling-and-bpo/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/industry/telecalling-and-bpo/",
    siteName: "Hanva Technologies",
    title: "Telecalling & BPO CRM Solutions | Hanva Technologies",
    description:
      "Enterprise lead distribution, C2C cloud dialing, automated calling queues, call recording audits, and agent productivity tracking for telecalling operations.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Telecalling & BPO Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Telecalling & BPO CRM Solutions | Hanva Technologies",
    description:
      "C2C calling, auto-dialers, call recording playback, and lead security for telecalling teams.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const telecallingIndustrySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Telecalling & BPO CRM Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "Integrated telecalling CRM, cloud-based click-to-call dialing, automated campaign queues, call recording audits, and agent productivity management for sales agencies and BPO call centers in India.",
  areaServed: "IN",
};

export default function TelecallingAndBpoIndustryPage() {
  return (
    <SolutionLayout
      categoryBadge="Telecalling, BPO & Outbound Sales"
      title="Telecalling Operations & Lead Acceleration Architecture"
      subtitle="Eliminate manual dialing fatigue, protect customer phone numbers from data theft, log agent call dispositions in real time, and audit call recordings directly in the browser."
      executiveSummary="High-performing telecalling teams depend on call velocity, strict lead discipline, and real-time manager visibility. Hanva unifies bulk lead distribution, 1-click cloud C2C calling via carrier partners, automated follow-up reminders, in-browser HTML5 call recording playback, and agent attendance tracking into one secure role-based platform."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industry/" },
        { label: "Telecalling & BPO" },
      ]}
      whatsappRef="/industry/telecalling-and-bpo/"
      challenges={[
        {
          challenge: "Distributing leads on shared spreadsheets causes duplicate calls, unlogged customer responses, and severe lead data theft when reps leave the company.",
          solution: "Role-based lead vaults restrict lead export permissions, mask contact details where required, and allocate leads via automated round-robin or bulk assignment.",
        },
        {
          challenge: "Manual ten-digit dialing on personal mobile phones drains telecaller energy, restricts daily call volume to 40-50 calls, and leaves zero call recordings for QA.",
          solution: "One-click Click-to-Call (C2C) cloud dialing connects agents instantly through certified telecom partners (CloudConnect, Ozonetel, Fonada) while automatically recording calls.",
        },
        {
          challenge: "Team leaders lack visibility into actual agent talk-time, call outcomes, and scheduled follow-ups until end-of-day manual Excel reports are submitted.",
          solution: "Real-time disposition logging prompts agents immediately post-call to record outcomes (Interested, Callback, Not Reachable, DND) and auto-schedules calendar reminders.",
        },
        {
          challenge: "Managing remote or branch telecallers without verified attendance tracking leads to inflated hours and unaccounted idle time.",
          solution: "Built-in geo and camera-verified attendance tracking provides team leaders with verified shift check-ins and live active-agent dashboards.",
        },
      ]}
      pillars={[
        {
          title: "1-Click C2C Cloud Dialing",
          description: "Carrier-grade click-to-call integration with CloudConnect, Ozonetel, and Fonada, complete with wallet tracking and instant webhook logging.",
          metric: "2x Talk Time",
          metricLabel: "Eliminates manual dialing",
        },
        {
          title: "In-Browser Recording Audits",
          description: "HTML5 audio player allows quality managers to review call recordings, evaluate pitch quality, and mentor agents directly inside call logs.",
          metric: "100% QA",
          metricLabel: "Direct audio playback",
        },
        {
          title: "Role-Based Data Security",
          description: "Granular access controls separating admins, team leaders, telecallers, and KYC officers prevent unauthorized CSV exports and customer data leaks.",
          metric: "Zero Leakage",
          metricLabel: "Controlled data permissions",
        },
        {
          title: "Structured Call Dispositions",
          description: "Standardized call outcome tags force immediate feedback and trigger automated next-step workflows or re-dial queues.",
          metric: "Real-Time",
          metricLabel: "Instant pipeline updates",
        },
      ]}
      workflowTitle="Telecaller Daily Calling & Pipeline Discipline"
      workflowStages={[
        {
          step: "01",
          title: "Shift Check-in & Queue Ingestion",
          description: "Telecallers mark verified attendance and receive their daily allocated calling queue based on priority, geography, or campaign type.",
        },
        {
          step: "02",
          title: "1-Click Dialing & Call Conversation",
          description: "Agents initiate 1-click C2C calls through the browser, view customer background notes, and conduct guided qualification conversations.",
        },
        {
          step: "03",
          title: "Disposition Logging & Follow-Up Scheduling",
          description: "Immediately upon call completion, agents log call outcomes, record conversation notes, and set automated follow-up calendar alerts.",
        },
        {
          step: "04",
          title: "Manager Auditing & Quality Evaluation",
          description: "Team leaders listen to recorded audio files, evaluate compliance, inspect daily talk-time dashboards, and reassign qualified leads to closing reps.",
        },
      ]}
      synergies={[
        {
          title: "Hanva CRM",
          description: "Flagship CRM platform uniting lead pipelines, cloud calling, IVR campaigns, and WhatsApp Business communication.",
          href: "/products/crm/",
        },
        {
          title: "Telecalling CRM (Voice-First)",
          description: "Dedicated outbound dialer workspace tailored specifically for high-volume telecalling teams.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "CRM Implementation Checklist",
          description: "Comprehensive rollout guide: data cleaning, pipeline configuration, telephony integration, and rep training.",
          href: "/resources/crm-implementation-checklist/",
        },
        {
          title: "Auto Dialer Software",
          description: "Automated calling queues that dial contact lists sequentially to eliminate manual agent idle time.",
          href: "/products/auto-dialer/",
        },
      ]}
      faqs={[
        {
          question: "Which cloud telephony providers are supported for click-to-call dialing?",
          answer:
            "Hanva CRM supports certified C2C calling and campaign integrations with CloudConnect, Ozonetel, and Fonada, featuring live wallet tracking and automated webhook call-outcome logging.",
        },
        {
          question: "Can telecallers download or export customer contact lists to Excel?",
          answer:
            "No, unless explicitly granted Super Admin permissions. Telecallers can only view and call leads assigned to their active queue, safeguarding your proprietary customer database.",
        },
        {
          question: "Can managers listen to recorded calls without downloading large audio files?",
          answer:
            "Yes. Hanva CRM features an in-browser HTML5 audio player embedded directly within call history reports, allowing instant playback, scrubbing, and quality scoring.",
        },
        {
          question: "How is Hanva Telecalling CRM priced?",
          answer:
            "Contact us for pricing and a personalized walkthrough via WhatsApp (+91 8423711043). Pricing is customized based on active telecaller seat count and voice provider integration requirements.",
        },
      ]}
      schemaData={telecallingIndustrySchema}
    />
  );
}
