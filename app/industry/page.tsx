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
  Landmark,
  ShieldCheck,
  Car,
  Truck,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Scissors,
  UtensilsCrossed,
  Headphones,
} from "lucide-react";

export const metadata = {
  title: "Industry Cloud Telephony & CRM Solutions in India",
  description:
    "Tailored telephony and sales automation architectures for Indian Real Estate, Healthcare, EdTech, BFSI, Insurance, Automobile, Logistics, and Recruitment.",
  alternates: {
    canonical: "https://www.hanva.in/industry/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/industry/",
    siteName: "Hanva Technologies",
    title: "Industry Cloud Telephony & CRM Solutions in India | Hanva Technologies",
    description:
      "Tailored telephony and sales automation architectures for Indian Real Estate, Healthcare, EdTech, BFSI, Insurance, Automobile, Logistics, and Recruitment.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Industry Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Cloud Telephony & CRM Solutions in India | Hanva Technologies",
    description:
      "Tailored telephony and sales automation architectures for Indian Real Estate, Healthcare, EdTech, BFSI, Insurance, Automobile, Logistics, and Recruitment.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const industryHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Hanva Industry Telephony & CRM Solutions",
  description: "Specialized cloud communication architectures for Indian enterprise sectors including BFSI, Real Estate, Healthcare, Automotive, Logistics, and Education.",
  url: "https://www.hanva.in/industry/",
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
};

const industries = [
  {
    icon: Scissors,
    badge: "Salon, Spa & Studio SaaS",
    title: "Salons & Spas",
    slug: "/industry/salons-and-spas/",
    description:
      "Appointment scheduling, online booking mini-site, GST checkout, stylist commission portals, and back-bar consumable auto-consumption.",
    metrics: "Direct Booking & GST Invoicing",
    keyCapabilities: [
      "Master stylist appointment calendar with walk-in waitlist",
      "Public online booking mini-site for client self-scheduling",
      "Service-to-product auto-consumption recipe deductions",
      "Stylist staff portal with PIN login for commission tracking",
    ],
  },
  {
    icon: UtensilsCrossed,
    badge: "Restaurant, Cafe & QSR POS",
    title: "Restaurants & Cafes",
    slug: "/industry/restaurants-and-cafes/",
    description:
      "Offline-first order queue, multi-station thermal KOT printing, live Kitchen Display System (KDS), dynamic UPI QR, and recipe BOM inventory.",
    metrics: "Zero Offline Downtime",
    keyCapabilities: [
      "Offline IndexedDB queue keeping billing active during Wi-Fi drops",
      "Multi-station KOT routing (Bar, Tandoor, Main Kitchen) and live KDS",
      "Dynamic NPCI UPI QR code generated directly on customer bills",
      "Recipe Bill of Materials raw ingredient inventory depletion",
    ],
  },
  {
    icon: Headphones,
    badge: "Telesales & BPO Call Operations",
    title: "Telecalling & BPO",
    slug: "/industry/telecalling-and-bpo/",
    description:
      "Role-based lead management, 1-click cloud C2C dialing via carrier partners, automated follow-up scheduling, and browser-based call recording audits.",
    metrics: "2x Agent Talk Time",
    keyCapabilities: [
      "1-click C2C calling via CloudConnect, Ozonetel, and Fonada",
      "Lead security vaults preventing unauthorized CSV export",
      "In-browser HTML5 audio player for call recording reviews",
      "Real-time call outcome dispositions and agent shift attendance",
    ],
  },
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
  {
    icon: Landmark,
    badge: "Lending, NBFC & DSA Operations",
    title: "Financial Services & Lending",
    slug: "/industry/financial-services/",
    description:
      "Accelerate loan qualification turnaround, automate WhatsApp KYC document intake, and track telecaller conversion to disbursement.",
    metrics: "Verified Lending Stages",
    keyCapabilities: [
      "Instant dial-out for incoming digital loan inquiries",
      "Official Meta WABA KYC document collection templates",
      "Lending pipeline stages (Login, Documented, Disbursed)",
      "Compliant dual-channel voice recording archival",
    ],
  },
  {
    icon: ShieldCheck,
    badge: "Policy Renewals & Claims Triage",
    title: "Insurance Agencies & Brokerages",
    slug: "/industry/insurance/",
    description:
      "Automate multi-touch policy expiry calling cadences, dispatch quote comparisons on WhatsApp, and prioritize emergency claims IVR queues.",
    metrics: "Multi-Touch Renewal Cadence",
    keyCapabilities: [
      "Automated renewal cadences at Day -30, -15, and -3",
      "Priority claims assistance IVR routing with zero queue wait",
      "Automated WhatsApp premium quote comparisons and payment links",
      "100% voice recording archival for IRDAI disclosure compliance",
    ],
  },
  {
    icon: Car,
    badge: "Showroom & Workshop Telephony",
    title: "Automobile Dealerships",
    slug: "/industry/automobile/",
    description:
      "Drive test-drive bookings, route Sales versus Service calls via multi-level IVR, and run automated 10,000 km service maintenance reminder calls.",
    metrics: "Instant Showroom Routing",
    keyCapabilities: [
      "Automated webhook ingestion for portal test-drive inquiries",
      "Multi-department IVR trees for Sales, Service, and Insurance",
      "WhatsApp showroom location pin and brochure drops",
      "Outbound auto-dialer for scheduled workshop service recalls",
    ],
  },
  {
    icon: Truck,
    badge: "Fleet & Delivery Privacy",
    title: "Logistics & Supply Chain",
    slug: "/industry/logistics/",
    description:
      "Protect recipient privacy with driver phone number masking, automate failed delivery callback IVRs, and dispatch live tracking alerts via WhatsApp.",
    metrics: "Zero-Leak Privacy Bridge",
    keyCapabilities: [
      "DoT-compliant virtual phone number masking for riders",
      "Pre-delivery automated morning verification calls",
      "Interactive WhatsApp rescheduling and address update buttons",
      "Complete CDR dial-out audit logs to resolve delivery disputes",
    ],
  },
  {
    icon: Users,
    badge: "High-Velocity Candidate Screening",
    title: "Recruitment & Staffing",
    slug: "/industry/recruitment/",
    description:
      "Screen job applicants faster with progressive auto-dialers, dispatch job descriptions via WhatsApp, and monitor recruiter talk-time scorecards.",
    metrics: "Doubled Screening Volume",
    keyCapabilities: [
      "Progressive auto-dialing across resume pools from job boards",
      "2-click candidate screening disposition tagging",
      "Automated WhatsApp job description and interview slot delivery",
      "Recruiter talk-time KPIs, connection rates, and call recordings",
    ],
  },
];

export default function IndustryPage() {
  return (
    <div className="pt-10 pb-28 lg:py-16 bg-white min-h-screen">
      <SchemaOrg data={industryHubSchema} />

      <Container className="space-y-12">
        {/* Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-xs text-slate-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">/</li>
            <li className="text-slate-900 font-medium" aria-current="page">Industries</li>
          </ol>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <CardTitle as="h2" className="text-lg text-slate-900">{ind.title}</CardTitle>
                  <CardDescription className="text-xs text-slate-600 leading-relaxed mt-1">
                    {ind.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-slate-600 block text-[10px] uppercase tracking-wider">Benchmark Operational Impact</span>
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
                  <Button asChild variant="outline" className="w-full text-xs font-semibold">
                    <Link href={ind.slug}>
                      Explore {ind.title} &rarr;
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional SaaS & IT Solutions by Vertical */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-5">
          <div className="space-y-1">
            <Badge variant="secondary" className="text-xs">Expanded Vertical Solutions</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Dedicated SaaS &amp; IT Solutions for Hospitality, Wellness &amp; Growth Teams
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Explore our specialized SaaS platforms and custom services beyond telecom-only workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <Link
              href="/products/salon-software/"
              className="rounded-xl border border-rose-200 bg-white p-4 hover:border-rose-400 transition-colors space-y-1"
            >
              <div className="font-bold text-slate-900">Salons, Spas &amp; Clinics &rarr;</div>
              <p className="text-slate-600">Hanva Salon Software for appointments, GST billing, commissions, and inventory.</p>
            </Link>
            <Link
              href="/products/restaurant-pos/"
              className="rounded-xl border border-amber-200 bg-white p-4 hover:border-amber-400 transition-colors space-y-1"
            >
              <div className="font-bold text-slate-900">Restaurants, Cafes &amp; QSRs &rarr;</div>
              <p className="text-slate-600">Hanva Restaurant POS for KOT/KDS, QR ordering, UPI QR, and recipe stock.</p>
            </Link>
            <Link
              href="/products/crm/"
              className="rounded-xl border border-blue-200 bg-white p-4 hover:border-blue-400 transition-colors space-y-1"
            >
              <div className="font-bold text-slate-900">Sales &amp; Telecalling Teams &rarr;</div>
              <p className="text-slate-600">Hanva CRM for lead pipelines, built-in IVR, C2C calling, and WhatsApp.</p>
            </Link>
            <Link
              href="/software-development/"
              className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-400 transition-colors space-y-1"
            >
              <div className="font-bold text-slate-900">Custom IT &amp; Marketing &rarr;</div>
              <p className="text-slate-600">
                Custom software engineering &amp; <span className="text-blue-600">Digital Marketing</span> services.
              </p>
            </Link>
          </div>
        </div>

        {/* Strategic Vertical Consultation Banner */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-8 sm:p-10 text-center space-y-4">
          <Badge variant="live" className="mx-auto mb-1">
            Compliant Telecom Architecture
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Need a Bespoke Architecture for Your Vertical?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Our telecom architects design custom cloud telephony and CRM deployments with tailored DIDs, CRM webhooks, and authorized WhatsApp BSP gateways.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild variant="primary" size="lg">
              <Link href="/company/contact/">
                Discuss Your Industry Use Case
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
