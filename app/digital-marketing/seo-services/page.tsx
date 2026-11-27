import { ServiceLayout } from "@/components/shared/service-layout";

export const metadata = {
  title: "SEO Services — Technical & Organic Search",
  description:
    "Search Engine Optimization (SEO) services by Hanva Technologies: technical SEO audits, on-page structure, schema markup, and India-first organic growth strategies.",
  alternates: {
    canonical: "https://www.hanva.in/digital-marketing/seo-services/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/digital-marketing/seo-services/",
    siteName: "Hanva Technologies",
    title: "SEO Services | Hanva Technologies",
    description: "Technical SEO, on-page optimization, and organic search strategy.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva SEO Services" }],
  },
};

export default function SeoServicesPage() {
  return (
    <ServiceLayout
      categoryBadge="Digital Marketing • Organic Search"
      title="Search Engine Optimization (SEO) Services"
      subtitle="Build sustainable organic visibility across India and international search markets through sound technical architecture, intent-aligned pages, and clean structured data."
      problemStatement="Many business websites publish thin, duplicate, or poorly structured pages that fail to get indexed properly or attract unqualified traffic that never converts into enquiries."
      solutionOverview="Hanva approaches SEO as an engineering and content discipline: fixing crawlability, canonicals, internal linking, structured data, and commercial landing-page clarity."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Digital Marketing", href: "/digital-marketing/" },
        { label: "SEO Services" },
      ]}
      whatsappMessage="Hello Hanva Team, I would like to enquire about SEO Services for my business."
      contextRef="/digital-marketing/seo-services/"
      serviceType="Search Engine Optimization Services"
      canonicalUrl="https://www.hanva.in/digital-marketing/seo-services/"
      deliverables={[
        {
          tag: "Technical Foundation",
          title: "Technical SEO & Crawlability Audit",
          description: "Review sitemaps, robots.txt, canonical tags, redirect chains, mobile responsiveness, and Core Web Vitals.",
        },
        {
          tag: "Information Architecture",
          title: "Keyword-to-URL Intent Mapping",
          description: "Map commercial and informational search intent to dedicated URLs while preventing keyword cannibalization.",
        },
        {
          tag: "On-Page & Schema",
          title: "Metadata, Headings & JSON-LD Schema",
          description: "Implement unique titles, meta descriptions, clean H1–H3 hierarchies, and accurate Schema.org structured data.",
        },
        {
          tag: "Local & Regional",
          title: "India-First & Regional SEO Structuring",
          description: "Structure service and city/regional pages cleanly for Indian buyer searches without creating thin doorway pages.",
        },
        {
          tag: "Content Strategy",
          title: "Commercial Landing & Guide Content",
          description: "Develop clear service pages, product comparisons, and buyer guides aligned with real decision-maker questions.",
        },
        {
          tag: "Measurement",
          title: "Search Console & Enquiry Tracking",
          description: "Track indexation health, organic impressions, and non-PII CTA conversion events transparently.",
        },
      ]}
      stages={[
        { step: "01. AUDIT", title: "Technical & Content Baseline", description: "Inspect current URLs, indexation, competitors, and conversion friction." },
        { step: "02. ARCHITECTURE", title: "URL & Intent Blueprint", description: "Define canonical service hubs, landing pages, and internal link structure." },
        { step: "03. EXECUTION", title: "On-Page, Schema & Fixes", description: "Implement technical improvements, copy updates, and structured data." },
        { step: "04. ITERATION", title: "Reporting & Refinement", description: "Review Search Console data and refine underperforming pages." },
      ]}
      suitableCustomers={[
        { audience: "SaaS & B2B", title: "Software & Service Companies", description: "Looking to capture high-intent commercial searches across India and global markets." },
        { audience: "Multi-City Businesses", title: "Regional Service Providers", description: "Seeking qualified enquiries from target metro and Tier-2 Indian cities." },
        { audience: "Growth-Stage Brands", title: "Teams Reducing Ad Dependency", description: "Building long-term organic visibility alongside paid campaigns." },
      ]}
      relatedLinks={[
        { title: "Google Ads & Performance", description: "Pair long-term SEO with immediate Google Search campaigns.", href: "/digital-marketing/performance-marketing/" },
        { title: "Web Application Development", description: "Ensure your website stack supports fast, SEO-friendly rendering.", href: "/software-development/web-application-development/" },
        { title: "Hanva CRM", description: "Track and follow up on inbound SEO enquiries from one CRM.", href: "/products/crm/" },
      ]}
      guides={[
        {
          title: "Guide: Local SEO for Indian Businesses",
          description: "GBP storefront vs Service-Area rules, NAP hygiene & regional pages without doorway penalties.",
          href: "/resources/local-seo-guide-for-businesses/",
        },
        {
          title: "Guide: SEO vs Google Ads for SMBs",
          description: "Decide when to prioritize organic search assets vs immediate Search ads.",
          href: "/resources/seo-vs-google-ads-for-smbs/",
        },
      ]}
      faqs={[
        {
          question: "Do you guarantee first-page Google rankings?",
          answer: "No. Search rankings depend on search engine algorithms, competition, and domain authority. We guarantee sound technical execution, transparent reporting, and best-practice optimization.",
        },
        {
          question: "How is SEO pricing structured?",
          answer: "Contact us for pricing tailored to your website size, competitive landscape, and monthly scope.",
        },
      ]}
    />
  );
}
