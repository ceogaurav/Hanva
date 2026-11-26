import { ServiceLayout } from "@/components/shared/service-layout";

export const metadata = {
  title: "E-commerce Development Services",
  description:
    "Custom e-commerce development by Hanva Technologies: online storefronts, product catalogs, checkout workflows, order management, and customer portals.",
  alternates: {
    canonical: "https://www.hanva.in/software-development/ecommerce-development/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/software-development/ecommerce-development/",
    siteName: "Hanva Technologies",
    title: "E-commerce Development | Hanva Technologies",
    description: "Custom online storefronts, catalog management, and order workflows.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva E-commerce Development" }],
  },
};

export default function EcommerceDevelopmentPage() {
  return (
    <ServiceLayout
      categoryBadge="Software Development • E-commerce"
      title="E-commerce Development"
      subtitle="Launch fast, conversion-oriented online storefronts and custom B2B/B2C ordering platforms tailored to your catalog, pricing rules, and fulfillment workflow."
      problemStatement="Generic e-commerce templates struggle when businesses need custom bulk ordering rules, regional delivery logic, GST invoicing alignment, or clean ERP integration."
      solutionOverview="Hanva builds custom e-commerce storefronts and ordering portals designed for mobile shopping usability, SEO clarity, and reliable order operations."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Software Development", href: "/software-development/" },
        { label: "E-commerce Development" },
      ]}
      whatsappMessage="Hello Hanva Team, I would like to enquire about E-commerce Development services."
      contextRef="/software-development/ecommerce-development/"
      serviceType="E-commerce Website and Platform Development"
      canonicalUrl="https://www.hanva.in/software-development/ecommerce-development/"
      deliverables={[
        { tag: "Storefront", title: "Responsive Mobile-First Storefronts", description: "Fast product browsing, search/filtering, and clear product detail pages." },
        { tag: "Catalog & Pricing", title: "Variants, Categories & B2B/B2C Rules", description: "Structured SKU management, categories, and custom pricing rules." },
        { tag: "Checkout & Orders", title: "Cart, Checkout & Order Tracking", description: "Smooth checkout UX, order status updates, and customer account history." },
        { tag: "Tax & Invoicing", title: "GST-Ready Order Calculations", description: "Clean tax breakdown and invoice generation aligned with Indian commerce." },
        { tag: "SEO", title: "Search-Friendly Product & Category URLs", description: "Clean canonical URLs, metadata, and structured product architecture." },
        { tag: "Integrations", title: "Inventory, CRM & Logistics Hooks", description: "Connect order events to your backend inventory or CRM systems." },
      ]}
      stages={[
        { step: "01. CATALOG", title: "Catalog & Checkout Scoping", description: "Define SKU structure, delivery rules, and payment/order flows." },
        { step: "02. UX", title: "Storefront & Mobile Design", description: "Design intuitive category navigation, product cards, and checkout." },
        { step: "03. BUILD", title: "Storefront & Admin Engineering", description: "Implement storefront, cart/checkout, and order management." },
        { step: "04. LAUNCH", title: "QA, SEO & Go-Live", description: "Verify mobile checkout, metadata, and order notifications." },
      ]}
      suitableCustomers={[
        { audience: "D2C & Retail Brands", title: "Direct Online Storefronts", description: "Businesses selling directly to consumers across India." },
        { audience: "Wholesalers & Distributors", title: "B2B Ordering Portals", description: "Repeat dealer ordering with custom catalog and account views." },
        { audience: "Specialty Merchants", title: "Custom Product Workflows", description: "Stores requiring configurable products or service-bundled items." },
      ]}
      relatedLinks={[
        { title: "SEO Services", description: "Drive organic product and category traffic.", href: "/digital-marketing/seo-services/" },
        { title: "Google Ads & Performance", description: "Promote high-margin products through Google Search.", href: "/digital-marketing/performance-marketing/" },
        { title: "Web Application Development", description: "Custom portals and web platforms beyond standard storefronts.", href: "/software-development/web-application-development/" },
      ]}
      faqs={[
        {
          question: "Can you build B2B ordering portals as well as D2C storefronts?",
          answer: "Yes. We build both consumer storefronts and authenticated B2B dealer/wholesale ordering portals.",
        },
        {
          question: "How is e-commerce development priced?",
          answer: "Contact us for pricing based on catalog complexity, custom checkout rules, and third-party integrations.",
        },
      ]}
    />
  );
}
