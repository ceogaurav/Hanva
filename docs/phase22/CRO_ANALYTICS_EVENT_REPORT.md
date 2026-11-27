# CRO ANALYTICS EVENT REPORT — PHASE 22

**Telemetry Core:** `lib/analytics.ts`, `components/analytics/tracked-links.tsx`, `components/analytics/analytics-provider.tsx`  
**Live Account Status:** `NEXT_PUBLIC_GTM_ID` & `NEXT_PUBLIC_GA_MEASUREMENT_ID` remain **UNCONFIGURED / BLOCKED** in workspace (validating strictly through local Playwright telemetry dispatcher without fabricated GA4 live numbers).

---

## 1. Event Taxonomy Preserved & Expanded

| Event Name | Trigger Scope | Parameters Captured (Sanitized / Zero PII) |
|---|---|---|
| `page_view` | Single fire per route when consent === `"granted"` | `page_title`, `page_path`, `page_category`, `device_class`, session `traffic_channel` / UTM |
| `product_view` | Flagship SaaS pages (`/products/crm/`, `/products/salon-software/`, `/products/restaurant-pos/`) | `product_name`, `product_category` (`saas_product`) |
| `pricing_view` *(New)* | `/pricing/` and `/pricing/calculator/` | `pricing_surface` (`commercial_pricing` / `pulse_calculator`) |
| `product_comparison_view` *(New)* | `/products/` comparison matrix and `/compare/*` routes | `comparison_scope`, `item_count` |
| `cta_view` *(New)* | First intersection (`>= 25%` viewport) of `<TrackedCtaObserver>` banners (Hero / Article bottom banners); deduplicated per route + surface | `product_name`, `cta_location`, `cta_surface`, `cta_type`, optional `experiment_id` / `variant_id` |
| `cta_click` *(New)* | Non-blocking click dispatch on CTAs (`TrackedWhatsAppLink`, `TrackedDemoLink`, `MobileActionBar`, `Header`) | `product_name`, `cta_location`, `cta_surface`, `cta_type`, optional `experiment_id` / `variant_id` |
| `whatsapp_click` | Any official `wa.me/918423711043` action | `product_name` (fixed matching for `cloud-kitchen`, `ivr-crm`, `lead-management`, `cost-factors`), `cta_location`, `cta_type`, `cta_surface` |
| `form_start`, `form_error`, `form_submit` | `/company/contact/` form lifecycle | `form_name`, `error_fields`, `product_name`, `selected_team_size_bucket`, `handoff_method`, `delivery_confirmed: false` (**never** fires `generate_lead`) |

---

## 2. Automated Playwright Telemetry Validation Results (`verify_phase22.py` & `analytics_funnel_probe.json`)

| Verification Assertion | Observed Result |
|---|---|
| Pre-consent gating (`hanva_analytics_consent = "unset"`) | **`0` events queued** (`preConsentQueueLen: 0`) prior to explicit opt-in click. |
| Pricing & Comparison events (`/pricing/`, `/products/`) | Verified `pricing_view` on `/pricing/` and `product_comparison_view` on `/products/`. |
| Product Page `cta_view` + `whatsapp_click` + `cta_click` (`/products/crm/`) | Verified non-duplicate `cta_view` (`crm_hero_cta`), `whatsapp_click` (`product_demo_whatsapp`), and `cta_click` carrying `experiment_id: "EXP-22C"` & `variant_id: "request_demo_whatsapp"`. |
| Form Error & Honest Submit (`/company/contact/?product=salon-software`) | Verified `form_error` (`error_fields: "fullName,phone"`), `form_start` (`first_field_name: "fullName"`), and `form_submit` (`product_name: "hanva_salon_software"`, `delivery_confirmed: false`, zero `generate_lead`). |
| Zero PII Audit | **`0` PII leaks** (`piiLeaks: []` checked against `"Priya Sharma"`, `"priya@salonstudio.in"`, `"9876501234"`, `"wa.me/"`). |
| Live External GA4 Reporting | **BLOCKED** — Awaiting owner GTM/GA4 container keys in production environment. |
