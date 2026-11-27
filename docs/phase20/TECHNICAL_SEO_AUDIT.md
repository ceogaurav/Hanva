# Phase 20 — Technical SEO Audit

Verified against both live production (`https://www.hanva.in`, `commit c5ec9928093c78bb7f87a1e4d5957bb91f2120e3`) and the rebuilt local production server (`http://localhost:3001`, `Next.js 16.4.6`) via `docs/phase20/evidence/crawl_seo_phase20.py` (`docs/phase20/evidence/seo_crawl_69.json`).

## 1. Technical Crawl Audit Summary (`69` Sitemap URLs)

| Check | Before Phase 20 (`seo_crawl_69_before.json`) | After Phase 20 (`seo_crawl_69.json`) | Status |
|---|---|---|---|
| **Live Sitemap URL Count (`/sitemap.xml`)** | `69` (`all_www: true`) | `69` (`all_www: true`) | **PASS** |
| **Live Production HTTP Status (`https://www.hanva.in`)** | `69 / 69` HTTP `200` | `69 / 69` HTTP `200` | **PASS** |
| **Apex-to-WWW Redirect (`https://hanva.in/`)** | `HTTP/2 308 -> https://www.hanva.in/` | Preserved | **PASS** |
| **`robots.txt` Validation** | `Allow: /`, `Disallow: /api/`, `Sitemap: https://www.hanva.in/sitemap.xml` | Exact match | **PASS** |
| **Exact Canonical URLs (`https://www.hanva.in/...`)** | `69 / 69` (`0` non-exact, `0` duplicates) | `69 / 69` (`0` non-exact) | **PASS** |
| **Unintentional `noindex` Directives** | `0` | `0` | **PASS** |
| **Duplicate `<title>` Tags** | `0` | `0` | **PASS** |
| **Duplicate Meta Descriptions** | `0` | `0` | **PASS** |
| **Over-Length Meta Descriptions (`> 165` chars)** | `20` routes (`/` = `237` chars) | `14` routes (`/` + 5 top commercial pillars reduced cleanly `< 160` chars) | **IMPROVED** (14 legacy guides/services remain in backlog `CONTENT_IMPROVEMENT_BACKLOG.csv`) |
| **Rendered Titles `> 65` Chars** | `37` routes (`66–90` chars incl. brand suffix) | `37` routes (documented in `TITLE-01` backlog) | **MONITORED** (awaiting GSC CTR data before rewriting) |
| **Single `<h1>` Structure** | `69 / 69` exact `h1_count = 1` | `69 / 69` exact `h1_count = 1` | **PASS** |
| **Missing Image `alt` Attributes** | `0` | `0` | **PASS** |
| **Missing Open Graph `og:image` Tags** | `6` legacy guides missing `og:image` | **`0`** (`missing_og_pages: []`) | **FIXED** (`69 / 69` complete OG coverage) |
| **JSON-LD Structured Data Validation** | `69 / 69` valid | `69 / 69` valid | **PASS** |
| **Broken Internal Links** | `0` (`broken_internal_links: []`) | `0` (`broken_internal_links: []`) | **PASS** |
| **Complete Orphan Pages (`0` incoming links)** | `0` (`orphans_zero_inlinks_anywhere: []`) | `0` (`orphans_zero_inlinks_anywhere: []`) | **PASS** |
| **Footer-Only Pages (`body_in_links_count = 0`)** | `7` (`/compare/*-alternative/` x3 + `/company/{about,careers,security-and-trust,terms-of-service}/`) | `7` (prioritized in `LINK-01` backlog for `/compare/*`) | **DOCUMENTED** |
| **Mobile Rendering & Security Headers** | Enforced CSP, HSTS, `nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin` | Verified intact | **PASS** |
