import * as React from "react";
import { LocationLayout } from "@/components/shared/location-layout";

export const metadata = {
  title: "CRM, Software Dev & 044 Cloud Chennai",
  description:
    "Remote SaaS, custom CRM/ERP engineering, digital marketing, Salon & POS software, and 044 cloud telephony delivered remotely for Chennai OMR and Guindy businesses.",
  alternates: {
    canonical: "https://www.hanva.in/locations/chennai/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/locations/chennai/",
    siteName: "Hanva Technologies",
    title: "CRM, Software Dev & 044 Cloud Chennai",
    description:
      "Remote SaaS, custom CRM/ERP engineering, digital marketing, and 044 cloud telephony for Chennai enterprises.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Chennai Remote Coverage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM, Software Dev & 044 Cloud Chennai",
    description:
      "Remote SaaS software, custom engineering, and 044 telephony solutions for Chennai.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const chennaiServiceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.hanva.in/locations/chennai/#webpage",
      url: "https://www.hanva.in/locations/chennai/",
      name: "Cloud Telephony & Telecalling CRM in Chennai — Hanva",
      description:
        "Enterprise cloud telephony infrastructure, 044 virtual numbers, and telecalling CRM for Chennai SaaS enterprises, industrial manufacturing, and healthcare.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://www.hanva.in/#website",
        name: "Hanva Technologies",
        url: "https://www.hanva.in",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.hanva.in/locations/chennai/#service",
      name: "Cloud Telephony & Enterprise Communication Solutions — Chennai",
      serviceType: "Cloud Telephony, Smart IVR, 044 Virtual Numbers, and Telecalling CRM",
      provider: {
        "@type": "Corporation",
        name: "Hanva Technologies Private Limited",
        url: "https://www.hanva.in",
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
      areaServed: {
        "@type": "City",
        name: "Chennai",
        sameAs: "https://en.wikipedia.org/wiki/Chennai",
      },
    },
  ],
};

export default function ChennaiLocationPage() {
  return (
    <LocationLayout
      cityName="Chennai"
      regionBadge="Tamil Nadu Circle (STD 044)"
      title="Cloud Telephony & Telecalling CRM in Chennai"
      subtitle="Robust cloud communication architecture, Tamil and English bilingual IVR systems, and telecalling CRM for Chennai's enterprise SaaS ecosystem and manufacturing supply chains."
      isPhysicalHeadquarters={false}
      remoteDeliveryDetails={{
        stdCode: "044",
        didSeries: "044-XXXX-XXXX (Landline Series)",
        carrierPartners: "Tata Teleservices & Vodafone Idea (Vi)",
        deploymentTime: "24 – 48 Hours Digital KYC Activation",
      }}
      marketContext="Chennai is renowned as the SaaS capital of India along the Old Mahabalipuram Road (OMR) IT corridor, as well as the 'Detroit of Asia' with deep automotive manufacturing clusters in Sriperumbudur and Guindy. Furthermore, Chennai's world-class medical tourism and educational institutions demand dependable inbound IVR systems capable of handling multi-lingual patient and student inquiries in Tamil and English reliably."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Locations", href: "/locations/" },
        { label: "Chennai" },
      ]}
      whatsappRef="/locations/chennai/"
      schemaData={chennaiServiceSchema}
      telecomSpecs={[
        {
          label: "Virtual Number Allocation",
          value: "044-XXXX-XXXX",
          description: "Authentic Chennai landline DID series projecting established regional presence.",
        },
        {
          label: "Carrier Interconnects",
          value: "Tata TTBS & Vi Business",
          description: "Dual-carrier SIP trunk infrastructure connected directly to Chennai telecom exchanges.",
        },
        {
          label: "Bilingual IVR Prompting",
          value: "Tamil & English",
          description: "Native dual-language voice trees ensuring clear customer and vendor communication.",
        },
        {
          label: "Pulse Billing Model",
          value: "15-Second Pulse",
          description: "Transparent 15-second carrier pulse billing with zero hidden minimum durations.",
        },
      ]}
      challenges={[
        {
          challenge: "Export manufacturers and component suppliers in Sriperumbudur miss critical international buyer calls because of outdated copper EPABX lines.",
          solution: "Hanva replaces copper lines with enterprise cloud SIP trunks, routing calls reliably to computer softphones or mobile devices anywhere in the plant.",
        },
        {
          challenge: "Universities and coaching academies face an overwhelming flood of student admission inquiries during entrance exam results, causing jammed switchboards.",
          solution: "Hanva's cloud IVR handles hundreds of concurrent callers smoothly, answering FAQs automatically and routing high-priority applicants to admission counselors.",
        },
        {
          challenge: "SaaS companies along OMR struggle to integrate traditional telephony systems with modern cloud CRMs and customer support ticketing tools.",
          solution: "Hanva's developer-friendly REST APIs and webhooks push real-time call events, audio links, and durations seamlessly into your CRM workflows.",
        },
        {
          challenge: "Multi-lingual customers across Tamil Nadu hang up when IVR systems only provide English or Hindi voice menus without Tamil options.",
          solution: "Hanva provides native Tamil voice prompts and routing trees, ensuring callers feel understood and valued from the moment the call connects.",
        },
      ]}
      workflowTitle="Chennai SaaS & Industrial Communication Flow"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Inbound 044 DID Ring",
          description: "Customer or vendor dials 044 virtual number. Dual-language menu offers Tamil and English choices.",
        },
        {
          step: "STAGE 02",
          title: "Skill-Based Routing",
          description: "System evaluates caller selection and routes call to specialized technical support or sales engineers.",
        },
        {
          step: "STAGE 03",
          title: "WebRTC Softphone Connect",
          description: "Engineer answers call via browser softphone with zero desktop software installation required.",
        },
        {
          step: "STAGE 04",
          title: "CRM Case Update",
          description: "Customer ticket updates in Hanva CRM with audio recording, agent notes, and automated WhatsApp follow-up.",
        },
      ]}
      synergies={[
        {
          title: "Cloud Telephony Platform",
          description: "Multi-level smart IVR menus, department routing algorithms, and enterprise virtual numbers.",
          href: "/products/cloud-telephony/",
        },
        {
          title: "Telecalling Sales CRM",
          description: "Manage telecaller quotas, lead stages, live call monitoring, and performance dashboards.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "Virtual Phone Numbers",
          description: "Acquire dedicated 044 landline DIDs and 10-digit virtual mobile numbers with KYC-verified activation in 24–48 business hours.",
          href: "/products/virtual-numbers/",
        },
      ]}
      remoteEngagementNote="Businesses across Chennai, OMR, Guindy, and Sriperumbudur are onboarded remotely by our Bengaluru team—covering cloud SaaS software, bespoke CRM/ERP development, digital marketing campaigns, and 044 virtual telephony."
      solutionsPortfolio={[
        { category: "SaaS Product", title: "Hanva CRM", description: "Multi-channel CRM, C2C calling & IVR workflows for Chennai inside-sales & SaaS teams.", href: "/products/crm/" },
        { category: "IT Service", title: "Custom CRM & ERP Development", description: "Tailored dealer portals, manufacturing ERP & internal approval workflows.", href: "/software-development/custom-crm-development/" },
        { category: "SaaS Product", title: "Hanva Salon Software", description: "GST billing, appointment calendar & staff commissions for single-outlet beauty studios.", href: "/products/salon-software/" },
        { category: "SaaS Product", title: "Hanva Restaurant POS", description: "KOT/KDS, India CGST/SGST billing, UPI QR & recipe BOM stock for eateries.", href: "/products/restaurant-pos/" },
        { category: "IT Service", title: "SEO & Google Ads", description: "Search marketing services for B2B engineering, healthcare & commercial businesses.", href: "/digital-marketing/" },
        { category: "Buyer Guide", title: "SaaS vs Custom CRM/ERP", description: "Compare off-the-shelf SaaS vs custom engineering for manufacturing & B2B teams.", href: "/resources/saas-vs-custom-crm-erp-guide/" },
      ]}
      relatedIndustries={[
        {
          title: "Education & Admissions",
          description: "Admissions counseling auto-dialers, student lead stages, and counseling recording archival.",
          href: "/industry/education/",
        },
        {
          title: "Automobile Dealerships",
          description: "Showroom inbound inquiry tracking, test-drive booking, and service recall dialers.",
          href: "/industry/automobile/",
        },
        {
          title: "Healthcare & Diagnostics",
          description: "24/7 patient booking IVR, automated appointment reminders, and diagnostic report dispatch.",
          href: "/industry/healthcare/",
        },
      ]}
      faqs={[
        {
          question: "Can Chennai businesses configure IVRs with Tamil audio prompts?",
          answer: "Yes. Hanva supports native Tamil language audio prompts recorded professionally or generated via high-quality speech synthesis, accompanied by English options for international callers.",
        },
        {
          question: "How does Hanva support SaaS companies in Chennai with remote sales teams?",
          answer: "Hanva's WebRTC browser softphone requires only a web browser and an internet connection. Remote sales and support reps can make and receive calls on dedicated 044 numbers from anywhere in India without hardware setup.",
        },
        {
          question: "Can we use 044 numbers for both inbound customer care and outbound calling?",
          answer: "Yes. Hanva's 044 virtual DIDs are bidirectional, serving as your official inbound support hotline as well as the trusted Caller ID displayed during outbound telecalling campaigns.",
        },
        {
          question: "What is the KYC process for obtaining a Chennai 044 landline virtual number?",
          answer: "In compliance with DoT regulations, businesses submit standard digital KYC documents (Company Certificate of Incorporation, GSTIN, and Authorized Signatory ID). Number provisioning is completed within 24 to 48 business hours.",
        },
      ]}
    />
  );
}
