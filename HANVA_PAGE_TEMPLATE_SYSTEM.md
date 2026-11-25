# HANVA TECHNOLOGIES — PAGE TEMPLATE SYSTEM
## Modular Architectural Templates, Conditional Slot Matrix & Performance Engineering

**Document ID:** `HANVA-TEMPLATES-v1.1`  
**Phase:** 1.1 — Cross-Document Audit, Corrections & Governance  
**Date:** November 24, 2026  
**Status:** Approved for Implementation  
**SEO & Web Vitals Policy:** Aligned with Google Search Central Core Web Vitals & Field Metrics (p75)  

---

## 1. TEMPLATE TAXONOMY & MODULARITY

To ensure consistency, rapid engineering velocity, and strict Core Web Vitals compliance without imposing cookie-cutter monotony, all 33 routes are derived from **7 specialized architectural page templates**:

```
+---------------------------------------------------------------------------------------------------------+
| HANVA TEMPLATE TAXONOMY                                                                                 |
+-------------------+----------------------------+-----------------------+--------------------------------+
| Template ID       | Template Name              | Applicable Routes     | Key Interactive Mechanism      |
+-------------------+----------------------------+-----------------------+--------------------------------+
| `TPL-HOME`        | Enterprise Flagship Home   | `/`                   | Live Call-Flow & CRM Simulator |
| `TPL-PRODUCT`     | Product Feature Deep-Dive  | `/products/*`         | Interactive Feature Console    |
| `TPL-SOLUTION`    | Industry / Solution Hub    | `/industry/*`, `/solutions/*` | Workflow Vector Diagram|
| `TPL-PRICING`     | Interactive Pricing Hub    | `/pricing/`, `/pricing/calculator/` | Dynamic Slider Engine|
| `TPL-COMPARE`     | Competitor Comparison      | `/compare/*`          | Parity Matrix & Cost Delta     |
| `TPL-RESOURCE`    | Documentation / Guide      | `/resources/*`        | Dynamic Table of Contents      |
| `TPL-LEGAL`       | Corporate / Legal / Trust  | `/company/*`          | Clean Typography Reading Bed   |
+-------------------+----------------------------+-----------------------+--------------------------------+
```

---

## 2. CONDITIONAL SLOT COMPOSITION MATRIX

Rather than forcing every page to render an identical 11-section stack, content slots are **strictly optional and conditional** based on page intent:

```
+---------------------------------------------------------------------------------------------------------------+
| CONDITIONAL SLOT MATRIX ACROSS PAGE TEMPLATES                                                                 |
+----------------------------------+----------+-------------+--------------+-------------+------------+---------+
| Slot ID & Description            | TPL-HOME | TPL-PRODUCT | TPL-SOLUTION | TPL-PRICING | TPL-COMPARE|TPL-LEGAL|
+----------------------------------+----------+-------------+--------------+-------------+------------+---------+
| SLOT 01: Persistent Header       | REQUIRED | REQUIRED    | REQUIRED     | REQUIRED    | REQUIRED   | REQUIRED|
| SLOT 02: Breadcrumb Navigation   | HIDDEN   | REQUIRED    | REQUIRED     | REQUIRED    | REQUIRED   | REQUIRED|
| SLOT 03: Hero Stage (Variant A/B)| REQUIRED | REQUIRED    | REQUIRED     | REQUIRED    | REQUIRED   | MINIMAL |
| SLOT 04: Compliance & Trust Bar  | REQUIRED | OPTIONAL    | OPTIONAL     | REQUIRED    | OPTIONAL   | HIDDEN  |
| SLOT 05: Primary Value Pillars   | REQUIRED | REQUIRED    | REQUIRED     | HIDDEN      | HIDDEN     | HIDDEN  |
| SLOT 06: Product Sandbox Widget  | REQUIRED | REQUIRED    | OPTIONAL     | REQUIRED    | HIDDEN     | HIDDEN  |
| SLOT 07: Architecture / Workflow | REQUIRED | REQUIRED    | REQUIRED     | HIDDEN      | REQUIRED   | HIDDEN  |
| SLOT 08: Verified Case Evidence  | CONDIT.* | CONDIT.*    | CONDIT.*     | HIDDEN      | HIDDEN     | HIDDEN  |
| SLOT 09: FAQ Accordions (AEO)    | REQUIRED | OPTIONAL    | OPTIONAL     | REQUIRED    | OPTIONAL   | HIDDEN  |
| SLOT 10: Sticky CTA / Conversion | REQUIRED | REQUIRED    | REQUIRED     | REQUIRED    | REQUIRED   | OPTIONAL|
| SLOT 11: Enterprise Footer       | REQUIRED | REQUIRED    | REQUIRED     | REQUIRED    | REQUIRED   | REQUIRED|
+----------------------------------+----------+-------------+--------------+-------------+------------+---------+
*Slot 08 (Case Evidence) renders ONLY when verified, signed-off customer evidence is available.
```

---

## 3. TEMPLATE-SPECIFIC ARCHITECTURAL EXPERIENCES

1. **`TPL-PRODUCT` (Product Pages):** Features an interactive console specific to the product (e.g. Visual Tree preview for IVR; dialer keypad for Auto-Dialer; deal card pipeline for CRM). Eliminates generic marketing filler in favor of deep technical documentation and API triggers.
2. **`TPL-SOLUTION` (Industry Solutions):** Features domain-specific workflow schematics (e.g., real estate lead ingestion from property portals; clinic appointment reminders; educational inquiry routing).
3. **`TPL-PRICING` (Pricing & Calculator):** Maximizes commercial clarity. Contains the proposed tier table, interactive minute/seat slider calculator, explicit pulse rounding explanations, billable call leg breakdowns, and statutory 18% GST line items.
4. **`TPL-COMPARE` (Alternative Pages):** Renders transparent, objective comparison tables mapping feature parity, pricing models (flat subscription vs. double-leg credit deductions), and user seat minimums against specific competitors (Exotel, Knowlarity, TeleCMI).
5. **`TPL-LEGAL` (Governance & Policy):** A focused, distraction-free reading bed featuring clear typographic hierarchy, table of contents navigation, and statutory compliance disclosures (DPDP Act, Indian IT Act, TRAI DLT Guidelines).

---

## 4. STRUCTURED DATA (SCHEMA.ORG) SPECIFICATIONS

Each template automatically injects valid JSON-LD metadata into `<head>`:
- **Global:** `Organization` and `WebSite` schemas present across all pages.
- **Telecom Services (`TPL-PRODUCT`):** Standard `Schema.org/Service` markup specifying `serviceType`, `provider`, and `areaServed` (India).
- **Software Tools:** `SoftwareApplication` markup for CRM and softphone web applications.
- **Pricing Hub (`TPL-PRICING`):** `PriceSpecification` markup defining proposed currency (`INR`) and billing intervals.
- **Resource Guides (`TPL-RESOURCE`):** `Article` markup with author entity attribution.
- **FAQ Sections:** `FAQPage` schema included for semantic parsing and AEO/GEO indexing *(Note: Google rich result snippets are not guaranteed for commercial sites).*

---

## 5. PERFORMANCE ENGINEERING & REAL-USER CORE WEB VITALS (CrUX)

Hanva establishes two distinct performance benchmarks: **Internal Laboratory Targets** (Lighthouse synthetic) and **Real-User Field Metrics** (measured at the 75th percentile of real users, as evaluated by Google CrUX).

```
+---------------------------------------------------------------------------------------------------------+
| REAL-USER CORE WEB VITALS (CrUX p75) & LAB BUDGETS                                                      |
+------------------------------------+--------------------------+-----------------------------------------+
| Metric                             | Internal Lab Budget      | Real-User Field Target (CrUX p75)       |
+------------------------------------+--------------------------+-----------------------------------------+
| Largest Contentful Paint (LCP)     | < 1.00s                  | < 1.80s (Good threshold: 2.50s)         |
| First Contentful Paint (FCP)       | < 0.60s                  | < 1.20s (Good threshold: 1.80s)         |
| Interaction to Next Paint (INP)    | < 40ms                   | < 100ms (Good threshold: 200ms)         |
| Cumulative Layout Shift (CLS)      | 0.000                    | < 0.050 (Good threshold: 0.100)         |
| Total Page Weight (Compressed)     | < 250 KB                 | Network Adaptive Delivery               |
| Third-Party Script Execution       | 0 ms blocking            | Conditional Dynamic Imports Only        |
+------------------------------------+--------------------------+-----------------------------------------+
```

### Critical Engineering Safeguards
1. **Font Loading Strategy:** Google Fonts (`Plus Jakarta Sans`, `Inter`, `Geist Mono`) are self-hosted in production with `font-display: swap` and preloaded in `<head>` to prevent Flash of Invisible Text (FOIT).
2. **Image Delivery:** Responsive vector SVGs for schematics; all raster imagery delivered in modern AVIF and WebP formats with explicit `width` and `height` attributes to guarantee zero CLS.
3. **Script Containment:** Zero third-party trackers, chatbots, or analytics scripts are loaded in the critical rendering path. GSAP and simulator logic are loaded asynchronously after main thread idle.
