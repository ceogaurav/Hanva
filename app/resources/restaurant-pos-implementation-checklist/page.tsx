import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { buildSaasDemoWhatsAppUrl } from "@/lib/config";

export const metadata = {
  title: "Restaurant POS Implementation Checklist: Go-Live Rollout Guide",
  description:
    "Complete restaurant POS go-live checklist for Indian restaurateurs: menu matrix, GST tax slabs, KOT printer IPs, KDS setup, offline testing, and recipe BOM inventory.",
  alternates: {
    canonical: "https://www.hanva.in/resources/restaurant-pos-implementation-checklist/",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.hanva.in/resources/restaurant-pos-implementation-checklist/",
    siteName: "Hanva Technologies",
    title: "Restaurant POS Implementation Checklist: Go-Live Rollout Guide | Hanva",
    description:
      "A step-by-step rollout framework covering menu configuration, multi-station KOT routing, offline failover tests, and dynamic UPI QR billing.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Restaurant POS Implementation Checklist" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Restaurant POS Implementation Checklist: Go-Live Rollout Guide",
  description:
    "Operational checklist for rolling out restaurant point-of-sale systems, thermal kitchen printers, KDS boards, offline queues, and GST billing.",
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
  mainEntityOfPage: "https://www.hanva.in/resources/restaurant-pos-implementation-checklist/",
};

const faqs = [
  {
    question: "How do we test thermal KOT printer connectivity before opening night?",
    answer:
      "Assign static local IP addresses to each ESC/POS thermal printer (e.g. 192.168.1.100 for Bar, .101 for Kitchen) on your restaurant router. Print test tickets through Hanva POS to confirm character encoding, auto-cutter operation, and duplicate-print guards.",
  },
  {
    question: "What happens if our restaurant internet goes down during peak dinner service?",
    answer:
      "Hanva Restaurant POS uses an offline-first IndexedDB queue in the browser. Cashiers can continue taking orders, punching items, and printing receipts locally. Once Wi-Fi reconnects, all pending orders sync to the central server automatically.",
  },
  {
    question: "How is GST configured for Indian restaurants in Hanva POS?",
    answer:
      "Standard Indian standalone dining is configured at 5% GST (2.5% CGST + 2.5% SGST) without input tax credit, while restaurants serving liquor or inside luxury hotels can configure 18% GST or state-specific excise duty.",
  },
  {
    question: "How can we schedule a guided setup walkthrough for Hanva Restaurant POS?",
    answer:
      "Contact us for pricing and an onboarding walkthrough on WhatsApp (+91 8423711043).",
  },
];

export default function RestaurantPosImplementationChecklistPage() {
  return (
    <ArticleLayout
      pillarBadge="Restaurant Operations Checklist"
      pillarHref="/products/restaurant-pos/"
      title="Restaurant POS Implementation Checklist: Go-Live Rollout Guide"
      subtitle="A practical, station-by-station deployment plan for restaurateurs, cafe operators, and cloud kitchen managers rolling out new POS software without dining-room disruption."
      readTime="12 min read"
      publishDate="November 2026"
      whatsappRef="/resources/restaurant-pos-implementation-checklist/"
      customWhatsappUrl={buildSaasDemoWhatsAppUrl("pos")}
      ctaButtonLabel="Request Hanva Restaurant POS Demo"
      ctaBannerTitle="Deploy Hanva Restaurant POS in Your Outlet"
      ctaBannerDescription="Contact us for pricing and a personalized implementation plan covering offline queue testing, multi-station KOT routing, and recipe inventory management."
      relatedHeading="Related Food & Beverage Solutions"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "Restaurant POS Implementation Checklist" },
      ]}
      executiveSummary="Opening night in a restaurant leaves zero margin for technical failure. If thermal KOT printers stall, kitchens become chaotic; if the internet drops and the cash register freezes, guest lines spill out the door. This 5-phase implementation checklist ensures your menu matrix, thermal hardware, offline queues, and GST accounting are battle-tested before opening day."
      tableOfContents={[
        { id: "phase-1-menu", title: "1. Phase 1: Menu Engineering, Modifiers & GST Tax Slabs" },
        { id: "phase-2-network", title: "2. Phase 2: Local Network, Thermal KOT Printers & Static IPs" },
        { id: "phase-3-kds", title: "3. Phase 3: Kitchen Display System (KDS) & Captain PWA Setup" },
        { id: "phase-4-offline", title: "4. Phase 4: Offline Queue & Internet Drop Simulation Drill" },
        { id: "phase-5-inventory", title: "5. Phase 5: Recipe Bill of Materials (BOM) & Food Costing" },
      ]}
      schemaData={articleSchema}
      relatedProducts={[
        {
          title: "Hanva Restaurant POS",
          description: "Flagship restaurant POS, KDS, QR ordering, and GST billing platform with offline queue.",
          href: "/products/restaurant-pos/",
        },
        {
          title: "Hanva CRM",
          description: "Manage catering enquiries, corporate dining leads, and banquet follow-ups.",
          href: "/products/crm/",
        },
        {
          title: "Cloud Telephony",
          description: "Virtual numbers and multi-level IVR for restaurant table reservations and delivery inquiries.",
          href: "/products/cloud-telephony/",
        },
      ]}
      relatedIndustries={[
        {
          title: "Restaurants & Cafes Solutions",
          description: "Operational architectures tailored for cafes, dine-in eateries, QSRs, and cloud kitchens.",
          href: "/industry/restaurants-and-cafes/",
        },
        {
          title: "Cloud Kitchen Management Guide",
          description: "How multi-brand virtual kitchens manage centralized billing and delivery handoffs.",
          href: "/resources/cloud-kitchen-management-guide/",
        },
      ]}
      faqs={faqs}
    >
      <section id="phase-1-menu" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          1. Phase 1: Menu Engineering, Modifiers &amp; GST Tax Slabs
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Structuring your menu matrix correctly accelerates order entry and prevents kitchen misinterpretation. Organize dishes into clear top-level categories (Starters, Main Course, Breads, Beverages, Desserts) and configure required modifiers.
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
          <div className="text-sm font-bold text-slate-900">Menu &amp; Tax Configuration Matrix:</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">✓</span>
              <span><strong>Item Variants &amp; Portions:</strong> Configure standard portion sizes (Half vs Full, 250ml vs 500ml) under single item headers to prevent menu clutter.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">✓</span>
              <span><strong>Modifier Groups:</strong> Attach required choices (e.g. Spice Level: Mild/Medium/Spicy; Preparation: Jain/Gluten-Free) and add-ons (Extra Cheese, Double Shot).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">✓</span>
              <span><strong>India GST Setup:</strong> Standardize 5% GST (2.5% CGST + 2.5% SGST) for restaurant food, 18% for alcoholic beverages or branded bakery items, and set tax-inclusive or exclusive display.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="phase-2-network" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          2. Phase 2: Local Network, Thermal KOT Printers &amp; Static IPs
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Flaky printing is the #1 complaint in restaurant operations. Dynamic IP addresses on Wi-Fi routers frequently change, causing POS terminals to lose connection with kitchen printers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 p-4 space-y-2 bg-white">
            <div className="text-sm font-bold text-slate-900">Network Architecture Rules:</div>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li>Reserve static DHCP leases for all thermal printers on your local router.</li>
              <li>Use shielded Ethernet (CAT6) cables for kitchen printers rather than unreliable Wi-Fi dongles.</li>
              <li>Separate guest Wi-Fi from internal POS/KOT LAN to prevent bandwidth throttling.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 space-y-2 bg-white">
            <div className="text-sm font-bold text-slate-900">Station Printer Mapping:</div>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li><strong>Bar Printer:</strong> Cocktails, mocktails, beers, and bottled beverages.</li>
              <li><strong>Main Kitchen Printer:</strong> Curries, gravies, rice, and main courses.</li>
              <li><strong>Tandoor / Grill Printer:</strong> Kebabs, tandoori rotis, naans, and starters.</li>
              <li><strong>Cashier Receipt Printer:</strong> Final customer invoices with dynamic UPI QR code.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="phase-3-kds" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          3. Phase 3: Kitchen Display System (KDS) &amp; Captain PWA Setup
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Modernizing your kitchen beyond noisy thermal paper creates visual calm and measurable prep times. Hanva&apos;s digital KDS touch board displays orders color-coded by elapsed preparation time.
        </p>
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 space-y-3">
          <div className="text-sm font-bold text-blue-900">KDS &amp; Captain Workflow:</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li><strong>Captain PWA on Tablet:</strong> Floor captains take orders at tables, view dish availability in real time, and fire orders directly to the kitchen with table numbers.</li>
            <li><strong>Color-Coded KDS Queues:</strong> Green (0-10 min), Yellow (10-15 min), and Red (&gt;15 min) preparation timers alert head chefs to delayed tables.</li>
            <li><strong>Ticket Bumping:</strong> One-tap ticket completion alerts runners that hot food is waiting at the pass.</li>
          </ul>
        </div>
      </section>

      <section id="phase-4-offline" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          4. Phase 4: Offline Queue &amp; Internet Drop Simulation Drill
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Do not assume offline resilience works without physically testing it. Before your grand opening, run an offline drill:
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
          <div className="text-sm font-bold text-slate-900">Offline Drill Steps:</div>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700">
            <li>Disconnect the WAN / internet cable from your restaurant router while keeping local Wi-Fi active.</li>
            <li>Punch 3 test orders with modifiers, split payments, and print thermal KOTs. Verify they execute locally.</li>
            <li>Reconnect the internet cable. Confirm that all 3 orders sync to cloud sales reports without duplicates or error prompts.</li>
          </ol>
        </div>
      </section>

      <section id="phase-5-inventory" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          5. Phase 5: Recipe Bill of Materials (BOM) &amp; Food Costing
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Food cost variance is the silent killer of restaurant profits. Configure recipe BOMs for your top 20 revenue-generating dishes first to control 80% of your ingredient spend.
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3">
          <div className="text-sm font-bold text-slate-900">Ingredient Control Checklist:</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li>Map yield ratios for raw items (e.g. 1kg raw chicken yields 800g cooked curry portions).</li>
            <li>Set minimum inventory reorder levels for high-turnover staples (cooking oil, dairy, flour, basmati rice).</li>
            <li>Audit weekly variance between theoretical recipe depletion and actual kitchen physical stock takes.</li>
          </ul>
        </div>
      </section>
    </ArticleLayout>
  );
}
