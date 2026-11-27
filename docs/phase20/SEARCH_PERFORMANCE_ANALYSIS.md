# Phase 20 — Search Performance Analysis

> [!IMPORTANT]
> **Status: BLOCKED (No Google Search Console Access)**  
> Live authenticated Search Console metrics (clicks, impressions, CTR, average position, queries, device/country breakdown, and search appearance) are unavailable in this session. Zero query impressions, clicks, or positions are invented below.

## 1. Account Data Gaps Requiring Owner Search Console Export

| Reporting Dimension | Required Periods | Status |
|---|---|---|
| Total Clicks, Impressions, Avg CTR & Avg Position | Last 28d vs Previous 28d; Last 3m vs Previous 3m; Last 6m (IST / UTC-07:00 GSC timezone noted on export) | **BLOCKED — Pending GSC Access** |
| Top Search Queries & Emerging Buying-Intent Terms | Branded (`hanva`, `hanva crm`, `hanva technologies`) + Non-Branded SaaS/Service queries | **BLOCKED — Pending GSC Access** |
| High-Impression / Low-CTR & Position 5–20 Opportunities | Queries averaging pos. 5–20 or < 1.5% CTR | **BLOCKED — Pending GSC Access** |
| Landing Page Performance & Device / Country Split | India (`IN`) vs Secondary Intl (`AE`, `SG`, `US`, `GB`) across Mobile / Desktop | **BLOCKED — Pending GSC Access** |
| Overlapping URLs / Keyword Cannibalization Check | Actual query-to-URL impression splits (`/products/crm/` vs `/products/telecalling-crm/` vs `/resources/crm-with-ivr-vs-telecalling-crm/`) | **BLOCKED — Pending GSC Access** |

---

## 2. Analysis Framework & Methodological Controls Ready for First GSC Export
Once owner exports arrive from `https://www.hanva.in/`:
1. **Treat Average Position Carefully:** Average position aggregates personalized, city-specific (Bengaluru vs Mumbai vs Delhi NCR), and device-specific SERP slots rather than representing a fixed rank for all users.
2. **Account for Seasonality & Brand Deployment Dates:** The Phase 14 SaaS expansion, Phase 17 buyer guides, and Phase 18/19 release (`c5ec992`) went live on November 26, 2026; prior 3-month/6-month comparisons primarily reflect legacy telecom/homepage routes and cannot be compared evenly against newly added SaaS URLs without date-cohort segmentation.
3. **Structured Opportunity Triage:**
   - *Bucket A (Impressions > 50, CTR < 1.5%, Pos 1–10):* Rewrite meta title/description + FAQ schema snippets for commercial relevance (never clickbait).
   - *Bucket B (Pos 5–20 with Buyer Intent):* Strengthen contextual H2 coverage, internal anchor diversity from sibling hubs/guides, and verified capability proof.
   - *Bucket C (Wrong Page Appearing / Multi-URL Splits):* Reinforce canonical intent separation — keep `/products/crm/` anchored on unified CRM + IVR + WhatsApp, `/products/telecalling-crm/` on outbound dialer teams, `/software-development/custom-crm-development/` on bespoke builds, and `/resources/crm-with-ivr-vs-telecalling-crm/` capturing comparison queries.
