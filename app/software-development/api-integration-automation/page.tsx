import { ServiceLayout } from "@/components/shared/service-layout";

export const metadata = {
  title: "API Integration, Automation & AI Solutions",
  description:
    "Connect business systems, automate repetitive workflows, and integrate practical AI solutions tailored to your operations.",
  alternates: {
    canonical: "https://www.hanva.in/software-development/api-integration-automation/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/software-development/api-integration-automation/",
    siteName: "Hanva Technologies",
    title: "API Integration, Automation & AI Solutions | Hanva Technologies",
    description: "System integrations, webhook pipelines, and custom AI workflow automation.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva API Integration & Automation" }],
  },
};

export default function ApiIntegrationAutomationPage() {
  return (
    <ServiceLayout
      categoryBadge="Software Development • Integrations & AI"
      title="API Integration, Automation &amp; AI Solutions"
      subtitle="Eliminate manual copy-pasting between tools by connecting your CRM, telephony, billing, and operational systems—and adding practical, custom-scoped AI workflows."
      problemStatement="Teams lose hours every week manually exporting CSVs between lead forms, billing software, messaging tools, and reporting spreadsheets."
      solutionOverview="Hanva engineers reliable API bridges, webhook handlers, background sync jobs, and custom AI-assisted automation workflows—scoped accurately to your systems rather than sold as generic hype."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Software Development", href: "/software-development/" },
        { label: "API Integration & Automation" },
      ]}
      whatsappMessage="Hello Hanva Team, I would like to enquire about API Integration, Automation, and AI Solutions."
      contextRef="/software-development/api-integration-automation/"
      serviceType="API Integration, Workflow Automation and Custom AI Solutions"
      canonicalUrl="https://www.hanva.in/software-development/api-integration-automation/"
      deliverables={[
        { tag: "API Bridges", title: "REST API & Webhook Pipelines", description: "Connect third-party platforms with authenticated, rate-limited, retry-safe integrations." },
        { tag: "Data Sync", title: "Automated Lead, Order & Billing Sync", description: "Keep customer, order, and invoice records synchronized across approved systems." },
        { tag: "AI Solutions", title: "Custom-Scoped AI Workflows", description: "Engineer practical AI assistance (classification, summarization, or intake routing) tailored to your business rules." },
        { tag: "Telecom & Messaging", title: "Voice & WhatsApp Event Workflows", description: "Connect call events, IVR outcomes, and enquiry triggers to your internal tools." },
        { tag: "Reliability", title: "Error Handling & Audit Logging", description: "Idempotency keys, webhook signature checks, and failure alerting." },
        { tag: "Support", title: "Documentation & Monitoring", description: "Clear endpoint documentation and ongoing integration maintenance options." },
      ]}
      stages={[
        { step: "01. MAP", title: "System & API Audit", description: "Review source/target APIs, auth methods, and data formats." },
        { step: "02. DESIGN", title: "Integration & Error Design", description: "Define payload mapping, idempotency, and retry behavior." },
        { step: "03. BUILD", title: "Connector & Automation Build", description: "Implement API bridges, webhooks, or AI workflow steps." },
        { step: "04. TEST", title: "End-to-End Verification", description: "Validate edge cases, failure recovery, and security boundaries." },
      ]}
      suitableCustomers={[
        { audience: "Operations Teams", title: "Eliminating Manual CSV Work", description: "Automating repetitive data movement between software tools." },
        { audience: "Sales & Support", title: "CRM & Telephony Synchronization", description: "Connecting inbound enquiries, calls, and internal databases." },
        { audience: "Forward-Looking Teams", title: "Practical AI Adoption", description: "Implementing targeted AI automation with clear human oversight." },
      ]}
      relatedLinks={[
        { title: "Custom CRM & ERP Development", description: "Build a unified core system when integrations aren't enough.", href: "/software-development/custom-crm-development/" },
        { title: "Hanva Restaurant POS", description: "Includes a scoped Partner REST API and signed webhooks.", href: "/products/restaurant-pos/" },
        { title: "Web Application Development", description: "Build custom dashboards around your automated workflows.", href: "/software-development/web-application-development/" },
      ]}
      faqs={[
        {
          question: "Are your AI solutions pre-packaged products or custom-built?",
          answer: "AI solutions under Software Development are custom-scoped and engineered for your specific workflow and data requirements, rather than overstated as universal plug-and-play products.",
        },
        {
          question: "How are integration projects priced?",
          answer: "Contact us for pricing based on the number of systems, API complexity, and automation rules.",
        },
      ]}
    />
  );
}
