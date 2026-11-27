# HANVA TECHNOLOGIES — PRODUCT DEMONSTRATION REPORT
## Genuine Codebase Inspection, Synthetic Workflows & Asset Capture Protocol

**Company:** Hanva Technologies  
**Website:** https://www.hanva.in  
**Phase:** 26  
**Audited Repositories:**
- Hanva CRM (`https://github.com/seobanks/CRM` / `/Users/apple/Downloads/CRM`)
- Hanva Salon Software (Next.js / Neon PostgreSQL / Clerk / Tailwind)
- Hanva Restaurant POS (Next.js / PostgreSQL / Prisma / Offline IndexedDB)
**Date:** November 2026

---

## 1. Objective & Codebase Grounding

Indian SMB buyers will not convert on SaaS products without seeing authentic demonstrations of how the software handles their daily operational realities. 

Rather than deploying generic stock photography or ungrounded UI mockups, Phase 26 grounded all product demonstrations in the **verified source code** of Hanva's three software platforms.

Every step displayed in our interactive demonstration engines, screenshot slots, and capability breakdowns corresponds to real code, database schemas, and API routes identified during codebase inspection.

---

## 2. Platform Architectural Inspection

### A. Hanva CRM Platform
- **Authoritative Repositories:** `/Users/apple/Downloads/CRM` (authoritative remote `https://github.com/seobanks/CRM`) and reconciled staging `/Users/apple/Downloads/CRM-reconciled`.
- **Verified Codebase Architecture:**
  - **Frontend:** Next.js with App Router, TypeScript, Tailwind CSS, Lucide icons.
  - **Backend Services:** FastAPI / Python service endpoints and Next.js server actions.
  - **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS) and JWT auth.
  - **Telephony & Dialing Engine:** Carrier C2C integration (Exotel / Cloud PBX API), WebRTC browser dialer, inbound IVR campaign manager, and call recording storage bucket.
  - **Role-Based Portals:** Admin, Team Leader, Telecaller (`/telecaller/`), and KYC Verification (`/kyc/`).
- **Core Operational Workflows Identified:**
  1. *Lead Ingestion:* CSV bulk import parser and inbound webhook endpoints with deduplication.
  2. *Lead Assignment:* Round-robin, lead scoring, and manager manual override.
  3. *Click-to-Call (C2C):* Single-click outbound bridge connecting agent mobile to customer mobile via carrier trunk.
  4. *Call Logging & Disposition:* Auto-logging call duration, agent call notes, disposition tagging (Interested, Not Interested, Callback, Wrong Number), and calendar callback scheduling.
  5. *KYC Document Vault:* Secure customer upload link, document inspection viewer, and verification approval workflow.
  6. *QA Audio Auditing:* In-browser audio playback with waveform visualizer and agent performance scoring.

### B. Hanva Salon Software Platform
- **Verified Codebase Architecture:**
  - **Frontend:** Next.js App Router, Tailwind CSS, shadcn/ui components.
  - **Backend & Database:** Neon Serverless PostgreSQL with Prisma ORM and Clerk multi-tenant authentication.
  - **India GST Compliance:** SAC Code 9997 (Hairdressing, beauty, and spa treatment services) with configurable 18% GST (9% CGST + 9% SGST), inclusive/exclusive tax engines.
- **Core Operational Workflows Identified:**
  1. *Public Booking Mini-Website:* Dedicated client-facing URL for service browsing, stylist selection, and slot booking.
  2. *Front-Desk Calendar & Waitlist:* Drag-and-drop chair allocation, appointment status color-coding (Confirmed, In-Service, Completed, No-Show).
  3. *Stylist PIN Portal:* Low-friction 4-digit PIN authentication on shared salon tablets, allowing stylists to view their queue, log used products, and check daily tips.
  4. *Back-Bar Auto-Consumption:* Service-linked Bill of Materials (e.g., "Balayage Hair Color" automatically deducts 60ml developer and 1 tube color from inventory).
  5. *GST Split POS Checkout:* Walk-in customer creation, package session deduction, loyalty redemption, and split-tender payment (Cash + UPI QR).
  6. *Day-End Cash Register Z-Report:* Reconciliation of drawer cash, card slips, UPI merchant settlement, and staff commission summaries.

### C. Hanva Restaurant POS Platform
- **Verified Codebase Architecture:**
  - **Frontend:** Next.js App Router, Tailwind CSS, PWA service worker with IndexedDB caching.
  - **Backend & Database:** Local/Cloud PostgreSQL with Prisma ORM.
  - **Print & Hardware Bridge:** ESC/POS network thermal printer integration with duplicate-print protection.
- **Core Operational Workflows Identified:**
  1. *Table Layout & QR Ordering:* Visual dine-in floorplan, rotating NPCI table QR codes for contactless guest ordering, and Captain PWA for mobile order taking.
  2. *Station KOT Splitting:* Automatic routing of order items to respective kitchen stations (e.g., Tandoor items to KOT Printer 1, Chinese to KOT Printer 2, Drinks to Bar Printer).
  3. *Live Kitchen Display System (KDS):* Color-coded prep timer cards (Green < 10 mins, Amber 10-20 mins, Red > 20 mins) with bump bar integration.
  4. *Offline IndexedDB Failover:* Automatic local caching of active tables and orders when Wi-Fi drops, background sync upon reconnection.
  5. *India GST & Dynamic UPI QR:* 5% Restaurant GST split (2.5% CGST + 2.5% SGST) without input tax credit, dynamic UPI BharatQR printed on paper bill.
  6. *Recipe BOM Inventory:* Sub-recipe costing and automatic depletion of bulk raw ingredients (e.g., 200g Paneer, 50ml Cream per Paneer Butter Masala).

---

## 3. Synthetic vs PII Data Protection Protocol

### Critical PII Privacy Alert & Audit Finding
During our workspace audit, a historical archive was identified:
`/Users/apple/Downloads/hanva_lead_evidence_4_screenshots.zip`
Inspection revealed 4 genuine application screenshots from an internal CRM database. However, these captures contain **unmasked customer mobile numbers, client names, and sales notes**.

**Policy Enforcement:**
- Under the Digital Personal Data Protection Act, 2023 (DPDP Act) and Hanva Technologies' strict security policies, **raw customer PII must NEVER be published on the public website.**
- Phase 26 strictly prohibits embedding unmasked screenshots in production web assets.
- All interactive demonstration components (`CrmWorkflowExplorer`, `SalonWorkflowExplorer`, `RestaurantPosExplorer`, `LeadQualifier`) use **100% synthetic, non-PII, realistic Indian business data**.
  - Synthetic Names: "Rajesh Sharma", "Priya Verma", "Arun Kumar".
  - Synthetic Numbers: "+91 98765 43210", "+91 98111 22334" (telecom test ranges).
  - Synthetic Salons: "Luxe Glow Salon & Spa, Indiranagar".
  - Synthetic Restaurants: "The Spice Pavilion, Koramangala".

---

## 4. Authentic Screenshot Capture Protocol

To transition from the current elegant SVG workflow placeholders to genuine raster screenshots in a future phase, the engineering team must follow this documented sandbox capture protocol:

### Step 1: Sandbox Environment Setup
- Deploy an isolated local development instance of each platform (do NOT use production customer databases):
  - CRM: Local Next.js dev server connected to a seeded mock Supabase project.
  - Salon: Local Next.js dev server connected to a seeded Neon PostgreSQL dev branch.
  - Restaurant POS: Local Docker container running PostgreSQL 16 with seed data.

### Step 2: High-Quality Data Seeding
- Execute data seeding scripts using standard Indian SMB test fixtures:
  - CRM: 25 mock leads across Real Estate and Consulting, 4 mock telecallers, realistic call logs with synthetic durations (2m 14s, 4m 02s).
  - Salon: 8 stylists with realistic schedules, 15 service items (Hair Spa, Keratin, Facial), and populated appointment calendar.
  - Restaurant POS: 12 active tables (Floor A and Outdoor Terrace), populated KOT queue, and dynamic menu.

### Step 3: Viewport & Capture Standards
- Resolution: Native 2560x1440 (16:9) retina display.
- Browser: Clean Chrome profile with zero browser extensions, bookmarks bar hidden, system clock set to 11:30 AM IST.
- Aspect Ratio: Standardized 16:9 or 16:10 container fit.
- Format: Export as modern WebP (`.webp`) at 85% quality, with lossless fallback. Maximum file size per image: < 220 KB.

### Step 4: Asset Checklist

| Target File Name | Platform | Target Screen | Planned Location |
| :--- | :--- | :--- | :--- |
| `hanva-crm-dashboard.webp` | Hanva CRM | Unified Lead Pipeline & Daily Telecaller Target Bar | `/products/crm/` Hero Slot |
| `hanva-crm-lead-management.webp` | Hanva CRM | Lead Detail View with C2C Call History & KYC Vault | `/products/crm/` Story Band 1 |
| `hanva-crm-calling-telephony.webp` | Hanva CRM | In-Browser Audio Player & Agent QA Scorecard | `/products/crm/` Story Band 2 |
| `hanva-crm-analytics-reporting.webp` | Hanva CRM | Lead Source Conversion Funnel & Team Leader Dashboard | `/products/crm/` Story Band 3 |
| `hanva-salon-billing.webp` | Salon Software | Split Tender Checkout & GST SAC 9997 Receipt | `/products/salon-software/` Story Band 1 |
| `hanva-salon-appointments.webp` | Salon Software | Multi-Stylist Daily Appointment Grid & Online Waitlist | `/products/salon-software/` Story Band 2 |
| `hanva-salon-inventory-staff.webp` | Salon Software | Auto-Consumption Stock Deduction & Stylist PIN Portal | `/products/salon-software/` Story Band 3 |
| `hanva-restaurant-pos.webp` | Restaurant POS | Table Floorplan, Order Entry & NPCI UPI QR Receipt | `/products/restaurant-pos/` Story Band 1 |
| `hanva-restaurant-kitchen-display.webp` | Restaurant POS | Live Station-Routed KDS with Prep Timers | `/products/restaurant-pos/` Story Band 2 |
| `hanva-restaurant-inventory-recipe.webp` | Restaurant POS | Recipe BOM Auto-Depletion & Daily Gross Margin View | `/products/restaurant-pos/` Story Band 3 |
