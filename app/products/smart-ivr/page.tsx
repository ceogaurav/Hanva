import { ProductLayout } from "@/components/shared/product-layout";

export const metadata = {
  title: "Smart Multi-Level IVR System & Visual Flow Builder — Hanva",
  description:
    "Design advanced multi-level IVR call flows with visual drag-and-drop routing, time-based conditions, CRM data lookups, and API webhooks.",
  alternates: {
    canonical: "https://hanva.in/products/smart-ivr/",
  },
};

const smartIvrSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hanva Smart IVR Flow Builder",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud Web Application",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description: "Visual IVR call flow builder with dynamic conditions, CRM data lookups, and webhook event triggers.",
};

export default function SmartIvrPage() {
  return (
    <ProductLayout
      categoryBadge="Advanced Voice Engineering"
      title="Smart Multi-Level IVR & Visual Flow Builder"
      subtitle="Design intelligent call routing trees with drag-and-drop simplicity, real-time CRM lookups, and dynamic webhook triggers without writing telephony code."
      problemStatement="Most traditional telecom providers require support tickets or telecom engineers simply to update a holiday greeting or route calls to a new team member. Hanva Smart IVR empowers operations managers to configure dynamic voice workflows visually in minutes."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/" },
        { label: "Smart IVR" },
      ]}
      whatsappRef="/products/smart-ivr/"
      workflowTitle="Visual Call Logic Execution Pipeline"
      workflowSteps={[
        {
          step: "01. CALL INITIATION",
          title: "Caller Identity Lookup",
          description: "As the call arrives, Hanva checks your CRM database to identify if the caller is an active customer, an open lead, or a VIP client.",
        },
        {
          step: "02. DYNAMIC LOGIC",
          title: "Condition & Schedule Check",
          description: "Our engine checks current time, public holiday schedules, and queue depth to select the optimal branching path.",
        },
        {
          step: "03. CONTEXTUAL PROMPTS",
          title: "Personalized Audio Prompts",
          description: "Callers can be greeted with personalized dynamic audio, such as their recent order status or dedicated account manager name.",
        },
        {
          step: "04. TARGETED BRIDGING",
          title: "Direct Account Routing",
          description: "The call bridges directly to the assigned account executive, bypassing generic reception queues entirely.",
        },
      ]}
      capabilities={[
        {
          title: "Visual Drag-and-Drop Builder",
          description: "Build call menus, conditions, voicemails, and audio nodes on an intuitive web canvas with real-time preview.",
          badge: "No-Code",
        },
        {
          title: "Real-Time CRM Data Lookups",
          description: "Query customer tags or recent purchase status during call setup to route high-value accounts to senior staff.",
          badge: "Data Driven",
        },
        {
          title: "REST API & Webhook Triggers",
          description: "Fire webhooks on DTMF keypress events to trigger external backend actions, tickets, or SMS confirmations.",
          badge: "Webhooks",
        },
        {
          title: "Multi-Lingual Audio Support",
          description: "Upload custom pre-recorded audio prompts in any Indian language. Dynamic text-to-speech prompt synthesis is available on custom enterprise trunks.",
          badge: "Multi-Lingual",
        },
        {
          title: "Time-of-Day Routing Splits",
          description: "Automatically switch between daytime sales teams, night-shift support, and weekend emergency answering desks.",
          badge: "Scheduling",
        },
        {
          title: "Multi-Language Tree Branching",
          description: "Create primary language selectors that seamlessly adapt all subsequent sub-menus to the caller's chosen language.",
          badge: "Regional",
        },
      ]}
      useCases={[
        {
          audience: "Financial & Fintech Services",
          title: "Self-Service Balance & Status Queries",
          description: "Allow callers to enter customer IDs via DTMF keypress to receive automated balance updates via secure webhooks.",
        },
        {
          audience: "B2B SaaS Companies",
          title: "VIP Account Fast-Tracking",
          description: "Recognize high-tier enterprise clients by phone number and route them directly to dedicated customer success managers.",
        },
        {
          audience: "Hospitality & Travel",
          title: "Automated Booking Confirmation Hotlines",
          description: "Provide 24/7 automated reservation confirmations and route change requests to regional reservation desks.",
        },
      ]}
      ecosystemSynergies={[
        {
          title: "IVR Service Overview",
          description: "Explore the core benefits, missed call capture, and business advantages of Hanva cloud IVR.",
          href: "/products/ivr-system/",
        },
        {
          title: "Cloud Telephony Infrastructure",
          description: "Learn about our carrier gateway trunking, virtual PBX capabilities, and call recording.",
          href: "/products/cloud-telephony/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Trigger automated WhatsApp messages when callers complete specific IVR menu actions.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      faqs={[
        {
          question: "Do I need coding experience to use the Smart IVR flow builder?",
          answer: "No. The Smart IVR builder is designed for business and sales operations teams with an intuitive visual drag-and-drop interface. Adding a new menu option takes less than 2 minutes.",
        },
        {
          question: "Can I connect Smart IVR to external REST APIs?",
          answer: "Yes. Hanva supports outgoing HTTP webhooks, allowing you to pass caller phone numbers to external endpoints and receive dynamic JSON payloads to dictate the next routing step.",
        },
        {
          question: "Can different branches have separate IVR menus?",
          answer: "Yes. You can assign different IVR flows to different virtual mobile numbers or branch offices while managing them centrally under one Hanva account.",
        },
        {
          question: "Is there a limit on how many branches I can create in a flow?",
          answer: "Hanva supports complex, multi-tiered logic flows with unlimited decision nodes, custom fallbacks, and retry prompts.",
        },
      ]}
      schemaData={smartIvrSchema}
    />
  );
}
