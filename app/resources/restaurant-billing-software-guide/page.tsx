import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { buildSaasDemoWhatsAppUrl } from "@/lib/config";

export const metadata = {
  title: "Restaurant Billing Software India: GST, UPI & Offline",
  description:
    "Indian guide to restaurant billing software: CGST/SGST splits (5% vs 18% context), dynamic NPCI UPI QR, multi-tender split payments, offline queues & thermal bridges.",
  alternates: {
    canonical: "https://www.hanva.in/resources/restaurant-billing-software-guide/",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.hanva.in/resources/restaurant-billing-software-guide/",
    siteName: "Hanva Technologies",
    title: "Restaurant Billing Software in India: GST, UPI QR & Offline POS",
    description:
      "Fast dine-in, takeaway, and delivery counter billing for Indian restaurants with CGST/SGST compliance, multi-tender split payments, and offline IndexedDB sync.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Restaurant Billing Software India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Billing Software India: GST, UPI & Offline | Hanva Technologies",
    description:
      "Indian restaurant POS billing guide: 50/50 CGST/SGST splits, dynamic UPI QR, split payments, Z-reports & offline resilience.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Restaurant Billing Software in India: GST Splits, UPI QR, Split Tenders & Offline Resilience",
  description:
    "Practical technical guide to Indian restaurant counter billing: CBIC GST restaurant rules, dynamic NPCI UPI QR, multi-tender split payments, offline IndexedDB queuing, and print bridges.",
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
    "@id": "https://www.hanva.in/resources/restaurant-billing-software-guide/",
  },
};

const faqs = [
  {
    question: "How does India GST work on standalone restaurant bills vs hotel premises?",
    answer:
      "Under CBIC Notification No. 11/2017-Central Tax (Rate) as amended, standalone restaurants, cafes, QSRs, and cloud kitchens typically charge 5% GST (2.5% CGST + 2.5% SGST) without claiming Input Tax Credit (ITC), whereas restaurant services inside specified hotel premises with unit accommodation tariffs exceeding INR 7,500 charge 18% GST with ITC. Always verify applicability with your Chartered Accountant.",
  },
  {
    question: "What is the difference between split payment and split bill?",
    answer:
      "Split payment (supported natively in Hanva Restaurant POS) lets a table settle one combined invoice using multiple tender modes—such as part Cash, part UPI, part Card, or Gift Card/Wallet. Splitting one single order ticket into two separate itemized tax invoices (split bill) is NOT currently implemented in the verified codebase.",
  },
  {
    question: "Does billing stop if our restaurant router loses internet mid-service?",
    answer:
      "No. Hanva Restaurant POS stores new orders inside an IndexedDB offline queue (hanva_pos_offline) locally on the terminal and synchronizes cleanly once connectivity returns.",
  },
  {
    question: "Does Hanva Restaurant POS include built-in Swiggy or Zomato buttons?",
    answer:
      "No native Swiggy or Zomato UI adapters ship inside Hanva Restaurant POS. Instead, the backend offers a scoped Partner REST API and signed outbound webhooks for external aggregator middleware.",
  },
  {
    question: "What thermal printer hardware does Hanva Restaurant POS support?",
    answer:
      "In addition to browser HTML receipts, the codebase includes direct USB/LAN ESC/POS receipt logic and a Windows print-bridge utility—which should be verified directly against your kitchen/counter printer hardware during technical onboarding. Contact us for pricing and demo scheduling.",
  },
];

export default function RestaurantBillingSoftwareGuidePage() {
  return (
    <ArticleLayout
      pillarBadge="Cluster C: Hanva Restaurant POS"
      pillarHref="/products/restaurant-pos/"
      title="Restaurant Billing Software in India: GST Splits, UPI QR &amp; Offline Resilience"
      subtitle="A detailed guide for Indian cafes, QSRs, and dine-in restaurants comparing counter speed, CGST/SGST receipt structure, multi-tender settlements, offline order capture, and thermal print-bridge setups."
      readTime="11 min read"
      publishDate="November 2026"
      whatsappRef="/resources/restaurant-billing-software-guide/"
      customWhatsappUrl={buildSaasDemoWhatsAppUrl("pos")}
      ctaButtonLabel="Request a Hanva Restaurant POS Demo"
      ctaBannerTitle="Speed Up Peak-Hour Restaurant Billing & Cash Closing"
      ctaBannerDescription="Contact us on WhatsApp for pricing and a live demo of dine-in/takeaway POS, CGST/SGST bills, dynamic UPI QR, Z-reports, and offline order resilience."
      relatedHeading="Related Restaurant POS & Kitchen Guides"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "Restaurant Billing Software Guide" },
      ]}
      executiveSummary="Peak dinner service tests every weak link at a restaurant billing counter: slow modifier selection, unclear CGST/SGST splits, manual UPI confirmations, Wi-Fi freezes, or cash-drawer shortages during closing. Choosing reliable billing software means verifying multi-tender settlement, true offline order storage, permission-gated discounts, dynamic NPCI UPI QR display, and honest receipt-printer compatibility."
      tableOfContents={[
        { id: "billing-speed", title: "1. Dine-In, Takeaway & Delivery Order Flows" },
        { id: "india-gst-rules", title: "2. India CGST/SGST Tax Structure & Inclusive Pricing" },
        { id: "upi-split-tenders", title: "3. Dynamic NPCI UPI QR vs Split Payment Mechanics" },
        { id: "offline-hardware", title: "4. Offline Queue Sync, Z-Reports & Print Bridges" },
        { id: "verified-boundary", title: "5. Buyer Accuracy Table & Hanva Restaurant POS Fit" },
      ]}
      schemaData={articleSchema}
      relatedProducts={[
        {
          title: "Hanva Restaurant POS",
          description: "POS billing, KDS, QR table ordering, recipe BOM inventory & 22 built-in reports.",
          href: "/products/restaurant-pos/",
        },
        {
          title: "Restaurant POS, KOT & Inventory Guide",
          description: "Compare POS vs KOT vs Kitchen Display Systems across dining formats.",
          href: "/resources/restaurant-pos-kot-inventory-guide/",
        },
        {
          title: "Cloud Kitchen Management Guide",
          description: "Learn KDS prep discipline, FIFO/WAC BOM inventory & Partner REST API integrations.",
          href: "/resources/cloud-kitchen-management-guide/",
        },
      ]}
      faqs={faqs}
    >
      <section id="billing-speed" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">1. Dine-In, Takeaway &amp; Delivery Order Flows</h2>
        <p>
          Restaurant cashiers frequently switch contexts mid-minute—taking a dine-in table settlement while punching a walk-in parcel takeaway or assigning a direct phone/delivery-zone order. Good billing software distinguishes <code>DINE_IN</code>, <code>TAKEAWAY</code>, <code>DELIVERY</code>, and scheduled tickets cleanly from one order screen while capturing modifiers, half-portion pricing, combos, and Happy Hour promos without clunky pop-up trees.
        </p>
        <p>
          Floor-focused formats can add Captain PWA mobile ordering and table QR ordering alongside the counter, whereas high-throughput counters benefit from Customer Display screens and Kiosk self-ordering modes. For kitchen prep routing details, read our dedicated{" "}
          <Link href="/resources/restaurant-pos-kot-inventory-guide/" className="text-blue-600 font-semibold hover:underline">
            Restaurant POS, KOT &amp; Inventory Buying Guide
          </Link>
          .
        </p>
      </section>

      <section id="india-gst-rules" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">2. India CGST/SGST Tax Structure &amp; Inclusive Pricing</h2>
        <p>
          Under CBIC Notification No. 11/2017-Central Tax (Rate) and subsequent hospitality notifications, Indian restaurant billing follows two strict legal tracks:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li>
            <strong>5% GST (Without ITC):</strong> Applies to most standalone restaurants, cafes, QSRs, canteens, and cloud kitchens (split evenly as 2.5% CGST + 2.5% SGST on the tax invoice, with no Input Tax Credit claimable on business inputs).
          </li>
          <li>
            <strong>18% GST (With ITC):</strong> Applies to restaurant services located inside &ldquo;specified premises&rdquo;—chiefly hotel properties where unit accommodation declared tariff exceeds INR 7,500 per day (or premises explicitly opting into specified status).
          </li>
          <li>
            <strong>Inclusive vs Exclusive Menu Support:</strong> QSR menus normally display final GST-inclusive prices for fast counter change, whereas fine-dining outlets print itemized base subtotals followed by 50/50 CGST/SGST lines and GSTIN headers. Always confirm tax applicability with your Chartered Accountant.
          </li>
        </ul>
      </section>

      <section id="upi-split-tenders" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">3. Dynamic NPCI UPI QR vs Split Payment Mechanics</h2>
        <h3 className="text-lg font-semibold text-slate-900">Exact-Amount Dynamic NPCI UPI QR</h3>
        <p>
          Static counter QR stickers invite constant amount-typing mistakes during rush hour. A POS that renders an exact-amount dynamic NPCI <code>upi://pay</code> QR per bill eliminates cents discrepancies and pairs smoothly with Customer Display views.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Multi-Tender Split Payments (Important Distinction)</h3>
        <p>
          Groups routinely settle a check using two modes—for instance, INR 1,000 via UPI and INR 450 in cash or wallet credit. Verified billing engines enforce idempotent payment posting (`clientRequestId`) across <code>CASH</code>, <code>CARD</code>, <code>UPI</code>, <code>WALLET</code>, <code>BANK_TRANSFER</code>, <code>GIFT_CARD</code>, and <code>STORE_CREDIT</code> tenders, calculate exact cash change, track tips, and guard manual discounts behind granular manager permissions.
        </p>
        <p className="text-xs text-slate-600">
          <strong>Accuracy Note on Bill Splitting:</strong> Verified Hanva Restaurant POS supports multi-tender <em>split payments</em> across one order settlement. Splitting a single order into two separate customer bills (separate check invoices) is <strong>not</strong> an implemented feature.
        </p>
      </section>

      <section id="offline-hardware" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">4. Offline Queue Sync, Z-Reports &amp; Print Bridges</h2>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Critical Counter Reliability Safeguards:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>IndexedDB Offline Capture:</strong> Browser persistence ensures cashiers continue ringing orders during broadband dropouts and flush cleanly to `/api/v1/orders/offline-sync` upon recovery.</li>
            <li><strong>Thermal Printers &amp; Print-Bridge Verification:</strong> While HTML receipts print immediately from any modern browser, USB/LAN ESC/POS thermal routing and the Windows <code>print-bridge</code> companion app require hardware validation with your physical printers during setup.</li>
            <li><strong>Cash Closing &amp; Immutable Audits:</strong> End-of-shift Z-reports, refund stock-return prompts, petty expenses, and append-only audit trails tighten counter accountability before cash leaves the drawer.</li>
          </ul>
        </div>
      </section>

      <section id="verified-boundary" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">5. Buyer Accuracy Table &amp; Verified Hanva Restaurant POS Fit</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <th className="p-3.5 font-bold">Capability Area</th>
                <th className="p-3.5 font-bold">Verified Status in Hanva Restaurant POS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">GST &amp; Settlements</td>
                <td className="p-3.5">50/50 CGST/SGST splits, inclusive/exclusive pricing, dynamic UPI QR &amp; split payments</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Offline &amp; Kitchen Flow</td>
                <td className="p-3.5">IndexedDB offline order queue, station KOTs, KDS w/ duplicate guard, Z-reports</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Order Splitting Caveat</td>
                <td className="p-3.5">Split payment supported; splitting 1 order into 2 customer bills NOT implemented</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Aggregators &amp; Branches</td>
                <td className="p-3.5">Partner REST API &amp; signed webhooks included (NO native Swiggy/Zomato connectors; partial multi-branch RBAC)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-700">
          Explore the complete{" "}
          <Link href="/products/restaurant-pos/" className="text-blue-600 font-semibold hover:underline">
            Hanva Restaurant POS specification
          </Link>{" "}
          or read how delivery kitchens configure prep screens and recipe BOM costing in our{" "}
          <Link href="/resources/cloud-kitchen-management-guide/" className="text-blue-600 font-semibold hover:underline">
            Cloud Kitchen Management Guide
          </Link>
          . Contact us for pricing.
        </p>
      </section>
    </ArticleLayout>
  );
}
