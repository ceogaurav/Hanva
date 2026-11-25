import { ProductLayout } from "@/components/shared/product-layout";

export const metadata = {
  title: "WhatsApp Business CRM Integration — Sales Automation & BSP Gateways",
  description:
    "WhatsApp Business messaging integration via authorized solution provider gateways. Automated brochure sharing, post-call messaging, and shared team inboxes.",
  alternates: {
    canonical: "https://hanva.in/products/whatsapp-crm/",
  },
};

const whatsAppCrmSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hanva WhatsApp Business CRM Integration",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud Web Application",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description: "WhatsApp Business CRM integration platform with shared multi-agent inbox, post-call triggers, and automated drip journeys via authorized BSP gateways.",
};

export default function WhatsAppCrmPage() {
  return (
    <ProductLayout
      categoryBadge="Conversational Sales & Messaging"
      title="WhatsApp Business CRM & Sales Automation"
      subtitle="Turn WhatsApp into a high-conversion sales channel. Share a unified team inbox, send automated post-call brochures, and nurture leads with automated API messaging."
      problemStatement="Indian buyers prefer WhatsApp over email, but having sales reps chat from personal phone numbers limits management visibility, exposes your customer list to theft when reps quit, and risks account bans. Hanva unifies WhatsApp Business messaging directly inside your CRM through authorized solution provider gateways."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/" },
        { label: "WhatsApp CRM" },
      ]}
      whatsappRef="/products/whatsapp-crm/"
      workflowTitle="Conversational WhatsApp Sales Journey"
      workflowSteps={[
        {
          step: "01. VERIFIED PROFILE",
          title: "WhatsApp Business Profile Integration",
          description: "Connect your approved WhatsApp Business account with your corporate brand identity and pre-approved messaging templates.",
        },
        {
          step: "02. POST-CALL TRIGGER",
          title: "Automated Brochure Delivery",
          description: "When a telecaller marks a call as 'Interested', Hanva automatically triggers a pre-approved WhatsApp message containing your PDF catalog.",
        },
        {
          step: "03. SHARED TEAM INBOX",
          title: "Multi-Agent Chat Collaboration",
          description: "Customer replies route to your shared team inbox, where multiple sales reps can respond concurrently from a single business number.",
        },
        {
          step: "04. AUTOMATED DRIPS",
          title: "Nurturing Drip Sequences",
          description: "Unconverted prospects receive scheduled, contextual follow-up messages (Day 3, Day 7) to re-engage interest automatically.",
        },
      ]}
      capabilities={[
        {
          title: "BSP Gateway Integration",
          description: "High message delivery rates, messaging template compliance, and protection against number blocks through authorized Meta Business Solution Provider gateways.",
          badge: "BSP Gateway",
        },
        {
          title: "Shared Multi-Agent Team Inbox",
          description: "Allow 5 to 50+ sales representatives to chat with prospective buyers using one single corporate WhatsApp number.",
          badge: "Team Inbox",
        },
        {
          title: "Automated Post-Call Brochure Drops",
          description: "Deliver project brochures, pricing cards, or booking links via automated WhatsApp messages as soon as an agent ends a phone call.",
          badge: "Post-Call Trigger",
        },
        {
          title: "Pre-Approved Message Templates",
          description: "Manage TRAI and Meta-compliant utility, marketing, and authentication message templates with dynamic variable insertion.",
          badge: "Templates",
        },
        {
          title: "Interactive Chatbot Menus",
          description: "Engage after-hours leads with interactive button menus (View Pricing, Book Site Visit, Talk to Sales) before routing to live agents.",
          badge: "Chatbot",
        },
        {
          title: "Unified Contact Chat History",
          description: "WhatsApp chats appear directly alongside voice call recordings and follow-up notes on the customer's central CRM timeline.",
          badge: "CRM Sync",
        },
      ]}
      useCases={[
        {
          audience: "Real Estate Sales Desks",
          title: "Automated Floor Plan & Location Sharing",
          description: "Send project brochures, floor plans, and Google Maps location pins to prospective homebuyers while on a voice call.",
        },
        {
          audience: "Healthcare Clinics",
          title: "Appointment Booking & Reminders",
          description: "Confirm doctor appointments and send preparation instructions via automated WhatsApp messages, reducing clinic no-shows.",
        },
        {
          audience: "Automobile & Retail Dealerships",
          title: "Test Drive & Quotation Delivery",
          description: "Share vehicle brochures, pricing estimates, and test-drive confirmation slots directly to customer WhatsApp inboxes.",
        },
      ]}
      ecosystemSynergies={[
        {
          title: "Telecalling & Sales CRM",
          description: "Trigger WhatsApp follow-ups automatically based on telecaller call dispositions.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "Smart Multi-Level IVR",
          description: "Capture missed IVR callers and automatically dispatch a WhatsApp welcome greeting with self-service options.",
          href: "/products/ivr-system/",
        },
        {
          title: "Platform Sales CRM Hub",
          description: "Learn how WhatsApp messages, deals, and invoices synchronize inside our core platform CRM.",
          href: "/products/crm/",
        },
      ]}
      faqs={[
        {
          question: "Can multiple sales agents use the same WhatsApp number?",
          answer: "Yes. Our Shared Team Inbox allows multiple agents to log in from their own computers or mobile browsers, view customer inquiries, and reply concurrently from your single verified company WhatsApp number.",
        },
        {
          question: "How does Hanva connect with the WhatsApp Business API?",
          answer: "Hanva supports integration with authorized Business Solution Providers (BSPs). When connecting an approved WhatsApp Business API account through an authorized third-party provider, messaging workflows operate in accordance with provider and Meta platform guidelines.",
        },
        {
          question: "How do WhatsApp message charges work?",
          answer: "WhatsApp Business API messages are billed according to provider conversation tariffs (categorized into Marketing, Utility, Authentication, and Service conversations), plus applicable platform integration licensing.",
        },
        {
          question: "Can we send automated messages after a call ends?",
          answer: "Custom post-call messaging workflows can be configured to dispatch approved message templates through your connected third-party messaging account when an agent selects a relevant disposition tag.",
        },
      ]}
      schemaData={whatsAppCrmSchema}
    />
  );
}
