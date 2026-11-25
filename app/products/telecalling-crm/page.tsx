import { ProductLayout } from "@/components/shared/product-layout";

export const metadata = {
  title: "Telecalling CRM Software India — Outbound Inside Sales Operations",
  description:
    "Specialized CRM for telecalling teams in India. 2-click call dispositions, follow-up calendar alerts, SIM and cloud calling, and daily agent KPI tracking.",
  alternates: {
    canonical: "https://hanva.in/products/telecalling-crm/",
  },
};

const telecallingSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hanva Telecalling Sales CRM",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Application / Android App",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description: "High-velocity telecalling CRM with 2-click dispositions, SIM calling app, and telecaller productivity tracking.",
};

export default function TelecallingCrmPage() {
  return (
    <ProductLayout
      categoryBadge="High-Velocity Calling"
      title="Telecalling CRM for Inside Sales Operations"
      subtitle="A purpose-built CRM engineered for telecallers. Log call outcomes in 2 clicks, schedule timely callbacks, and track daily agent talk time."
      problemStatement="Generic CRMs are designed for slow desktop data entry with dozens of required fields. When telecallers make 80 to 120 calls a day, complex CRM menus cause immense administrative fatigue, slow down dialing cadence, and result in skipped follow-ups. Hanva Telecalling CRM is streamlined for speed."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/" },
        { label: "Telecalling CRM" },
      ]}
      whatsappRef="/products/telecalling-crm/"
      workflowTitle="High-Velocity Telecaller Flow"
      workflowSteps={[
        {
          step: "01. QUEUE ALLOCATION",
          title: "Daily Lead Queue Delivery",
          description: "Telecallers log into their daily calling queue, pre-filtered with prioritized fresh inquiries and scheduled callback appointments.",
        },
        {
          step: "02. AUTOMATED DIALING",
          title: "1-Click Call Initiation",
          description: "Agents click the dial icon to initiate the call through browser WebRTC or their assigned Android mobile SIM card.",
        },
        {
          step: "03. CALL DISPOSITION TRACKING",
          title: "2-Click Outcome Tagging",
          description: "As the call ends, quick buttons ('Interested', 'Callback Scheduled', 'RNR - Ringing No Response') log the result in two clicks.",
        },
        {
          step: "04. FOLLOW-UP AUTOMATION",
          title: "Calendar Alert & Recycling",
          description: "If a callback is requested, the system adds it to the agent's morning notification schedule and immediately serves the next lead.",
        },
      ]}
      capabilities={[
        {
          title: "2-Click Call Dispositions",
          description: "Customizable outcome buttons let telecallers categorize call results and move to the next lead in under 3 seconds.",
          badge: "Structured Logging",
        },
        {
          title: "SIM & Cloud Calling Dual-Mode",
          description: "Use office browser WebRTC headsets or leverage telecallers' unlimited mobile SIM plans via our companion Android app.",
          badge: "Flexibility",
        },
        {
          title: "Daily Telecaller Performance KPIs",
          description: "Track total dials, connected calls, total talk time, and conversion ratios live on individual telecaller scoreboards.",
          badge: "KPIs",
        },
        {
          title: "Scheduled Callback Alerts",
          description: "Never miss a promised callback. In-app and WhatsApp notifications alert telecallers when a prospect follow-up is due.",
          badge: "Follow-ups",
        },
        {
          title: "Site-Visit & Demo Booking",
          description: "Directly schedule prospect site visits, product demos, or face-to-face meetings with automatic confirmation messages.",
          badge: "Appointments",
        },
        {
          title: "Lead Protection & Data Masking",
          description: "Prevent telecallers from exporting customer databases or saving phone numbers to personal devices without authorization.",
          badge: "Data Security",
        },
      ]}
      useCases={[
        {
          audience: "Real Estate Telecallers",
          title: "Project Lead Qualification",
          description: "Telecallers screen property portal leads, confirm budget requirements, and book on-site property walkthroughs.",
        },
        {
          audience: "Financial & Loan Telesales",
          title: "Application Document Follow-ups",
          description: "Call prospective borrowers to verify employment status, collect KYC documents, and track loan sanction milestones.",
        },
        {
          audience: "EdTech & Career Counseling",
          title: "Student Admissions Outreach",
          description: "Counsel prospective students regarding course curriculum, schedule counselor demo sessions, and manage admission fee deadlines.",
        },
      ]}
      ecosystemSynergies={[
        {
          title: "Progressive Auto-Dialer",
          description: "Eliminate manual dialing entirely by coupling telecalling CRM with progressive auto-dialing.",
          href: "/products/auto-dialer/",
        },
        {
          title: "Platform Sales CRM",
          description: "Learn about our umbrella pipeline management, deal stages, and custom contact properties.",
          href: "/products/crm/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Send automated WhatsApp brochures to prospects immediately after a telecaller logs an 'Interested' disposition.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      faqs={[
        {
          question: "Can telecallers use their personal smartphones for calling?",
          answer: "Yes. Through our Android companion app, telecallers can make calls using their phone's native SIM card. The app automatically tracks call durations, syncs audio recordings (where legally permitted and supported), and updates CRM dispositions without telecallers having to manually type notes.",
        },
        {
          question: "How does the CRM prevent telecallers from stealing client numbers?",
          answer: "Hanva incorporates data masking controls. You can configure the interface so telecallers see only customer names and masked numbers (e.g. +91 98765XXXXX), while calls are connected seamlessly via cloud bridge.",
        },
        {
          question: "Can managers monitor telecaller performance in real time?",
          answer: "Yes. The manager dashboard displays live active telecaller statuses: who is currently on a call, how many calls each rep has completed today, their total talk time, and their disposition breakdown.",
        },
        {
          question: "Can we set custom dispositions for our industry?",
          answer: "Yes. Administrators can define custom disposition labels, such as 'Site Visit Scheduled', 'Budget Mismatch', 'Loan Approved', or 'Follow-up Next Week'.",
        },
      ]}
      schemaData={telecallingSchema}
    />
  );
}
