import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Real Estate Telephony & Sales CRM Solutions",
  description:
    "Accelerate property lead response, automate WhatsApp floor plan sharing, track site visits, and prevent lead theft with cloud telephony for real estate.",
  alternates: {
    canonical: "https://www.hanva.in/industry/real-estate/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/industry/real-estate/",
    siteName: "Hanva Technologies",
    title: "Real Estate Telephony & Sales CRM Solutions | Hanva Technologies",
    description:
      "Accelerate property lead response, automate WhatsApp floor plan sharing, track site visits, and prevent lead theft with cloud telephony for real estate.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Real Estate Telephony" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Telephony & Sales CRM Solutions | Hanva Technologies",
    description:
      "Accelerate property lead response, automate WhatsApp floor plan sharing, track site visits, and prevent lead theft with cloud telephony for real estate.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const realEstateSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Real Estate Telephony & CRM Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "Integrated property portal lead ingestion, auto-dialing, WhatsApp floor plan sharing, and site-visit tracking for real estate developers and brokers in India.",
  areaServed: "IN",
};

export default function RealEstateIndustryPage() {
  return (
    <SolutionLayout
      categoryBadge="Real Estate & Property Development"
      title="Real Estate Lead Acceleration & Site-Visit Architecture"
      subtitle="Connect with high-intent property buyers promptly. Deliver WhatsApp project brochures via automated workflows, schedule site visits, and protect buyer data."
      executiveSummary="In the competitive Indian real estate market, timely lead response supports successful qualification. Hanva unifies real estate telecalling with automated portal lead ingestion, 1-click cloud softphones, virtual number masking to prevent broker data leakage, and automated post-call WhatsApp brochure and location pin delivery."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industry/" },
        { label: "Real Estate" },
      ]}
      whatsappRef="/industry/real-estate/"
      challenges={[
        {
          challenge: "Portal leads from MagicBricks, Housing, and Meta sit uncontacted for hours on spreadsheets, allowing competing projects to close them first.",
          solution: "Automated webhook lead ingestion immediately pushes fresh buyer inquiries into telecaller auto-dialing queues within seconds of submission.",
        },
        {
          challenge: "Sales executives call buyers from personal mobile numbers, taking valuable project client databases when they leave the brokerage.",
          solution: "Virtual phone number masking allows agents to place click-to-call calls directly from the CRM without viewing the buyer's private mobile number.",
        },
        {
          challenge: "Buyers request project brochures, price sheets, and unit floor plans on phone calls, but reps forget to send them via WhatsApp.",
          solution: "Tagging a call disposition as 'Interested' automatically triggers a pre-approved WhatsApp message containing your project PDF and site location pin.",
        },
        {
          challenge: "Sales managers have no reliable way to verify whether telecallers actually invited prospects for site visits or adhered to project pitch scripts.",
          solution: "Centralized audio recordings and site-visit calendar tracking provide consolidated management visibility over lead progression and rep compliance.",
        },
      ]}
      workflowTitle="The Real Estate Buyer Conversion Journey"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Portal Lead Capture",
          description: "Inquiries from 99acres, MagicBricks, or Google Ads ingest automatically via webhooks into Hanva CRM with budget and location tags.",
        },
        {
          step: "STAGE 02",
          title: "Automated Outbound Contact",
          description: "The auto-dialer rings the prospective homebuyer across dedicated Vi and Tata DIDs, connecting the sales rep promptly upon inquiry.",
        },
        {
          step: "STAGE 03",
          title: "WhatsApp Brochure Drop",
          description: "Upon call wrap-up, the rep marks 'Send Brochure'. An approved WhatsApp message delivers the project brochure, floor plans, and Google Maps pin.",
        },
        {
          step: "STAGE 04",
          title: "Site-Visit Scheduling",
          description: "The rep schedules a weekend site visit on the customer CRM timeline. The buyer receives automated WhatsApp and SMS confirmation reminders.",
        },
      ]}
      pillars={[
        {
          metric: "Automated",
          metricLabel: "Lead Intake Cadence",
          title: "Portal Ingestion & Auto-Dialer",
          description: "Capture and dial property portal leads promptly while buyer interest is high, supporting timely qualification.",
        },
        {
          metric: "Unified",
          metricLabel: "Lead Capture Pipeline",
          title: "Phone Number Masking & DID Privacy",
          description: "Protect your proprietary real estate customer database by concealing private phone numbers behind cloud telephony bridging.",
        },
        {
          metric: "Automated",
          metricLabel: "Collateral Delivery",
          title: "Automated WhatsApp Project Collateral",
          description: "Send high-resolution floor plans, elevation renders, and cost sheets directly to buyer WhatsApp inboxes via authorized BSP gateways.",
        },
      ]}
      synergies={[
        {
          title: "Telecalling Sales CRM",
          description: "Manage real estate deal pipelines, unit allotments, and agent daily calling targets.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "Virtual Mobile Numbers",
          description: "Assign dedicated 10-digit virtual numbers to specific property marketing hoardings and online campaigns.",
          href: "/products/virtual-numbers/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Explore shared team inboxes for property consultants and automated drip reminders.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      faqs={[
        {
          question: "Can Hanva import leads from real estate portals like MagicBricks and 99acres?",
          answer: "Lead intake from real estate portals (such as MagicBricks, 99acres, or Housing.com) can be configured via custom webhook integrations, subject to portal account access, API availability, and technical validation.",
        },
        {
          question: "How does phone number masking protect real estate brokerages?",
          answer: "With phone number masking, sales agents click to call within the Hanva web application. The telecom gateway bridges the call between the rep and the buyer without revealing the buyer's personal mobile number to the rep, preventing client poaching.",
        },
        {
          question: "Can we send automated reminders before scheduled site visits?",
          answer: "Yes. You can configure automated WhatsApp and SMS reminders sent 24 hours and 2 hours prior to the scheduled site visit time, confirming the location and site manager contact.",
        },
      ]}
      schemaData={realEstateSchema}
    />
  );
}
