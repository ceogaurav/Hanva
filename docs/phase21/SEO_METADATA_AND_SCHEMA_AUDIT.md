# SEO METADATA AND SCHEMA AUDIT — PHASE 21

**Audit Tooling:** Playwright Chromium against live production build (`http://localhost:3001`)  
**Evidence Log:** `docs/phase21/evidence/phase21_playwright_qa.json` (`task-6584`)

---

## 1. Site-Wide SEO & Canonical Integrity (`79 / 79` Sitemap URLs)

| Site-Wide Audit Check | Observed Result |
|---|---|
| `GET /sitemap.xml` HTTP Status | `200 OK` |
| Sitemap URL Count | `79` (`69` preserved + `10` newly published) |
| Non-`www` URLs (`https://hanva.in`) in Sitemap | `0` (`100%` `https://www.hanva.in/`) |
| Missing Trailing Slashes in Sitemap | `0` (`100%` trailing-slash consistent) |
| Routes Returning HTTP Status `!= 200` | `0` (`79 / 79` returned `200 OK`) |
| Duplicate Page `<title>` Across All 79 Routes | `0` |
| Duplicate Meta Descriptions Across All 79 Routes | `0` |
| Missing OpenGraph `og:image` Across All 79 Routes | `0` |
| Missing `twitter:card` Across All 79 Routes | `0` |
| JSON-LD Parse Errors Across All 79 Routes | `0` |

---

## 2. Per-Article Metadata, Word Count & Structured Data Summary (`10` New Guides)

| Route | Title Len | Desc Len | H1 Count | Word Count | Self-Canonical | JSON-LD Types Rendered |
|---|---|---|---|---|---|---|
| `/resources/ivr-crm-for-businesses/` | `72` | `168` | `1` | `1,468` | `https://www.hanva.in/resources/ivr-crm-for-businesses/` | `Article`, `FAQPage`, `BreadcrumbList` |
| `/resources/lead-management-process-guide/` | `73` | `163` | `1` | `1,373` | `https://www.hanva.in/resources/lead-management-process-guide/` | `Article`, `FAQPage`, `BreadcrumbList` |
| `/resources/salon-billing-software-guide/` | `69` | `160` | `1` | `1,366` | `https://www.hanva.in/resources/salon-billing-software-guide/` | `Article`, `FAQPage`, `BreadcrumbList` |
| `/resources/salon-appointment-management-guide/` | `72` | `159` | `1` | `1,180` | `https://www.hanva.in/resources/salon-appointment-management-guide/` | `Article`, `FAQPage`, `BreadcrumbList` |
| `/resources/restaurant-billing-software-guide/` | `74` | `166` | `1` | `1,335` | `https://www.hanva.in/resources/restaurant-billing-software-guide/` | `Article`, `FAQPage`, `BreadcrumbList` |
| `/resources/cloud-kitchen-management-guide/` | `68` | `170` | `1` | `1,296` | `https://www.hanva.in/resources/cloud-kitchen-management-guide/` | `Article`, `FAQPage`, `BreadcrumbList` |
| `/resources/local-seo-guide-for-businesses/` | `58` | `166` | `1` | `1,292` | `https://www.hanva.in/resources/local-seo-guide-for-businesses/` | `Article`, `FAQPage`, `BreadcrumbList` |
| `/resources/seo-vs-google-ads-for-smbs/` | `69` | `156` | `1` | `1,249` | `https://www.hanva.in/resources/seo-vs-google-ads-for-smbs/` | `Article`, `FAQPage`, `BreadcrumbList` |
| `/resources/custom-crm-development-guide/` | `73` | `155` | `1` | `1,196` | `https://www.hanva.in/resources/custom-crm-development-guide/` | `Article`, `FAQPage`, `BreadcrumbList` |
| `/resources/software-development-cost-factors/` | `73` | `157` | `1` | `1,247` | `https://www.hanva.in/resources/software-development-cost-factors/` | `Article`, `FAQPage`, `BreadcrumbList` |

- Every `Article` schema attributes `"@type": "Organization"` (`"Hanva Engineering & Editorial Board"`), specifies `https://www.hanva.in/og-image.png`, and avoids invented personal names.
- Every guide renders a valid `FAQPage` matching visible accordion questions and answers cleanly.
