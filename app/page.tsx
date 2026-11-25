import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import {
  PhoneCall,
  Server,
  Layers,
  Cpu,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Phone,
  Sparkles,
  Building2,
  Users,
  Clock,
  Check,
  TrendingUp,
  Headphones,
} from "lucide-react";

export const metadata = {
  title: "Cloud Telephony, Smart IVR & Telecalling CRM Platform in India",
  description:
    "Hanva unifies enterprise cloud telephony, multi-level IVR, automated dialers, and telecalling CRM for Indian businesses. Transparent pulse billing with dedicated Vi and Tata carrier DIDs.",
  alternates: {
    canonical: "https://hanva.in/",
  },
};

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hanva Technologies",
  legalName: "Hanva Technologies Private Limited",
  identifier: "U78100KA2025PTC205168",
  taxID: "29AAICH0526K1ZF",
  url: "https://hanva.in",
  logo: "https://hanva.in/logo.png",
  description: "Enterprise cloud telephony, smart IVR, automated dialers, and sales telecalling CRM software.",
  telephone: "+91-8423711043",
  email: "info@hanva.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560068",
    addressCountry: "IN",
  },
};

export default function HomePage() {
  const whatsappUrl = `https://wa.me/918423711043?text=${encodeURIComponent(
    "Hello Hanva Team, I am exploring cloud telephony and telecalling CRM solutions for my business."
  )}`;

  return (
    <div className="flex flex-col gap-16 lg:gap-24 pb-20 bg-white">
      <SchemaOrg schema={homeSchema} />

      {/* 1. Hero Section */}
      <section className="relative pt-12 lg:pt-20 pb-16 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <Container className="text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 mb-6">
            <Badge variant="secondary" className="px-3.5 py-1 text-xs font-medium">
              Enterprise Cloud Telephony & Built-in CRM
            </Badge>
          </div>

          {/* Primary Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-6 max-w-4xl mx-auto">
            Connect Every Call.{" "}
            <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2">
              Accelerate Every Deal.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Hanva unifies enterprise cloud telephony, smart multi-level IVR, automated sales dialers, and CRM into one high-performance platform. Delivered via dedicated Vodafone Idea and Tata carrier numbering with transparent pulse billing.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
            <Link href="/company/contact/" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-base">
                Book a Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing/calculator/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base border-slate-300">
                <Sparkles className="mr-2 h-4 w-4 text-emerald-600" />
                Estimate Voice Costs
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="whatsapp" size="lg" className="w-full sm:w-auto text-base">
                <MessageSquare className="mr-2 h-4 w-4" />
                WhatsApp Sales Desk
              </Button>
            </a>
          </div>

          {/* Trust Signals */}
          <div className="pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-3.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Carrier Trunking</div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">Vi & Tata DIDs</div>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">OBD Pulse Billing</div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">15s Pulse Option</div>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Corporate Entity</div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">MCA Registered</div>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Assisted Onboarding</div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">Direct Sales Engineers</div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Real Business Problems Solved Section */}
      <section className="py-4">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="secondary" className="mb-2">Operational Bottlenecks Solved</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why Indian Sales & Support Operations Switch to Hanva
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="h-10 w-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                ✕
              </div>
              <h3 className="text-base font-semibold text-slate-900">Opaque Billing & Forced 60s Pulses</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Most sales calls last 30 to 45 seconds. Traditional retail telcos round up to a full 60 seconds, forcing you to pay for unused seconds. Hanva offers transparent 15-second OBD broadcast billing options.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                ✕
              </div>
              <h3 className="text-base font-semibold text-slate-900">Manual Dialing & Agent Fatigue</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Telecallers waste up to 20 seconds manually punching phone numbers, hitting busy signals, and waiting for answers. Hanva auto-dialers skip invalid numbers and connect only live conversations.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                ✕
              </div>
              <h3 className="text-base font-semibold text-slate-900">Fragmented SaaS Subscriptions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paying one vendor for virtual numbers, another for call recording, and a third for CRM causes data silos and broken attribution. Hanva unifies voice, recording, and CRM in a single dashboard.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Core Products Suite Grid */}
      <section className="py-6">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="default" className="mb-2">Product Ecosystem</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Nine Integrated Products for Customer Communications Lifecycle
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Explore our core software offerings built for modern business communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Cloud Telephony */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Server className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Cloud Telephony & Virtual PBX</CardTitle>
                <CardDescription className="text-xs">
                  Route, record, and monitor enterprise business calls across branches without PBX hardware.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Intelligent call forwarding to agent SIMs & softphones</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Centralized encrypted call recording & CDR logs</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/cloud-telephony/" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                    Explore Cloud Telephony <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Smart IVR */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <PhoneCall className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Smart Multi-Level IVR</CardTitle>
                <CardDescription className="text-xs">
                  Automate incoming customer inquiries with personalized multi-level voice menus and routing.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Multi-level visual call trees (Press 1 for Sales)</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Automated missed call capture with automated WhatsApp alerts</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/ivr-system/" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                    Explore Smart IVR <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Call Center Suite */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Layers className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Call Center Operations Suite</CardTitle>
                <CardDescription className="text-xs">
                  Empower supervisors with live wallboards, automatic call distribution (ACD), and QA coaching.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Live supervisor wallboard & agent status</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Agent performance scorecards & call recording audits</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/call-center-software/" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                    View Call Center Suite <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Auto & Predictive Dialers */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Cpu className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Progressive & Predictive Dialers</CardTitle>
                <CardDescription className="text-xs">
                  Eliminate manual number punching. Connect telecallers only when a live prospect answers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Progressive and algorithmic predictive pacing</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> 1-Click click-to-call directly from CRM contacts</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/auto-dialer/" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                    Explore Dialers <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Card 5: Telecalling CRM */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Telecalling & Lead CRM</CardTitle>
                <CardDescription className="text-xs">
                  A purpose-built CRM for telecallers with automated lead distribution and call dispositions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Call disposition tagging & follow-up reminders</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> SIM-based and Cloud-based telecalling modes</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/telecalling-crm/" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                    Explore Telecalling CRM <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Card 6: WhatsApp CRM */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">WhatsApp Business CRM</CardTitle>
                <CardDescription className="text-xs">
                  Engage prospects on WhatsApp using official API templates, automated brochures, and chat drips.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Shared multi-agent inbox for WhatsApp enquiries</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Automated post-call brochure sharing & templates</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/whatsapp-crm/" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center">
                    Explore WhatsApp CRM <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/products/" className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center">
              View All 9 Products & Technical Specifications &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* 4. Interactive Pulse Cost Calculator Preview Section */}
      <section className="py-12 bg-slate-900 text-white rounded-2xl mx-4 sm:mx-6 lg:mx-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="live" className="mb-3 bg-emerald-950 text-emerald-300 border-emerald-800">
                Transparent Voice Billing
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                Stop Paying for Unused Seconds. Estimate Your Monthly Costs.
              </h2>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                Most outbound sales and broadcast calls conclude within 30 to 45 seconds. Traditional retail tariffs baseline at a 60-second pulse, billing you for a full minute. Hanva provides 15-second OBD pulse billing options to keep voice costs transparent.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/pricing/calculator/">
                  <Button variant="whatsapp" size="default">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Open Interactive Calculator
                  </Button>
                </Link>
                <Link href="/pricing/">
                  <Button variant="outline" size="default" className="border-slate-700 text-slate-200 bg-slate-800 hover:bg-slate-700">
                    View Pricing Plans
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 space-y-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Mathematical Pulse Comparison Example
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Average Call Duration</span>
                    <strong className="text-slate-200">42 Seconds</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Illustrative 60s Pulse Baseline</span>
                    <span className="text-red-400 font-semibold">60 Seconds Billed (1 pulse)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Hanva 15s Pulse Option</span>
                    <span className="text-emerald-400 font-semibold">45 Seconds Billed (3 pulses)</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  *Example based on an outbound OBD campaign. Comparison assumes an equivalent base rate of ₹0.60/min. Actual billing depends on selected plan, carrier trunking, and formal service agreement.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Direct Conversion Consultation Section */}
      <section className="py-6">
        <Container>
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-8 sm:p-10 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Ready to Upgrade Your Telecom & Sales Workflow?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
              Speak directly with our Bengaluru telephony engineers. We assist with statutory KYC verification, number allocation, and CRM setup.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/company/contact/">
                <Button variant="primary" size="lg">
                  Request Sales Consultation
                </Button>
              </Link>
              <a href="tel:+918423711043">
                <Button variant="outline" size="lg" className="border-slate-300">
                  <Phone className="mr-2 h-4 w-4 text-blue-600" />
                  Call: +91 8423711043
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
