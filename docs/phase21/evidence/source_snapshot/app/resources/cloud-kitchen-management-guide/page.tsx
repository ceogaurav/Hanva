import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { buildSaasDemoWhatsAppUrl } from "@/lib/config";

export const metadata = {
  title: "Cloud Kitchen Management Guide: KDS, BOM & APIs",
  description:
    "How Indian cloud kitchens control dispatch speed and food margins: station KDS boards, duplicate-KOT guards, FIFO/WAC recipe BOM inventory, Delivery Zones & Partner APIs.",
  alternates: {
    canonical: "https://www.hanva.in/resources/cloud-kitchen-management-guide/",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.hanva.in/resources/cloud-kitchen-management-guide/",
    siteName: "Hanva Technologies",
    title: "Cloud Kitchen Management Guide: KDS Routing, Recipe BOM & Webhooks",
    description:
      "Manage delivery kitchens accurately using KDS prep boards, FIFO/WAC recipe inventory, pincode delivery zones, and scoped REST APIs without aggregator bloat.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Cloud Kitchen Management Guide India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Kitchen Management Guide: KDS, BOM & APIs | Hanva Technologies",
    description:
      "Kitchen prep discipline, FIFO/WAC ingredient costing, delivery zones & Partner REST API integrations for cloud kitchens.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cloud Kitchen Management Guide: KDS Discipline, Recipe BOM Costing & API Workflows",
  description:
    "Operational architecture guide for Indian delivery-first kitchens covering Kitchen Display Systems, duplicate-print guards, FIFO/WAC ingredient depletion, and REST API/webhook bridges.",
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
    "@id": "https://www.hanva.in/resources/cloud-kitchen-management-guide/",
  },
};

const faqs = [
  {
    question: "Does Hanva Restaurant POS include built-in Swiggy or Zomato buttons?",
    answer:
      "No. Direct native Swiggy, Zomato, or UberEats adapters are NOT built into Hanva Restaurant POS, and it does not ship a standalone consumer web delivery storefront. Instead, operators integrate external ordering feeds through the scoped Partner REST API and signed outbound webhooks.",
  },
  {
    question: "How does a Kitchen Display System (KDS) improve cloud kitchen dispatch speed?",
    answer:
      "Station-routed KDS displays keep wok, grill, cold-prep, and packing lines aligned in real time from NEW through SERVED/REJECTED statuses, while a duplicate-print guard (409 ALREADY_PRINTED) prevents accidental double cooking.",
  },
  {
    question: "How is recipe inventory depletion calculated in Hanva Restaurant POS?",
    answer:
      "Ingredients link to menu items through Bill-of-Materials (BOM) recipes depleted automatically via FIFO or Weighted Average Cost (WAC) logic into an append-only StockMovement ledger alongside waste logs and food-cost reports.",
  },
  {
    question: "What GST treatment applies to cloud kitchens in India?",
    answer:
      "Under CBIC guidance, standalone cloud kitchens follow standard restaurant service taxation (5% GST without ITC), and when orders fulfill through e-commerce operators, Section 9(5) sets marketplace tax collection responsibilities. Confirm exact accounting treatments with your Chartered Accountant.",
  },
  {
    question: "How can a cloud kitchen operator evaluate or price Hanva Restaurant POS?",
    answer:
      "Contact us for pricing and a live technical walkthrough via WhatsApp (+91 8423711043).",
  },
];

export default function CloudKitchenManagementGuidePage() {
  return (
    <ArticleLayout
      pillarBadge="Cluster C: Hanva Restaurant POS"
      pillarHref="/products/restaurant-pos/"
      title="Cloud Kitchen Management Guide: KDS Routing, Recipe BOM &amp; Partner APIs"
      subtitle="Build tight kitchen-to-rider throughput and control raw-material margins across delivery-first brands using station KDS boards, FIFO/WAC recipe depletion, pincode zones, and scoped APIs."
      readTime="10 min read"
      publishDate="November 2026"
      whatsappRef="/resources/cloud-kitchen-management-guide/"
      customWhatsappUrl={buildSaasDemoWhatsAppUrl("pos")}
      ctaButtonLabel="Request a Hanva Restaurant POS Demo"
      ctaBannerTitle="Tighten KDS Throughput & Recipe Cost Control"
      ctaBannerDescription="Chat with Hanva on WhatsApp to explore KDS prep boards, duplicate-KOT protection, FIFO/WAC BOM inventory, and our scoped Partner REST API. Contact us for pricing."
      relatedHeading="Related Kitchen & Hospitality Guides"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "Cloud Kitchen Management Guide" },
      ]}
      executiveSummary="Without a dining floor, a cloud kitchen wins or loses on two operational metrics: order-to-pack preparation accuracy and real recipe food cost percentage. Paper tickets getting wet near fryers, duplicate KOT dispatches wasting protein, and missing raw-ingredient variance tracking quietly erase delivery margins. Structured Kitchen Display Systems, duplicate-print locks, FIFO/WAC BOM depletion, and API/webhook clarity keep delivery brands lean."
      tableOfContents={[
        { id: "kds-prep-discipline", title: "1. Station KDS Routing & Duplicate-Print Prevention" },
        { id: "bom-inventory-fifo", title: "2. Recipe BOM Costing, FIFO/WAC Depletion & Procurement" },
        { id: "delivery-zones-riders", title: "3. Direct Delivery Zones, Driver Dispatch & 5% GST" },
        { id: "aggregator-api-boundary", title: "4. Aggregator Reality: Partner REST API vs Native Claims" },
        { id: "kitchen-checklist", title: "5. Cloud Kitchen Capability Matrix & Hanva POS Fit" },
      ]}
      schemaData={articleSchema}
      relatedProducts={[
        {
          title: "Hanva Restaurant POS",
          description: "KDS station displays, FIFO/WAC recipe inventory, 22 reports & Partner REST API.",
          href: "/products/restaurant-pos/",
        },
        {
          title: "Restaurant Billing Software Guide",
          description: "Understand India CGST/SGST splits, UPI QR & offline IndexedDB counter sync.",
          href: "/resources/restaurant-billing-software-guide/",
        },
        {
          title: "API Integration & Automation",
          description: "Engineer custom middleware between marketplace webhooks and internal POS systems.",
          href: "/software-development/api-integration-automation/",
        },
      ]}
      faqs={faqs}
    >
      <section id="kds-prep-discipline" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">1. Station KDS Routing &amp; Duplicate-Print Prevention</h2>
        <p>
          In high-density delivery kitchens running overlapping brands or combos out of compact bays, paper KOT strips create immediate bottlenecks—faded thermal ink from steam, dropped tickets during rider handoff, and missed allergen modifiers.
        </p>
        <p>
          Replacing chaotic counter shouting with a **Kitchen Display System (KDS)** routes appetizers, curries, bakery items, and beverages automatically to their matching preparation station, tracks status progression (`NEW` through `SERVED` or `REJECTED`), exposes live kitchen timing performance, and enforces duplicate-print locks so a hurried cashier clicking print twice cannot trigger double prep waste. For dine-in vs KOT architecture comparisons, review our{" "}
          <Link href="/resources/restaurant-pos-kot-inventory-guide/" className="text-blue-600 font-semibold hover:underline">
            Restaurant POS, KOT &amp; Inventory Guide
          </Link>
          .
        </p>
      </section>

      <section id="bom-inventory-fifo" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">2. Recipe BOM Costing, FIFO/WAC Depletion &amp; Procurement</h2>
        <p>
          Menu engineering without raw-material discipline leaves delivery operators blind to rising dairy, oil, or packaging costs. Clean cloud-kitchen back offices connect sales directly to pantry ledgers:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Recipe Bill of Materials (BOM):</strong> Map standard grams/milliliters of raw ingredients to every dish, modifier, and combo size so orders deplete pantry stock automatically upon billing.</li>
          <li><strong>FIFO &amp; Weighted Average Cost (WAC):</strong> Track ingredient batch cost fluctuations accurately using append-only `StockMovement` logs alongside manual spoilage/waste adjustments.</li>
          <li><strong>Structured Procurement Pipeline:</strong> Run requisitions, quotations, purchase orders (PO), Goods Received Notes (GRN), and supplier invoices coherently—supported by 22 built-in operational dashboards including `food-cost`, `menu-engineering`, `waste`, and `sales-daily`.</li>
        </ul>
        <p className="text-xs text-slate-600">
          <strong>Verified Operational Caveat:</strong> While low-stock status views and GRN procurement exist cleanly inside Hanva Restaurant POS, cross-unit automatic conversions and push/email low-stock alerts remain future roadmap items rather than active push notifications.
        </p>
      </section>

      <section id="delivery-zones-riders" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">3. Direct Delivery Zones, Driver Dispatch &amp; 5% GST</h2>
        <p>
          For direct telephone/counter delivery orders dispatched by in-house riders, configuring `DeliveryZone` parameters (pincode matching, minimum order threshold, estimated prep-delivery ETA, and delivery fees) keeps rider assignment organized from `UNASSIGNED` through `DELIVERED`.
        </p>
        <p>
          From a tax perspective, standalone Indian cloud kitchens fall under regular restaurant service treatment (5% GST without ITC under CBIC notifications), while marketplace orders attract Section 9(5) e-commerce operator rules—requiring clear report reconciliation with your Chartered Accountant. Review full tax mechanics in our{" "}
          <Link href="/resources/restaurant-billing-software-guide/" className="text-blue-600 font-semibold hover:underline">
            Restaurant Billing Software GST Guide
          </Link>
          .
        </p>
      </section>

      <section id="aggregator-api-boundary" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">4. Aggregator Reality: Partner REST API vs Native Claims</h2>
        <p>
          Transparency matters before signing any POS contract. Many buyers assume every hospitality POS comes with zero-config live buttons inside Zomato or Swiggy seller dashboards.
        </p>
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 space-y-2 text-sm text-slate-800">
          <p className="font-bold text-slate-900">Explicit Architecture Boundary in Hanva Restaurant POS:</p>
          <p>
            <strong>Hanva Restaurant POS does NOT include native Swiggy, Zomato, or UberEats UI connectors or a standalone customer web ordering storefront.</strong> Instead, the NestJS backend exposes scoped <code>IntegrationApiKey</code> Partner REST endpoints, Swagger documentation, and signed outbound webhooks protected against SSRF—allowing our{" "}
            <Link href="/software-development/api-integration-automation/" className="text-blue-700 font-semibold hover:underline">
              API Integration &amp; Automation team
            </Link>{" "}
            or your in-house developers to connect approved ordering middleware cleanly without brittle hacks.
          </p>
        </div>
      </section>

      <section id="kitchen-checklist" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">5. Cloud Kitchen Capability Matrix &amp; Hanva POS Fit</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <th className="p-3.5 font-bold">Cloud Kitchen Area</th>
                <th className="p-3.5 font-bold">Verified Hanva Restaurant POS Capability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Kitchen Dispatch</td>
                <td className="p-3.5">Station-split KDS board, status workflow, <code>409</code> duplicate-print lock &amp; timing metrics</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Inventory &amp; Food Cost</td>
                <td className="p-3.5">Recipe BOMs, FIFO/WAC stock depletion, PR/PO/GRN pipeline &amp; food-cost report</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Direct Delivery &amp; Offline</td>
                <td className="p-3.5">Pincode Delivery Zones, rider dispatch workflow &amp; IndexedDB offline queue</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Aggregator &amp; Multi-Outlet Scope</td>
                <td className="p-3.5">Partner REST API &amp; signed webhooks (no native Swiggy/Zomato connectors; partial multi-branch RBAC)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-700">
          Review complete modules on the{" "}
          <Link href="/products/restaurant-pos/" className="text-blue-600 font-semibold hover:underline">
            Hanva Restaurant POS product page
          </Link>{" "}
          or start a demo conversation on WhatsApp. Contact us for pricing.
        </p>
      </section>
    </ArticleLayout>
  );
}
