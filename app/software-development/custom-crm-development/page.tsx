import { ServiceLayout } from "@/components/shared/service-layout";

export const metadata = {
  title: "Custom CRM & ERP Development",
  description:
    "Bespoke CRM and ERP software development for businesses with specialized sales pipelines, operations workflows, multi-department approvals, and third-party integrations.",
  alternates: {
    canonical: "https://www.hanva.in/software-development/custom-crm-development/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/software-development/custom-crm-development/",
    siteName: "Hanva Technologies",
    title: "Custom CRM & ERP Development | Hanva Technologies",
    description: "Bespoke CRM and ERP engineering distinct from off-the-shelf SaaS.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Custom CRM & ERP Development" }],
  },
};

export default function CustomCrmDevelopmentPage() {
  return (
    <ServiceLayout
      categoryBadge="Software Development • Custom CRM & ERP"
      title="Custom CRM & ERP Development"
      subtitle="Engineer a bespoke CRM or internal ERP platform tailored to your exact business processes, approval hierarchies, and operational data—distinct from off-the-shelf SaaS."
      problemStatement="Growing enterprises often outgrow rigid SaaS templates when their pricing approvals, dealer networks, inventory rules, or multi-department handoffs do not fit standard screens."
      solutionOverview="Hanva designs and builds custom CRM/ERP software from your operational blueprint—or helps you determine when our ready-made Hanva CRM SaaS is the faster fit."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Software Development", href: "/software-development/" },
        { label: "Custom CRM & ERP Development" },
      ]}
      whatsappMessage="Hello Hanva Team, I would like to enquire about Custom CRM / ERP Development."
      contextRef="/software-development/custom-crm-development/"
      serviceType="Custom CRM and ERP Software Development"
      canonicalUrl="https://www.hanva.in/software-development/custom-crm-development/"
      deliverables={[
        { tag: "Data Modeling", title: "Custom Entities & Pipeline Architecture", description: "Model leads, accounts, orders, dealers, or projects around your actual workflow stages." },
        { tag: "ERP Modules", title: "Operations, Inventory & Approval Flows", description: "Build multi-step purchase, billing, dispatch, and role-based approval workflows." },
        { tag: "Access Control", title: "Granular Role & Department Permissions", description: "Restrict records by branch, territory, department, or management tier." },
        { tag: "Integrations", title: "Telephony, WhatsApp & Accounting Bridges", description: "Connect calling systems, messaging gateways, and accounting exports via clean APIs." },
        { tag: "Reporting", title: "Custom Operational & Management Dashboards", description: "Build executive views and scheduled exports tailored to your KPIs." },
        { tag: "Handover", title: "Documentation & Post-Launch Support", description: "Structured deployment, administrator training, and scoped maintenance options." },
      ]}
      stages={[
        { step: "01. DISCOVERY", title: "Workflow & Gap Mapping", description: "Document current spreadsheets, bottlenecks, and role permissions." },
        { step: "02. ARCHITECTURE", title: "Schema & UI Blueprint", description: "Define data models, user flows, and integration contracts." },
        { step: "03. BUILD & QA", title: "Iterative Engineering", description: "Deliver tested milestones with stakeholder walkthroughs." },
        { step: "04. DEPLOY", title: "Rollout & Support", description: "Migrate baseline data, onboard teams, and support operations." },
      ]}
      suitableCustomers={[
        { audience: "Mid-Market & Enterprise", title: "Complex Multi-Team Workflows", description: "Organizations needing bespoke ERP/CRM logic beyond standard SaaS." },
        { audience: "Manufacturing & Distribution", title: "Dealer & Order Portals", description: "Managing distributor orders, credit limits, and dispatch tracking." },
        { audience: "Specialized Services", title: "Custom Intake & Compliance", description: "Businesses requiring tailored audit trails and document stages." },
      ]}
      relatedLinks={[
        { title: "Hanva CRM (Ready-Made SaaS)", description: "Need a ready-to-deploy CRM with IVR & WhatsApp? See Hanva CRM.", href: "/products/crm/" },
        { title: "API Integration & Automation", description: "Connect existing ERPs, webhooks, and AI workflows.", href: "/software-development/api-integration-automation/" },
        { title: "SaaS Product Development", description: "Building a multi-tenant commercial product for external customers.", href: "/software-development/saas-product-development/" },
      ]}
      faqs={[
        {
          question: "How is this different from Hanva CRM?",
          answer: "Hanva CRM (/products/crm/) is our ready-made SaaS platform. Custom CRM & ERP Development is bespoke engineering built from scratch around your organization's unique workflows.",
        },
        {
          question: "How is a custom CRM/ERP project priced?",
          answer: "Contact us for pricing after a scoping discovery session based on your required modules and integrations.",
        },
      ]}
    />
  );
}
