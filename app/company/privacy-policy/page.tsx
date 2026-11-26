import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SchemaOrg } from "@/components/shared/schema-org";
import { ShieldCheck, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Statutory Privacy Policy of Hanva Technologies Private Limited. Information collection, voice recording retention, and data protection under the Indian DPDP Act, 2023.",
  alternates: {
    canonical: "https://www.hanva.in/company/privacy-policy/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/company/privacy-policy/",
    siteName: "Hanva Technologies",
    title: "Privacy Policy | Hanva Technologies",
    description: "Statutory Privacy Policy of Hanva Technologies Private Limited. Information collection, voice recording retention, and data protection under the Indian DPDP Act, 2023.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Hanva Technologies",
    description: "Statutory Privacy Policy of Hanva Technologies Private Limited. Information collection, voice recording retention, and data protection under the Indian DPDP Act, 2023.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy of Hanva Technologies Private Limited",
  description:
    "Official privacy policy governing data protection, telecom KYC, and voice recording retention at Hanva Technologies.",
  url: "https://www.hanva.in/company/privacy-policy/",
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-10 lg:py-16 bg-white min-h-screen">
      <SchemaOrg data={privacySchema} />

      <Container className="max-w-5xl space-y-10">
        {/* Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">Legal</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <Badge variant="default">Statutory Data Protection Policy</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: November 24, 2026 | Effective Date: July 7, 2025
          </p>
        </div>

        {/* Legal Counsel Notice Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
          <div className="p-1 rounded bg-amber-100 text-amber-800 font-bold shrink-0">NOTICE</div>
          <p className="leading-relaxed">
            This Privacy Policy is undergoing final legal and regulatory counsel review pursuant to the Digital Personal Data Protection (DPDP) Act, 2023. For data privacy inquiries or Data Protection Officer contact, write to{" "}
            <a href="mailto:privacy@hanva.in" className="underline font-semibold hover:text-amber-950">privacy@hanva.in</a>.
          </p>
        </div>

        {/* Reading Bed Content */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Introduction & Scope</h2>
            <p>
              Hanva Technologies Private Limited (&quot;Hanva&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), incorporated under the Companies Act, 2013 (CIN: U78100KA2025PTC205168), is committed to safeguarding the privacy and security of your corporate and personal information.
            </p>
            <p>
              This Privacy Policy explains how we collect, store, process, and protect information when you visit our website (<code>https://www.hanva.in</code>), subscribe to our cloud telephony, IVR, or CRM software, or interact with our sales and technical support desks. This policy is formulated in compliance with the Digital Personal Data Protection (DPDP) Act, 2023 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Categories of Information We Collect</h2>
            <p>We collect information strictly necessary to provide telecom routing, CRM software licensing, and statutory compliance:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact & Identity Data:</strong> Full name, corporate email address, mobile/WhatsApp phone number, organization name, and designation submitted via demo request or contact forms.</li>
              <li><strong>Statutory Telecom KYC Documents:</strong> Company PAN card, Certificate of Incorporation, GST registration certificate (GSTIN), and Authorized Signatory identification documents mandated by the Department of Telecommunications (DoT) and underlying telecom service providers (TSPs) for virtual DID provisioning.</li>
              <li><strong>Telephony & Communication Records:</strong> Call Detail Records (CDRs) including originating number, destination number, call duration, timestamp, pulse count, disposition outcomes, and encrypted call audio recordings created during authorized telecalling sessions.</li>
              <li><strong>Technical & Usage Data:</strong> IP addresses, browser types, session cookies, and interface telemetry required to ensure system uptime, security monitoring, and WebRTC audio quality.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Purpose and Legal Basis for Processing</h2>
            <p>Your information is processed under the following lawful grounds:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Service Delivery:</strong> To provision virtual numbers, configure multi-level IVRs, authenticate softphone WebRTC sessions, and synchronize lead pipelines.</li>
              <li><strong>Statutory Compliance:</strong> To fulfill mandatory subscriber verification obligations under Indian telecommunications laws and maintain telecom CDR archives as required by the Department of Telecommunications (DoT).</li>
              <li><strong>Commercial Billing & Invoicing:</strong> To compute call pulse usage, generate GST-compliant tax invoices, and process subscription renewals.</li>
              <li><strong>Quality & Security:</strong> To investigate technical errors, prevent spam or fraudulent telephony routing, and maintain audit trails.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Data Storage & Infrastructure Security</h2>
            <p>
              Application databases, Call Detail Records (CDRs), and audio recordings are stored in secure cloud infrastructure protected with encryption at rest and role-based access restrictions. We implement administrative and technical safeguards designed to protect telephony records and subscriber information against unauthorized access or disclosure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">5. Disclosure to Authorized Third Parties</h2>
            <p>We do not sell, rent, or trade your personal or business data. Information is disclosed solely to authorized entities as follows:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Licensed Telecom Service Providers:</strong> Statutory KYC documents and numbering requests are shared with authorized telecom gateway partners (e.g., CloudConnect, Vodafone Idea, Tata Teleservices) strictly to activate and maintain regulatory DID trunks.</li>
              <li><strong>Authorized Solution Providers:</strong> For WhatsApp Business messaging, transactional triggers are dispatched via authorized Business Solution Providers (BSPs) under applicable data protection terms.</li>
              <li><strong>Law Enforcement & Statutory Authorities:</strong> We disclose CDRs or subscriber records only upon receipt of lawful, formal requisitions from authorized law enforcement or judicial bodies in India pursuant to applicable criminal and telecom laws.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">6. Data Retention Schedule</h2>
            <p>
              Call Detail Records (CDRs) generated by underlying carrier gateways are maintained in accordance with applicable telecommunications service provider directives and statutory requirements. Customer call recordings and application logs are retained in accordance with individual subscription terms, subject to ongoing legal counsel review, after which they are scheduled for operational deletion.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">7. Your Rights & Data Protection Governance</h2>
            <p>
              Hanva is committed to data fiduciary principles and the protection of personal data in alignment with the Digital Personal Data Protection (DPDP) Act, 2023. As a Data Principal under Indian law, you may request access to your personal data, seek correction of inaccurate records, or request erasure of data that is no longer required for service delivery or statutory compliance. These provisions reflect our operating commitments and do not constitute formal statutory certification or legal advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">8. Grievance Redressal & Contact Coordinates</h2>
            <p>For inquiries, complaints, or grievance redressal regarding data protection, please contact:</p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div><strong>Grievance Officer:</strong> Mr. Gaurav Kumar</div>
              <div><strong>Entity:</strong> Hanva Technologies Private Limited</div>
              <div><strong>RoC Record Address:</strong> No 10/35, Muniyappa Layout Papannareddy, Bommanahalli, Bangalore – 560068, Karnataka, India</div>
              <div><strong>Operational Office:</strong> Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya, Bengaluru – 560068, Karnataka, India</div>
              <div><strong>Email:</strong> <a href="mailto:grievance@hanva.in" className="text-blue-600 underline">grievance@hanva.in</a> / <a href="mailto:support@hanva.in" className="text-blue-600 underline">support@hanva.in</a></div>
              <div><strong>Phone:</strong> +91 8423711043</div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
