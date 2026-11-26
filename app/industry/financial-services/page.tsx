import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "BFSI & Loan Telecalling CRM Software in India",
  description:
    "Accelerate loan disbursement cycles, automate WhatsApp KYC document collection, enforce call recording audits, and track DSA agent calling performance.",
  alternates: {
    canonical: "https://www.hanva.in/industry/financial-services/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/industry/financial-services/",
    siteName: "Hanva Technologies",
    title: "BFSI & Loan Telecalling CRM Software in India | Hanva Technologies",
    description:
      "Accelerate loan disbursement cycles, automate WhatsApp KYC document collection, enforce call recording audits, and track DSA agent calling performance.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Financial Services CRM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BFSI & Loan Telecalling CRM Software in India | Hanva Technologies",
    description:
      "Accelerate loan disbursement cycles, automate WhatsApp KYC document collection, enforce call recording audits, and track DSA agent calling performance.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const financialServicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva BFSI & Lending Telephony CRM Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "End-to-end telecalling, auto-dialing, WhatsApp KYC document collection, and compliance call archival for banks, NBFCs, and Direct Selling Agents (DSAs) in India.",
  areaServed: "IN",
};

export default function FinancialServicesIndustryPage() {
  return (
    <SolutionLayout
      categoryBadge="BFSI, Lending & DSA Operations"
      title="Lending Telecalling, WhatsApp KYC & Disbursement Architecture"
      subtitle="Shorten credit qualification turnarounds. Auto-dial fresh loan applicants, collect verified KYC documents via WhatsApp, and track telecaller conversion to disbursement."
      executiveSummary="Loan aggregators, NBFCs, and DSAs operate in high-velocity inside sales environments where connecting with prospective borrowers within minutes of inquiry determines application drop-off rates. Hanva unifies progressive auto-dialing, borrower phone number masking to prevent agent lead leakage, automated post-call WhatsApp KYC document request templates, and centralized call recording archival for regulatory compliance and dispute resolution."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industry/" },
        { label: "Financial Services" },
      ]}
      whatsappRef="/industry/financial-services/"
      challenges={[
        {
          challenge: "Digital loan inquiries from Meta Ads, aggregators, and web forms go cold within hours, with drop-off rates exceeding 60% if telecallers delay.",
          solution: "Automated webhook ingestion pushes incoming loan inquiries directly into the active auto-dialer queue within seconds of form submission.",
        },
        {
          challenge: "Telecallers manually collect Aadhaar, PAN, and salary slips via personal WhatsApp accounts, creating security risks and customer privacy leaks.",
          solution: "Tagging a call disposition as 'Documents Sent' automatically dispatches an approved Meta WABA template requesting secure KYC upload directly to the CRM.",
        },
        {
          challenge: "Lending operations lose track of loan file progression between credit assessment, bank login, sanction, and final loan disbursement.",
          solution: "Tailored lending pipeline stages track loan movement across New, Contacted, Documents Received, Bank Login, Sanctioned, and Disbursed.",
        },
        {
          challenge: "Statutory audits require systematic recording of telecaller discussions regarding interest rates, processing fees, and loan repayment terms.",
          solution: "Centralized dual-channel audio recording archive hosted in Indian cloud infrastructure provides comprehensive compliance logs and dispute records.",
        },
      ]}
      workflowTitle="The 4-Stage Loan Application & Disbursement Cycle"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Inquiry Ingestion & Scrubbing",
          description: "Incoming personal, business, or home loan leads from web forms or ad campaigns ingest automatically, scrubbing duplicates against existing applicant files.",
        },
        {
          step: "STAGE 02",
          title: "Progressive Qualification Dialing",
          description: "The auto-dialer connects telecallers to live applicants over enterprise DIDs, allowing reps to assess income criteria, CIBIL eligibility, and required loan quantum.",
        },
        {
          step: "STAGE 03",
          title: "WhatsApp KYC Intake",
          description: "Upon dispositioning the call as 'Eligible', an automated WhatsApp message delivers the required document checklist and encrypted upload link.",
        },
        {
          step: "STAGE 04",
          title: "Bank Login & Disbursement",
          description: "The credit operations team verifies files, tracks bank login numbers, updates sanction milestones, and marks the lead as 'Disbursed' upon commission payout.",
        },
      ]}
      pillars={[
        {
          metric: "Verified",
          metricLabel: "Lending Stages",
          title: "Complete Loan Stage Tracking",
          description: "Monitor loan pipeline stages from initial qualification and KYC collection to bank login, sanction letter, and final disbursement.",
        },
        {
          metric: "Automated",
          metricLabel: "KYC Collection",
          title: "Official Meta WABA Intake",
          description: "Collect supporting financial documents via verified WhatsApp Business Platform templates without exposing borrower details to agent personal phones.",
        },
        {
          metric: "Dual-Mode",
          metricLabel: "SIM & Softphone",
          title: "Flexible Calling Deployments",
          description: "Equip office call centers with browser WebRTC headsets or deploy our companion Android app for telecallers utilizing unlimited mobile SIM plans.",
        },
      ]}
      synergies={[
        {
          title: "Telecalling CRM Suite",
          description: "Track daily telecaller talk time, 2-click outcome dispositions, and loan pipeline conversions.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "Progressive Auto-Dialer",
          description: "Maximize borrower connection rates and eliminate manual dialing fatigue during peak calling shifts.",
          href: "/products/auto-dialer/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Automate loan status updates, document checklists, and sanction notifications via authorized BSP gateways.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      faqs={[
        {
          question: "Can our telecallers use mobile SIM cards to place loan sales calls?",
          answer: "Yes. In addition to browser WebRTC softphones, Hanva provides a companion Android application (Hanva-Telecaller) allowing agents to place calls using physical mobile SIM cards with unlimited calling plans while automatically syncing call duration, timestamps, and 2-click dispositions back to management.",
        },
        {
          question: "How does the system ensure borrower data confidentiality?",
          answer: "Hanva supports phone number masking so agents can connect with borrowers via click-to-call without exposing the customer's raw 10-digit mobile number, preventing customer list theft when sales representatives leave the firm.",
        },
        {
          question: "Can we track loan payouts and agent commission tiers?",
          answer: "Yes. The CRM includes loan disbursement reporting and agent leaderboard scorecards, allowing sales directors to audit volume disbursed per executive and calculate performance incentives.",
        },
      ]}
      schemaData={financialServicesSchema}
    />
  );
}
