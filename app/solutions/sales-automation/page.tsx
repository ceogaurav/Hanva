import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Outbound Sales Call Automation Solutions",
  description:
    "Accelerate telecalling velocity, eliminate manual dialing latency, and automate post-call WhatsApp messaging for inside sales teams.",
  alternates: {
    canonical: "https://hanva.in/solutions/sales-automation/",
  },
};

const salesAutomationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Sales Call Automation Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "Integrated outbound auto-dialing, telecalling CRM, and post-call WhatsApp automation for high-velocity sales teams in India.",
  areaServed: "IN",
};

export default function SalesAutomationPage() {
  return (
    <SolutionLayout
      categoryBadge="Sales Pipeline Acceleration"
      title="Outbound Sales Call Automation Architecture"
      subtitle="Equip inside sales teams with automated dialing. Connect agents when prospects answer, log call dispositions in two clicks, and dispatch WhatsApp brochures automatically."
      executiveSummary="In high-volume inside sales environments, reps spend over 60% of their day manually dialing phone numbers, listening to unanswered rings, and typing repetitive follow-up messages. Hanva's Sales Automation solution integrates progressive cloud dialers, native WebRTC softphones, and automated BSP WhatsApp workflows directly into your CRM timeline, eliminating friction and maximizing active conversation time."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions/" },
        { label: "Sales Automation" },
      ]}
      whatsappRef="/solutions/sales-automation/"
      challenges={[
        {
          challenge: "Manual keypad dialing causes 30-45 seconds of idle latency between calls, severely limiting daily outbound capacity.",
          solution: "Progressive auto-dialer dials contacts sequentially as soon as reps finish call notes, maintaining constant outbound momentum.",
        },
        {
          challenge: "Reps chat with buyers using unmonitored personal WhatsApp accounts, exposing company deal pipelines to data leakage.",
          solution: "Automated WhatsApp templates sent through authorized BSP gateways directly from the CRM timeline with centralized management oversight.",
        },
        {
          challenge: "Call outcomes are logged inconsistently on disparate spreadsheets, resulting in lost callbacks and inaccurate pipeline reporting.",
          solution: "Standardized 2-click disposition tagging triggers automated CRM pipeline updates, task reminders, and manager alerts.",
        },
        {
          challenge: "Retail 60-second billing pulses inflate voice budgets for outbound calls that conclude in under 45 seconds.",
          solution: "Optional 15-second outbound OBD pulse billing model to ensure voice budgets are billed with greater granular precision.",
        },
      ]}
      workflowTitle="The 4-Stage Automated Sales Calling Sequence"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Intelligent Lead Ingestion",
          description: "Leads from digital campaigns, property portals, or Excel sheets are parsed, de-duplicated, and assigned to telecalling queues automatically.",
        },
        {
          step: "STAGE 02",
          title: "Progressive Auto-Dialing",
          description: "The dialing engine initiates calls across dedicated Vi and Tata carrier DIDs, routing the conversation directly to the rep upon customer answer.",
        },
        {
          step: "STAGE 03",
          title: "Screen-Pop & Disposition",
          description: "The prospect's deal context opens on screen. Reps log outcomes ('Interested', 'Follow-up') and schedule callbacks in two clicks.",
        },
        {
          step: "STAGE 04",
          title: "Automated Omnichannel Touch",
          description: "When tagged as 'Interested', the system triggers an approved WhatsApp brochure and schedules an automated callback reminder.",
        },
      ]}
      pillars={[
        {
          metric: "Automated",
          metricLabel: "Dialing Progression",
          title: "Progressive WebRTC Softphone",
          description: "Agents dial seamlessly directly inside browser or Android companion apps without external desk phones or manual SIM entry.",
        },
        {
          metric: "Unified",
          metricLabel: "Lead Activity History",
          title: "Centralized Audio & Disposition Logs",
          description: "Every call recording, talk-time duration, and disposition tag is linked directly to the customer's CRM profile for supervisor QA review.",
        },
        {
          metric: "Automated",
          metricLabel: "Collateral Delivery",
          title: "Automated WhatsApp Brochure Delivery",
          description: "Deliver project brochures, pricing cards, and booking links via authorized BSP gateways as soon as calls disconnect.",
        },
      ]}
      synergies={[
        {
          title: "Progressive Auto-Dialer",
          description: "Deep dive into auto-dialer algorithms, recycling rules, and disposition tagging.",
          href: "/products/auto-dialer/",
        },
        {
          title: "Telecalling Sales CRM",
          description: "Explore the dedicated telecaller dashboard with daily targets and talk-time KPIs.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Learn how automated post-call brochures synchronize across shared team inboxes.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      faqs={[
        {
          question: "Can sales agents call using mobile SIM cards as well as cloud DIDs?",
          answer: "Yes. Hanva supports a dual-mode setup. Telecallers can use our companion Android application to place calls through their phone SIM cards while centrally syncing recordings and dispositions to the Hanva CRM, or dial via high-throughput cloud telephony DIDs.",
        },
        {
          question: "How does the automated WhatsApp brochure delivery work?",
          answer: "When a telecaller marks a call disposition as 'Interested', a webhook triggers an approved WhatsApp template via our authorized BSP gateway (Fonada). The PDF brochure or catalog is delivered to the prospect's WhatsApp inbox within seconds.",
        },
        {
          question: "Does the system prevent telecallers from stealing customer phone numbers?",
          answer: "Yes. In cloud telephony mode, phone number masking hides customer contact numbers from telecaller screens while enabling seamless click-to-call, protecting your proprietary database.",
        },
      ]}
      schemaData={salesAutomationSchema}
    />
  );
}
