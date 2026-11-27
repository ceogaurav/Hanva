# HANVA TECHNOLOGIES — CAMPAIGN LANDING PAGE REPORT
## Conversion-Focused Landing Page Architecture, Section Hierarchy & Zero-Duplication Policy

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 27  
**Date:** November 2026

---

## 1. Landing Page Architecture Strategy

A common paid advertising pitfall is sending search traffic to a broad, generic homepage or, conversely, generating dozens of low-quality duplicate landing pages that dilute SEO authority.

**Hanva Technologies enforces a strict Canonical Alignment & Zero-Duplication Policy:**
1. **Existing High-Authority Pages as Campaign Destinations:** Instead of creating disposable duplicate URLs, Hanva directs Google Ads traffic directly to our core flagship product routes and service pillars.
2. **Dynamic Contextual Adaptation:** The pages dynamically read inbound UTM parameters (via `lib/utm.ts` and `resolveRouteContext()`) to adapt WhatsApp CTA prefilled messages without altering canonical URLs or indexing signals.
3. **Single Operational Problem Focus:** Every landing page is structured to address the specific operational pain point of the searching persona.

---

## 2. Core Campaign Landing Page Alignment Matrix

| Campaign / Product | Target Canonical URL | Primary Pain Point Addressed | Key Interactive Conversion Asset | Primary WhatsApp Action |
| :--- | :--- | :--- | :--- | :--- |
| **Campaign A: Hanva CRM** | `/products/crm/` | Disconnected calling, lost spreadsheet leads | `<CrmWorkflowExplorer />` (6 stages, audio scrub) | `Request Demo on WhatsApp` (`EXP-22C`) |
| **Campaign B: Salon POS** | `/products/salon-software/` | Weekend front-desk chaos, staff commission disputes | `<SalonWorkflowExplorer />` (6 stages, SAC 9997) | `Request Salon Demo on WhatsApp` |
| **Campaign C: Restaurant POS** | `/products/restaurant-pos/` | POS freezes during Wi-Fi drops, lost KOT tickets | `<RestaurantPosExplorer />` (Wi-Fi drop test, KDS) | `Request Restaurant Demo on WA` |
| **Campaign D: Digital Mktg** | `/services/digital-marketing/` | High ad spend with unverified lead attribution | Contextual Case Frameworks & ROI Audits | `Discuss Marketing Strategy on WA` |
| **Campaign E: Software Dev** | `/software-development/` | Off-the-shelf software failing custom workflows | Technical Stack & Architecture Comparison | `Schedule Architecture Call on WA` |
| **Fast-Track Multi-Solution** | `/company/contact/` | High-intent buyers wanting immediate 3-click routing | `<LeadQualifier />` (3-step instant selector) | `Prepare & Continue to WhatsApp` |

---

## 3. The 10 Essential Conversion Sections for Campaign Landing Pages

Every campaign landing page implements an evidence-based conversion hierarchy:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Contextual Category Badge & Breadcrumb Navigation        │
├─────────────────────────────────────────────────────────────┤
│ 2. High-Clarity Value Proposition Hero & Dual CTA Buttons   │
├─────────────────────────────────────────────────────────────┤
│ 3. Hero Visual Container (Demonstration Slot / Overview)    │
├─────────────────────────────────────────────────────────────┤
│ 4. Operational Problem vs Hanva Solution (Side-by-Side)     │
├─────────────────────────────────────────────────────────────┤
│ 5. 6 Verified Core Capabilities (Grounded in Real Codebase) │
├─────────────────────────────────────────────────────────────┤
│ 6. Hands-On Interactive Educational Simulation Engine       │
├─────────────────────────────────────────────────────────────┤
│ 7. 3 Modular Operational Storytelling Bands                 │
├─────────────────────────────────────────────────────────────┤
│ 8. Persona-Specific Benefits (Owner, Manager, Staff, IT)    │
├─────────────────────────────────────────────────────────────┤
│ 9. Frequently Asked Questions (Accordion + FAQPage Schema)  │
├─────────────────────────────────────────────────────────────┤
│ 10. Bottom Conversion Reversal Band (Direct WhatsApp Desk)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Inbound UTM Attribution & Contextual Preservations

When a paid click arrives from Google Ads with standard UTM parameters:
```
https://www.hanva.in/products/crm/?utm_source=google&utm_medium=cpc&utm_campaign=crm_india_search&utm_content=telecalling_c2c_ad01
```

### The Inbound Journey Mechanics:
1. **Consent-Aware Session Staging:** `components/analytics/analytics-provider.tsx` and `lib/utm.ts` detect query parameters and stage attribution in memory without storing PII.
2. **Contextual WhatsApp Interpolation:**
   - When the visitor clicks the primary WhatsApp CTA, the link builder invokes `buildSaasDemoWhatsAppUrl("crm", "Google")`.
   - The generated WhatsApp text is contextualized:
     ```text
     I'm interested in a demo of Hanva CRM. I found you through Google.
     ```
3. **Telemetry Tracking:** `lib/analytics.ts` fires `enquiry_handoff` with categorical parameters (`product_name: "hanva_crm"`, `traffic_channel: "paid_search"`, `utm_campaign: "crm_india_search"`).
4. **Zero URL Bloat:** The canonical tag remains clean (`<link rel="canonical" href="https://www.hanva.in/products/crm/" />`), preventing duplicate indexation in Google Search.

---

## 5. Mobile Speed & Core Web Vitals Optimization

Paid search conversion on mobile depends heavily on rapid initial page rendering:
- **Zero Third-Party Marketing Bloat:** No external live chat widgets or heavy analytics scripts in the critical render path.
- **Turbopack Build Optimization:** Next.js static HTML prerender ensures sub-800ms First Contentful Paint (FCP) over 4G connections.
- **Zero CLS (Cumulative Layout Shift):** All visual containers and interactive simulation modules maintain fixed aspect-ratio placeholders and reserved CSS heights.
