import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { buildSaasDemoWhatsAppUrl } from "@/lib/config";

export const metadata = {
  title: "Lead Management Process Guide for Indian Sales Teams",
  description:
    "Step-by-step lead management process for Indian sales teams: webhook & CSV intake, role assignment, scoring, follow-ups, KYC document collection, and DPDP consent.",
  alternates: {
    canonical: "https://www.hanva.in/resources/lead-management-process-guide/",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.hanva.in/resources/lead-management-process-guide/",
    siteName: "Hanva Technologies",
    title: "Lead Management Process Guide for Indian Sales Teams",
    description:
      "Build a repeatable B2B and inside-sales pipeline: instant lead capture, clean routing, scoring, KYC intake, and DPDP Act 2023 consent readiness.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Lead Management Process Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Management Process Guide for Indian Sales Teams | Hanva Technologies",
    description:
      "Operational SOP covering webhook lead capture, bulk CSV routing, scoring, follow-up cadences, and KYC portals.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Lead Management Process Guide: From Capture to KYC & Closing",
  description:
    "Structured CRM workflow guide for Indian inside-sales and operations teams covering web/portal lead intake, role routing, scoring, follow-ups, and KYC collection.",
  author: {
    "@type": "Organization",
    name: "Hanva Engineering & Editorial Board",
    url: "https://www.hanva.in/company/about/",
  },
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    url: "https://www.hanva.in",
    logo: { "@type": "ImageObject", url: "https://www.hanva.in/icon.png" },
  },
  datePublished: "2026-11-26",
  dateModified: "2026-11-26",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.hanva.in/resources/lead-management-process-guide/",
  },
};

const faqs = [
  {
    question: "Why do Excel sheets break down once sales volume grows?",
    answer:
      "Spreadsheets cannot reliably prevent two callers from ringing the same prospect, lack role-restricted visibility (enabling unlogged exports), offer no real-time webhook intake from ads or portals, and cannot enforce timestamped callback queues or KYC links.",
  },
  {
    question: "How does lead capture and bulk assignment work in Hanva CRM?",
    answer:
      "Hanva CRM supports incoming lead webhooks (including real-estate portal integrations) as well as admin CSV bulk uploads and bulk lead assignment or transfers across team leaders and telecallers.",
  },
  {
    question: "How should sales teams handle KYC or onboarding documents safely?",
    answer:
      "Instead of receiving Aadhaar, PAN, or company registration files on personal employee chat threads, generate dedicated token-based KYC upload links reviewed inside an isolated KYC team portal.",
  },
  {
    question: "What does India's DPDP Act 2023 require on digital lead capture forms?",
    answer:
      "Section 5 and Section 6 of the Digital Personal Data Protection Act, 2023 establish that consent requests must follow a standalone, plain-language itemized consent notice specifying collected data items, processing purpose, and straightforward consent withdrawal options via clear affirmative action.",
  },
  {
    question: "How do we request pricing or evaluate Hanva CRM?",
    answer:
      "Contact us for pricing and a live walkthrough via WhatsApp (+91 8423711043) tailored to your team size and workflow roles.",
  },
];

export default function LeadManagementProcessGuidePage() {
  return (
    <ArticleLayout
      pillarBadge="Cluster A: Hanva CRM"
      pillarHref="/products/crm/"
      title="Lead Management Process Guide: From Webhook Capture to KYC Verification"
      subtitle="A structured standard operating procedure for growing Indian teams transitioning out of spreadsheets into auditable lead intake, assignment rules, scoring, follow-up discipline, and DPDP-aware consent."
      readTime="10 min read"
      publishDate="November 2026"
      whatsappRef="/resources/lead-management-process-guide/"
      customWhatsappUrl={buildSaasDemoWhatsAppUrl("crm")}
      ctaButtonLabel="Request a Hanva CRM Demo"
      ctaBannerTitle="Replace Spreadsheet Lead Leakage with Structured CRM Pipelines"
      ctaBannerDescription="Speak with Hanva on WhatsApp to review role-based lead assignment, KYC portals, C2C calling, and official WhatsApp integration. Contact us for pricing."
      relatedHeading="Related Lead & Sales Operations Guides"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "Lead Management Process Guide" },
      ]}
      executiveSummary="Most revenue teams lose more deals to slow intake and missed follow-ups than to lack of ad spend. A reliable lead management process separates six discrete stages—Capture & Consent Notice, Routing & Ownership, First-Contact Calling/Messaging, Lead Scoring & Qualification, Structured Callback Discipline, and Audited KYC/Handover—with strict role permissions at every step."
      tableOfContents={[
        { id: "six-stages", title: "1. The 6-Stage Operational Lead Lifecycle" },
        { id: "capture-consent", title: "2. Webhook Intake, CSV Imports & DPDP Consent Notice" },
        { id: "routing-scoring", title: "3. Bulk Assignment, Transfers & Lead Scoring" },
        { id: "followups-kyc", title: "4. Follow-Up Discipline & Tokenized KYC Vaults" },
        { id: "role-sop-matrix", title: "5. Team Role Responsibility Matrix & Hanva CRM Fit" },
      ]}
      schemaData={articleSchema}
      relatedProducts={[
        {
          title: "Hanva CRM",
          description: "End-to-end CRM with webhook/CSV intake, scoring, C2C calling, WABA hub & KYC portal.",
          href: "/products/crm/",
        },
        {
          title: "Telecalling CRM Guide",
          description: "Explore daily telecaller KPI benchmarks, dispositions & follow-up adherence.",
          href: "/resources/telecalling-crm-guide/",
        },
        {
          title: "Security & Trust Posture",
          description: "Review Hanva Technologies' corporate governance and data handling commitments.",
          href: "/company/security-and-trust/",
        },
      ]}
      faqs={faqs}
    >
      <section id="six-stages" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">1. The 6-Stage Operational Lead Lifecycle</h2>
        <p>
          Whether you sell SaaS subscriptions, property units, coaching programs, or commercial services in India, unstructured inbox sharing guarantees double calling on hot prospects and zero follow-up on warm callbacks. Defining clear state transitions keeps marketing investment accountable:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700">
          <li><strong>Capture &amp; Notice:</strong> Aggregate enquiries immediately from landing pages, Google Ads lead forms, and portal webhooks without manual daily CSV downloading.</li>
          <li><strong>Assignment &amp; Ownership:</strong> Assign every record explicitly to a named telecaller or territory leader so accountability never drops between shifts.</li>
          <li><strong>First Response &amp; Qualification:</strong> Initiate prompt outreach via C2C voice calling or opt-in WhatsApp utility/response workflows and apply mandatory call disposition codes.</li>
          <li><strong>Scoring &amp; Prioritization:</strong> Rank leads using objective attributes (budget alignment, location, response engagement, callback readiness).</li>
          <li><strong>Callback &amp; Nurture Cadence:</strong> Schedule explicit date-and-time reminders instead of generic &ldquo;follow up next week&rdquo; notes.</li>
          <li><strong>KYC &amp; Operations Handover:</strong> Route qualified prospects cleanly to verification or onboarding staff without exposing full customer databases across teams.</li>
        </ol>
      </section>

      <section id="capture-consent" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">2. Webhook Intake, CSV Imports &amp; DPDP Consent Notice</h2>
        <h3 className="text-lg font-semibold text-slate-900">Automating Digital &amp; Portal Channels</h3>
        <p>
          Real-estate portals, digital ad landing forms, and website demo requests lose velocity whenever staff download CSV sheets once per evening. Webhook endpoints ingest lead payloads straight into CRM intake tables seconds after submission, alongside supervised CSV bulk upload workflows for field events and trade shows.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Digital Personal Data Protection (DPDP) Act 2023 Alignment</h3>
        <p>
          Under India&apos;s DPDP Act, 2023 and MeitY framework principles, organizations acting as Data Fiduciaries should accompany personal data collection with a clear, standalone, plain-language itemized consent notice stating what contact details are gathered, why they are processed, and how an individual can withdraw consent as easily as it was given. Avoid pre-ticked checkboxes or bundling unrelated promotional blasts into inquiry forms. Similarly, outbound messaging via official WABA templates must follow{" "}
          <Link href="/resources/whatsapp-business-api-guide/" className="text-blue-600 font-semibold hover:underline">
            Meta&apos;s WhatsApp Business opt-in rules
          </Link>
          .
        </p>
      </section>

      <section id="routing-scoring" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">3. Bulk Assignment, Transfers &amp; Lead Scoring</h2>
        <p>
          Equal lead volume does not mean equal lead quality or fair workload distribution:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Bulk Assignment &amp; Reallocation:</strong> Team leaders should rebalance open queues in seconds when an agent goes on leave, avoiding cold prospects sitting stale in an absent caller&apos;s inbox.</li>
          <li><strong>Objective Lead Scoring:</strong> Maintain structured scoring logic alongside searchable Master Data and descending newest-first lead sorting so fresh web enquiries surface first each morning.</li>
          <li><strong>Separate Operational Views:</strong> Administrators, team leaders, telecallers, and verification specialists require role-scoped portals rather than full database export privileges for every junior seat.</li>
        </ul>
      </section>

      <section id="followups-kyc" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">4. Follow-Up Discipline &amp; Tokenized KYC Vaults</h2>
        <p>
          For sectors requiring identity, GST, or eligibility verification—such as real estate bookings, lending desks, B2B vendor onboarding, or enterprise subscriptions—letting prospects send KYC photos directly to sales reps&apos; personal phones introduces compliance risk and lost attachments.
        </p>
        <p>
          Tokenized upload links (such as Hanva CRM&apos;s dedicated <code>kyc-upload</code> flow routed to a dedicated <strong>KYC Team portal</strong>) keep document verification separate from telecalling pipelines while recording approval history centrally. Combined with disciplined daily KPI reviews detailed in our{" "}
          <Link href="/resources/telecalling-crm-guide/" className="text-blue-600 font-semibold hover:underline">
            Telecalling CRM operational playbook
          </Link>
          , teams keep conversion bottlenecks visible without invasive micromanagement.
        </p>
      </section>

      <section id="role-sop-matrix" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">5. Team Role Responsibility Matrix &amp; Hanva CRM Fit</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <th className="p-3.5 font-bold">CRM Role</th>
                <th className="p-3.5 font-bold">Primary SOP Focus</th>
                <th className="p-3.5 font-bold">Verified Hanva CRM Capabilities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Admin / Operations Head</td>
                <td className="p-3.5">Intake hygiene, governance &amp; channel controls</td>
                <td className="p-3.5">CSV bulk upload, webhook intake, bulk assign/transfer, Fonada WABA hub, C2C/IVR reports</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Team Leader</td>
                <td className="p-3.5">Queue balance &amp; callback coaching</td>
                <td className="p-3.5">Lead reassignment, scoring visibility, HTML5 call recording reviews, team targets</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Telecaller / Sales Rep</td>
                <td className="p-3.5">Prompt outreach &amp; disposition logging</td>
                <td className="p-3.5">Assigned calling queue, carrier C2C calls, follow-up schedule, notes &amp; mobile attendance</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">KYC Verification Desk</td>
                <td className="p-3.5">Document validation &amp; handover security</td>
                <td className="p-3.5">Isolated KYC team portal &amp; tokenized prospect document upload links</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600">
          <strong>Honest Scope Clarification:</strong> Built-in automated bulk email/SMS newsletter dispatches and SaaS subscription billing are not active modules in Hanva CRM—teams configure Fonada WABA templates alongside external ESP/DLT pipelines where required. Explore{" "}
          <Link href="/products/crm/" className="text-blue-600 font-semibold hover:underline">
            Hanva CRM features
          </Link>{" "}
          and contact us for pricing.
        </p>
      </section>
    </ArticleLayout>
  );
}
