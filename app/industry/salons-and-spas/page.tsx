import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Salon & Spa Software Solutions — Billing, Booking & Staff",
  description:
    "Tailored salon and spa management architecture: appointment scheduling, online booking mini-site, GST billing, stylist commission tracking, and inventory auto-consumption.",
  alternates: {
    canonical: "https://www.hanva.in/industry/salons-and-spas/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/industry/salons-and-spas/",
    siteName: "Hanva Technologies",
    title: "Salon & Spa Software Solutions | Hanva Technologies",
    description:
      "All-in-one software architecture for Indian salons, spas, hair studios, and wellness clinics: appointments, GST checkout, stylist commissions, and stock auto-consumption.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Salon & Spa Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon & Spa Software Solutions | Hanva Technologies",
    description:
      "Appointments, GST billing, stylist commissions, and inventory auto-consumption for Indian salons and spas.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const salonIndustrySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Salon & Spa Management Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "Integrated salon appointment calendar, online booking mini-site, GST-compliant POS billing, staff commission tracking, and back-bar consumable auto-consumption for salons and spas in India.",
  areaServed: "IN",
};

export default function SalonsAndSpasIndustryPage() {
  return (
    <SolutionLayout
      categoryBadge="Salons, Spas & Wellness Studios"
      title="Salon & Spa Management Architecture"
      subtitle="Eliminate front-desk booking chaos, simplify GST billing, resolve stylist commission disputes, and prevent back-bar product wastage with an integrated salon operations suite."
      executiveSummary="Running a thriving salon or spa in India demands balancing high-touch client experiences with rigorous back-office discipline. Hanva unifies front-desk appointment scheduling, a public online booking mini-site, rapid split-tender POS checkout, transparent staff commission portals, and automatic consumable inventory deductions into one responsive platform."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industry/" },
        { label: "Salons & Spas" },
      ]}
      whatsappRef="/industry/salons-and-spas/"
      challenges={[
        {
          challenge: "Weekend front-desk bottlenecks and phone booking confusion cause overlapping appointments, long customer wait times, and walk-in client walkouts.",
          solution: "A color-coded master appointment calendar paired with a public self-service booking mini-site allows clients to choose services and slots, reducing front-desk friction.",
        },
        {
          challenge: "Manual commission calculations on hair services and spa packages spark recurring end-of-month friction between salon owners and stylists.",
          solution: "A dedicated staff portal with PIN login lets stylists review their daily service ledger, tips earned, and tier-based commissions in real time.",
        },
        {
          challenge: "Back-bar consumables (hair color, bleach, massage oils, and facial kits) leak out of inventory with no clear service-level accountability.",
          solution: "Configurable service-to-product auto-consumption rules automatically deduct exact product quantities from inventory whenever a linked treatment is billed.",
        },
        {
          challenge: "Inconsistent client follow-ups lead to poor rebooking rates and fading customer loyalty after initial visits.",
          solution: "Centralized client profile records past service history, preferred stylists, and loyalty points, enabling personalized WhatsApp reminders.",
        },
      ]}
      pillars={[
        {
          title: "Smart Calendar & Online Booking",
          description: "Dual-mode scheduling supporting front-desk walk-in queues and public customer slot booking via a custom salon mini-site link.",
          metric: "Multi-Stylist",
          metricLabel: "Simultaneous slot management",
        },
        {
          title: "Speedy GST Billing & Split Tender",
          description: "Thermal receipt printing with inclusive/exclusive GST breakdown and split payments across Cash, Cards, and Dynamic UPI QR codes.",
          metric: "100% GST",
          metricLabel: "CGST & SGST compliant",
        },
        {
          title: "Staff PIN Portal & Commission Rules",
          description: "Transparent earnings tracking for stylists and therapists with configurable flat or slab-based performance commissions.",
          metric: "Role-Based",
          metricLabel: "Secure PIN access per stylist",
        },
        {
          title: "Recipe Auto-Consumption & Stock Alerts",
          description: "Automatic stock deduction of professional salon consumables linked directly to bill items with low-stock replenishment warnings.",
          metric: "Zero Leakage",
          metricLabel: "Back-bar inventory control",
        },
      ]}
      workflowTitle="End-to-End Salon Operations Lifecycle"
      workflowStages={[
        {
          step: "01",
          title: "Appointment Booking & Walk-in Ingestion",
          description: "Clients book appointments online via your salon mini-site or receptionists log walk-ins into the color-coded stylist timeline.",
        },
        {
          step: "02",
          title: "Service Delivery & Consumable Logging",
          description: "Stylists review service notes on their staff portal while the system queues back-bar consumable recipes linked to the requested treatment.",
        },
        {
          step: "03",
          title: "Rapid Checkout & Digital Invoicing",
          description: "Front desk closes the ticket with split payment options, applies client loyalty points, and prints a GST invoice or sends a digital WhatsApp receipt.",
        },
        {
          step: "04",
          title: "Day-End Cash Closing & Commission Ledger",
          description: "Managers generate the evening cash drawer Z-report, reconcile staff performance logs, and review service revenue dashboards.",
        },
      ]}
      synergies={[
        {
          title: "Hanva Salon Software",
          description: "Ready-to-deploy flagship SaaS platform for Indian salons, hair studios, spas, and grooming clinics.",
          href: "/products/salon-software/",
        },
        {
          title: "Salon Software Setup Checklist",
          description: "Step-by-step implementation guide: services catalog, staff commissions, GST settings, and recipes.",
          href: "/resources/salon-software-setup-checklist/",
        },
        {
          title: "Salon Management Software Buying Guide",
          description: "Comprehensive Indian evaluation guide covering appointments, commissions, billing, and inventory.",
          href: "/resources/salon-management-software-guide/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Automate appointment confirmations, reschedule requests, and client review outreach on WhatsApp.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      faqs={[
        {
          question: "Can multiple stylists and treatment rooms be managed simultaneously?",
          answer:
            "Yes. Hanva Salon Software supports multi-stylist calendars where front-desk staff can view each operator's schedule side-by-side, assign stations, and manage chair turnover.",
        },
        {
          question: "How does the online booking mini-site work for clients?",
          answer:
            "You receive a unique public web link that can be placed on your Instagram bio, Google Business Profile, or WhatsApp catalog. Clients browse your services, pick a preferred specialist, select open time slots, and submit their booking request.",
        },
        {
          question: "Does the software support split payments between Cash and UPI?",
          answer:
            "Yes. During checkout, cashiers can split the bill across multiple tender types—such as part Cash and part UPI QR or Card—with proper receipt line items.",
        },
        {
          question: "How do we get started or request pricing for our salon?",
          answer:
            "Contact us for pricing and a personalized live walkthrough via WhatsApp (+91 8423711043). We tailor deployment to your chair count and operational scope.",
        },
      ]}
      schemaData={salonIndustrySchema}
    />
  );
}
