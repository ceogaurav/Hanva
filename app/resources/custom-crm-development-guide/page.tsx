import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { buildServiceWhatsAppUrl } from "@/lib/config";

export const metadata = {
  title: "Custom CRM Development Guide: Scoping & Architecture",
  description:
    "How bespoke CRM & ERP platforms are scoped and engineered: custom entities, multi-department approvals, RBAC boundaries, telephony/API bridges & migration.",
  alternates: {
    canonical: "https://www.hanva.in/resources/custom-crm-development-guide/",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.hanva.in/resources/custom-crm-development-guide/",
    siteName: "Hanva Technologies",
    title: "Custom CRM Development Guide: Scoping, Architecture & Rollout",
    description:
      "Architecture playbook for enterprises building bespoke CRM or ERP systems: data modeling, permission tiers, integrations, and clean separation from SaaS.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Custom CRM Development Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom CRM Development Guide: Scoping & Architecture | Hanva Technologies",
    description:
      "Bespoke CRM/ERP architecture lifecycle from workflow discovery through RBAC modeling, APIs & data migration.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Custom CRM & ERP Development Guide: Architecture, Permissions & Rollout",
  description:
    "Engineering scoping guide explaining how enterprises design custom CRM/ERP software cleanly when ready-made SaaS templates fall short.",
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
    "@id": "https://www.hanva.in/resources/custom-crm-development-guide/",
  },
};

const faqs = [
  {
    question: "How is custom CRM development different from buying Hanva CRM?",
    answer:
      "Hanva CRM (/products/crm/) is our ready-to-deploy multi-role SaaS product built for inside sales, telecalling, IVR campaigns, and KYC workflows. Custom CRM & ERP Development (/software-development/custom-crm-development/) is bespoke software engineered around your organization's unique entity relationships, dealer hierarchies, ERP rules, and legacy bridges.",
  },
  {
    question: "What signals show a company genuinely needs bespoke CRM/ERP software instead of SaaS?",
    answer:
      "Custom software is typically warranted when non-negotiable commercial workflows—such as distributor credit-limit holds, multi-department quote approval matrices, batch lot traceability, or proprietary ERP accounting hooks—cannot fit cleanly inside SaaS customization caps without brittle workarounds.",
  },
  {
    question: "Should we start with an exhaustive 40-module specification on Day 1?",
    answer:
      "No. Defining an MVP Phase 1 covering the highest-friction core pipeline, role boundaries, and integration contracts allows stakeholder UAT validation earlier while preventing scope bloat across secondary nice-to-haves.",
  },
  {
    question: "What determines bespoke CRM project investment?",
    answer:
      "Total effort scales directly with module complexity, custom roles/permissions, legacy data cleanup, third-party API integrations, and post-launch support scope. Contact us for pricing after a technical discovery session.",
  },
];

export default function CustomCrmDevelopmentGuidePage() {
  const whatsappUrl = buildServiceWhatsAppUrl(
    "Hello Hanva Team, I would like to enquire about Custom CRM and ERP Development services."
  );

  return (
    <ArticleLayout
      pillarBadge="Cluster E: Software Development"
      pillarHref="/software-development/custom-crm-development/"
      title="Custom CRM &amp; ERP Development Guide: Scoping, Modeling &amp; Rollout"
      subtitle="An engineering blueprint for technical buyers designing bespoke CRM/ERP portals—covering domain modeling, territory permissions, API bridges, migration hygiene, and staged QA."
      readTime="11 min read"
      publishDate="November 2026"
      whatsappRef="/resources/custom-crm-development-guide/"
      customWhatsappUrl={whatsappUrl}
      ctaButtonLabel="Discuss Custom CRM/ERP Scoping"
      ctaBannerTitle="Planning a Bespoke CRM, Dealer Portal, or ERP Build?"
      ctaBannerDescription="Chat with Hanva on WhatsApp to scope entities, permissions, integrations, and milestones—or evaluate whether Hanva CRM SaaS gets you live faster. Contact us for pricing."
      relatedHeading="Related Software Engineering Guides"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "Custom CRM Development Guide" },
      ]}
      executiveSummary="Bespoke CRM and ERP projects go off track when discovery skips operational edge cases—allowing ambiguous Excel approvals, undocumented dealer credit rules, or fragile third-party API assumptions to surface mid-build. Clear separation between ready-made SaaS suitability, core domain data modeling, role-scoped security, and milestone QA protects timelines and engineering budgets."
      tableOfContents={[
        { id: "verify-saas-first", title: "1. First Gate: Confirm Whether Ready-Made SaaS Suffices" },
        { id: "domain-modeling", title: "2. Domain Entity Modeling & Approval Workflows" },
        { id: "rbac-integrations", title: "3. Role-Based Access, Telephony & ERP API Bridges" },
        { id: "migration-qa", title: "4. Legacy Data Migration & Staged Rollout" },
        { id: "delivery-phases", title: "5. Four-Stage Engineering Blueprint & Hanva Fit" },
      ]}
      schemaData={articleSchema}
      relatedProducts={[
        {
          title: "Custom CRM & ERP Development",
          description: "Bespoke internal software engineered around your business rules and permissions.",
          href: "/software-development/custom-crm-development/",
        },
        {
          title: "SaaS vs Custom CRM & ERP Guide",
          description: "Compare upfront buy-vs-build ownership, timelines & TCO objectively.",
          href: "/resources/saas-vs-custom-crm-erp-guide/",
        },
        {
          title: "Software Development Cost Factors",
          description: "Understand what drives bespoke engineering effort before scoping a quote.",
          href: "/resources/software-development-cost-factors/",
        },
      ]}
      faqs={faqs}
    >
      <section id="verify-saas-first" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">1. First Gate: Confirm Whether Ready-Made SaaS Suffices</h2>
        <p>
          Engineering discipline starts by refusing to write unnecessary bespoke code. If your primary requirement is structured lead intake, telecalling queues, built-in IVR campaigns, KYC document collection, and WhatsApp follow-ups, deploying an established platform like{" "}
          <Link href="/products/crm/" className="text-blue-600 font-semibold hover:underline">
            Hanva CRM
          </Link>{" "}
          delivers value dramatically faster than maintaining custom software. Review full tradeoffs in our{" "}
          <Link href="/resources/saas-vs-custom-crm-erp-guide/" className="text-blue-600 font-semibold hover:underline">
            SaaS vs Custom CRM &amp; ERP decision guide
          </Link>
          .
        </p>
        <p>
          Custom CRM/ERP engineering makes decisive sense only when core revenue depends on proprietary logic SaaS cannot mirror cleanly—such as dealer-tier credit gating, raw-to-finished manufacturing workflows, custom regulatory audit trails, or deep ERP synchronization.
        </p>
      </section>

      <section id="domain-modeling" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">2. Domain Entity Modeling &amp; Approval Workflows</h2>
        <p>
          Standard CRMs assume a linear <em>Lead -&gt; Deal -&gt; Won</em> pipeline. Real Indian mid-market operations frequently involve interconnected domain objects that generic plug-ins struggle to enforce:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Hierarchical Accounts &amp; Dealers:</strong> Distributorships involving parent-child pricing tiers, sales regions, credit exposure flags, and external dealer portal logins.</li>
          <li><strong>Multi-Department State Gates:</strong> Quotes exceeding margin thresholds routing sequentially from Regional Manager -&gt; Finance Controller -&gt; Dispatch Desk with timestamped audit logs before generating production orders.</li>
          <li><strong>Mixed Operational Extensions:</strong> Binding quotation revisions, inventory allocations, milestone billing reminders, and customer service tickets onto unified customer accounts.</li>
        </ul>
      </section>

      <section id="rbac-integrations" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">3. Role-Based Access, Telephony &amp; ERP API Bridges</h2>
        <h3 className="text-lg font-semibold text-slate-900">Territory &amp; Row-Level Permissions</h3>
        <p>
          Enterprise systems require explicit Access Control Lists (RBAC) restricting visibility strictly by department, branch, or territory—not merely hiding frontend buttons while leaving backend endpoints open. Export controls, masked phone records, and approval roles belong at the database and API authorization layer.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Webhook &amp; System Integrations</h3>
        <p>
          Bespoke CRM/ERP builds typically bridge external sources via clean contracts: carrier voice/IVR logs, Meta WhatsApp Cloud APIs, accounting software ledgers, payment confirmations, or custom-scoped AI extraction pipelines engineered via{" "}
          <Link href="/software-development/api-integration-automation/" className="text-blue-600 font-semibold hover:underline">
            API Integration &amp; Automation workflows
          </Link>{" "}
          with signature verification and retry queues.
        </p>
      </section>

      <section id="migration-qa" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">4. Legacy Data Migration &amp; Staged Rollout</h2>
        <p>
          Most custom software delays happen outside code writing—during messy CSV consolidation across five regional Excel workbooks containing duplicate customer phone formats, orphaned IDs, and inconsistent state names. A disciplined migration plan builds repeatable normalization scripts, runs dry-run imports into staging environments for finance and operations UAT sign-off, and transitions departments in clean milestones rather than chaotic weekend cutovers.
        </p>
        <p>
          For how scope complexity and integration depth shape engineering investment, read our{" "}
          <Link href="/resources/software-development-cost-factors/" className="text-blue-600 font-semibold hover:underline">
            Software Development Cost Factors breakdown
          </Link>
          .
        </p>
      </section>

      <section id="delivery-phases" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">5. Four-Stage Engineering Blueprint at Hanva Technologies</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <th className="p-3.5 font-bold">Stage</th>
                <th className="p-3.5 font-bold">Engineering Focus &amp; Deliverable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">01. Discovery</td>
                <td className="p-3.5">Document current spreadsheets, manual bottlenecks, edge rules &amp; role hierarchies</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">02. Architecture</td>
                <td className="p-3.5">Relational schema design, RBAC matrix, UI wireframes &amp; external API contracts</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">03. Iterative Build &amp; QA</td>
                <td className="p-3.5">Milestone deliveries with TypeScript validation, staging walkthroughs &amp; edge-case tests</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">04. Deployment &amp; AMC</td>
                <td className="p-3.5">Verified baseline data import, admin/staff onboarding &amp; scoped ongoing support</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-700">
          Review service scope details on{" "}
          <Link href="/software-development/custom-crm-development/" className="text-blue-600 font-semibold hover:underline">
            Hanva Custom CRM &amp; ERP Development
          </Link>{" "}
          and contact us for pricing tailored to your blueprint.
        </p>
      </section>
    </ArticleLayout>
  );
}
