import { ProductLayout } from "@/components/shared/product-layout";

export const metadata = {
  title: "1800 Toll Free Number Provider in India — Hanva Technologies",
  description:
    "Build brand authority with 1800 toll-free numbers in India. Free for your customers to call across all telecom networks, integrated with cloud IVR and CRM.",
  alternates: {
    canonical: "https://hanva.in/products/toll-free-numbers/",
  },
};

const tollFreeSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Hanva 1800 Enterprise Toll-Free Numbers",
  description: "Enterprise 1800 toll-free numbers across India with multi-level IVR and cloud routing.",
  brand: {
    "@type": "Brand",
    name: "Hanva Technologies",
  },
};

export default function TollFreeNumbersPage() {
  return (
    <ProductLayout
      categoryBadge="Enterprise National Voice"
      title="1800 Enterprise Toll-Free Number Solutions"
      subtitle="Establish nationwide credibility and encourage customer inquiries with an 1800 toll-free number that is 100% free for your customers to call."
      problemStatement="Prospective customers and existing clients often hesitate to call standard landlines or long-distance numbers for support inquiries. A verified 1800 toll-free number removes call cost friction for callers, encouraging inbound call inquiries and reinforcing brand trust."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/" },
        { label: "Toll-Free Numbers" },
      ]}
      whatsappRef="/products/toll-free-numbers/"
      workflowTitle="Toll-Free National Inbound Architecture"
      workflowSteps={[
        {
          step: "01. NATIONWIDE ACCESS",
          title: "Caller Dials 1800 Identifier",
          description: "Customers call your 1800 number from Jio, Airtel, Vi, or BSNL networks across all 22 Indian telecom circles at zero cost to them.",
        },
        {
          step: "02. CARRIER TRANSLATION",
          title: "Telecom Gateway Routing",
          description: "Carrier switches translate the toll-free routing code and hand off the voice traffic to Hanva's high-availability cloud gateway.",
        },
        {
          step: "03. SMART IVR SCREENING",
          title: "Multi-Level Department Routing",
          description: "Callers choose language preference and inquiry type (Sales, Technical Support, Warranty) via customizable IVR audio menus.",
        },
        {
          step: "04. AGENT CONNECTION",
          title: "Queue Distribution & Recording",
          description: "Calls connect to available support agents with live supervisor monitoring, automatic recording, and automated CRM ticket logging.",
        },
      ]}
      capabilities={[
        {
          title: "Zero Calling Cost for Callers",
          description: "Remove all hesitation. Callers on prepaid or postpaid mobile plans connect completely free of charge.",
          badge: "Caller Benefit",
        },
        {
          title: "Pan-India National Reach",
          description: "A single recognizable 1800 number works uniformly across all Indian states and union territories without STD codes.",
          badge: "Nationwide",
        },
        {
          title: "Native IVR & Queue Integration",
          description: "Pair your toll-free line with intelligent call routing, business hours rules, hold music, and queue announcements.",
          badge: "Integration",
        },
        {
          title: "Real-Time CDR Usage Metering",
          description: "Track incoming call durations, peak calling hours, regional distribution, and caller drop-off rates on live dashboards.",
          badge: "Telemetry",
        },
        {
          title: "Multi-Carrier Trunk Connectivity",
          description: "Multi-carrier connectivity options with major enterprise telecom providers to support operational routing continuity, subject to upstream carrier networks.",
          badge: "Connectivity",
        },
        {
          title: "Assisted Statutory Allocation",
          description: "Hanva coordinates the formal DoT regulatory verification to provision your registered corporate 1800 numbering block.",
          badge: "Compliant",
        },
      ]}
      useCases={[
        {
          audience: "National Consumer Brands",
          title: "Centralized Customer Helplines",
          description: "Provide a single, memorable customer support helpline printed on product packaging, user manuals, and warranty cards.",
        },
        {
          audience: "Healthcare & Emergency Hotlines",
          title: "Immediate Patient Assistance",
          description: "Ensure patients and families in urgent need of medical consultations can connect without worrying about prepaid balance limits.",
        },
        {
          audience: "Financial Institutions & Banking",
          title: "Card Hotlisting & Support Services",
          description: "24/7 toll-free lines for immediate credit card blockings, loan inquiries, and banking dispute resolutions.",
        },
      ]}
      ecosystemSynergies={[
        {
          title: "Virtual Mobile Numbers",
          description: "Combine an 1800 inbound support line with 10-digit virtual mobile numbers for outbound sales calls.",
          href: "/products/virtual-numbers/",
        },
        {
          title: "Call Center Operations Suite",
          description: "Manage large support agent queues handling high-volume 1800 toll-free customer calls.",
          href: "/products/call-center-software/",
        },
        {
          title: "Customer Support Routing",
          description: "Explore tailored support workflows designed to reduce average hold times and improve CSAT.",
          href: "/solutions/customer-support/",
        },
      ]}
      faqs={[
        {
          question: "Who pays for an 1800 toll-free call?",
          answer: "The business receiving the call pays for the call duration based on the agreed voice pulse tariff. The caller is never charged from their mobile or landline balance.",
        },
        {
          question: "Can an 1800 toll-free number be used for outbound calling?",
          answer: "Under Department of Telecommunications (DoT) regulations in India, 1800 series numbers are strictly inbound-only service numbers and cannot be used as outbound caller IDs. For outbound calling, Hanva provides dedicated 10-digit virtual mobile DIDs.",
        },
        {
          question: "How long does it take to activate an 1800 toll-free number?",
          answer: "Once the DoT-mandated corporate KYC documentation is verified by authorized telecom carriers, allocation and activation typically complete within 3 to 5 business days.",
        },
        {
          question: "Can I choose a specific vanity 1800 number?",
          answer: "Yes, subject to availability in the national telecom numbering pool. Our team can share available 1800 number options for your review during onboarding.",
        },
      ]}
      schemaData={tollFreeSchema}
    />
  );
}
