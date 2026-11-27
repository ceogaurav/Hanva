# HANVA TECHNOLOGIES — CAMPAIGN ANALYTICS REPORT
## GTM & GA4 Tracking Architecture, UTM Taxonomy & Privacy Safeguards

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 27  
**Implementation Modules:** `lib/analytics.ts` & `lib/utm.ts`  
**Compliance Standard:** Digital Personal Data Protection Act, 2023 (DPDP Act)  
**Date:** November 2026

---

## 1. Analytics & Attribution Philosophy

In digital growth marketing, dirty attribution data is worse than no data. Conflating clicks with sales, sending personal customer information to external advertising trackers, or double-counting conversions distorts marketing return on investment (ROAS).

**Hanva Technologies enforces four absolute analytics principles:**
1. **Zero PII Transmission:** Customer names, phone numbers, email addresses, and message notes are strictly scrubbed from all analytics payloads before reaching GTM or GA4.
2. **Deterministic Metric Separation:** A link click is never recorded as a qualified lead; an automated handoff is never recorded as a closed sale.
3. **Single Source of Truth for UTMs:** Inbound campaign parameters are sanitized and preserved in memory via `lib/utm.ts` without polluting canonical URLs.
4. **Consent Awareness:** Analytics events respect user consent preferences stored in `localStorage` under `hanva_analytics_consent`.

---

## 2. Standardized UTM Parameter Taxonomy

To ensure unified tracking across Google Ads, Meta Ads, LinkedIn, email newsletters, and partner referrals, all incoming marketing campaigns must adhere to the following taxonomy:

```
https://www.hanva.in/[landing-path]/?
  utm_source=[platform]
  &utm_medium=[channel]
  &utm_campaign=[product_geo_objective]
  &utm_content=[ad_variant_identifier]
  &utm_term=[bidded_keyword_or_audience]
```

### Approved Taxonomy Values

| Parameter | Allowed / Standard Values | Example |
| :--- | :--- | :--- |
| `utm_source` | `google`, `meta`, `linkedin`, `newsletter`, `partner` | `google` |
| `utm_medium` | `cpc`, `paid_search`, `paid_social`, `organic`, `referral` | `cpc` |
| `utm_campaign` | `[product]_[geo]_[type]` | `crm_india_search`, `salon_bangalore_cpc`, `pos_tier1_search` |
| `utm_content` | `[hook]_[ad_number]` | `telecalling_c2c_ad01`, `wifi_drop_pos_ad02`, `stylist_pin_ad01` |
| `utm_term` | Sanitized keyword string (no spaces, lowercase) | `telecalling-crm-software`, `salon-billing-software` |

---

## 3. The Complete Conversion Event Hierarchy

Phase 27 corrected the analytics taxonomy to accurately reflect each progressive milestone in the buyer journey:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. product_page_view                                        │
│    Visitor views core SaaS or service landing page          │
├─────────────────────────────────────────────────────────────┤
│ 2. product_demo_view                                        │
│    Interactive simulation container enters viewport         │
├─────────────────────────────────────────────────────────────┤
│ 3. product_demo_interaction                                 │
│    Visitor toggles roles, steps, audio scrub, or Wi-Fi test │
├─────────────────────────────────────────────────────────────┤
│ 4. product_interest                                         │
│    Visitor selects or switches product category tabs        │
├─────────────────────────────────────────────────────────────┤
│ 5. qualification_completed                                  │
│    Visitor selects scale and bottleneck in qualifier widget │
├─────────────────────────────────────────────────────────────┤
│ 6. enquiry_handoff                                          │
│    Visitor clicks button launching WhatsApp URL             │
├─────────────────────────────────────────────────────────────┤
│ 7. contact_form_submit                                      │
│    Visitor submits structured contact form                  │
├─────────────────────────────────────────────────────────────┤
│ 8. enquiry_received (Sales Desk Metric)                     │
│    Prospect presses "Send" and message arrives in WhatsApp  │
├─────────────────────────────────────────────────────────────┤
│ 9. lead_qualified (Sales Desk Metric)                       │
│    Sales specialist verifies business fit, scale, & budget  │
├─────────────────────────────────────────────────────────────┤
│ 10. demo_scheduled & demo_completed (Sales Desk Metrics)    │
│     Walkthrough scheduled on calendar and executed          │
├─────────────────────────────────────────────────────────────┤
│ 11. sale_won (Commercial Metric)                            │
│     Customer agreement signed and account provisioned       │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Privacy & Non-PII Safeguard Engine

In `lib/analytics.ts`, all event payloads pass through the `sanitizePayload()` filter before dispatch:

```typescript
const DISALLOWED_PII_KEYS = new Set([
  "fullname", "name", "email", "workemail", "phone", "mobile",
  "tel", "msisdn", "company", "companyname", "notes", "message",
  "text", "href", "url", "whatsappurl", "whatsapp_url", "generatedurl"
]);
```

If any component accidentally passes customer contact details into analytics, the sanitizer strips those keys automatically, guaranteeing that Google Tag Manager and GA4 never receive personally identifiable information.
