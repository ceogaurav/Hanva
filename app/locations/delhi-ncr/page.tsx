import * as React from "react";
import { LocationLayout } from "@/components/shared/location-layout";

export const metadata = {
  title: "Cloud Telephony & Telecalling CRM in Delhi NCR (011 Virtual Numbers)",
  description:
    "Enterprise cloud telephony, 011 virtual numbers, auto-dialers, and telecalling CRM for Delhi NCR, Gurugram, and Noida. E-commerce number masking and high-volume sales calling.",
  alternates: {
    canonical: "https://hanva.in/locations/delhi-ncr/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hanva.in/locations/delhi-ncr/",
    siteName: "Hanva Technologies",
    title: "Cloud Telephony & Telecalling CRM in Delhi NCR | Hanva Technologies",
    description:
      "Enterprise cloud telephony, 011 virtual numbers, auto-dialers, and telecalling CRM for Delhi NCR, Gurugram, and Noida.",
    images: [{ url: "https://hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Delhi NCR Telephony Hub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Telephony & Telecalling CRM in Delhi NCR | Hanva Technologies",
    description:
      "Enterprise cloud telephony, 011 virtual numbers, auto-dialers, and telecalling CRM for Delhi NCR, Gurugram, and Noida.",
    images: ["https://hanva.in/og-image.png"],
  },
};

const delhiNcrServiceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://hanva.in/locations/delhi-ncr/#webpage",
      url: "https://hanva.in/locations/delhi-ncr/",
      name: "Cloud Telephony & Telecalling CRM in Delhi NCR — Hanva",
      description:
        "Enterprise cloud telephony infrastructure, 011 virtual numbers, and predictive auto-dialers for Delhi NCR, Gurugram, and Noida businesses.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://hanva.in/#website",
        name: "Hanva Technologies",
        url: "https://hanva.in",
      },
    },
    {
      "@type": "Service",
      "@id": "https://hanva.in/locations/delhi-ncr/#service",
      name: "Cloud Telephony & Outbound Call Center Solutions — Delhi NCR",
      serviceType: "Cloud Telephony, Auto Dialer, 011 Virtual Numbers, and Telecalling CRM",
      provider: {
        "@type": "Corporation",
        name: "Hanva Technologies Private Limited",
        url: "https://hanva.in",
        telephone: "+91-8423711043",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560068",
          addressCountry: "IN",
        },
      },
      areaServed: [
        {
          "@type": "City",
          name: "Delhi",
        },
        {
          "@type": "City",
          name: "Gurgaon",
        },
        {
          "@type": "City",
          name: "Noida",
        },
      ],
    },
  ],
};

export default function DelhiNcrLocationPage() {
  return (
    <LocationLayout
      cityName="Delhi NCR"
      regionBadge="Delhi Metro Circle (STD 011)"
      title="Cloud Telephony & Telecalling CRM in Delhi NCR"
      subtitle="High-velocity cloud communication architecture for Delhi NCR, Gurugram, and Noida enterprises, e-commerce logistics operators, and outbound telesales operations."
      isPhysicalHeadquarters={false}
      remoteDeliveryDetails={{
        stdCode: "011",
        didSeries: "011-XXXX-XXXX (Landline Series)",
        carrierPartners: "Tata Teleservices & Vodafone Idea (Vi)",
        deploymentTime: "24 – 48 Hours Digital KYC Activation",
      }}
      marketContext="The National Capital Region (NCR) represents India's largest consumer and distribution corridor, connecting corporate headquarters in Gurugram, tech and media hubs in Noida, and high-volume wholesale commercial centers across Delhi. E-commerce platforms, D2C brands, and logistics operators here require virtual phone number masking to safeguard customer privacy, while outbound sales call centers need high-throughput auto-dialers with transparent 15-second carrier pulse billing."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Locations", href: "/locations/" },
        { label: "Delhi NCR" },
      ]}
      whatsappRef="/locations/delhi-ncr/"
      schemaData={delhiNcrServiceSchema}
      telecomSpecs={[
        {
          label: "Virtual Number Allocation",
          value: "011-XXXX-XXXX",
          description: "Prestigious national capital landline DID series commanding enterprise credibility.",
        },
        {
          label: "Dual-Carrier Trunking",
          value: "Tata TTBS & Vi Business",
          description: "High-capacity PRI/SIP trunk interconnects across Delhi and Haryana/UP circles.",
        },
        {
          label: "Number Masking Architecture",
          value: "Cloud Call Bridging",
          description: "Two-legged carrier call bridging keeping delivery rider and customer numbers private.",
        },
        {
          label: "Pulse Billing Model",
          value: "15-Second Pulse",
          description: "15-second OBD pulse billing reducing rounding waste on short outbound telesales calls.",
        },
      ]}
      challenges={[
        {
          challenge: "E-commerce and D2C delivery riders contact customers using personal SIM cards, resulting in customer privacy complaints and off-platform disintermediation.",
          solution: "Hanva's cloud number masking bridges calls dynamically through a temporary virtual number, keeping both driver and customer personal numbers completely private.",
        },
        {
          challenge: "Outbound telemarketing floors in Noida and Gurugram suffer massive agent idle times when agents dial phone numbers manually from spreadsheets.",
          solution: "Hanva's auto-dialer queues leads sequentially, filtering out invalid numbers and connecting telecallers only when a live prospect answers.",
        },
        {
          challenge: "Cash-on-Delivery (COD) orders suffer high Return-to-Origin (RTO) rates because customers forget they ordered or were unavailable at delivery.",
          solution: "Automated outbound IVR calls verify delivery addresses and confirm buyer availability before the package leaves the regional fulfillment hub.",
        },
        {
          challenge: "Telecom operators reject bulk promotional communications due to non-compliant SMS headers and unregistered sender IDs.",
          solution: "Hanva assists Delhi NCR enterprises with TRAI DLT registration and pre-approved WhatsApp Business templates for compliant campaign delivery.",
        },
      ]}
      workflowTitle="Delhi NCR Outbound Telesales & Logistics Flow"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Lead Campaign Upload",
          description: "Sales manager uploads segmented prospect lists with custom fields into Hanva CRM.",
        },
        {
          step: "STAGE 02",
          title: "Predictive Outbound Ring",
          description: "Auto-dialer rings prospects presenting verified 011 virtual number, filtering out busy tones and dead lines.",
        },
        {
          step: "STAGE 03",
          title: "Agent Softphone Screen-Pop",
          description: "Telecaller browser softphone pops up prospect details instantly as the customer answers the call.",
        },
        {
          step: "STAGE 04",
          title: "Automated Disposition & Action",
          description: "Agent marks outcome as 'Callback' or 'Interested', immediately scheduling follow-ups or sending a WhatsApp brochure.",
        },
      ]}
      synergies={[
        {
          title: "Auto Dialer Software",
          description: "Progressive and predictive outbound calling engine designed for high-concurrency telesales.",
          href: "/products/auto-dialer/",
        },
        {
          title: "Telecalling Sales CRM",
          description: "Manage telecaller quotas, lead stages, live call monitoring, and performance dashboards.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Deploy shared team inboxes, document intake, and verified business messaging templates.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      relatedIndustries={[
        {
          title: "Logistics & Supply Chain",
          description: "Driver-customer number masking, delivery confirmations, and dispatch coordination.",
          href: "/industry/logistics/",
        },
        {
          title: "Financial Services & Lending",
          description: "Loan qualification workflows, KYC collection, and debt recovery calling.",
          href: "/industry/financial-services/",
        },
        {
          title: "Automobile Dealerships",
          description: "Showroom inbound inquiry tracking, test-drive booking, and service recall dialers.",
          href: "/industry/automobile/",
        },
      ]}
      faqs={[
        {
          question: "Can our Gurugram and Noida teams use 011 virtual numbers?",
          answer: "Yes. Even though Gurugram falls under Haryana and Noida under Uttar Pradesh, businesses operating across Delhi NCR can utilize central 011 virtual numbers provisioned via cloud telephony to project a unified national presence.",
        },
        {
          question: "How does Hanva prevent delivery driver phone number leakage in Delhi NCR?",
          answer: "Through our virtual number masking API. When a delivery executive clicks 'Call Customer' in their mobile logistics application, Hanva's gateway bridges both legs through an ephemeral virtual proxy number, keeping both phone numbers confidential.",
        },
        {
          question: "Can we integrate Hanva with our custom e-commerce or CRM software?",
          answer: "Yes. Hanva provides developer-ready webhooks and REST APIs to push real-time call events, recording links, duration metrics, and agent dispositions directly into your internal systems.",
        },
        {
          question: "What hardware is needed to set up a 100-agent telecalling center in Delhi NCR?",
          answer: "Zero telecom hardware is needed. Agents only require a standard computer with an internet browser (Chrome/Edge/Firefox) and a headset, or standard smartphones running the Hanva Android telecalling companion app.",
        },
      ]}
    />
  );
}
