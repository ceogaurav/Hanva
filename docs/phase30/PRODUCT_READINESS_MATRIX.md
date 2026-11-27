# HANVA TECHNOLOGIES — PRODUCT READINESS MATRIX
## Code-Grounded Verification, Known Limitations, Security Flaws & Blockers across CRM, Salon & POS

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 30  
**Inspection Basis:** Direct Local Source Code & Historical Technical Audits  
**Date:** November 2026

---

## 1. Product 1: Hanva CRM Platform

### Workspace & Repository References
- **Authoritative Repository:** `https://github.com/seobanks/CRM`
- **Reconciled Working Copy:** `/Users/apple/Downloads/CRM-reconciled` (Branch: `security/phase-24-nextjs-modernization` at commit `4dd3467`)
- **Reference Remote:** `https://github.com/gauravhotstar/CRM`

### A. Verified Core Capabilities
1. **Lead Pipeline & Ingestion:** Inbound webhook listeners with idempotency deduplication (`/api/webhooks/incoming-leads`), CSV bulk import parser, lead transfer, and stage management.
2. **Telephony & Dialing Engine:** 1-click Click-to-Call (C2C) carrier bridge, inbound Smart IVR campaign scheduler, WebRTC browser dialer, and in-browser call recording playback.
3. **Role-Based Portals:** Dedicated web portals for Admin, Team Leader, Telecaller (`/telecaller/`), and KYC Verification (`/kyc/`).
4. **Attendance & Geofencing:** Agent daily attendance check-in with optional selfie upload and GPS geofence verification.
5. **Modernized Framework:** Upgraded to Next.js `15.5.29` + React `19.3.1` in Phase 24; zero local npm/pnpm audit vulnerabilities.

### B. Known Limitations & Technical Gaps
1. **Mock Gateway Endpoint:** The website lead endpoint (`/api/leads/`) is deliberately set to `sandbox_mock` mode and fails closed. Direct lead delivery into CRM database is unapproved.
2. **Subscription & Billing Module:** Razorpay checkout flow relies on server actions, but automated recurring subscription renewals are partially implemented.
3. **MeiliSearch Dependency:** Full-text global search requires an external MeiliSearch container (`/api/admin/init-meili`) which is not provisioned on local dev machines.

### C. Security Issues & Critical Release Blockers
- **BLOCKER 1 (CRITICAL):** Cloud Supabase staging has NOT been executed. SQL migrations `001`, `002`, `003` were only tested on local PGlite WASM. The 6 out-of-band objects (`agent_leaderboard_view`, `attendance_selfies`, `kyc_documents`, `system_activity_logs`, `auth.users`, `public.users`) remain unverified in cloud Supabase.
- **BLOCKER 2 (CRITICAL):** 12 credential groups historically committed in Git history remain active in production and require owner-approved rotation.
- **BLOCKER 3 (CRITICAL):** Android APK v1 is incompatible with the hardened backend (sends no Bearer JWT; fails with `401 Unauthorized`).

---

## 2. Product 2: Hanva Salon Software

### Workspace & Repository Reference
- **Repository:** `https://github.com/miarhanvabill/hanvabill` (Audited in Phase 13)

### A. Verified Core Capabilities
1. **POS Billing & Checkout:** Idempotent checkout, walk-in customer creation, cash register Z-reports, and SAC 9997 18% GST invoicing with split tender (Cash + UPI).
2. **Appointments & Bookings:** Front-desk appointment grid, public client booking mini-website (`/book/[slug]`), chair/room resources, and waitlists.
3. **Staff & Commissions:** Stylist PIN Tablet Portal (`/staff-portal/login`), tiered staff commission rules, daily earnings tracking, and basic payroll.
4. **Inventory Management:** Service-to-product auto-consumption rules (automatic deduction of hair color tubes and developer per billed service), batch/expiry tracking.
5. **Customer Retention:** Digital shareable invoices (`/inv/[token]`), loyalty points, session-deducting prepaid packages, and memberships.

### B. Known Limitations & Unverified Claims
1. **Multi-Branch Operations: NOT FOUND.** Audit confirmed zero branch entities, branch switchers, or branch-scoped reporting in source code. (Only an `is_multi_branch` boolean flag in billing packages). Marketing claims of multi-branch support must be strictly prohibited.
2. **Razorpay & SMS Gateway: INCOMPLETE.** Razorpay is a UI dropdown string only (`app/settings/page.tsx:1344`) without backend checkout actions. SMS gateway is a settings toggle without an active provider bridge.

### C. Security Issues & Critical Release Blockers
- **BLOCKER 4 (CRITICAL): Multi-Tenancy Auth Fallback Risk.** In `lib/withTenantAuth.ts:51-62`, if a request arrives unauthenticated, the middleware falls back to query headers or the *first active tenant in the database*, creating an extreme cross-tenant data leak vulnerability.
- **BLOCKER 5 (HIGH): Disabled RLS.** Row Level Security is disabled on core tables in the Neon PostgreSQL database; isolation relies purely on application-level `WHERE tenant_id = ...` clauses.
- **BLOCKER 6 (MEDIUM): Insecure Node Environment.** `NODE_TLS_REJECT_UNAUTHORIZED = "0"` is hardcoded in `lib/whatsapp.ts:17`, disabling TLS certificate validation.

---

## 3. Product 3: Hanva Restaurant POS

### Workspace & Repository Reference
- **Local Workspace:** `/Users/apple/Downloads/PETPOOJA POS`
- **Repository Remote:** `https://github.com/seobanks/POS` (Branch: `main` at commit `99033c7`)

### A. Verified Core Capabilities
1. **Fast Counter & Dine-In Billing:** Node.js/Express backend with Prisma 6.19.3, Next.js 16.4.6 web frontend, visual table floorplans, and dine-in/takeaway ordering.
2. **Offline Resilience:** IndexedDB client order queue with background sync, allowing billing to continue uninterrupted during broadband outages.
3. **Kitchen Routing & KDS:** ESC/POS network thermal printer integration (`apps/print-bridge`), station-routed KOTs with duplicate-print guards, and live Kitchen Display System with prep timers.
4. **Recipe BOM Costing:** Real-time dish ingredient depletion calculating raw material consumption and gross margins per menu item.
5. **India GST & UPI:** 5% Restaurant GST split (2.5% CGST + 2.5% SGST) and dynamic BharatQR UPI generation printed on guest checks.

### B. Known Limitations & Technical Gaps
1. **Third-Party Delivery Aggregators: NO NATIVE INTEGRATION.** There is zero native API integration with Swiggy or Zomato in the repository. It supports external partner webhooks only.
2. **Hardware Dependency:** Network thermal printing requires a local print-bridge daemon running on the local restaurant subnet.

### C. Security & Operational Readiness Assessment
- **Status:** **READY WITH CONDITIONS.**
- POS billing operates securely in a single-outlet environment.
- Does not contain the critical tenant auth fallback vulnerabilities identified in Salon Software.
- Ready for customer demonstrations and single-outlet pilot deployments.
