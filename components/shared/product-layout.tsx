import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { SchemaOrg } from "@/components/shared/schema-org";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Phone,
  HelpCircle,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

export interface CapabilityItem {
  title: string;
  description: string;
  badge?: string;
}

export interface UseCaseItem {
  title: string;
  description: string;
  audience: string;
}

export interface ProductLayoutProps {
  categoryBadge: string;
  title: string;
  subtitle: string;
  problemStatement: string;
  breadcrumbs: { label: string; href?: string }[];
  whatsappRef: string;
  workflowTitle?: string;
  workflowSteps: WorkflowStep[];
  capabilities: CapabilityItem[];
  useCases: UseCaseItem[];
  ecosystemSynergies: { title: string; description: string; href: string }[];
  faqs: FAQItem[];
  schemaData?: Record<string, any>;
}

export function ProductLayout({
  categoryBadge,
  title,
  subtitle,
  problemStatement,
  breadcrumbs,
  whatsappRef,
  workflowTitle = "How the Architecture Works",
  workflowSteps,
  capabilities,
  useCases,
  ecosystemSynergies,
  faqs,
  schemaData,
}: ProductLayoutProps) {
  const whatsappUrl = `https://wa.me/918423711043?text=${encodeURIComponent(
    `Hello Hanva Team, I am interested in learning more about ${title}. Reference: ${whatsappRef}`
  )}`;

  return (
    <div className="flex flex-col gap-12 lg:gap-20 pb-20 bg-white">
      {schemaData && <SchemaOrg schema={schemaData} />}

      {/* Hero Section */}
      <section className="relative pt-10 lg:pt-16 pb-12 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <Container className="space-y-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-slate-300">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-800 font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="default" className="text-xs">
              {categoryBadge}
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              {title}
            </h1>
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Problem Statement Card */}
          <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-semibold block mb-1">Business Problem Solved:</strong>
            {problemStatement}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 pt-2">
            <Link href="/company/contact/" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Request Live Demonstration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing/calculator/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Sparkles className="mr-2 h-4 w-4 text-emerald-600" />
                Estimate Voice Costs
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <MessageSquare className="mr-2 h-4 w-4" />
                WhatsApp Consultation
              </Button>
            </a>
          </div>
        </Container>
      </section>

      {/* How It Works Workflow Architecture */}
      <section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="secondary" className="mb-2">Operational Workflow</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {workflowTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              From carrier trunking to live agent interactions and automated CRM logging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-blue-600 mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Core Capabilities */}
      <section className="bg-slate-50/80 py-12 border-y border-slate-100">
        <Container>
          <div className="max-w-2xl mb-10">
            <Badge variant="default" className="mb-2">Practical Features</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Enterprise Capabilities Engineered for Productivity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <Card key={idx} className="border-slate-200 bg-white">
                <CardHeader className="p-5 pb-3">
                  {cap.badge && (
                    <Badge variant="secondary" className="w-fit mb-2 text-[10px]">
                      {cap.badge}
                    </Badge>
                  )}
                  <CardTitle className="text-base font-semibold">{cap.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 text-xs text-slate-600 leading-relaxed">
                  {cap.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Target Use Cases */}
      <section>
        <Container>
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-2">Target Use Cases</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Built for High-Growth Indian Business Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider block">
                  {useCase.audience}
                </span>
                <h3 className="text-base font-semibold text-slate-900">{useCase.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Ecosystem Synergies */}
      <section className="bg-slate-900 text-white rounded-2xl mx-4 sm:mx-6 lg:mx-8 py-10 px-6 sm:px-10">
        <Container className="space-y-6">
          <div className="max-w-xl">
            <Badge variant="live" className="mb-2 bg-blue-950 text-blue-300 border-blue-800">
              Unified Platform
            </Badge>
            <h2 className="text-2xl font-bold text-white">How This Product Works With Hanva Platform</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Hanva products are natively integrated. No expensive third-party middleware or API connector subscriptions required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {ecosystemSynergies.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-blue-500 transition-colors group block"
              >
                <div className="flex items-center justify-between text-slate-200 font-semibold text-sm mb-1 group-hover:text-blue-400">
                  <span>{item.title}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Frequently Asked Questions */}
      <section>
        <Container className="space-y-6">
          <div>
            <Badge variant="default" className="mb-2">Common Questions</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Clear answers to practical onboarding, technical setup, and commercial billing questions.
            </p>
          </div>

          <FAQAccordion items={faqs} />
        </Container>
      </section>

      {/* Final Conversion Callout */}
      <section>
        <Container>
          <div className="p-8 sm:p-10 rounded-2xl border border-blue-200 bg-blue-50/70 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Ready to Upgrade Your Calling Operations?
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Our Bengaluru sales engineers will walk you through live call flows, carrier DID allocations, and transparent pulse pricing.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-2">
              <Link href="/company/contact/" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Request Live Consultation
                </Button>
              </Link>
              <a href="tel:+918423711043" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="border-slate-300 w-full sm:w-auto text-xs sm:text-base px-4 sm:px-8">
                  <Phone className="mr-2 h-4 w-4 text-blue-600" />
                  Call Sales Desk: +91 8423711043
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
