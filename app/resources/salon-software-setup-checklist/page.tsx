import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { buildSaasDemoWhatsAppUrl } from "@/lib/config";

export const metadata = {
  title: "Salon Software Setup Checklist: Step-by-Step Onboarding Guide",
  description:
    "Actionable onboarding checklist for Indian salon & spa owners: service menus, stylist PINs, commission slabs, GST billing, auto-consumption, and online booking.",
  alternates: {
    canonical: "https://www.hanva.in/resources/salon-software-setup-checklist/",
  },
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.hanva.in/resources/salon-software-setup-checklist/",
    siteName: "Hanva Technologies",
    title: "Salon Software Setup Checklist: Step-by-Step Onboarding Guide | Hanva",
    description:
      "A complete operational setup framework for Indian salons and spas covering service menus, staff commissions, back-bar recipes, and GST billing.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Salon Software Setup Checklist" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Salon Software Setup Checklist: Step-by-Step Onboarding Guide",
  description:
    "Operational checklist for setting up salon management and billing software across service menus, staff commissions, auto-consumption recipes, and GST checkout.",
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
  mainEntityOfPage: "https://www.hanva.in/resources/salon-software-setup-checklist/",
};

const faqs = [
  {
    question: "How long does it take to set up Hanva Salon Software for a new salon?",
    answer:
      "Initial configuration typically takes 1 to 2 days. This includes uploading your service menu, configuring staff profiles and commission rules, testing thermal bill printing, and setting up your online booking mini-site link.",
  },
  {
    question: "Can we set different commission percentages for junior and senior stylists?",
    answer:
      "Yes. Hanva Salon Software supports individualized commission rules per staff member, allowing different percentages for haircuts versus chemical treatments, as well as distinct commissions for retail product sales.",
  },
  {
    question: "How does back-bar consumable auto-consumption prevent inventory theft?",
    answer:
      "By binding exact quantities of professional products (such as 30ml hair color or 1 facial kit) to specific billing items, the software automatically deducts inventory upon invoice generation, exposing unrecorded usage.",
  },
  {
    question: "How do we get an onboarding walkthrough for Hanva Salon Software?",
    answer:
      "Contact us for pricing and a personalized setup walkthrough via WhatsApp (+91 8423711043).",
  },
];

export default function SalonSoftwareSetupChecklistPage() {
  return (
    <ArticleLayout
      pillarBadge="Salon Operations Checklist"
      pillarHref="/products/salon-software/"
      title="Salon Software Setup Checklist: Step-by-Step Onboarding Guide"
      subtitle="A practical, operational blueprint for salon owners and spa managers configuring service catalogs, staff commissions, inventory auto-consumption, and GST checkout."
      readTime="11 min read"
      publishDate="November 2026"
      whatsappRef="/resources/salon-software-setup-checklist/"
      customWhatsappUrl={buildSaasDemoWhatsAppUrl("salon")}
      ctaButtonLabel="Request Hanva Salon Software Demo"
      ctaBannerTitle="Set Up Hanva Salon Software for Your Salon"
      ctaBannerDescription="Contact us for pricing and an onboarding walkthrough covering appointment scheduling, staff commission portals, GST billing, and inventory control."
      relatedHeading="Related Salon Solutions"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "Salon Software Setup Checklist" },
      ]}
      executiveSummary="Opening or modernizing a salon requires precise operational setup. If service durations are inaccurate, booking calendars overlap; if commission rules are vague, staff disputes arise; and if consumable recipes are neglected, product margins leak. This checklist outlines the exact 5-step process to configure your salon software for smooth daily operations."
      tableOfContents={[
        { id: "step-1-menu", title: "1. Step 1: Service Menu Catalog & Duration Mapping" },
        { id: "step-2-staff", title: "2. Step 2: Staff Profiles, PIN Security & Commission Slabs" },
        { id: "step-3-inventory", title: "3. Step 3: Back-Bar Consumable Auto-Consumption Recipes" },
        { id: "step-4-booking", title: "4. Step 4: Online Booking Mini-Site & Social Links" },
        { id: "step-5-billing", title: "5. Step 5: Thermal Printer Setup & GST Cash Register Test" },
      ]}
      schemaData={articleSchema}
      relatedProducts={[
        {
          title: "Hanva Salon Software",
          description: "All-in-one salon billing, appointments, staff commission portals, and auto-consumption.",
          href: "/products/salon-software/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Automate appointment reminders, reschedule links, and review requests via official WABA.",
          href: "/products/whatsapp-crm/",
        },
        {
          title: "Restaurant POS Software",
          description: "Looking for food and beverage POS? Explore Hanva Restaurant POS with KOT and KDS.",
          href: "/products/restaurant-pos/",
        },
      ]}
      relatedIndustries={[
        {
          title: "Salons & Spas Industry Solutions",
          description: "Operational architectures designed for hair studios, beauty salons, and luxury day spas.",
          href: "/industry/salons-and-spas/",
        },
        {
          title: "Healthcare & Clinic Operations",
          description: "Patient appointment scheduling, doctor calendars, and diagnostic workflow management.",
          href: "/industry/healthcare/",
        },
      ]}
      faqs={faqs}
    >
      <section id="step-1-menu" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          1. Step 1: Service Menu Catalog &amp; Duration Mapping
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Your service menu is the heartbeat of your front-desk booking calendar. Categorize treatments into logical departments (Hair, Skin, Nails, Spa, Bridal) and define both the retail price and execution time.
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
          <div className="text-sm font-bold text-slate-900">Service Menu Configuration Checklist:</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">✓</span>
              <span><strong>Realistic Service Durations:</strong> Set accurate buffer times (e.g. 45 min for Men&apos;s Styling, 120 min for Keratin treatment) to prevent calendar gridlocks during weekend rushes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">✓</span>
              <span><strong>GST Tax Slabs:</strong> Specify whether menu prices are GST-inclusive or GST-exclusive (typically 18% GST for salon services in India).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">✓</span>
              <span><strong>Package &amp; Combo Setup:</strong> Bundle related services (e.g. Haircut + Beard Trim + Head Massage) with bundled pricing to encourage higher ticket values.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="step-2-staff" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          2. Step 2: Staff Profiles, PIN Security &amp; Commission Slabs
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Commission disputes cause high stylist turnover. Eliminate ambiguity by configuring individual stylist profiles with secure 4-digit PIN access to prevent stylists from viewing each other&apos;s earnings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 p-4 space-y-2 bg-white">
            <div className="text-sm font-bold text-slate-900">Staff Portal Security:</div>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li>Each operator receives a unique PIN to view assigned bookings and personal tips.</li>
              <li>Stylists cannot alter prices, issue unauthorized discounts, or export customer phone numbers.</li>
              <li>Attendance and shift timings are logged upon staff portal login.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 space-y-2 bg-white">
            <div className="text-sm font-bold text-slate-900">Commission Slab Rules:</div>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li>Configure flat service percentages (e.g. 10% on haircut, 15% on chemical treatments).</li>
              <li>Set tiered monthly incentive thresholds (e.g. 10% up to ₹50,000 revenue; 15% thereafter).</li>
              <li>Separate retail product commission (e.g. 5% on shampoo bottles sold) from service revenue.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="step-3-inventory" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          3. Step 3: Back-Bar Consumable Auto-Consumption Recipes
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Back-bar products (shampoos, developers, bleach powder, wax tubs, massage oils) often leak away unaccounted. Hanva Salon Software binds professional consumable quantities directly to billable services.
        </p>
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 space-y-3">
          <div className="text-sm font-bold text-blue-900">Auto-Consumption Recipe Examples:</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li><strong>Global Hair Color Service:</strong> Automatically deducts 60ml Color Cream + 60ml Developer from back-bar stock upon checkout.</li>
            <li><strong>O3+ Whitening Facial:</strong> Automatically deducts 1 Single-Use Facial Kit from inventory.</li>
            <li><strong>Honey Waxing Full Legs:</strong> Automatically deducts 150g Wax + 10 Disposable Wax Strips.</li>
            <li><strong>Reorder Threshold Alerts:</strong> Triggers notifications to the salon manager when stock falls below 3 days of average consumption.</li>
          </ul>
        </div>
      </section>

      <section id="step-4-booking" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          4. Step 4: Online Booking Mini-Site &amp; Social Links
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Empower clients to book appointments 24/7 without calling the front desk. Hanva generates a mobile-optimized public booking link branded for your salon.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
          <div className="text-sm font-bold text-slate-900">Mini-Site Deployment Steps:</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li>Add your booking link to your Instagram bio, Google Business Profile &quot;Book an Appointment&quot; button, and WhatsApp business bio.</li>
            <li>Define advance booking lead times (e.g. minimum 1 hour advance notice, maximum 14 days ahead).</li>
            <li>Configure automatic WhatsApp confirmation alerts so clients receive time, stylist name, and location directions immediately.</li>
          </ul>
        </div>
      </section>

      <section id="step-5-billing" className="space-y-4 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          5. Step 5: Thermal Printer Setup &amp; GST Cash Register Test
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Before your salon doors open to paying customers, perform an end-to-end checkout drill on your front-desk computer or tablet.
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3">
          <div className="text-sm font-bold text-slate-900">Opening Day Readiness Checklist:</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li><strong>Thermal Receipt Verification:</strong> Connect standard 58mm or 80mm ESC/POS USB or network thermal printer and print a sample bill with your GSTIN and salon address.</li>
            <li><strong>Split Tender Test:</strong> Test a ₹1,000 bill split ₹500 via Cash and ₹500 via Dynamic UPI QR to ensure payment reconciles.</li>
            <li><strong>Evening Cash Drawer Z-Report:</strong> Run an end-of-day register closing report to verify cash-in-drawer matches system receipts.</li>
          </ul>
        </div>
      </section>
    </ArticleLayout>
  );
}
