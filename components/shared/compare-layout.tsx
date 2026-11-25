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
  XCircle,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Phone,
  Layers,
  ArrowUpRight,
  Check,
  Minus,
  Scale,
} from "lucide-react";

export interface ComparisonRow {
  parameter: string;
  competitor: string;
  hanva: string;
  advantage: string;
}

export interface CompareLayoutProps {
  competitorName: string;
  title: string;
  subtitle: string;
  executiveSummary: string;
  breadcrumbs: { label: string; href?: string }[];
  whatsappRef: string;
  keyDifferentiators: { title: string; description: string; badge: string }[];
  matrixRows: ComparisonRow[];
  architecturalPillars: { title: string; description: string }[];
  faqs: FAQItem[];
  schemaData?: Record<string, unknown>;
}

export function CompareLayout({
  competitorName,
  title,
  subtitle,
  executiveSummary,
  breadcrumbs,
  whatsappRef,
  keyDifferentiators,
  matrixRows,
  architecturalPillars,
  faqs,
  schemaData,
}: CompareLayoutProps) {
  const whatsappUrl = `https://wa.me/918423711043?text=${encodeURIComponent(
    `Hello Hanva Team, I am evaluating an alternative to ${competitorName} and would like an objective comparison proposal. Reference: ${whatsappRef}`
  )}`;

  return (
    <div className="py-10 lg:py-14 bg-white min-h-screen">
      {schemaData && <SchemaOrg data={schemaData} />}

      <Container className="space-y-12">
        {/* 1. Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-slate-300">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-900 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* 2. Hero Section */}
        <div className="space-y-6">
          <Badge variant="default" className="text-xs">
            Objective Telecom & Software Comparison
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/company/contact/">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Request Migration Proposal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <MessageSquare className="mr-2 h-4 w-4" />
                WhatsApp Consultation
              </Button>
            </a>
            <Link href="/pricing/calculator/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Sparkles className="mr-2 h-4 w-4 text-emerald-600" />
                Compare Pulse Costs
              </Button>
            </Link>
          </div>
        </div>

        {/* 3. Executive Strategic Summary */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
            <Scale className="h-4 w-4" />
            <span>Architectural Assessment</span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {executiveSummary}
          </p>
        </div>

        {/* 4. Key Strategic Differentiators */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Why Enterprises Evaluate Hanva as an Alternative</h2>
            <p className="text-xs text-slate-500 mt-1">Key operational differences that drive switching decisions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyDifferentiators.map((diff, idx) => (
              <Card key={idx} className="border-slate-200 bg-white flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <Badge variant="secondary" className="w-fit text-[11px] mb-2">
                    {diff.badge}
                  </Badge>
                  <CardTitle className="text-lg text-slate-900">{diff.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-600 leading-relaxed">{diff.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 5. Comprehensive Parity & Comparison Matrix */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Feature Parity & Commercial Matrix</h2>
            <p className="text-xs text-slate-500 mt-1">Factual comparison based on published industry models and Hanva&apos;s architecture.</p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                  <th className="p-3.5 font-semibold w-1/4">Evaluation Parameter</th>
                  <th className="p-3.5 font-semibold w-1/4 text-slate-600">{competitorName} Typical Model</th>
                  <th className="p-3.5 font-semibold w-1/4 bg-blue-50/60 text-blue-700 font-bold">Hanva Architecture</th>
                  <th className="p-3.5 font-semibold w-1/4 text-emerald-700">Strategic Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {matrixRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3.5 font-medium text-slate-900">{row.parameter}</td>
                    <td className="p-3.5 text-slate-600">{row.competitor}</td>
                    <td className="p-3.5 bg-blue-50/30 font-medium text-slate-900">{row.hanva}</td>
                    <td className="p-3.5 font-semibold text-emerald-700">{row.advantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            *Disclaimer: All product names, logos, brands, and registered trademarks mentioned on this page (including Exotel, Knowlarity, SuperReceptionist, TeleCMI, Ameyo, LeadSquared, Zoho, and Salesforce) are the property of their respective owners. Their use on this website is strictly for identification and nominative comparative purposes, and does not imply any affiliation, sponsorship, or endorsement. Comparative evaluations reflect publicly available technical documentation, standard retail offerings, and published contract models checked as of November 2026. Specific enterprise terms vary based on commercial negotiations. Hanva commercial terms require formal written proposals, carrier service agreements, and statutory Department of Telecommunications (DoT) KYC verification.
          </p>
        </div>

        {/* 6. Architectural Pillars */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Core Engineering Principles</h2>
            <p className="text-xs text-slate-500 mt-1">Built for transparency, low operational latency, and open carrier interoperability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {architecturalPillars.map((pillar, idx) => (
              <Card key={idx} className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-slate-900 flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0" />
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 7. Alternative Comparison FAQs */}
        {faqs && faqs.length > 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions About Migration</h2>
              <p className="text-xs text-slate-500 mt-1">Number porting, contract transition, and onboarding timelines.</p>
            </div>
            <FAQAccordion items={faqs} />
          </div>
        )}

        {/* 8. Conversion Banner */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-8 sm:p-10 text-center space-y-4">
          <Badge variant="live" className="mx-auto mb-1">
            Assisted Migration & Cutover Support
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Ready to Transition to a Unified Telephony CRM?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Our Bengaluru telecom engineers assist with structured number allocation, DLT template mapping, and coordinated cutover plans. Migration timelines depend on operator approvals and technical readiness.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/company/contact/" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-xs sm:text-base px-4 sm:px-8">
                Request Migration Audit
              </Button>
            </Link>
            <a href="tel:+918423711043" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="border-slate-300 w-full sm:w-auto text-xs sm:text-base px-4 sm:px-8">
                <Phone className="mr-2 h-4 w-4 text-blue-600" />
                Call +91 8423711043
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
