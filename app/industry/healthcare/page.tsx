import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Healthcare Cloud Telephony & Clinic Patient CRM",
  description:
    "Patient IVR appointment booking, automated OPD reminders, diagnostic report dispatch, and DPDP-compliant healthcare telephony in India.",
  alternates: {
    canonical: "https://www.hanva.in/industry/healthcare/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/industry/healthcare/",
    siteName: "Hanva Technologies",
    title: "Healthcare Cloud Telephony & Clinic Patient CRM | Hanva Technologies",
    description:
      "Patient IVR appointment booking, automated OPD reminders, diagnostic report dispatch, and DPDP-compliant healthcare telephony in India.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Healthcare Telephony" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Cloud Telephony & Clinic Patient CRM | Hanva Technologies",
    description:
      "Patient IVR appointment booking, automated OPD reminders, diagnostic report dispatch, and DPDP-compliant healthcare telephony in India.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const healthcareSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Healthcare & Clinic Telephony Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "Automated patient IVR routing, appointment confirmation calls, diagnostic report WhatsApp delivery, and confidential patient records for Indian healthcare providers.",
  areaServed: "IN",
};

export default function HealthcareIndustryPage() {
  return (
    <SolutionLayout
      categoryBadge="Healthcare & Diagnostic Operations"
      title="Clinic Telephony, Patient IVR & Appointment Architecture"
      subtitle="Eliminate front-desk congestion. Automate 24/7 patient IVR appointments, dispatch OPD appointment confirmations via WhatsApp, and protect medical records."
      executiveSummary="Hospitals, polyclinics, and diagnostic lab chains struggle with flooded front-desk phone lines, peak-hour patient hold times, and expensive appointment no-show rates. Hanva's Healthcare Telephony architecture unifies multi-level patient IVRs in regional languages, automated outbound appointment reminders, emergency escalation routing, and secure diagnostic report dispatch via authorized BSP WhatsApp gateways."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industry/" },
        { label: "Healthcare" },
      ]}
      whatsappRef="/industry/healthcare/"
      challenges={[
        {
          challenge: "Patients call during peak morning OPD hours and get continuous busy tones or dropped calls, leading to lost consultations.",
          solution: "Smart multi-level IVR handles hundreds of concurrent callers, offering self-service appointment booking or department routing.",
        },
        {
          challenge: "Up to 30-40% of booked specialist doctor consultations result in patient no-shows, causing significant revenue loss for clinics.",
          solution: "Automated outbound voice alerts and interactive WhatsApp confirmation messages sent 24 hours prior to consultation times.",
        },
        {
          challenge: "Diagnostic lab receptionists spend hours manually answering repetitive calls asking whether test reports are ready.",
          solution: "Automated WhatsApp notifications trigger upon diagnostic report finalization, delivering secure download links.",
        },
        {
          challenge: "Medical patient interactions require strict statutory confidentiality and data security compliance under Indian regulations.",
          solution: "AES-encrypted call recording storage hosted in Indian cloud infrastructure aligned with DPDP Act principles.",
        },
      ]}
      workflowTitle="The 4-Stage Patient Engagement Journey"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Inbound Patient IVR",
          description: "Patient dials the clinic virtual number and selects language preference and specialty (e.g., Cardiology, Pediatrics, Diagnostics).",
        },
        {
          step: "STAGE 02",
          title: "Queue Routing & Booking",
          description: "Calls route automatically to available front-desk staff or dental/OPD coordinators with patient medical history screen-pops.",
        },
        {
          step: "STAGE 03",
          title: "Automated OPD Reminder",
          description: "24 hours before consultation, the patient receives an automated WhatsApp reminder with preparation instructions and doctor timing.",
        },
        {
          step: "STAGE 04",
          title: "Diagnostic Report Dispatch",
          description: "Following lab tests, an automated notification delivers a password-protected report link via authorized WhatsApp Business API gateways.",
        },
      ]}
      pillars={[
        {
          metric: "Automated",
          metricLabel: "Appointment Reminders",
          title: "Automated Appointment Alerts",
          description: "Contextual reminder calls and interactive WhatsApp messages allow patients to confirm or reschedule appointments in one tap.",
        },
        {
          metric: "24/7",
          metricLabel: "Patient Availability",
          title: "Smart Multi-Lingual IVR Trees",
          description: "Patients can access emergency line routing, clinic operational timings, and doctor schedules even when reception desks are closed.",
        },
        {
          metric: "Aligned",
          metricLabel: "DPDP Privacy Framework",
          title: "Encrypted Patient Data Architecture",
          description: "Strict role-based access control, encrypted call recording storage, and audit logs protect sensitive patient personal data.",
        },
      ]}
      synergies={[
        {
          title: "Smart Multi-Level IVR",
          description: "Discover custom audio prompts, emergency routing, and multi-department call trees.",
          href: "/products/ivr-system/",
        },
        {
          title: "Toll-Free 1800 Numbers",
          description: "Provide a nationwide free calling number for hospital emergency inquiries and diagnostics.",
          href: "/products/toll-free-numbers/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Automate test report delivery and appointment confirmations via authorized BSP gateways.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      faqs={[
        {
          question: "Can patients confirm or cancel appointments via WhatsApp?",
          answer: "Yes. Hanva can send automated WhatsApp interactive template messages with quick-reply buttons ('Confirm Appointment', 'Reschedule', 'Cancel'), automatically updating your clinic appointment management software.",
        },
        {
          question: "Is patient call data protected in compliance with Indian privacy laws?",
          answer: "Yes. Call recordings and patient interaction records are protected utilizing encryption at rest and role-based access restrictions designed in alignment with privacy principles and confidentiality best practices.",
        },
        {
          question: "Can emergency or priority patient calls bypass standard IVR queues?",
          answer: "Yes. You can configure high-priority IVR options (e.g., 'For Medical Emergencies, Press 9') that directly route past standard agent queues and ring emergency casualty extensions or doctor mobile numbers.",
        },
      ]}
      schemaData={healthcareSchema}
    />
  );
}
