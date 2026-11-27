# HANVA TECHNOLOGIES — MARKETING & ACQUISITION READINESS
## Campaign Architecture, WhatsApp Journey Alignment & Acquisition System Audit

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 30  
**Status:** READY WITH CONDITIONS (Awaiting owner approval for paid launch; zero ad spend active)  
**Date:** November 2026

---

## 1. Executive Marketing Readiness Summary

The customer acquisition system designed across Phase 26 and Phase 27 was audited against live website routing, analytics event definitions, and verified product capabilities.

**Assessment:** The marketing and customer acquisition foundation is **READY WITH CONDITIONS**.
- **Campaign Architecture:** 5 dedicated Google Ads Search campaigns, 24 ad groups, exact/phrase match keywords, and negative keyword lists are fully prepared.
- **Conversion Handoffs:** Verified WhatsApp journeys on `+91 8423711043` with source context interpolation (`I found you through Google`) are fully operational.
- **Analytics Separation:** Strict separation between clicks, form submissions, and sales-qualified leads is verified in `lib/analytics.ts`.
- **Integrity Enforcement:** Universal pricing policy *"Contact us for pricing"* enforced; zero fake testimonials, zero fake ratings, zero unverified claims.

---

## 2. Google Ads Campaign Suite Audit (5 Campaigns)

```
┌─────────────────────────────────┬───────────────────┬─────────────────────────────────┐
│ Campaign Name                   │ Ad Groups         │ Target Landing Page             │
├─────────────────────────────────┼───────────────────┼─────────────────────────────────┤
│ Campaign A: Hanva CRM           │ 5 ad groups       │ /products/crm/                  │
│ Campaign B: Salon Software      │ 3 ad groups       │ /products/salon-software/       │
│ Campaign C: Restaurant POS      │ 3 ad groups       │ /products/restaurant-pos/       │
│ Campaign D: Digital Marketing   │ 3 ad groups       │ /services/digital-marketing/    │
│ Campaign E: Software Development│ 3 ad groups       │ /software-development/          │
└─────────────────────────────────┴───────────────────┴─────────────────────────────────┘
```

### Recommended First Campaign for Launch: Campaign A (Hanva CRM)
- **Rationale:** Highest commercial search intent in Indian metros, direct alignment with verified software capabilities (1-click C2C calling, audio QA, KYC vault), and strongest operational differentiation against manual spreadsheets.
- **Recommended Pilot Test Budget:** ₹5,000 across 14 days (~₹350/day) targeting Bengaluru, Mumbai, and Delhi-NCR.
- **Target Keywords:** `[telecalling crm software]`, `"crm with calling integration"`, `"lead management software india"`.
- **Governance Requirement:** Awaits explicit owner authorization before account activation.

---

## 3. WhatsApp Acquisition Journey Audit

### Handoff Integrity & Source Context
The WhatsApp conversion channel (`+91 8423711043`) operates without intermediate popup blockers:
- When arriving from Google Ads, the CTA interpolates the source:
  ```text
  I'm interested in a demo of Hanva CRM. I found you through Google.
  ```
- When using the 3-click `<LeadQualifier />` on `/company/contact/`, the widget compiles a structured operational summary:
  ```text
  Hello Hanva Team,
  I completed the Solution Qualifier on your website:
  • Solution: Hanva Restaurant POS
  • Scale: Casual Dine-In (10-30 Tables)
  • Immediate Focus: Preventing POS crashes during internet outages
  Please share product details, a guided demo, and pricing information.
  ```

---

## 4. Analytics & Event Separation Verification

In `lib/analytics.ts`, event telemetry strictly adheres to DPDP Act privacy rules and deterministic conversion stages:
1. `product_page_view`: Product surface viewed.
2. `product_demo_interaction`: Simulation controls toggled.
3. `product_interest`: Qualifier product tab switched.
4. `qualification_completed`: 3-step dropdown questionnaire finished.
5. `enquiry_handoff`: User transferred to `wa.me` WhatsApp URL.
6. `lead_qualified`: **Never fired on the client side.** Strictly reserved for verified qualification by the Hanva sales desk.
7. **Zero PII:** Names, mobile numbers, and personal emails are stripped before data reaches Google Tag Manager or GA4.
