import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import {
  ArrowRight,
  TrendingUp,
  Headphones,
  Building2,
  PhoneCall,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Cloud Telephony & CRM Solutions by Business Need | Hanva",
  description:
    "Tailored enterprise communication architectures: outbound sales automation, smart customer support routing, and high-concurrency enterprise trunking.",
  alternates: {
    canonical: "https://hanva.in/solutions/",
  },
};

const solutionsHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Hanva Cloud Telephony & CRM Solutions",
  description: "Enterprise voice solutions for sales automation, support routing, and multi-location trunking.",
  url: "https://hanva.in/solutions/",
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
};

const solutionTiers = [
  {
    icon: TrendingUp,
    badge: "Outbound Pipeline Acceleration",
    title: "Sales Call Automation",
    slug: "/solutions/sales-automation/",
    description:
      "Automate repetitive outbound calling, eliminate manual dialing latency, and connect telecallers only when live prospects answer.",
    metrics: "Automated Sequential Dialing",
    keyFeatures: [
      "Progressive auto-dialer with 1-click WebRTC softphone",
      "Automated WhatsApp brochure triggers upon call wrap-up",
      "2-click call disposition tracking and CRM callback scheduling",
      "Optional 15-second outbound OBD pulse billing option",
    ],
  },
  {
    icon: Headphones,
    badge: "Inbound Support & Resolution",
    title: "Customer Support Routing",
    slug: "/solutions/customer-support/",
    description:
      "Smart multi-level IVR, automatic call distribution (ACD), and live supervisor wallboards to route callers to available agents.",
    metrics: "Configurable Multi-Level IVR",
    keyFeatures: [
      "Custom multi-lingual audio prompts for Indian regional callers",
      "Department routing, skill-based distribution, and time-of-day logic",
      "Centralized call recordings and QA scoring for agent compliance",
      "Missed call auto-reply via SMS or WhatsApp with self-service links",
    ],
  },
  {
    icon: Building2,
    badge: "Multi-Location Voice Infrastructure",
    title: "Enterprise Voice Architecture",
    slug: "/solutions/enterprise/",
    description:
      "High-throughput carrier interconnects via Vodafone Idea and Tata Teleservices with dedicated PRI/SIP trunking allocations.",
    metrics: "Reliability-Focused Service Architecture",
    keyFeatures: [
      "Dedicated carrier trunk allocations for 25 to 250+ simultaneous calls",
      "Centralized multi-branch PBX with unified billing and usage reporting",
      "Statutory DoT KYC assistance and DLT header/template registration",
      "Custom REST API webhooks for enterprise CRM and ERP synchronization",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <div className="py-10 lg:py-16 bg-white min-h-screen">
      <SchemaOrg data={solutionsHubSchema} />

      <Container className="space-y-12">
        {/* Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">Solutions</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="default" className="text-xs">
            Purpose-Built Business Architectures
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Telephony & Software Engineered for Your Operational Goals
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether your primary objective is scaling an outbound telecalling sales team, streamlining inbound customer care, or consolidating multi-city branch telephony, Hanva provides modular, fully integrated architectures.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutionTiers.map((sol, idx) => {
            const Icon = sol.icon;
            return (
              <Card key={idx} className="border-slate-200 bg-white flex flex-col justify-between hover:border-blue-300 transition-all hover:shadow-sm">
                <CardHeader className="pb-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="w-fit text-[11px] mb-1">
                    {sol.badge}
                  </Badge>
                  <CardTitle className="text-xl text-slate-900">{sol.title}</CardTitle>
                  <CardDescription className="text-xs text-slate-600 leading-relaxed mt-1">
                    {sol.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Target Operational Metric</span>
                    <strong className="text-blue-700 font-semibold">{sol.metrics}</strong>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-800 block">Core Architecture:</span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {sol.keyFeatures.map((f, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <div className="p-6 pt-0">
                  <Button asChild variant="outline" className="w-full text-xs font-semibold">
                    <Link href={sol.slug}>
                      Explore {sol.title} &rarr;
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Strategic Cross-Consultation Banner */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-8 sm:p-10 text-center space-y-4">
          <Badge variant="live" className="mx-auto mb-1">
            Carrier Interconnects via Vi & Tata DIDs
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Unsure Which Architecture Fits Your Workflow?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Our Bengaluru telecom solutions engineers will review your existing call volume, agent seat count, and CRM stack to recommend an optimal, cost-efficient deployment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild variant="primary" size="lg">
              <Link href="/company/contact/">
                Schedule Solutions Review
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-300">
              <Link href="/pricing/calculator/">
                <Sparkles className="mr-2 h-4 w-4 text-emerald-600" />
                Cost Calculator
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
