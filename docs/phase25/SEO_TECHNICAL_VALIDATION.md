# HANVA TECHNOLOGIES — TECHNICAL SEO & STRUCTURED DATA VALIDATION

**Project:** Hanva Technologies  
**Website:** https://www.hanva.in  
**Phase:** 25  
**Date:** November 2026  
**Status:** Completed & Validated  

---

## 1. Technical SEO Audit Summary

All 87 canonical routes across the Hanva Technologies website were audited and validated against Google Search Essentials and semantic web best practices.

### Key Technical Verification Points:
- **Canonical URLs:** Every page self-references its exact canonical URL with trailing slash matching server configuration.
- **Title Tags:** Unique, keyword-focused titles under 65 characters with brand suffix.
- **Meta Descriptions:** Compelling 140–160 character descriptions highlighting tangible capabilities.
- **OpenGraph & Twitter Cards:** Complete `og:type`, `og:locale`, `og:url`, `og:title`, `og:description`, and `og:image` tags.
- **Crawlability & Indexability:** `robots.txt` explicitly allows search engine crawling; `/sitemap.xml` dynamically generated.

---

## 2. Structured Data Schema Matrix

| Schema Type | Applied Pages | Purpose | Validation Status |
| :--- | :--- | :--- | :--- |
| `Organization` | Homepage (`/`) | Brand identity, legal entity, CIN, GSTIN, address, contact phone & email | Verified Valid |
| `WebSite` | Homepage (`/`) | Publisher entity binding | Verified Valid |
| `SoftwareApplication` | `/products/crm/`, `/products/salon-software/`, `/products/restaurant-pos/` | Application category, OS, capabilities, publisher identity | Verified Valid |
| `Service` | Service pages & Industry verticals (`/industry/*`, `/digital-marketing/*`, `/software-development/*`) | Service name, serviceType, provider, description, areaServed ("IN") | Verified Valid |
| `Article` | All 27 resource guides in `/resources/*` | Headline, description, author (Hanva Editorial Board), publisher, datePublished, dateModified | Verified Valid |
| `BreadcrumbList` | All subpages across products, industries, resources, locations | Position-indexed breadcrumb items with resolved canonical URLs | Verified Valid |
| `FAQPage` | Homepage, product pages, industry pages, resource guides | Question & Answer entities matching visible on-page accordion text | Verified Valid |

*Notice:* Absolutely zero fake `AggregateRating` or fabricated `Review` schemas are present.

---

## 3. XML Sitemap Validation

- **File:** `app/sitemap.ts` (serves `https://www.hanva.in/sitemap.xml`)
- **Total Registered Canonical Routes:** 87 routes
- **Priorities:**
  - Homepage: `1.0` (daily)
  - Pricing & Contact: `0.95` (daily)
  - Core Products & Services: `0.90` (weekly)
  - Solutions & Industry Verticals: `0.85` (weekly)
  - Competitor Comparisons: `0.80` (weekly)
  - Knowledge Hub Guides: `0.75` (monthly)
  - Corporate Governance: `0.70` (monthly)
- **Last Modified Dates:** Updated to `RELEASE_DATE_PHASE25` (2026-11-27) for all new and upgraded routes.
