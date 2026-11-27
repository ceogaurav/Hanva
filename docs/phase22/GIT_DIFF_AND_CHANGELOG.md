# GIT DIFF AND CHANGELOG — PHASE 22

**Repository Root:** `/Users/apple/Downloads/HANVA`  
**Branch:** `main`  
**Base Commit (`HEAD`):** `c5ec9928093c78bb7f87a1e4d5957bb91f2120e3`  
**Pre-Phase 22 Preserved Baseline:** `docs/phase22/evidence/git_baseline_status.txt` & `git_pre_phase22_diff.patch` (`13` Phase 20 files + `10` new / `12` modified Phase 21 files).

---

## 1. Files Modified Exclusively in Phase 22 (`16` Live Source / Config Files)

| File | Category | Summary of Phase 22 Changes |
|---|---|---|
| `lib/config.ts` | Routing & WhatsApp Resolver | Added `resolveRouteContext(pathname)` mapping CRM, Salon, Restaurant POS, DM, Software Dev, and Telecom routes to exact required WhatsApp demo/service URLs and `?product=<slug>` contact links; made `buildWhatsAppContactUrl()` dynamically state selected product and accept optional email gracefully. |
| `lib/analytics.ts` | Phase 19 + 22 Telemetry | Added Section 12 events (`cta_view`, `cta_click`, `pricing_view`, `product_comparison_view`), per-route `cta_view` deduplication, `experiment_id`/`variant_id` fields cleanly gated by `hanva_analytics_consent`, and fixed `inferSubjectFromContext` for `cloud-kitchen`, `ivr-crm`, `lead-management`, `cost-factors`, `google-ads`. |
| `components/analytics/tracked-links.tsx` | Telemetry Components | Updated `TrackedWhatsAppLink` & `TrackedDemoLink` to emit non-PII `cta_click` with optional experiment metadata; exported `TrackedCtaObserver` (`IntersectionObserver` for `cta_view`). |
| `components/analytics/consent-banner.tsx` | Mobile Consent UX | Slimmed mobile bottom banner footprint (`bottom-[68px]`, `p-3`, compact text) so hero CTAs & form inputs on `375px` mobile remain cleanly accessible before consent interaction. |
| `components/layout/header.tsx` | Navigation CTA | Header `"Request Demo"` button uses `resolveRouteContext(pathname).contactHref` (`?product=...`) and records product context on `demo_cta_click` + `cta_click`. |
| `components/layout/mobile-action-bar.tsx` | Mobile Sticky Bar | Fixed mobile `"WhatsApp"` CTA to emit exact product-specific strings (`Hanva CRM`, `Hanva Salon Software`, `Hanva Restaurant POS`) instead of generic path notices; `"Request Demo"` carries `?product=<slug>`; changed Contact page 3rd slot from telecom `"Calculator"` to `"Products"` (`/products/`). |
| `app/page.tsx` | Homepage CRO | Elevated `"Enquire on WhatsApp"` prominently inside Hero CTA band alongside `"Explore SaaS Products"` & `"Request Consultation"`, added clickable SaaS/Service quick pills, verified legal HQ/pricing footer note, `TrackedCtaObserver`, and direct DM/Dev WhatsApp links in Services discovery. |
| `app/products/crm/page.tsx` | CRM Page CRO | Added `<TrackedCtaObserver>`, experiment metadata on Hero CTA, and `"What Is Included vs Important Scope Boundaries"` card block (explicitly excluding bulk email/SMS blasts, live wallboard, SaaS billing, and SIM trunk audio). |
| `app/products/salon-software/page.tsx` | Salon Page CRO | Added `<TrackedCtaObserver>`, experiment metadata, and `"Included for Single-Outlet Salons vs Important Scope Boundaries"` card block (explicitly excluding multi-branch switching, Razorpay, and SMS gateway). |
| `app/products/restaurant-pos/page.tsx` | POS Page CRO | Added `<TrackedCtaObserver>`, experiment metadata, and `"What Is Included vs Important Scope Clarifications"` card block (explicitly clarifying no native Swiggy/Zomato connectors, multi-tender split payments vs no 1-order split bills, and thermal bridge verification). |
| `app/company/contact/page.tsx` | Contact Form CRO | Expanded `PRODUCT_OPTION_MAP` and grouped `<select>` to include `Hanva CRM`, `Hanva Salon Software`, `Hanva Restaurant POS`, `Digital Marketing Services`, and `Custom Software, CRM/ERP & AI`; generalized hero H1/subtitle & business scale options; made `Business Email` optional for WhatsApp-first enquiries (preserving validation if filled & Email fallback). |
| `components/shared/service-layout.tsx` | Service Pages CRO | Passed contextual `routeCtx.contactHref` (`?product=digital-marketing` / `software-development`) on `"Schedule Discovery Call"`, `<TrackedCtaObserver>` on Hero, and explicit `productName` tracking. |
| `app/digital-marketing/page.tsx` | Service Hub CRO | Passed `?product=digital-marketing` on `"Request Campaign Consultation"`. |
| `app/software-development/page.tsx` | Service Hub CRO | Passed `?product=software-development` on `"Request Technical Scoping"`. |
| `components/shared/article-layout.tsx` | Guide-to-Product CRO | Passed `routeCtx.contactHref` to bottom `"Contact Form"`, explicit `productName` to `TrackedWhatsAppLink`, `<TrackedCtaObserver>`, and replaced non-telephony bottom `"Pulse Savings Calculator"` with the contextual Pillar link (`summarySecondaryLink`). |
| `tsconfig.json` | Build Integrity | Added `"docs"` to `"exclude"` alongside `"preview"` and `"node_modules"` so archival snapshot files in `docs/phase*/evidence/` never trigger duplicate TypeScript global collisions. |

---

## 2. Verification of Scope Restraint
- Zero changes to `package.json`, `pnpm-lock.yaml`, `next.config.mjs`, or any security/dependency configuration.
- Zero existing sitemap routes removed (`79 / 79` preserved cleanly).
- Zero production deployments or external database/CRM connections introduced.
