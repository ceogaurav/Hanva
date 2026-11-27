# Phase 20 — Google Search Console Access & Property Report

**Preferred Canonical Property:** `https://www.hanva.in/` (URL-prefix property) and `sc-domain:hanva.in` (Domain property).  
**Official Documentation Consulted:** Google Search Console Help (`https://support.google.com/webmasters/`), Search Console API & Webmaster Tools (`https://developers.google.com/webmaster-tools`), Search Analytics Query Reference (`https://developers.google.com/webmaster-tools/v1/searchanalytics/query`).

---

## 1. Access Verification Outcome: **BLOCKED (No Account Credentials Available)**
- Inspected local plugins, environment variables, HTML `<meta name="google-site-verification">` tags, and `public/` assets:
  - No Search Console OAuth token, Google Workspace/Search Console account, or verification meta tag is connected in this session.
  - No Search Console performance exports, Coverage/Indexing reports, or CrUX Core Web Vitals field reports exist in the repository.
- Per Phase 20 governance rules, **account-level Search Console verification and reporting remain explicitly BLOCKED**. Zero search metrics or indexing states have been fabricated.

---

## 2. Public & Technical Prerequisites Verified Live (`https://www.hanva.in`)
While Search Console UI/API access is blocked, all technical prerequisites required for clean GSC ingestion are verified live (`c5ec9928093c78bb7f87a1e4d5957bb91f2120e3`):
- **Apex-to-WWW Canonical Redirect:** `https://hanva.in/` → `HTTP/2 308` → `https://www.hanva.in/` (`HTTP/2 200`).
- **Robots.txt:** `https://www.hanva.in/robots.txt` (`HTTP/2 200`, declares `Sitemap: https://www.hanva.in/sitemap.xml`).
- **XML Sitemap:** `https://www.hanva.in/sitemap.xml` (`HTTP/2 200`, `69` `https://www.hanva.in/...` URLs; all `69 / 69` return `HTTP/2 200`).

---

## 3. Exact Owner Setup Checklist to Unblock Live Search Console Data
1. Sign in to Google Search Console (`https://search.google.com/search-console`) using Hanva Technologies' corporate Google account (do **not** share passwords).
2. Add and verify **Domain property `hanva.in`** via DNS TXT record (covers apex + `www`), **and** verify primary **URL-prefix property `https://www.hanva.in/`** (via DNS TXT or HTML verification meta tag in `app/layout.tsx` metadata `verification.google`).
3. Inside `https://www.hanva.in/`, go to **Sitemaps** and submit `https://www.hanva.in/sitemap.xml`.
4. Check **Indexing → Pages** to confirm valid indexed count vs `"Crawled - currently not indexed"` or `"Discovered - currently not indexed"`, ensuring apex URLs redirect cleanly rather than competing.
5. Check **Experience → Core Web Vitals** and **Security & Manual Actions** once Google accrues sufficient field traffic.
6. Export **Performance → Search results** (`Last 28 days`, `Previous 28 days`, `Last 3 months`) and **Indexing → Pages** CSVs so post-Phase 20 review can replace the `Unavailable` cells in `PAGE_LEVEL_SEO_PERFORMANCE.csv` and `URL_INSPECTION_REPORT.csv`.
