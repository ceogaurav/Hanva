import { ServiceLayout } from "@/components/shared/service-layout";

export const metadata = {
  title: "Web Application & Website Development",
  description:
    "Custom website development and web application engineering by Hanva Technologies: responsive business websites, customer portals, and internal web platforms.",
  alternates: {
    canonical: "https://www.hanva.in/software-development/web-application-development/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/software-development/web-application-development/",
    siteName: "Hanva Technologies",
    title: "Web Application & Website Development | Hanva Technologies",
    description: "Fast, accessible, SEO-ready websites and custom web applications.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Web Application Development" }],
  },
};

export default function WebApplicationDevelopmentPage() {
  return (
    <ServiceLayout
      categoryBadge="Software Development • Web & Portals"
      title="Web Application & Website Development"
      subtitle="Build fast, accessible, SEO-ready business websites and custom web applications engineered for clarity, reliability, and mobile usability."
      problemStatement="Slow, template-heavy websites and brittle web portals hurt search visibility, frustrate mobile visitors, and create maintenance bottlenecks."
      solutionOverview="Hanva engineers clean, responsive websites and full-stack web applications with structured information architecture, accessible UI, and maintainable code."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Software Development", href: "/software-development/" },
        { label: "Web Application Development" },
      ]}
      whatsappMessage="Hello Hanva Team, I would like to enquire about Website / Web Application Development."
      contextRef="/software-development/web-application-development/"
      serviceType="Web Application and Website Development"
      canonicalUrl="https://www.hanva.in/software-development/web-application-development/"
      deliverables={[
        { tag: "Business Websites", title: "Conversion-Focused Corporate Sites", description: "Clean, fast-loading marketing websites structured for SEO and enquiry capture." },
        { tag: "Web Portals", title: "Customer, Partner & Admin Portals", description: "Role-authenticated dashboards, booking portals, and reporting interfaces." },
        { tag: "Responsiveness", title: "Desktop, Tablet & Mobile Engineering", description: "Verified layouts and accessible keyboard/screen-reader semantics." },
        { tag: "SEO Readiness", title: "Clean URLs, Metadata & Schema", description: "Technical SEO hygiene built directly into the web architecture." },
        { tag: "Integrations", title: "Forms, WhatsApp & API Connectivity", description: "Connect web applications cleanly to approved backend endpoints or WhatsApp." },
        { tag: "Maintenance", title: "Structured Updates & Support", description: "Scoped post-launch maintenance and feature iteration options." },
      ]}
      stages={[
        { step: "01. SCOPE", title: "Requirements & Sitemap", description: "Define user roles, pages, and functional goals." },
        { step: "02. DESIGN", title: "Information Architecture & UI", description: "Establish visual hierarchy, responsive layouts, and copy structure." },
        { step: "03. ENGINEER", title: "Frontend & Backend Build", description: "Implement clean, typed components and API endpoints." },
        { step: "04. VERIFY", title: "Cross-Device QA & Launch", description: "Test responsiveness, accessibility, links, and metadata before launch." },
      ]}
      suitableCustomers={[
        { audience: "Growth Businesses", title: "Modern Business Websites", description: "Replacing outdated sites with fast, enquiry-ready platforms." },
        { audience: "Service Providers", title: "Client & Partner Portals", description: "Self-service booking, document sharing, and status tracking." },
        { audience: "Enterprises", title: "Internal Web Tools", description: "Browser-based operational tools replacing manual spreadsheets." },
      ]}
      relatedLinks={[
        { title: "SEO Services", description: "Maximize organic visibility for your new website.", href: "/digital-marketing/seo-services/" },
        { title: "Mobile App Development", description: "Extend your web platform to Android and mobile users.", href: "/software-development/mobile-app-development/" },
        { title: "E-commerce Development", description: "Build custom online ordering and storefront experiences.", href: "/software-development/ecommerce-development/" },
      ]}
      faqs={[
        {
          question: "Do you build both marketing websites and custom web applications?",
          answer: "Yes. We handle corporate websites as well as authenticated web portals and operational dashboards.",
        },
        {
          question: "How is web development priced?",
          answer: "Contact us for pricing based on page count, custom functionality, and integration scope.",
        },
      ]}
    />
  );
}
