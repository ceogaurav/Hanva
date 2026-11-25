import * as React from "react";
import { LocationLayout } from "@/components/shared/location-layout";
import { CONTACT_CONFIG } from "@/lib/config";

export const metadata = {
  title: "Cloud Telephony & Telecalling CRM in Bengaluru (080 Virtual Numbers)",
  description:
    "Enterprise cloud telephony, 080 virtual numbers, and telecalling CRM for Bengaluru tech startups, SaaS teams, and real estate developers. On-site engineering at our Garvebhavi Palya HQ.",
  alternates: {
    canonical: "https://hanva.in/locations/bengaluru/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hanva.in/locations/bengaluru/",
    siteName: "Hanva Technologies",
    title: "Cloud Telephony & Telecalling CRM in Bengaluru | Hanva Technologies",
    description:
      "Enterprise cloud telephony, 080 virtual numbers, and telecalling CRM for Bengaluru tech startups, SaaS teams, and real estate developers.",
    images: [{ url: "https://hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Bengaluru Headquarters" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Telephony & Telecalling CRM in Bengaluru | Hanva Technologies",
    description:
      "Enterprise cloud telephony, 080 virtual numbers, and telecalling CRM for Bengaluru tech startups, SaaS teams, and real estate developers.",
    images: ["https://hanva.in/og-image.png"],
  },
};

const bengaluruHQSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Corporation",
      "@id": "https://hanva.in/#corporation",
      name: "Hanva Technologies Private Limited",
      legalName: "Hanva Technologies Private Limited",
      url: "https://hanva.in",
      logo: "https://hanva.in/logo.png",
      telephone: "+91-9606099404",
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
      "@id": "https://hanva.in/locations/bengaluru/#local-business",
      name: "Hanva Technologies — Bengaluru Registered Headquarters",
      parentOrganization: {
        "@id": "https://hanva.in/#corporation",
      },
      url: "https://hanva.in/locations/bengaluru/",
      telephone: "+91-9606099404",
      priceRange: "₹₹",
      image: "https://hanva.in/og-image.png",
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
        phone: "+91 96060 99404",
      }}
      marketContext="As India's Silicon Valley, Bengaluru demands high-agility, API-first communication infrastructure. Tech startups in HSR Layout and Koramangala require instant WebRTC browser calling, while real estate developers along Whitefield and Sarjapur Road depend on rapid lead response to capture property buyers. Hanva's registered headquarters in Garvebhavi Palya provides local technical support, on-site onboarding, and low-latency SIP trunks interconnected with Tata Teleservices and Vodafone Idea."
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
          description: "Transparent 15s billing pulse with zero unbilled rounding or hidden fees.",
        },
        {
          label: "WebRTC Media Transit",
          value: "< 12ms Latency",
          description: "Local media relay points providing crystal-clear browser audio for remote telecallers.",
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
          description: "Acquire dedicated 080 landline DIDs and 10-digit virtual mobile numbers with instant activation.",
          href: "/products/virtual-numbers/",
        },
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
          question: "Can we visit Hanva's Bengaluru headquarters for a technical consultation?",
          answer: "Yes. Our registered corporate headquarters and engineering office is located at Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya, Bengaluru - 560068. We welcome scheduled technical consultations and enterprise onboarding sessions.",
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
          answer: "Traditional telecom operators often bill in 60-second increments, meaning a 16-second call is billed as a full minute. Hanva's transparent 15-second pulse calculates charges in 15-second intervals, saving high-volume outbound calling operations up to 30% on talk time.",
        },
      ]}
    />
  );
}
