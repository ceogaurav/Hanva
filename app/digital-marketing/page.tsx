import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg, buildBreadcrumbSchema } from "@/components/shared/schema-org";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG, buildServiceWhatsAppUrl } from "@/lib/config";
import { ArrowRight, CheckCircle2, MessageSquare, TrendingUp, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Digital Marketing Services — SEO & Google Ads",
  description:
    "Search Engine Optimization (SEO), Google Ads performance marketing, and social media campaigns engineered for qualified enquiries across India and globally.",
  alternates: {
    canonical: "https://www.hanva.in/digital-marketing/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/digital-marketing/",
    siteName: "Hanva Technologies",
    title: "Digital Marketing Services | Hanva Technologies",
    description:
      "SEO, Google Ads, Social Media Marketing, and full-funnel digital marketing campaigns.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Digital Marketing Services" }],
  },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Digital Marketing" },
];

const marketingFaqs: FAQItem[] = [
  {
    question: "Which digital marketing services does Hanva Technologies offer?",
    answer:
      "Hanva Technologies offers Search Engine Optimization (SEO), Google Ads & Performance Marketing, Social Media Marketing, and coordinated digital marketing campaigns.",
  },
  {
    question: "Do you guarantee specific keyword rankings or lead volumes?",
    answer:
      "No ethical agency can guarantee specific search engine rankings or fixed ad conversion volumes. We focus on technical soundess, transparent reporting, search-intent alignment, and continuous campaign optimization.",
  },
  {
    question: "How is digital marketing pricing structured?",
    answer:
      "Contact us for pricing and a tailored campaign proposal based on your target market (India or international), service scope, and monthly campaign requirements.",
  },
];

const marketingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Hanva Digital Marketing Services",
      serviceType: "Digital Marketing, SEO, Google Ads & Social Media Marketing",
      url: "https://www.hanva.in/digital-marketing/",
      provider: {
        "@type": "Organization",
        name: CONTACT_CONFIG.companyLegalName,
        url: "https://www.hanva.in",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: marketingFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function DigitalMarketingHubPage() {
  const whatsappUrl = buildServiceWhatsAppUrl(
    "Hello Hanva Team, I would like to enquire about Digital Marketing services (SEO, Google Ads, Social Media)."
  );

  return (
    <div className="flex flex-col gap-12 lg:gap-16 pb-28 lg:pb-20 bg-white">
      <SchemaOrg schema={marketingSchema} />
      <SchemaOrg data={buildBreadcrumbSchema(breadcrumbs)} />

      <section className="pt-10 lg:pt-16 pb-12 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <Container className="space-y-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="inline-flex items-center gap-2">
                  {idx > 0 && <span className="text-slate-400" aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-blue-600">{crumb.label}</Link>
                  ) : (
                    <span className="text-slate-900 font-medium" aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="default">
              <TrendingUp className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Digital Marketing Pillar
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              Digital Marketing Services Built for Qualified Business Enquiries
            </h1>
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
              Combine technical SEO, targeted Google Ads, and consistent social media marketing with Hanva&apos;s CRM and lead-handling workflows.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="primary" size="lg">
              <TrackedWhatsAppLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="dm_hub_hero"
                contextRef="/digital-marketing/"
              >
                <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Enquire on WhatsApp</span>
                <ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
              </TrackedWhatsAppLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/company/contact/?product=digital-marketing">
                <span>Request Campaign Consultation</span>
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      <section>
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Core Digital Marketing Services</h2>
            <p className="text-sm text-slate-600">
              Select a service area below to review deliverables, workflow stages, and FAQs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-slate-200 flex flex-col justify-between">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">Organic Search</Badge>
                <CardTitle className="text-xl">SEO Services</CardTitle>
                <CardDescription className="text-sm">
                  Technical SEO, on-page architecture, local/India search optimization, and content structuring.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Technical site &amp; schema audits</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Service &amp; location page optimization</li>
                </ul>
                <Button asChild variant="primary" size="sm" className="w-full">
                  <Link href="/digital-marketing/seo-services/">Explore SEO Services &rarr;</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200 flex flex-col justify-between">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">Paid Search</Badge>
                <CardTitle className="text-xl">Google Ads &amp; Performance</CardTitle>
                <CardDescription className="text-sm">
                  High-intent Google Search and digital campaigns structured around clear enquiry landing pages.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Search campaign &amp; keyword structuring</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Conversion tracking &amp; landing alignment</li>
                </ul>
                <Button asChild variant="primary" size="sm" className="w-full">
                  <Link href="/digital-marketing/performance-marketing/">Explore Google Ads &rarr;</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200 flex flex-col justify-between">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">Brand &amp; Audience</Badge>
                <CardTitle className="text-xl">Social Media Marketing</CardTitle>
                <CardDescription className="text-sm">
                  Consistent brand storytelling, content calendars, and digital campaign support across social channels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Content calendar &amp; creative direction</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Audience engagement &amp; reporting</li>
                </ul>
                <Button asChild variant="primary" size="sm" className="w-full">
                  <Link href="/digital-marketing/social-media-marketing/">Explore Social Media &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <Container className="space-y-6">
          <div className="max-w-2xl space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Digital Marketing &amp; Search Strategy Guides</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Practical resources on compliant Indian local SEO, Google Business Profile hygiene, and aligning organic search with Google Ads.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link href="/resources/local-seo-guide-for-businesses/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5 block transition-colors">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Local SEO Guide for Indian Businesses</span>
                <ArrowRight className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">Google Business Profile address vs SAB compliance, NAP hygiene, and city landing pages without doorway abuse.</p>
            </Link>
            <Link href="/resources/seo-vs-google-ads-for-smbs/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5 block transition-colors">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>SEO vs Google Ads for SMBs: Decision Guide</span>
                <ArrowRight className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">When to prioritize organic SEO compounding vs immediate Search ads with negative keyword hygiene.</p>
            </Link>
          </div>
        </Container>
      </section>

      <section>
        <Container className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <FAQAccordion items={marketingFaqs} />
        </Container>
      </section>
    </div>
  );
}
