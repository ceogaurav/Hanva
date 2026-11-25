# HANVA TECHNOLOGIES — NAVIGATION & MEGA-MENU ARCHITECTURE
## Desktop Mega-Menu, Mobile Navigation Drawer & Footer System

**Document ID:** `HANVA-NAV-v1.1`  
**Phase:** 1.1 — Cross-Document Audit, Corrections & Governance  
**Date:** November 24, 2026  
**Status:** Approved for Implementation  
**Route Consistency:** 100% Synchronized with [HANVA_FINAL_SITEMAP.md](file:///Users/apple/Downloads/HANVA/HANVA_FINAL_SITEMAP.md)  

---

## 1. NAVIGATION SYSTEM OVERVIEW

The Hanva navigation framework balances **dense technical capability** with **instant buyer clarity**. It delivers a frictionless pathway for two distinct personas:
1. **The Executive Buyer:** Seeks solutions, transparent pricing, verified case studies, and compliance guarantees.
2. **The Operational Leader / Architect:** Seeks specific features (IVR builders, auto-dialers, CRM integration, API documentation).

---

## 2. DESKTOP HEADER & MEGA-MENU BLUEPRINT

### 2.1 Header Container Specifications
- **Height:** 72px fixed height.
- **Surface:** Glassmorphic enterprise canvas (`background: rgba(255, 255, 255, 0.94); backdrop-filter: blur(12px)` in Light Mode; `background: rgba(11, 15, 25, 0.92)` in Dark Mode).
- **Border:** `1px solid var(--color-border-default)` bottom border.
- **Positioning:** Sticky (`position: sticky; top: 0; z-index: var(--z-sticky-nav)`).
- **Layout:** Flexbox container (`max-width: var(--container-2xl); margin: 0 auto; padding: 0 32px`).

```
+----------------------------------------------------------------------------------------------------------------------------------------+
| [HANVA LOGO]    Products ▾    Solutions ▾    Industries ▾    Resources ▾    Company ▾        [Theme ☀/☾]  [View Pricing]  [Book a Demo]|
+----------------------------------------------------------------------------------------------------------------------------------------+
```

---

### 2.2 Mega-Menu Panels (Detailed Structural Breakdown)

#### A. "Products" Mega-Menu (Reflows from 4 Columns to 2x2 Grid at 1024px–1279px)
- **Container Width:** 960px on wide screens (>= 1280px); adaptive 720px on laptops (1024px–1279px).
- **Trigger:** Hover with 120ms intent delay or standard keyboard click/focus.

```
+-----------------------------------------------------------------------------------------------------------------------------------+
| PRODUCTS OVERVIEW (Maps to /products/)                                                                                            |
+------------------------------------+------------------------------------+----------------------------------+---------------------+
| 📞 TELEPHONY & VOICE               | 🔄 CONTACT CENTER & DIALERS        | 📊 CRM & CONVERSATIONS           | ⭐ SPOTLIGHT        |
+------------------------------------+------------------------------------+----------------------------------+---------------------+
| • Cloud Telephony                  | • Contact Center Software          | • CRM Software                   | 🚀 UNIFIED PLATFORM |
|   (/products/cloud-telephony/)     |   (/products/call-center-software/)|   (/products/crm/)               |                     |
|                                    |                                    |                                  | Telephony + CRM     |
| • IVR Solutions                    | • Auto Dialer                      | • Telecalling CRM                | in a single billing |
|   (/products/ivr-system/)          |   (/products/auto-dialer/)         |   (/products/telecalling-crm/)   | dashboard.          |
|                                    |                                    |                                  |                     |
| • Smart Multi-Level IVR            | • Predictive Dialer                | • WhatsApp CRM                   | [Explore Suite →]   |
|   (/products/smart-ivr/)           |   (/products/predictive-dialer/)   |   (/products/whatsapp-crm/)      |                     |
|                                    |                                    |                                  | 🛡 TRAI DLT Aligned |
| • Virtual & Toll-Free Numbers      | • View All Products →              | • Lead Management                | ⏱ Rapid Setup       |
|   (/products/virtual-numbers/)     |   (/products/)                     |   (/solutions/sales-automation/) |                     |
+------------------------------------+------------------------------------+----------------------------------+---------------------+
```

#### B. "Solutions" Mega-Menu (Grouped by Business Objective)
- **Container Width:** 580px | 2-Column Grid.
- **Links:**
  - Sales Automation (`/solutions/sales-automation/`)
  - Customer Support (`/solutions/customer-support/`)
  - Enterprise Scalability (`/solutions/enterprise/`)
  - Solutions Directory (`/solutions/`)

#### C. "Industries" Mega-Menu (8 High-Intent Verticals)
- **Container Width:** 680px | 2-Column Grid.
- **Links:**
  - Real Estate Telecalling & IVR (`/industry/real-estate/`)
  - Healthcare & Clinic Routing (`/industry/healthcare/`)
  - Education & EdTech Admissions (`/industry/education/`)
  - All Industries Directory (`/industry/`)

#### D. "Resources" Mega-Menu
- **Links:**
  - TRAI DLT Compliance Manual (`/resources/dlt-compliance-guide/`)
  - Exotel Alternative Comparison (`/compare/exotel-alternative/`)
  - Knowlarity Alternative Comparison (`/compare/knowlarity-alternative/`)
  - TeleCMI Alternative Comparison (`/compare/telecmi-alternative/`)
  - Interactive Telephony Cost Calculator (`/pricing/calculator/`)

#### E. "Company" Dropdown
- **Links:**
  - About Hanva (`/company/about/`)
  - Contact Sales & Support (`/company/contact/`)
  - Careers at Hanva (`/company/careers/`)
  - Security & Infrastructure Trust (`/company/security-and-trust/`)

#### F. Persistent Header CTAs
1. **Light/Dark Mode Toggle:** Switches between Enterprise Light Mode (default) and Cockpit Dark Mode.
2. **"View Pricing":** Direct link to `/pricing/`.
3. **"Book a Demo":** Direct link to consultation form at `/company/contact/`.

---

## 3. MOBILE & TABLET NAVIGATION DRAWER

On viewports below 1024px (`@media (max-width: 1023px)`):
- Desktop navbar collapses into an accessible **Hamburger Toggle** (`aria-label="Open Navigation Menu"`, `aria-expanded="false"`).
- Opens an accessible, slide-out drawer (`width: min(85vw, 380px); z-index: var(--z-drawer)`).

### Mobile Drawer Accessibility & Keyboard Interaction
- **Focus Trap:** Tabbing is constrained within the drawer while open; focus returns to the hamburger toggle on close.
- **Escape Key Listener:** Pressing `Escape` immediately closes the drawer.
- **Inert Background:** Main body container is set to `aria-hidden="true"` while the drawer is active.
- **Touch Target Rule:** Every link in the mobile drawer has a minimum height of **48px** with a generous tap target.

### Mobile Sticky Conversion Bar & Collision Prevention
- On mobile screens, a sticky bottom conversion strip ("Book a Demo / Talk to Sales") is fixed at `bottom: 0`.
- **Collision Prevention Rule:** The `body` element receives an automated `padding-bottom: 80px` on mobile viewports, preventing the sticky bar from overlapping footer links, submit buttons, or form fields.

---

## 4. COMPREHENSIVE ENTERPRISE FOOTER ARCHITECTURE

Every footer link maps to an active route defined in the sitemap:

```
+-----------------------------------------------------------------------------------------------------------------------------------+
| HANVA TECHNOLOGIES PVT. LTD.                                                                                                      |
| Cloud telephony, intelligent multi-level IVR, contact center dialers, and native sales CRM for Indian enterprise.                 |
| Support Helpline: +91 7899010973 | Enterprise Inquiries: gaurav@hanva.in                                                          |
+----------------------+----------------------+----------------------+----------------------+---------------------------------------+
| PRODUCTS             | SOLUTIONS            | INDUSTRIES           | COMPARISONS          | COMPANY & GOVERNANCE                  |
+----------------------+----------------------+----------------------+----------------------+---------------------------------------+
| • Cloud Telephony    | • Sales Automation   | • Real Estate        | • vs. Exotel         | • About Hanva                         |
|   (/products/cloud-  |   (/solutions/sales- |   (/industry/real-   |   (/compare/exotel-  |   (/company/about/)                   |
|   telephony/)        |   automation/)       |   estate/)           |   alternative/)      |                                       |
|                      |                      |                      |                      | • Security & Trust                    |
| • Smart IVR Systems  | • Customer Support   | • Healthcare         | • vs. Knowlarity     |   (/company/security-and-trust/)      |
|   (/products/ivr-    |   (/solutions/cust-  |   (/industry/health- |   (/compare/knowlar- |                                       |
|   system/)           |   omer-support/)     |   care/)             |   ity-alternative/)  | • Careers                             |
|                      |                      |                      |                      |   (/company/careers/)                 |
| • Multi-Level IVR    | • Enterprise Scale   | • Education & EdTech | • vs. TeleCMI        |                                       |
|   (/products/smart-  |   (/solutions/enter- |   (/industry/educat- |   (/compare/telecmi- | • Contact Sales                       |
|   ivr/)              |   prise/)            |   ion/)              |   alternative/)      |   (/company/contact/)                 |
|                      |                      |                      |                      |                                       |
| • Auto Dialer        | • Products Hub       | • Industries Hub     | • DLT Compliance     | • Privacy Policy                      |
|   (/products/auto-   |   (/products/)       |   (/industry/)       |   (/resources/dlt-   |   (/company/privacy-policy/)          |
|   dialer/)           |                      |                      |   compliance-guide/) |                                       |
|                      | • Solutions Hub      |                      |                      | • Terms of Service                    |
| • Telecalling CRM    |   (/solutions/)      |                      | • Cost Calculator    |   (/company/terms-of-service/)        |
|   (/products/tele-   |                      |                      |   (/pricing/calcul-  |                                       |
|   calling-crm/)      |                      |                      |   ator/)             | • Transparent Pricing                 |
|                      |                      |                      |                      |   (/pricing/)                         |
+----------------------+----------------------+----------------------+----------------------+---------------------------------------+
| © 2026 Hanva Technologies Pvt. Ltd. All rights reserved. Registered in Karnataka, India.                                          |
| Telecom software operations aligned with TRAI guidelines and Indian telecommunication regulations.                                |
+-----------------------------------------------------------------------------------------------------------------------------------+
```
