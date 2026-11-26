import * as React from "react";
import { LocationLayout } from "@/components/shared/location-layout";

export const metadata = {
  title: "Cloud Telephony & Telecalling CRM in Hyderabad (040 Virtual Numbers)",
  description:
    "Enterprise cloud telephony, 040 virtual numbers, and telecalling CRM for Hyderabad healthcare networks, ITeS centers, and real estate developers in HITEC City and Gachibowli.",
  alternates: {
    canonical: "https://hanva.in/locations/hyderabad/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hanva.in/locations/hyderabad/",
    siteName: "Hanva Technologies",
    title: "Cloud Telephony & Telecalling CRM in Hyderabad | Hanva Technologies",
    description:
      "Enterprise cloud telephony, 040 virtual numbers, and telecalling CRM for Hyderabad healthcare networks, ITeS centers, and real estate developers.",
    images: [{ url: "https://hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Hyderabad Telephony Hub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Telephony & Telecalling CRM in Hyderabad | Hanva Technologies",
    description:
      "Enterprise cloud telephony, 040 virtual numbers, and telecalling CRM for Hyderabad healthcare networks, ITeS centers, and real estate developers.",
    images: ["https://hanva.in/og-image.png"],
  },
};

const hyderabadServiceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://hanva.in/locations/hyderabad/#webpage",
      url: "https://hanva.in/locations/hyderabad/",
      name: "Cloud Telephony & Telecalling CRM in Hyderabad — Hanva",
      description:
        "Enterprise cloud telephony infrastructure, 040 virtual numbers, and telecalling CRM for Hyderabad healthcare, ITeS, and real estate sectors.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://hanva.in/#website",
        name: "Hanva Technologies",
        url: "https://hanva.in",
      },
    },
    {
      "@type": "Service",
      "@id": "https://hanva.in/locations/hyderabad/#service",
      name: "Cloud Telephony & Healthcare Communication Solutions — Hyderabad",
      serviceType: "Cloud Telephony, Smart IVR, 040 Virtual Numbers, and Telecalling CRM",
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
      areaServed: {
        "@type": "City",
        name: "Hyderabad",
        sameAs: "https://en.wikipedia.org/wiki/Hyderabad",
      },
    },
  ],
};

export default function HyderabadLocationPage() {
  return (
    <LocationLayout
      cityName="Hyderabad"
      regionBadge="Telangana Circle (STD 040)"
      title="Cloud Telephony & Telecalling CRM in Hyderabad"
      subtitle="Intelligent cloud telephony, bilingual IVR systems, and telecalling CRM designed for Hyderabad's healthcare corridors, ITeS support centers, and mega real estate townships."
      isPhysicalHeadquarters={false}
      remoteDeliveryDetails={{
        stdCode: "040",
        didSeries: "040-XXXX-XXXX (Landline Series)",
        carrierPartners: "Tata Teleservices & Vodafone Idea (Vi)",
        deploymentTime: "24 – 48 Hours Digital KYC Activation",
      }}
      marketContext="Hyderabad is a premier biotechnology, healthcare, and software services capital. Organizations operating across HITEC City, Gachibowli, and Genome Valley handle enormous volumes of patient appointments, customer support inquiries, and high-ticket real estate leads. In this environment, multi-lingual IVR menus (Telugu and English), automated clinic booking reminders, and centralized call tracking are essential to avoid missed appointments and dropped sales inquiries."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Locations", href: "/locations/" },
        { label: "Hyderabad" },
      ]}
      whatsappRef="/locations/hyderabad/"
      schemaData={hyderabadServiceSchema}
      telecomSpecs={[
        {
          label: "Virtual Number Allocation",
          value: "040-XXXX-XXXX",
          description: "Authentic Hyderabad landline DID series establishing local trust across Telangana.",
        },
        {
          label: "Dual Carrier Interconnects",
          value: "Tata TTBS & Vi Business",
          description: "High-throughput PRI/SIP trunk redundancy connected to local telecom exchanges.",
        },
        {
          label: "Bilingual IVR Prompting",
          value: "Telugu & English",
          description: "Native dual-language voice trees ensuring patient comfort and clarity.",
        },
        {
          label: "Pulse Billing Model",
          value: "15-Second Pulse",
          description: "Predictable 15-second carrier pulse billing helping reduce 60s rounding waste on short calls.",
        },
      ]}
      challenges={[
        {
          challenge: "Hospitals and multi-specialty clinics in Banjara Hills and Madhapur lose OPD patient appointments due to jammed landline switchboards and unanswered calls.",
          solution: "Hanva's 24/7 multi-level IVR system routes calls automatically by department, books appointments, and sends instant WhatsApp confirmation slips.",
        },
        {
          challenge: "Real estate developers in Kokapet and Tellapur suffer lead leakage when sales consultants communicate with prospective buyers using personal WhatsApp numbers.",
          solution: "Hanva provides centralized virtual number masking and shared team inboxes, ensuring all buyer interactions and project brochure dispatches remain company property.",
        },
        {
          challenge: "IT support and BPO call centers struggle with rigid, expensive hardware PBXs that do not support hybrid or work-from-home agent workflows.",
          solution: "Hanva's browser WebRTC softphones allow agents in Hyderabad to make and receive crystal-clear calls from home or office with zero hardware overhead.",
        },
        {
          challenge: "Clinic patients frequently miss scheduled doctor appointments, leaving expensive medical specialists with unutilized consultation slots.",
          solution: "Hanva schedules automated outbound IVR confirmation calls and WhatsApp reminders 24 hours prior to the consultation to minimize patient no-shows.",
        },
      ]}
      workflowTitle="Hyderabad Healthcare & Corporate Inbound Flow"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Bilingual 040 Greeting",
          description: "Caller rings 040 DID and selects preferred language (Telugu/English) via intelligent DTMF menu.",
        },
        {
          step: "STAGE 02",
          title: "Specialty Queue Routing",
          description: "Caller selects department (Cardiology, Orthopedics, General OPD) and routes to available desk officer.",
        },
        {
          step: "STAGE 03",
          title: "Appointment Booking",
          description: "Desk officer registers patient token in Hanva CRM with slot time, doctor name, and patient contact details.",
        },
        {
          step: "STAGE 04",
          title: "WhatsApp Slip Dispatch",
          description: "Call disconnects, triggering an immediate pre-approved WhatsApp slip containing appointment token and clinic map pin.",
        },
      ]}
      synergies={[
        {
          title: "Cloud Telephony Platform",
          description: "Multi-level smart IVR menus, department routing algorithms, and enterprise virtual numbers.",
          href: "/products/cloud-telephony/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Deploy shared team inboxes, appointment slips, and verified business messaging templates.",
          href: "/products/whatsapp-crm/",
        },
        {
          title: "Telecalling Sales CRM",
          description: "Manage telecaller quotas, lead stages, live call monitoring, and performance dashboards.",
          href: "/products/telecalling-crm/",
        },
      ]}
      relatedIndustries={[
        {
          title: "Healthcare & Diagnostics",
          description: "24/7 patient booking IVR, automated appointment reminders, and diagnostic report dispatch.",
          href: "/industry/healthcare/",
        },
        {
          title: "Real Estate & Infrastructure",
          description: "Automated portal lead response, virtual number masking, and site-visit tracking.",
          href: "/industry/real-estate/",
        },
        {
          title: "Education & Admissions",
          description: "Counseling auto-dialers, student lead stages, and counseling recording archival.",
          href: "/industry/education/",
        },
      ]}
      faqs={[
        {
          question: "Can we configure bilingual Telugu and English voice prompts on our 040 number?",
          answer: "Yes. Hanva supports multi-level IVRs with studio-recorded or text-to-speech audio prompts in Telugu, English, and Hindi, allowing callers to select their preferred language immediately upon dialing.",
        },
        {
          question: "How does Hanva help Hyderabad real estate developers track property portal inquiries?",
          answer: "Hanva ingests inquiries from 99acres, MagicBricks, and digital campaigns directly into telecaller auto-dial queues via webhooks, connecting sales reps with high-intent buyers within seconds of form submission.",
        },
        {
          question: "Can our doctors and consultants use Hanva on their personal smartphones?",
          answer: "Yes. Using Hanva's companion Android application, consultants can place outgoing calls that present the hospital's virtual landline number while keeping their personal mobile number private.",
        },
        {
          question: "Is patient consultation call recording compliant with Indian data regulations?",
          answer: "Yes. Hanva provides automated consent announcements ('This call is recorded for quality and medical compliance') and stores encrypted audio on Indian cloud servers meeting statutory data protection standards.",
        },
      ]}
    />
  );
}
