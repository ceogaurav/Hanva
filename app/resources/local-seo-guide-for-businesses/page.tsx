import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { buildServiceWhatsAppUrl } from "@/lib/config";

export const metadata = {
  title: "Local SEO Guide for Indian Businesses",
  description:
    "Compliant Local SEO guide for Indian businesses: Google Business Profile rules (storefront vs SAB), NAP hygiene, JSON-LD schema & regional pages without doorway spam.",
  alternates: {
    canonical: "https://www.hanva.in/resources/local-seo-guide-for-businesses/",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.hanva.in/resources/local-seo-guide-for-businesses/",
    siteName: "Hanva Technologies",
    title: "Local SEO Guide for Indian Businesses: GBP, NAP & City Pages",
    description:
      "Attract regional Indian search traffic sustainably: align Google Business Profile rules with clean regional website architecture and zero doorway abuse.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Local SEO Guide India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local SEO Guide for Indian Businesses | Hanva Technologies",
    description:
      "Practical Google Business Profile & website local SEO framework aligned with Google Search Essentials.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Local SEO Guide for Indian Businesses: Google Business Profile Hygiene & Regional Pages",
  description:
    "Compliant regional and local SEO guide covering Google Business Profile address verification, Service-Area Business rules, NAP consistency, and avoiding Search Essentials doorway penalties.",
  author: {
    "@type": "Organization",
    name: "Hanva Engineering & Editorial Board",
    url: "https://www.hanva.in/company/about/",
  },
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    url: "https://www.hanva.in",
    logo: { "@type": "ImageObject", url: "https://www.hanva.in/icon.png" },
  },
  datePublished: "2026-11-26",
  dateModified: "2026-11-26",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.hanva.in/resources/local-seo-guide-for-businesses/",
  },
};

const faqs = [
  {
    question: "Can a B2B company or service business create Google Business Profiles using virtual offices across cities?",
    answer:
      "No. Google Business Profile guidelines explicitly forbid P.O. boxes, virtual offices, or unstaffed coworking addresses. Showing a physical address requires permanent signage and on-site staff during stated hours; home-based or travelling Service-Area Businesses must hide their address and select up to 20 verified service areas within realistic travel reach.",
  },
  {
    question: "Why are city names like 'Best Clinic Delhi' risky inside a Business Profile title?",
    answer:
      "Stuffing extra city keywords or service descriptors into your GBP business name violates Google's representation guidelines (requiring real-world legal/signage name fidelity) and frequently triggers Indian profile suspensions.",
  },
  {
    question: "How do multi-city website pages avoid Google doorway-page penalties?",
    answer:
      "Under Google Search Essentials Spam Policies, generating boilerplate templates that merely swap city or PIN names across dozens of URLs constitutes Scaled Content / Doorway abuse. Each regional page should serve real buyer intent with distinct service context, regional relevance, accurate LocalBusiness/Service schema only where physical offices exist, and honest headquarters disclosures.",
  },
  {
    question: "Does Hanva guarantee first-page Map Pack rankings?",
    answer:
      "No. Ethical technical and local SEO improves crawlability, relevance signals, policy compliance, and website conversion paths—but search rankings depend on competition, distance, proximity, and Google algorithms.",
  },
  {
    question: "How is Hanva's SEO service priced?",
    answer:
      "Contact us for pricing via WhatsApp (+91 8423711043) after sharing your current website and target regions.",
  },
];

export default function LocalSeoGuideForBusinessesPage() {
  const whatsappUrl = buildServiceWhatsAppUrl(
    "Hello Hanva Team, I would like to enquire about Local SEO and SEO Services for my business."
  );

  return (
    <ArticleLayout
      pillarBadge="Cluster D: Digital Marketing & SEO"
      pillarHref="/digital-marketing/seo-services/"
      title="Local SEO Guide for Indian Businesses: GBP Hygiene &amp; Regional Architecture"
      subtitle="Build sustainable city and regional search visibility across India without triggering Google Business Profile suspensions or Search Essentials doorway penalties."
      readTime="10 min read"
      publishDate="November 2026"
      whatsappRef="/resources/local-seo-guide-for-businesses/"
      customWhatsappUrl={whatsappUrl}
      ctaButtonLabel="Discuss Your SEO Strategy on WhatsApp"
      ctaBannerTitle="Need Structured Technical & Local SEO Architecture?"
      ctaBannerDescription="Speak with Hanva on WhatsApp to audit crawlability, metadata, Google Business alignment, and clean regional landing pages. Contact us for pricing."
      relatedHeading="Related SEO & Growth Resources"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "Local SEO Guide for Businesses" },
      ]}
      executiveSummary="Local SEO in India fails most often due to shortcuts—stuffed business profile names, fake virtual office pins, copied city-swap landing pages, or broken phone/WhatsApp CTAs. Following Google Business Profile policies and Google Search Essentials strictly ensures durable visibility across single-outlet storefronts (like salons and restaurants) as well as regional B2B companies serving multiple Indian cities."
      tableOfContents={[
        { id: "gbp-compliance", title: "1. Google Business Profile: Storefronts vs Service-Area Businesses" },
        { id: "nap-local-trust", title: "2. Honest Address Disclosure, NAP Hygiene & Categories" },
        { id: "city-pages-no-spam", title: "3. Structuring Regional Website Pages Without Doorway Abuse" },
        { id: "schema-conversion", title: "4. Structured Data, Mobile UX & WhatsApp Enquiries" },
        { id: "execution-checklist", title: "5. Local SEO Execution Checklist & Hanva SEO Services" },
      ]}
      schemaData={articleSchema}
      relatedProducts={[
        {
          title: "Hanva SEO Services",
          description: "Technical audits, keyword-to-URL mapping, JSON-LD schema & India-first organic structure.",
          href: "/digital-marketing/seo-services/",
        },
        {
          title: "SEO vs Google Ads for SMBs",
          description: "Compare organic compounding visibility vs immediate Google Search ads.",
          href: "/resources/seo-vs-google-ads-for-smbs/",
        },
        {
          title: "Digital Marketing Hub",
          description: "Explore integrated SEO, Performance Marketing & Social Media solutions.",
          href: "/digital-marketing/",
        },
      ]}
      faqs={faqs}
    >
      <section id="gbp-compliance" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">1. Google Business Profile: Storefronts vs Service-Area Businesses</h2>
        <p>
          Local visibility begins with accurately declaring how customers interact with your operation under official Google Business Profile rules:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li>
            <strong>Physical Storefronts &amp; Hybrids:</strong> Walk-in outlets—such as hair salons, clinics, cafes, or dine-in restaurants—display their verified street address only when permanently staffed with visible signage during posted hours.
          </li>
          <li>
            <strong>Service-Area Businesses (SABs):</strong> Field teams, regional IT consultants, or home-service providers who visit customers rather than hosting walk-ins must <em>clear and hide</em> any residential office address and specify realistic coverage zones (up to 20 cities, localities, or Indian PIN codes within practical travel distance).
          </li>
          <li>
            <strong>Strict Prohibition on Virtual Offices:</strong> Unstaffed coworking desks or rented mail-drop addresses routinely fail video verification and put primary business profiles at risk of suspension.
          </li>
        </ul>
      </section>

      <section id="nap-local-trust" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">2. Honest Address Disclosure, NAP Hygiene &amp; Categories</h2>
        <p>
          Consistency builds algorithmic and buyer trust. Your **Name, Address, and Phone number (NAP)** should match identically across your website footer, contact page, GST/company filings, and verified profiles:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>No Keyword Stuffing in Business Titles:</strong> Use your real legal/brand name rather than injecting city modifiers (`[Company Name] — Best Software Company Near Me`).</li>
          <li><strong>Precise Primary Categories:</strong> Choose the tightest category describing core revenue (for example, <em>Beauty Salon</em> or <em>Restaurant</em> rather than vague multi-purpose labels) before adding secondary services.</li>
          <li><strong>Operational Proof Assets:</strong> Keep real outlet photos, verified service hours, and direct booking links (like a salon&apos;s public online booking URL) updated transparently.</li>
        </ul>
      </section>

      <section id="city-pages-no-spam" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">3. Structuring Regional Website Pages Without Doorway Abuse</h2>
        <p>
          When SaaS providers or agencies operate from a single headquarters while serving clients across Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune, or Chennai, creating dedicated regional hub pages makes sense <strong>only if each page delivers real user utility</strong>:
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Google Search Essentials Spam Policy Guardrails:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Never Fake Branch Offices:</strong> Disclose your single real corporate headquarters honestly while clarifying remote onboarding or pan-India delivery models instead of fabricating local street addresses.</li>
            <li><strong>Eliminate City-Swap Boilerplate:</strong> Mass-generating 100 identical city pages differing only in PIN codes violates Google&apos;s Scaled Content Abuse and Doorway Page rules.</li>
            <li><strong>Match City Pages to Genuine Buyer Questions:</strong> Address real industry clusters, regional workflows, and direct product/service pathways—exactly how Hanva structures our own{" "}
              <Link href="/locations/" className="text-blue-600 font-semibold hover:underline">
                India city solution pages
              </Link>
              .
            </li>
          </ul>
        </div>
      </section>

      <section id="schema-conversion" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">4. Structured Data, Mobile UX &amp; WhatsApp Enquiries</h2>
        <p>
          Technical cleanliness directly impacts local mobile conversions across India, where over four-fifths of &ldquo;near me&rdquo; or regional software searches start on smartphones:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Accurate JSON-LD Markup:</strong> Use valid <code>Organization</code>, <code>Service</code>, <code>BreadcrumbList</code>, and <code>FAQPage</code> structured data without injecting false street addresses onto city service pages.</li>
          <li><strong>Fast Tap-to-Chat CTAs:</strong> Pair phone call links cleanly with pre-filled WhatsApp enquiry actions and clear page context so visitors convert without slow forms.</li>
          <li><strong>Pair SEO with Immediate Intent Where Needed:</strong> While organic search compounds over months, compare timing tradeoffs objectively in our guide to{" "}
          <Link href="/resources/seo-vs-google-ads-for-smbs/" className="text-blue-600 font-semibold hover:underline">
            SEO vs Google Ads for SMBs
          </Link>
          .</li>
        </ul>
      </section>

      <section id="execution-checklist" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">5. Local SEO Execution Checklist &amp; How Hanva Helps</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <th className="p-3.5 font-bold">SEO Layer</th>
                <th className="p-3.5 font-bold">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Technical &amp; Crawl Health</td>
                <td className="p-3.5">Clean XML sitemap, consistent www/non-www canonicals, robots.txt &amp; mobile responsiveness</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Profile Representation</td>
                <td className="p-3.5">Compliant Business Profile category/address rules with zero virtual offices or name stuffing</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Regional Architecture</td>
                <td className="p-3.5">Intent-mapped service &amp; city pages free of doorway duplication + authentic FAQs</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Conversion Hygiene</td>
                <td className="p-3.5">Consent-safe analytics tracking WhatsApp, phone &amp; demo clicks transparently</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-700">
          Explore deliverables on{" "}
          <Link href="/digital-marketing/seo-services/" className="text-blue-600 font-semibold hover:underline">
            Hanva SEO Services
          </Link>{" "}
          or our full{" "}
          <Link href="/digital-marketing/" className="text-blue-600 font-semibold hover:underline">
            Digital Marketing Services hub
          </Link>
          . Contact us for pricing.
        </p>
      </section>
    </ArticleLayout>
  );
}
