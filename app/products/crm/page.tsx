import { ProductLayout } from "@/components/shared/product-layout";

export const metadata = {
  title: "Sales CRM with Integrated Cloud Telephony — Hanva Platform",
  description:
    "Unified sales CRM with native calling software. Manage deals, contacts, pipeline stages, and customer communication histories without third-party plugins.",
  alternates: {
    canonical: "https://hanva.in/products/crm/",
  },
};

const crmSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hanva Platform Sales CRM",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud Web Application",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description: "Unified sales CRM with native telephony calling, visual deal stages, and automated lead distribution.",
};

export default function PlatformCrmPage() {
  return (
    <ProductLayout
      categoryBadge="Unified Sales Platform"
      title="Platform Sales CRM with Native Telephony"
      subtitle="Close deals faster with a unified sales CRM that integrates phone calling, deal pipeline stages, and customer timelines into one single interface."
      problemStatement="Most sales organizations pay for separate CRM software (Zoho, Salesforce) and separate cloud telephony tools, then struggle with buggy browser extensions and disconnected data. Reps forget to log call notes, and managers lack real-time visibility into deal health. Hanva builds telephony directly into the CRM core."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/" },
        { label: "Platform CRM" },
      ]}
      whatsappRef="/products/crm/"
      secondaryHeroHref="/pricing/"
      secondaryHeroLabel="View CRM Plans & Quoting"
      workflowTitle="Unified CRM & Calling Lifecycle"
      workflowSteps={[
        {
          step: "01. LEAD INGESTION",
          title: "Multi-Source Lead Capture",
          description: "Leads from your website forms, Google Ads, Meta Ads, and inbound IVR calls flow into CRM in real time without manual CSV exports.",
        },
        {
          step: "02. SMART ALLOCATION",
          title: "Automated Round-Robin Routing",
          description: "Leads are automatically assigned to sales reps based on geography, product vertical, or active agent workload capacity.",
        },
        {
          step: "03. 1-CLICK CALLING",
          title: "Native Click-to-Call",
          description: "Reps click the phone icon on the contact card to connect immediately via WebRTC softphone or mobile SIM without manual keypad dialing.",
        },
        {
          step: "04. AUTOMATIC LOGGING",
          title: "Timeline & Deal Movement",
          description: "The call recording, duration, and rep disposition are automatically pinned to the contact timeline, advancing the deal stage.",
        },
      ]}
      capabilities={[
        {
          title: "Visual Kanban Deal Pipelines",
          description: "Drag-and-drop deals across customized sales stages (New Inquiry, Demo Done, Proposal Sent, Negotiation, Closed Won).",
          badge: "Pipeline",
        },
        {
          title: "Native Click-to-Call Telephony",
          description: "Initiate voice calls directly from contact cards without opening third-party softphones or copying phone numbers.",
          badge: "Embedded Voice",
        },
        {
          title: "Automated Lead Routing Rules",
          description: "Distribute incoming prospects fairly among sales reps using round-robin, skill-based, or performance-weighted logic.",
          badge: "Automation",
        },
        {
          title: "360-Degree Contact Timelines",
          description: "View consolidated customer history in one scrollable feed: inbound calls, recordings, WhatsApp messages, and meeting notes.",
          badge: "Activity History",
        },
        {
          title: "Custom Fields & Tags",
          description: "Adapt the CRM to your specific business model with custom dropdowns, budget ranges, and property/product interest tags.",
          badge: "Customization",
        },
        {
          title: "Invoice & Payment Tracking",
          description: "Generate GST-compliant commercial invoices, log payment milestones, and track customer account balances in one place.",
          badge: "GST Invoicing",
        },
      ]}
      useCases={[
        {
          audience: "B2B Sales Teams",
          title: "Long-Cycle Deal Management",
          description: "Track multi-stakeholder enterprise deals with clear next-step reminders, quotation attachments, and call histories.",
        },
        {
          audience: "Real Estate Developers & Brokers",
          title: "Site-Visit & Unit Booking CRM",
          description: "Manage prospective homebuyer inquiries, track scheduled site visits, and allocate units directly from deal cards.",
        },
        {
          audience: "Professional Services & Agencies",
          title: "Client Retainer & Project Tracking",
          description: "Maintain transparent communication records and track client billing milestones under a unified account ledger.",
        },
      ]}
      ecosystemSynergies={[
        {
          title: "Telecalling CRM Suite",
          description: "For high-volume calling teams, explore our telecaller-specific console with 2-click disposition buttons.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Trigger automated WhatsApp messages and chat with prospects directly within your CRM contact cards.",
          href: "/products/whatsapp-crm/",
        },
        {
          title: "Cloud Telephony & PBX",
          description: "Learn how our virtual PBX routes inbound calls directly into your CRM contact profiles.",
          href: "/products/cloud-telephony/",
        },
      ]}
      faqs={[
        {
          question: "Do I need a separate subscription for CRM and telephony?",
          answer: "No. Hanva bundles platform CRM licenses directly with our cloud telephony infrastructure under unified, transparent monthly agreements. Pricing is customized based on team size and calling volume, with historical contracts starting at ₹499/user/month (substantiated by documented enterprise billing benchmarks) as an empirical guideline. Contact our commercial team for a formal proposal tailored to your agent seats.",
        },
        {
          question: "Can we import our existing leads from Excel or our old CRM?",
          answer: "Yes. Hanva supports one-click CSV and Excel imports with intuitive column mapping, duplicate phone number detection, and automated stage assignment.",
        },
        {
          question: "Can reps access the CRM from mobile phones?",
          answer: "Yes. Hanva is fully mobile-responsive and accessible via web browsers, alongside our companion Android application for on-the-go calling and lead updates.",
        },
        {
          question: "How does role-based access control (RBAC) work?",
          answer: "Managers can define granular permissions: sales reps can view only their assigned leads, team leaders can monitor branch pipelines, and administrators retain full administrative access.",
        },
      ]}
      schemaData={crmSchema}
    />
  );
}
