# HANVA TECHNOLOGIES — CONVERSION EXPERIMENT ROADMAP
## 10 Prioritized CRO Experiments, Hypotheses, Variants & Rollback Protocols

**Company:** Hanva Technologies  
**Website:** https://www.hanva.in  
**Phase:** 26  
**Methodology:** Controlled A/B & Multivariate Conversion Rate Optimization (CRO)  
**Date:** November 2026

---

## 1. Experimentation Philosophy & Guardrails

To accelerate customer acquisition systematically, all conversion optimization must follow scientific testing protocols rather than arbitrary aesthetic redesigns.

### Core Guardrails
1. **Zero Deceptive Urgency:** No false countdown timers ("Offer expires in 12 minutes!").
2. **Zero Fabricated Social Proof:** No manufactured testimonials, fake ratings, or fake stock counters.
3. **Transparent Pricing Standard:** Universal adherence to "Contact us for pricing".
4. **Instant Rollback Capability:** Every experiment must be implemented via modular feature toggles allowing instant rollback in the event of conversion regression or UX disruption.

---

## 2. The 10 Prioritized CRO Experiments

```
┌─────────┬───────────────────────┬──────────────────────┬──────────┬──────────┐
│ Exp ID  │ Target Surface        │ Hypothesis / Lever   │ Priority │ Effort   │
├─────────┼───────────────────────┼──────────────────────┼──────────┼──────────┤
│ EXP-26A │ /products/crm/        │ Interactive Explorer │ High     │ Implemented
│ EXP-26B │ /company/contact/     │ 3-Click Qualifier    │ High     │ Implemented
│ EXP-26C │ /products/restaurant- │ Wi-Fi Drop Simulator │ High     │ Implemented
│ EXP-26D │ /products/salon-      │ Commission Breakdown │ High     │ Implemented
│ EXP-26E │ All Product Pages     │ Sticky WhatsApp Bar  │ Medium   │ Low      │
│ EXP-26F │ /company/contact/     │ Two-Column Layout    │ Medium   │ Low      │
│ EXP-26G │ /locations/*          │ City Context in WA   │ Medium   │ Low      │
│ EXP-26H │ Buyer Guides          │ Reading Depth Bridge │ Low      │ Medium   │
│ EXP-26I │ /telecom/*            │ Interactive Minutes  │ Low      │ Medium   │
│ EXP-26J │ All Product Pages     │ Video Walkthrough    │ High     │ High     │
└─────────┴───────────────────────┴──────────────────────┴──────────┴──────────┘
```

---

### In-Depth Experiment Specifications

#### EXP-26A: CRM Interactive Simulation vs Static Feature Cards
- **Target Surface:** `/products/crm/`
- **Hypothesis:** Allowing telecalling sales heads to interactively step through inbound webhook capture, C2C calling, and audio review will increase WhatsApp demo requests by > 25% compared to static bullet points.
- **Control (Variant A):** Standard feature cards with static descriptions.
- **Challenger (Variant B):** Interactive `<CrmWorkflowExplorer />` with role toggling and simulated audio scrub.
- **Primary Metric:** `enquiry_handoff` from page.
- **Secondary Metric:** `product_demo_interaction` count.
- **Rollback Rule:** If bounce rate increases by > 10% or page load exceeds 2.5s, revert to control.

#### EXP-26B: 3-Click Fast-Track Qualifier vs 8-Field Web Form
- **Target Surface:** `/company/contact/`
- **Hypothesis:** Providing an immediate, zero-typing 3-click solution qualifier will capture mobile prospects who abandon the longer 8-field form.
- **Control (Variant A):** Traditional structured contact form only.
- **Challenger (Variant B):** Fast-Track `<LeadQualifier />` positioned as an instant routing alternative.
- **Primary Metric:** Total WhatsApp handoffs originating from `/company/contact/`.
- **Secondary Metric:** Mobile form completion rate.
- **Rollback Rule:** Roll back if lead quality drops significantly (e.g., unqualified spam enquiries).

#### EXP-26C: Restaurant POS Offline Wi-Fi Drop Test
- **Target Surface:** `/products/restaurant-pos/`
- **Hypothesis:** An interactive toggle that simulates an internet failure and shows offline IndexedDB queueing will eliminate buyer skepticism regarding POS reliability.
- **Control (Variant A):** Text claim: "Includes offline mode for network outages".
- **Challenger (Variant B):** Interactive Wi-Fi drop test inside `<RestaurantPosExplorer />`.
- **Primary Metric:** Demo request CTA conversion rate.
- **Rollback Rule:** Roll back if users express confusion about simulated offline state.

#### EXP-26D: Salon Software Stylist Commission Transparency
- **Target Surface:** `/products/salon-software/`
- **Hypothesis:** Demonstrating transparent stylist commission calculation in the explorer addresses a top operational headache for salon owners, driving higher engagement.
- **Control (Variant A):** Generic "Staff Management" description.
- **Challenger (Variant B):** Stylist PIN portal with real-time 10% commission tally and day-end Z-report.
- **Primary Metric:** `product_demo_interaction` and WhatsApp handoffs.
- **Rollback Rule:** Revert if engagement does not increase over a 30-day evaluation period.

#### EXP-26E: Mobile Sticky Bottom WhatsApp Action Bar
- **Target Surface:** All 3 flagship SaaS product pages (mobile viewports < 768px).
- **Hypothesis:** A fixed bottom action bar with a prominent "Request Demo on WhatsApp" button will capture visitors who scroll deep into the page without returning to the hero CTA.
- **Control (Variant A):** In-page hero and bottom section CTAs only.
- **Challenger (Variant B):** In-page CTAs + sticky bottom bar appearing after scrolling past 300px.
- **Primary Metric:** Mobile WhatsApp CTR (`whatsapp_click`).
- **Guardrail:** Must not obscure footer or interactive controls; must provide an accessible dismiss button.

#### EXP-26F: Direct Contact Form Visual Trust Anchors
- **Target Surface:** `/company/contact/`
- **Hypothesis:** Placing official corporate registration credentials (CIN, GSTIN, PAN) and response SLA (< 30 min) directly adjacent to the contact form will increase form submission confidence.
- **Control (Variant A):** Standard contact form without credentials.
- **Challenger (Variant B):** Left-hand corporate verification card displaying CIN, GSTIN, address, and response SLA.
- **Primary Metric:** Form validation completion rate.

#### EXP-26G: Contextual Location-Aware WhatsApp Pre-filling
- **Target Surface:** Geographic landing pages (`/locations/*`).
- **Hypothesis:** Appending the prospect's city to the WhatsApp pre-filled message (e.g., `"I'm looking for SaaS software for my business in Bengaluru."`) will increase conversational engagement by > 15%.
- **Control (Variant A):** Generic WhatsApp message.
- **Challenger (Variant B):** Dynamic location-interpolated WhatsApp message.
- **Primary Metric:** WhatsApp message send completion rate.

#### EXP-26H: Buyer Guide Reading Depth Conversion Bridge
- **Target Surface:** Comprehensive Buyer Guides (`/guides/*`).
- **Hypothesis:** Injecting a context-specific software evaluation card when reader scroll depth reaches 60% will convert high-intent researchers into demo requests.
- **Control (Variant A):** Standard inline text links to product pages.
- **Challenger (Variant B):** Interactive "Ready to evaluate Hanva CRM?" card at 60% scroll depth.
- **Primary Metric:** Click-through rate from guides to product demos.

#### EXP-26I: Interactive Cloud Telephony Minute & Capacity Estimator
- **Target Surface:** `/telecom/smart-ivr-system/` and `/telecom/call-center-software/`.
- **Hypothesis:** Providing an interactive slider to estimate required concurrent channels and agent seats will qualify enterprise telephony buyers.
- **Control (Variant A):** Static technical specification tables.
- **Challenger (Variant B):** Interactive channel capacity calculator generating a tailored WhatsApp scope.
- **Primary Metric:** Telephony consultation requests.

#### EXP-26J: Authentic Developer Video Walkthroughs
- **Target Surface:** Core product pages (`/products/*`).
- **Hypothesis:** Embedding a 90-second, high-definition screen recording of an actual developer walking through the live software interface will outperform static screenshots.
- **Control (Variant A):** Static WebP screenshot slots.
- **Challenger (Variant B):** Fast-loading, lazy-loaded video player with chapter markers.
- **Primary Metric:** Video completion rate and demo request rate.
- **Prerequisite:** Completion of the isolated sandbox screenshot capture protocol.
