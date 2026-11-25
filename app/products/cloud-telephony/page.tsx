import { ProductLayout } from "@/components/shared/product-layout";

export const metadata = {
  title: "Cloud Telephony & Virtual PBX Service Provider in India",
  description:
    "Enterprise cloud telephony infrastructure in India. Virtual PBX, intelligent call routing, encrypted recording, and carrier gateway trunking via Vi and Tata Teleservices.",
  alternates: {
    canonical: "https://hanva.in/products/cloud-telephony/",
  },
};

const cloudTelephonySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Cloud Telephony & Virtual PBX",
  serviceType: "Cloud Telephony Service",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    telephone: "+91-8423711043",
  },
  areaServed: "IN",
  description: "Enterprise cloud voice infrastructure with virtual PBX, call forwarding, and carrier gateway DID trunking.",
};

export default function CloudTelephonyPage() {
  return (
    <ProductLayout
      categoryBadge="Core Voice Infrastructure"
      title="Enterprise Cloud Telephony & Virtual PBX"
      subtitle="Connect remote sales and support agents across India under a single virtual PBX without buying on-premise telephony hardware."
      problemStatement="Traditional copper lines and physical PBX boxes tie your agents to physical desks, require expensive annual maintenance contracts, and make it impossible to track call recordings across multi-city branches. Hanva routes calls entirely in the cloud over dedicated carrier gateways."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products/" },
        { label: "Cloud Telephony" },
      ]}
      whatsappRef="/products/cloud-telephony/"
      workflowTitle="How Cloud Voice Routing Operates"
      workflowSteps={[
        {
          step: "01. INBOUND CALL",
          title: "Customer Dials Virtual DID",
          description: "Incoming calls terminate at dedicated carrier gateway numbering allocated across Vodafone Idea or Tata Teleservices.",
        },
        {
          step: "02. INTELLIGENT ROUTING",
          title: "Hanva Virtual PBX Processing",
          description: "Our cloud engine evaluates business hours, caller history, and agent availability rules in real time.",
        },
        {
          step: "03. CONCURRENT BRIDGING",
          title: "Configurable IVR Routing to Agent Devices",
          description: "Calls bridge concurrently to agent mobile SIMs, browser WebRTC softphones, or IP deskphones.",
        },
        {
          step: "04. RECORDING & CRM SYNC",
          title: "Encrypted Recording & CDR Logs",
          description: "Call audio recordings are encrypted and logged in your Hanva telecalling CRM timeline with call duration.",
        },
      ]}
      capabilities={[
        {
          title: "Virtual PBX Call Forwarding",
          description: "Forward calls sequentially or simultaneously to multiple team members across different Indian cities.",
          badge: "Cloud-Hosted",
        },
        {
          title: "Carrier Gateway Trunking",
          description: "High-throughput voice delivery provisioned through CloudConnect gateway with dedicated Vi & Tata numbering blocks.",
          badge: "Carrier Grade",
        },
        {
          title: "Centralized Encrypted Recording",
          description: "Store dual-channel call audio with access control policies for training, QA, and operational review.",
          badge: "Encrypted Storage",
        },
        {
          title: "Real-Time CDR Analytics",
          description: "Access detailed Call Detail Records (CDR) with timestamps, answer status, duration, and agent performance metrics.",
          badge: "Reporting",
        },
        {
          title: "Browser WebRTC Softphone",
          description: "Agents make and receive crystal-clear voice calls directly from Chrome or Edge without installing desktop telephony apps.",
          badge: "WebRTC",
        },
        {
          title: "Multi-Branch PBX Management",
          description: "Manage Bengaluru, Mumbai, Delhi, and remote home agents under a single unified corporate virtual PBX console.",
          badge: "Multi-Branch",
        },
      ]}
      useCases={[
        {
          audience: "Distributed Sales Teams",
          title: "National Presence with Local DIDs",
          description: "Equip sales reps with dedicated virtual numbers so customer callbacks route directly to their mobile or softphone.",
        },
        {
          audience: "Customer Support Operations",
          title: "Automated Missed Call Capture",
          description: "Ensure support calls cascade across available tier-1 and tier-2 agents with fallback voicemail routing.",
        },
        {
          audience: "Multi-City Branch Offices",
          title: "Consolidated Corporate Telephony",
          description: "Replace individual office landline bills with a single centralized cloud telephony invoice with transparent pulse billing.",
        },
      ]}
      ecosystemSynergies={[
        {
          title: "Smart Multi-Level IVR",
          description: "Add automated press-1, press-2 voice menus before routing calls to your cloud telephony extensions.",
          href: "/products/ivr-system/",
        },
        {
          title: "Telecalling & Sales CRM",
          description: "Automatically log all cloud PBX calls, durations, and recording links into contact profiles.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "Voice Pulse Calculator",
          description: "Calculate your monthly voice billing and compare 15s pulse OBD options against standard retail plans.",
          href: "/pricing/calculator/",
        },
      ]}
      faqs={[
        {
          question: "What is required to set up Hanva Cloud Telephony?",
          answer: "Because Hanva provisions genuine Indian telecom virtual numbers, statutory Department of Telecommunications (DoT) KYC documentation (Company PAN, Certificate of Incorporation, GSTIN, and Authorized Signatory ID) is required. Our team assists with expedited verification.",
        },
        {
          question: "Can calls be forwarded to personal mobile phones?",
          answer: "Yes. Hanva Virtual PBX can forward incoming calls to standard Indian GSM mobile numbers, landlines, or WebRTC browser softphones based on your team's preference.",
        },
        {
          question: "How long are call recordings stored?",
          answer: "By default, encrypted call recordings are retained in secure cloud storage for 90 days. Extended archiving plans (up to 3 years) are available for regulated industries.",
        },
        {
          question: "Are virtual numbers allocated from authorized telecom operators?",
          answer: "Yes. Numbering blocks are allocated through licensed Indian telecom operators including Vodafone Idea (Vi Business) and Tata Teleservices (TTBS) via CloudConnect carrier gateway.",
        },
      ]}
      schemaData={cloudTelephonySchema}
    />
  );
}
