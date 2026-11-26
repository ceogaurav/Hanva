# Phase 18 — SEO and Route Regression Report

Verified against the rebuilt `Next.js 16.4.6` + `React 19.3.1` production server (`http://localhost:3001`) in `docs/phase18/evidence/qa_phase18.json`.

## 1. Route & Sitemap Preservation
- **Canonical Routes Tested (`GET` HTTP `200`):** `69 / 69` (`route_http_failures: []`).
  - Preserves all 65 core/product/marketing/software-dev/solution/industry/location/compare/company/resource routes plus all 4 Phase 17 buyer guides.
- **XML Sitemap (`/sitemap.xml`):**
  - HTTP `200`, exact URL count: **`69`** (`sitemap_count: 69`).
  - Canonical host compliance: `sitemap_www: true` (100% `https://www.hanva.in/...`).
  - Missing expected routes: **`[]`** (`0` missing).
- **Robots Directive (`/robots.txt`):** HTTP `200`, `Sitemap: https://www.hanva.in/sitemap.xml`.
- **Legacy Permanent Redirects (`next.config.mjs`):** Spot-checked `/contact/` → `/company/contact/`, `/services/` → `/products/`, `/about/` → `/company/about/` (`redirects_ok: true`).

## 2. On-Page SEO, Canonicals, Schema & Conversion Integrity (All 69 Pages)
- **Canonical Links (`<link rel="canonical">`):** `100%` (`69 / 69`) resolve to `https://www.hanva.in/...` (`all_canonicals_www: true`).
- **Indexability (`meta[name="robots"]`):** `any_noindex: false` (`0` accidental `noindex` directives).
- **Open Graph & Meta Descriptions:** Present across all 69 routes.
- **Structured Data (`application/ld+json`):** Valid JSON-LD across all 69 routes (`any_invalid_schema: false`).
- **Internal Links:** `69` unique internal `href` targets discovered and checked (`internal_links_broken: []`).
- **WhatsApp CTAs:** `227` WhatsApp anchor instances scanned across all 69 pages; `100%` use `https://wa.me/918423711043` (`whatsapp_links_invalid: []`).

## 3. Production Domain Note
Apex-to-www (`https://hanva.in` → `HTTP/2 308` → `https://www.hanva.in/` `HTTP/2 200`) remains handled by live Vercel edge configuration (unaudited locally because host DNS redirects live traffic; verified pre-upgrade in Phase 17.1 and unchanged per Phase 18 change control).
