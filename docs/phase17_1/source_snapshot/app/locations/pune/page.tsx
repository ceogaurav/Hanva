import * as React from "react";
import { LocationLayout } from "@/components/shared/location-layout";

export const metadata = {
  title: "Auto CRM, SaaS & 020 Telephony Pune",
  description:
    "Remote onboarding for Pune and PCMC businesses: Hanva CRM, Salon & Restaurant POS SaaS, custom software development, digital marketing, and 020 virtual numbers.",
  alternates: {
    canonical: "https://www.hanva.in/locations/pune/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/locations/pune/",
    siteName: "Hanva Technologies",
    title: "Auto CRM, SaaS & 020 Telephony Pune",
    description:
      "Remote SaaS products, custom software, digital marketing, and 020 virtual telephony for Pune dealerships and IT firms.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Pune Remote Coverage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto CRM, SaaS & 020 Telephony Pune",
    description:
      "Remote SaaS, custom software, and 020 cloud telephony delivery for Pune.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const puneServiceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.hanva.in/locations/pune/#webpage",
      url: "https://www.hanva.in/locations/pune/",
      name: "Cloud Telephony & Telecalling CRM in Pune — Hanva",
      description:
        "Enterprise cloud telephony infrastructure, 020 virtual numbers, and auto-dialers for Pune automotive dealerships, workshops, and manufacturing sectors.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://www.hanva.in/#website",
        name: "Hanva Technologies",
        url: "https://www.hanva.in",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.hanva.in/locations/pune/#service",
      name: "Cloud Telephony & Automotive CRM Solutions — Pune",
      serviceType: "Cloud Telephony, Auto Dialer, 020 Virtual Numbers, and Telecalling CRM",
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
        name: "Pune",
        sameAs: "https://en.wikipedia.org/wiki/Pune",
      },
    },
  ],
};

export default function PuneLocationPage() {
  return (
    <LocationLayout
      cityName="Pune"
      regionBadge="Maharashtra Circle (STD 020)"
      title="Cloud Telephony & Telecalling CRM in Pune"
      subtitle="Automated telecalling systems, workshop recall auto-dialers, and 020 virtual numbers built for Pune's automobile dealerships, component manufacturers, and IT service providers."
      isPhysicalHeadquarters={false}
      remoteDeliveryDetails={{
        stdCode: "020",
        didSeries: "020-XXXX-XXXX (Landline Series)",
        carrierPartners: "Tata Teleservices & Vodafone Idea (Vi)",
        deploymentTime: "24 – 48 Hours Digital KYC Activation",
      }}
      marketContext="Pune is India's automotive powerhouse and a thriving technology hub. Over 400 authorized car and commercial vehicle dealerships across Pimpri-Chinchwad (PCMC), Hadapsar, and Baner manage thousands of scheduled Periodic Maintenance Service (PMS) recall calls each month. At the same time, precision engineering suppliers in Chakan and Talegaon require reliable virtual numbers to coordinate orders with international OEM supply chains."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Locations", href: "/locations/" },
        { label: "Pune" },
      ]}
      whatsappRef="/locations/pune/"
      schemaData={puneServiceSchema}
      telecomSpecs={[
        {
          label: "Virtual Number Allocation",
          value: "020-XXXX-XXXX",
          description: "Authentic Pune landline DID series projecting established local showroom presence.",
        },
        {
          label: "Carrier Redundancy",
          value: "Tata TTBS & Vi Business",
          description: "Dual-carrier SIP trunk infrastructure connected to Maharashtra telecom exchanges.",
        },
        {
          label: "SIM Companion Dialer",
          value: "Android App Supported",
          description: "Optionally place outgoing calls via corporate Android SIMs to eliminate per-call costs.",
        },
        {
          label: "Pulse Billing Model",
          value: "15-Second Pulse",
          description: "Transparent 15s billing pulse reducing unbilled pulse rounding waste over 60s increments.",
        },
      ]}
      challenges={[
        {
          challenge: "Dealership service receptionists manually dial hundreds of 10,000 km PMS reminders from paper job cards, causing high no-show rates in service bays.",
          solution: "Hanva's auto-dialer ingests service due lists and automatically calls vehicle owners, allowing reps to book service slots and confirm pickup requests.",
        },
        {
          challenge: "Prospective car buyers walk into showrooms or inquire online, but sales consultants forget to follow up promptly or fail to log test-drive outcomes.",
          solution: "Hanva unifies showroom lead routing, recording every buyer call and tracking test-drive milestones on the customer CRM timeline.",
        },
        {
          challenge: "Automotive dealerships pay high telephone bills because traditional telecom providers round up every brief 10-second inquiry call to a full minute.",
          solution: "Hanva supports 15-second carrier pulse billing options, ensuring brief dealership calls are metered in 15-second increments instead of full-minute rounding.",
        },
        {
          challenge: "Component manufacturers in Chakan struggle with lost vendor orders when clients call during loud factory floor operations.",
          solution: "Hanva's smart IVR routes calls intelligently to desktop softphones in the front office or forwards to plant managers' mobile phones with zero audio distortion.",
        },
      ]}
      workflowTitle="Pune Dealership Service Recall & Booking Flow"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Service Recall List Upload",
          description: "Service CRM automatically exports list of vehicles due for 6-month or 10,000 km maintenance.",
        },
        {
          step: "STAGE 02",
          title: "Auto-Dialer Call Out",
          description: "Dialer rings car owners presenting verified 020 dealership number, connecting live owners to service booking reps.",
        },
        {
          step: "STAGE 03",
          title: "Bay Slot Reservation",
          description: "Service representative confirms maintenance requirements, books workshop bay slot, and logs pickup address in CRM.",
        },
        {
          step: "STAGE 04",
          title: "WhatsApp Service Confirmation",
          description: "Vehicle owner immediately receives pre-approved WhatsApp message with booking ID, service advisor contact, and map pin.",
        },
      ]}
      synergies={[
        {
          title: "Auto Dialer Software",
          description: "Progressive and preview outbound dialing engine tailored for high-volume customer recall cadences.",
          href: "/products/auto-dialer/",
        },
        {
          title: "Telecalling Sales CRM",
          description: "Manage telecaller quotas, lead stages, live call monitoring, and performance dashboards.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Deploy shared team inboxes, appointment slips, and verified business messaging templates.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      remoteEngagementNote="Pune dealerships, IT teams in Hinjawadi, cafes, and salons engage Hanva remotely from our Bengaluru headquarters via structured WhatsApp demos (+91 8423711043), remote training, and cloud SaaS/IT delivery."
      solutionsPortfolio={[
        { category: "SaaS Product", title: "Hanva CRM", description: "Follow-ups, C2C calling, IVR campaigns & recording playback for sales and service desks.", href: "/products/crm/" },
        { category: "SaaS Product", title: "Hanva Restaurant POS", description: "Table QR ordering, KDS & India GST billing for Pune cafes and restaurants.", href: "/products/restaurant-pos/" },
        { category: "SaaS Product", title: "Hanva Salon Software", description: "Online booking mini-website, GST invoices & stylist commissions for Pune studios.", href: "/products/salon-software/" },
        { category: "IT Service", title: "Software & SaaS Engineering", description: "Custom ERP, web portals, mobile apps & API bridges built remotely.", href: "/software-development/" },
        { category: "IT Service", title: "Digital Marketing", description: "SEO, Google Ads & Social Media marketing for growing regional brands.", href: "/digital-marketing/" },
        { category: "Buyer Guide", title: "SaaS vs Custom CRM/ERP", description: "Compare ready-made SaaS against custom automotive/manufacturing software.", href: "/resources/saas-vs-custom-crm-erp-guide/" },
      ]}
      relatedIndustries={[
        {
          title: "Automobile Dealerships",
          description: "Showroom inbound inquiry tracking, test-drive booking, and service recall dialers.",
          href: "/industry/automobile/",
        },
        {
          title: "Logistics & Supply Chain",
          description: "Driver-customer number masking, dispatch coordination, and delivery alerts.",
          href: "/industry/logistics/",
        },
        {
          title: "Insurance Agencies & Brokers",
          description: "Motor insurance renewal cadences, instant WhatsApp quote dispatch, and claims IVR.",
          href: "/industry/insurance/",
        },
      ]}
      faqs={[
        {
          question: "Can automobile dealerships in Pune use Android SIM calling to save on call costs?",
          answer: "Yes. Hanva offers a companion Android Telecaller application that enables dealership telecallers to place outbound service reminder calls using corporate SIMs while logging call durations, timestamps, and dispositions to the central Hanva CRM (with centralized audio recording available on cloud/WebRTC trunk calls).",
        },
        {
          question: "How does 020 virtual DID routing help multi-location Pune car dealerships?",
          answer: "A single 020 virtual number can act as a centralized master hotline. When a customer dials, the IVR can ask them to select their preferred branch (e.g., Press 1 for Baner, Press 2 for Hadapsar, Press 3 for PCMC), routing the call directly to that branch's team.",
        },
        {
          question: "Can we send automated service estimate PDFs to vehicle owners on WhatsApp?",
          answer: "Yes. Through our official Meta WhatsApp Business API integration, service advisors can trigger pre-approved WhatsApp templates containing repair estimates, job cards, and digital payment links.",
        },
        {
          question: "What is the typical deployment timeline for a dealership workshop with 15 service advisors?",
          answer: "Upon completing digital KYC verification, 020 virtual DID numbers and cloud CRM accounts are configured and ready for live telecalling within 24 to 48 business hours.",
        },
      ]}
    />
  );
}
