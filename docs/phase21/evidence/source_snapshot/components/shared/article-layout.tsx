import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { SchemaOrg, buildBreadcrumbSchema } from "@/components/shared/schema-org";
import { TrackedDemoLink, TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG } from "@/lib/config";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight,
  Share2,
  Layers,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export interface TOCItem {
  id: string;
  title: string;
}

export interface RelatedLink {
  title: string;
  description: string;
  href: string;
}

export interface ArticleLayoutProps {
  pillarBadge: string;
  pillarHref?: string;
  title: string;
  subtitle: string;
  readTime: string;
  publishDate: string;
  reviewDate?: string;
  editorialAttribution?: string;
  breadcrumbs: { label: string; href?: string }[];
  whatsappRef: string;
  executiveSummary: string;
  tableOfContents?: TOCItem[];
  children: React.ReactNode;
  relatedProducts: RelatedLink[];
  relatedIndustries?: RelatedLink[];
  faqs: FAQItem[];
  schemaData?: Record<string, unknown>;
  customWhatsappUrl?: string;
  ctaButtonLabel?: string;
  ctaBannerTitle?: string;
  ctaBannerDescription?: string;
  relatedHeading?: string;
}

export function ArticleLayout({
  pillarBadge,
  pillarHref = "/resources/",
  title,
  subtitle,
  readTime,
  publishDate,
  reviewDate = "November 2026",
  editorialAttribution = "Hanva Engineering & Editorial Board",
  breadcrumbs,
  whatsappRef,
  executiveSummary,
  tableOfContents,
  children,
  relatedProducts,
  relatedIndustries,
  faqs,
  schemaData,
  customWhatsappUrl,
  ctaButtonLabel = "Ask on WhatsApp",
  ctaBannerTitle = "Ready to Implement Modern Business Telephony?",
  ctaBannerDescription = "Connect with a Hanva communication consultant to review customized IVR menus, auto-dialer queues, or telecalling CRM workflows tailored to your team.",
  relatedHeading = "Related Telecom & CRM Capabilities",
}: ArticleLayoutProps) {
  const whatsappUrl =
    customWhatsappUrl ||
    `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
      `Hello Hanva Team, I read your guide "${title}" and would like to learn more. Reference: ${whatsappRef}`
    )}`;

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  const enrichedArticleSchema = schemaData
    ? {
        image: "https://www.hanva.in/og-image.png",
        ...schemaData,
      }
    : null;

  const summarySecondaryLink = pillarHref.includes("salon-software")
    ? { href: "/products/salon-software/", label: "Explore Hanva Salon Software" }
    : pillarHref.includes("restaurant-pos")
      ? { href: "/products/restaurant-pos/", label: "Explore Hanva Restaurant POS" }
      : pillarHref.includes("digital-marketing")
        ? { href: "/digital-marketing/", label: "Explore Digital Marketing Services" }
        : pillarHref.includes("software-development")
          ? { href: "/software-development/", label: "Explore Custom Software Services" }
          : { href: "/pricing/calculator/", label: "Simulate OBD Voice Pulse Costs" };

  return (
    <article className="pt-10 pb-28 lg:py-14 bg-white min-h-screen overflow-x-clip">
      {enrichedArticleSchema && <SchemaOrg data={enrichedArticleSchema} />}
      {faqSchema && <SchemaOrg data={faqSchema} />}
      <SchemaOrg data={buildBreadcrumbSchema(breadcrumbs)} />

      <Container className="space-y-10">
        {/* 1. Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="inline-flex items-center gap-2">
                {idx > 0 && <span className="text-slate-400" aria-hidden="true">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 font-medium truncate max-w-xs sm:max-w-md" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* 2. Article Header Header */}
        <header className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={pillarHref}>
              <Badge variant="default" className="text-xs hover:bg-blue-700 transition-colors">
                {pillarBadge}
              </Badge>
            </Link>
            <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-800 text-xs flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              Verified & Peer-Reviewed
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
            {subtitle}
          </p>

          {/* Author, Date & Reading Time Meta Bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 border-y border-slate-100 py-3">
            <div className="flex items-center space-x-1.5 font-medium text-slate-700">
              <BookOpen className="h-3.5 w-3.5 text-blue-600" />
              <span>{editorialAttribution}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Published: {publishDate}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Reviewed: {reviewDate}</span>
            </div>
          </div>
        </header>

        {/* 3. Executive Summary / Quick Answer Box */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6 sm:p-8 space-y-4 max-w-4xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-800 uppercase tracking-wider">
            <Layers className="h-4 w-4" aria-hidden="true" />
            <span>Executive Summary &amp; Key Takeaways</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
            {executiveSummary}
          </p>
          <div className="pt-2 border-t border-blue-200/60 flex flex-wrap items-center gap-3 text-xs">
            <TrackedDemoLink
              href="/company/contact/"
              ctaLocation="article_summary_bar"
              ctaLabelKey="request_architecture_demo"
              className="inline-flex items-center font-semibold text-blue-700 hover:text-blue-900 hover:underline"
            >
              <span>Request a live architecture walkthrough</span>
              <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
            </TrackedDemoLink>
            <span className="text-slate-400" aria-hidden="true">|</span>
            <Link
              href={summarySecondaryLink.href}
              className="inline-flex items-center font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
            >
              <Sparkles className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
              <span>{summarySecondaryLink.label}</span>
            </Link>
          </div>
        </div>

        {/* 4. Table of Contents (if provided) */}
        {tableOfContents && tableOfContents.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 max-w-4xl space-y-3">
            <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>Table of Contents</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {tableOfContents.map((item, i) => (
                <a
                  key={i}
                  href={`#${item.id}`}
                  className="flex items-center space-x-1.5 text-slate-700 hover:text-blue-600 transition-colors p-1 rounded hover:bg-slate-100"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 5. Main Body Article Content */}
        <div className="max-w-4xl text-slate-800 leading-relaxed space-y-8 text-sm sm:text-base">
          {children}
        </div>

        {/* 6. Contextual Product Capabilities */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="space-y-4 max-w-4xl pt-6 border-t border-slate-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{relatedHeading}</h2>
              <p className="text-xs text-slate-500 mt-1">Explore software tools and services directly relevant to this guide.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((p, i) => (
                <Link key={i} href={p.href} className="group">
                  <Card className="h-full border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all">
                    <CardHeader className="p-5 pb-2">
                      <CardTitle className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                        <span>{p.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 7. Contextual Industry Blueprints */}
        {relatedIndustries && relatedIndustries.length > 0 && (
          <div className="space-y-4 max-w-4xl pt-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Industry-Specific Implementations</h2>
              <p className="text-xs text-slate-500 mt-1">See how Indian commercial sectors apply these operational workflows.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedIndustries.map((ind, i) => (
                <Link key={i} href={ind.href} className="group">
                  <Card className="h-full border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all">
                    <CardHeader className="p-5 pb-2">
                      <CardTitle className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                        <span>{ind.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <p className="text-xs text-slate-600 leading-relaxed">{ind.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 8. Frequently Asked Questions */}
        {faqs && faqs.length > 0 && (
          <div id="faqs" className="space-y-4 max-w-4xl pt-6 border-t border-slate-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-600 mt-1">Key technical and commercial inquiries answered by our engineering team.</p>
            </div>
            <FAQAccordion items={faqs} />
          </div>
        )}

        {/* 9. Contextual Conversion Banner */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 sm:p-8 text-white space-y-6 max-w-4xl">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {ctaBannerTitle}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {ctaBannerDescription}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[44px] py-2.5 px-5 text-xs sm:text-sm text-center">
                <TrackedWhatsAppLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="article_bottom_banner"
                contextRef={whatsappRef}
              >
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0 inline" aria-hidden="true" />
                  <span>{ctaButtonLabel}</span>
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5 shrink-0 inline" aria-hidden="true" />
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[44px] py-2.5 px-4 text-xs sm:text-sm text-center">
                <TrackedDemoLink
                href="/company/contact/"
                ctaLocation="article_bottom_banner"
                ctaLabelKey="request_architecture_demo"
              >
                  <span>Contact Form</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0 inline" aria-hidden="true" />
                </TrackedDemoLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-slate-600 text-white hover:bg-slate-800 hover:text-white whitespace-normal h-auto min-h-[44px] py-2.5 px-4 text-xs sm:text-sm text-center">
                <Link href="/pricing/calculator/">
                  <Sparkles className="mr-2 h-4 w-4 text-emerald-400 shrink-0 inline" aria-hidden="true" />
                  <span>Pulse Savings Calculator</span>
                </Link>
              </Button>
            </div>
            <p className="text-[11px] text-slate-300">
              Clicking WhatsApp opens a prepared enquiry message to {CONTACT_CONFIG.phoneDisplay} — initiating a demo enquiry does not automatically confirm an appointment.
            </p>
          </div>
        </div>
      </Container>
    </article>
  );
}
