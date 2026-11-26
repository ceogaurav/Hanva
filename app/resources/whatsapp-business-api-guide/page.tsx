import * as React from "react";
import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { Table, TableBody, TableCell,
  TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ShieldCheck, CheckCircle2, Zap, ArrowRight, Layers, AlertCircle, PhoneForwarded } from "lucide-react";

export const metadata = {
  title: "WhatsApp Business API vs Business App Guide (India)",
  description:
    "Compare the free WhatsApp Business App with the official WhatsApp Business API (WABA). Learn Meta template categories, 24-hour messaging windows, and CRM sync.",
  alternates: {
    canonical: "https://www.hanva.in/resources/whatsapp-business-api-guide/",
  },
  openGraph: {
    title: "WhatsApp Business API vs Business App Guide (India)",
    description:
      "The definitive guide to official Meta WABA gateways: green badge verification, 24-hour service messaging windows, pre-approved utility templates, and multi-agent shared inboxes.",
    url: "https://www.hanva.in/resources/whatsapp-business-api-guide/",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Business API vs Business App Guide (India) | Hanva Technologies",
    description: "Compare the free WhatsApp Business App with the official WhatsApp Business API (WABA). Learn Meta template categories, 24-hour messaging windows, and CRM sync.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "WhatsApp Business API vs. Business App: Architecture, Pricing & CRM Sync",
  description:
    "A comprehensive comparison between the free WhatsApp Business App and the enterprise WhatsApp Business API (Cloud API) for sales and support operations in India.",
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
    "@id": "https://www.hanva.in/resources/whatsapp-business-api-guide/",
  },
};

const faqs = [
  {
    question: "What is the key difference between the WhatsApp Business App and WhatsApp Business API?",
    answer:
      "The WhatsApp Business App is a free smartphone application suited for micro-businesses, limited to 1 primary phone and up to 4 linked web devices. It lacks automated CRM integrations, cannot handle multi-agent simultaneous routing, and risks account bans if used for bulk broadcasting. The WhatsApp Business Platform (API) is designed for growing enterprises, supporting unlimited concurrent human agents, multi-agent shared inboxes, CRM webhooks, chatbot automation, and official Meta template approvals.",
  },
  {
    question: "What are the 4 Meta WhatsApp conversation pricing categories?",
    answer:
      "Meta categorizes WhatsApp Business Platform conversations into: 1. Marketing (promotions, offers, product launches), 2. Utility (transaction receipts, order updates, appointment reminders), 3. Authentication (one-time passcodes, login verification), and 4. Service (customer-initiated inquiries resolved within a 24-hour window). Each category follows distinct per-conversation tariffs set by Meta.",
  },
  {
    question: "What is the 24-Hour Customer Service Window?",
    answer:
      "When a customer sends a message to your business phone number, Meta opens a 24-hour customer service window. During these 24 hours, your agents or automated bots can reply with freeform text, media, documents, and interactive buttons without requiring pre-approved templates. Once the 24 hours expire, businesses must use pre-approved Meta message templates to initiate further communication.",
  },
  {
    question: "How does post-call WhatsApp automation work with cloud telephony?",
    answer:
      "When a telecaller completes a phone call and tags the disposition as 'Interested - Brochure Requested', the CRM automatically fires an event webhook to the WhatsApp Business API. The API instantly sends a pre-approved utility template containing the PDF property brochure, price sheet, or booking link directly to the prospect's WhatsApp within seconds.",
  },
  {
    question: "How does a company get the Official Green Badge (Verified Business)?",
    answer:
      "The green checkmark badge signifies an Official Business Account (OBA) verified by Meta. Prerequisites include completing Meta Business Manager verification, maintaining an active 2-factor authenticated account, having a high Tier-2 or Tier-3 messaging volume, and demonstrating public organic brand notability in independent news publications.",
  },
];

export default function WhatsappBusinessApiGuidePage() {
  return (
    <ArticleLayout
      pillarBadge="Pillar D: WhatsApp Business API"
      pillarHref="/resources/"
      title="WhatsApp Business API vs. Business App: Architecture, Pricing & CRM Sync"
      subtitle="From multi-agent shared inboxes to Meta 24-hour messaging windows, template categorization, and automated post-call brochure triggers for sales teams."
      readTime="10 min read"
      publishDate="November 25, 2026"
      reviewDate="November 2026"
      editorialAttribution="Hanva Engineering & Editorial Board"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "WhatsApp Business API Guide" },
      ]}
      whatsappRef="/resources/whatsapp-business-api-guide/"
      executiveSummary="While the free WhatsApp Business App serves micro-businesses with single-device limitations, growing commercial enterprises require the official WhatsApp Business Platform (API). Operating through authorized Business Solution Providers (BSPs) such as Fonada, the Cloud API enables multi-agent shared customer inboxes, programmatic CRM webhooks, pre-approved template broadcasts, and immediate automated post-call document delivery."
      tableOfContents={[
        { id: "app-vs-api", title: "1. Feature Comparison: App vs. API" },
        { id: "meta-categories", title: "2. The 4 Meta Conversation Categories" },
        { id: "24-hour-window", title: "3. The 24-Hour Customer Service Window" },
        { id: "post-call-workflows", title: "4. Telephony + WhatsApp Post-Call Automation" },
        { id: "bsp-architecture", title: "5. Business Solution Providers (BSPs) & Meta Verification" },
        { id: "faqs", title: "6. Frequently Asked Questions" },
      ]}
      relatedProducts={[
        {
          title: "WhatsApp CRM",
          description: "Official Meta WABA integration, pre-approved templates, and post-call automation.",
          href: "/products/whatsapp-crm/",
        },
        {
          title: "Telecalling CRM",
          description: "Native lead management, 2-click dispositions, and automatic call recording sync.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "Sales Automation",
          description: "Multi-channel lead routing, instant WhatsApp triggers, and conversion tracking.",
          href: "/solutions/sales-automation/",
        },
      ]}
      relatedIndustries={[
        {
          title: "Real Estate",
          description: "Automated brochure drops, site visit confirmations, and floor plan dispatch.",
          href: "/industry/real-estate/",
        },
        {
          title: "Automobile Dealerships",
          description: "Test drive booking links, quotation PDFs, and service appointment reminders.",
          href: "/industry/automobile/",
        },
        {
          title: "Healthcare",
          description: "Lab test report delivery, appointment scheduling reminders, and OPD directions.",
          href: "/industry/healthcare/",
        },
      ]}
      faqs={faqs}
      schemaData={articleSchema}
    >
      {/* SECTION 1 */}
      <section id="app-vs-api" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-emerald-600" />
          1. Structural Comparison: WhatsApp Business App vs. Cloud API
        </h2>
        <p>
          Many companies attempt to run sales and customer support over standard smartphones using the free WhatsApp Business app. While convenient initially, team expansion quickly creates major operational roadblocks:
        </p>

        <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
          <Table>
            <TableCaption className="sr-only">Technical and commercial comparison table</TableCaption>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead scope="col" className="font-bold text-slate-900">Capability</TableHead>
                <TableHead scope="col" className="font-bold text-slate-900">Free WhatsApp Business App</TableHead>
                <TableHead scope="col" className="font-bold text-emerald-700 bg-emerald-50/30">WhatsApp Business Platform (API)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              <TableRow>
                <th scope="row" className="font-semibold text-slate-900">Concurrent Agents</th>
                <TableCell>Maximum 4 linked web devices; 1 smartphone</TableCell>
                <TableCell className="bg-emerald-50/30 font-medium text-emerald-950">Unlimited concurrent human agents with shared inbox</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-semibold text-slate-900">CRM & Telephony Sync</th>
                <TableCell>Zero API connectivity; manual copy-pasting</TableCell>
                <TableCell className="bg-emerald-50/30 font-medium text-emerald-950">Bidirectional REST webhooks and native CRM sync</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-semibold text-slate-900">Automated Post-Call Triggers</th>
                <TableCell>Not possible; agent must type message manually</TableCell>
                <TableCell className="bg-emerald-50/30 font-medium text-emerald-950">Fires automatically upon call disposition selection</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-semibold text-slate-900">Broadcasting Safety</th>
                <TableCell>High risk of immediate number ban on bulk outreach</TableCell>
                <TableCell className="bg-emerald-50/30 font-medium text-emerald-950">Policy-aligned via pre-approved Meta templates</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-semibold text-slate-900">Green Tick Verification</th>
                <TableCell>Not available for free app accounts</TableCell>
                <TableCell className="bg-emerald-50/30 font-medium text-emerald-950">Eligible for Official Business Account (OBA) badge</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* SECTION 2 */}
      <section id="meta-categories" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          2. The Four Meta Conversation Categories
        </h2>
        <p>
          Unlike SMS which charges per message segment, the WhatsApp Business Platform operates on a <strong>24-hour conversation model</strong>. Conversations fall into four distinct categories defined by Meta:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1">
            <span className="text-xs font-bold text-purple-700 uppercase">Category 1</span>
            <h3 className="text-sm font-semibold text-slate-900">Marketing Conversations</h3>
            <p className="text-xs text-slate-600">
              Business-initiated messages promoting products, seasonal offers, event invitations, or catalog links. Requires explicit opt-in.
            </p>
          </div>
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1">
            <span className="text-xs font-bold text-blue-700 uppercase">Category 2</span>
            <h3 className="text-sm font-semibold text-slate-900">Utility Conversations</h3>
            <p className="text-xs text-slate-600">
              Order confirmations, payment receipts, appointment reminders, and post-call brochure dispatch directly linked to an active customer transaction.
            </p>
          </div>
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase">Category 3</span>
            <h3 className="text-sm font-semibold text-slate-900">Authentication Conversations</h3>
            <p className="text-xs text-slate-600">
              One-Time Passwords (OTPs) enabling account verification, login security, and password resets with copy-code quick actions.
            </p>
          </div>
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1">
            <span className="text-xs font-bold text-amber-700 uppercase">Category 4</span>
            <h3 className="text-sm font-semibold text-slate-900">Service (Support) Conversations</h3>
            <p className="text-xs text-slate-600">
              Customer-initiated inquiries where an agent or bot resolves user support questions within the open 24-hour customer service window.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section id="24-hour-window" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          3. The 24-Hour Customer Service Window
        </h2>
        <p>
          A cornerstone of Meta&apos;s messaging policy is the <strong>24-Hour Customer Service Window</strong>:
        </p>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 my-4">
          <div className="border-l-4 border-emerald-500 pl-4 py-1 space-y-1">
            <h3 className="font-bold text-slate-900">Inside the 24-Hour Window</h3>
            <p className="text-xs text-slate-600">
              Triggered whenever a user messages your business number. Agents can send freeform replies, images, audio notes, and attachments without submitting templates to Meta for approval.
            </p>
          </div>

          <div className="border-l-4 border-amber-500 pl-4 py-1 space-y-1">
            <h3 className="font-bold text-slate-900">Outside the 24-Hour Window</h3>
            <p className="text-xs text-slate-600">
              Once 24 hours have elapsed since the user&apos;s last message, freeform messaging is blocked by Meta. The business can only reach out by sending a pre-approved message template (Utility or Marketing). Once the user replies, a fresh 24-hour window opens.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section id="post-call-workflows" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <PhoneForwarded className="h-6 w-6 text-blue-600" />
          4. Telephony + WhatsApp Post-Call Automation Workflows
        </h2>
        <p>
          The most powerful commercial return occurs when cloud voice telephony integrates directly with WhatsApp messaging:
        </p>

        <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3 my-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">The Automated Post-Call Pipeline</h3>
          <ol className="text-xs text-slate-700 space-y-2 list-decimal pl-4">
            <li>
              <strong>Voice Call Concludes:</strong> An inside sales agent finishes a 4-minute conversation with a prospective buyer.
            </li>
            <li>
              <strong>Agent Selects Disposition:</strong> In the CRM, the agent selects <em>&quot;Interested - Send Brochure&quot;</em>.
            </li>
            <li>
              <strong>Webhook Execution:</strong> The CRM fires a payload to the WhatsApp Business API endpoint containing the customer&apos;s phone number and the requested project ID.
            </li>
            <li>
              <strong>Instant Customer Delivery:</strong> Within 3 seconds, the customer receives a verified WhatsApp message: <em>&quot;Hi Rahul, thanks for speaking with us today! Here is the brochure and floor plan for Orchid Heights.&quot;</em> with an attached PDF and a <em>&quot;Schedule Site Visit&quot;</em> button.
            </li>
          </ol>
        </div>
      </section>

      {/* SECTION 5 */}
      <section id="bsp-architecture" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-emerald-600" />
          5. Business Solution Providers (BSPs) & Meta Onboarding
        </h2>
        <p>
          Enterprises access the WhatsApp Business Platform via authorized <strong>Business Solution Providers (BSPs)</strong> such as Fonada. Onboarding involves four standard verification steps:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
          <li>
            <strong>Meta Business Manager Verification:</strong> Submitting business registration documents (MCA Certificate of Incorporation, GST certificate) to verify company legal identity on Meta.
          </li>
          <li>
            <strong>Dedicated Phone Number Setup:</strong> Assigning a clean, unallocated phone number (mobile or landline DID) that is not currently registered on the consumer WhatsApp app.
          </li>
          <li>
            <strong>Display Name Approval:</strong> Ensuring your WhatsApp display name aligns with your legal company name, trademark, or public website branding.
          </li>
          <li>
            <strong>Template Submission & Whitelisting:</strong> Registering message templates with variables (e.g., <code>{"Hi {{1}}, your site visit for {{2}} is confirmed for {{3}}"}</code>) for automated delivery.
          </li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
