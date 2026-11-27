import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Restaurant & Cafe POS Solutions — Billing, KDS & QR Ordering",
  description:
    "Integrated POS, KOT kitchen routing, Kitchen Display System (KDS), offline queue, dynamic UPI QR billing, and recipe BOM inventory for Indian restaurants and cafes.",
  alternates: {
    canonical: "https://www.hanva.in/industry/restaurants-and-cafes/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/industry/restaurants-and-cafes/",
    siteName: "Hanva Technologies",
    title: "Restaurant & Cafe POS Solutions | Hanva Technologies",
    description:
      "All-in-one POS and kitchen operations suite for Indian restaurants, cafes, QSRs, and cloud kitchens: offline order queue, KOT routing, KDS board, and recipe BOM inventory.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Restaurant & Cafe POS Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant & Cafe POS Solutions | Hanva Technologies",
    description:
      "KOT kitchen routing, offline-resilient billing, dynamic UPI QR, and recipe inventory for restaurants and cafes.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const restaurantIndustrySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Restaurant & Cafe POS Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "Integrated restaurant point-of-sale, thermal KOT kitchen routing, live Kitchen Display System, offline-first IndexedDB queue, GST billing, and recipe inventory management for food and beverage businesses in India.",
  areaServed: "IN",
};

export default function RestaurantsAndCafesIndustryPage() {
  return (
    <SolutionLayout
      categoryBadge="Restaurants, Cafes, QSRs & Cloud Kitchens"
      title="Restaurant & Cafe POS Operations Architecture"
      subtitle="Keep your cash register running during Wi-Fi drops, streamline kitchen communication with thermal KOT and live KDS, and track food costs with recipe Bill of Materials."
      executiveSummary="In high-volume food service, seconds count and kitchen miscommunication creates food waste. Hanva equips restaurateurs, cafe operators, and cloud kitchen managers with an offline-resilient point of sale, multi-station KOT routing, digital KDS boards, table QR ordering, dynamic NPCI UPI QR billing, and transparent raw ingredient recipe tracking."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industry/" },
        { label: "Restaurants & Cafes" },
      ]}
      whatsappRef="/industry/restaurants-and-cafes/"
      challenges={[
        {
          challenge: "Intermittent internet or local Wi-Fi drops freeze conventional cloud POS systems, paralyzing billing counters during dinner rush hours.",
          solution: "An offline-first IndexedDB order queue keeps cashiers printing bills and taking orders seamlessly, automatically syncing transactions when connectivity resumes.",
        },
        {
          challenge: "Handwritten paper slips lead to missed food modifiers (e.g. extra cheese, no onions), duplicate orders, and noisy kitchen chaos.",
          solution: "Automated KOT printing routes orders to designated kitchen stations (Bar, Tandoor, Main Kitchen) alongside a live color-coded Kitchen Display System (KDS).",
        },
        {
          challenge: "Uncontrolled raw ingredient usage and untracked kitchen spillage erode food margins without clear recipe accountability.",
          solution: "Recipe Bill of Materials (BOM) inventory automatically deducts raw materials (cheese, flour, meats, sauces) each time a menu item is billed.",
        },
        {
          challenge: "Slow checkout bottlenecks table turnover when guests wait several minutes for physical card machines or manual bill calculation.",
          solution: "Dynamic NPCI UPI QR codes printed directly on customer bills enable guests to scan and pay instantly via PhonePe, Google Pay, or Paytm.",
        },
      ]}
      pillars={[
        {
          title: "Offline-First Order Queue",
          description: "Browser-based local IndexedDB cache ensures zero transaction downtime even during complete internet outages.",
          metric: "Zero Downtime",
          metricLabel: "Offline billing resilience",
        },
        {
          title: "Station-Specific KOT & KDS",
          description: "Thermal printer routing by department and live interactive kitchen display boards with visual preparation timers.",
          metric: "Multi-Station",
          metricLabel: "Bar, Kitchen & Pantry routing",
        },
        {
          title: "GST Billing & Dynamic UPI QR",
          description: "India GST compliance (50/50 CGST & SGST), split payment methods, discount approvals, and instant UPI payment generation.",
          metric: "100% Compliant",
          metricLabel: "Accurate GST invoicing",
        },
        {
          title: "Recipe BOM Food Costing",
          description: "Automated raw ingredient stock depletion linked to menu items with minimum balance reorder alerts.",
          metric: "Ingredient-Level",
          metricLabel: "Food margin protection",
        },
      ]}
      workflowTitle="From Table Order to Kitchen & Checkout"
      workflowStages={[
        {
          step: "01",
          title: "Order Capture & Modifier Selection",
          description: "Captains punch orders via the Captain PWA or guests order at tables via rotating QR codes with special preparation instructions.",
        },
        {
          step: "02",
          title: "Intelligent Kitchen Routing (KOT/KDS)",
          description: "The order routes instantly to thermal printers at designated stations while appearing on the chef's digital KDS touch board.",
        },
        {
          step: "03",
          title: "Kitchen Bumping & Food Dispatch",
          description: "Line cooks prepare dishes according to the KDS queue and bump completed tickets to notify runners that orders are ready for delivery.",
        },
        {
          step: "04",
          title: "Fast Bill Settlement & BOM Depletion",
          description: "Front cashier settles the bill via UPI QR, card, or cash, triggering instant raw material deduction in the recipe inventory ledger.",
        },
      ]}
      synergies={[
        {
          title: "Hanva Restaurant POS",
          description: "Flagship restaurant POS, KDS, QR ordering, and GST billing platform for Indian food businesses.",
          href: "/products/restaurant-pos/",
        },
        {
          title: "Restaurant POS Implementation Checklist",
          description: "Step-by-step rollout guide: menu engineering, tax slabs, thermal printer IP setup, and offline testing.",
          href: "/resources/restaurant-pos-implementation-checklist/",
        },
        {
          title: "Restaurant KOT & Inventory Guide",
          description: "Comprehensive operational guide to kitchen order tickets, recipe BOMs, and reducing restaurant food waste.",
          href: "/resources/restaurant-pos-kot-inventory-guide/",
        },
        {
          title: "Cloud Kitchen Management Guide",
          description: "How multi-brand virtual kitchens manage centralized billing, multi-brand menus, and delivery handoffs.",
          href: "/resources/cloud-kitchen-management-guide/",
        },
      ]}
      faqs={[
        {
          question: "Does Hanva Restaurant POS require an active internet connection to print bills?",
          answer:
            "No. The POS frontend includes an offline IndexedDB order queue that allows cashiers to continue punching orders, printing KOTs, and printing bills locally during Wi-Fi or broadband drops. Data syncs automatically once connectivity returns.",
        },
        {
          question: "Can orders be routed to different printers for bar items and food items?",
          answer:
            "Yes. You can map menu categories to specific ESC/POS network thermal printers so beverage orders print at the bar while food items print in the main kitchen.",
        },
        {
          question: "How does the system handle online delivery aggregator orders?",
          answer:
            "Hanva provides a scoped Partner REST API and secure outbound webhooks allowing custom online ordering platforms and third-party delivery aggregators to push orders directly into the kitchen queue. We do not claim unverified native aggregations.",
        },
        {
          question: "How is Hanva Restaurant POS priced?",
          answer:
            "Contact us for pricing and a personalized live walkthrough via WhatsApp (+91 8423711043). Pricing is tailored to your outlet format (dine-in, QSR, cafe, or cloud kitchen).",
        },
      ]}
      schemaData={restaurantIndustrySchema}
    />
  );
}
