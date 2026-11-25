import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SchemaOrg } from "@/components/shared/schema-org";
import { ShieldCheck, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Terms of Service & Master Service Agreement | Hanva Technologies",
  description:
    "Commercial terms of service, telecom acceptable use policy, voice pulse metering rules, and dispute resolution governing Hanva Technologies services.",
  alternates: {
    canonical: "https://hanva.in/company/terms-of-service/",
  },
};

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service of Hanva Technologies Private Limited",
  description:
    "Master commercial terms, Acceptable Use Policy (AUP), and telecom service conditions governing Hanva Technologies Private Limited.",
  url: "https://hanva.in/company/terms-of-service/",
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="py-10 lg:py-16 bg-white min-h-screen">
      <SchemaOrg data={termsSchema} />

      <Container className="max-w-5xl space-y-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">Legal</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">Terms of Service</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <Badge variant="default">Master Commercial Terms</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Terms of Service & Master Service Agreement
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: November 24, 2026 | Effective Date: July 7, 2025
          </p>
        </div>

        {/* Legal Counsel Notice Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
          <div className="p-1 rounded bg-amber-100 text-amber-800 font-bold shrink-0">NOTICE</div>
          <p className="leading-relaxed">
            These Terms of Service and Master Service Agreement terms are undergoing final legal and regulatory counsel review prior to general commercial execution. For enterprise MSA customization or contract inquiries, contact{" "}
            <a href="mailto:legal@hanva.in" className="underline font-semibold hover:text-amber-950">legal@hanva.in</a>.
          </p>
        </div>

        {/* Reading Bed Content */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Acceptance of Terms & Contracting Entity</h2>
            <p>
              These Terms of Service (&quot;Agreement&quot;) constitute a legally binding contract between you (whether an individual or business entity, &quot;Client&quot;, &quot;Customer&quot;, or &quot;Subscriber&quot;) and <strong>Hanva Technologies Private Limited</strong>, a company incorporated under the Companies Act, 2013 (CIN: U78100KA2025PTC205168), having its mailing address of record with the Registrar of Companies at No 10/35, Muniyappa Layout Papannareddy, Bommanahalli, Bangalore – 560068, Karnataka, India (&quot;Hanva&quot;, &quot;we&quot;, &quot;us&quot;), and operating from Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya, Bengaluru – 560068, Karnataka, India.
            </p>
            <p>
              By executing a formal commercial proposal, accessing our website, provisioning virtual DIDs, or utilizing our cloud telephony, IVR, or CRM platform, you agree to be bound by these Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Service Description & Telecom Architecture</h2>
            <p>
              Hanva provides cloud-hosted business software applications, including virtual PBX routing, smart multi-level IVRs, progressive outbound dialers, and sales CRM pipelines.
            </p>
            <p>
              Underlying Public Switched Telephone Network (PSTN) voice connectivity, Primary Rate Interface (PRI), Session Initiation Protocol (SIP) trunking, and 10-digit virtual numbering blocks are provisioned via authorized carrier gateways through licensed Indian Telecom Service Providers (such as Vodafone Idea Limited and Tata Teleservices Limited) in compliance with Department of Telecommunications (DoT) Hosted Other Service Provider (OSP) frameworks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Statutory KYC Obligations</h2>
            <p>
              In accordance with DoT directives, virtual numbers and trunking channels will be provisioned only after the Client submits verified Know Your Customer (KYC) documentation, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Certificate of Incorporation / Registration of Business Entity.</li>
              <li>Company Permanent Account Number (PAN) Card.</li>
              <li>Goods and Services Tax Identification Number (GSTIN) certificate.</li>
              <li>Identity & Address Proof of the Authorized Signatory alongside a signed Letter of Authorization (LOA).</li>
            </ul>
            <p>
              Hanva reserves the right to suspend or terminate services immediately without refund if statutory documentation is found to be fraudulent, invalid, or revoked by regulatory authorities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Acceptable Use Policy (AUP) & TRAI Regulations</h2>
            <p>The Client explicitly covenants that Hanva telephony services and virtual numbers will not be used for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Initiating unsolicited commercial communications in violation of the Telecom Commercial Communications Customer Preference Regulations (TCCCPR, 2018).</li>
              <li>Engaging in fraudulent activities, financial scams, phishing, abusive calls, or unauthorized telemarketing outside permissible TRAI operating hours (10:00 AM to 9:00 PM IST).</li>
              <li>Bypassing lawful telecom licensing through unauthorized voice over internet protocol (VoIP) intermixing or PSTN toll bypass.</li>
              <li>Sending bulk SMS or WhatsApp communications without registered Principal Entity IDs and approved content templates.</li>
            </ul>
            <p>
              Violations of this Acceptable Use Policy will result in immediate trunk termination and reporting to the appropriate telecom enforcement authorities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">5. Commercial Billing, Pulse Metering & Invoicing</h2>
            <p>
              Voice telephony consumption is metered according to the pulse duration and rate specified in the Client&apos;s formal written quotation.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Pulse Calculation:</strong> Calls are billed in discrete pulse intervals (e.g., 15-second OBD broadcast pulses or 30/60-second conversational pulses as contracted). Any fractional duration within a pulse is rounded up to the nearest full pulse.</li>
              <li><strong>Taxes:</strong> All quoted rates are exclusive of applicable statutory taxes. Goods and Services Tax (GST at 18%) is added to all invoices pursuant to Indian tax laws.</li>
              <li><strong>Payment Terms:</strong> Invoices are payable under the credit terms specified on the tax invoice (typically Net 5 or Net 15 days). Overdue balances may incur commercial interest as governed by the MSMED Act or formal contract.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">6. Service Availability & Scheduled Maintenance</h2>
            <p>
              Hanva utilizes commercially reasonable efforts to maintain high service availability across our core cloud application layer. However, the Client acknowledges that underlying telecom trunk availability depends upon licensed telecom service provider networks, power grids, and submarine fiber interconnects. Scheduled maintenance windows will be communicated via email or dashboard notifications with at least 24 hours prior notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Hanva shall not be liable for any indirect, incidental, punitive, or consequential damages, including loss of business revenue, profits, or data, arising from carrier network outages, telecom regulatory policy changes, or Client network latency. Hanva&apos;s total aggregate liability under this Agreement shall not exceed the total fees paid by the Client to Hanva in the three (3) months preceding the claim.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">8. Governing Law & Dispute Resolution</h2>
            <p>
              This Agreement shall be governed by, construed, and enforced in accordance with the substantive laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or relating to this Agreement shall be subject to the exclusive territorial jurisdiction of the competent courts in <strong>Bengaluru, Karnataka, India</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">9. Commercial Inquiries & Notices</h2>
            <p>All legal notices and contractual communications shall be directed to:</p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div><strong>Hanva Technologies Private Limited</strong></div>
              <div><strong>CIN:</strong> U78100KA2025PTC205168 | <strong>GSTIN:</strong> 29AAICH0526K1ZF</div>
              <div><strong>Operational Address:</strong> Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya, Bengaluru – 560068, Karnataka, India</div>
              <div><strong>Email:</strong> <a href="mailto:legal@hanva.in" className="text-blue-600 underline">legal@hanva.in</a> / <a href="mailto:info@hanva.in" className="text-blue-600 underline">info@hanva.in</a></div>
              <div><strong>Direct Desk:</strong> +91 8423711043</div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
