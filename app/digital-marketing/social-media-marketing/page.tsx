import { ServiceLayout } from "@/components/shared/service-layout";

export const metadata = {
  title: "Social Media Marketing Services",
  description:
    "Social media marketing services by Hanva Technologies: content planning, brand consistency, digital campaign creatives, and audience engagement.",
  alternates: {
    canonical: "https://www.hanva.in/digital-marketing/social-media-marketing/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/digital-marketing/social-media-marketing/",
    siteName: "Hanva Technologies",
    title: "Social Media Marketing | Hanva Technologies",
    description: "Consistent brand presence, content calendars, and digital campaign support.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Social Media Marketing" }],
  },
};

export default function SocialMediaMarketingPage() {
  return (
    <ServiceLayout
      categoryBadge="Digital Marketing • Social Media"
      title="Social Media Marketing Services"
      subtitle="Build a credible, consistent brand presence across social platforms with structured content calendars, clear product messaging, and campaign coordination."
      problemStatement="Inconsistent posting, off-brand visuals, and generic templates weaken buyer trust when prospects research your business after hearing about you."
      solutionOverview="Hanva plans and executes structured social media calendars aligned with your product positioning, seasonal promotions, and digital marketing campaigns."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Digital Marketing", href: "/digital-marketing/" },
        { label: "Social Media Marketing" },
      ]}
      whatsappMessage="Hello Hanva Team, I would like to enquire about Social Media Marketing services."
      contextRef="/digital-marketing/social-media-marketing/"
      serviceType="Social Media Marketing Services"
      canonicalUrl="https://www.hanva.in/digital-marketing/social-media-marketing/"
      deliverables={[
        {
          tag: "Content Planning",
          title: "Monthly Editorial & Content Calendars",
          description: "Structured posting schedules balancing product education, brand credibility, and service highlights.",
        },
        {
          tag: "Creative Direction",
          title: "On-Brand Visual & Copy Production",
          description: "Clean graphics, carousels, and concise copywriting aligned with your brand guidelines.",
        },
        {
          tag: "Campaign Support",
          title: "Launch & Seasonal Digital Campaigns",
          description: "Coordinated social messaging supporting product launches, events, and broader digital campaigns.",
        },
        {
          tag: "Profile Hygiene",
          title: "Channel Optimization & Bio Alignment",
          description: "Ensure profile bios, links, and highlights direct visitors cleanly to your website or WhatsApp enquiry.",
        },
        {
          tag: "Consistency",
          title: "Publishing & Community Coordination",
          description: "Scheduled publishing workflows and structured handling of inbound social enquiries.",
        },
        {
          tag: "Reporting",
          title: "Monthly Reach & Engagement Summaries",
          description: "Clear summaries of content performance, audience growth, and upcoming calendar priorities.",
        },
      ]}
      stages={[
        { step: "01. BRAND BRIEF", title: "Voice & Audience Alignment", description: "Review your brand guidelines, target buyers, and product priorities." },
        { step: "02. CALENDAR", title: "Content Plan & Approval", description: "Prepare monthly themes, post concepts, and creative drafts for review." },
        { step: "03. PUBLISH", title: "Scheduled Execution", description: "Publish approved posts consistently across selected social channels." },
        { step: "04. REVIEW", title: "Monthly Insights & Next Cycle", description: "Review engagement trends and refine upcoming content themes." },
      ]}
      suitableCustomers={[
        { audience: "Salons, Cafes & Retail", title: "Local & Consumer Brands", description: "Businesses building visual trust and local awareness." },
        { audience: "B2B & SaaS", title: "Technology & Service Firms", description: "Companies establishing professional credibility with decision-makers." },
        { audience: "Growing Businesses", title: "Teams Lacking In-House Content Ops", description: "Organizations needing reliable monthly social execution." },
      ]}
      relatedLinks={[
        { title: "Digital Marketing Hub", description: "Explore SEO, Google Ads, and integrated digital campaigns.", href: "/digital-marketing/" },
        { title: "SEO Services", description: "Pair social visibility with organic search capture.", href: "/digital-marketing/seo-services/" },
        { title: "Hanva Salon Software", description: "See our SaaS platform for salons and spas.", href: "/products/salon-software/" },
      ]}
      faqs={[
        {
          question: "Can social media marketing be bundled with SEO or Google Ads?",
          answer: "Yes. Many clients combine Social Media Marketing with SEO and Google Ads under a coordinated digital marketing retainer. Contact us for pricing.",
        },
        {
          question: "Do we approve content before it is published?",
          answer: "Yes. Content calendars and creatives are shared for your review prior to scheduled publishing.",
        },
      ]}
    />
  );
}
