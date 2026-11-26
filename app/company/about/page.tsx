import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import { ShieldCheck, Server, Users, MapPin, CheckCircle2, ArrowRight, Building, Phone } from "lucide-react";

export const metadata = {
  title: "About Hanva Technologies — Corporate Profile & Telecom Infrastructure",
  description:
    "Learn about Hanva Technologies Private Limited, an Indian enterprise cloud telephony and CRM software company incorporated in Bengaluru (CIN: U78100KA2025PTC205168).",
  alternates: {
    canonical: "https://www.hanva.in/company/about/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/company/about/",
    siteName: "Hanva Technologies",
    title: "About Hanva Technologies — Corporate Profile & Telecom Infrastructure | Hanva Technologies",
    description: "Learn about Hanva Technologies Private Limited, an Indian enterprise cloud telephony and CRM software company incorporated in Bengaluru (CIN: U78100KA2025PTC205168).",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "About Hanva Technologies — Corporate Profile & Telecom Infrastructure" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hanva Technologies — Corporate Profile & Telecom Infrastructure | Hanva Technologies",
    description: "Learn about Hanva Technologies Private Limited, an Indian enterprise cloud telephony and CRM software company incorporated in Bengaluru (CIN: U78100KA2025PTC205168).",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Hanva Technologies Private Limited",
  description:
    "Official corporate profile, statutory registration details, and telecom infrastructure of Hanva Technologies Private Limited.",
  url: "https://www.hanva.in/company/about/",
  mainEntity: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    legalName: "Hanva Technologies Private Limited",
    url: "https://www.hanva.in",
    logo: "https://www.hanva.in/logo.png",
    foundingDate: "2025-07-07",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560068",
      addressCountry: "IN",
    },
  },
};

export default function AboutPage() {
  return (
    <div className="py-10 lg:py-16 bg-white min-h-screen">
      <SchemaOrg data={aboutSchema} />

      <Container className="space-y-12">
        {/* Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">Company</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">About</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center space-y-3">
          <Badge variant="default">Corporate Profile & Telecom Infrastructure</Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Engineering Modern Cloud Voice & CRM for Indian Enterprises
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Hanva Technologies Private Limited develops enterprise cloud communications, smart multi-level IVRs, progressive auto-dialers, and unified telecalling CRM software designed for high-velocity sales and customer service teams.
          </p>
        </div>

        {/* Corporate Statutory Registry Card */}
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle as="h2" className="text-xl flex items-center">
              <Building className="h-5 w-5 text-blue-600 mr-2" />
              Statutory Corporate Registry & Governance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Hanva Technologies Private Limited is a registered private company incorporated under the Companies Act, 2013 on <strong>7th July 2025</strong> in Bengaluru, Karnataka, certified by the Ministry of Corporate Affairs (Central Registration Centre).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800">
              <div><strong className="text-slate-900 font-sans">Legal Name:</strong> Hanva Technologies Pvt. Ltd.</div>
              <div><strong className="text-slate-900 font-sans">Corporate Identity (CIN):</strong> U78100KA2025PTC205168</div>
              <div><strong className="text-slate-900 font-sans">GST Registration (GSTIN):</strong> 29AAICH0526K1ZF</div>
              <div><strong className="text-slate-900 font-sans">Permanent Account (PAN):</strong> AAICH0526K</div>
              <div><strong className="text-slate-900 font-sans">Tax Deduction (TAN):</strong> BLRH18237C</div>
              <div><strong className="text-slate-900 font-sans">Date of Incorporation:</strong> 07 July 2025</div>
            </div>

            <div className="pt-2 space-y-2 text-xs">
              <div>
                <strong className="text-slate-900">RoC Mailing Address of Record:</strong>
                <p className="text-slate-600 font-mono mt-0.5">
                  No 10/35, Muniyappa Layout Papannareddy, Bommanahalli (Bangalore), Bangalore South, Bangalore – 560068, Karnataka, India
                </p>
              </div>
              <div className="pt-1">
                <strong className="text-slate-900">Commercial Operational Office:</strong>
                <p className="text-slate-600 font-mono mt-0.5">
                  Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya, Bengaluru – 560068, Karnataka, India
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Telecom Gateway Architecture */}
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle as="h2" className="text-xl flex items-center">
              <Server className="h-5 w-5 text-emerald-600 mr-2" />
              Carrier Gateway Interconnects & DID Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Hanva delivers carrier-grade voice routing through authorized telecom gateway interconnects via <strong>CloudConnect Communications</strong>. Trunking channels and 10-digit virtual mobile/landline numbering blocks are provisioned through top-tier Indian licensed telecom operators:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="font-semibold text-slate-900 text-sm">Vodafone Idea (Vi Business)</div>
                <div className="text-xs text-slate-500 mt-1">
                  Dedicated enterprise primary DID series allocated for two-way inbound IVR and progressive outbound agent calling.
                </div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="font-semibold text-slate-900 text-sm">Tata Teleservices (TTBS)</div>
                <div className="text-xs text-slate-500 mt-1">
                  High-concurrency DID trunk series allocated for outbound broadcast dialers and nationwide toll-free 1800 termination.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Founding Leadership & Vision */}
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle as="h2" className="text-xl flex items-center">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              Leadership & Engineering Philosophy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Founded by <strong>Gaurav Kumar</strong> and <strong>Rashineni Somasekhar</strong>, Hanva was created to address a critical market imbalance in Indian business communications: the unnecessary separation between raw telecom dialers and sales CRM pipelines.
            </p>
            <p>
              Rather than forcing businesses to pay for multiple software tools, complex third-party connectors, and opaque 60-second retail voice pulses, Hanva provides an integrated, transparent software and carrier ecosystem that accelerates business revenue.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white text-center space-y-4">
          <h2 className="text-2xl font-bold">Partner with Hanva Technologies</h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Upgrade your call center and sales team with transparent voice billing, compliant DLT routing, and unified CRM software.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild variant="primary" size="lg">
              <Link href="/company/contact/">Contact Our Executive Team</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-700 text-slate-200 hover:text-white">
              <a href="tel:+918423711043">
                <Phone className="mr-2 h-4 w-4 text-blue-400" />
                Call +91 8423711043
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
