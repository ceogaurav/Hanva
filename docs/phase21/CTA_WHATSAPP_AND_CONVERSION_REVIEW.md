# CTA, WHATSAPP AND CONVERSION REVIEW — PHASE 21

**Primary Conversion Number:** `+91 8423711043`  
**Base URL:** `https://wa.me/918423711043`  
**Configuration Source:** `lib/config.ts` (`SAAS_DEMO_WHATSAPP_MESSAGES`, `buildSaasDemoWhatsAppUrl`, `buildServiceWhatsAppUrl`)

---

## 1. Per-Article Conversion & CTA Mapping Verification

Every newly published article uses `<ArticleLayout />`, which automatically passes `customWhatsappUrl` and `whatsappRef` into:
- Top/mid-flow contextual `<Link>` pathways back to commercial Pillar pages
- Sticky bottom mobile conversion CTA bar (`TrackedWhatsAppLink`)
- Bottom full-width conversion banner (`TrackedWhatsAppLink` + `TrackedDemoLink` to `/company/contact/` + disclosure note `"WhatsApp opens a prepared message in WhatsApp — review and press Send to chat."`)

| Cluster | Article Path | WhatsApp URL / Pre-Filled Message Source | Product/Service Context | Verified |
|---|---|---|---|---|
| **A: CRM** | `/resources/ivr-crm-for-businesses/` | `buildSaasDemoWhatsAppUrl("crm")` -> `"I'm interested in a demo of Hanva CRM."` | Hanva CRM | Yes |
| **A: CRM** | `/resources/lead-management-process-guide/` | `buildSaasDemoWhatsAppUrl("crm")` -> `"I'm interested in a demo of Hanva CRM."` | Hanva CRM | Yes |
| **B: Salon** | `/resources/salon-billing-software-guide/` | `buildSaasDemoWhatsAppUrl("salon")` -> `"I'm interested in a demo of Hanva Salon Software."` | Hanva Salon Software | Yes |
| **B: Salon** | `/resources/salon-appointment-management-guide/` | `buildSaasDemoWhatsAppUrl("salon")` -> `"I'm interested in a demo of Hanva Salon Software."` | Hanva Salon Software | Yes |
| **C: POS** | `/resources/restaurant-billing-software-guide/` | `buildSaasDemoWhatsAppUrl("pos")` -> `"I'm interested in a demo of Hanva Restaurant POS."` | Hanva Restaurant POS | Yes |
| **C: POS** | `/resources/cloud-kitchen-management-guide/` | `buildSaasDemoWhatsAppUrl("pos")` -> `"I'm interested in a demo of Hanva Restaurant POS."` | Hanva Restaurant POS | Yes |
| **D: Digital Marketing** | `/resources/local-seo-guide-for-businesses/` | `buildServiceWhatsAppUrl("Hello Hanva Team, I would like to enquire about Local SEO and SEO Services for my business.")` | Digital Marketing / SEO | Yes |
| **D: Digital Marketing** | `/resources/seo-vs-google-ads-for-smbs/` | `buildServiceWhatsAppUrl("Hello Hanva Team, I would like to discuss SEO Services and Google Ads strategy for my business.")` | SEO & Performance Marketing | Yes |
| **E: Software Dev** | `/resources/custom-crm-development-guide/` | `buildServiceWhatsAppUrl("Hello Hanva Team, I would like to enquire about Custom CRM and ERP Development services.")` | Custom CRM & ERP Dev | Yes |
| **E: Software Dev** | `/resources/software-development-cost-factors/` | `buildServiceWhatsAppUrl("Hello Hanva Team, I would like to discuss project scoping and pricing for Custom Software Development.")` | Custom Software Dev | Yes |

---

## 2. Phase 19 Analytics Compatibility Note
- Because all 10 new pages inherit `<ArticleLayout />`, `<TrackedWhatsAppLink>` and `<TrackedDemoLink>` emit structured non-PII `whatsapp_cta_click` and `demo_enquiry_click` events (with `cta_location`, `context_ref: "/resources/<slug>/"`, and consent-gating via `hanva_analytics_consent`) without sending personal messages or contact data externally.
- Runtime Playwright click + consent verification result will be recorded in `PHASE_21_BUILD_AND_QA_REPORT.md` once the verification suite completes.
