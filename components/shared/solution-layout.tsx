import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { SchemaOrg, buildBreadcrumbSchema } from "@/components/shared/schema-org";
import { TrackedDemoLink, TrackedWhatsAppLink, TrackedPhoneLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG } from "@/lib/config";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Phone,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

export interface SolutionPillar {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}

export interface WorkflowStage {
  step: string;
  title: string;
  description: string;
}

export interface SolutionLayoutProps {
  categoryBadge: string;
  title: string;
  subtitle: string;
  executiveSummary: string;
  breadcrumbs: { label: string; href?: string }[];
  whatsappRef: string;
  challenges: { challenge: string; solution: string }[];
  pillars: SolutionPillar[];
  workflowTitle?: string;
  workflowStages: WorkflowStage[];
  synergies: { title: string; description: string; href: string }[];
  faqs: FAQItem[];
  schemaData?: Record<string, unknown>;
}

export function SolutionLayout({
  categoryBadge,
  title,
  subtitle,
  executiveSummary,
  breadcrumbs,
  whatsappRef,
  challenges,
  pillars,
  workflowTitle = "Operational Workflow Architecture",
  workflowStages,
  synergies,
  faqs,
  schemaData,
}: SolutionLayoutProps) {
  const whatsappUrl = `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
    `Hello Hanva Team, I am interested in your ${title} solution. Reference: ${whatsappRef}`
  )}`;

  const faqSchema = faqs && faqs.length > 0 ? {
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
  } : null;

  const isIndustry = whatsappRef.startsWith("/industry/");
  const slug = whatsappRef.replace(/^\/(?:industry|solutions)\/|\/$/g, "") || "general";
  const contactHref = isIndustry
    ? `/company/contact/?industry=${encodeURIComponent(slug)}&product=auto-dialer`
    : `/company/contact/?product=cloud-telephony`;

  return (
    <div className="pt-10 pb-28 lg:py-14 bg-white min-h-screen">
      {schemaData && <SchemaOrg data={schemaData} />}
      {faqSchema && <SchemaOrg data={faqSchema} />}
      <SchemaOrg data={buildBreadcrumbSchema(breadcrumbs)} />

      <Container className="space-y-12">
        {/* 1. Breadcrumb Hierarchy */}
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
                  <span className="text-slate-900 font-medium" aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* 2. Hero Section */}
        <div className="space-y-6">
          <Badge variant="default" className="text-xs">
            {categoryBadge}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-6">
                <TrackedDemoLink
                href={contactHref}
                ctaLocation="solution_hero"
                ctaLabelKey="request_solution_proposal"
               
              >
                  <span>Request Solution Proposal</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0 inline" aria-hidden="true" />
                </TrackedDemoLink>
              </Button>
              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-6">
                <TrackedWhatsAppLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="solution_hero"
                contextRef={whatsappRef}
               
              >
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0 inline" aria-hidden="true" />
                  <span>WhatsApp Consultation</span>
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5 shrink-0 inline" aria-hidden="true" />
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-6">
                <Link href="/pricing/calculator/">
                  <Sparkles className="mr-2 h-4 w-4 text-emerald-600 shrink-0 inline" aria-hidden="true" />
                  <span>Estimate Pricing</span>
                </Link>
              </Button>
            </div>
            <p className="text-[11px] text-slate-600">
              WhatsApp Consultation opens WhatsApp with your context pre-filled — press Send to start chatting.
            </p>
          </div>
        </div>

        {/* 3. Executive Problem / Solution Callout */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
            <Layers className="h-4 w-4" />
            <span>Strategic Objective</span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {executiveSummary}
          </p>
        </div>

        {/* 4. Operational Challenges vs. Hanva Resolution */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Challenges & Strategic Resolutions</h2>
            <p className="text-xs text-slate-500 mt-1">Comparing traditional operational friction against Hanva&apos;s integrated architecture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((c, i) => (
              <Card key={i} className="border-slate-200 bg-white">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-md bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✕
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Operational Friction</div>
                      <p className="text-xs text-slate-700 mt-0.5">{c.challenge}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Hanva Resolution</div>
                      <p className="text-xs text-slate-900 font-medium mt-0.5">{c.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 5. 4-Stage Operational Workflow Architecture */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{workflowTitle}</h2>
            <p className="text-xs text-slate-500 mt-1">End-to-end operational execution sequence.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowStages.map((stage, idx) => (
              <Card key={idx} className="border-slate-200 bg-white relative">
                <CardHeader className="pb-2">
                  <div className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                    {stage.step}
                  </div>
                  <CardTitle className="text-base text-slate-900">{stage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-600 leading-relaxed">{stage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 6. Solution Pillars & Measurable Impact */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Key Architectural Capabilities</h2>
            <p className="text-xs text-slate-500 mt-1">Core technical and commercial components included in this solution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <Card key={idx} className="border-slate-200 bg-white flex flex-col justify-between">
                <CardHeader className="pb-3">
                  {pillar.metric && (
                    <div className="mb-2">
                      <div className="text-2xl font-bold text-blue-600 font-mono">{pillar.metric}</div>
                      {pillar.metricLabel && <div className="text-[10px] text-slate-600 uppercase tracking-wider">{pillar.metricLabel}</div>}
                    </div>
                  )}
                  <CardTitle className="text-base text-slate-900">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 7. Product & Ecosystem Synergies */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Related Products & Voice Infrastructure</h2>
            <p className="text-xs text-slate-500 mt-1">Explore underlying telephony and software components powering this solution.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {synergies.map((s, idx) => (
              <Link key={idx} href={s.href} className="group block">
                <Card className="h-full border-slate-200 bg-white group-hover:border-blue-300 transition-colors">
                  <CardContent className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {s.title}
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{s.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* 8. Solution FAQ Accordion */}
        {faqs && faqs.length > 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-500 mt-1">Deployment timelines, KYC onboarding, and technical requirements.</p>
            </div>
            <FAQAccordion items={faqs} />
          </div>
        )}

        {/* 9. Final Strategic Consultation Banner */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-8 sm:p-10 text-center space-y-4">
          <Badge variant="live" className="mx-auto mb-1">
            Bengaluru Telephony Engineers
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Design Your Custom Voice Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Speak directly with Hanva engineers to configure DID channels, DLT header compliance, and CRM lead pipelines for your team.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto text-xs sm:text-base whitespace-normal h-auto min-h-[48px] py-2.5 px-6">
              <TrackedDemoLink
              href={contactHref}
              ctaLocation="solution_bottom"
              ctaLabelKey="schedule_engineering_consultation"
             
            >
                Schedule Engineering Consultation
              </TrackedDemoLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-300 w-full sm:w-auto text-xs sm:text-base whitespace-normal h-auto min-h-[48px] py-2.5 px-6">
              <TrackedPhoneLink
              href={`tel:${CONTACT_CONFIG.phoneTel}`}
              ctaLocation="solution_bottom"
             
            >
                <Phone className="mr-2 h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
                <span>Call {CONTACT_CONFIG.phoneDisplay}</span>
              </TrackedPhoneLink>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
