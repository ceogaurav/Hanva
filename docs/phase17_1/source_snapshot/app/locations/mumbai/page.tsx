import * as React from "react";
import { LocationLayout } from "@/components/shared/location-layout";

export const metadata = {
  title: "BFSI CRM, SaaS & 022 Telephony Mumbai",
  description:
    "Remote SaaS, digital marketing, software engineering, and 022 cloud telephony for Mumbai and MMR BFSI desks, real estate teams, salons, and restaurants.",
  alternates: {
    canonical: "https://www.hanva.in/locations/mumbai/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/locations/mumbai/",
    siteName: "Hanva Technologies",
    title: "BFSI CRM, SaaS & 022 Telephony Mumbai",
    description:
      "Remote cloud CRM, SaaS products, digital marketing, and 022 telephony solutions for Mumbai enterprises.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Mumbai Remote Coverage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BFSI CRM, SaaS & 022 Telephony Mumbai",
    description:
      "Remote SaaS, IT services, and 022 cloud telephony coverage for Mumbai.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const mumbaiServiceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.hanva.in/locations/mumbai/#webpage",
      url: "https://www.hanva.in/locations/mumbai/",
      name: "Cloud Telephony & Telecalling CRM in Mumbai — Hanva",
      description:
        "Enterprise cloud telephony infrastructure, 022 virtual numbers, and telecalling CRM for Mumbai financial services, brokerages, and logistics enterprises.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://www.hanva.in/#website",
        name: "Hanva Technologies",
        url: "https://www.hanva.in",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.hanva.in/locations/mumbai/#service",
      name: "Cloud Telephony & Business Communication Solutions — Mumbai",
      serviceType: "Cloud Telephony, Smart IVR, 022 Virtual Numbers, and Telecalling CRM",
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
        name: "Mumbai",
        sameAs: "https://en.wikipedia.org/wiki/Mumbai",
      },
    },
  ],
};

export default function MumbaiLocationPage() {
  return (
    <LocationLayout
      cityName="Mumbai"
      regionBadge="Mumbai Metro Circle (STD 022)"
      title="Cloud Telephony & Telecalling CRM in Mumbai"
      subtitle="Enterprise communication architecture engineered for Mumbai's BFSI giants, NBFC digital lending desks, insurance brokerages, and logistics dispatch operations."
      isPhysicalHeadquarters={false}
      remoteDeliveryDetails={{
        stdCode: "022",
        didSeries: "022-XXXX-XXXX (Landline Series)",
        carrierPartners: "Tata Teleservices & Vodafone Idea (Vi)",
        deploymentTime: "24 – 48 Hours Digital KYC Activation",
      }}
      marketContext="As India's financial capital, the Mumbai Metropolitan Region (MMR) demands unyielding telecommunications compliance, absolute data security, and high call concurrency. Financial institutions in BKC, Nariman Point, and Lower Parel require unalterable two-channel voice recording to satisfy SEBI and IRDAI mandates. Meanwhile, high-velocity lending DSAs and insurance agencies in Andheri and Thane depend on auto-dialers with trusted 022 Caller IDs to achieve healthy pickup rates."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Locations", href: "/locations/" },
        { label: "Mumbai" },
      ]}
      whatsappRef="/locations/mumbai/"
      schemaData={mumbaiServiceSchema}
      telecomSpecs={[
        {
          label: "Virtual Number Allocation",
          value: "022-XXXX-XXXX",
          description: "Authentic Mumbai landline DID series projecting institutional trust and regulatory presence.",
        },
        {
          label: "Carrier Trunking",
          value: "Tata TTBS & Vi Business",
          description: "Dual-carrier PRI/SIP trunk redundancy connected directly to Mumbai financial exchanges.",
        },
        {
          label: "Call Recording Archival",
          value: "100% Dual-Channel",
          description: "Encrypted stereo audio storage compliant with SEBI, IRDAI, and DPDP regulatory standards.",
        },
        {
          label: "Pulse Billing Model",
          value: "15-Second Pulse",
          description: "Transparent 15s billing pulse reducing unbilled pulse rounding waste over 60s increments.",
        },
      ]}
      challenges={[
        {
          challenge: "Lending DSAs and collection teams face low pickup rates when dialers present unverified GSM mobile numbers flagged as unknown or spam.",
          solution: "Hanva provisions verified 022 Mumbai virtual numbers that display consistent business landline caller identification to build prospect trust.",
        },
        {
          challenge: "BFSI risk and compliance officers risk heavy regulatory penalties if client call recordings are tampered with, deleted, or stored on unsecured rep laptops.",
          solution: "Hanva enforces automatic cloud recording with encrypted dual-channel audio storage and tamper-evident audit logs accessible only by authorized compliance managers.",
        },
        {
          challenge: "Insurance agencies struggle with slow policy renewals because telecallers have to manually toggle between dialer spreadsheets and WhatsApp messenger.",
          solution: "Hanva unifies progressive auto-dialing with instant post-call WhatsApp quote dispatch, allowing agents to send policy comparisons with a single click.",
        },
        {
          challenge: "Logistics dispatchers in Navi Mumbai and Bhiwandi risk customer privacy violations when delivery drivers contact consignees directly from personal phones.",
          solution: "Hanva's number masking bridges calls through a secure virtual number, allowing drivers and customers to speak without disclosing either party's private number.",
        },
      ]}
      workflowTitle="Mumbai BFSI & Corporate Communication Flow"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Loan Lead Ingestion",
          description: "Incoming digital lending inquiry from web portal or aggregator pushes immediately via webhook into Hanva CRM.",
        },
        {
          step: "STAGE 02",
          title: "022 Auto-Dialer Connect",
          description: "Auto-dialer rings borrower presenting verified 022 CLI, routing answered calls to available credit verification officers.",
        },
        {
          step: "STAGE 03",
          title: "Stereo Recording & Audit",
          description: "Call audio records in dual-channel stereo format, synchronizing with the borrower CRM record alongside disposition tags.",
        },
        {
          step: "STAGE 04",
          title: "WhatsApp KYC Collection",
          description: "Agent marks call outcome. An official WhatsApp message requests borrower PAN and bank statement uploads via pre-approved template.",
        },
      ]}
      synergies={[
        {
          title: "Cloud Telephony Platform",
          description: "Multi-level smart IVR menus, priority routing algorithms, and enterprise virtual numbers.",
          href: "/products/cloud-telephony/",
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
      remoteEngagementNote="Hanva serves Mumbai and MMR enterprises remotely from our Bengaluru headquarters via digital onboarding, WhatsApp consultation (+91 8423711043), and cloud delivery across BFSI, real estate, hospitality, wellness, and retail."
      solutionsPortfolio={[
        { category: "SaaS Product", title: "Hanva CRM", description: "Lead management, KYC document vault, C2C calling, IVR & browser recording playback.", href: "/products/crm/" },
        { category: "SaaS Product", title: "Hanva Salon Software", description: "Appointments, GST billing, memberships & commissions for Mumbai studios and spas.", href: "/products/salon-software/" },
        { category: "SaaS Product", title: "Hanva Restaurant POS", description: "Fast dine-in/takeaway POS, KDS, UPI QR & CGST/SGST receipts for Mumbai F&B.", href: "/products/restaurant-pos/" },
        { category: "IT Service", title: "Digital Marketing", description: "Performance Google Ads, technical SEO & social media retainers for high-intent leads.", href: "/digital-marketing/" },
        { category: "IT Service", title: "Software Development", description: "Custom CRM/ERP, web applications, e-commerce portals & API integrations.", href: "/software-development/" },
        { category: "Buyer Guide", title: "CRM with IVR vs Telecalling", description: "Determine the right calling & lead architecture for financial or sales teams.", href: "/resources/crm-with-ivr-vs-telecalling-crm/" },
      ]}
      relatedIndustries={[
        {
          title: "Financial Services & Lending",
          description: "Loan qualification workflows, KYC collection, and debt recovery calling.",
          href: "/industry/financial-services/",
        },
        {
          title: "Insurance Agencies & Brokers",
          description: "Policy renewal cadences, instant WhatsApp quote dispatch, and claims IVR routing.",
          href: "/industry/insurance/",
        },
        {
          title: "Logistics & Supply Chain",
          description: "Driver-customer number masking, dispatch coordination, and delivery alerts.",
          href: "/industry/logistics/",
        },
      ]}
      faqs={[
        {
          question: "Can Mumbai financial organizations obtain 022 virtual numbers without a local PBX?",
          answer: "Yes. Hanva provides 100% cloud-hosted 022 virtual numbers provisioned through Tata Teleservices and Vodafone Idea. Calls are routed directly to WebRTC browser softphones or bridged to agent mobile numbers with zero physical hardware required.",
        },
        {
          question: "Are call recordings compliant with SEBI and IRDAI regulatory guidelines?",
          answer: "Yes. Hanva captures high-fidelity two-channel stereo audio recordings, separating customer and agent tracks. Audio files are encrypted at rest with tamper-evident audit logs and retention controls tailored to regulatory requirements.",
        },
        {
          question: "How does virtual number masking work for Mumbai logistics and e-commerce companies?",
          answer: "When a driver needs to contact a customer, they click 'Call' in their application. Hanva's telephony engine calls the driver and bridges the customer simultaneously through a temporary virtual number, keeping both private phone numbers completely concealed.",
        },
        {
          question: "What is the onboarding SLA for deploying 50+ telecalling seats in Mumbai?",
          answer: "Upon receipt and verification of standard digital corporate KYC documents, 022 virtual DID trunks and agent CRM credentials are typically active within 24 to 48 business hours.",
        },
      ]}
    />
  );
}
