# Phase 20 — Analytics & Lead Attribution Report

## 1. Metric Separation Governance (Zero Metric Confusion)

| Layer | Metric | Source | What It Measures (And Does NOT Measure) |
|---|---|---|---|
| **Search Discovery** | Search Console Clicks & Impressions | Google Search Console (**BLOCKED**) | Organic Google SERP visibility and clicks to `hanva.in`; NOT equivalent to total sessions or engaged visits. |
| **Traffic & Sessions** | `page_view` & Organic Landing Sessions (`traffic_channel = organic_search`) | Phase 19 `AnalyticsProvider` → GA4 (**Awaiting Owner ID**) | Consented visitor arrivals via Organic Search (distinct from GSC clicks because direct/referral/ad-blocked/consent-declined visits differ). |
| **Product Evaluation** | `view_item_list`, `select_item`, `product_view`, `scroll_depth` | Phase 19 Event Layer | Measures vertical SaaS interest (`hanva_crm`, `hanva_salon_software`, `hanva_restaurant_pos`) and content depth (`50/75/90%`). |
| **Enquiry Intent** | `whatsapp_click`, `form_start`, `form_error`, `form_submit` (`delivery_confirmed: false`) | Phase 19 `TrackedWhatsAppLink` & Contact Form | Visitor intent opening `https://wa.me/918423711043` or Email. **A WhatsApp click is NOT a confirmed lead** (visitor may close WhatsApp without pressing Send). |
| **Confirmed Leads & Customers** | `generate_lead`, `qualify_lead`, `working_lead`, `close_convert_lead`, `disqualify_lead` | Future CRM / Verified Backend Webhook (**Not Implemented**) | Actual business leads and paying SaaS/service customers. **Deferred strictly until owner authorizes server-side / CRM integration.** |

---

## 2. Attribution Readiness & Current Status
- **GA4 & GSC Data Availability:** Both live external accounts remain **BLOCKED / Awaiting Owner IDs**. Consequently, zero organic landing-page conversion volumes or WhatsApp enquiry totals are fabricated in this report.
- **Application Telemetry Verified Ready:** Phase 19 verification (`docs/phase19/evidence/qa_phase19.json`) confirmed that once the owner supplies `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA_MEASUREMENT_ID` and approves live consent/privacy terms, organic arrivals (`Referer` or `utm_medium=organic` → `traffic_channel: "organic_search"`) cleanly persist through product navigation directly onto `whatsapp_click` and `form_submit` events without PII leakage.
