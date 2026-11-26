import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import { TrackedDemoLink, TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG } from "@/lib/config";
import {
  MapPin,
  Building2,
  Server,
  Radio,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  Layers,
  Clock,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Cloud Telephony & B2B Telecalling Solutions Across India",
  description:
    "Explore Hanva's business communication hubs in Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune, and Chennai. Genuine local virtual STD DIDs and cloud CRM.",
  alternates: {
    canonical: "https://www.hanva.in/locations/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/locations/",
    siteName: "Hanva Technologies",
    title: "Cloud Telephony & B2B Telecalling Solutions Across India | Hanva Technologies",
    description:
      "Explore Hanva's business communication hubs in Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune, and Chennai. Genuine local virtual STD DIDs and cloud CRM.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Regional Locations Hub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Telephony & B2B Telecalling Solutions Across India | Hanva Technologies",
    description:
      "Explore Hanva's business communication hubs in Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune, and Chennai. Genuine local virtual STD DIDs and cloud CRM.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const locationsHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Hanva Geographic Business Telephony Hubs",
  description:
    "Enterprise cloud telephony, virtual landline DIDs, and telecalling CRM architectures across Indian metropolitan commercial hubs.",
  url: "https://www.hanva.in/locations/",
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
};

const locations = [
  {
    cityName: "Bengaluru",
    state: "Karnataka",
    statusBadge: "Commercial Operational Office",
    isHQ: true,
    stdCode: "080",
    slug: "/locations/bengaluru/",
    description:
      "Central engineering hub, commercial operational office, and high-concurrency cloud telephony for SaaS innovators, tech startups, EdTech counselor floors, and high-ticket real estate.",
    sectors: ["SaaS & Tech Startups", "High-Ticket Real Estate", "EdTech Inside Sales"],
    carrierNote: "Direct Tata & Vi PRI/SIP Interconnects + On-Site Engineering Consultations",
  },
  {
    cityName: "Mumbai",
    state: "Maharashtra",
    statusBadge: "Cloud Telephony Delivery Hub",
    isHQ: false,
    stdCode: "022",
    slug: "/locations/mumbai/",
    description:
      "Carrier-grade cloud telephony and dual-channel cloud call recording for BFSI firms, NBFC lending collections, wealth management, insurance brokerages, and logistics dispatchers in MMR.",
    sectors: ["BFSI & Digital Lending DSAs", "Insurance & IRDAI Brokers", "Logistics & Fleet Dispatch"],
    carrierNote: "022 Virtual DID Series via Tata Teleservices & Vodafone Idea Trunks",
  },
  {
    cityName: "Delhi NCR",
    state: "Delhi, Gurugram, Noida",
    statusBadge: "Cloud Telephony Delivery Hub",
    isHQ: false,
    stdCode: "011",
    slug: "/locations/delhi-ncr/",
    description:
      "High-velocity predictive auto-dialers, buyer-driver virtual number masking for e-commerce logistics, and multi-channel telecalling CRM across Gurugram, Noida, and Delhi.",
    sectors: ["E-Commerce & D2C Logistics", "B2B Distribution & Trade", "Outbound BPO Call Centers"],
    carrierNote: "011 Landline DIDs + Integrated Number Masking Gateways",
  },
  {
    cityName: "Hyderabad",
    state: "Telangana",
    statusBadge: "Cloud Telephony Delivery Hub",
    isHQ: false,
    stdCode: "040",
    slug: "/locations/hyderabad/",
    description:
      "Enterprise IVRs with multi-lingual voice prompts, clinic appointment scheduling, and property broker telecalling workflows across HITEC City, Gachibowli, and Telangana commercial hubs.",
    sectors: ["ITeS & Global Capability Centers", "Healthcare & Clinic OPD Desks", "Real Estate Townships"],
    carrierNote: "040 Virtual Landline DIDs with Bilingual IVR Support",
  },
  {
    cityName: "Pune",
    state: "Maharashtra",
    statusBadge: "Cloud Telephony Delivery Hub",
    isHQ: false,
    stdCode: "020",
    slug: "/locations/pune/",
    description:
      "Specialized telecalling workflows for automotive dealerships, periodic maintenance service (PMS) recall dialers, and manufacturing vendor coordination across Hinjawadi and PCMC.",
    sectors: ["Automotive Dealerships & Workshops", "Manufacturing Supply Chains", "IT & Offshore Tech Services"],
    carrierNote: "020 Virtual DIDs + Companion Android SIM Telecalling App",
  },
  {
    cityName: "Chennai",
    state: "Tamil Nadu",
    statusBadge: "Cloud Telephony Delivery Hub",
    isHQ: false,
    stdCode: "044",
    slug: "/locations/chennai/",
    description:
      "Robust WebRTC cloud PBX, automotive ancillary customer management, and multi-lingual Tamil/English IVR menus for industrial enterprises along OMR and Guindy.",
    sectors: ["Enterprise SaaS Ecosystem", "Automotive Ancillary Hubs", "Healthcare & Medical Tourism"],
    carrierNote: "044 Virtual Numbers with Dual-Language Audio Routing",
  },
];

export default function LocationsHubPage() {
  const whatsappConsultUrl = `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
    "Hello Hanva Team, I am interested in cloud telephony and virtual numbers for my business location. Reference: /locations/"
  )}`;

  return (
    <div className="py-10 lg:py-14 bg-white min-h-screen">
      <SchemaOrg data={locationsHubSchema} />

      <Container className="space-y-12">
        {/* 1. Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">Locations</span>
        </nav>

        {/* 2. Hero Header */}
        <div className="space-y-6">
          <Badge variant="default" className="text-xs">
            Geographic Telephony Infrastructure
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Indian Business Communication & Cloud Telephony Hubs
          </h1>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
            Empower your sales, support, and telecalling operations with trusted local virtual STD numbers, 
            carrier-grade SIP trunking, and native telecalling CRM software deployed across India&apos;s key commercial metros.
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-5">
                <TrackedDemoLink href="/company/contact/?product=cloud-telephony" ctaLocation="locations_hub_hero" ctaLabelKey="consult_telephony_architect">
                  <span>Consult Telephony Architect</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0 inline" aria-hidden="true" />
                </TrackedDemoLink>
              </Button>
              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-5">
                <TrackedWhatsAppLink href={whatsappConsultUrl} target="_blank" rel="noopener noreferrer" ctaLocation="locations_hub_hero" contextRef="/locations/">
                  <span>WhatsApp Inquiry</span>
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-5">
                <Link href="/pricing/calculator/">
                  <Sparkles className="mr-2 h-4 w-4 text-emerald-600 shrink-0 inline" aria-hidden="true" />
                  <span>Estimate Pricing</span>
                </Link>
              </Button>
            </div>
            <p className="text-[11px] text-slate-600">
              WhatsApp Inquiry opens WhatsApp with your location query — review and press Send to chat.
            </p>
          </div>
        </div>

        {/* 3. Transparent Delivery & Presence Disclosure */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>Infrastructure Transparency &amp; Physical vs. Cloud Delivery Model</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Hanva Technologies Private Limited operates from its commercial facility at <strong>Raj Arcade, Garvebhavi Palya, Bengaluru - 560068, Karnataka</strong> (MCA Registered Office: Bommanahalli, Bengaluru - 560068). 
            All regional markets outside Bengaluru are served through enterprise <strong>cloud telephony delivery</strong>, connecting local virtual landline numbers 
            (022, 011, 040, 020, 044) via interconnects with Tata Teleservices and Vodafone Idea. 
            Clients across India receive 24-48 hour digital KYC onboarding with zero physical PBX hardware installation required.
          </p>
        </div>

        {/* 4. Geographic Grid of 6 Metros */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Regional Communication Hubs</h2>
            <p className="text-xs text-slate-500 mt-1">
              Select your metropolitan market to explore localized telephony architecture, DID series, and vertical use cases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc, i) => (
              <Card key={i} className="border-slate-200 bg-white flex flex-col justify-between hover:border-blue-300 hover:shadow-sm transition-all">
                <CardHeader className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={loc.isHQ ? "default" : "secondary"} className="text-xs">
                      {loc.statusBadge}
                    </Badge>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      STD {loc.stdCode}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-between">
                    <span>{loc.cityName}</span>
                    <span className="text-xs font-normal text-slate-500">{loc.state}</span>
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600 leading-relaxed">
                    {loc.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4">
                  <div className="space-y-1.5 border-t border-slate-100 pt-3">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Primary Industry Verticals
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.sectors.map((sec, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-blue-700 font-medium bg-blue-50/60 p-2 rounded border border-blue-100/60">
                    {loc.carrierNote}
                  </div>

                  <div className="pt-2">
                    <Button asChild variant="outline" size="sm" className="w-full justify-between group">
                      <Link href={loc.slug}>
                        <span>Explore {loc.cityName} Architecture</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 5. Telecom Infrastructure & Compliance Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <Card className="border-slate-200 bg-white p-6 space-y-3">
            <Server className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <h3 className="text-base font-bold text-slate-900">Carrier Trunking Redundancy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interconnected with carriers Tata Teleservices and Vodafone Idea via authorized gateways for resilient multi-circle call routing.
            </p>
          </Card>
          <Card className="border-slate-200 bg-white p-6 space-y-3">
            <Radio className="h-6 w-6 text-emerald-600" aria-hidden="true" />
            <h3 className="text-base font-bold text-slate-900">Local Area Code Trust</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Display authentic local 080, 022, 011, 040, 020, and 044 Caller IDs so regional prospects recognize a local city business presence.
            </p>
          </Card>
          <Card className="border-slate-200 bg-white p-6 space-y-3">
            <ShieldCheck className="h-6 w-6 text-purple-600" aria-hidden="true" />
            <h3 className="text-base font-bold text-slate-900">Regulatory TRAI Compliance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Structured support for DLT registration guidance, dual-channel call recording, and DoT statutory KYC workflows.
            </p>
          </Card>
        </div>

        {/* Bottom Locations Conversion Banner */}
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white text-center space-y-4">
          <h2 className="text-2xl font-bold">Need Virtual Numbers Across Multiple Indian Cities?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Request multi-circle DID availability and customized pulse quotations from our Bengaluru solutions desk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <TrackedDemoLink href="/company/contact/?product=virtual-numbers" ctaLocation="locations_hub_bottom" ctaLabelKey="request_multi_city_dids">
                <span>Request DID Availability</span>
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </TrackedDemoLink>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
