import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Enterprise Cloud Voice Architecture & SIP Trunking | Hanva Technologies",
  description:
    "High-throughput enterprise cloud PBX, dedicated carrier PRI/SIP trunks via Vodafone Idea and Tata Teleservices, unified multi-branch billing, and enterprise service support.",
  alternates: {
    canonical: "https://hanva.in/solutions/enterprise/",
  },
};

const enterpriseSolutionSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Enterprise Voice Architecture",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "Enterprise-grade cloud PBX, dedicated carrier SIP trunking, centralized telecom management, and custom API webhooks for large organizations in India.",
  areaServed: "IN",
};

export default function EnterpriseSolutionPage() {
  return (
    <SolutionLayout
      categoryBadge="Enterprise Infrastructure & High Concurrency"
      title="Enterprise Voice Architecture & Dedicated Trunking"
      subtitle="Consolidate multi-branch telecom infrastructure into a secure, scalable cloud PBX with dedicated carrier interconnects, high-concurrency trunks, and reliability-focused architecture."
      executiveSummary="Large multi-location enterprises and high-volume contact centers face escalating costs and administrative overhead managing fragmented on-premise EPABX hardware, local telco PRI lines, and isolated CRM tools across regional offices. Hanva unifies your entire enterprise telephony estate on top of resilient CloudConnect carrier gateway infrastructure with dedicated Vodafone Idea (Vi) and Tata Teleservices (TTBS) trunks, centralized billing, and custom API integrations."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions/" },
        { label: "Enterprise" },
      ]}
      whatsappRef="/solutions/enterprise/"
      challenges={[
        {
          challenge: "Fragmented EPABX hardware and individual regional telecom contracts make centralized audit and billing reconciliation impossible.",
          solution: "Unified cloud PBX architecture with centralized multi-branch number pooling, consolidated billing, and real-time administrative control.",
        },
        {
          challenge: "Outbound call surges overwhelm shared gateway channels, causing high call failure rates during peak campaign windows.",
          solution: "Dedicated carrier PRI/SIP trunk allocations provisioned for 25 to 250+ concurrent channels to support non-blocking connectivity.",
        },
        {
          challenge: "Enterprise governance requires structured telecom compliance documentation, DLT entity registration, and secure data storage.",
          solution: "Guided assistance with Department of Telecommunications (DoT) KYC and DLT entity registration, combined with access-controlled data architectures.",
        },
        {
          challenge: "Legacy CRM and ERP systems cannot communicate with isolated telephony software, forcing manual cross-system data entry.",
          solution: "Robust REST API endpoints and webhooks that feed call records, customer dispositions, and audio recordings directly into enterprise databases.",
        },
      ]}
      workflowTitle="Enterprise Deployment & Trunking Sequence"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Architecture & Capacity Audit",
          description: "Hanva solutions engineers audit your current branch concurrency, call volumes, and regional DID allocations.",
        },
        {
          step: "STAGE 02",
          title: "Carrier Interconnect Setup",
          description: "Dedicated PRI/SIP trunk allocations and 10-digit virtual blocks provisioned through authorized Vi and Tata carrier gateways.",
        },
        {
          step: "STAGE 03",
          title: "PBX & Webhook Integration",
          description: "Configure multi-level routing trees, agent permissions, and REST API webhooks connecting to your custom CRM or ERP platform.",
        },
        {
          step: "STAGE 04",
          title: "Go-Live & Service Monitoring",
          description: "Phased branch rollout backed by dedicated technical account management, enterprise support, and quarterly architecture reviews.",
        },
      ]}
      pillars={[
        {
          metric: "Dedicated",
          metricLabel: "Carrier Trunk Capacity",
          title: "Dedicated Carrier Infrastructure",
          description: "Carrier interconnects via Vodafone Idea and Tata Teleservices provisioned with multi-channel capacity across carrier network infrastructure.",
        },
        {
          metric: "Pan-India",
          metricLabel: "Branch Coverage",
          title: "Centralized Multi-Location PBX",
          description: "Manage DIDs across Bengaluru, Mumbai, Delhi, and regional branch offices from one central administrative web console.",
        },
        {
          metric: "Guided",
          metricLabel: "Regulatory Governance",
          title: "DoT KYC & DLT Governance",
          description: "Comprehensive assistance ensuring strict compliance with TRAI DLT regulations and DoT Hosted OSP guidelines.",
        },
      ]}
      synergies={[
        {
          title: "Enterprise Cloud Telephony",
          description: "Explore virtual PBX routing, DID allocations, and distributed agent extensions.",
          href: "/products/cloud-telephony/",
        },
        {
          title: "Enterprise Predictive Dialer",
          description: "High-density predictive dialer for high-volume sales and collection operations.",
          href: "/products/predictive-dialer/",
        },
        {
          title: "Platform Sales CRM Hub",
          description: "Discover native CRM pipelines and omnichannel communication tracking.",
          href: "/products/crm/",
        },
      ]}
      faqs={[
        {
          question: "How long does enterprise carrier trunk provisioning take?",
          answer: "Standard cloud PBX setups with virtual mobile DIDs can be provisioned in 24 to 48 hours following statutory DoT KYC document verification. Dedicated enterprise PRI/SIP trunk blocks typically require 3 to 7 business days depending on carrier validation.",
        },
        {
          question: "Can we integrate Hanva with our internal ERP or custom CRM?",
          answer: "Yes. Hanva provides comprehensive REST API webhooks for inbound call notifications, click-to-call triggers, disposition updates, and automated call recording retrieval, allowing seamless two-way synchronization with proprietary enterprise databases.",
        },
        {
          question: "Where is customer audio and call data stored?",
          answer: "Customer call records and audio recordings are stored in secure cloud infrastructure protected with encryption at rest and role-based access controls, with data management aligned with applicable telecommunications and data privacy regulations.",
        },
      ]}
      schemaData={enterpriseSolutionSchema}
    />
  );
}
