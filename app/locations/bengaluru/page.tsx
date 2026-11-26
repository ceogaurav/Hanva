import * as React from "react";
import { LocationLayout } from "@/components/shared/location-layout";
import { CONTACT_CONFIG } from "@/lib/config";

export const metadata = {
  title: "IT Solutions & 080 Cloud CRM Bengaluru",
  description:
    "Hanva Technologies Bengaluru HQ: Hanva CRM, Salon Software, Restaurant POS, custom software, digital marketing, and 080 cloud telephony from our Garvebhavi Palya office.",
  alternates: {
    canonical: "https://www.hanva.in/locations/bengaluru/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/locations/bengaluru/",
    siteName: "Hanva Technologies",
    title: "IT Solutions & 080 Cloud CRM Bengaluru",
    description:
      "Hanva Technologies Bengaluru HQ offering SaaS products, custom engineering, digital marketing, and 080 cloud telephony.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Bengaluru Headquarters" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Solutions & 080 Cloud CRM Bengaluru",
    description:
      "Hanva Technologies Bengaluru HQ: SaaS software, IT services, and 080 cloud telephony.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const bengaluruHQSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Corporation",
      "@id": "https://www.hanva.in/#corporation",
      name: "Hanva Technologies Private Limited",
      legalName: "Hanva Technologies Private Limited",
      url: "https://www.hanva.in",
      logo: "https://www.hanva.in/logo.png",
      telephone: "+91-8423711043",
      email: "info@hanva.in",
      identifier: "U78100KA2025PTC205168",
      taxID: "29AAICH0526K1ZF",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560068",
        addressCountry: "IN",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.hanva.in/locations/bengaluru/#local-business",
      name: "Hanva Technologies — Bengaluru Commercial Office",
      parentOrganization: {
        "@id": "https://www.hanva.in/#corporation",
      },
      url: "https://www.hanva.in/locations/bengaluru/",
      telephone: "+91-8423711043",
      priceRange: "₹₹",
      image: "https://www.hanva.in/og-image.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560068",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.8988,
        longitude: 77.6364,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      areaServed: [
        {
          "@type": "City",
          name: "Bengaluru",
        },
        {
          "@type": "AdministrativeArea",
          name: "Karnataka",
        },
      ],
    },
  ],
};

export default function BengaluruLocationPage() {
  return (
    <LocationLayout
      cityName="Bengaluru"
      regionBadge="Karnataka Circle (STD 080)"
      title="Cloud Telephony & Telecalling CRM in Bengaluru"
      subtitle="Modern business communication infrastructure for Bangalore's SaaS companies, high-growth startups, EdTech counselor floors, and premier real estate developers."
      isPhysicalHeadquarters={true}
      officeDetails={{
        address: "Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya",
        cityStateZip: "Bengaluru - 560068, Karnataka, India",
        operatingHours: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
        phone: CONTACT_CONFIG.phoneDisplay,
      }}
      marketContext="As India's Silicon Valley, Bengaluru demands high-agility, API-first communication infrastructure. Tech startups in HSR Layout and Koramangala require instant WebRTC browser calling, while real estate developers along Whitefield and Sarjapur Road depend on rapid lead response to capture property buyers. Hanva's Garvebhavi Palya commercial office provides local technical support, guided onboarding, and carrier-grade SIP trunks interconnected with Tata Teleservices and Vodafone Idea."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Locations", href: "/locations/" },
        { label: "Bengaluru" },
      ]}
      whatsappRef="/locations/bengaluru/"
      schemaData={bengaluruHQSchema}
      telecomSpecs={[
        {
          label: "Virtual Number Series",
          value: "080-XXXX-XXXX",
          description: "Authentic Bengaluru landline DID series projecting local institutional credibility.",
        },
        {
          label: "Carrier Interconnects",
          value: "Tata & Vi Business",
          description: "Dual-carrier PRI/SIP trunk redundancy ensuring continuous uptime and carrier SLA.",
        },
        {
          label: "Pulse Billing Model",
          value: "15-Second Pulse",
          description: "15-second OBD pulse option reducing rounding waste on short calls compared to 60s increments.",
        },
        {
          label: "WebRTC Media Transit",
          value: "Regional Media Relay",
          description: "Direct Bengaluru media relay points providing clear browser audio for remote telecallers.",
        },
      ]}
      challenges={[
        {
          challenge: "Startups using personal SIM cards for telecalling suffer low pickup rates due to Truecaller spam flags and lost customer history when agents resign.",
          solution: "Hanva provisions dedicated 080 virtual numbers and centralized telecalling CRM, ensuring every customer interaction is logged, recorded, and owned by the company.",
        },
        {
          challenge: "Real estate developers in Whitefield and Bellandur lose high-intent portal leads because sales reps take hours to dial inquiries from spreadsheets.",
          solution: "Automated webhook intake ingests portal inquiries instantly and pushes them into telecaller auto-dialing queues within seconds of submission.",
        },
        {
          challenge: "Legacy cloud telephony providers charge exorbitant minimum commitments, double-leg call rates, and rigid multi-year hardware lock-ins.",
          solution: "Hanva delivers transparent 15-second carrier pulse billing with an integrated CRM, WebRTC browser softphones, and no on-premises hardware.",
        },
        {
          challenge: "Fast-scaling tech companies struggle with clunky legacy software interfaces that do not connect to modern webhooks or export data cleanly.",
          solution: "Hanva's modern Next.js 14 architecture provides instant webhook dispatch, automated WhatsApp follow-ups, and developer-friendly REST endpoints.",
        },
      ]}
      workflowTitle="Bengaluru Inbound & Outbound Calling Flow"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Inbound 080 Routing",
          description: "Customer dials your dedicated 080 virtual DID. Intelligent IVR evaluates caller intent and routes to the right team queue.",
        },
        {
          step: "STAGE 02",
          title: "WebRTC Softphone Connect",
          description: "Call rings simultaneously on agent browser softphones or bridges directly to agent mobile handsets with zero hardware setup.",
        },
        {
          step: "STAGE 03",
          title: "Automated Lead Sync",
          description: "Customer timeline updates automatically in Hanva CRM with call duration, agent notes, disposition tags, and stereo audio.",
        },
        {
          step: "STAGE 04",
          title: "WhatsApp Brochure Delivery",
          description: "On call termination, an automated pre-approved WhatsApp message delivers project collaterals or product documentation.",
        },
      ]}
      synergies={[
        {
          title: "Cloud Telephony Platform",
          description: "Multi-level smart IVR menus, call routing algorithms, and enterprise virtual numbers.",
          href: "/products/cloud-telephony/",
        },
        {
          title: "Telecalling Sales CRM",
          description: "Manage telecaller quotas, lead stages, live call monitoring, and performance dashboards.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "Virtual Phone Numbers",
          description: "Acquire dedicated 080 landline DIDs and 10-digit virtual mobile numbers with KYC-verified activation in 24–48 business hours.",
          href: "/products/virtual-numbers/",
        },
      ]}
      remoteEngagementNote="From our Bengaluru commercial office in Garvebhavi Palya (near Hosur Main Road), Hanva Technologies supports startups, salons, restaurants, and enterprises across Bengaluru with SaaS onboarding, digital marketing retainers, custom software development, and 080 cloud telephony."
      solutionsPortfolio={[
        { category: "SaaS Product", title: "Hanva CRM", description: "Lead pipelines, built-in IVR, C2C calling, WhatsApp integration, and attendance.", href: "/products/crm/" },
        { category: "SaaS Product", title: "Hanva Salon Software", description: "GST billing, online booking mini-website, staff commissions & inventory for Bengaluru studios.", href: "/products/salon-software/" },
        { category: "SaaS Product", title: "Hanva Restaurant POS", description: "Offline-resilient POS, KOT/KDS, QR ordering & recipe BOM stock for cafes and kitchens.", href: "/products/restaurant-pos/" },
        { category: "IT Service", title: "Digital Marketing Services", description: "Technical SEO, Google Ads & Social Media campaigns connected to CRM attribution.", href: "/digital-marketing/" },
        { category: "IT Service", title: "Software Development", description: "Custom CRM/ERP, web portals, mobile apps, e-commerce, and AI workflow engineering.", href: "/software-development/" },
        { category: "Buyer Guide", title: "Salon Software Buying Guide", description: "Evaluate GST billing, commissions, and auto-consumption before choosing software.", href: "/resources/salon-management-software-guide/" },
      ]}
      relatedIndustries={[
        {
          title: "Real Estate & Infrastructure",
          description: "Automated portal lead response, virtual number masking, and site-visit tracking.",
          href: "/industry/real-estate/",
        },
        {
          title: "EdTech & Admissions",
          description: "High-velocity counseling auto-dialers, student lead stages, and counseling recording.",
          href: "/industry/education/",
        },
        {
          title: "Recruitment & Staffing",
          description: "Candidate interview scheduling, screening auto-dialing, and status tracking.",
          href: "/industry/recruitment/",
        },
      ]}
      faqs={[
        {
          question: "Can we visit Hanva's Bengaluru commercial office for a technical consultation?",
          answer: "Yes. Our commercial operational office is located at Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya, Bengaluru - 560068 (with our registered corporate office in Bommanahalli, Bengaluru - 560068). We welcome scheduled technical consultations and enterprise onboarding sessions.",
        },
        {
          question: "How quickly can we activate 080 virtual numbers in Bengaluru?",
          answer: "Once standard digital KYC documentation (Certificate of Incorporation, GSTIN, and Authorized Signatory ID) is verified, 080 virtual numbers are typically provisioned within 24 to 48 business hours via our Tata and Vi carrier interconnects.",
        },
        {
          question: "Do our agents need physical landline telephones or EPABX boxes?",
          answer: "No. Hanva is a 100% cloud-native platform. Agents place and receive calls directly through WebRTC in their web browser or through the companion Android telecaller application on their existing smartphones.",
        },
        {
          question: "How does 15-second carrier pulse billing benefit our telecalling team?",
          answer: "Traditional telecom operators often bill in 60-second increments, meaning a 16-second call is billed as a full minute. Hanva's transparent 15-second pulse calculates charges in 15-second intervals, reducing unbilled rounding waste on short calls compared to 60-second pulse rounding.",
        },
      ]}
    />
  );
}
