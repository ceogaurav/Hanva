import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import { TrackedDemoLink, TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG } from "@/lib/config";
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Server,
  PhoneCall,
  Users,
  MessageSquare,
  Sparkles,
  Clock,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Business Telephony, IVR & CRM Knowledge Hub",
  description:
    "Practical architectural guides, dialer comparisons, pricing models, and compliance handbooks for Indian business leaders, sales directors, and telecalling teams.",
  alternates: {
    canonical: "https://www.hanva.in/resources/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/resources/",
    siteName: "Hanva Technologies",
    title: "Business Telephony, IVR & CRM Knowledge Hub",
    description:
      "Practical architectural guides, dialer comparisons, pricing models, and compliance handbooks for Indian businesses.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Knowledge Hub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Telephony, IVR & CRM Knowledge Hub",
    description:
      "Practical architectural guides, dialer comparisons, pricing models, and compliance handbooks for Indian businesses.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const resourcesHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Hanva Business Telephony & CRM Knowledge Hub",
  description:
    "Comprehensive technical and operational guides covering cloud telephony, smart IVR, outbound dialers, telecalling CRM, and WhatsApp Business API.",
  url: "https://www.hanva.in/resources/",
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
};

const pillars = [
  {
    title: "Cloud Telephony & Smart IVR",
    badge: "Voice Infrastructure",
    description: "Architectural fundamentals, virtual numbers, SIP trunking, and call routing logic.",
    icon: Server,
  },
  {
    title: "Auto-Dialers & Outbound Telesales",
    badge: "Outbound Engines",
    description: "Predictive, progressive, and preview dialers compared for high-velocity sales teams.",
    icon: PhoneCall,
  },
  {
    title: "Telecalling CRM & Lead Management",
    badge: "Sales Execution",
    description: "Lead allocation, disposition tracking, telecaller pacing, and pipeline workflows.",
    icon: Users,
  },
  {
    title: "WhatsApp Business API & Automation",
    badge: "Omnichannel Messaging",
    description: "Official Meta WABA platform, pre-approved templates, and post-call automation.",
    icon: MessageSquare,
  },
  {
    title: "Commercial Evaluation & Pricing",
    badge: "Cost Architecture",
    description: "15-second carrier pulse billing, DID rental structures, and total cost of ownership.",
    icon: Sparkles,
  },
];

const articles = [
  {
    slug: "/resources/salon-management-software-guide/",
    pillar: "Salon Software",
    title: "How to Choose Salon Management Software in India: Complete Buying Guide",
    description:
      "Complete evaluation guide covering GST salon billing, online booking mini-sites, staff commissions, payroll, and service-to-product auto-consumption.",
    readTime: "11 min read",
    date: "November 2026",
    keyTopics: ["GST Salon Billing", "Online Booking", "Staff Commissions", "Auto-Consumption Stock"],
  },
  {
    slug: "/resources/restaurant-pos-kot-inventory-guide/",
    pillar: "Restaurant POS",
    title: "Restaurant POS Software in India: Billing, KOT, Inventory and Buying Guide",
    description:
      "Compare POS billing, Kitchen Order Tickets (KOT), Kitchen Display Systems (KDS), India CGST/SGST splits, UPI QR, QR ordering, and recipe inventory.",
    readTime: "12 min read",
    date: "November 2026",
    keyTopics: ["POS vs KOT vs KDS", "CGST & SGST", "Recipe BOM Stock", "Cafes & Cloud Kitchens"],
  },
  {
    slug: "/resources/crm-with-ivr-vs-telecalling-crm/",
    pillar: "CRM & IVR",
    title: "CRM with IVR vs Telecalling CRM: What's the Difference?",
    description:
      "Understand when businesses need a full CRM with built-in IVR and WhatsApp integration vs a dedicated outbound telecalling dialer console.",
    readTime: "10 min read",
    date: "November 2026",
    keyTopics: ["CRM Pipelines", "Built-in IVR", "C2C & Auto-Dialing", "Real Estate & EdTech"],
  },
  {
    slug: "/resources/saas-vs-custom-crm-erp-guide/",
    pillar: "Software Strategy",
    title: "SaaS vs Custom CRM and ERP: Which Is Right for Your Business?",
    description:
      "Objective decision guide comparing off-the-shelf SaaS subscriptions against bespoke CRM/ERP development across cost, speed, and ownership.",
    readTime: "11 min read",
    date: "November 2026",
    keyTopics: ["Buy vs Build", "TCO & Maintenance", "Custom Workflows", "Data Ownership"],
  },
  {
    slug: "/resources/what-is-cloud-telephony/",
    pillar: "Cloud Telephony & IVR",
    title: "What is Cloud Telephony? The Complete Indian Business Guide",
    description:
      "Understand cloud PBX architecture, virtual landline DIDs, SIP trunking, and how modern softphones replace legacy EPABX hardware without capital expenditure.",
    readTime: "9 min read",
    date: "November 2026",
    keyTopics: ["Virtual PBX vs Traditional EPABX", "DoT & TRAI Regulations", "WebRTC Softphones", "Two-Leg Carrier Bridging"],
  },
  {
    slug: "/resources/how-ivr-systems-work/",
    pillar: "Cloud Telephony & IVR",
    title: "How IVR Systems Work: Architecture, DTMF Logic & Routing Workflows",
    description:
      "A deep dive into multi-level interactive voice response: DTMF tone detection, speech synthesis, skill-based queue distribution, and webhook CRM synchronization.",
    readTime: "8 min read",
    date: "November 2026",
    keyTopics: ["Multi-Level Menu Design", "DTMF Signal Processing", "Priority Queue Logic", "Post-Call Event Webhooks"],
  },
  {
    slug: "/resources/auto-dialer-vs-predictive-dialer/",
    pillar: "Auto-Dialers & Telesales",
    title: "Auto-Dialer vs. Predictive Dialer: Architecture, Connect Rates & Compliance",
    description:
      "Compare Preview, Progressive, and Predictive dialers. Learn how call pacing algorithms affect agent idle time, dropped call rates, and Truecaller spam risk in India.",
    readTime: "11 min read",
    date: "November 2026",
    keyTopics: ["Dialer Modes Compared", "Truecaller Spam Mitigation", "Pacing Algorithm Math", "Regulatory Drop Rate Caps"],
  },
  {
    slug: "/resources/telecalling-crm-guide/",
    pillar: "Telecalling CRM",
    title: "Telecalling CRM: The Blueprint for High-Volume Inside Sales Operations",
    description:
      "How integrated dialer CRMs eliminate spreadsheet lead leakage, automate lead assignment, enforce disposition tagging, and give sales directors real-time visibility.",
    readTime: "10 min read",
    date: "November 2026",
    keyTopics: ["Lead Allocation Engines", "Disposition Hierarchy", "Stereo Call Recording", "Site-Visit & Callback Cadences"],
  },
  {
    slug: "/resources/whatsapp-business-api-guide/",
    pillar: "WhatsApp Business API",
    title: "WhatsApp Business API vs. Business App: Verification, Templates & CRM Integration",
    description:
      "The definitive guide to official Meta WABA gateways: green badge verification, 24-hour service messaging windows, pre-approved utility templates, and multi-agent shared inboxes.",
    readTime: "10 min read",
    date: "November 2026",
    keyTopics: ["Official WABA vs WhatsApp App", "Meta Tier Limits & Quality Rating", "Template Categories", "Post-Call Brochure Drops"],
  },
  {
    slug: "/resources/cloud-telephony-pricing-guide/",
    pillar: "Pricing & Commercials",
    title: "Cloud Telephony Pricing Models: 15-Second Pulse Billing vs. Flat Minute Rounding",
    description:
      "A transparent breakdown of telecom billing in India: why 60-second rounding inflates phone bills by 25%-30%, channel rental math, DID setup charges, and hidden telco tariffs.",
    readTime: "8 min read",
    date: "November 2026",
    keyTopics: ["15s Pulse vs 60s Rounding", "Carrier DID & PRI Rental", "Double-Leg Bridging Math", "Total Cost of Ownership"],
  },
  {
    slug: "/resources/dlt-compliance-guide/",
    pillar: "Regulatory Compliance",
    title: "TRAI DLT Registration & Compliance Guide for Indian Enterprises",
    description:
      "Step-by-step statutory walkthrough for telecom commercial communications: registering Principal Entities, sender headers, and content templates on Vilpower, Trueconnect, and PingConnect.",
    readTime: "7 min read",
    date: "November 2026",
    keyTopics: ["TRAI UCC Regulations", "Principal Entity KYC", "Header & Consent Templates", "DLT Portal Walkthrough"],
  },
];

export default function ResourcesHubPage() {
  const whatsappUrl = `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
    "Hello Hanva Team, I am browsing your Knowledge Hub and would like to speak with an engineering specialist. Reference: /resources/"
  )}`;

  return (
    <div className="pt-10 pb-28 lg:py-14 bg-white min-h-screen overflow-x-clip">
      <SchemaOrg data={resourcesHubSchema} />

      <Container className="space-y-12">
        {/* 1. Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
            <li className="inline-flex items-center gap-2">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="text-slate-400" aria-hidden="true">/</span>
              <span className="text-slate-900 font-medium" aria-current="page">Resources</span>
            </li>
          </ol>
        </nav>

        {/* 2. Hero Header */}
        <div className="space-y-6 max-w-4xl">
          <Badge variant="default" className="text-xs">
            Technical &amp; Operational Knowledge Hub
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Business Communication, Cloud Telephony &amp; CRM Architecture Guides
          </h1>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
            Practical, peer-reviewed engineering guides, dialer comparisons, regulatory manuals, and pricing frameworks 
            designed to help Indian business owners, sales leaders, and telecalling operations build scalable customer interaction engines.
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-5">
                <TrackedDemoLink href="/company/contact/" ctaLocation="resources_hub_hero" ctaLabelKey="request_architecture_demo">
                  <span>Request Architecture Demo</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0 inline" aria-hidden="true" />
                </TrackedDemoLink>
              </Button>
              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-5">
                <TrackedWhatsAppLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" ctaLocation="resources_hub_hero" contextRef="/resources/">
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0 inline" aria-hidden="true" />
                  <span>Ask an Engineer on WhatsApp</span>
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5 shrink-0 inline" aria-hidden="true" />
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-5">
                <Link href="/pricing/calculator/">
                  <Sparkles className="mr-2 h-4 w-4 text-emerald-600 shrink-0 inline" aria-hidden="true" />
                  <span>Pulse Savings Calculator</span>
                </Link>
              </Button>
            </div>
            <p className="text-[11px] text-slate-600">
              WhatsApp opens a prepared message in WhatsApp — review and press Send to chat.
            </p>
          </div>
        </div>

        {/* 3. Core Content Pillars Strip */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Core Knowledge Pillars</h2>
            <p className="text-xs text-slate-600 mt-1">Select any pillar below to jump directly to the foundational guides.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <a key={i} href="#guides-directory" className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  <Card className="h-full border-slate-200 bg-slate-50/50 group-hover:bg-white group-hover:border-blue-300 group-hover:shadow-sm transition-all">
                    <CardHeader className="p-4 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <Badge variant="outline" className="text-[10px] w-fit">
                        {pillar.badge}
                      </Badge>
                      <CardTitle className="text-sm font-bold text-slate-900 group-hover:text-blue-600 leading-snug">
                        {pillar.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-600 leading-normal">
                        {pillar.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>

        {/* 4. Foundational Guides Grid */}
        <div id="guides-directory" className="space-y-6 pt-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Foundational Architectural & Commercial Guides</h2>
            <p className="text-xs text-slate-500 mt-1">
              In-depth research articles answering high-intent technical, operational, and commercial questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <Card key={i} className="border-slate-200 bg-white flex flex-col justify-between hover:border-blue-300 hover:shadow-sm transition-all group">
                <CardHeader className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {article.pillar}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-slate-600">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    <Link href={article.slug}>{article.title}</Link>
                  </CardTitle>

                  <CardDescription className="text-xs text-slate-600 leading-relaxed">
                    {article.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4">
                  <div className="space-y-1.5 border-t border-slate-100 pt-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                      Key Topics Explored
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {article.keyTopics.map((topic, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button asChild variant="outline" size="sm" className="w-full justify-between group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700 transition-colors">
                      <Link href={article.slug}>
                        <span>Read Complete Guide</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 5. Editorial Standards & Factual Integrity Disclosure */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            <span>Editorial Governance & Factual Standards</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            All guides published in the Hanva Knowledge Hub are authored and maintained by the <strong>Hanva Engineering & Editorial Board</strong>. 
            We enforce strict technical accuracy: technical specifications adhere to DoT National Numbering Plans, TRAI UCC regulations, 
            W3C WebRTC standards, and Meta WhatsApp Business Platform policies. We do not publish AI-generated fluff, fake customer testimonials, 
            or unsubstantiated performance claims. Every article is re-verified semi-annually against current carrier rate cards and API releases.
          </p>
        </div>

        {/* 6. Bottom Action Banner */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white space-y-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Have a Specific Communication Problem to Solve?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Our telephony architects can evaluate your inbound call volume, auto-dialing concurrency, 
              and CRM synchronization requirements to propose a tailored implementation plan.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[44px] py-2.5 px-4 text-xs sm:text-sm text-center">
              <Link href="/company/contact/">
                Schedule Engineering Review
                <ArrowRight className="ml-2 h-4 w-4 shrink-0 inline" />
              </Link>
            </Button>
            <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[44px] py-2.5 px-4 text-xs sm:text-sm text-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-4 w-4 shrink-0 inline" />
                Chat with Technical Team
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
