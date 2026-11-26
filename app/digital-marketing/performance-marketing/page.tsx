import { ServiceLayout } from "@/components/shared/service-layout";

export const metadata = {
  title: "Google Ads & Performance Marketing",
  description:
    "Structured Google Ads and digital marketing campaign management focused on high-intent search queries, landing-page alignment, and measurable enquiry tracking.",
  alternates: {
    canonical: "https://www.hanva.in/digital-marketing/performance-marketing/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/digital-marketing/performance-marketing/",
    siteName: "Hanva Technologies",
    title: "Google Ads & Performance Marketing | Hanva Technologies",
    description: "Google Ads campaign structuring, conversion tracking, and digital campaign management.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Google Ads & Performance Marketing" }],
  },
};

export default function PerformanceMarketingPage() {
  return (
    <ServiceLayout
      categoryBadge="Digital Marketing • Google Ads & Campaigns"
      title="Google Ads & Performance Marketing"
      subtitle="Capture active commercial demand with structured Google Ads and digital marketing campaigns connected to conversion-focused landing pages."
      problemStatement="Unstructured ad accounts waste budget on broad, irrelevant search terms and send clicks to generic homepages without clear WhatsApp or enquiry pathways."
      solutionOverview="Hanva builds tightly themed Google Search and digital campaigns with negative keyword hygiene, landing-page alignment, and transparent conversion tracking."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Digital Marketing", href: "/digital-marketing/" },
        { label: "Performance Marketing" },
      ]}
      whatsappMessage="Hello Hanva Team, I would like to enquire about Google Ads and Performance Marketing services."
      contextRef="/digital-marketing/performance-marketing/"
      serviceType="Google Ads and Performance Marketing Services"
      canonicalUrl="https://www.hanva.in/digital-marketing/performance-marketing/"
      deliverables={[
        {
          tag: "Google Ads",
          title: "Search Campaign & Ad Group Architecture",
          description: "Structure campaigns around high-intent buyer keywords, geographic targeting, and clear ad copy.",
        },
        {
          tag: "Budget Hygiene",
          title: "Negative Keyword & Query Filtering",
          description: "Continuously review search term reports to block irrelevant clicks and protect ad spend.",
        },
        {
          tag: "Landing Alignment",
          title: "Conversion-Focused Landing Recommendations",
          description: "Align ad messaging with dedicated service/product pages and clear WhatsApp or enquiry CTAs.",
        },
        {
          tag: "Campaigns",
          title: "Multi-Campaign Digital Execution",
          description: "Plan and manage coordinated digital marketing campaigns for product launches and seasonal demand.",
        },
        {
          tag: "Tracking",
          title: "Conversion & Call/Enquiry Attribution",
          description: "Configure clean conversion measurement across enquiry actions and campaign touchpoints.",
        },
        {
          tag: "Reporting",
          title: "Transparent Spend & Outcome Reviews",
          description: "Regular reporting on impressions, clicks, cost per enquiry, and campaign adjustments.",
        },
      ]}
      stages={[
        { step: "01. DISCOVERY", title: "Offer & Market Scoping", description: "Define target geographies, service margins, and realistic budget parameters." },
        { step: "02. SETUP", title: "Campaign & Tracking Build", description: "Configure Google Ads structure, extensions, negative lists, and conversion events." },
        { step: "03. LAUNCH", title: "Controlled Rollout & QA", description: "Launch campaigns with close search-term and landing-page monitoring." },
        { step: "04. OPTIMIZE", title: "Bid & Creative Refinement", description: "Refine bids, ad copy, and keyword exclusions based on live performance." },
      ]}
      suitableCustomers={[
        { audience: "Service Businesses", title: "High-Intent Lead Generation", description: "Businesses looking to capture active Google Search demand immediately." },
        { audience: "SaaS & B2B", title: "Demo & Consultation Funnels", description: "Teams routing qualified prospects into WhatsApp or CRM sales pipelines." },
        { audience: "Regional & National", title: "City or Pan-India Campaigns", description: "Targeting specific Indian cities or broader national/international audiences." },
      ]}
      relatedLinks={[
        { title: "SEO Services", description: "Build durable organic traffic alongside paid Google Ads.", href: "/digital-marketing/seo-services/" },
        { title: "Hanva CRM", description: "Manage and call incoming campaign leads inside Hanva CRM.", href: "/products/crm/" },
        { title: "Cloud Telephony & IVR", description: "Track and route inbound campaign phone calls.", href: "/products/cloud-telephony/" },
      ]}
      faqs={[
        {
          question: "Do you guarantee a fixed number of leads or cost per lead?",
          answer: "No. Paid search outcomes depend on market competition, ad budget, offer competitiveness, and landing-page conversion. We focus on disciplined targeting and transparent reporting.",
        },
        {
          question: "How is ad management priced?",
          answer: "Contact us for pricing. Ad spend is paid directly to the ad platform, and management scope is quoted transparently.",
        },
      ]}
    />
  );
}
