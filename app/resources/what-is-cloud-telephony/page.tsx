import * as React from "react";
import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { Table, TableBody, TableCell,
  TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Server, ArrowRight, ShieldCheck, PhoneCall, Network, AlertCircle, HelpCircle } from "lucide-react";

export const metadata = {
  title: "What Is Cloud Telephony? The Complete Indian Business Guide",
  description:
    "Explore cloud telephony architecture, virtual PBX systems, SIP trunking, and how Indian businesses replace legacy on-premise EPABX hardware without capital expense.",
  alternates: {
    canonical: "https://www.hanva.in/resources/what-is-cloud-telephony/",
  },
  openGraph: {
    title: "What Is Cloud Telephony? The Complete Indian Business Guide",
    description:
      "Understand cloud PBX architecture, virtual landline DIDs, SIP trunking, and how modern softphones replace legacy EPABX hardware without capital expenditure.",
    url: "https://www.hanva.in/resources/what-is-cloud-telephony/",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Cloud Telephony? The Complete Indian Business Guide | Hanva Technologies",
    description: "Explore cloud telephony architecture, virtual PBX systems, SIP trunking, and how Indian businesses replace legacy on-premise EPABX hardware without capital expense.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is Cloud Telephony? Architecture, Benefits & Indian Business Setup Guide",
  description:
    "A comprehensive technical and operational breakdown of cloud telephony: virtual PBX, carrier trunking, DTMF routing, and regulatory compliance under DoT and TRAI.",
  author: {
    "@type": "Organization",
    name: "Hanva Engineering & Editorial Board",
    url: "https://www.hanva.in/company/about/",
  },
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    url: "https://www.hanva.in",
    logo: {
      "@type": "ImageObject",
      url: "https://www.hanva.in/icon.png",
    },
  },
  datePublished: "2026-11-25",
  dateModified: "2026-11-25",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.hanva.in/resources/what-is-cloud-telephony/",
  },
};

const faqs = [
  {
    question: "How does cloud telephony differ from traditional EPABX hardware?",
    answer:
      "Traditional EPABX requires expensive on-premise hardware switches, dedicated physical copper wiring, PRI line cards, and periodic annual maintenance contracts (AMC). Cloud telephony hosts the PBX logic on secure cloud servers. Calls are routed via software rules, SIP trunks, and carrier gateways to web softphones, mobile phones, or SIP endpoints without requiring on-premise telecom servers.",
  },
  {
    question: "Is cloud telephony legal and compliant with TRAI and DoT in India?",
    answer:
      "Yes. Cloud telephony operates within the framework regulated by the Department of Telecommunications (DoT) and Telecom Regulatory Authority of India (TRAI). In June 2021, the DoT further liberalized Other Service Provider (OSP) guidelines, removing bank guarantees and enabling work-from-anywhere operations. Telecom services in India must adhere to toll-bypass restrictions, meaning international VoIP calls cannot interconnect with domestic Public Switched Telephone Networks (PSTN). Commercial providers deliver domestic calls via licensed telecom service providers like Tata Teleservices and Vodafone Idea.",
  },
  {
    question: "Do my telecallers need dedicated landline phone instruments?",
    answer:
      "No. Agents can place and receive calls using browser-based WebRTC softphones on laptops with standard USB headsets, companion Android mobile dialer apps, or by having inbound calls forwarded directly to their existing mobile numbers.",
  },
  {
    question: "What happens if our internet connection drops during business hours?",
    answer:
      "Cloud telephony platforms feature carrier-level failover routing. If your office broadband suffers an outage, the cloud PBX immediately routes calls to pre-configured fallback mobile numbers or backup remote teams over cellular PSTN networks, preventing customer calls from bouncing.",
  },
  {
    question: "How does two-legged call forwarding work?",
    answer:
      "When an inbound call arrives at your cloud virtual number (Leg A), the telephony server identifies the target agent and dials their mobile or PSTN phone (Leg B). Once the agent answers, the cloud PBX bridges Leg A and Leg B together. In cloud telephony, both legs consume call capacity, which is why transparent pulse billing and WebRTC softphones are vital to controlling operational costs.",
  },
];

export default function WhatIsCloudTelephonyPage() {
  return (
    <ArticleLayout
      pillarBadge="Pillar A: Cloud Telephony & IVR"
      pillarHref="/resources/"
      title="What Is Cloud Telephony? Architecture, Benefits & Indian Business Setup Guide"
      subtitle="A pragmatic operational blueprint explaining how virtual PBX, carrier SIP trunking, WebRTC softphones, and intelligent call distribution replace costly legacy telecom hardware."
      readTime="10 min read"
      publishDate="November 25, 2026"
      reviewDate="November 2026"
      editorialAttribution="Hanva Engineering & Editorial Board"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "What Is Cloud Telephony?" },
      ]}
      whatsappRef="/resources/what-is-cloud-telephony/"
      executiveSummary="Cloud telephony is a software-defined telecommunications architecture that moves physical PBX hardware into cloud infrastructure. Instead of routing calls through copper wires and server racks in an office basement, businesses manage virtual phone numbers, multi-level IVRs, call recording, and telecalling queues through web browsers and APIs. In India, voice traffic terminates over licensed carrier gateways (such as Tata Teleservices and Vodafone Idea), bridging standard PSTN callers to sales and support agents anywhere in the country."
      tableOfContents={[
        { id: "core-architecture", title: "1. Core Architecture: How It Works" },
        { id: "cloud-vs-epabx", title: "2. Cloud Telephony vs. Legacy EPABX" },
        { id: "key-capabilities", title: "3. Essential Platform Capabilities" },
        { id: "indian-regulations", title: "4. TRAI & DoT Compliance in India" },
        { id: "implementation-checklist", title: "5. Setup & Migration Checklist" },
        { id: "faqs", title: "6. Frequently Asked Questions" },
      ]}
      relatedProducts={[
        {
          title: "Cloud Telephony",
          description: "Enterprise voice infrastructure with virtual numbers, call distribution, and analytics.",
          href: "/products/cloud-telephony/",
        },
        {
          title: "Smart IVR Systems",
          description: "Multi-level DTMF routing, dynamic audio menus, and CRM screen-pop webhooks.",
          href: "/products/smart-ivr/",
        },
        {
          title: "Virtual Phone Numbers",
          description: "STD landline and mobile DIDs with instant inbound routing across Indian cities.",
          href: "/products/virtual-numbers/",
        },
      ]}
      relatedIndustries={[
        {
          title: "Real Estate",
          description: "Centralized inquiry numbers, lead assignment, and site-visit scheduling.",
          href: "/industry/real-estate/",
        },
        {
          title: "Healthcare",
          description: "Multi-language patient appointment IVRs, OPD scheduling, and emergency lines.",
          href: "/industry/healthcare/",
        },
        {
          title: "Financial Services",
          description: "Secure customer verification, tele-sales tracking, and regulatory call recording.",
          href: "/industry/financial-services/",
        },
      ]}
      faqs={faqs}
      schemaData={articleSchema}
    >
      {/* SECTION 1 */}
      <section id="core-architecture" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Server className="h-6 w-6 text-blue-600" />
          1. Core Architecture: How Cloud Telephony Operates
        </h2>
        <p>
          At its foundation, cloud telephony separates the <strong>telecom transport layer</strong> from the <strong>business application layer</strong>. In traditional enterprise telephony, an office purchased an Electronic Private Automatic Branch Exchange (EPABX) chassis, ran miles of Cat-3 or Cat-5 cabling to every desk, and leased physical Primary Rate Interface (PRI) lines containing 30 channels from a telecommunications provider.
        </p>
        <p>
          Cloud telephony virtualizes this entire stack. When a customer dials a company&apos;s virtual phone number, the call lifecycle follows a structured 4-stage pipeline:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Stage 1: PSTN Ingress</span>
            <h3 className="text-base font-semibold text-slate-900">Carrier Gateway Termination</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The caller&apos;s phone signal travels through their local telecom carrier (Airtel, Jio, Vi, BSNL) into authorized cloud telecom gateways hosted on enterprise carrier trunks (such as Tata Teleservices TTBS or Vodafone Idea Business).
            </p>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Stage 2: Logic Execution</span>
            <h3 className="text-base font-semibold text-slate-900">Virtual PBX & Routing Rules</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The cloud PBX evaluates business hours, caller ID history, team availability, and Interactive Voice Response (IVR) DTMF inputs. It checks real-time CRM webhooks to route VIP clients directly to their account managers.
            </p>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Stage 3: Agent Delivery</span>
            <h3 className="text-base font-semibold text-slate-900">WebRTC or PSTN Forwarding</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The platform connects the call to an agent via encrypted WebRTC audio in their web browser (DTLS-SRTP), a companion mobile dialer app, or by dialing the agent&apos;s personal mobile handset over cellular PSTN.
            </p>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Stage 4: Post-Call Lifecycle</span>
            <h3 className="text-base font-semibold text-slate-900">Telemetrics & Automation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Call recordings are compressed and stored securely, Call Detail Records (CDRs) are written to the database, agent dispositions are captured, and automated post-call WhatsApp confirmations or SMS alerts are triggered.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section id="cloud-vs-epabx" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          2. Cloud Telephony vs. Traditional On-Premise EPABX
        </h2>
        <p>
          Organizations evaluating their telecom stack frequently weigh the total cost of ownership (TCO), agility, and maintenance overhead between on-premise hardware switches and cloud architectures:
        </p>

        <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
          <Table>
            <TableCaption className="sr-only">Technical and commercial comparison table</TableCaption>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead scope="col" className="font-bold text-slate-900">Evaluation Dimension</TableHead>
                <TableHead scope="col" className="font-bold text-slate-900">Traditional On-Premise EPABX</TableHead>
                <TableHead scope="col" className="font-bold text-blue-700 bg-blue-50/50">Cloud Telephony Platform</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              <TableRow>
                <th scope="row" className="font-semibold text-slate-900">Capital Expenditure (CapEx)</th>
                <TableCell>High (₹1.5L – ₹10L+ for server chassis, PRI cards, desk phones, cabling)</TableCell>
                <TableCell className="bg-blue-50/30 text-blue-900 font-medium">Zero hardware cost; operational subscription model</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-semibold text-slate-900">Deployment Timeline</th>
                <TableCell>3 to 6 weeks for line laying, hardware delivery, and physical installation</TableCell>
                <TableCell className="bg-blue-50/30 text-blue-900 font-medium">24 to 48 hours following standard DoT KYC documentation</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-semibold text-slate-900">Remote & Work-From-Home</th>
                <TableCell>Requires complex VPNs, fixed static IPs, or IP-PBX port forwarding</TableCell>
                <TableCell className="bg-blue-50/30 text-blue-900 font-medium">Native browser WebRTC softphone or mobile SIM companion app</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-semibold text-slate-900">Scaling Team Capacity</th>
                <TableCell>Limited by physical PRI slots (typically in multiples of 30 lines)</TableCell>
                <TableCell className="bg-blue-50/30 text-blue-900 font-medium">Instantly add or remove seat licenses as hiring fluctuates</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-semibold text-slate-900">CRM & API Integration</th>
                <TableCell>Difficult; requires specialized CTI middleware and local serial ports</TableCell>
                <TableCell className="bg-blue-50/30 text-blue-900 font-medium">REST APIs, webhooks, and native CRM lead ingestion out of the box</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-semibold text-slate-900">Call Recording & Audits</th>
                <TableCell>Requires dedicated local hard drives; risk of hardware failure or data loss</TableCell>
                <TableCell className="bg-blue-50/30 text-blue-900 font-medium">Automated encrypted cloud storage with search and role-based permissions</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* SECTION 3 */}
      <section id="key-capabilities" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          3. Essential Platform Capabilities for Growing Businesses
        </h2>
        <p>
          A production-grade cloud telephony platform does far more than route audio. It serves as the primary communications operating system for revenue and support teams:
        </p>

        <div className="space-y-3 my-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Intelligent Multi-Level IVR (Interactive Voice Response)
            </h3>
            <p className="text-xs text-slate-600">
              Guide incoming callers through customized language trees (e.g., Press 1 for English, Press 2 for Hindi), route by department (Sales, Support, Accounts), or connect repeat customers directly to their assigned account manager based on incoming Caller Line Identification (CLI).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Two-Way Phone Number Masking
            </h3>
            <p className="text-xs text-slate-600">
              Crucial for real estate brokers, logistics couriers, and healthcare consultations. Agents and customers connect through a temporary virtual bridging number, preventing direct personal mobile number exposure and protecting company lead data from off-platform leakage.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Live Call Monitoring (Whisper, Barge-in & Snoop)
            </h3>
            <p className="text-xs text-slate-600">
              Floor managers and team supervisors can listen to live customer interactions silently for quality audits, whisper coaching instructions audible only to the agent, or barge into escalations to resolve disputes in real time.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Unified WhatsApp Business API Post-Call Automation
            </h3>
            <p className="text-xs text-slate-600">
              Connecting telephony with official WhatsApp Business Solution Provider (BSP) gateways allows teams to automatically dispatch brochures, payment links, appointment confirmations, or site location maps the moment a call concludes.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section id="indian-regulations" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-emerald-600" />
          4. Regulatory Framework: TRAI & DoT Compliance in India
        </h2>
        <p>
          Telecom operations in India are strictly governed by the Department of Telecommunications (DoT) and the Telecom Regulatory Authority of India (TRAI). Any business deploying cloud communications must understand three critical regulatory requirements:
        </p>

        <div className="space-y-4 my-6">
          <div className="border-l-4 border-blue-500 pl-4 py-1 space-y-1">
            <h3 className="text-sm font-bold text-slate-900">1. Prohibition of Toll Bypass</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under Indian telecom licensing regulations, voice traffic originating on the international Public Internet cannot terminate onto domestic Indian PSTN networks without traversing licensed international long-distance (ILD) gateways. Domestic cloud telephony platforms must process domestic calls within Indian sovereign telecom boundaries using licensed carrier interconnects (e.g., Tata Teleservices, Vodafone Idea).
            </p>
          </div>

          <div className="border-l-4 border-emerald-500 pl-4 py-1 space-y-1">
            <h3 className="text-sm font-bold text-slate-900">2. Mandatory Enterprise KYC Documentation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Virtual phone numbers (Direct Inward Dialing / DID) and outbound voice trunks cannot be issued anonymously or instantaneously without verification. Indian carriers require verified corporate KYC including the Certificate of Incorporation (MCA), Company PAN, GST Registration Certificate (GSTIN), Authorized Signatory identity proof, and registered office address proof.
            </p>
          </div>

          <div className="border-l-4 border-amber-500 pl-4 py-1 space-y-1">
            <h3 className="text-sm font-bold text-slate-900">3. TRAI DLT & Numbering Directives (140 vs. 160 Series)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under the Telecom Commercial Communications Customer Preference Regulations (TCCCPR 2018), promotional voice calls must originate from designated <code>140</code> prefix series and adhere strictly to National Customer Preference Register (NCPR/DND) scrubbing. Transactional and service communications (such as banking OTPs, flight alerts, and medical notifications) are transitioning to dedicated <code>1600</code> and <code>1601</code> prefixes to protect consumers against financial fraud.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Regulatory Disclaimer:</strong> The information provided above summarizes Indian telecommunications compliance policies for informational guidance. Organizations should review applicable DoT circulars and consult qualified telecom counsel for specific licensing determinations.
          </span>
        </div>
      </section>

      {/* SECTION 5 */}
      <section id="implementation-checklist" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          5. Implementation & Migration Checklist
        </h2>
        <p>
          Transitioning an organization from legacy phone systems to cloud telephony is straightforward when following an orderly milestone plan:
        </p>

        <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
          <li>
            <strong>Define Call Flow Logic:</strong> Map out inbound routing paths, including working hours, after-hours voicemails, department queues, and overflow fallback numbers.
          </li>
          <li>
            <strong>Prepare Statutory KYC Documents:</strong> Gather your Certificate of Incorporation, GST certificate, PAN card, and authorized signatory authorization letter for telecom operator onboarding.
          </li>
          <li>
            <strong>Select Virtual Phone Numbers:</strong> Choose regional STD landline DIDs (e.g., 080 for Bengaluru, 022 for Mumbai, 011 for Delhi-NCR) or a centralized 10-digit mobile virtual number based on customer demographics.
          </li>
          <li>
            <strong>Configure User Extensions & Softphones:</strong> Provision agent user profiles, configure browser WebRTC permissions, or equip mobile telecallers with companion Android apps.
          </li>
          <li>
            <strong>Integrate CRM & Webhook Endpoints:</strong> Connect your telephony platform to your lead capture forms, sales CRM, and WhatsApp messaging gateway for unified post-call workflows.
          </li>
          <li>
            <strong>Conduct Pilot Test Calls:</strong> Verify multi-level DTMF IVR audio quality, simulate simultaneous inbound call bursts, and validate call recording playback before full team cutover.
          </li>
        </ol>
      </section>
    </ArticleLayout>
  );
}
