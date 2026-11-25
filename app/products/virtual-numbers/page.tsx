import { ProductLayout } from "@/components/shared/product-layout";

export const metadata = {
  title: "Virtual Mobile Numbers for Business in India — 10-Digit DIDs",
  description:
    "Get dedicated 10-digit virtual mobile numbers in India. High-trust mobile DIDs with carrier gateway allocation across Vodafone Idea and Tata Teleservices.",
  alternates: {
    canonical: "https://hanva.in/products/virtual-numbers/",
  },
};

const virtualNumbersSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Virtual Mobile Numbers",
  serviceType: "Virtual Telecom DID Service",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    telephone: "+91-8423711043",
  },
  areaServed: "IN",
  description: "Dedicated 10-digit business virtual numbers in India with high concurrency, call forwarding, and privacy masking.",
};

export default function VirtualNumbersPage() {
  return (
    <ProductLayout
      categoryBadge="Telecom Numbering Trunks"
      title="10-Digit Virtual Mobile Numbers for Business"
      subtitle="Publish recognizable 10-digit mobile numbers on your marketing campaigns. Receive concurrent customer calls, mask personal numbers, and record every conversation."
      problemStatement="When sales reps use personal SIM cards, business leads remain trapped on individual phones, customer calls go unrecorded, and valuable relationships vanish when employees leave the company. Hanva virtual mobile numbers centralize corporate identity and retain centralized customer contact records."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/" },
        { label: "Virtual Numbers" },
      ]}
      whatsappRef="/products/virtual-numbers/"
      workflowTitle="Virtual Mobile DID Inbound Pipeline"
      workflowSteps={[
        {
          step: "01. PROVISIONING",
          title: "Statutory KYC & DID Allocation",
          description: "Hanva provisions genuine 10-digit mobile numbering blocks through authorized carrier gateways (Vi and Tata Teleservices) following DoT guidelines.",
        },
        {
          step: "02. CAMPAIGN ATTRIBUTION",
          title: "Dedicated Marketing Identifiers",
          description: "Assign distinct virtual DIDs to your Google Ads, Facebook campaigns, website header, and billboards to measure ROI precisely.",
        },
        {
          step: "03. CONCURRENT TERMINATION",
          title: "Multi-Channel Call Handling",
          description: "Multiple prospective buyers can dial the exact same virtual number simultaneously without encountering a busy signal.",
        },
        {
          step: "04. TWO-WAY CALL MASKING",
          title: "Customer & Agent Privacy",
          description: "When agents call customers or return missed calls, Hanva displays the business virtual number, keeping personal numbers private.",
        },
      ]}
      capabilities={[
        {
          title: "High-Trust 10-Digit Mobile DIDs",
          description: "Prospects are significantly more likely to answer calls from authentic 10-digit mobile numbering series than obscure landlines.",
          badge: "Pick-up Rate",
        },
        {
          title: "High Concurrency Channels",
          description: "Never lose a high-intent customer to a busy line. Channels scale to accommodate simultaneous inbound advertising spikes.",
          badge: "Concurrency",
        },
        {
          title: "Two-Way Number Masking",
          description: "Safeguard customer phone numbers and agent personal numbers on delivery, cab, or real-estate marketplaces.",
          badge: "Privacy",
        },
        {
          title: "Marketing Campaign Tracking",
          description: "Tag every incoming call by marketing channel in your CRM to evaluate cost-per-lead and campaign effectiveness.",
          badge: "Attribution",
        },
        {
          title: "Centralized Audio Archiving",
          description: "Every call routed through the virtual number is automatically recorded in dual-channel audio and saved to CRM records.",
          badge: "Compliance",
        },
        {
          title: "Assisted Statutory KYC",
          description: "Our dedicated regulatory operations desk helps you submit and verify DoT-mandated corporate documents through guided onboarding workflows.",
          badge: "TRAI / DoT Aligned",
        },
      ]}
      useCases={[
        {
          audience: "Digital Marketing Teams",
          title: "Call Tracking & Attribution",
          description: "Assign separate virtual numbers to Google Ads, Meta Ads, and print brochures to identify which channel generates the highest revenue.",
        },
        {
          audience: "Marketplaces & Aggregators",
          title: "Buyer-Seller Number Masking",
          description: "Connect buyers and service providers (drivers, delivery partners, brokers) safely without revealing personal phone numbers.",
        },
        {
          audience: "Growing Startups & SMBs",
          title: "Professional Corporate Identity",
          description: "Establish an enterprise business presence without installing physical landlines or managing multiple SIM cards.",
        },
      ]}
      ecosystemSynergies={[
        {
          title: "1800 Toll-Free Numbers",
          description: "Complement your 10-digit virtual mobile numbers with free-to-call enterprise 1800 toll-free lines.",
          href: "/products/toll-free-numbers/",
        },
        {
          title: "Smart Multi-Level IVR",
          description: "Attach multi-level greeting menus and automated department routing to your virtual mobile DIDs.",
          href: "/products/ivr-system/",
        },
        {
          title: "Telecalling & Sales CRM",
          description: "Every incoming call on your virtual number automatically creates or updates contact records in CRM.",
          href: "/products/telecalling-crm/",
        },
      ]}
      faqs={[
        {
          question: "Can I receive multiple calls at the same time on one virtual number?",
          answer: "Yes. Unlike a standard physical SIM card which can handle only one call at a time, Hanva virtual numbers feature high concurrency channels that allow multiple callers to connect simultaneously without busy tones.",
        },
        {
          question: "What documents are required for virtual number KYC in India?",
          answer: "In compliance with Department of Telecommunications (DoT) directives, businesses must provide: Certificate of Incorporation (or Partnership deed / GST certificate), Company PAN, Authorized Signatory Aadhaar/Passport, and an official authorization letter on company letterhead.",
        },
        {
          question: "Can my sales agents make outbound calls using the virtual number as caller ID?",
          answer: "Yes. When agents initiate calls through our telecalling CRM or browser WebRTC softphone, the virtual mobile number displays as the outgoing caller ID to the customer.",
        },
        {
          question: "Can customers send SMS or WhatsApp messages to the virtual number?",
          answer: "Yes. Virtual numbers can be paired with WhatsApp Business API messaging accounts via supported provider gateways so your team can handle voice calls and WhatsApp messages under a unified brand identifier.",
        },
      ]}
      schemaData={virtualNumbersSchema}
    />
  );
}
