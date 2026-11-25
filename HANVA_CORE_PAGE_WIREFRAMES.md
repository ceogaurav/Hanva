# HANVA TECHNOLOGIES — CORE PAGE WIREFRAME SPECIFICATIONS
## Architectural Layout Blueprints for All 14 Core Pages

**Document ID:** `HANVA-WIREFRAMES-v1.1`  
**Phase:** 1.1 — Cross-Document Audit, Corrections & Governance  
**Date:** November 24, 2026  
**Status:** Approved for Implementation  
**Claims Governance:** 100% Scrubbed in accordance with [HANVA_CLAIMS_REGISTRY.md](file:///Users/apple/Downloads/HANVA/HANVA_CLAIMS_REGISTRY.md)  
**SEO Policy:** Aligned with Google Search Central Structured Data & Service Guidelines  

---

## 1. HOMEPAGE (`/`)
- **Search Intent:** Commercial / Navigational ("cloud telephony and crm software india")
- **Primary Objective:** Establish Hanva as India's unified cloud communications and CRM platform; convert visitors into demo bookings and consultation inquiries.
- **Schema.org:** `Organization`, `WebSite`

```
+---------------------------------------------------------------------------------------------------------+
| [STICKY MEGA-MENU HEADER: Logo | Products ▾ | Solutions ▾ | Industries ▾ | Resources ▾ | Pricing | CTAs]|
+---------------------------------------------------------------------------------------------------------+
| HERO SECTION                                                                                            |
| [Pill: 🛡 TRAI DLT Aligned Workflow • Enterprise Voice Infrastructure • Indian Cloud Hosting]          |
| Unified Cloud Telephony, Smart IVR & Sales CRM Built for Indian Enterprise                              |
| Connect virtual numbers, multi-level IVR call routing, high-velocity dialers,                           |
| and WhatsApp messaging within a single high-performance sales workspace.                                |
| [Primary CTA: Book a 15-Min Live Demo →]   [Secondary CTA: Estimate Your Telephony Costs 🧮]            |
|                                                                                                         |
| ILLUSTRATIVE CALL-FLOW & CRM PLAYGROUND (INTERACTIVE DEMO WIDGET)                                       |
| +-----------------------------------------------------------------------------------------------------+ |
| | Visual Call Simulation:                                                                             | |
| | [Inbound Caller: +91 98450 12345] ➔ [Smart IVR: Press 1 for Sales] ➔ [Rings 3 Agents Simultaneously] | |
| | ➔ [Call Connected: Agent Representative] ➔ [Logs Lead in Hanva CRM] ➔ [Triggers WhatsApp Brochure]  | |
| +-----------------------------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
| TRUST & COMPLIANCE BAR                                                                                  |
| Authorized Indian Carrier Interconnects • TRAI DLT Entity Guidance • Encrypted WebRTC Signaling        |
+---------------------------------------------------------------------------------------------------------+
| CORE PILLAR SHOWCASE (4-COLUMN GRID)                                                                    |
| [1. Cloud Telephony]    [2. Smart Multi-IVR]    [3. Auto & Predictive Dialer]    [4. Telecalling CRM]   |
+---------------------------------------------------------------------------------------------------------+
| COMPARATIVE VALUE SECTION: WHY TEAMS CHOOSE HANVA                                                       |
| Side-by-side comparison illustrating Hanva's 30-second pulse vs. legacy 60-second double-leg deductions |
+---------------------------------------------------------------------------------------------------------+
| INDUSTRY SOLUTIONS MATRIX (Tabs: Real Estate | Healthcare | BFSI | Education | E-Commerce)               |
+---------------------------------------------------------------------------------------------------------+
| OPERATIONAL ARCHITECTURE (Factual infrastructure specifications)                                       |
| [Low-Latency WebRTC Signaling]   [Direct Carrier Trunk Redundancy]   [Zero Hidden Forwarding Surcharges]|
+---------------------------------------------------------------------------------------------------------+
| PROPOSED PRICING PREVIEW (Unapproved: Starter ₹799/mo | Professional ₹1,999/mo | Enterprise Custom)     |
+---------------------------------------------------------------------------------------------------------+
| FREQUENTLY ASKED QUESTIONS (Accordion with Schema.org FAQPage for semantic AEO/GEO indexing)           |
+---------------------------------------------------------------------------------------------------------+
| FINAL CONVERSION BANNER                                                                                 |
| Ready to Modernize Your Telecom Infrastructure? [Book Consultation] [Call Sales: +91 7899010973]        |
+---------------------------------------------------------------------------------------------------------+
| [FULL ENTERPRISE SITEMAP FOOTER]                                                                        |
+---------------------------------------------------------------------------------------------------------+
```

---

## 2. CLOUD TELEPHONY (`/products/cloud-telephony/`)
- **Search Intent:** Commercial / Transactional ("cloud telephony service provider in india")
- **Schema.org:** `Service` (serviceType: "Cloud Telephony")
- **Layout Characteristics:** Telecom architecture diagram, DID series availability, WebRTC browser softphone preview.
- **Key Sections:**
  1. **Hero:** Cloud-Based Virtual Phone Systems for Indian Business (Zero physical EPABX hardware).
  2. **Illustrative Softphone Preview:** Simulated browser dialer demonstrating click-to-call, call hold, transfer, and recording playback.
  3. **Virtual Numbers Showcase:** Landline DIDs (080, 022, 011), Mobile series, and 1800 Toll-Free numbers (subject to standard statutory KYC verification).
  4. **Call Routing Architecture:** Hunt groups, parallel ringing, time-based shifts, and failover routing.
  5. **Operational Telemetry:** Call Detail Records (CDR), live agent wallboards, voice analytics.
  6. **CTA:** Initiate Your Business Virtual Number Onboarding with Guided KYC.

---

## 3. IVR SERVICE PROVIDER (`/products/ivr-system/`)
- **Search Intent:** Commercial ("ivr service provider in india")
- **Schema.org:** `Service` (serviceType: "Interactive Voice Response")
- **Layout Characteristics:** Category hub emphasizing business reception automation, customer experience, and call distribution.
- **Key Sections:**
  1. **Hero:** Automated 24/7 Virtual Receptionist for Inbound Call Management.
  2. **Multi-Channel Call Handling:** Directing callers to sales, support, billing, or regional language queues.
  3. **Custom Voice Greetings:** Scripting guidance for professional Hindi, English, and regional language greetings.
  4. **Missed Call & After-Hours Automation:** Auto-triggers SMS/WhatsApp confirmation when calls arrive outside operating hours.
  5. **Call Handling Efficiency:** How structured IVR menus streamline call distribution and reduce caller wait times.

---

## 4. SMART MULTI-LEVEL IVR (`/products/smart-ivr/`)
- **Search Intent:** Feature / Technical ("multi level ivr system for business")
- **Schema.org:** `Service`, `SoftwareApplication`
- **Layout Characteristics:** Interactive visual flowchart canvas demonstrating nested call trees (Press 1 for Sales → Press 2 for Enterprise → Press 3 for Regional Language).
- **Key Sections:**
  1. **Hero:** Visual IVR Call Flow Designer with Drag-and-Drop Logic.
  2. **Live Visual Canvas Demo:** Users can click branches on screen to see how callers traverse decision trees.
  3. **Dynamic API Routing:** Conceptual routing of callers based on external CRM database lookups.
  4. **Queue Management:** Configurable queue audio, hold logic, and callback request triggers.

---

## 5. CONTACT CENTER SOFTWARE (`/products/call-center-software/`)
- **Search Intent:** Commercial Enterprise ("cloud call center software india")
- **Schema.org:** `SoftwareApplication`, `Service`
- **Layout Characteristics:** Operational dashboard layout; inbound/outbound blended console.
- **Key Sections:**
  1. **Hero:** Cloud Contact Center Platform for Support & Telesales Operations.
  2. **Supervisor Live Wallboard:** Active call counts, agent availability states, queue wait metrics.
  3. **Call Monitoring Protocols:** Silent call listening, whispering (agent-only audio), and call barging (3-way bridge).
  4. **CRM Interconnects:** Native Hanva CRM + REST API webhooks for external CRM data exchange.

---

## 6. AUTO DIALER (`/products/auto-dialer/`)
- **Search Intent:** Transactional ("auto dialer software for sales team")
- **Schema.org:** `SoftwareApplication`
- **Layout Characteristics:** Sales acceleration emphasis, click-to-call mechanics, lead list ingestion.
- **Key Sections:**
  1. **Hero:** Streamline Outbound Dialing and Increase Agent Talk Time.
  2. **Progressive & Click-to-Call Dialing:** How automated calling operates from web and mobile CRM screens.
  3. **Disposition Logging:** 1-click outcome buttons (Interested, Callback Scheduled, Busy, Invalid Number).
  4. **Automated Follow-ups:** Trigger post-call WhatsApp template brochures upon call completion.

---

## 7. PREDICTIVE DIALER (`/products/predictive-dialer/`)
- **Search Intent:** Enterprise Outbound ("predictive dialer for outbound call center")
- **Schema.org:** `SoftwareApplication`
- **Layout Characteristics:** Pacing algorithm explanation, call answer detection, BPO efficiency metrics.
- **Key Sections:**
  1. **Hero:** Pacing Engine for High-Density Outbound Contact Centers.
  2. **Algorithmic Dialing Logic:** Statistical forecasting of agent availability to minimize agent idle time.
  3. **Answer Machine Detection (AMD):** Automatically filters out dead lines, busy tones, and automated voicemails.
  4. **Regulatory Calling Alignment:** Compliance with TRAI calling hour windows and NDNC scrubbing protocols.

---

## 8. CRM SOFTWARE (`/products/crm/`)
- **Search Intent:** Commercial ("sales crm with calling software")
- **Schema.org:** `SoftwareApplication`
- **Layout Characteristics:** Clean pipeline stages, contact cards, activity timeline, GST invoicing ledger.
- **Key Sections:**
  1. **Hero:** Sales Pipeline, Lead Management & Billing in One Unified Workspace.
  2. **Visual Deal Pipeline:** Kanban deal board with stage values, expected close dates, and telecaller ownership.
  3. **360° Customer Profile:** Complete log of calls, audio recordings, WhatsApp messages, and generated GST invoices.
  4. **Integrated GST Invoicing Ledger:** Convert won deals into compliant tax invoices with automated GST calculations.

---

## 9. TELECALLING CRM (`/products/telecalling-crm/`)
- **Search Intent:** Transactional / Commercial ("telecalling crm software india")
- **Schema.org:** `SoftwareApplication`
- **Layout Characteristics:** Telecaller agent workstation view; SIM-based vs. Cloud Calling toggle.
- **Key Sections:**
  1. **Hero:** Purpose-Built Telecalling Workstation for Outbound Sales Teams.
  2. **Agent Console Ergonomics:** Number masking, 1-click dialing, daily call target trackers.
  3. **Flexible Dialing Modes:** Support for WebRTC browser calling, mobile SIM app dialing, or enterprise cloud SIP lines.
  4. **Manager Performance Reports:** Calls dialed, talk time duration, conversion outcomes, and agent leaderboards.

---

## 10. WHATSAPP CRM (`/products/whatsapp-crm/`)
- **Search Intent:** High-Growth Commercial ("whatsapp crm for sales team")
- **Schema.org:** `SoftwareApplication`
- **Layout Characteristics:** Interactive WhatsApp chat screen mockup with template buttons, automated workflows.
- **Key Sections:**
  1. **Hero:** WhatsApp Business API Automation Unified with Your Telephony & CRM Stack.
  2. **Automated Post-Call Messaging:** Dispatch catalogs or quotations within seconds of call completion.
  3. **Shared Team Inbox:** Multi-agent chat assignment from a single business number.
  4. **Meta-Approved Template Workflows:** Utility notifications, appointment reminders, and customer re-engagement.

---

## 11. INDUSTRY SOLUTIONS (`/industry/real-estate/` & VERTICAL HUBS)
- **Search Intent:** Vertical Specific ("real estate telecalling crm and ivr")
- **Schema.org:** `Service`
- **Layout Characteristics:** Sector-specific terminology, workflow diagram matching industry operations (e.g. Property portal lead ingestion → IVR call connect).
- **Key Sections:**
  1. **Hero:** Cloud Telephony & Lead Management Engineered for Real Estate Developers & Channel Partners.
  2. **Lead Routing Architecture:** API capture from property portals and digital ad campaigns into immediate telecaller distribution.
  3. **Virtual Ad Tracking Numbers:** Distinct virtual DIDs assigned to outdoor hoardings, print, and digital campaigns.
  4. **Site-Visit Scheduling:** Automated IVR and WhatsApp appointment confirmations for prospective property buyers.

---

## 12. PRICING & COST ESTIMATOR (`/pricing/` & `/pricing/calculator/`)
- **Search Intent:** High Transactional Commercial ("hanva cloud telephony pricing plans")
- **Schema.org:** `PriceSpecification`, `WebApplication`
- **Layout Characteristics:** 3 proposed tier cards + Annual/Monthly toggle (20% discount) + Live interactive calculator.
- **Crucial Commercial Transparency Disclosures:**
  1. **Unapproved Proposal Notice:** *"All listed plans represent proposed commercial packages subject to executive sign-off and carrier line agreements."*
  2. **Billable Call Legs:** Clearly shows that inbound forwarded calls incur a forwarding leg charge, and click-to-call bridges two simultaneous call legs.
  3. **Pulse Rounding:** Outbound usage is modeled on a standard 30-second pulse.
  4. **Number Rentals & Taxes:** Virtual numbers and 18% GST are itemized as separate line items.

---

## 13. ABOUT HANVA (`/company/about/`)
- **Search Intent:** Trust / Brand ("about hanva technologies pvt ltd")
- **Schema.org:** `AboutPage`, `Organization`
- **Layout Characteristics:** Infrastructure architecture map, engineering philosophy, operational governance.
- **Key Sections:**
  1. **Hero:** Engineering Dependable Cloud Telephony & Sales Automation for Indian Business.
  2. **Data Sovereignty & Security:** Indian cloud hosting, WebRTC TLS encryption, and role-based access control.
  3. **Engineering Craftsmanship:** Cloud communications software built on high-concurrency WebRTC and modern reactive UI.
  4. **Corporate Governance:** Registered corporate entity information, support helplines, and client-first principles.

---

## 14. CONTACT HANVA (`/company/contact/`)
- **Search Intent:** Transactional / Lead Conversion ("contact hanva technologies sales support")
- **Schema.org:** `ContactPage`
- **Layout Characteristics:** Two-column high-conversion layout (Left: Direct contact coordinates; Right: Interactive consultation form).
- **Key Sections:**
  1. **Direct Communication Channels:**
     - Phone: `+91 7899010973` (Mon–Sat, 9:00 AM – 7:00 PM IST)
     - WhatsApp: Instant Chat Support
     - Email: `gaurav@hanva.in`
  2. **Interactive Consultation Form:** Select required solutions, team size, call volume estimates, and schedule a 15-minute consultation.
  3. **Support Commitment:** Clear business hours and documented enterprise escalation pathways.
