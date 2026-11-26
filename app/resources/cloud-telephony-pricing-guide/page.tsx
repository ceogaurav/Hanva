import * as React from "react";
import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calculator, Coins, ShieldCheck, CheckCircle2, ArrowRight, AlertCircle, HelpCircle, Layers, TrendingDown } from "lucide-react";

export const metadata = {
  title: "Cloud Telephony Pricing Guide in India (2026)",
  description:
    "A transparent breakdown of cloud telephony costs in India: 15-second vs. 60-second pulse math, virtual DID rentals, two-legged forwarding, and total cost of ownership.",
  alternates: {
    canonical: "https://hanva.in/resources/cloud-telephony-pricing-guide/",
  },
  openGraph: {
    title: "Cloud Telephony Pricing Guide in India (2026)",
    description:
      "A transparent breakdown of telecom billing in India: why 60-second rounding inflates phone bills by 25%-30%, channel rental math, DID setup charges, and hidden telco tariffs.",
    url: "https://hanva.in/resources/cloud-telephony-pricing-guide/",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cloud Telephony Pricing Guide (India): Pulses, DIDs, Seats & Hidden Fees",
  description:
    "An exhaustive commercial evaluation guide breaking down the real cost of cloud telephony in India: pulse rounding, two-legged forwarding, DID rentals, and GST taxation.",
  author: {
    "@type": "Organization",
    name: "Hanva Engineering & Editorial Board",
    url: "https://hanva.in/company/about/",
  },
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    url: "https://hanva.in",
    logo: {
      "@type": "ImageObject",
      url: "https://hanva.in/icon.png",
    },
  },
  datePublished: "2026-11-25",
  dateModified: "2026-11-25",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://hanva.in/resources/cloud-telephony-pricing-guide/",
  },
};

const faqs = [
  {
    question: "What is a 'pulse' in Indian telecom billing?",
    answer:
      "A pulse is the minimum time unit used by telecom carriers to measure and charge phone calls. Under standard retail 60-second pulse billing, any call lasting between 1 and 60 seconds is rounded up and billed for a full 60 seconds. Under a 15-second pulse, calls are billed in 15-second increments (e.g., a 20-second call is billed as 30 seconds rather than 60 seconds), significantly lowering call charges for outbound sales teams where many calls end quickly.",
  },
  {
    question: "Why do inbound calls forwarded to agent mobiles cost double?",
    answer:
      "When a customer calls your virtual number, Leg A connects the caller to the cloud PBX. To ring an agent's cellular phone, the PBX dials out on Leg B over cellular PSTN. Because both legs utilize telecom carrier lines simultaneously, carriers bill for both the inbound and outbound minutes. Businesses can eliminate Leg B charges completely by having agents answer calls on web browsers using WebRTC softphones.",
  },
  {
    question: "What are the four primary cost components of a cloud telephony invoice?",
    answer:
      "A standard Indian cloud telephony invoice consists of: 1. Virtual DID Number Rental (monthly/annual recurring line charge), 2. Agent Software Seat Licenses (user access to the PBX/CRM dashboard), 3. Outbound/Forwarding Call Usage (measured in seconds or pulses), and 4. Statutory 18% Goods & Services Tax (GST under SAC 998419 for telecommunication services).",
  },
  {
    question: "Is there really such a thing as 'unlimited free calling' for B2B telecalling?",
    answer:
      "No. Legitimate commercial telecom providers operating under TRAI and DoT rules pay interconnect usage charges (IUC) and carrier trunk fees to underlying telecom operators (Tata, Airtel, Vodafone Idea). Marketing claims offering 'unlimited commercial calling' invariably hide strict Fair Usage Policies (FUP), restrict concurrent channels, or route calls over low-quality unauthorized VoIP gateways that risk regulatory penalties.",
  },
  {
    question: "How does 18% GST apply to cloud telephony in India?",
    answer:
      "Telecommunication and cloud software services in India are taxed under Service Accounting Code (SAC) 998419 at an 18% GST rate. Registered businesses can claim 100% Input Tax Credit (ITC) on these invoices by providing their active GSTIN during onboarding.",
  },
];

export default function CloudTelephonyPricingGuidePage() {
  return (
    <ArticleLayout
      pillarBadge="Pillar E: Pricing & Commercials"
      pillarHref="/resources/"
      title="Cloud Telephony Pricing Guide (India): Pulses, DIDs, Seats & Hidden Fees"
      subtitle="The CFO & Sales Director guide to telecom commercial models: understand pulse rounding mathematics, two-legged call forwarding costs, and how to estimate your true TCO."
      readTime="9 min read"
      publishDate="November 25, 2026"
      reviewDate="November 2026"
      editorialAttribution="Hanva Engineering & Editorial Board"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "Cloud Telephony Pricing Guide" },
      ]}
      whatsappRef="/resources/cloud-telephony-pricing-guide/"
      executiveSummary="Evaluating cloud telephony pricing in India requires looking beyond advertised per-minute tariffs. A company's true monthly spend is governed by billing pulse granularity (15-second vs. 60-second rounding), two-legged forwarding charges, virtual number rental fees, and agent software licenses. Understanding how these levers interact enables businesses to choose transparent commercial plans that eliminate 20%–35% of unnecessary telecom inflation."
      tableOfContents={[
        { id: "cost-anatomy", title: "1. The 4 Pillars of a Cloud Telephony Invoice" },
        { id: "pulse-math", title: "2. The Mathematical Impact of 15s vs. 60s Pulse Billing" },
        { id: "two-legged-forwarding", title: "3. The Two-Legged Forwarding Cost Multiplier" },
        { id: "did-comparison", title: "4. Virtual Mobile DID vs. 1800 Toll-Free Economics" },
        { id: "pricing-calculator", title: "5. Calculating Your Monthly Team Budget" },
        { id: "faqs", title: "6. Frequently Asked Questions" },
      ]}
      relatedProducts={[
        {
          title: "Pricing Calculator",
          description: "Estimate monthly telephony, seat licenses, and pulse costs with our interactive tool.",
          href: "/pricing/calculator/",
        },
        {
          title: "Cloud Telephony Plans",
          description: "Transparent pricing packages with custom quotation models for growing teams.",
          href: "/pricing/",
        },
        {
          title: "Virtual Phone Numbers",
          description: "STD landline and mobile DIDs with instant inbound routing across Indian cities.",
          href: "/products/virtual-numbers/",
        },
      ]}
      relatedIndustries={[
        {
          title: "Financial Services",
          description: "High-volume telesales cost optimization, loan verification, and CRM logging.",
          href: "/industry/financial-services/",
        },
        {
          title: "Real Estate",
          description: "Centralized marketing numbers, lead assignment, and site-visit scheduling.",
          href: "/industry/real-estate/",
        },
        {
          title: "Education",
          description: "Seasonal admissions counseling calling, campaign budgeting, and WhatsApp drops.",
          href: "/industry/education/",
        },
      ]}
      faqs={faqs}
      schemaData={articleSchema}
    >
      {/* SECTION 1 */}
      <section id="cost-anatomy" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Coins className="h-6 w-6 text-blue-600" />
          1. The Anatomy of a Cloud Telephony Invoice
        </h2>
        <p>
          Unlike consumer mobile plans that bundle unlimited calling for a flat fee, enterprise cloud telephony operates on commercial carrier infrastructure. In India, a comprehensive telecom bill consists of four distinct cost centers:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase">Cost Center 1</span>
            <h3 className="text-sm font-bold text-slate-900">Virtual DID Number Rental</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A monthly or annual fee paid to maintain your dedicated 10-digit mobile virtual number or regional STD landline DID (e.g., 080 for Bengaluru, 022 for Mumbai). Covers carrier line reservation and regulatory compliance.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase">Cost Center 2</span>
            <h3 className="text-sm font-bold text-slate-900">Agent Software Seat Licenses</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A per-user fee for access to the cloud PBX dashboard, web softphones, CRM lead management, 2-click dispositions, and supervisor monitoring tools (whisper/barge-in).
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase">Cost Center 3</span>
            <h3 className="text-sm font-bold text-slate-900">Call Usage & Pulse Charges</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Metered consumption billed as outbound calls are placed or incoming calls are forwarded. In India, voice broadcast benchmarks often sit around <strong>₹0.15 per 15-second pulse</strong> (equivalent to ₹0.60 per minute base), adjusted by custom enterprise volume commitments.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase">Cost Center 4</span>
            <h3 className="text-sm font-bold text-slate-900">Statutory 18% GST (SAC 998419)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mandatory Goods & Services Tax applied to all telecommunication services. Fully claimable as Input Tax Credit (ITC) by GST-registered businesses.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section id="pulse-math" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingDown className="h-6 w-6 text-emerald-600" />
          2. The Mathematical Impact of 15s vs. 60s Pulse Billing
        </h2>
        <p>
          The single most misunderstood aspect of telephony pricing is <strong>pulse rounding</strong>. When an outbound telecalling campaign runs, hundreds of calls end quickly because prospects say <em>&quot;I am in a meeting, call later&quot;</em> or <em>&quot;Not interested&quot;</em> within 10 to 25 seconds.
        </p>

        <p>
          Let&apos;s compare how a 15-second pulse versus standard 60-second rounding bills common call durations:
        </p>

        <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold text-slate-900">Actual Call Duration</TableHead>
                <TableHead className="font-bold text-slate-900">Standard 60-Second Pulse</TableHead>
                <TableHead className="font-bold text-emerald-700 bg-emerald-50/30">15-Second Pulse Billing</TableHead>
                <TableHead className="font-bold text-slate-900">Billed Units Saved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              <TableRow>
                <TableCell className="font-mono font-semibold">12 Seconds (Quick Rejection)</TableCell>
                <TableCell>Billed for 60 Seconds</TableCell>
                <TableCell className="bg-emerald-50/30 text-emerald-950 font-medium">Billed for 15 Seconds (1 Pulse)</TableCell>
                <TableCell className="text-emerald-700 font-bold">75% Reduction</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-semibold">22 Seconds (Reschedule Request)</TableCell>
                <TableCell>Billed for 60 Seconds</TableCell>
                <TableCell className="bg-emerald-50/30 text-emerald-950 font-medium">Billed for 30 Seconds (2 Pulses)</TableCell>
                <TableCell className="text-emerald-700 font-bold">50% Reduction</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-semibold">68 Seconds (Short Pitch)</TableCell>
                <TableCell>Billed for 120 Seconds (2 Mins)</TableCell>
                <TableCell className="bg-emerald-50/30 text-emerald-950 font-medium">Billed for 75 Seconds (5 Pulses)</TableCell>
                <TableCell className="text-emerald-700 font-bold">37.5% Reduction</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-semibold">125 Seconds (Qualified Lead)</TableCell>
                <TableCell>Billed for 180 Seconds (3 Mins)</TableCell>
                <TableCell className="bg-emerald-50/30 text-emerald-950 font-medium">Billed for 135 Seconds (9 Pulses)</TableCell>
                <TableCell className="text-emerald-700 font-bold">25% Reduction</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>The Financial Takeaway:</strong> On a sales floor making 10,000 outbound connected calls a month, an estimated 40% of calls conclude in under 30 seconds. Switching from 60-second rounding to 15-second pulse billing saves significant billed airtime without altering agent call volume.
        </p>
      </section>

      {/* SECTION 3 */}
      <section id="two-legged-forwarding" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          3. The Two-Legged Forwarding Cost Multiplier
        </h2>
        <p>
          When an organization sets up an IVR system where incoming calls forward to agents&apos; personal mobile handsets, two telecom legs are established:
        </p>

        <div className="space-y-3 my-4">
          <div className="border-l-4 border-blue-500 pl-4 py-1 space-y-1">
            <h4 className="font-bold text-slate-900">Leg A: Customer to Cloud PBX (Inbound)</h4>
            <p className="text-xs text-slate-600">
              The customer dials your virtual number. If it is a virtual mobile number or STD DID, the customer pays their own telecom carrier for standard calling.
            </p>
          </div>

          <div className="border-l-4 border-amber-500 pl-4 py-1 space-y-1">
            <h4 className="font-bold text-slate-900">Leg B: Cloud PBX to Agent Mobile (Outbound Forwarding)</h4>
            <p className="text-xs text-slate-600">
              The cloud PBX places an outbound call to the agent&apos;s mobile phone over cellular PSTN. Your business is billed for Leg B airtime for the entire duration of the conversation.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">How to Eliminate Leg B Costs</h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            By equipping telecallers with <strong>browser-based WebRTC softphones</strong> on their laptops or companion Android Wi-Fi apps, Leg B audio travels over encrypted IP data (DTLS-SRTP). Because no cellular PSTN outdial occurs on Leg B, <strong>Leg B call charges drop to ₹0</strong>.
          </p>
        </div>
      </section>

      {/* SECTION 4 */}
      <section id="did-comparison" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          4. 10-Digit Virtual Mobile Numbers vs. 1800 Toll-Free Economics
        </h2>
        <p>
          Choosing the right inbound number type directly impacts both caller perception and monthly telecom spend:
        </p>

        <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold text-slate-900">Number Format</TableHead>
                <TableHead className="font-bold text-slate-900">Who Pays for the Inbound Call?</TableHead>
                <TableHead className="font-bold text-slate-900">Typical Business Cost</TableHead>
                <TableHead className="font-bold text-slate-900">Best Application</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              <TableRow>
                <TableCell className="font-bold text-blue-700">10-Digit Virtual Mobile DID</TableCell>
                <TableCell>Caller uses their bundled mobile plan</TableCell>
                <TableCell>Low monthly rental; zero inbound airtime fee</TableCell>
                <TableCell>Sales inquiries, WhatsApp contact numbers, marketing ads</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-slate-900">1800 Toll-Free Number</TableCell>
                <TableCell>Free for caller; <strong>Business pays 100%</strong> of inbound minutes</TableCell>
                <TableCell>Higher monthly rental + per-minute inbound charge (~₹1.20–₹1.80/min)</TableCell>
                <TableCell>Large enterprise customer care, grievance redressal, BFSI helpline</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* SECTION 5 */}
      <section id="pricing-calculator" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-600" />
          5. Estimating Your Monthly Telephony Budget
        </h2>
        <p>
          Before committing to an annual contract with any telephony provider, model your monthly requirements using our interactive calculator:
        </p>

        <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 my-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-slate-900">Try the Interactive Telecom Cost Calculator</h3>
            <p className="text-xs text-slate-600">
              Adjust agent seat counts, estimated call minutes, pulse durations, and virtual DIDs to simulate your transparent monthly invoice.
            </p>
          </div>
          <Button asChild variant="primary" size="default" className="shrink-0 text-xs">
            <Link href="/pricing/calculator/">
              <span>Launch Calculator</span>
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </ArticleLayout>
  );
}
