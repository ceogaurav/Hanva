import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { SchemaOrg, buildBreadcrumbSchema } from "@/components/shared/schema-org";
import { ProductVisualPlaceholder, ProductStoryBand } from "@/components/shared/product-visual-placeholder";
import { TrackedCtaObserver, TrackedDemoLink, TrackedWhatsAppLink, TrackedPhoneLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG, buildSaasDemoWhatsAppUrl } from "@/lib/config";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Phone,
  HelpCircle,
  ExternalLink,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export const metadata = {
  title: "Hanva CRM — Sales, Calling & WhatsApp CRM",
  description:
    "Manage leads, sales conversations, calling operations, built-in IVR, automated calling, and WhatsApp Business communication from one unified Hanva CRM platform.",
  alternates: {
    canonical: "https://www.hanva.in/products/crm/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/products/crm/",
    siteName: "Hanva Technologies",
    title: "Hanva CRM — Sales, Calling & WhatsApp CRM Software | Hanva Technologies",
    description:
      "Manage leads, sales conversations, calling operations, built-in IVR, and customer communication from one CRM platform.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva CRM SaaS Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanva CRM | Hanva Technologies",
    description: "Unified lead management, built-in IVR, automated calling, and WhatsApp CRM.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const crmFaqs: FAQItem[] = [
  {
    question: "How is Hanva CRM different from the Telecalling CRM page?",
    answer:
      "Hanva CRM (/products/crm/) is our flagship multi-channel SaaS platform combining lead pipelines, KYC document vault, built-in IVR, C2C calling, WhatsApp Business integration, and team attendance. The Telecalling CRM page (/products/telecalling-crm/) focuses specifically on voice-first outbound telecaller and dialer workflows.",
  },
  {
    question: "Which calling and IVR providers are supported inside Hanva CRM?",
    answer:
      "Hanva CRM supports C2C calling and IVR campaign workflows across CloudConnect, Ozonetel, and Fonada, along with AI OBD and auto-dialer campaign queues.",
  },
  {
    question: "Can we import existing leads and listen to call recordings in Hanva CRM?",
    answer:
      "Yes. Admin users can upload leads via CSV, bulk-assign leads across teams, score leads, track follow-ups, and play back recorded C2C/IVR calls directly in the call reports console.",
  },
  {
    question: "How is Hanva CRM priced?",
    answer:
      "Contact us for pricing and a personalized product demonstration. Plans are tailored to your team roles, calling volume, and required modules.",
  },
];

const crmSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Hanva CRM",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://www.hanva.in/products/crm/",
      description:
        "Manage leads, sales conversations, calling operations, built-in IVR, automated calling, and WhatsApp Business communication from one CRM platform.",
      publisher: {
        "@type": "Organization",
        name: CONTACT_CONFIG.companyLegalName,
        url: "https://www.hanva.in",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: crmFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products/" },
  { label: "Hanva CRM" },
];

const verifiedCapabilities = [
  {
    badge: "Leads & Pipelines",
    title: "Lead & Contact Management",
    description:
      "Full lead lifecycle with bulk CSV upload, bulk assignment, lead transfer, lead scoring, follow-up reminders, notes, and a dedicated KYC document vault.",
  },
  {
    badge: "Calling Workflows",
    title: "Native C2C Calling & Auto-Dialing",
    description:
      "Initiate cloud-based C2C calls via CloudConnect, Ozonetel, or Fonada with wallet tracking, auto-dialer queues, and AI OBD campaign support.",
  },
  {
    badge: "Built-in IVR",
    title: "IVR Campaigns & DID Registry",
    description:
      "Upload IVR campaigns in 5,000-row batches, schedule automated blasts, manage DID allocations, and track IVR delivery outcomes.",
  },
  {
    badge: "WhatsApp Integration",
    title: "WhatsApp Business (Fonada WABA)",
    description:
      "Manage approved WABA templates, outbound template messaging, and inbound customer replies with rate-limited webhook processing from the admin hub.",
  },
  {
    badge: "Team & Attendance",
    title: "Role Portals & Team Attendance",
    description:
      "Structured role access for admins, team leaders, telecallers, and KYC teams alongside geo/camera attendance tracking, leave management, and targets.",
  },
  {
    badge: "Reporting",
    title: "Call Recordings & Operational Reports",
    description:
      "Review C2C and IVR call logs, play back call recordings directly in the browser, and monitor executive, disbursement, and attendance reports.",
  },
];

export default function HanvaCrmPage() {
  const whatsappUrl = buildSaasDemoWhatsAppUrl("crm");

  return (
    <div className="flex flex-col gap-12 lg:gap-16 pb-28 lg:pb-20 bg-white">
      <SchemaOrg schema={crmSchema} />
      <SchemaOrg data={buildBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <section className="pt-10 lg:pt-16 pb-12 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-100">
        <Container className="space-y-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="inline-flex items-center gap-2">
                  {idx > 0 && <span className="text-slate-400" aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-slate-900 font-medium" aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">Flagship SaaS Platform</Badge>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              Hanva CRM
            </h1>
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
              Manage leads, sales conversations, calling operations, and customer communication from one CRM platform.
            </p>
          </div>

          <TrackedCtaObserver ctaLocation="hero" productName="hanva_crm" ctaType="crm_hero_cta">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button asChild variant="primary" size="lg" className="h-auto min-h-[48px] py-2.5 px-5 whitespace-normal text-center">
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="hero"
                  productName="hanva_crm"
                  ctaType="product_demo_whatsapp"
                  contextRef="/products/crm/"
                  experimentId="EXP-22C"
                  variantId="request_demo_whatsapp"
                >
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Request Demo on WhatsApp</span>
                  <ExternalLink className="ml-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-auto min-h-[48px] py-2.5 px-5 whitespace-normal text-center">
                <TrackedDemoLink href="/company/contact/?product=crm" ctaLocation="crm_hero" productSlug="crm">
                  <span>Contact Us for Pricing</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
                </TrackedDemoLink>
              </Button>
            </div>
          </TrackedCtaObserver>

          <p className="text-xs text-slate-600">
            Clicking WhatsApp opens a chat with <span className="font-semibold">+91 8423711043</span> to initiate a guided demo enquiry (not an automated booking confirmation). Contact us for pricing.
          </p>

          <ProductVisualPlaceholder
            productName="Hanva CRM"
            accent="blue"
            plannedAsset="hanva-crm-dashboard.webp"
            caption="Unified lead pipeline, cloud telephony, built-in IVR, and WhatsApp Business workspace"
            workflowFlow={[
              "Lead Intake & CSV Upload",
              "Smart Assignment & Scoring",
              "C2C Calling / IVR / WhatsApp",
              "Call Recording & Reports",
            ]}
            modules={[
              { title: "Admin & Team Leader Console", detail: "Bulk lead assignment, DID registry, IVR campaign scheduling, and executive reports." },
              { title: "Telecaller & KYC Portals", detail: "Assigned calling queues, follow-up tracking, and secure KYC document collection." },
              { title: "Call Logs & Attendance", detail: "In-browser call recording playback, team targets, and attendance dashboards." },
            ]}
          />
        </Container>
      </section>

      {/* Problem & Solution */}
      <section>
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">The Operational Challenge</div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Sales and telecalling teams often juggle spreadsheets, disconnected dialers, and personal phones—causing unlogged calls, missed follow-ups, and zero visibility for managers.
            </p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-6 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-700">The Hanva CRM Solution</div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Hanva CRM unifies lead pipelines, cloud calling, built-in IVR, WhatsApp Business messaging, KYC verification, and team attendance inside one role-based platform.
            </p>
          </div>
        </Container>
      </section>

      {/* Verified Capabilities */}
      <section>
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Core Capabilities of Hanva CRM
            </h2>
            <p className="text-sm text-slate-600">
              Every module listed below is grounded in our verified platform capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedCapabilities.map((item) => (
              <Card key={item.title} className="border-slate-200">
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="w-fit text-[11px] mb-2">{item.badge}</Badge>
                  <CardTitle className="text-base font-bold text-slate-900 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-1" aria-hidden="true" />
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Product Workflow Storytelling */}
      <section className="py-12 bg-slate-50/70 border-y border-slate-100">
        <Container className="space-y-14">
          <ProductStoryBand
            eyebrow="01. Lead Management & KYC"
            title="Centralize Lead Intake, Assignment & Follow-Up Discipline"
            description="Ingest leads from CSV uploads or incoming webhooks, assign them across telecallers and team leaders, score prospects, and store KYC documents in a single workspace."
            bullets={[
              "Bulk CSV upload, lead assignment, and lead transfer across roles",
              "Follow-up reminders, notes, scoring, and KYC upload links",
              "Dedicated admin, team leader, telecaller, and KYC team portals",
            ]}
            slotTitle="Hanva CRM — Lead Management & Pipeline View"
            slotCaption="Genuine application screenshot awaiting isolated non-production Supabase sandbox capture."
            plannedFile="hanva-crm-lead-management.webp"
            accent="blue"
          />

          <ProductStoryBand
            eyebrow="02. Calling & Built-In IVR"
            title="Cloud Calling, IVR Blasts & Browser Recording Playback"
            description="Run C2C cloud calling via CloudConnect, Ozonetel, or Fonada alongside 5,000-row IVR campaign scheduling, DID management, and browser-based call recording playback."
            bullets={[
              "C2C dialing with wallet tracking and webhook call-outcome logs",
              "IVR upload hub, scheduling, and Super Admin DID registry",
              "In-browser HTML5 audio playback for C2C and IVR call logs",
            ]}
            slotTitle="Hanva CRM — Calling & IVR Campaign Reports"
            slotCaption="Genuine application screenshot awaiting isolated non-production Supabase sandbox capture."
            plannedFile="hanva-crm-calling-ivr.webp"
            accent="blue"
            reverse
          />

          <ProductStoryBand
            eyebrow="03. WhatsApp & Team Attendance"
            title="Official WhatsApp Business Integration & Team Oversight"
            description="Coordinate Fonada WABA templates and inbound replies from the admin WhatsApp hub while tracking team attendance, leaves, and operational reports."
            bullets={[
              "Fonada WABA template management and rate-limited webhook handling",
              "Geo/camera attendance tracking, leave approvals, and targets",
              "Executive, disbursement, and daily call reporting",
            ]}
            slotTitle="Hanva CRM — WhatsApp Hub & Operational Reports"
            slotCaption="Genuine application screenshot awaiting isolated non-production Supabase sandbox capture."
            plannedFile="hanva-crm-whatsapp.webp"
            accent="blue"
          />

          {/* Mid-Page Conversion Banner */}
          <div className="rounded-2xl border border-blue-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-bold text-slate-900">See Hanva CRM in a Guided Walkthrough</div>
              <p className="text-xs sm:text-sm text-slate-600">
                Opens WhatsApp (+91 8423711043) to initiate a demo enquiry for your team size and calling workflow.
              </p>
            </div>
            <Button asChild variant="primary" size="default" className="shrink-0">
              <TrackedWhatsAppLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="product_section"
                productName="hanva_crm"
                ctaType="product_demo_whatsapp"
                contextRef="/products/crm/"
              >
                <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>WhatsApp Demo Enquiry</span>
              </TrackedWhatsAppLink>
            </Button>
          </div>
        </Container>
      </section>

      {/* Related CRM & Custom Options */}
      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <Container className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Explore Related CRM &amp; Voice Options
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link href="/products/telecalling-crm/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Telecalling CRM (Voice-First)</span>
                <ArrowUpRight className="h-4 w-4 text-blue-600" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">Dedicated outbound dialer and telecaller calling workflow console.</p>
            </Link>
            <Link href="/products/whatsapp-crm/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>WhatsApp Business CRM</span>
                <ArrowUpRight className="h-4 w-4 text-blue-600" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">Official WABA templates and customer messaging workflows.</p>
            </Link>
            <Link href="/software-development/custom-crm-development/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Custom CRM Development</span>
                <ArrowUpRight className="h-4 w-4 text-blue-600" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">Need bespoke ERP/CRM workflows? Explore our custom engineering service.</p>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link href="/resources/crm-with-ivr-vs-telecalling-crm/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Buyer Guide: CRM with IVR vs Telecalling CRM</span>
                <ArrowUpRight className="h-4 w-4 text-blue-600" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">Compare multi-channel IVR/WhatsApp CRM vs outbound voice-first telecalling workflows.</p>
            </Link>
            <Link href="/resources/ivr-crm-for-businesses/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Operational Guide: IVR CRM Routing &amp; Call Audits</span>
                <ArrowUpRight className="h-4 w-4 text-blue-600" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">How teams combine DID routing, 5,000-row IVR blasts, C2C calling &amp; audio audits.</p>
            </Link>
            <Link href="/resources/lead-management-process-guide/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Playbook: Lead Management, Scoring &amp; KYC Vaults</span>
                <ArrowUpRight className="h-4 w-4 text-blue-600" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">Structured SOP from webhook/CSV intake and role assignment through KYC collection.</p>
            </Link>
            <Link href="/resources/saas-vs-custom-crm-erp-guide/" className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Decision Guide: Ready-Made SaaS vs Custom CRM/ERP</span>
                <ArrowUpRight className="h-4 w-4 text-blue-600" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">Evaluate when ready-to-deploy Hanva CRM outperforms custom bespoke software builds.</p>
            </Link>
          </div>
        </Container>
      </section>

      {/* Included vs Explicit Scope Clarifications */}
      <section>
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-6 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">What Is Included (Verified)</div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
              <li>Role-based portals for Admin, Team Leader, Telecaller, and KYC Team</li>
              <li>CSV bulk lead import, webhook intake, lead scoring, and follow-up queues</li>
              <li>Carrier C2C calling &amp; 5,000-row IVR campaigns (CloudConnect, Ozonetel, Fonada)</li>
              <li>HTML5 browser recording playback on call reports, Fonada WABA &amp; attendance</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-700">Important Scope Boundaries</div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
              <li>Automated bulk email or SMS blast dispatches are not active outbound modules</li>
              <li>Live supervisor wallboard is not an active operational display</li>
              <li>Companion Android dialing tracks call duration/status (trunk audio applies to cloud C2C/IVR)</li>
              <li>No built-in online subscription billing; pricing is scoped transparently per team</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section>
        <Container className="max-w-4xl space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion items={crmFaqs} />
        </Container>
      </section>

      {/* Final CTA */}
      <section>
        <Container>
          <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold">Contact Us for Pricing &amp; a Hanva CRM Demo</h2>
              <p className="text-sm text-slate-300">
                Initiate a WhatsApp demo enquiry for a personalized walkthrough tailored to your team size and calling volume.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button asChild size="lg" className="bg-[#25D366] text-slate-950 hover:bg-[#20BD5A] font-semibold">
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="footer"
                  productName="hanva_crm"
                  ctaType="product_demo_whatsapp"
                  contextRef="/products/crm/"
                >
                  <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>WhatsApp Demo Enquiry</span>
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
                <TrackedPhoneLink href={`tel:${CONTACT_CONFIG.phoneTel}`} ctaLocation="crm_bottom">
                  <Phone className="mr-2 h-4 w-4 text-blue-400" aria-hidden="true" />
                  <span>{CONTACT_CONFIG.phoneDisplay}</span>
                </TrackedPhoneLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
