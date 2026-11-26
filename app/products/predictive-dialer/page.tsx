import { ProductLayout } from "@/components/shared/product-layout";

export const metadata = {
  title: "Predictive Dialer for Outbound Call Centers",
  description:
    "Enterprise predictive dialer for high-density outbound contact centers. Algorithmic pacing, carrier signaling disconnect filtering, and high-throughput carrier trunking.",
  alternates: {
    canonical: "https://hanva.in/products/predictive-dialer/",
  },
};

const predictiveDialerSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hanva Enterprise Predictive Dialer",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud Contact Center Platform",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description: "Enterprise algorithmic predictive dialer for high-volume outbound telesales and debt recovery contact centers.",
};

export default function PredictiveDialerPage() {
  return (
    <ProductLayout
      categoryBadge="Enterprise Outbound Operations"
      title="Predictive Dialer & Algorithmic Pacing Engine"
      subtitle="Maximize agent conversation time with statistical predictive dialing that anticipates agent availability, filters invalid tones, and connects only live prospects."
      problemStatement="In large outbound sales and collections operations, telecallers often spend less than 25% of their working shift speaking to prospects due to high ring times, unanswered calls, and busy signals. Hanva Predictive Dialer uses mathematical pacing models to ensure agents move seamlessly from one live conversation to the next."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/" },
        { label: "Predictive Dialer" },
      ]}
      whatsappRef="/products/predictive-dialer/"
      workflowTitle="Statistical Predictive Pacing Workflow"
      workflowSteps={[
        {
          step: "01. STATISTICAL MODELING",
          title: "Predictive Pacing Analysis",
          description: "Our pacing algorithm analyzes real-time Average Handle Time (AHT), agent wrap-up rates, and current telecom connect ratios.",
        },
        {
          step: "02. CONCURRENT DIALING",
          title: "Multi-Line Carrier Outbound",
          description: "The engine dials calculated ratios of numbers across dedicated Tata and Vi PRI/SIP channels via CloudConnect gateway.",
        },
        {
          step: "03. CARRIER SIGNALING FILTERING",
          title: "Network Tone Filtering",
          description: "Network busy tones, invalid numbers, and operator disconnect signals are filtered at the telecom gateway layer before bridging to agents.",
        },
        {
          step: "04. SUB-SECOND BRIDGING",
          title: "Live Human Delivery",
          description: "As soon as a genuine prospect answers ('Hello?'), the call bridges to an available agent via low-latency WebRTC audio.",
        },
      ]}
      capabilities={[
        {
          title: "Algorithmic Pacing Engine",
          description: "Dynamically modulates the dialing ratio based on live connect rates to maximize live agent conversation time compared to manual dialing.",
          badge: "Pacing Algorithm",
        },
        {
          title: "Carrier Signaling & Disconnect Detection (AMD)",
          description: "Filters network busy signals, disconnected numbers, and operator tones at the telecom gateway layer before bridging to agents.",
          badge: "Signaling AMD",
        },
        {
          title: "Abandonment Rate Throttle",
          description: "Strictly controls pacing to ensure call drop and abandonment rates stay compliant with regulatory and enterprise SLA thresholds.",
          badge: "Compliance",
        },
        {
          title: "Dedicated Carrier Trunk Capacity",
          description: "Provisioned on high-concurrency SIP trunk allocations via Vodafone Idea and Tata Teleservices to prevent gateway congestion.",
          badge: "Carrier Grade",
        },
        {
          title: "Intelligent List Recycling",
          description: "Automatically recycles unanswered, busy, or unreachable leads at optimal hours based on customizable campaign rules.",
          badge: "List Penetration",
        },
        {
          title: "Supervisor Campaign Controls",
          description: "Managers can tweak aggressiveness, pause dialing queues, or reallocate agent pools across campaigns on the fly.",
          badge: "Command Console",
        },
      ]}
      useCases={[
        {
          audience: "Outbound Financial Services",
          title: "Loan Origination & Verification",
          description: "Reach thousands of pre-approved loan applicants daily, ensuring credit officers talk only to verified, interested applicants.",
        },
        {
          audience: "Debt Recovery & Collections",
          title: "Delinquency Account Outreach",
          description: "Maximize debt collection outreach across overdue accounts with automated pacing, call recordings, and audit trails.",
        },
        {
          audience: "Enterprise BPO Operations",
          title: "High-Volume Lead Generation",
          description: "Execute large-scale survey and tele-marketing campaigns across 50 to 250+ telecalling seats with rigorous SLA tracking.",
        },
      ]}
      ecosystemSynergies={[
        {
          title: "Progressive Auto-Dialer",
          description: "Compare predictive pacing with 1-to-1 progressive dialing for smaller sales teams.",
          href: "/products/auto-dialer/",
        },
        {
          title: "Call Center Operations Suite",
          description: "Monitor predictive dialing queues alongside live supervisor coaching and agent wallboards.",
          href: "/products/call-center-software/",
        },
        {
          title: "Telecalling & Lead CRM",
          description: "Ensure all call outcomes and contact histories are automatically structured in CRM pipeline records.",
          href: "/products/telecalling-crm/",
        },
      ]}
      faqs={[
        {
          question: "How many agents are required for predictive dialing to be effective?",
          answer: "Predictive dialing is mathematically most effective for teams with at least 15 to 25 active telecallers. With larger agent pools, statistical pacing can accurately predict when the next agent will wrap up. For teams smaller than 15 agents, we recommend our Progressive Auto-Dialer.",
        },
        {
          question: "How does the dialer avoid dropped calls?",
          answer: "Hanva features configurable pacing throttles that monitor the ratio of answered calls to available agents. If abandonment rates approach defined thresholds, the dialer automatically slows down its pacing ratio to protect the customer experience.",
        },
        {
          question: "What carrier infrastructure powers the predictive dialer?",
          answer: "High-density outbound calling runs over CloudConnect Communications carrier gateway interconnections with dedicated trunking blocks across Vodafone Idea (Vi Business) and Tata Teleservices (TTBS).",
        },
        {
          question: "Can we upload large Excel or CSV lead files?",
          answer: "Yes. You can import lead lists with up to 250,000 records per campaign, with automated column mapping, duplicate detection, and DND filtering.",
        },
      ]}
      schemaData={predictiveDialerSchema}
    />
  );
}
