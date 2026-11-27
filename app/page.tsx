import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { TrackedCtaObserver, TrackedDemoLink, TrackedProductLink, TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG, buildSaasDemoWhatsAppUrl, buildServiceWhatsAppUrl } from "@/lib/config";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers,
  MessageSquare,
  PhoneCall,
  Scissors,
  Server,
  ShieldCheck,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";

export const metadata = {
  title: "IT Solutions, SaaS Products & Cloud Telephony",
  description:
    "Hanva Technologies delivers SaaS software (Hanva CRM, Salon Software, Restaurant POS), SEO & Google Ads, custom software development, and cloud telephony in India.",
  alternates: {
    canonical: "https://www.hanva.in/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/",
    siteName: "Hanva Technologies",
    title: "IT Solutions, SaaS Products & Cloud Telephony",
    description:
      "Hanva Technologies helps businesses automate operations, acquire customers, and grow with SaaS products, digital marketing, custom software development, and cloud telephony.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Technologies IT Solutions & SaaS Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Solutions, SaaS Products & Cloud Telephony",
    description:
      "SaaS Products (Hanva CRM, Salon Software, Restaurant POS), Digital Marketing, Software Development, and Cloud Telephony.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const homeFaqs: FAQItem[] = [
  {
    question: "What products and services does Hanva Technologies provide?",
    answer:
      "Hanva Technologies provides three core SaaS products (Hanva CRM, Hanva Salon Software, and Hanva Restaurant POS), managed Digital Marketing services (SEO, Google Ads, Social Media Marketing), Custom Software Development (websites, mobile apps, custom CRM/ERP, e-commerce, and AI solutions), and enterprise Telecom & Cloud Telephony infrastructure.",
  },
  {
    question: "How do I book a product demonstration or request pricing?",
    answer:
      "Pricing is customized based on your business requirements and deployment scope. You can initiate a direct WhatsApp enquiry on +91 8423711043 from any product or service page, or submit a consultation request via our Contact page.",
  },
  {
    question: "What is the difference between Hanva CRM and Custom CRM Development?",
    answer:
      "Hanva CRM (/products/crm/) is our ready-to-deploy SaaS platform combining lead pipelines, built-in IVR, automated calling, and WhatsApp Business integration. Custom CRM Development (/software-development/custom-crm-development/) is a bespoke engineering service for organizations that require tailored data models, custom ERP workflows, or specialized integrations.",
  },
  {
    question: "Does Hanva Technologies serve businesses outside India?",
    answer:
      "Yes. India is our primary market—with GST-ready billing and carrier-backed telecom workflows—while our SaaS platforms, digital marketing, and custom software engineering services also support international businesses.",
  },
];

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.hanva.in/#organization",
      name: "Hanva Technologies",
      legalName: CONTACT_CONFIG.companyLegalName,
      identifier: CONTACT_CONFIG.cin,
      taxID: CONTACT_CONFIG.gstin,
      url: "https://www.hanva.in",
      logo: "https://www.hanva.in/logo.png",
      description:
        "Comprehensive IT solutions, digital transformation, and SaaS software provider offering Hanva CRM, Hanva Salon Software, Hanva Restaurant POS, Digital Marketing, Software Development, and Cloud Telephony.",
      telephone: "+91-8423711043",
      email: CONTACT_CONFIG.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560068",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.hanva.in/#website",
      url: "https://www.hanva.in/",
      name: "Hanva Technologies",
      publisher: { "@id": "https://www.hanva.in/#organization" },
    },
    {
      "@type": "FAQPage",
      mainEntity: homeFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function HomePage() {
  const generalWhatsappUrl = buildServiceWhatsAppUrl(
    "Hello Hanva Team, I would like to enquire about your SaaS products and IT solutions."
  );

  return (
    <div className="flex flex-col gap-16 lg:gap-24 pb-28 lg:pb-20 bg-white">
      <SchemaOrg schema={homeSchema} />

      {/* 1. Hero Section */}
      <section className="relative pt-12 lg:pt-20 pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <Container className="text-center space-y-6">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-medium">
            IT Solutions • SaaS Products • Digital Marketing • Cloud Telephony
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15] max-w-4xl mx-auto">
            Software, Marketing &amp; Communication Systems Built to{" "}
            <span className="text-blue-600">Automate and Grow Your Business</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Hanva Technologies is a comprehensive IT solutions, digital transformation, and SaaS software provider helping businesses in India and globally automate operations, acquire customers, and scale.
          </p>

          <TrackedCtaObserver ctaLocation="hero" ctaType="homepage_hero_cta">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto h-auto min-h-[48px] py-2.5 px-6 font-semibold shadow-sm">
                <TrackedWhatsAppLink
                  href={generalWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="home_hero"
                  contextRef="/"
                  experimentId="EXP-22A"
                  variantId="whatsapp_primary_hero"
                >
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Enquire on WhatsApp</span>
                  <ExternalLink className="ml-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto h-auto min-h-[48px] py-2.5 px-6">
                <Link href="/products/">
                  <span>Explore SaaS Products</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-auto min-h-[48px] py-2.5 px-6 border-slate-300">
                <TrackedDemoLink href="/company/contact/" ctaLocation="home_hero" ctaLabelKey="request_consultation">
                  <span>Request Consultation</span>
                </TrackedDemoLink>
              </Button>
            </div>
          </TrackedCtaObserver>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <Link href="/products/crm/" className="rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 font-medium text-blue-800 hover:bg-blue-100 transition-colors">
              Hanva CRM
            </Link>
            <Link href="/products/salon-software/" className="rounded-full border border-rose-200 bg-rose-50/70 px-3 py-1 font-medium text-rose-800 hover:bg-rose-100 transition-colors">
              Hanva Salon Software
            </Link>
            <Link href="/products/restaurant-pos/" className="rounded-full border border-amber-200 bg-amber-50/70 px-3 py-1 font-medium text-amber-900 hover:bg-amber-100 transition-colors">
              Hanva Restaurant POS
            </Link>
            <Link href="/digital-marketing/" className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              SEO &amp; Ads Services
            </Link>
            <Link href="/software-development/" className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Custom Software Dev
            </Link>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-600">
            Hanva Technologies Pvt. Ltd. (Bengaluru HQ) • Official WhatsApp:{" "}
            <span className="font-semibold text-slate-800">{CONTACT_CONFIG.phoneDisplay}</span> • Contact us for pricing
          </p>
        </Container>
      </section>

      {/* 2. Company Positioning & Four Business Pillars */}
      <section>
        <Container className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <Badge variant="outline">Four Core Pillars</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              One Technology Partner Across Operations, Growth &amp; Engineering
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Instead of coordinating disconnected vendors for billing software, lead management, marketing campaigns, and telephony, Hanva delivers all four pillars under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <Layers className="h-6 w-6 text-blue-600 mb-2" aria-hidden="true" />
                <CardTitle className="text-base">1. SaaS Products</CardTitle>
                <CardDescription className="text-xs">
                  Ready-to-deploy cloud software for sales teams, salons &amp; spas, and restaurants.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs">
                <Link href="/products/" className="font-semibold text-blue-600 hover:underline">
                  View SaaS Suite &rarr;
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <TrendingUp className="h-6 w-6 text-emerald-600 mb-2" aria-hidden="true" />
                <CardTitle className="text-base">2. Digital Marketing</CardTitle>
                <CardDescription className="text-xs">
                  Search Engine Optimization, Google Ads, social media marketing, and digital campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs">
                <Link href="/digital-marketing/" className="font-semibold text-blue-600 hover:underline">
                  Explore Marketing &rarr;
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <Code2 className="h-6 w-6 text-indigo-600 mb-2" aria-hidden="true" />
                <CardTitle className="text-base">3. Software Development</CardTitle>
                <CardDescription className="text-xs">
                  Websites, mobile apps, custom CRM/ERP, e-commerce platforms, and AI solutions.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs">
                <Link href="/software-development/" className="font-semibold text-blue-600 hover:underline">
                  Explore Engineering &rarr;
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <PhoneCall className="h-6 w-6 text-sky-600 mb-2" aria-hidden="true" />
                <CardTitle className="text-base">4. Telecom &amp; Voice</CardTitle>
                <CardDescription className="text-xs">
                  Cloud telephony, smart IVR, automated dialers, and carrier-backed DIDs across India.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs">
                <Link href="/products/cloud-telephony/" className="font-semibold text-blue-600 hover:underline">
                  Explore Cloud Voice &rarr;
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* 3. SaaS Products Overview */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <Container className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <Badge variant="default">Flagship SaaS Portfolio</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Three Purpose-Built SaaS Platforms
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Each Hanva SaaS product is engineered for specific operational workflows—with guided WhatsApp product demonstrations and contact-based pricing.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/products/">Compare All Products</Link>
            </Button>
          </div>

          {/* 4, 5, 6. Distinct Product Introductions: CRM, Salon Software, Restaurant POS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 4. Hanva CRM */}
            <Card className="border-blue-200 bg-white flex flex-col justify-between">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Badge className="bg-blue-50 text-blue-800 border-blue-200">Sales &amp; Calling CRM</Badge>
                </div>
                <CardTitle className="text-xl text-slate-900">Hanva CRM</CardTitle>
                <CardDescription className="text-sm text-slate-600">
                  Manage leads, sales conversations, calling operations, and customer communication from one CRM platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Lead pipelines, bulk CSV intake, scoring &amp; KYC vault</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Native C2C cloud calling, built-in IVR &amp; automated dialing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>WhatsApp Business integration, call recordings &amp; team attendance</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 pt-2">
                  <Button asChild variant="primary" className="w-full">
                    <TrackedProductLink href="/products/crm/" productName="hanva_crm" itemListName="Homepage SaaS Portfolio" ctaLocation="product_section">
                      Explore Hanva CRM
                    </TrackedProductLink>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <TrackedWhatsAppLink
                      href={buildSaasDemoWhatsAppUrl("crm")}
                      target="_blank"
                      rel="noopener noreferrer"
                      ctaLocation="product_section"
                      productName="hanva_crm"
                      ctaType="product_demo_whatsapp"
                      contextRef="/products/crm/"
                    >
                      <MessageSquare className="mr-2 h-4 w-4 text-emerald-600" aria-hidden="true" />
                      <span>WhatsApp Demo Enquiry</span>
                    </TrackedWhatsAppLink>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 5. Hanva Salon Software */}
            <Card className="border-rose-200 bg-white flex flex-col justify-between">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                    <Scissors className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Badge className="bg-rose-50 text-rose-800 border-rose-200">Salon &amp; Spa Platform</Badge>
                </div>
                <CardTitle className="text-xl text-slate-900">Hanva Salon Software</CardTitle>
                <CardDescription className="text-sm text-slate-600">
                  Salon billing and management software to simplify appointments, billing, staff operations, and business management.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>GST billing, split payments, cash registers &amp; digital invoices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Appointments, waitlist &amp; online booking mini-website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Staff commissions, payroll, inventory auto-consumption &amp; loyalty</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 pt-2">
                  <Button asChild variant="primary" className="w-full bg-rose-600 hover:bg-rose-700">
                    <TrackedProductLink href="/products/salon-software/" productName="hanva_salon_software" itemListName="Homepage SaaS Portfolio" ctaLocation="product_section">
                      Explore Salon Software
                    </TrackedProductLink>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <TrackedWhatsAppLink
                      href={buildSaasDemoWhatsAppUrl("salon")}
                      target="_blank"
                      rel="noopener noreferrer"
                      ctaLocation="product_section"
                      productName="hanva_salon_software"
                      ctaType="product_demo_whatsapp"
                      contextRef="/products/salon-software/"
                    >
                      <MessageSquare className="mr-2 h-4 w-4 text-emerald-600" aria-hidden="true" />
                      <span>WhatsApp Demo Enquiry</span>
                    </TrackedWhatsAppLink>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 6. Hanva Restaurant POS */}
            <Card className="border-amber-200 bg-white flex flex-col justify-between">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Badge className="bg-amber-50 text-amber-900 border-amber-200">Hospitality &amp; F&amp;B POS</Badge>
                </div>
                <CardTitle className="text-xl text-slate-900">Hanva Restaurant POS</CardTitle>
                <CardDescription className="text-sm text-slate-600">
                  Restaurant POS and billing software designed to simplify orders, billing, kitchen operations, and restaurant management.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Dine-in, takeaway &amp; delivery POS with offline queue &amp; UPI QR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>KOT, Kitchen Display System (KDS), Captain PWA &amp; QR ordering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>India GST (CGST/SGST), recipe BOM inventory &amp; 22 operational reports</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 pt-2">
                  <Button asChild variant="primary" className="w-full bg-amber-700 hover:bg-amber-800">
                    <TrackedProductLink href="/products/restaurant-pos/" productName="hanva_restaurant_pos" itemListName="Homepage SaaS Portfolio" ctaLocation="product_section">
                      Explore Restaurant POS
                    </TrackedProductLink>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <TrackedWhatsAppLink
                      href={buildSaasDemoWhatsAppUrl("pos")}
                      target="_blank"
                      rel="noopener noreferrer"
                      ctaLocation="product_section"
                      productName="hanva_restaurant_pos"
                      ctaType="product_demo_whatsapp"
                      contextRef="/products/restaurant-pos/"
                    >
                      <MessageSquare className="mr-2 h-4 w-4 text-emerald-600" aria-hidden="true" />
                      <span>WhatsApp Demo Enquiry</span>
                    </TrackedWhatsAppLink>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* 7 & 8. Digital Marketing & Software Development Services */}
      <section>
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 7. Digital Marketing */}
          <div className="rounded-2xl border border-slate-200 p-7 space-y-5">
            <Badge variant="secondary">Growth &amp; Acquisition</Badge>
            <h2 className="text-2xl font-bold text-slate-900">Digital Marketing Services</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Structured organic and paid acquisition programs designed for Indian and international businesses seeking qualified enquiries rather than vanity impressions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <Link href="/digital-marketing/seo-services/" className="rounded-lg border border-slate-200 p-3 hover:border-blue-300 font-semibold text-slate-800">
                SEO Services &rarr;
              </Link>
              <Link href="/digital-marketing/performance-marketing/" className="rounded-lg border border-slate-200 p-3 hover:border-blue-300 font-semibold text-slate-800">
                Google Ads &amp; Performance &rarr;
              </Link>
              <Link href="/digital-marketing/social-media-marketing/" className="rounded-lg border border-slate-200 p-3 hover:border-blue-300 font-semibold text-slate-800">
                Social Media Marketing &rarr;
              </Link>
              <Link href="/digital-marketing/" className="rounded-lg border border-slate-200 p-3 hover:border-blue-300 font-semibold text-blue-600">
                Digital Marketing Overview &rarr;
              </Link>
            </div>
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs">
              <TrackedWhatsAppLink
                href={buildServiceWhatsAppUrl("Hello Hanva Team, I would like to enquire about Digital Marketing services (SEO, Google Ads & Social Media).")}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="product_section"
                productName="digital_marketing"
                ctaType="service_whatsapp"
                contextRef="/digital-marketing/"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:underline"
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Enquire on WhatsApp</span>
                <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
              </TrackedWhatsAppLink>
              <Link href="/company/contact/?product=digital-marketing" className="text-slate-600 hover:text-slate-900 hover:underline">
                Contact us for pricing &rarr;
              </Link>
            </div>
          </div>

          {/* 8. Software Development */}
          <div className="rounded-2xl border border-slate-200 p-7 space-y-5">
            <Badge variant="secondary">Custom Engineering</Badge>
            <h2 className="text-2xl font-bold text-slate-900">Software Development Services</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When off-the-shelf SaaS is not enough, Hanva engineers custom websites, mobile apps, bespoke CRM/ERP platforms, e-commerce systems, API integrations, and tailored AI workflows.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <Link href="/software-development/custom-crm-development/" className="rounded-lg border border-slate-200 p-3 hover:border-blue-300 font-semibold text-slate-800">
                Custom CRM &amp; ERP &rarr;
              </Link>
              <Link href="/software-development/web-application-development/" className="rounded-lg border border-slate-200 p-3 hover:border-blue-300 font-semibold text-slate-800">
                Web Application Development &rarr;
              </Link>
              <Link href="/software-development/mobile-app-development/" className="rounded-lg border border-slate-200 p-3 hover:border-blue-300 font-semibold text-slate-800">
                Mobile App Development &rarr;
              </Link>
              <Link href="/software-development/saas-product-development/" className="rounded-lg border border-slate-200 p-3 hover:border-blue-300 font-semibold text-slate-800">
                SaaS Product Development &rarr;
              </Link>
              <Link href="/software-development/api-integration-automation/" className="rounded-lg border border-slate-200 p-3 hover:border-blue-300 font-semibold text-slate-800">
                API Integration &amp; AI Workflows &rarr;
              </Link>
              <Link href="/software-development/ecommerce-development/" className="rounded-lg border border-slate-200 p-3 hover:border-blue-300 font-semibold text-slate-800">
                E-commerce Development &rarr;
              </Link>
            </div>
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs">
              <TrackedWhatsAppLink
                href={buildServiceWhatsAppUrl("Hello Hanva Team, I would like to enquire about Custom Software Development services.")}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="product_section"
                productName="software_development"
                ctaType="service_whatsapp"
                contextRef="/software-development/"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:underline"
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Discuss Project on WhatsApp</span>
                <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
              </TrackedWhatsAppLink>
              <Link href="/company/contact/?product=software-development" className="text-slate-600 hover:text-slate-900 hover:underline">
                Contact us for pricing &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 9. Telecom & Communication Solutions */}
      <section className="py-12 bg-slate-900 text-white">
        <Container className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">Telecom Infrastructure</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Enterprise Telecom &amp; Communication Solutions
              </h2>
              <p className="text-sm text-slate-300">
                Carrier-backed cloud telephony, multi-level IVR, automated dialers, and TRAI DLT-compliant messaging infrastructure across India.
              </p>
            </div>
            <Button asChild variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
              <Link href="/pricing/calculator/">Open Voice Pulse Calculator</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <Link href="/products/cloud-telephony/" className="rounded-xl border border-slate-800 bg-slate-800/50 p-4 hover:border-blue-500 transition-colors space-y-1">
              <Server className="h-5 w-5 text-blue-400 mb-1" aria-hidden="true" />
              <div className="text-sm font-bold">Cloud Telephony &amp; PBX</div>
              <div className="text-slate-300">Virtual routing, Vi &amp; Tata DIDs, centralized recordings.</div>
            </Link>
            <Link href="/products/ivr-system/" className="rounded-xl border border-slate-800 bg-slate-800/50 p-4 hover:border-blue-500 transition-colors space-y-1">
              <PhoneCall className="h-5 w-5 text-blue-400 mb-1" aria-hidden="true" />
              <div className="text-sm font-bold">Smart Multi-Level IVR</div>
              <div className="text-slate-300">24/7 automated call menus and department routing.</div>
            </Link>
            <Link href="/products/telecalling-crm/" className="rounded-xl border border-slate-800 bg-slate-800/50 p-4 hover:border-blue-500 transition-colors space-y-1">
              <Layers className="h-5 w-5 text-blue-400 mb-1" aria-hidden="true" />
              <div className="text-sm font-bold">Telecalling CRM &amp; Dialers</div>
              <div className="text-slate-300">Voice-first auto dialers and predictive pacing.</div>
            </Link>
            <Link href="/products/whatsapp-crm/" className="rounded-xl border border-slate-800 bg-slate-800/50 p-4 hover:border-blue-500 transition-colors space-y-1">
              <MessageSquare className="h-5 w-5 text-emerald-400 mb-1" aria-hidden="true" />
              <div className="text-sm font-bold">WhatsApp CRM &amp; API</div>
              <div className="text-slate-300">Official WABA templates and lead engagement.</div>
            </Link>
          </div>
        </Container>
      </section>

      {/* 10. Industries Served */}
      <section>
        <Container className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Industries Served</h2>
              <p className="text-sm text-slate-600">
                Dedicated industry workflows across high-velocity sales, hospitality, wellness, and enterprise operations.
              </p>
            </div>
            <Link href="/industry/" className="text-sm font-semibold text-blue-600 hover:underline">
              View All Industry Blueprints &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <Link href="/industry/salons-and-spas/" className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 hover:border-rose-300 font-semibold text-slate-900 transition-colors">
              Salons &amp; Spas &rarr;
            </Link>
            <Link href="/industry/restaurants-and-cafes/" className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 hover:border-amber-300 font-semibold text-slate-900 transition-colors">
              Restaurants &amp; Cafes &rarr;
            </Link>
            <Link href="/industry/telecalling-and-bpo/" className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 hover:border-blue-300 font-semibold text-slate-900 transition-colors">
              Telecalling &amp; BPO &rarr;
            </Link>
            <Link href="/industry/real-estate/" className="rounded-xl border border-slate-200 p-4 hover:border-blue-300 font-semibold text-slate-900 transition-colors">
              Real Estate &rarr;
            </Link>
            <Link href="/industry/healthcare/" className="rounded-xl border border-slate-200 p-4 hover:border-blue-300 font-semibold text-slate-900 transition-colors">
              Healthcare &rarr;
            </Link>
            <Link href="/industry/financial-services/" className="rounded-xl border border-slate-200 p-4 hover:border-blue-300 font-semibold text-slate-900 transition-colors">
              BFSI &amp; Lending &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* 10.5 Knowledge Hub & Implementation Guides */}
      <section className="py-10 bg-slate-50/60 border-t border-slate-100">
        <Container className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <Badge variant="secondary">Practical Operational Resources</Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Software Implementation &amp; Buying Guides
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Actionable rollout checklists, objective software comparisons, and regulatory handbooks for business operators.
              </p>
            </div>
            <Link href="/resources/" className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline">
              Browse Knowledge Hub &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <Link href="/resources/crm-implementation-checklist/" className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 space-y-1.5 transition-colors">
              <div className="font-bold text-slate-900">CRM Implementation Checklist</div>
              <p className="text-slate-600">Phase-by-phase rollout: data cleansing, custom pipeline design, and telephony integration.</p>
            </Link>
            <Link href="/resources/salon-software-setup-checklist/" className="rounded-xl border border-slate-200 bg-white p-4 hover:border-rose-300 space-y-1.5 transition-colors">
              <div className="font-bold text-slate-900">Salon Setup Checklist</div>
              <p className="text-slate-600">Service menus, stylist commission tiers, back-bar auto-consumption, and online booking.</p>
            </Link>
            <Link href="/resources/restaurant-pos-implementation-checklist/" className="rounded-xl border border-slate-200 bg-white p-4 hover:border-amber-300 space-y-1.5 transition-colors">
              <div className="font-bold text-slate-900">Restaurant POS Checklist</div>
              <p className="text-slate-600">Menu matrices, KOT printer IPs, digital KDS boards, offline queue testing, and recipe BOM.</p>
            </Link>
            <Link href="/resources/crm-vs-spreadsheets-lead-management/" className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 space-y-1.5 transition-colors">
              <div className="font-bold text-slate-900">CRM vs Spreadsheets Guide</div>
              <p className="text-slate-600">Breaking points of Excel in sales: lead leakage calculations and 1-click cloud dialing benefits.</p>
            </Link>
          </div>
        </Container>
      </section>

      {/* 11 & 12. Why Choose Hanva & How Hanva Works */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Why Choose Hanva Technologies</h2>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong>Integrated Portfolio:</strong> SaaS software, custom engineering, digital marketing, and telecom under one accountable team.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong>Built for Indian Operations:</strong> GST-compliant billing, UPI QR support, and TRAI DLT-aware telephony workflows.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong>Transparent Scoping:</strong> Contact-based pricing aligned to your exact seats, outlets, or project deliverables.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">How Hanva Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
                <div className="font-mono font-bold text-blue-600">01. ENQUIRY</div>
                <div className="font-semibold text-slate-900">WhatsApp or Discovery Form</div>
                <div className="text-slate-600">Share your business category and operational goals.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
                <div className="font-mono font-bold text-blue-600">02. WALKTHROUGH</div>
                <div className="font-semibold text-slate-900">Guided Product Demo or Scope</div>
                <div className="text-slate-600">Evaluate Hanva CRM, Salon, POS, or custom architecture.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
                <div className="font-mono font-bold text-blue-600">03. DEPLOYMENT</div>
                <div className="font-semibold text-slate-900">Onboarding &amp; Configuration</div>
                <div className="text-slate-600">Configure workflows, menus, roles, or campaign pipelines.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
                <div className="font-mono font-bold text-blue-600">04. GROWTH</div>
                <div className="font-semibold text-slate-900">Support &amp; Optimization</div>
                <div className="text-slate-600">Ongoing technical support and acquisition scaling.</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 13. Frequently Asked Questions */}
      <section>
        <Container className="max-w-4xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={homeFaqs} />
        </Container>
      </section>

      {/* 14. Final WhatsApp Enquiry CTA */}
      <section>
        <Container>
          <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to Discuss Your Software, Marketing, or Telephony Needs?
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Contact us for pricing and a personalized product demonstration on WhatsApp.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button asChild size="lg" className="bg-[#25D366] text-slate-950 hover:bg-[#20BD5A] font-semibold">
                <TrackedWhatsAppLink
                  href={generalWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="home_bottom"
                  contextRef="/"
                >
                  <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Enquire on WhatsApp</span>
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
                <Link href="/company/contact/">Contact Form</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
