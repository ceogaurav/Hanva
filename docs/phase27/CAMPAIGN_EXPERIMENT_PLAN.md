# HANVA TECHNOLOGIES — CAMPAIGN EXPERIMENT PLAN
## Controlled Testing Strategy, Experiment Blueprints & Safety Protocols

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 27  
**Status:** PROPOSED EXPERIMENT ROADMAP (Awaiting owner authorization; zero budget spent)  
**Date:** November 2026

---

## 1. Controlled Experimentation Philosophy

Growth marketing is an empirical science. Rather than making sweeping website changes based on intuition, Hanva evaluates copy, creative angles, landing page layouts, and keyword match types through controlled, statistically valid experiments.

### Strict Safety Protocols:
1. **Zero Spend Without Approval:** All proposed experiments are fully designed with hypotheses, control/variants, and stop conditions, but remain paused until explicit owner authorization.
2. **Deterministic Rollback Rules:** Every experiment has defined negative metrics (e.g., bounce rate spike > 15%, zero enquiries over 100 clicks) that trigger automatic reversion to the control.
3. **No Deceptive Tactics:** No fake countdown timers, fake stock counters, or false pricing discounts.

---

## 2. Master Experiment Roadmap (EXP-27A to EXP-27G)

```
┌─────────┬──────────────────────┬────────────────────────────────┬──────────────┐
│ Exp ID  │ Target Surface       │ Core Hypothesis Tested         │ Proposed Cap │
├─────────┼──────────────────────┼────────────────────────────────┼──────────────┤
│ EXP-27A │ Google Ads: CRM      │ Telecalling Focus vs General   │ ₹5,000 test  │
│ EXP-27B │ /products/crm/       │ Educational Explorer vs Cards  │ Organic / A/B│
│ EXP-27C │ Google Ads: Salon    │ GST SAC 9997 vs Generic POS    │ ₹4,000 test  │
│ EXP-27D │ /products/restaurant │ Wi-Fi Drop Test vs Static Claim│ Organic / A/B│
│ EXP-27E │ All Product Pages    │ Sticky Mobile WA Bar vs Static │ Organic / A/B│
│ EXP-27F │ Google Ads: POS      │ Phrase Match vs Exact Match    │ ₹5,000 test  │
│ EXP-27G │ /company/contact/    │ 3-Click Qualifier vs Long Form │ Organic / A/B│
└─────────┴──────────────────────┴────────────────────────────────┴──────────────┘
```

---

## 3. In-Depth Experiment Specifications

### EXP-27A: CRM Telecalling Focus vs General CRM Ad Copy
- **Surface:** Google Ads Search (Ad Group: Telecalling CRM).
- **Hypothesis:** Positioning Hanva CRM specifically around outbound calling, carrier C2C, and call recording QA will yield a 30% higher CTR and lower CPC than generic "Sales CRM" copy in India.
- **Control (Ad A):** *"Hanva Sales CRM Software — Manage Leads & Pipeline. Contact for Pricing."*
- **Variant (Ad B):** *"Hanva Telecalling CRM — 1-Click C2C Calling & Audio QA. Contact for Pricing."*
- **Primary KPI:** Click-Through Rate (CTR) & Cost-Per-Click (CPC).
- **Secondary KPI:** `enquiry_handoff` conversion rate on landing page.
- **Proposed Budget Cap:** ₹5,000 total across 14 days (~₹350/day).
- **Stop Rule:** Revert if Variant B CTR is < 2.5% after 200 impressions.

### EXP-27B: CRM Interactive Simulation Engagement vs Static Visual
- **Surface:** `/products/crm/`
- **Hypothesis:** Promoting the interactive `<CrmWorkflowExplorer />` above the fold on mobile viewports will increase engagement depth and WhatsApp demo requests by > 20%.
- **Control:** Interactive explorer positioned below the core capabilities grid.
- **Variant:** Interactive explorer hero badge linking smoothly to simulation anchor.
- **Primary KPI:** `product_demo_interaction` count.
- **Secondary KPI:** `enquiry_handoff` from explorer button.
- **Stop Rule:** Revert if page scroll depth decreases or bounce rate increases by > 10%.

### EXP-27C: Salon POS GST Compliance Hook vs General Salon Software
- **Surface:** Google Ads Search (Ad Group: Salon Billing).
- **Hypothesis:** Highlighting "GST SAC 9997 & Dynamic UPI QR" will convert higher-intent salon cashiers and owners compared to generic "Salon Management" copy.
- **Control (Ad A):** *"Hanva Salon Software — Appointments, Billing & Staff Management."*
- **Variant (Ad B):** *"Fast Salon GST Billing POS — SAC 9997 & Dynamic UPI QR. Request Demo."*
- **Primary KPI:** Conversion rate to WhatsApp handoff.
- **Proposed Budget Cap:** ₹4,000 total across 10 days.
- **Stop Rule:** Revert if conversion rate drops below 1.5%.

### EXP-27D: Restaurant POS Offline Resilience Demonstration
- **Surface:** `/products/restaurant-pos/`
- **Hypothesis:** Visitors who interact with the simulated Wi-Fi drop test inside `<RestaurantPosExplorer />` have a 2x higher likelihood of requesting a live restaurant demo.
- **Control:** Visitor browses without interacting with Wi-Fi drop toggle.
- **Variant:** Visitor triggers Wi-Fi drop toggle and sees IndexedDB local queueing.
- **Primary KPI:** Ratio of `enquiry_handoff` among users firing `wifi_test` event vs non-interactors.
- **Measurement:** Segmented GA4 exploration report.

### EXP-27E: Mobile Sticky Bottom WhatsApp Action Bar
- **Surface:** Mobile viewports (< 768px) across all three flagship SaaS pages.
- **Hypothesis:** A persistent, low-profile bottom action bar with a direct "Request Demo on WhatsApp" button will capture visitors who scroll past 40% of the page without scrolling back to the top.
- **Control:** Standard in-page hero and bottom CTAs only.
- **Variant:** Bottom sticky bar appearing after 300px scroll depth.
- **Primary KPI:** Mobile WhatsApp CTR (`whatsapp_click`).
- **Safety Rule:** Must not obscure footer content or trigger accidental taps.

### EXP-27F: Restaurant POS Keyword Match Type Efficiency
- **Surface:** Google Ads Search (Ad Group: Restaurant POS).
- **Hypothesis:** Restricting high-cost keywords to Exact Match `[restaurant billing software india]` while using Phrase Match for long-tail queries will reduce blended CPA by > 25% compared to broad matching.
- **Control:** Broad match modified keywords.
- **Variant:** Strict Exact Match + Phrase Match with 45 negative keywords.
- **Primary KPI:** Cost per qualified enquiry.
- **Proposed Budget Cap:** ₹5,000 test.

### EXP-27G: Fast-Track 3-Click Qualifier vs Traditional Form
- **Surface:** `/company/contact/`
- **Hypothesis:** Presenting the 3-click solution qualifier as an alternative to the 8-field form will increase total mobile enquiry volume by > 35%.
- **Control:** 8-field contact form only.
- **Variant:** 8-field contact form + 3-click `<LeadQualifier />` fast-track section.
- **Primary KPI:** Total WhatsApp handoffs originating from `/company/contact/`.
- **Secondary KPI:** Lead quality assessment by sales desk.
