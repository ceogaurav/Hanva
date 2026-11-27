# Phase 20 — 90-Day Organic Growth Plan

> [!NOTE]
> All actions operate on verified local/live baselines without guaranteeing rankings, traffic volumes, or lead counts. Timelines and metrics evaluate against future verified Google Search Console & GA4 data once connected by the owner.

---

## Stage 1 — Days 1–30: Technical & Indexing Foundation

| Action | Target URL(s) | Reason & Supporting Evidence | Priority | Effort | Measurement Method |
|---|---|---|---|---|---|
| 1. Verify & Connect Google Search Console (`https://www.hanva.in/` + Domain property) & submit `/sitemap.xml` | Site-wide (`69` URLs) | Pre-requisite to unblock index coverage, real search queries, and CrUX field CWV (`SEARCH_CONSOLE_ACCESS_AND_PROPERTY_REPORT.md`) | P0 | Small (Owner account task) | GSC Property Verified + `sitemap.xml` Processed count = `69` |
| 2. Deploy Phase 19 & Phase 20 local enhancements (analytics + fixed `og:image` + tightened descriptions + reciprocal product-guide links) | `/`, `/products/*`, `/resources/*`, `/digital-marketing/`, `/software-development/` | Baseline crawl found 6 missing OG images, 237-char home description, and one-way product-to-guide gaps (`PHASE_20_SEO_BASELINE.md`) | P0 | Small (Requires owner deploy approval) | Re-crawl HTTP `200`, `0` missing OG tags, clean meta lengths |
| 3. Activate `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA_MEASUREMENT_ID` + owner-approved CSP script origins | Site-wide (`next.config.mjs`, Vercel env) | Enables live Stage 1–3 funnel tracking via Phase 19 event architecture | P0 | Small (Owner env + CSP review) | GA4 DebugView receives consented `page_view`, `product_view`, `whatsapp_click` |
| 4. Refactor `/company/contact/` layout shell so hero `<h1>` renders server-side above client `<Suspense>` | `/company/contact/` | Lighthouse Lab test showed Mobile LCP `2.4 s` vs `0.9–1.0 s` on static routes (`CORE_WEB_VITALS_AND_PERFORMANCE.md`) | P1 | Low (`1–2 hrs` dev) | Re-run Lighthouse Mobile LCP < `1.2 s` on `/company/contact/` |
| 5. Surface contextual in-body links to the 3 `/compare/*-alternative/` pages from CRM / Cloud Telephony pages | `/products/crm/`, `/products/telecalling-crm/`, `/products/cloud-telephony/` | Currently all 3 compare pages have `body_in_links_count = 0` (`seo_crawl_69.json`) | P1 | Low (`30 mins`) | Body link graph in-degree moves `0` → `>= 2` |

---

## Stage 2 — Days 31–60: Search Intent, Visual Proof & Content Depth

| Action | Target URL(s) | Reason & Supporting Evidence | Priority | Effort | Measurement Method |
|---|---|---|---|---|---|
| 6. Upload sanitized real WebP product screenshots replacing remaining `ProductVisualPlaceholder` slots | `/products/crm/`, `/products/salon-software/`, `/products/restaurant-pos/` | Phase 15 architectural slots remain visually unpopulated; Indian SaaS buyers expect UI proof (`CONTENT_GAP_AND_COMPETITOR_ANALYSIS.md`) | P0 | Medium (Product design/capture) | Visual QA + explicit `width/height` keeping CLS `0` + engagement/scroll depth |
| 7. Expand `/digital-marketing/seo-services/` & `/digital-marketing/` FAQs covering client GA4/GSC ownership & pipeline attribution | `/digital-marketing/seo-services/`, `/digital-marketing/` | Directly matches 2026 agency buyer due-diligence questions without inflating thin pages | P1 | Low (`1–2 hrs` copy) | FAQ richness + GSC impressions on `seo services company india` |
| 8. Review `<title>` truncation (`> 65` chars) across 30+ legacy telecom/resource/industry pages in batched editorial pass | Legacy telecom/industry/compare/resource routes (`crawl_seo_69.json` `long_titles_gt65`) | Many legacy titles hit `70–88` chars after appending `| Hanva Technologies`, risking SERP truncation | P1 | Medium (`3–4 hrs`) | Post-update crawl confirms commercial titles `<= 60` chars |
| 9. Link verified client directories (`SoftwareSuggest`, `Capterra India`, `G2`, verified Google Business Profile for Bengaluru HQ only) | External brand profiles → `/products/crm/`, `/products/salon-software/`, `/products/restaurant-pos/` | Captures directory referral traffic noted in SERP observations (`PHASE_16_COMPETITOR_ANALYSIS.md`) without fabricating fake local offices | P1 | Medium (Owner business ops) | GA4 `referral` traffic & directory profile citations |

---

## Stage 3 — Days 61–90: Performance & Funnel Optimization

| Action | Target URL(s) | Reason & Supporting Evidence | Priority | Effort | Measurement Method |
|---|---|---|---|---|---|
| 10. Audit first 60-day GSC queries ranked Positions `5–20` or with CTR `< 1.5%` | Query-matched landing URLs | Identify real user language gaps vs initial Phase 16 keyword hypotheses (`SEARCH_PERFORMANCE_ANALYSIS.md`) | P0 | Medium (`4 hrs` analysis + updates) | GSC CTR delta & impression-to-click movement per updated URL |
| 11. Compare Product-wise Organic Landing Sessions vs `whatsapp_click` Intent Rate (`Hanva CRM` vs `Salon Software` vs `Restaurant POS`) | `/products/crm/`, `/products/salon-software/`, `/products/restaurant-pos/` | Distinguish top-of-funnel organic attraction from WhatsApp CTA conversion efficiency (`ANALYTICS_AND_LEAD_ATTRIBUTION_REPORT.md`) | P0 | Low (`1–2 hrs`) | `whatsapp_click(product) / product_view(product)` in GA4 Explorations |
| 12. Evaluate whether high-intent buyer guides drive assisted conversions to SaaS product pages | `/resources/*-guide/` | Verify `select_item` / internal click paths from guides (`salon-management-software-guide`, `restaurant-pos-kot-inventory-guide`, `crm-with-ivr-vs-telecalling-crm`) into `/products/*` | P1 | Low (`1–2 hrs`) | GA4 Path Exploration guide → product → `whatsapp_click` |
| 13. Plan Stage 2 authorized city/vertical expansions **only** if GSC demand & actual operational delivery justify them | Deferred international / Tier-2 candidates | Prevents speculative thin content until live data validates ROI (`PHASE_16_SEO_PRIORITY_MATRIX.md`) | P2 | Planning only | Documented demand threshold in GSC export before Phase 21 scoping |
