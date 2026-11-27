# HANVA TECHNOLOGIES — ANALYTICS, CONVERSION EVENT & PRIVACY AUDIT

**Project:** Hanva Technologies  
**Website:** https://www.hanva.in  
**Phase:** 25  
**Date:** November 2026  
**Status:** Completed & Validated  

---

## 1. Executive Summary & Privacy Protocol

Phase 25 audited the website's application-side analytics architecture to guarantee complete measurement readiness while maintaining strict adherence to user privacy and data security.

### Data Integrity & Compliance Notice:
- In accordance with Phase 25 instructions, live production Google Search Console and GA4 accounts are external cloud environments that are not directly credentialed inside this local code workspace.
- **Zero synthetic or fabricated search impressions, click counts, CTR percentages, or conversion numbers are reported.**
- All analytics tracking in the application is client-side, consent-safe, and stripped of personally identifiable information (PII).

---

## 2. Event Measurement Taxonomy

The application utilizes a structured event taxonomy implemented in `lib/analytics.ts` and `components/analytics/`:

| Event Name | Trigger Condition | Parameters Captured | Purpose |
| :--- | :--- | :--- | :--- |
| `whatsapp_click` | Visitor clicks any WhatsApp link or button | `product_name`, `cta_location`, `context_ref`, `cta_type`, `experiment_id` | Tracks high-intent enquiry initiation |
| `demo_request_click` | Visitor clicks demo CTA or contact form button | `product_slug`, `cta_location`, `target_href` | Tracks demo journey progression |
| `contact_form_submit` | Visitor submits web contact form (`/api/leads`) | `product`, `lead_id`, `has_company`, `has_notes` (no PII) | Measures form completions |
| `phone_click` | Visitor clicks phone `tel:` link | `phone_number`, `cta_location` | Tracks direct voice calling inquiries |
| `cta_impression` | IntersectionObserver detects CTA card in viewport | `cta_location`, `product_name`, `experiment_id` | Measures CTA viewability |

---

## 3. Strict Event Separation
Hanva's conversion measurement clearly distinguishes between stages of the customer acquisition lifecycle:
1. **WhatsApp Clicks / Form Submissions:** Initial expression of visitor interest.
2. **Confirmed Enquiries:** When the user initiates a conversation on WhatsApp or successfully submits verified lead details.
3. **Qualified Leads:** Leads vetted for budget, timeline, and operational fit by Hanva sales specialists.
4. **Closed Deals:** Contracted customers with deployed software.

These events are distinct metrics and are never conflated.
