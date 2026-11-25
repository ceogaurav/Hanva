import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Logistics Number Masking & Delivery IVR Architecture",
  description:
    "Protect customer privacy with driver phone number masking, automate failed delivery callback IVRs, and dispatch real-time consignment alerts on WhatsApp.",
  alternates: {
    canonical: "https://hanva.in/industry/logistics/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hanva.in/industry/logistics/",
    siteName: "Hanva Technologies",
    title: "Logistics Number Masking & Delivery IVR Architecture | Hanva Technologies",
    description:
      "Protect customer privacy with driver phone number masking, automate failed delivery callback IVRs, and dispatch real-time consignment alerts on WhatsApp.",
    images: [{ url: "https://hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Logistics Telephony" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logistics Number Masking & Delivery IVR Architecture | Hanva Technologies",
    description:
      "Protect customer privacy with driver phone number masking, automate failed delivery callback IVRs, and dispatch real-time consignment alerts on WhatsApp.",
    images: ["https://hanva.in/og-image.png"],
  },
};

const logisticsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Logistics Telephony & Number Masking Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "Driver-to-customer phone number masking, automated delivery confirmation IVR, failed delivery callback routing, and WhatsApp shipment dispatch for logistics fleets in India.",
  areaServed: "IN",
};

export default function LogisticsIndustryPage() {
  return (
    <SolutionLayout
      categoryBadge="Logistics, Express Courier & Fleet Operations"
      title="Driver Number Masking, Delivery IVR & Fleet Communication"
      subtitle="Protect customer privacy and reduce Return to Origin (RTO). Mask driver and recipient mobile numbers, automate failed delivery callbacks, and dispatch tracking alerts via WhatsApp."
      executiveSummary="Courier companies, 3PL logistics providers, and hyper-local delivery fleets face severe customer data privacy concerns when delivery riders call customers from private personal phone numbers. Concurrently, uncoordinated deliveries lead to expensive Return to Origin (RTO) waste. Hanva provides virtual phone number masking connecting drivers and recipients without exposing personal numbers, automated out-for-delivery IVR confirmation calls, and real-time WhatsApp consignment tracking."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industry/" },
        { label: "Logistics" },
      ]}
      whatsappRef="/industry/logistics/"
      challenges={[
        {
          challenge: "Delivery drivers calling customers from personal mobile phones compromises customer privacy and violates statutory DPDP data protection obligations.",
          solution: "Temporary virtual number masking bridges drivers and recipients through a cloud gateway without either party seeing the other's real phone number.",
        },
        {
          challenge: "Up to 20-30% of eCommerce and express packages fail on first delivery attempt because customers are unavailable or premises are locked.",
          solution: "Automated outbound IVR calls verify recipient availability in the morning before riders dispatch parcels, dramatically curbing RTO rates.",
        },
        {
          challenge: "Customers attempting to reschedule delivery struggle through confusing web portals or cannot reach local hub dispatchers.",
          solution: "Automated WhatsApp interactive notifications allow recipients to confirm home presence, reschedule delivery date, or update address in one tap.",
        },
        {
          challenge: "Disputes arise regarding whether delivery drivers actually attempted to contact recipients before marking shipments as 'Customer Not Available'.",
          solution: "Complete CDR call detail records timestamp driver dial-outs, call duration, and audio recordings to objectively resolve delivery disputes.",
        },
      ]}
      workflowTitle="The 4-Stage Secure Delivery Communication Cycle"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Out-for-Delivery Notification",
          description: "When parcels are scanned at the local distribution hub, an automated WhatsApp alert delivers real-time tracking and estimated delivery window.",
        },
        {
          step: "STAGE 02",
          title: "Masked Driver Dialing",
          description: "Upon arriving at the destination, the rider taps 'Call Customer' in the delivery app. The cloud gateway dials the recipient with virtual number masking.",
        },
        {
          step: "STAGE 03",
          title: "In-Call Privacy Bridge",
          description: "The call bridges securely; the recipient sees a corporate Hanva virtual line while the rider's personal SIM number remains completely hidden.",
        },
        {
          step: "STAGE 04",
          title: "Delivery Proof & Dispute CDR",
          description: "Successful delivery logs an OTP confirmation. If unreached, the call duration and ring attempts are archived to prevent fraudulent non-delivery claims.",
        },
      ]}
      pillars={[
        {
          metric: "Zero-Leak",
          metricLabel: "Privacy Protection",
          title: "DoT-Compliant Number Masking",
          description: "Protect customer and driver phone numbers with virtual cloud proxy lines, aligning with data privacy regulations and preventing off-platform harassment.",
        },
        {
          metric: "Reduced",
          metricLabel: "RTO Expense",
          title: "Pre-Delivery Verification IVR",
          description: "Verify recipient availability and address accuracy with automated morning voice alerts before couriers depart hubs, cutting failed delivery trips.",
        },
        {
          metric: "Verified",
          metricLabel: "Attempt Logs",
          title: "Objective Delivery Telemetry",
          description: "Audit rider call logs and ring durations to verify whether genuine delivery contact attempts were made before returning parcels to origin.",
        },
      ]}
      synergies={[
        {
          title: "Virtual Phone Numbers",
          description: "Deploy scalable pools of virtual DIDs for driver-to-customer phone number masking.",
          href: "/products/virtual-numbers/",
        },
        {
          title: "Smart Multi-Level IVR",
          description: "Automate delivery status tracking and hub dispatch routing via multi-lingual voice menus.",
          href: "/products/smart-ivr/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Dispatch real-time delivery notifications, live tracking links, and interactive address confirmation templates.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      faqs={[
        {
          question: "How does phone number masking work for logistics drivers?",
          answer: "When a driver clicks to call a customer in their courier app, the system initiates a call through a temporary virtual cloud number. The customer sees the company virtual number on caller ID, and the driver never sees the customer's personal mobile number, ensuring full data privacy for both parties.",
        },
        {
          question: "Does number masking comply with Indian Department of Telecommunications (DoT) guidelines?",
          answer: "Yes. Hanva's telecom routing infrastructure complies with DoT regulations, maintaining complete call detail records (CDRs), CLI attribution, and secure audit logs within certified Indian cloud data centers.",
        },
        {
          question: "Can customers reschedule deliveries via WhatsApp?",
          answer: "Yes. Using interactive WhatsApp templates with quick-reply buttons ('Deliver Today', 'Reschedule to Tomorrow', 'Change Address'), recipients can confirm or update their delivery preferences directly, which updates your logistics management system.",
        },
      ]}
      schemaData={logisticsSchema}
    />
  );
}
