# HANVA TECHNOLOGIES — CENTRALIZED CLAIMS REGISTRY
## Single Source of Truth for Commercial, Infrastructure, Security & Regulatory Claims

**Document ID:** `HANVA-CLAIMS-REGISTRY-v1`  
**Phase:** 1.1 — Cross-Document Consistency Audit & Governance  
**Date:** November 24, 2026  
**Governance Authority:** Principal SaaS Architect, Legal/Compliance Counsel, Engineering Lead  
**Status:** Canonical Reference Document (Active)  

---

## 1. PURPOSE & CLASSIFICATION TAXONOMY

In strict adherence to truth-in-advertising standards, Telecom Regulatory Authority of India (TRAI) directives, Department of Telecommunications (DoT) regulations, and Google Search Quality Evaluator Guidelines (E-E-A-T), this registry governs all public-facing statements, marketing copy, metadata, and sales proposals for Hanva Technologies Pvt. Ltd.

Every business, infrastructure, technical, and regulatory claim is classified into one of five rigorous tiers:

| Tier Code | Classification Level | Definition & Public Release Rule |
|---|---|---|
| `[VERIFIED]` | **Verified Empirical Fact** | Backed by documented evidence (CIN, active domain, working code). Permitted in production copy. |
| `[REQ-MGMT]` | **Requires Management Confirmation** | Commercial policy, pricing, business relationships, or operational terms requiring formal executive sign-off. |
| `[REQ-TECH]` | **Requires Technical Evidence** | Architectural benchmarks, media server locations, latency, or uptime figures requiring load-test and monitoring logs. |
| `[REQ-LEGAL]`| **Requires Legal/Compliance Verification** | Regulatory status, telecom licensing, DLT principal entity filings, or statutory compliance terms requiring legal validation. |
| `[PROHIBITED]`| **Prohibited Until Substantiated** | Speculative metrics, unverified client quotes, synthetic testimonials, or exaggerated pass rates. **Strictly banned from public copy.** |

---

## 2. CENTRAL CLAIMS AUDIT TABLE

| ID | Claim Subject Area | Specific Claim in Phase 1 Documents | Audit Finding / Evidence Assessment | Classification | Approved Public-Facing Copy Replacement | Action Required |
|---|---|---|---|---|---|---|
| **CLM-01** | **Company Identity & Entity** | "Hanva Technologies Pvt. Ltd." | Verified via MCA incorporation (`CIN: U78100KA2025PTC205168`, `GSTIN: 29AAICH0526K1ZF`, `PAN: AAICH0526K`). | `[VERIFIED]` | "Hanva Technologies Private Limited" | Maintain statutory records. |
| **CLM-02** | **Primary Channels** | Phone: `+91 8423711043`<br>Email: `info@hanva.in` | Verified in `lib/config.ts` and all 52 built website routes (reconciled from legacy `+91 7899010973` and `+91 96060 99404`). | `[VERIFIED]` | Live active communication channels. | Maintain active monitored status. |
| **CLM-03** | **Telecom Licensing** | "Licensed telecom carrier / Indian VNO provider" | No DoT Virtual Network Operator (VNO) license or Access Service Provider agreement on file. Cloud telephony providers in India without a VNO license must operate as enterprise application aggregators over carrier-partner PRI/SIP trunks. | `[REQ-LEGAL]` | "Cloud telephony platform powered by authorized Indian telecom carrier interconnects." *(Do not claim direct carrier license).* | Legal counsel to clarify exact DoT licensing/OSP status. |
| **CLM-04** | **Direct Carrier Interconnects** | "Direct Indian Carrier Interconnects (Airtel, Tata, Jio)" | Proposed technical architecture. Hanva must verify whether SIP trunks are directly contracted with Tier-1 telcos or routed via an upstream wholesale aggregator. | `[REQ-TECH]` | "Built on enterprise-grade Indian telecommunications infrastructure." | Infrastructure team to provide telco interconnection contracts. |
| **CLM-05** | **Infrastructure Points of Presence** | "Mumbai and Delhi Edge PoPs" / "Tier-4 carrier data centers" | Current website is hosted on Vercel (`bom1` Mumbai Edge PoP). Underlying telephony media servers (Asterisk/FreeSWITCH/WebRTC) have not had data center locations verified. | `[REQ-TECH]` | "Indian cloud hosting infrastructure with low-latency regional connectivity." | Technical team to document AWS/GCP or private data center PoPs. |
| **CLM-06** | **Network Availability / Uptime** | "99.95% Telecom Uptime SLA" / "99.99% carrier-grade uptime" | Uptime figures are industry benchmarks, but Hanva has not established a historical, audited third-party status page (e.g. Statuspage.io/BetterUptime). | `[REQ-TECH]` | "Designed for high-availability enterprise communications with redundant carrier failover." *(Internal target: 99.95%).* | Deploy public status monitor and establish verifiable SLA logging. |
| **CLM-07** | **Call Setup Latency** | "24ms Edge Call Setup Latency" | The "24ms" figure was carried over from the legacy website's simulated JS telemetry widget (`sys_stat_latency`). Real-world PSTN/SIP call setup (Paging, ISUP signaling, alerting) in India averages 800ms–2,500ms. Calling 24ms "call setup latency" is technically false. | `[PROHIBITED]` | **REMOVE CLAIM ENTIRELY.** Describe as "Low-latency WebRTC browser signaling and rapid call connection." | Prohibit numerical latency claims until empirical WebRTC/SIP benchmarks exist. |
| **CLM-08** | **Voice Encryption** | "128-Bit Voice TLS Encryption" | WebRTC mandates DTLS-SRTP (typically 128-bit or 256-bit AES) for browser media. However, PSTN interconnects across Indian telcos are unencrypted analog/TDM or unencrypted SIP over private MPLS. | `[REQ-TECH]` | "Secure WebRTC browser signaling with end-to-end TLS encryption; enterprise access controls." | Specify encryption boundary (WebRTC app tier vs. carrier PSTN tier). |
| **CLM-09** | **TRAI DLT Compliance** | "TRAI Certified DLT Engine" / "TRAI DLT Ready" | TRAI does not "certify" software platforms. TRAI mandates that principal commercial entities register on operator DLT portals (Vilpower, PingConnect, Trueconnect). | `[REQ-LEGAL]` | "TRAI DLT Aligned: Assisting commercial entities with header registration and regulatory template compliance." | Prohibit calling the platform "TRAI Certified". Use "TRAI DLT Compliant Workflow". |
| **CLM-10** | **DLT Approval Rate** | "100% TRAI DLT Template Pass Rate" | 100% pass rate is an absolute marketing guarantee that cannot be substantiated (operator DLT scrubbers reject templates arbitrarily for minor syntax errors). | `[PROHIBITED]` | **REMOVE CLAIM ENTIRELY.** Replace with "Guided template drafting to ensure compliance with TRAI telemarketing guidelines." | Ban absolute percentage claims in compliance copy. |
| **CLM-11** | **Free Trial Offering** | "14-Day Free Trial" / "Instant Self-Serve Setup" | Commercial terms require management sign-off. Free trials in Indian cloud telephony carry fraud/telemarketing abuse risks (spam calling, illegal VoIP bypass) and require KYC collection. | `[REQ-MGMT]` | "Interactive Platform Demo & Guided Pilot Available Upon Request." *(Self-serve trial subject to management approval).* | Management to confirm trial terms, KYC requirements, and demo minute caps. |
| **CLM-12** | **Instant Provisioning** | "Provision Your Business Virtual Number in Under 10 Minutes" | Under DoT regulations, allocating an Indian virtual mobile number or DID requires business entity verification (GSTIN, Certificate of Incorporation, authorized signatory ID). Instant automated allocation without KYC is illegal in India. | `[PROHIBITED]` | "Fast-track onboarding with rapid KYC verification and number activation." | Align provisioning copy with statutory KYC turnaround times (typically 24–48 hours). |
| **CLM-13** | **Enterprise SLAs** | "15-minute response SLA for critical enterprise line issues" | Operational capacity to maintain a 15-minute SLA across 24x7 requires a dedicated, staffed Network Operations Center (NOC). | `[REQ-MGMT]` | "Priority enterprise technical support with defined escalation protocols." *(SLA terms specified in enterprise contracts).* | Operations to confirm staffed support hours and SLA tiers. |
| **CLM-14** | **WhatsApp / Meta Partnership** | "Official Meta API" / "WhatsApp BSP Partner" | Meta operates a closed Business Solution Provider (BSP) ecosystem. Hanva must clarify whether it is an approved direct Meta BSP or an Independent Software Vendor (ISV) utilizing a BSP API (e.g. Gupshup, Wati, Sinch). | `[REQ-MGMT]` | "WhatsApp Business API automation built on official Meta Cloud API infrastructure." | Confirm exact BSP or Tech Provider integration status. |
| **CLM-15** | **Third-Party CRM Integrations** | "Out-of-the-box sync with Zoho, Salesforce, and Freshdesk" | Hanva has a native CRM prototype. Webhook triggers exist, but pre-built bi-directional marketplace apps (e.g., Salesforce AppExchange package, Zoho PhoneBridge integration) are not yet built or verified. | `[REQ-TECH]` | "Native sales CRM included; REST APIs and webhooks for seamless third-party CRM connectivity." | Clarify native CRM capabilities vs. external API connector roadmaps. |
| **CLM-16** | **Customer Testimonials & Logos** | Fictional client quotes ("COO, Direct-to-Consumer Brand", etc.) | Fictional/synthetic quotes violate Google search quality guidelines and consumer protection laws. | `[PROHIBITED]` | **REMOVE ALL PLACEHOLDER TESTIMONIALS.** Display concrete product capabilities and architectural diagrams until real case studies are signed off. | Strict prohibition of synthetic customer quotes. |
| **CLM-17** | **Quantitative Performance Claims** | "Reduces call drop rate by 42%" / "Multiply Agent Talk Time by 3X" | Empirical metrics published as facts without documented cohort studies expose the company to regulatory and credibility risks. | `[REQ-MGMT]` | "Designed to minimize call abandonment through intelligent queuing and eliminate manual dialing latency." | Label any metric as an illustrative operational objective or case-study finding. |

---

## 3. PUBLIC COPY ENFORCEMENT PROTOCOL

1. **Copy Scrubbing:** Any phrase tagged `[PROHIBITED]` or unverified `[REQ-*]` must be immediately excised from all public website copy, sitemaps, wireframes, and metadata across the nine Phase 1 deliverables.
2. **Technical Review Gate:** Before any performance number (latency, concurrency, uptime) is added to the website, the engineering lead must sign off with time-stamped APM or monitoring logs.
3. **Legal Review Gate:** All regulatory references (TRAI, DoT, DLT, OSP, NDNC) must be reviewed by qualified Indian telecommunications legal counsel.
