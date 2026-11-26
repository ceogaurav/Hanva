import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { buildSaasDemoWhatsAppUrl } from "@/lib/config";

export const metadata = {
  title: "Restaurant POS Software India: Billing, KOT & Inventory",
  description:
    "Practical buying guide for restaurant POS software in India: dine-in/takeaway/delivery workflows, KOT vs Kitchen Display System (KDS), CGST/SGST billing, UPI QR, QR ordering, and recipe inventory.",
  alternates: {
    canonical: "https://www.hanva.in/resources/restaurant-pos-kot-inventory-guide/",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.hanva.in/resources/restaurant-pos-kot-inventory-guide/",
    siteName: "Hanva Technologies",
    title: "Restaurant POS Software in India: Billing, KOT, Inventory and Buying Guide",
    description:
      "Compare POS billing, KOT, KDS, QR ordering, and recipe BOM inventory for Indian restaurants, cafes, QSRs, and cloud kitchens.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Restaurant POS Software Buying Guide India" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Restaurant POS Software in India: Billing, KOT, Inventory and Buying Guide",
  description:
    "Practical guide explaining POS billing, Kitchen Order Tickets (KOT), Kitchen Display Systems (KDS), India GST splits, QR self-ordering, and recipe inventory.",
  author: {
    "@type": "Organization",
    name: "Hanva Engineering & Editorial Board",
    url: "https://www.hanva.in",
  },
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    logo: { "@type": "ImageObject", url: "https://www.hanva.in/logo.png" },
  },
  datePublished: "2026-11-26",
  dateModified: "2026-11-26",
  mainEntityOfPage: "https://www.hanva.in/resources/restaurant-pos-kot-inventory-guide/",
};

const faqs = [
  {
    question: "What is the practical difference between POS billing, KOT, and KDS?",
    answer:
      "POS billing handles customer orders, modifiers, GST tax calculation, and payment settlement at the counter or table. KOT (Kitchen Order Ticket) routes food items by preparation station via printer or queue, while a KDS (Kitchen Display System) shows live digital prep tickets on kitchen screens with status tracking.",
  },
  {
    question: "Does Hanva Restaurant POS continue billing if the internet disconnects?",
    answer:
      "Yes. Hanva Restaurant POS includes an IndexedDB offline order queue that continues capturing orders locally and syncs once connectivity returns.",
  },
  {
    question: "Does Hanva Restaurant POS include built-in Swiggy or Zomato connectors?",
    answer:
      "No. Direct Swiggy/Zomato/UberEats adapters are not built in natively; however, Hanva Restaurant POS provides a scoped Partner REST API and signed webhooks for custom ordering integrations.",
  },
  {
    question: "How is Hanva Restaurant POS priced?",
    answer:
      "Contact us for pricing and a technical demonstration via WhatsApp (+91 8423711043).",
  },
];

export default function RestaurantPosGuidePage() {
  return (
    <ArticleLayout
      pillarBadge="Restaurant Operations Guide"
      pillarHref="/products/restaurant-pos/"
      title="Restaurant POS Software in India: Billing, KOT, Inventory and Buying Guide"
      subtitle="A practical breakdown of billing speed, India CGST/SGST compliance, KOT vs Kitchen Display Systems, QR self-ordering, and recipe-level ingredient inventory for cafes, QSRs, and dine-in restaurants."
      readTime="12 min read"
      publishDate="November 2026"
      whatsappRef="/resources/restaurant-pos-kot-inventory-guide/"
      customWhatsappUrl={buildSaasDemoWhatsAppUrl("pos")}
      ctaButtonLabel="Request a Hanva Restaurant POS Demo"
      ctaBannerTitle="See Hanva Restaurant POS in Action"
      ctaBannerDescription="Contact us for pricing and a live technical walkthrough of dine-in POS, KDS, QR ordering, India GST receipts, and recipe BOM inventory."
      relatedHeading="Related Hospitality & Engineering Solutions"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "Restaurant POS & KOT Guide" },
      ]}
      executiveSummary="Modern restaurant POS software connects front-of-house speed (counter billing, table management, QR ordering, UPI settlement) with back-of-house discipline (station-routed KOTs, Kitchen Display Systems, duplicate-print protection, and FIFO/WAC recipe stock depletion). This guide clarifies how each layer works so Indian restaurateurs can evaluate POS systems without paying for hype."
      tableOfContents={[
        { id: "pos-vs-kot-kds", title: "1. POS Billing vs KOT vs KDS Explained" },
        { id: "gst-payments-qr", title: "2. India GST, Split Payments, UPI QR & QR Ordering" },
        { id: "menu-inventory", title: "3. Menu, Recipe BOM Inventory & Reporting" },
        { id: "format-fit", title: "4. Choosing for Cafes vs Cloud Kitchens vs QSRs" },
        { id: "checklist-hanva", title: "5. Evaluation Checklist & Verified Hanva POS Fit" },
      ]}
      schemaData={articleSchema}
      relatedProducts={[
        {
          title: "Hanva Restaurant POS",
          description: "Offline-resilient POS, KDS, QR ordering, India CGST/SGST & recipe BOM inventory.",
          href: "/products/restaurant-pos/",
        },
        {
          title: "API Integration & Automation",
          description: "Connect Partner REST APIs & webhooks with custom ordering storefronts.",
          href: "/software-development/api-integration-automation/",
        },
        {
          title: "Digital Marketing Services",
          description: "Grow local restaurant discovery through search and Google Ads.",
          href: "/digital-marketing/",
        },
      ]}
      faqs={faqs}
    >
      <section id="pos-vs-kot-kds" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">1. POS Billing vs KOT vs KDS: What Each Layer Does</h2>
        <p>
          During dinner rush hours, restaurants suffer when handwritten captain slips go missing, modifiers (<em>&quot;no onion&quot;, &quot;extra spice&quot;</em>) are misread, or kitchen stations cook duplicate dishes. Understanding the separation between three core modules helps buyers pick the right operational setup:
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <th className="p-3.5 font-bold">Module</th>
                <th className="p-3.5 font-bold">Primary User</th>
                <th className="p-3.5 font-bold">Practical Role in Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">POS Billing</td>
                <td className="p-3.5">Cashier / Floor Captain</td>
                <td className="p-3.5">Captures dine-in/takeaway/delivery orders, modifiers, discounts, GST calculation, and tender settlement.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">KOT (Kitchen Order Ticket)</td>
                <td className="p-3.5">Kitchen Station Printer / Queue</td>
                <td className="p-3.5">Splits order items by station (bar, grill, tandoor) so cooks receive clear preparation instructions without prices.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">KDS (Kitchen Display System)</td>
                <td className="p-3.5">Head Chef / Expediter Screen</td>
                <td className="p-3.5">Displays live digital tickets, order states (New → Preparing → Ready → Served), and duplicate-print protection.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="gst-payments-qr" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">2. India GST, Payment Workflows &amp; Table QR Ordering</h2>
        <p>
          Indian F&amp;B outlets require accurate tax engines supporting inclusive and exclusive GST configuration, automatic <strong>50/50 CGST/SGST receipt splits</strong>, and clean tax summary reports for accounting reconciliation.
        </p>
        <p>
          On payment speed, customers increasingly expect instant UPI QR scanning alongside cash, cards, gift cards, or store credits. Generating dynamic NPCI UPI QR codes directly from the payable order balance reduces manual amount-entry errors at busy counters. For dine-in tables, rotating table QR menus allow guests to browse dietary tags (veg/vegan/Jain/halal/allergens) and place self-service orders directly into the POS/kitchen flow alongside Captain PWAs.
        </p>
      </section>

      <section id="menu-inventory" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">3. Menu Management, Recipe Inventory &amp; Restaurant Reports</h2>
        <p>
          Finished-item counters alone cannot detect kitchen pilferage or portion drift. Linking menu items to a <strong>Recipe Bill of Materials (BOM)</strong> lets inventory auto-deplete underlying raw ingredients (using FIFO or weighted-average costing) each time a dish is sold, backed by purchase requisitions, POs, GRNs, supplier invoices, and waste logs.
        </p>
        <p>
          Managers should inspect daily sales breakdowns, food-cost variance, menu engineering reports, tax summaries, waste logs, KDS prep times, and cash Z-reports with clean CSV/XLSX/PDF exports.
        </p>
      </section>

      <section id="format-fit" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">4. Choosing POS Software for Cafes vs Cloud Kitchens vs QSRs</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
          <li><strong>Cafes &amp; Bakeries:</strong> Prioritize fast modifier/combo selection (milk variants, add-ons, half-price items), Happy Hour promotions, and offline IndexedDB queueing during Wi-Fi drops.</li>
          <li><strong>QSRs &amp; Food Courts:</strong> Look for high-speed counter POS, Customer Display confirmation screens, self-service Kiosk PWA support, and instant UPI QR settlement.</li>
          <li><strong>Cloud Kitchens:</strong> Focus on multi-station KDS boards, strict duplicate-KOT guards, recipe BOM inventory depletion, and Partner REST APIs/webhooks for custom or third-party ordering flows.</li>
        </ul>
      </section>

      <section id="checklist-hanva" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">5. Common Implementation Mistakes &amp; Verified Hanva Restaurant POS Fit</h2>
        <p>
          <strong>Implementation mistakes to avoid:</strong> Skipping offline-mode testing during demos; overlooking duplicate-KOT safeguards; and neglecting role-based permissions (discounts, voids, refunds) across cashiers and captains.
        </p>
        <p>
          <strong>Verified Hanva Restaurant POS capabilities:</strong> <Link href="/products/restaurant-pos/" className="text-blue-600 font-semibold hover:underline">Hanva Restaurant POS</Link> delivers dine-in/takeaway/delivery POS billing, IndexedDB offline order queueing, Captain PWA, Customer Display, Kiosk PWA, visual floor/table designer, rotating table QR self-ordering, station-routed KOT &amp; live KDS with duplicate-print guard, India GST (50/50 CGST/SGST split), multi-tender split payments + dynamic NPCI UPI QR, FIFO/WAC recipe BOM auto-depletion &amp; procurement, 22 reports (CSV/XLSX/PDF), 105+ RBAC permissions + PIN + TOTP 2FA, and scoped Partner REST API + signed webhooks. <em>(Transparency note: Direct native Swiggy/Zomato connectors and 1-order-to-2-bills split billing are not included natively, and per-branch UserBranch enforcement remains under engineering roadmap.)</em> Contact us for pricing and a live demo.
        </p>
      </section>
    </ArticleLayout>
  );
}
