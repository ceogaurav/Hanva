import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { buildSaasDemoWhatsAppUrl } from "@/lib/config";

export const metadata = {
  title: "CRM Implementation Checklist: Complete Setup & Rollout Guide",
  description:
    "A practical, phase-by-phase CRM implementation checklist for Indian SMBs: data sanitization, custom pipeline stages, C2C telephony integration, role security, and team adoption.",
  alternates: {
    canonical: "https://www.hanva.in/resources/crm-implementation-checklist/",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.hanva.in/resources/crm-implementation-checklist/",
    siteName: "Hanva Technologies",
    title: "CRM Implementation Checklist: Complete Setup & Rollout Guide | Hanva",
    description:
      "A step-by-step rollout framework covering data hygiene, pipeline design, cloud telephony integration, agent permissions, and post-launch auditing.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "CRM Implementation Checklist" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CRM Implementation Checklist: Complete Setup & Rollout Guide",
  description:
    "Comprehensive phase-by-phase framework for rolling out sales and telecalling CRM software without business disruption or data loss.",
  author: {
    "@type": "Organization",
    name: "Hanva Product Engineering & Editorial Board",
    url: "https://www.hanva.in",
  },
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    logo: { "@type": "ImageObject", url: "https://www.hanva.in/logo.png" },
  },
  datePublished: "2026-11-27",
  dateModified: "2026-11-27",
  mainEntityOfPage: "https://www.hanva.in/resources/crm-implementation-checklist/",
};

const faqs = [
  {
    question: "How long does a typical SMB CRM implementation take?",
    answer:
      "A streamlined CRM rollout for a team of 5 to 50 users typically takes between 3 to 10 working days. This includes CSV lead cleansing, pipeline mapping, C2C telephony configuration, and telecaller training.",
  },
  {
    question: "What is the biggest cause of CRM implementation failure in Indian sales teams?",
    answer:
      "The primary failure mode is lack of agent adoption caused by overly complex interfaces, double-entry fatigue (updating both Excel and CRM), and inadequate telephony integration where calls must still be dialed manually.",
  },
  {
    question: "How does Hanva CRM simplify the migration from Excel spreadsheets?",
    answer:
      "Hanva CRM provides bulk CSV import templates with field-mapping wizards, automated lead deduplication on 10-digit phone numbers, and built-in C2C calling so agents transition from spreadsheets immediately on Day 1.",
  },
  {
    question: "How can we request a guided implementation walkthrough for Hanva CRM?",
    answer:
      "Contact us for pricing and a personalized deployment plan on WhatsApp (+91 8423711043).",
  },
];

export default function CrmImplementationChecklistPage() {
  return (
    <ArticleLayout
      pillarBadge="CRM Implementation Guide"
      pillarHref="/products/crm/"
      title="CRM Implementation Checklist: Complete Setup & Rollout Guide"
      subtitle="A practical, milestone-driven rollout plan for business owners and sales leaders transitioning from chaotic spreadsheets to a disciplined sales and telecalling CRM."
      readTime="12 min read"
      publishDate="November 2026"
      whatsappRef="/resources/crm-implementation-checklist/"
      customWhatsappUrl={buildSaasDemoWhatsAppUrl("crm")}
      ctaButtonLabel="Request Hanva CRM Demo & Onboarding Plan"
      ctaBannerTitle="Ready to Roll Out Hanva CRM Across Your Sales Team?"
      ctaBannerDescription="Contact us for pricing and a guided implementation walkthrough tailored to your lead volume, sales stages, and telephony calling workflow."
      relatedHeading="Related CRM & Telephony Solutions"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "CRM Implementation Checklist" },
      ]}
      executiveSummary="Over 60% of CRM implementations stumble not because of software deficiencies, but because of poor data migration, poorly defined pipeline stages, and friction in agent daily routines. This operational checklist provides sales managers with an actionable, 5-phase blueprint to audit data, configure role permissions, integrate carrier-grade cloud calling, and secure 100% telecaller adoption."
      tableOfContents={[
        { id: "phase-1-audit", title: "1. Phase 1: Pre-Implementation Audit & Lead Cleansing" },
        { id: "phase-2-pipeline", title: "2. Phase 2: Sales Pipeline & Custom Field Architecture" },
        { id: "phase-3-telephony", title: "3. Phase 3: Telephony (C2C & IVR) & WhatsApp Configuration" },
        { id: "phase-4-security", title: "4. Phase 4: Role-Based Security & Lead Vault Access" },
        { id: "phase-5-rollout", title: "5. Phase 5: Team Training, Shadowing & Post-Launch Audits" },
      ]}
      schemaData={articleSchema}
      relatedProducts={[
        {
          title: "Hanva CRM",
          description: "Flagship sales, calling, and WhatsApp CRM platform with role-based pipelines and built-in IVR.",
          href: "/products/crm/",
        },
        {
          title: "Telecalling CRM",
          description: "Voice-first outbound dialer console for high-velocity telesales and call center operations.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "Custom CRM Development",
          description: "Bespoke engineering for enterprises requiring proprietary ERP workflows and complex data models.",
          href: "/software-development/custom-crm-development/",
        },
      ]}
      relatedIndustries={[
        {
          title: "Telecalling & BPO Solutions",
          description: "High-velocity calling, agent disposition tracking, and call recording audits for call centers.",
          href: "/industry/telecalling-and-bpo/",
        },
        {
          title: "Real Estate Telephony & CRM",
          description: "Portal lead ingestion, virtual number masking, and automated WhatsApp floor plan delivery.",
          href: "/industry/real-estate/",
        },
      ]}
      faqs={faqs}
    >
      <section id="phase-1-audit" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          1. Phase 1: Pre-Implementation Audit &amp; Lead Cleansing
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Migrating contaminated or duplicated data into a brand-new CRM poisons your team&apos;s trust in the new system from Day 1. Before loading any contact records, execute a rigorous audit of your existing data sources (Google Sheets, Excel workbooks, property portals, website forms, and email exports).
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
          <div className="text-sm font-bold text-slate-900">Pre-Import Checklist:</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">✓</span>
              <span><strong>Phone Number Normalization:</strong> Standardize all phone numbers to clean 10-digit Indian formats (or +91 E.164 format) and strip out dashes, spaces, and accidental leading zeros.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">✓</span>
              <span><strong>Duplicate Identification:</strong> Deduplicate records matching on primary phone number or primary email address to prevent duplicate leads assigned to competing reps.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">✓</span>
              <span><strong>Lead Status Mapping:</strong> Archive cold leads older than 180 days with zero historical engagement. Load only active prospects and hot pipelines into live agent queues.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">✓</span>
              <span><strong>Source Attribution Tagging:</strong> Ensure every record has a clear source tag (e.g., Meta Ads, Google Search, MagicBricks, Referral, Cold Outbound) to preserve marketing ROI tracking.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="phase-2-pipeline" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          2. Phase 2: Sales Pipeline &amp; Custom Field Architecture
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          A common mistake is copying another company&apos;s pipeline or cluttering deals with 30 mandatory fields. A healthy CRM pipeline represents distinct, verifiable customer actions rather than vague rep opinions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 p-4 space-y-2 bg-white">
            <div className="text-sm font-bold text-slate-900">Recommended Core Stages:</div>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li><strong>1. Fresh / Unassigned:</strong> Ingested leads awaiting review or auto-dialing.</li>
              <li><strong>2. Contact Attempted:</strong> Ringing / callback scheduled / WhatsApp sent.</li>
              <li><strong>3. Qualified &amp; Requirement Mapped:</strong> Budget and timeline confirmed.</li>
              <li><strong>4. Demo / Meeting Conducted:</strong> Presentation delivered with decision-maker.</li>
              <li><strong>5. Proposal / KYC Submitted:</strong> Commercial proposal shared or documents pending.</li>
              <li><strong>6. Won / Lost (Closed):</strong> Payment received or reason-coded exit.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 space-y-2 bg-white">
            <div className="text-sm font-bold text-slate-900">Custom Field Best Practices:</div>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li>Keep mandatory fields during initial call logging under 4 items (Name, City, Budget, Outcome).</li>
              <li>Use dropdown selectors instead of open text fields for standard parameters (Product Type, Lead Source).</li>
              <li>Store sensitive customer documents (Aadhaar, PAN, GST) inside the dedicated KYC document vault, not generic note fields.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="phase-3-telephony" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          3. Phase 3: Telephony (C2C &amp; IVR) &amp; WhatsApp Configuration
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Hanva CRM unites your sales pipeline directly with cloud telephony. Setting up carrier integrations correctly guarantees clear audio quality, call recording capture, and regulatory compliance.
        </p>
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 space-y-3">
          <div className="text-sm font-bold text-blue-900">Telephony &amp; Voice Checklist:</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li><strong>Carrier Connection:</strong> Configure API credentials for CloudConnect, Ozonetel, or Fonada within the admin console.</li>
            <li><strong>Wallet Funding:</strong> Ensure telephony wallet balance is topped up to avoid call drops during peak sales campaigns.</li>
            <li><strong>DID Assignment:</strong> Allocate virtual caller IDs (DIDs) by department or campaign to preserve recognized local caller presence.</li>
            <li><strong>TRAI DLT Registration:</strong> Verify entity registration, SMS header IDs, and approved content templates under Telecom Regulatory Authority of India (TRAI) guidelines.</li>
            <li><strong>WhatsApp Business API:</strong> Connect approved Fonada WABA templates for instant post-call follow-ups and brochure sharing.</li>
          </ul>
        </div>
      </section>

      <section id="phase-4-security" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          4. Phase 4: Role-Based Security &amp; Lead Vault Access
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Customer data is a company&apos;s primary commercial asset. Unrestricted spreadsheet exports leave businesses vulnerable to rogue reps downloading databases when changing employers.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
          <div className="text-sm font-bold text-slate-900">Role-Based Permission Matrix:</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li><strong>Super Admin:</strong> Full configuration, DID registry, telephony wallet top-ups, global CSV exports, user provisioning.</li>
            <li><strong>Team Leader:</strong> Campaign queue management, lead reallocation, live call recording playback, agent attendance scorecards.</li>
            <li><strong>Telecaller:</strong> 1-click dialer view of assigned queue only, disposition logging, notes, follow-up scheduling (zero export permissions).</li>
            <li><strong>KYC Officer:</strong> Access to customer document verification vault without visibility into unrelated sales pipelines.</li>
          </ul>
        </div>
      </section>

      <section id="phase-5-rollout" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          5. Phase 5: Team Training, Shadowing &amp; Post-Launch Audits
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Go-live is not the finish line; it is the start of behavioral coaching. Dedicate Day 1 and Day 2 to live shadowing and rapid troubleshooting.
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3">
          <div className="text-sm font-bold text-slate-900">Post-Launch Audit Cadence:</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li><strong>End of Day 1:</strong> Verify all outbound calls logged correctly with audio recordings playable in the browser.</li>
            <li><strong>End of Day 3:</strong> Review agent disposition adherence: ensure zero leads remain in an ambiguous &quot;Fresh&quot; state without an outcome tag.</li>
            <li><strong>End of Week 1:</strong> Audit telecaller talk-time metrics, review objection handling, and reward top-adopting representatives.</li>
          </ul>
        </div>
      </section>
    </ArticleLayout>
  );
}
