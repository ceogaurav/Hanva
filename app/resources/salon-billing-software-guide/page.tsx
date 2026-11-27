import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { buildSaasDemoWhatsAppUrl } from "@/lib/config";

export const metadata = {
  title: "Salon Billing Software in India: GST & POS Guide",
  description:
    "How Indian salons, spas, and studios streamline checkout: SAC 9997 service vs HSN retail GST invoicing, split POS tenders, cash Z-reports, and digital receipts.",
  alternates: {
    canonical: "https://www.hanva.in/resources/salon-billing-software-guide/",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.hanva.in/resources/salon-billing-software-guide/",
    siteName: "Hanva Technologies",
    title: "Salon Billing Software in India: GST Invoicing & POS Workflow Guide",
    description:
      "Front-desk billing accuracy for Indian single-outlet salons: inclusive vs exclusive GST, split POS payments, Z-reports, offline queues & PDF/HTML bills.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Salon Billing Software Guide India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Billing Software in India: GST & POS Guide | Hanva Technologies",
    description:
      "Practical guide to salon GST invoices, split payments, package redemptions, cash closing & offline resilience.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Salon Billing Software in India: GST Invoicing, Split POS & Cash Register Discipline",
  description:
    "Operational billing guide for Indian beauty salons, spas, and skin studios covering SAC 9997 services vs retail product HSN GST lines, split POS payments, Z-reports, and digital invoices.",
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
    "@id": "https://www.hanva.in/resources/salon-billing-software-guide/",
  },
};

const faqs = [
  {
    question: "How should a salon handle both treatments and retail bottles on one GST bill?",
    answer:
      "Under India's CBIC GST classification, salon services map to Heading 9997 SAC codes (such as 999721 for hairdressing, 999722 for cosmetic/facial care, and 999729 for beauty treatments) whereas over-the-counter shampoos or serums are taxable goods under their product HSN codes. Your POS should calculate item-level inclusive or exclusive GST per line rather than forcing one flat rate across everything. Always verify applicable CBIC notification slabs with your Chartered Accountant.",
  },
  {
    question: "Does Hanva Salon Software support split payments at checkout?",
    answer:
      "Yes. At the front desk, cashiers can settle a single invoice across split POS tender modes—such as part UPI/Card, Cash, loyalty points, prepaid wallet balance, or gift card redemption—alongside idempotent checkout protection against double clicks.",
  },
  {
    question: "What happens if the salon Wi-Fi drops while billing weekend walk-ins?",
    answer:
      "Hanva Salon Software includes an IndexedDB offline queue in the browser so receptionists can keep processing checkouts smoothly during brief connectivity drops and reconcile cleanly once network access resumes.",
  },
  {
    question: "Does Hanva Salon Software support multi-branch chains or Razorpay checkout?",
    answer:
      "No. Hanva Salon Software is engineered for single-outlet salons, spas, and skin clinics. It does not offer multi-branch outlet switching, Razorpay online payment gateways, or standalone SMS gateways.",
  },
  {
    question: "How is Hanva Salon Software priced?",
    answer:
      "Contact us for pricing and a live product demo via WhatsApp (+91 8423711043).",
  },
];

export default function SalonBillingSoftwareGuidePage() {
  return (
    <ArticleLayout
      pillarBadge="Cluster B: Hanva Salon Software"
      pillarHref="/products/salon-software/"
      title="Salon Billing Software in India: GST Invoicing, Split POS &amp; Z-Reports"
      subtitle="Eliminate slow reception queues, GST mismatches between services and retail items, manual commission calculations, and end-of-day drawer variances inside single-outlet Indian salons and spas."
      readTime="10 min read"
      publishDate="November 2026"
      whatsappRef="/resources/salon-billing-software-guide/"
      customWhatsappUrl={buildSaasDemoWhatsAppUrl("salon")}
      ctaButtonLabel="Request a Hanva Salon Software Demo"
      ctaBannerTitle="Modernize Your Salon Reception & GST Billing Desk"
      ctaBannerDescription="Book a WhatsApp walkthrough of Hanva Salon Software—covering inclusive/exclusive GST invoices, split POS payments, digital bills, and Z-reports. Contact us for pricing."
      relatedHeading="Related Salon Operations Resources"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "Salon Billing Software Guide" },
      ]}
      executiveSummary="Salon front desks combine high weekend ticket concurrency with complex invoice edge cases: a single customer often redeems a prepaid session package, adds a retail serum, applies a festive coupon, splits payment between UPI and cash, and requests an itemized GST bill. Proper billing software separates service SAC vs retail HSN tax handling, automates Z-report cash drawer audits, and keeps reception running even through brief Wi-Fi drops."
      tableOfContents={[
        { id: "billing-gaps", title: "1. Why Manual Registers & Spreadsheets Fail at Rush Hour" },
        { id: "gst-sac-hsn", title: "2. India GST Rules: Services (SAC 9997) vs Retail Goods" },
        { id: "checkout-tenders", title: "3. Split POS Tenders, Packages & Digital Bills" },
        { id: "cash-zreport", title: "4. Cash Registers, Expense Tracking & Offline Resilience" },
        { id: "verified-fit", title: "5. Front-Desk Checklist & Hanva Salon Software Scope" },
      ]}
      schemaData={articleSchema}
      relatedProducts={[
        {
          title: "Hanva Salon Software",
          description: "GST checkout, cash registers, public digital bills, PIN staff portal & auto-consumption.",
          href: "/products/salon-software/",
        },
        {
          title: "Salon Software Buyer Guide",
          description: "Compare complete small-salon vs growing-studio evaluation criteria.",
          href: "/resources/salon-management-software-guide/",
        },
        {
          title: "Salon Appointment Management Guide",
          description: "Coordinate calendars, chair/room resources, waitlists & /book/[slug] mini-websites.",
          href: "/resources/salon-appointment-management-guide/",
        },
      ]}
      faqs={faqs}
    >
      <section id="billing-gaps" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">1. Why Manual Registers &amp; Spreadsheets Fail at Rush Hour</h2>
        <p>
          Many independent salons handle weekday traffic on basic calculators or generic billing apps, only to hit bottlenecks every Friday through Sunday afternoon. When reception must flip through rate cards, manually subtract membership credits, check which stylist performed each add-on, and type UPI amounts into WhatsApp notes, clients wait in line and errors multiply.
        </p>
        <p>
          Automated checkout binds three operational records inside a single receipt: exact tax computation, stylist credit attribution for tiered commissions, and automatic inventory deduction for linked back-bar products.
        </p>
      </section>

      <section id="gst-sac-hsn" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">2. India GST Rules: Services (SAC 9997) vs Retail Goods</h2>
        <p>
          Once a beauty business crosses statutory turnover thresholds (or opts for regular GST registration), billing software must distinguish between **services** and **physical retail items** cleanly:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li>
            <strong>Beauty &amp; Hair Service SAC Codes (Chapter 99 / Heading 9997):</strong> CBIC classifications organize hairdressing and barber services under <code>SAC 999721</code>, facial/cosmetic treatments and manicure-pedicure services under <code>SAC 999722</code>, and other beauty treatments under <code>SAC 999729</code>.
          </li>
          <li>
            <strong>Retail Home-Care Products (HSN Codes):</strong> Conditioners, serums, hair oils, and grooming kits sold over the counter are supply of physical goods taxed under their respective HSN product classifications rather than bundled service slabs.
          </li>
          <li>
            <strong>Tax-Inclusive vs Exclusive Rate Cards:</strong> Walk-in Indian customers expect total MRP-style menu prices inclusive of GST, whereas corporate or wedding invoices frequently require base rate plus separate CGST/SGST (intra-state) or IGST (inter-state) lines.
          </li>
        </ul>
        <p className="text-xs text-slate-600">
          <strong>Tax Compliance Note:</strong> CBIC GST slab notifications and composition/ITC rules for beauty parlour services evolve periodically—always confirm exact SAC/HSN rates and ITC eligibility for your outlet with a qualified Chartered Accountant.
        </p>
      </section>

      <section id="checkout-tenders" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">3. Split POS Tenders, Packages &amp; Digital Bills</h2>
        <p>
          Modern salon checkout goes well beyond cash and card. When a bridal package or monthly skincare client arrives, billing software must handle mixed redemptions effortlessly without double counting revenue:
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Verified Checkout Capabilities in Hanva Salon Software:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Walk-In Auto-Creation &amp; Idempotency:</strong> Receptionists can bill new walk-ins rapidly with auto-created customer records and idempotent submission keys preventing accidental duplicate bills on slow connections.</li>
            <li><strong>Split POS Payments &amp; Redemptions:</strong> Combine cash, card, UPI, gift cards, customer wallet balances, coupon discounts, and loyalty redemptions seamlessly on one checkout ticket.</li>
            <li><strong>Session-Deducting Packages &amp; Memberships:</strong> Track remaining sessions on multi-sitting hair/skin packages alongside freeze-capable memberships so reception never argues over paper punch cards.</li>
            <li><strong>Shareable Digital &amp; Printable Bills:</strong> Deliver instant public digital receipts alongside browser HTML/PDF invoice printing (built with jsPDF / print utilities) rather than wasting reams of A4 paper.</li>
          </ul>
        </div>
      </section>

      <section id="cash-zreport" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">4. Cash Registers, Expense Tracking &amp; Offline Resilience</h2>
        <h3 className="text-lg font-semibold text-slate-900">End-of-Day Z-Reports &amp; Petty Cash</h3>
        <p>
          Revenue leakage frequently happens in till management rather than discounts. Integrated cash registers log opening drawer cash, cash inflows, petty shop expenses (tea, courier, laundry), and actual cash counted at closing—producing structured Z-reports alongside daily revenue analytics.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">IndexedDB Offline Checkout Queue</h3>
        <p>
          Cloud software becomes a bottleneck if weak Wi-Fi freezes the front counter. Browser-resident IndexedDB queueing saves completed checkout operations locally during temporary disconnections and synchronizes cleanly once connectivity stabilizes. For how reception scheduling connects directly into billing, pair this guide with our{" "}
          <Link href="/resources/salon-appointment-management-guide/" className="text-blue-600 font-semibold hover:underline">
            Salon Appointment &amp; Booking Management Guide
          </Link>
          .
        </p>
      </section>

      <section id="verified-fit" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">5. Front-Desk Checklist &amp; Verified Hanva Salon Software Scope</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <th className="p-3.5 font-bold">Billing Requirement</th>
                <th className="p-3.5 font-bold">Verified Hanva Salon Software Capability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">GST Tax Calculation</td>
                <td className="p-3.5">Supports tax-inclusive &amp; exclusive billing for services and retail items</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Payment Flexibility</td>
                <td className="p-3.5">Split POS payments, prepaid wallets, gift cards, loyalty points &amp; coupons</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Invoices &amp; Closing</td>
                <td className="p-3.5">Public shareable digital receipts, PDF/HTML print bills, cash registers &amp; Z-reports</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Explicit Scope Boundaries</td>
                <td className="p-3.5">Single-outlet focus (excludes multi-branch switching, Razorpay &amp; SMS gateway claims)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-700">
          Ready to test front-desk checkout speed for your studio? Review full{" "}
          <Link href="/products/salon-software/" className="text-blue-600 font-semibold hover:underline">
            Hanva Salon Software features
          </Link>{" "}
          or start a demo chat on WhatsApp. Contact us for pricing.
        </p>
      </section>
    </ArticleLayout>
  );
}
