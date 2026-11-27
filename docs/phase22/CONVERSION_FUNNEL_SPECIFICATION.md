# CONVERSION FUNNEL SPECIFICATION — HANVA WEBSITE (PHASE 22)

**Governing Telemetry Module:** `lib/analytics.ts`  
**Truthfulness Rule:** Never emit `generate_lead` or treat an outbound click / WhatsApp URL launch as a confirmed lead or sale.

---

## Stage-by-Stage Funnel Architecture

| Stage | Name | Qualifying User Behavior on Website | Event Tracking Classification | Measurement Constraints |
|---|---|---|---|---|
| **Stage 1** | **Discovery** | Initial landing on `/`, flagship product page (`/products/crm/`, `/products/salon-software/`, `/products/restaurant-pos/`), DM/Dev service pages (`/digital-marketing/*`, `/software-development/*`), telecom pages, location pages, or `21` resource guides. | `page_view` (fired once per route after analytics consent granted). Includes inferred `page_category` and session UTM (`traffic_channel`). | Paused strictly while `hanva_analytics_consent` is `"unset"` or `"denied"`. |
| **Stage 2** | **Interest** | Viewing SaaS portfolio / comparisons (`/products/`, `/compare/*`), viewing `/pricing/` or `/pricing/calculator/`, scrolling cleanly (`50%`/`75%`/`90%`), or bringing primary conversion sections into viewport visibility. | `product_view`, `view_item_list`, `pricing_view`, `product_comparison_view`, `scroll_depth`, `cta_view` (first intersection only per CTA location), `select_item`. | `cta_view` fires maximum once per `cta_location` per page visit (never spam on scroll jitter). |
| **Stage 3** | **Enquiry Intent** | Clicking any WhatsApp CTA (`wa.me/918423711043`), tapping Phone (`tel:+918423711043`), clicking `"Request Demo"` / `"Contact Us for Pricing"`, interacting with Contact Form, or triggering client-side WhatsApp/Email handoff preparation. | `cta_click` (paired non-duplicatively for conversion UI blocks), `whatsapp_click`, `phone_click`, `demo_cta_click`, `contact_page_view`, `form_start`, `form_submit` (`delivery_confirmed: false`), `form_error`. | WhatsApp handoff and client-side form submission indicate **intent only** because the user must manually click **Send** inside external WhatsApp or Email apps. Zero PII (`name`, `email`, `phone`, `notes`, raw URL) emitted. |
| **Stage 4** | **Confirmed Enquiry** | Verified arrival of an inbound message inside Hanva's official WhatsApp Business desk (`+91 8423711043`), Sales Email (`info@hanva.in`), or an approved backend webhook/CRM submission endpoint returning server `2xx` confirmation. | **External / Server-Verified Only** (`NOT tracked automatically by static frontend`). Placeholder `Confirmed enquiries: Verified only`. | Must **NEVER** be triggered on browser click or `window.open("https://wa.me/...")`. Currently **UNAVAILABLE / EXTERNAL** until CRM/WABA webhook reporting is authorized. |
| **Stage 5** | **Qualified Lead & Customer** | Prospect validated by Hanva sales engineering for genuine business fit, seat/outlet scope, quotation issuance, onboarding, and payment completion. | **External CRM Pipeline Only** (`NO unauthorized CRM, Salon POS, Restaurant POS, or WABA DB integration permitted in Phase 22`). | Explicitly out of scope of website analytics alone; requires verified sales team pipeline closure. |
