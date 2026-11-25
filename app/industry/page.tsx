import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import {
  Building2,
  Stethoscope,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export const metadata = {
  title: "Industry Cloud Telephony & CRM Solutions in India | Hanva",
  description:
    "Tailored telephony and sales automation architectures for Indian Real Estate, Healthcare, and EdTech enterprises. Integrated DIDs, IVR, and WhatsApp.",
  alternates: {
    canonical: "https://hanva.in/industry/",
  },
};

const industryHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Hanva Industry Telephony & CRM Solutions",
  description: "Specialized cloud communication architectures for Real Estate, Healthcare, and Education sectors in India.",
  url: "https://hanva.in/industry/",
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
};

const industries = [
  {
    icon: Building2,
    badge: "High-Ticket Lead Acceleration",
    title: "Real Estate & Infrastructure",
    slug: "/industry/real-estate/",
    description:
      "Automated lead intake for property portal leads, automated floor plan sharing via WhatsApp, and site-visit scheduling.",
    metrics: "Prompt Portal Ingestion",
    keyCapabilities: [
      "Auto-dialing integration for MagicBricks & 99acres leads",
      "Automated post-call brochure and location drops on WhatsApp",
      "Site-visit scheduling and telecaller disposition tracking",
      "Virtual number masking to protect buyer and developer phone numbers",
    ],
  },
  {
    icon: Stethoscope,
    badge: "Clinic & Hospital Operations",
    title: "Healthcare & Diagnostics",
    slug: "/industry/healthcare/",
    description:
      "24/7 patient IVR booking, automated doctor appointment reminders, diagnostic report dispatch, and emergency queue prioritization.",
    metrics: "Automated Multi-Channel Alerts",
    keyCapabilities: [
      "Multi-lingual patient greeting and clinic department routing",
      "Automated appointment reminder calls and WhatsApp confirmations",
      "Secure diagnostic report download links via authorized BSP gateway",
      "DoT and DPDP-compliant patient data and recording encryption",
    ],
  },
  {
    icon: GraduationCap,
    badge: "Admissions & Counseling Pipelines",
    title: "EdTech & Education Admissions",
    slug: "/industry/education/",
    description:
      "Manage high-volume admission inquiry cycles, auto-dial student leads during peak windows, and track counselor calling performance.",
    metrics: "Progressive Pacing Workflow",
    keyCapabilities: [
      "Progressive auto-dialing for web webinar and entrance test leads",
      "Centralized admission counselor pipeline and disposition tagging",
      "Course brochure and fee structure dispatch on call disconnect",
      "Centralized audio recordings for counseling script compliance",
    ],
  },
];

export default function IndustryPage() {
  return (
    <div className="py-10 lg:py-16 bg-white min-h-screen">
      <SchemaOrg data={industryHubSchema} />

      <Container className="space-y-12">
        {/* Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">Industries</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="default" className="text-xs">
            Sector-Specific Telephony Blueprints
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Specialized Telecom & CRM Solutions for High-Growth Verticals
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Generic communication tools fail to capture domain-specific workflows. Hanva provides pre-configured calling, IVR routing, and CRM architectures tailored specifically for Indian enterprise sectors.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <Card key={idx} className="border-slate-200 bg-white flex flex-col justify-between hover:border-blue-300 transition-all hover:shadow-sm">
                <CardHeader className="pb-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="w-fit text-[11px] mb-1">
                    {ind.badge}
                  </Badge>
                  <CardTitle className="text-xl text-slate-900">{ind.title}</CardTitle>
                  <CardDescription className="text-xs text-slate-600 leading-relaxed mt-1">
                    {ind.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Benchmark Operational Impact</span>
                    <strong className="text-blue-700 font-semibold">{ind.metrics}</strong>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-800 block">Vertical Capabilities:</span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {ind.keyCapabilities.map((c, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <div className="p-6 pt-0">
                  <Link href={ind.slug} className="block w-full">
                    <Button variant="outline" className="w-full text-xs font-semibold">
                      Explore {ind.title} &rarr;
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Strategic Vertical Consultation Banner */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-8 sm:p-10 text-center space-y-4">
          <Badge variant="live" className="mx-auto mb-1">
            Compliant Telecom Architecture
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Need an Architecture for a Different Industry?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            We also design custom cloud telephony and CRM deployments for Logistics, Automobile Dealerships, FinTech, and BPO operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/company/contact/">
              <Button variant="primary" size="lg">
                Discuss Your Industry Use Case
              </Button>
            </Link>
            <Link href="/pricing/calculator/">
              <Button variant="outline" size="lg" className="border-slate-300">
                <Sparkles className="mr-2 h-4 w-4 text-emerald-600" />
                Cost Calculator
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
