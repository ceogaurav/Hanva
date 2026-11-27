# HANVA TECHNOLOGIES — BUSINESS GROWTH DASHBOARD SPECIFICATION
## Executive Acquisition KPI Dashboard, Product Funnels & Regional Performance

**Company:** Hanva Technologies  
**Website:** https://www.hanva.in  
**Phase:** 26  
**Audience:** Executive Leadership & Sales Engineering Desk  
**Date:** November 2026

---

## 1. Executive Purpose

With Phase 26 transforming the Hanva website into an active customer acquisition engine, management requires a unified measurement framework to track lead velocity, product interest distribution, geographic demand, and conversion channel efficiency without relying on vanity pageview metrics.

This specification outlines the **Business Growth Dashboard** architecture, defining the core KPIs, pipeline stages, attribution rules, and reporting views.

---

## 2. Executive KPI Framework

The dashboard is structured around 4 primary performance quadrants:

```
┌───────────────────────────────────────┬───────────────────────────────────────┐
│ QUADRANT 1: Inbound Acquisition       │ QUADRANT 2: Product Engagement        │
│ • Total Monthly Unique Visitors (TMU) │ • Demo Simulation Start Rate (SSR)    │
│ • Organic Commercial Intent Traffic   │ • Demo Simulation Completion Rate     │
│ • Top 10 Commercial Landing Pages     │ • Role & Feature Interaction Depth    │
├───────────────────────────────────────┼───────────────────────────────────────┤
│ QUADRANT 3: Conversion & Handoff      │ QUADRANT 4: Commercial Pipeline       │
│ • WhatsApp Enquiry Handoffs           │ • Verified Inbound Conversations      │
│ • 3-Click Qualifier Completions       │ • Qualified Sales Opportunities (QSO) │
│ • Direct Phone Calls & Emails         │ • Estimated Pipeline Value (ARR)      │
└───────────────────────────────────────┴───────────────────────────────────────┘
```

---

## 3. Core Metric Definitions & Targets

| Metric Name | Tracking Mechanism | Target / Baseline | Business Objective |
| :--- | :--- | :--- | :--- |
| **Commercial Visitor Volume** | GA4 Pageview on `/products/*`, `/services/*`, `/telecom/*` | 5,000+ / mo | Attract high-intent Indian SMB decision-makers. |
| **Demo Explorer Engagement Rate** | `product_demo_interaction` / `product_page_view` | > 35% | Prove that visitors interact actively with simulations. |
| **Fast-Track Qualification Rate** | `lead_qualified` / `/company/contact/` views | > 15% | Accelerate visitor transition into structured enquiries. |
| **WhatsApp Handoff Rate** | `enquiry_handoff` / Total Commercial Visitors | > 4.5% | Generate direct WhatsApp conversations on `+91 8423711043`. |
| **Inbound Conversion Integrity** | Verified Inbound Messages / `enquiry_handoff` | > 65% | Measure how many users actually press "Send" in WhatsApp. |
| **Sales Qualified Rate (SQR)** | QSOs / Total Verified Inbound Conversations | > 40% | Ensure lead traffic aligns with Hanva's product capabilities. |

---

## 4. Product Category Demand Distribution View

The dashboard tracks commercial intent distribution across Hanva's 4 core operational pillars:

```
┌─────────────────────────────────────────────────────────────┐
│ PRODUCT DEMAND ALLOCATION                                   │
├─────────────────────────────────────────────────────────────┤
│ 1. Hanva CRM Platform               ████████████ (38%)      │
│ 2. Hanva Restaurant POS             ████████     (26%)      │
│ 3. Hanva Salon Software             ██████       (20%)      │
│ 4. Cloud Telephony & Smart IVR      ████         (16%)      │
└─────────────────────────────────────────────────────────────┘
```

### Breakdown of Tracked Telemetry
- **Hanva CRM:** Lead volume, real estate vs financial services vs retail telecalling, agent seat size brackets (1-5, 6-15, 16-50, 50+).
- **Hanva Restaurant POS:** Outlet types (Cafe, Dine-In, QSR, Cloud Kitchen), table counts, offline resilience concerns, KDS inquiries.
- **Hanva Salon Software:** Single-outlet vs chain inquiries, stylist counts, inventory auto-consumption questions, GST SAC 9997 billing interest.
- **Telecom & Cloud PBX:** Smart IVR vs Auto-Dialer vs 1800 Toll-Free inquiries, concurrent channel requirements.

---

## 5. Regional Geographic Demand Telemetry

Attribution tracks geographic origin across Indian commercial metros based on landing page interactions (`/locations/*`) and network location headers:

1. **Bengaluru Urban (HQ Zone):** Highest concentration of early-stage SaaS adopters, tech startups, boutique salons, and specialty cafes.
2. **Mumbai & MMR:** Dominated by financial services telecalling CRM, real estate brokerages, and luxury salon chains.
3. **Delhi-NCR (Gurugram, Noida, Delhi):** High outbound BPO telecalling volume, cloud kitchens, and franchise restaurants.
4. **Hyderabad (Cyberabad Corridor):** Strong demand for enterprise CRM development and cloud PBX infrastructure.
5. **Pune & Chennai:** Growing demand for automotive/manufacturing lead management and mid-market ERP/CRM customization.

---

## 6. Attribution & CRM Integration Roadmap

Currently, attribution operates safely on the client side:
- URL parameters (`product`, `plan`, `city`, `calcSeats`) are parsed locally to pre-populate WhatsApp text.
- Form data is formatted locally in the browser with zero server storage.

### Staging CRM Integration (Phase 27+ Roadmap)
Once Phase 23.2 / 24 backend security reviews are formally approved:
1. Inbound website submissions will post to an authenticated `/api/v1/leads/` route on the reconciled CRM staging instance.
2. Leads will carry clean UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`).
3. Hanva CRM will automatically tag lead records with `source: "website_demo_qualifier"` and assign them to senior sales engineers based on product category.
