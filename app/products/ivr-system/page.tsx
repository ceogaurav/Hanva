import { ProductLayout } from "@/components/shared/product-layout";

export const metadata = {
  title: "IVR Service Provider in India — Smart Cloud IVR Solutions",
  description:
    "Professional IVR service provider in India. Multi-level voice menus, department routing, missed call lead capture, and automated CRM synchronization.",
  alternates: {
    canonical: "https://hanva.in/products/ivr-system/",
  },
};

const ivrSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Smart Cloud IVR System",
  serviceType: "IVR Telecom Service",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    telephone: "+91-8423711043",
  },
  areaServed: "IN",
  description: "Cloud IVR service with multi-level menus, automated department routing, and missed call lead capture.",
};

export default function IvrSystemPage() {
  return (
    <ProductLayout
      categoryBadge="Inbound Call Automation"
      title="Smart Multi-Level IVR Service Provider"
      subtitle="Greet every caller with professional multi-lingual voice prompts, route calls directly to the right department, and eliminate missed business inquiries."
      problemStatement="Unanswered business calls and chaotic manual transfers cost Indian companies high-intent sales leads. Prospects who hear a busy tone or wait on hold frequently dial a competitor. Hanva Smart IVR greets every caller on the first ring and routes them intelligently."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/" },
        { label: "IVR System" },
      ]}
      whatsappRef="/products/ivr-system/"
      workflowTitle="How Hanva Smart IVR Handles Every Call"
      workflowSteps={[
        {
          step: "01. AUTOMATED GREETING",
          title: "Professional Voice Welcome",
          description: "Incoming callers are greeted automatically with a crystal-clear studio-recorded or text-to-speech audio prompt in English, Hindi, or regional languages.",
        },
        {
          step: "02. DTMF MENU KEYPRESS",
          title: "Caller Selects Option",
          description: "The caller presses '1' for Sales, '2' for Support, or '3' for Accounts. Multi-level sub-menus can request account numbers or service types.",
        },
        {
          step: "03. SKILL-BASED FORWARDING",
          title: "Intelligent Queue Bridging",
          description: "Hanva routes the call to available agents in the selected department, using round-robin, priority, or linear hunting logic.",
        },
        {
          step: "04. MISSED CALL CAPTURE",
          title: "Missed Call Capture & Notification",
          description: "If an agent is busy, the caller number is automatically logged as an uncontacted lead in CRM and triggers a WhatsApp confirmation to the caller.",
        },
      ]}
      capabilities={[
        {
          title: "Multi-Level Voice Menus",
          description: "Configure hierarchical press-1, press-2 decision trees to organize customer inquiries without manual receptionists.",
          badge: "Self-Service",
        },
        {
          title: "Missed Call Lead Ingestion",
          description: "Every dropped or after-hours call is captured in your CRM pipeline so sales agents can initiate follow-up callbacks.",
          badge: "Lead Safety",
        },
        {
          title: "Multi-Lingual Prompts",
          description: "Support diverse Indian regional audiences with prompts recorded in Hindi, English, Kannada, Tamil, Telugu, and more.",
          badge: "Localization",
        },
        {
          title: "After-Hours & Holiday Routing",
          description: "Set custom operational hours. Out-of-hours calls play custom greetings, offer voicemail, or route to emergency staff.",
          badge: "Schedules",
        },
        {
          title: "Live Call Transfer",
          description: "Agents can transfer connected callers to other departments or supervisors with warm introductions or blind transfers.",
          badge: "Collaboration",
        },
        {
          title: "Built-in CRM Contact Match",
          description: "Incoming caller numbers automatically match existing contact records, popping up customer history on agent screens.",
          badge: "CRM Sync",
        },
      ]}
      useCases={[
        {
          audience: "Real Estate Developers",
          title: "Project Campaign Hotlines",
          description: "Direct incoming prospects to dedicated property advisors based on property type (2BHK, 3BHK, Commercial) selected in IVR.",
        },
        {
          audience: "Healthcare Clinics & Hospitals",
          title: "24/7 Appointment Lines",
          description: "Allow patients to select clinic branches, check doctor consulting hours, or connect directly to emergency helplines.",
        },
        {
          audience: "E-Commerce & Retail",
          title: "Automated Order Status Support",
          description: "Provide automated delivery updates or route escalations directly to tier-1 customer dispute managers.",
        },
      ]}
      ecosystemSynergies={[
        {
          title: "Smart IVR Flow Builder",
          description: "Design advanced logic trees, webhook integrations, and time conditions with our visual IVR designer.",
          href: "/products/smart-ivr/",
        },
        {
          title: "Virtual Mobile Numbers",
          description: "Pair your IVR menus with dedicated 10-digit mobile DIDs that Indian prospects recognize and trust.",
          href: "/products/virtual-numbers/",
        },
        {
          title: "Telecalling & Lead CRM",
          description: "Turn every IVR caller into a qualified lead with automatic pipeline stage assignment.",
          href: "/products/telecalling-crm/",
        },
      ]}
      faqs={[
        {
          question: "Can I upload my own custom voice recordings for the IVR?",
          answer: "Yes. You can upload standard MP3 or WAV audio prompts recorded by your own team in Hindi, English, Kannada, Tamil, Telugu, and other regional languages. Dynamic TTS prompt synthesis is available for enterprise integrations.",
        },
        {
          question: "How many sub-levels can I create in the IVR menu?",
          answer: "Hanva supports deep multi-level IVR structures (up to 5 levels), allowing you to route by language, city, department, and specific product lines.",
        },
        {
          question: "What happens if all agents are busy on other calls?",
          answer: "You can configure Hanva IVR to place callers in a waiting queue with hold music and position announcements, offer an automated callback option, or route to voicemail.",
        },
        {
          question: "Can IVR send an automated WhatsApp message to the caller?",
          answer: "Yes. Using our WhatsApp CRM integration, Hanva can automatically send a pre-approved WhatsApp message containing your catalog, brochure, or appointment confirmation as soon as the call ends.",
        },
      ]}
      schemaData={ivrSchema}
    />
  );
}
