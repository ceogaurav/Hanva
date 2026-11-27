# WEBSITE REGRESSION REPORT

**Phase:** 23 (Stage E Regression Verification)  
**Target:** `http://127.0.0.1:3001` (Production Next.js `16.4.6` Build of `/Users/apple/Downloads/HANVA`)  
**Typecheck/Lint/Build Log:** `docs/phase23/evidence/hanva_build_lint_typecheck.log`  
**Regression Run Evidence:** `docs/phase23/evidence/phase23_verification_results.json`

---

## 1. Static Verification Results

1. **TypeScript (`pnpm exec tsc --noEmit`):** Exit code `0` (`0` errors across all routes and `lib/leads/*`).
2. **ESLint (`pnpm lint`):** Exit code `0` (`0` errors; `0` warnings in Phase 23 `lib/leads/*` and `app/api/leads/route.ts`; pre-existing unused-import warnings untouched in legacy content files).
3. **Production Build (`pnpm build`):** Exit code `0`. Built `86` entries (`/` .. `/solutions/sales-automation/` static + `ƒ /api/leads` dynamic route).

---

## 2. Live HTTP & SEO Regression Results

| Verification Check | Outcome | Observed Evidence |
| --- | --- | --- |
| **Sitemap Routes Crawl** | `PASS` | `79 / 79` URLs in `/sitemap.xml` returned HTTP `200`, valid self-referencing `<link rel="canonical">`, and `wa.me/918423711043` |
| **API Exclusion From Crawling/Indexing** | `PASS` | `/robots.txt` returned HTTP `200` with `Disallow: /api/`; zero `/api/` URLs inside `/sitemap.xml` |
| **WhatsApp & Contact Coexistence (`/company/contact/`)** | `PASS` | HTTP `200`; `Hanva CRM`, `Hanva Salon Software`, `Hanva Restaurant POS`, `https://wa.me/918423711043`, and truthful non-storage notice (`"without server storage"`) preserved intact |
| **Zero Secret Exposure in Client Chunks** | `PASS` | `18 / 18` JS files in `.next/static/` contain zero server-side token or CRM secret references |
