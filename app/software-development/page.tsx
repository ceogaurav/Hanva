import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg, buildBreadcrumbSchema } from "@/components/shared/schema-org";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG, buildServiceWhatsAppUrl } from "@/lib/config";
import { ArrowRight, Code2, MessageSquare, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Software Development — Web, Mobile, CRM & AI",
  description:
    "Custom web applications, Android mobile apps, bespoke CRM/ERP platforms, e-commerce storefronts, API integrations, and AI automation by Hanva Technologies.",
  alternates: {
    canonical: "https://www.hanva.in/software-development/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/software-development/",
    siteName: "Hanva Technologies",
    title: "Software Development Services | Hanva Technologies",
    description:
      "Custom web applications, mobile apps, bespoke CRM/ERP, e-commerce, API integrations, and AI solutions.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Software Development Services" }],
  },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Software Development" },
];

const devFaqs: FAQItem[] = [
  {
    question: "When should we choose Custom Software Development instead of Hanva's SaaS products?",
    answer:
      "Choose Hanva CRM, Hanva Salon Software, or Hanva Restaurant POS when your operations match our ready-to-deploy SaaS workflows. Choose Custom Software Development when you require bespoke data models, custom ERP/CRM processes, proprietary portals, or specialized third-party integrations.",
  },
  {
    question: "How are AI solutions delivered in custom projects?",
    answer:
      "AI capabilities (such as workflow automation, document parsing, or intelligent assistants) are scoped and engineered specifically for your business requirements and data boundaries rather than sold as one-size-fits-all packaged claims.",
  },
  {
    question: "How is custom software development priced?",
    answer:
      "Contact us for pricing and project scoping. Every custom build is estimated based on functional requirements, integration complexity, and delivery milestones.",
  },
];

const devSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Hanva Custom Software Development Services",
      serviceType: "Custom Software, Web, Mobile, CRM/ERP, E-commerce & AI Development",
      url: "https://www.hanva.in/software-development/",
      provider: {
        "@type": "Organization",
        name: CONTACT_CONFIG.companyLegalName,
        url: "https://www.hanva.in",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: devFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

const services = [
  {
    title: "Custom CRM & ERP Development",
    badge: "Enterprise Workflows",
    description: "Bespoke CRM, ERP, inventory, and internal operations portals engineered around your exact business rules.",
    href: "/software-development/custom-crm-development/",
  },
  {
    title: "Web Application Development",
    badge: "Web & Portals",
    description: "Business websites, customer portals, and interactive web applications built for speed and maintainability.",
    href: "/software-development/web-application-development/",
  },
  {
    title: "Mobile App Development",
    badge: "Mobile",
    description: "Android and cross-platform mobile applications for field teams, customers, and operational workflows.",
    href: "/software-development/mobile-app-development/",
  },
  {
    title: "SaaS Product Development",
    badge: "SaaS Platforms",
    description: "Multi-tenant SaaS architecture, role-based access, billing readiness, and MVP-to-scale engineering.",
    href: "/software-development/saas-product-development/",
  },
  {
    title: "API Integration & Automation",
    badge: "Integrations & AI",
    description: "Connect telephony, WhatsApp, payments, ERPs, and custom AI-assisted automation workflows.",
    href: "/software-development/api-integration-automation/",
  },
  {
    title: "E-commerce Development",
    badge: "Commerce",
    description: "Custom online storefronts, catalog management, checkout flows, and order operations platforms.",
    href: "/software-development/ecommerce-development/",
  },
];

export default function SoftwareDevelopmentHubPage() {
  const whatsappUrl = buildServiceWhatsAppUrl(
    "Hello Hanva Team, I would like to enquire about Custom Software Development services."
  );

  return (
    <div className="flex flex-col gap-12 lg:gap-16 pb-28 lg:pb-20 bg-white">
      <SchemaOrg schema={devSchema} />
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
              <Code2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Software Development Pillar
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              Custom Software, Web, Mobile &amp; AI Engineering
            </h1>
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
              From business websites and mobile apps to custom CRM/ERP systems, e-commerce platforms, and tailored AI workflows—built cleanly for your operational requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="primary" size="lg">
              <TrackedWhatsAppLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="sd_hub_hero"
                contextRef="/software-development/"
              >
                <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Discuss Your Project on WhatsApp</span>
                <ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
              </TrackedWhatsAppLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/company/contact/?product=software-development">
                <span>Request Technical Scoping</span>
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      <section>
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Engineering Services</h2>
            <p className="text-sm text-slate-600">
              Distinct from our ready-made SaaS products (<Link href="/products/" className="text-blue-600 hover:underline">view SaaS suite</Link>), these services deliver custom software tailored to your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Card key={svc.href} className="border-slate-200 flex flex-col justify-between">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{svc.badge}</Badge>
                  <CardTitle className="text-lg">{svc.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{svc.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={svc.href}>Explore Service Details &rarr;</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <Container className="space-y-6">
          <div className="max-w-2xl space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Custom Software Architecture &amp; Scoping Guides</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Evaluate ready-made SaaS against bespoke CRM/ERP development, understand engineering cost drivers, and plan clean rollouts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link href="/resources/saas-vs-custom-crm-erp-guide/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5 block transition-colors">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>SaaS vs Custom CRM &amp; ERP</span>
                <ArrowRight className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">Decision guide comparing off-the-shelf SaaS speed vs bespoke systems across TCO &amp; control.</p>
            </Link>
            <Link href="/resources/custom-crm-development-guide/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5 block transition-colors">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Custom CRM Development Guide</span>
                <ArrowRight className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">Domain entity modeling, RBAC hierarchies, ERP/telephony APIs &amp; legacy data migration.</p>
            </Link>
            <Link href="/resources/software-development-cost-factors/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5 block transition-colors">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Software Development Cost Factors</span>
                <ArrowRight className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">The six architectural drivers that determine bespoke development effort &amp; AMC budgets.</p>
            </Link>
          </div>
        </Container>
      </section>

      <section>
        <Container className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <FAQAccordion items={devFaqs} />
        </Container>
      </section>
    </div>
  );
}
