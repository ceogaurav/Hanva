# TOPICAL CLUSTER STRATEGY — PHASE 21

**Website:** `https://www.hanva.in`  
**Owner Market:** India-First (Primary), International (Secondary)  
**Primary Conversion Path:** Contextual WhatsApp Demo/Service Enquiries (`+91 8423711043`) & Internal Pillar Navigation

---

## 1. Strategic Architecture (5 Pillars -> Interconnected Supporting Clusters)

Every topic cluster follows a strict hub-and-spoke authority model:
1. **Spokes never compete with Pillar pages or each other:** Pillars target head commercial software/service terms; supporting guides target high-intent operational "how to", workflow, GST/regulatory, and architecture evaluation queries.
2. **Bidirectional Linking:** Every new article links UP to its primary Pillar (`/products/*`, `/digital-marketing/*`, or `/software-development/*`), ACROSS to 1–2 closely related sibling guides/sub-services, and DOWN/ACROSS from the Pillar page back into the supporting guides.
3. **Zero Unverified Product Claims (`PHASE_13_MASTER_PRODUCT_CAPABILITY_MATRIX.md`):**
   - No fake case studies, metrics, testimonials, human author personas, free trial banners, or fabricated prices (`"Contact us for pricing."`).
   - Exact WhatsApp pre-filled messages preserved for SaaS products (`crm`, `salon`, `pos`) via `buildSaasDemoWhatsAppUrl`, and clean service enquiry strings via `buildServiceWhatsAppUrl`.

---

## 2. Cluster Blueprint Summary

### Cluster A — Hanva CRM (`https://www.hanva.in/products/crm/`)
- **Existing Supporting Guides Retained:** `/resources/telecalling-crm-guide/`, `/resources/crm-with-ivr-vs-telecalling-crm/`, `/resources/how-ivr-systems-work/`, `/resources/whatsapp-business-api-guide/`
- **Phase 21 Batch 1 Articles (`2`):**
  1. `/resources/ivr-crm-for-businesses/` — Operational playbook on combining inbound/outbound IVR routing, DID registry, chunked 5,000-row IVR campaigns, C2C calling, browser audio playback, and Fonada WABA templates inside one CRM workspace (excluding mock `click-to-call` claims and live supervisor wallboards).
  2. `/resources/lead-management-process-guide/` — End-to-end lead governance workflow (webhook & portal ingestion, CSV bulk import, role-based assignment across Admin/Team Leader/Telecaller/KYC Team, scoring, follow-up adherence, KYC vault, and DPDP consent discipline; excluding unimplemented automated bulk email/SMS campaign dispatches).

### Cluster B — Hanva Salon Software (`https://www.hanva.in/products/salon-software/`)
- **Existing Supporting Guide Retained:** `/resources/salon-management-software-guide/`
- **Phase 21 Batch 1 Articles (`2`):**
  1. `/resources/salon-billing-software-guide/` — Front-desk billing mechanics for Indian salons/spas: separating SAC 9997 services vs retail product HSN lines, inclusive vs exclusive GST calculation, split POS payment methods, memberships/session packages, cash register Z-report closing, `/inv/[token]` digital invoices, and offline IndexedDB checkout queues (explicitly excluding Razorpay, SMS gateways, and multi-branch claims).
  2. `/resources/salon-appointment-management-guide/` — Appointment scheduling & capacity utilization: calendar slots, stylist + chair/room resource coordination, waitlist queueing, public `/book/[slug]` mini-website bookings, walk-in auto-customer creation, and compliant WABA reminders.

### Cluster C — Hanva Restaurant POS (`https://www.hanva.in/products/restaurant-pos/`)
- **Existing Supporting Guide Retained:** `/resources/restaurant-pos-kot-inventory-guide/`
- **Phase 21 Batch 1 Articles (`2`):**
  1. `/resources/restaurant-billing-software-guide/` — Fast dine-in, takeaway & local delivery billing in India: CGST/SGST tax splits (plus CBIC standalone 5% without ITC vs 18% specified premises explanation), dynamic NPCI UPI QR, multi-tender split payments (clarifying multi-tender payment vs not claiming single-order bill splitting), offline IndexedDB sync, and thermal/Windows `print-bridge` setup caveats.
  2. `/resources/cloud-kitchen-management-guide/` — Delivery-first kitchen workflow discipline: station-routed KDS boards with `409` duplicate-KOT guards, FIFO/WAC recipe BOM stock depletion, Delivery Zones (pincode matching), and connecting external aggregators/tools cleanly via scoped Partner REST APIs and signed webhooks (**explicitly noting zero native Swiggy/Zomato connectors**).

### Cluster D — Digital Marketing (`https://www.hanva.in/digital-marketing/`)
- **Existing Supporting Guides Retained:** None (`0` previously -> `2` in Batch 1)
- **Phase 21 Batch 1 Articles (`2`):**
  1. `/resources/local-seo-guide-for-businesses/` — Google Business Profile policy compliance (physical premises vs Service-Area Businesses, avoiding virtual office/keyword-stuffed names), clean NAP hygiene, regional city page strategy without Google doorway-page violations, and JSON-LD schema. Connects to `/digital-marketing/seo-services/` and `/locations/*/`.
  2. `/resources/seo-vs-google-ads-for-smbs/` — Objective channel strategy comparing compounding organic SEO vs immediate commercial Search capture via Google Ads: tightly themed ad groups, Search Terms & negative keyword hygiene, landing page message match, non-PII GA4/WhatsApp conversion tracking, and zero hype guarantees. Connects to `/digital-marketing/seo-services/` & `/digital-marketing/performance-marketing/`.

### Cluster E — Software Development (`https://www.hanva.in/software-development/`)
- **Existing Supporting Guide Retained:** `/resources/saas-vs-custom-crm-erp-guide/`
- **Phase 21 Batch 1 Articles (`2`):**
  1. `/resources/custom-crm-development-guide/` — Engineering implementation lifecycle for bespoke CRM/ERP platforms: domain modeling (dealers, pricing approvals, territories), role-based access control, API/ERP/WhatsApp bridges, migration planning, and staged QA. Connects to `/software-development/custom-crm-development/` and distinguishes cleanly from ready-made `/products/crm/`.
  2. `/resources/software-development-cost-factors/` — Transparent breakdown of what actually drives custom software development effort and budget in India (requirement complexity, role permissions & DPDP readiness, third-party integration surface, offline/PWA requirements, testing depth, and AMC maintenance) without fabricated pricing tables. Ends with `"Contact us for pricing."`.

---

## 3. Execution Guardrails Applied

- **Total Batch 1 Count:** `10` articles (`2` per cluster; strictly within `<= 10` limit).
- **Schema Consistency:** Every new article outputs valid JSON-LD (`Article`, `FAQPage`, `BreadcrumbList`) rendered via `<ArticleLayout />`, complete OpenGraph (`1200x630` `/og-image.png`), Twitter summary card, self-referencing `https://www.hanva.in/resources/<slug>/` canonical URL, and `"Hanva Engineering & Editorial Board"` attribution.
- **Deferred Batch (`20` proposed topics):** Logged in `EDITORIAL_PRIORITY_BACKLOG.csv` with explicit Phase 22/skip rationale so future content work avoids keyword cannibalization and builds logically on Phase 21.
