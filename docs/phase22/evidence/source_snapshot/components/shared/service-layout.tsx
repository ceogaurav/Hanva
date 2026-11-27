import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { SchemaOrg, buildBreadcrumbSchema } from "@/components/shared/schema-org";
import { TrackedCtaObserver, TrackedDemoLink, TrackedWhatsAppLink, TrackedPhoneLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG, buildServiceWhatsAppUrl, resolveRouteContext } from "@/lib/config";
import { inferSubjectFromContext } from "@/lib/analytics";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Phone,
  HelpCircle,
  ExternalLink,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export interface ServiceDeliverable {
  title: string;
  description: string;
  tag?: string;
}

export interface EngagementStage {
  step: string;
  title: string;
  description: string;
}

export interface ServiceCustomerType {
  audience: string;
  title: string;
  description: string;
}

export interface ServiceLayoutProps {
  categoryBadge: string;
  title: string;
  subtitle: string;
  problemStatement: string;
  solutionOverview: string;
  breadcrumbs: { label: string; href?: string }[];
  whatsappMessage: string;
  contextRef: string;
  deliverablesTitle?: string;
  deliverables: ServiceDeliverable[];
  stagesTitle?: string;
  stages: EngagementStage[];
  suitableCustomers: ServiceCustomerType[];
  relatedLinks: { title: string; description: string; href: string }[];
  guides?: { title: string; description: string; href: string }[];
  faqs: FAQItem[];
  serviceType: string;
  canonicalUrl: string;
}

export function ServiceLayout({
  categoryBadge,
  title,
  subtitle,
  problemStatement,
  solutionOverview,
  breadcrumbs,
  whatsappMessage,
  contextRef,
  deliverablesTitle = "What Hanva Delivers",
  deliverables,
  stagesTitle = "How the Engagement Works",
  stages,
  suitableCustomers,
  relatedLinks,
  guides,
  faqs,
  serviceType,
  canonicalUrl,
}: ServiceLayoutProps) {
  const whatsappUrl = buildServiceWhatsAppUrl(whatsappMessage);
  const routeCtx = resolveRouteContext(contextRef);
  const subjectName = inferSubjectFromContext(contextRef);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType,
    url: canonicalUrl,
    description: subtitle,
    provider: {
      "@type": "Organization",
      name: CONTACT_CONFIG.companyLegalName,
      url: "https://www.hanva.in",
      telephone: "+91-8423711043",
    },
    areaServed: ["IN", "Global"],
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="flex flex-col gap-12 lg:gap-16 pb-28 lg:pb-20 bg-white">
      <SchemaOrg schema={serviceSchema} />
      {faqSchema && <SchemaOrg schema={faqSchema} />}
      <SchemaOrg data={buildBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <section className="pt-10 lg:pt-16 pb-12 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <Container className="space-y-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="inline-flex items-center gap-2">
                  {idx > 0 && (
                    <span className="text-slate-400" aria-hidden="true">
                      /
                    </span>
                  )}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-slate-900 font-medium" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="default" className="text-xs">
              {categoryBadge}
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              {title}
            </h1>
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed">{subtitle}</p>
          </div>

          <TrackedCtaObserver ctaLocation="hero" productName={subjectName} ctaType="service_hero_cta">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Button asChild variant="primary" size="lg" className="h-auto min-h-[48px] py-2.5 px-6">
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="service_hero"
                  productName={subjectName}
                  ctaType="service_whatsapp"
                  contextRef={contextRef}
                >
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Enquire on WhatsApp</span>
                  <ExternalLink className="ml-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-auto min-h-[48px] py-2.5 px-6">
                <TrackedDemoLink
                  href={routeCtx.contactHref}
                  ctaLocation="service_hero"
                  ctaLabelKey="contact_consultation"
                  productSlug={routeCtx.productSlug || undefined}
                >
                  <span>Schedule Discovery Call</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
                </TrackedDemoLink>
              </Button>
            </div>
          </TrackedCtaObserver>

          {/* Problem & Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Business Challenge
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{problemStatement}</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-6 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Hanva Approach
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{solutionOverview}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section>
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {deliverablesTitle}
            </h2>
            <p className="text-sm text-slate-600">
              Structured deliverables scoped transparently to your business objectives and operational requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item) => (
              <Card key={item.title} className="border-slate-200">
                <CardHeader className="pb-2">
                  {item.tag && (
                    <Badge variant="secondary" className="w-fit text-[11px] mb-2">
                      {item.tag}
                    </Badge>
                  )}
                  <CardTitle className="text-base font-bold text-slate-900 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-1" aria-hidden="true" />
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Engagement Workflow */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {stagesTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage) => (
              <div
                key={stage.step}
                className="rounded-xl border border-slate-200 bg-white p-5 space-y-2"
              >
                <div className="text-xs font-mono font-bold text-blue-600">{stage.step}</div>
                <h3 className="text-base font-bold text-slate-900">{stage.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{stage.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Suitable Customers */}
      <section>
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Suitable Business Profiles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suitableCustomers.map((cust) => (
              <Card key={cust.title} className="border-slate-200 bg-slate-50/40">
                <CardHeader className="pb-2">
                  <div className="text-xs font-semibold text-blue-700">{cust.audience}</div>
                  <CardTitle className="text-base font-bold text-slate-900">{cust.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{cust.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Services & Products */}
      <section>
        <Container className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Related Hanva Capabilities
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:bg-blue-50/20 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-sm font-bold text-slate-900 group-hover:text-blue-600">
                  <span>{link.title}</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" aria-hidden="true" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{link.description}</p>
              </Link>
            ))}
          </div>
          {guides && guides.length > 0 && (
            <div className={`grid grid-cols-1 ${guides.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-5 pt-2`}>
              {guides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-xl border border-blue-200/80 bg-blue-50/30 p-5 hover:border-blue-400 hover:bg-blue-50/60 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 group-hover:text-blue-700">
                    <span>{guide.title}</span>
                    <ArrowUpRight className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{guide.description}</p>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section>
          <Container className="max-w-4xl space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <FAQAccordion items={faqs} />
          </Container>
        </section>
      )}

      {/* Final Conversion CTA */}
      <section>
        <Container>
          <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Discuss Your Project Scope with Hanva Technologies
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Contact us for custom scoping, timeline estimation, and pricing tailored to your requirements.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button asChild size="lg" className="bg-[#25D366] text-slate-950 hover:bg-[#20BD5A] font-semibold">
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="service_bottom"
                  productName={subjectName}
                  ctaType="service_whatsapp"
                  contextRef={contextRef}
                >
                  <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>WhatsApp Enquiry</span>
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
                <TrackedPhoneLink href={`tel:${CONTACT_CONFIG.phoneTel}`} ctaLocation="service_bottom">
                  <Phone className="mr-2 h-4 w-4 text-blue-400" aria-hidden="true" />
                  <span>{CONTACT_CONFIG.phoneDisplay}</span>
                </TrackedPhoneLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
