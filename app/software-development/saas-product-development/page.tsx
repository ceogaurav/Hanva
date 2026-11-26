import { ServiceLayout } from "@/components/shared/service-layout";

export const metadata = {
  title: "SaaS Product Development Services",
  description:
    "End-to-end SaaS product development: multi-tenant architecture, role-based access, MVP engineering, and scalable web platforms.",
  alternates: {
    canonical: "https://www.hanva.in/software-development/saas-product-development/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/software-development/saas-product-development/",
    siteName: "Hanva Technologies",
    title: "SaaS Product Development | Hanva Technologies",
    description: "Multi-tenant SaaS architecture and MVP-to-production engineering.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva SaaS Product Development" }],
  },
};

export default function SaasProductDevelopmentPage() {
  return (
    <ServiceLayout
      categoryBadge="Software Development • SaaS Platforms"
      title="SaaS Product Development"
      subtitle="Turn your domain expertise into a multi-tenant SaaS product—from scoped MVP architecture to role-based workspaces, audit trails, and production readiness."
      problemStatement="Early-stage SaaS builds often cut corners on tenant isolation, role permissions, and database structure, creating costly rewrites when onboarding real business customers."
      solutionOverview="Having engineered our own SaaS suite (Hanva CRM, Hanva Salon Software, and Hanva Restaurant POS), Hanva helps founders and enterprises build clean, multi-tenant SaaS products."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Software Development", href: "/software-development/" },
        { label: "SaaS Product Development" },
      ]}
      whatsappMessage="Hello Hanva Team, I would like to enquire about SaaS Product Development."
      contextRef="/software-development/saas-product-development/"
      serviceType="SaaS Product Development Services"
      canonicalUrl="https://www.hanva.in/software-development/saas-product-development/"
      deliverables={[
        { tag: "Multi-Tenancy", title: "Tenant Isolation & RBAC Architecture", description: "Design workspace boundaries, user roles, and permission checks from day one." },
        { tag: "MVP Scoping", title: "Pragmatic Release Roadmapping", description: "Prioritize core revenue-generating workflows so your first release ships cleanly." },
        { tag: "Core Engineering", title: "Full-Stack Web & API Implementation", description: "Build responsive tenant dashboards, background jobs, and structured database schemas." },
        { tag: "Reporting", title: "Exports, Audit Logs & Analytics", description: "Incorporate operational reporting, CSV/PDF exports, and activity logging." },
        { tag: "Integrations", title: "Webhook & Partner API Readiness", description: "Enable customers to connect your SaaS with their existing tools." },
        { tag: "AI Features", title: "Scoped AI Workflow Integration", description: "Add targeted AI-assisted workflows where they solve genuine user problems." },
      ]}
      stages={[
        { step: "01. PRODUCT", title: "MVP & Tenant Blueprint", description: "Define user personas, tenant boundaries, and core feature milestones." },
        { step: "02. DESIGN", title: "Database & UI Architecture", description: "Establish data models, auth model, and interface flows." },
        { step: "03. BUILD", title: "Milestone Engineering", description: "Develop and test modules iteratively with regular demos." },
        { step: "04. LAUNCH", title: "Security & Production Checks", description: "Validate build hygiene, access controls, and deployment readiness." },
      ]}
      suitableCustomers={[
        { audience: "Founders & Startups", title: "New SaaS Ventures", description: "Launching a B2B or vertical SaaS product with clean architecture." },
        { audience: "Established Agencies", title: "Productizing Internal Tools", description: "Turning internal operational software into a commercial SaaS." },
        { audience: "Enterprises", title: "Partner & Franchise Platforms", description: "Multi-tenant portals serving independent operators or branches." },
      ]}
      relatedLinks={[
        { title: "Explore Hanva's Own SaaS Suite", description: "See Hanva CRM, Salon Software, and Restaurant POS.", href: "/products/" },
        { title: "Custom CRM & ERP Development", description: "Bespoke internal software for single organizations.", href: "/software-development/custom-crm-development/" },
        { title: "API Integration & Automation", description: "Connect third-party services and AI workflows.", href: "/software-development/api-integration-automation/" },
      ]}
      faqs={[
        {
          question: "Can you help scope an MVP before full development?",
          answer: "Yes. We start with discovery and milestone scoping so you have a clear feature and architecture plan before committing to full build phases.",
        },
        {
          question: "How is SaaS development priced?",
          answer: "Contact us for pricing tailored to your MVP scope, multi-tenancy requirements, and timeline.",
        },
      ]}
    />
  );
}
