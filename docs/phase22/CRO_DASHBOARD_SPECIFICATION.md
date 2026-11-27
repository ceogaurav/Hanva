# CRO DASHBOARD SPECIFICATION — PHASE 22

**Governance Policy:** Zero fabricated sessions, page views, CTRs, WhatsApp click rates, or confirmed lead figures. Live production data populates strictly from verified owner-connected GA4/GTM containers and authorized external WhatsApp/CRM reporting.

---

## 1. Current Telemetry Connection Status

| System Component | Status | Configuration Requirement |
|---|---|---|
| **Website Frontend Event Dispatcher** (`lib/analytics.ts`) | **IMPLEMENTED & VERIFIED LOCALLY** | Consent-gated, zero-PII queue and GA4/GTM event dispatcher active across all `79` routes. |
| **Google Analytics 4 / Google Tag Manager Account** | **BLOCKED / UNCONFIGURED** | Owner must set valid `NEXT_PUBLIC_GTM_ID` (`GTM-...`) or `NEXT_PUBLIC_GA_MEASUREMENT_ID` (`G-...`) in production deployment environment variables before live dashboard metrics appear. |
| **External Confirmed Lead Webhook / CRM Pipeline** | **OUT OF SCOPE / UNAVAILABLE** | Phase 22 forbids unauthorized CRM, Salon POS, Restaurant POS, or WABA DB integration; client-side WhatsApp clicks count only as **Stage 3 Enquiry Intent** (`delivery_confirmed: false`). |

---

## 2. Primary Conversion Funnel Dashboard Views

### A. Stage Progression View (Funnel Definition Sync)

| Funnel Stage | Metric Definition | Verified Source Event(s) | Current Live Account Data |
|---|---|---|---|
| **1. Discovery** | Website & Landing Sessions | `page_view` | `Live data only (GA4 Pending Config)` |
| **2. Interest** | Product Views, Comparison Views, Pricing Views, CTA Impressions | `product_view`, `product_comparison_view`, `pricing_view`, `cta_view`, `scroll_depth` | `Live data only (GA4 Pending Config)` |
| **3. Enquiry Intent** | WhatsApp Clicks, Contact Starts, Form Handoffs, Phone/Demo Clicks | `whatsapp_click`, `cta_click`, `demo_cta_click`, `phone_click`, `form_start`, `form_submit` | `Live data only (GA4 Pending Config)` |
| **4. Confirmed Enquiries** | Verified Inbound Message/Email/Form Receipt | Approved External Webhook / Inbox Logs (**Never** static frontend clicks) | `Verified external confirmation only` |
| **5. Qualified Leads / Customers** | Sales-Validated Fit & Deal Closed | Official Sales CRM / Billing Records | `External CRM workflow only` |

---

### B. Product-Wise Conversion Matrix

| Product | Page views (`product_view`) | CTA clicks (`cta_click` / `demo_cta_click`) | WhatsApp clicks (`whatsapp_click`) | Confirmed leads (Stage 4/5) |
|---|---:|---:|---:|---:|
| **Hanva CRM** (`hanva_crm`) | Live data only | Live data only | Live data only | Verified only |
| **Hanva Salon Software** (`hanva_salon_software`) | Live data only | Live data only | Live data only | Verified only |
| **Hanva Restaurant POS** (`hanva_restaurant_pos`) | Live data only | Live data only | Live data only | Verified only |

*(Breakdown filterable inside GA4 explorations by `device_class` [`desktop`, `tablet`, `mobile`], `cta_location` [`hero`, `product_section`, `article_banner`, `floating_button`, `contact_page`, `footer`], `traffic_channel`, `experiment_id`, and `variant_id`.)*

---

### C. Service-Wise & Content-to-Product Attribution View

| Segment / Dimension | Tracked `product_name` Key | Page / Intent Events | Current Live Status |
|---|---|---|---|
| **Digital Marketing Services** | `digital_marketing` | `page_view` (`/digital-marketing/*`), `whatsapp_click` (`service_whatsapp`) | Live data only (Empty state until GA4 connected) |
| **Software Development Services** | `software_development` | `page_view` (`/software-development/*`), `whatsapp_click` (`service_whatsapp`) | Live data only (Empty state until GA4 connected) |
| **Cloud Telephony & Telecom** | `cloud_telephony` | `page_view`, `pricing_view`, `pricing_calculator_complete`, `whatsapp_click` | Live data only (Empty state until GA4 connected) |
| **Buyer Guides -> Product Bridge** | `hanva_*` inferred via `resolveRouteContext()` & `inferSubjectFromContext()` | `page_view` (`/resources/*`), `cta_view`, `whatsapp_click`, `demo_cta_click` (`?product=...`) | Live data only (Empty state until GA4 connected) |
