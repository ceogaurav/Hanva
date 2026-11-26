import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import {
  ShieldCheck,
  Lock,
  Server,
  FileCheck2,
  EyeOff,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Database,
  Phone,
} from "lucide-react";

export const metadata = {
  title: "Security, Trust & Regulatory Compliance",
  description:
    "Learn how Hanva secures enterprise voice communications: application-level access controls, TLS 1.3 / SRTP encryption, and data privacy governance.",
  alternates: {
    canonical: "https://www.hanva.in/company/security-and-trust/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/company/security-and-trust/",
    siteName: "Hanva Technologies",
    title: "Security, Trust & Regulatory Compliance | Hanva Technologies",
    description: "Learn how Hanva secures enterprise voice communications: application-level access controls, TLS 1.3 / SRTP encryption, and data privacy governance.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Security, Trust & Regulatory Compliance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security, Trust & Regulatory Compliance | Hanva Technologies",
    description: "Learn how Hanva secures enterprise voice communications: application-level access controls, TLS 1.3 / SRTP encryption, and data privacy governance.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const securitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Security, Trust and Compliance at Hanva Technologies",
  description:
    "Enterprise security architecture, telecom transport encryption, access controls, and data privacy framework of Hanva Technologies.",
  url: "https://www.hanva.in/company/security-and-trust/",
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
};

const securityPillars = [
  {
    icon: Database,
    title: "Data Privacy & Governance Architecture",
    description:
      "Core application databases, Call Detail Records (CDRs), and audio recordings are structured with role-based permissions and encrypted storage, designed in alignment with data fiduciary principles and privacy best practices.",
  },
  {
    icon: Lock,
    title: "Transport & Storage Encryption",
    description:
      "WebRTC softphone voice communications utilize standard Secure Real-Time Transport Protocol (SRTP) and TLS protocols. Stored media recordings and application database volumes are protected utilizing standardized AES storage encryption alongside role-based access restrictions.",
  },
  {
    icon: EyeOff,
    title: "Phone Number Masking & Anti-Theft",
    description:
      "Prevent proprietary customer database leakage. Sales reps place calls through browser click-to-call while client mobile numbers remain masked, ensuring agents cannot download or steal your high-value client lists.",
  },
  {
    icon: UserCheck,
    title: "Granular Role-Based Access Control (RBAC)",
    description:
      "Define strict permission levels across Telecallers, Team Leads, QA Auditors, and System Administrators. Prevent unauthorized audio export, restrict contact visibility by territory, and enforce audit logging.",
  },
  {
    icon: FileCheck2,
    title: "DoT Hosted OSP & DLT Guidelines",
    description:
      "Hanva operates in accordance with Department of Telecommunications (DoT) Hosted OSP regulatory frameworks. Virtual DID allocations require verified corporate KYC documentation, and commercial communication headers are registered via TRAI DLT portals.",
  },
  {
    icon: Server,
    title: "Carrier Gateway Resiliency",
    description:
      "Provisioned on carrier gateway interconnects with Vodafone Idea and Tata Teleservices with multi-trunk routing paths to support operational business continuity.",
  },
];

export default function SecurityAndTrustPage() {
  return (
    <div className="py-10 lg:py-16 bg-white min-h-screen">
      <SchemaOrg data={securitySchema} />

      <Container className="space-y-12">
        {/* Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">Company</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">Security & Trust</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center space-y-3">
          <Badge variant="default">Enterprise Trust & Security Architecture</Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Security, Privacy & Regulatory Integrity by Design
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Protecting your corporate communications, customer privacy, and statutory compliance is central to our engineering mission. Learn how Hanva safeguards your business operations.
          </p>
        </div>

        {/* Security Framework Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Card key={idx} className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                    <Icon className="h-4 w-4" />
                  </div>
                  <CardTitle as="h2" className="text-base text-slate-900">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Regulatory Governance Section */}
        <Card className="border-slate-200 bg-slate-50/70">
          <CardHeader>
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Statutory Telecom Governance</span>
            </div>
            <CardTitle as="h2" className="text-xl text-slate-900">
              Department of Telecommunications (DoT) & TRAI Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              Hanva operates as a Hosted Telecom Application and Unified Communications software provider. In compliance with the Department of Telecommunications (DoT) guidelines for Other Service Providers (OSPs):
            </p>
            <ul className="space-y-2 pt-1 text-xs">
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                <span><strong>No Toll Bypass:</strong> We enforce strict logical separation between international voice packets and Indian domestic PSTN routing to ensure absolute adherence to Indian telecom licensing.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                <span><strong>Mandatory Statutory KYC:</strong> Every enterprise account is provisioned only after thorough validation of corporate documents (Certificate of Incorporation, PAN, GSTIN, and Authorized Signatory ID).</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                <span><strong>DLT Blockchain Whitelisting:</strong> Commercial messaging and caller identification are bound to approved Principal Entity IDs and verified TRAI templates.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Security Audit Consultation */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white text-center space-y-4">
          <h2 className="text-2xl font-bold">Require an Enterprise Security Assessment?</h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Our engineering team can assist your InfoSec and compliance officers with architectural reviews, vendor risk assessments, and data protection agreements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild variant="primary" size="lg">
              <Link href="/company/contact/">Contact Security Team</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-700 text-slate-200 hover:text-white">
              <Link href="/company/privacy-policy/">
                Read Privacy Policy
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
