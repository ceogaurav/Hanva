# SALON PRODUCT PAGE CRO AUDIT (`/products/salon-software/`)

**Audited Source:** `app/products/salon-software/page.tsx`  
**Verified Capabilities Reference:** `docs/phase13/PHASE_13_SALON_FEATURE_AUDIT.md` (`miarhanvabill/hanvabill`)  
**Target Audience:** Single-outlet salon owners, hair studios, beauty parlours, spas, skin & aesthetic clinics.

---

## 1. Conversion & Factual Evaluation

| Section | Current State | CRO Findings & Action Plan |
|---|---|---|
| **Hero & Product Identity (`170-208`)** | Clean Rose-accent badge (`Salon & Spa SaaS Platform`), crisp H1 (`Hanva Salon Software`), Primary `"Request Demo on WhatsApp"` (`I'm interested in a demo of Hanva Salon Software.`), Secondary `"Contact Us for Pricing"` -> `/company/contact/?product=salon-software`. | **CRITICAL Downstream Bug Found:** Clicking `"Contact Us for Pricing"` arrives at `/company/contact/?product=salon-software`, which currently ignores `salon-software` and displays `"Let's Build Your Voice Architecture"` + `"Smart IVR & Cloud Telephony"` dropdown! **AND Mobile sticky bar sends generic enquiry instead of `"I'm interested in a demo of Hanva Salon Software."`!** Both fixes are top-priority CRO wins. |
| **Core Workflow Presentation (`281-353`)** | Clearly details GST checkout (`/inv/[token]`, Z-reports, split payments, memberships/packages), appointment calendar + waitlist + `/book/[slug]` mini-site, PIN Staff Portal + tiered commissions + payroll + auto-consumption inventory + 15 reports. | Covers every priority question of a salon owner accurately. |
| **Scope Limitations & Qualification** | Single-outlet focus is stated nicely (`"Built for single-outlet salons, beauty studios, spas, and grooming lounges"`), but exclusions (no multi-branch outlet switching, no Razorpay checkout, no standalone SMS gateway) should also be surfaced in a crisp **Included vs Scope Limits** box right above FAQs so multi-city chain buyers vs independent salon owners qualify clearly. | **Low-Risk CRO Improvement:** Add concise **"Built For vs Scope Notes"** block clarifying single-outlet focus, offline queue resilience, Fonada WABA dependency on credentials, and exclusion of Razorpay/SMS gateway/multi-branch. |
