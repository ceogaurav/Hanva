import { ProductLayout } from "@/components/shared/product-layout";

export const metadata = {
  title: "Cloud Call Center Software India — Inbound & Outbound Operations",
  description:
    "Unified blended call center platform for Indian enterprises. Live supervisor wallboards, ACD routing, call recording audits, and QA analytics.",
  alternates: {
    canonical: "https://hanva.in/products/call-center-software/",
  },
};

const callCenterSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hanva Cloud Call Center Suite",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser Application",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description: "Blended cloud contact center platform with real-time supervisor wallboards and ACD queue management.",
};

export default function CallCenterSoftwarePage() {
  return (
    <ProductLayout
      categoryBadge="Operations & Contact Center"
      title="Cloud Call Center Operations Suite"
      subtitle="Equip contact center leaders and telecallers with live supervisor wallboards, intelligent automatic call distribution, and real-time coaching tools."
      problemStatement="Running a call center without real-time visibility leads to long customer hold times, idle agents, unchecked call quality, and high supervisor stress. Hanva delivers a modern browser-based contact center console that unifies inbound support queues and outbound sales campaigns."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/" },
        { label: "Call Center Software" },
      ]}
      whatsappRef="/products/call-center-software/"
      workflowTitle="Real-Time Contact Center Lifecycle"
      workflowSteps={[
        {
          step: "01. BLENDED QUEUEING",
          title: "Omnichannel Call Ingestion",
          description: "Inbound customer calls from virtual numbers and toll-free lines enter a centralized Automatic Call Distribution (ACD) engine.",
        },
        {
          step: "02. SKILL MATCHING",
          title: "Intelligent Agent Assignment",
          description: "Calls route automatically to the best-suited available agent based on language fluency, technical skill tier, or longest idle time.",
        },
        {
          step: "03. LIVE SUPERVISION",
          title: "Operational Dashboard Monitoring",
          description: "Supervisors monitor live agent activity on operational dashboards and review recorded calls for structured quality coaching.",
        },
        {
          step: "04. QUALITY & DISPOSITIONS",
          title: "Audit Scorecards & Analytics",
          description: "Agents tag outcomes on call wrap-up, and supervisors evaluate recorded calls using objective compliance scorecards.",
        },
      ]}
      capabilities={[
        {
          title: "Live Supervisor Wallboard",
          description: "Monitor active calls, waiting queues, Average Speed of Answer (ASA), and individual agent status (Talking, Idle, Wrap-up) in real time.",
          badge: "Real-Time",
        },
        {
          title: "Quality Audits & Compliance Scoring",
          description: "Review dual-channel audio recordings with objective scorecards to coach sales and support representatives on greeting and objection handling.",
          badge: "QA Governance",
        },
        {
          title: "Automatic Call Distribution (ACD)",
          description: "Distribute calls with round-robin, skill-based, sticky agent (last connected), or VIP fast-track routing algorithms.",
          badge: "Routing Engine",
        },
        {
          title: "Unified Agent Browser Console",
          description: "Agents view caller details, recent CRM notes, and call controls (mute, hold, transfer, disposition) inside a single clean tab.",
          badge: "WebRTC",
        },
        {
          title: "Automated CSAT Surveys",
          description: "Trigger automated post-call IVR surveys immediately after call disconnect to capture real-time customer satisfaction scores.",
          badge: "Feedback",
        },
      ]}
      useCases={[
        {
          audience: "Outbound BPO & Telesales Hubs",
          title: "High-Volume Telecalling Supervision",
          description: "Manage 50 to 200+ telecalling agents with automated pacing, live status dashboards, and daily connection metrics.",
        },
        {
          audience: "Customer Support Desks",
          title: "SLA Management & Hold Time Reduction",
          description: "Keep Average Wait Time (AWT) within contract SLAs by alerting supervisors when queue depths exceed threshold limits.",
        },
        {
          audience: "Financial Collections & Renewals",
          title: "Compliant Conversation Audits",
          description: "Ensure loan recovery and policy renewal calls adhere strictly to regulatory guidelines with centralized recorded call logs.",
        },
      ]}
      ecosystemSynergies={[
        {
          title: "Progressive Auto-Dialer",
          description: "Switch seamlessly between inbound call handling and high-velocity outbound progressive dialers.",
          href: "/products/auto-dialer/",
        },
        {
          title: "Enterprise Predictive Dialer",
          description: "Maximize outbound contact rates with algorithmic pacing that dials ahead of agent availability.",
          href: "/products/predictive-dialer/",
        },
        {
          title: "Telecalling CRM Suite",
          description: "Every call disposition, recording, and follow-up scheduled in the call center automatically syncs to CRM.",
          href: "/products/telecalling-crm/",
        },
      ]}
      faqs={[
        {
          question: "Can call center agents work remotely from home?",
          answer: "Yes. Hanva Call Center Software runs completely in modern web browsers (Chrome/Edge) using WebRTC audio. Agents can log in securely from home or regional offices without requiring VPN or desktop software installation.",
        },
        {
          question: "How do supervisors audit agent calls?",
          answer: "Supervisors can access centralized dual-channel audio recordings and evaluate agent performance using customizable QA evaluation scorecards.",
        },
        {
          question: "How does the software handle agent wrap-up time?",
          answer: "Supervisors can configure a strict wrap-up window (e.g., 30 to 60 seconds) during which the agent logs the call disposition and notes before the next queue call is automatically routed.",
        },
        {
          question: "What is the minimum number of agent seats required?",
          answer: "Hanva supports teams of all sizes. You can start with as few as 5 calling seats on our Growth plan and scale to hundreds of concurrent agents as your operation expands.",
        },
      ]}
      schemaData={callCenterSchema}
    />
  );
}
