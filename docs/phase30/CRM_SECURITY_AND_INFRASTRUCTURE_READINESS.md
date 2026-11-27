# HANVA TECHNOLOGIES — CRM SECURITY & INFRASTRUCTURE READINESS
## Security Audit, 6 Cloud Objects Verification, Credential Rotation & Cloud Staging Assessment

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 30  
**Target Codebase:** `/Users/apple/Downloads/CRM-reconciled` (Branch: `security/phase-24-nextjs-modernization`)  
**Date:** November 2026

---

## 1. CRM Codebase Security Baseline

In Phase 23.2 and Phase 24, a major security remediation was executed on the reconciled CRM repository:
- All 16 unauthenticated routes were protected with session or webhook authentication guards.
- Service-role key usage was isolated behind `assertSuperAdmin()` or hardened helper wrappers.
- The framework was modernized from Next.js 14 to **Next.js 15.5.29 + React 19.3.1**, eliminating all 28 reported npm security advisories.
- SQL migrations (`001`, `002`, `003`) were validated locally on `@electric-sql/pglite` (PostgreSQL 19.0 WASM).

**CRITICAL AUDIT FINDING FOR PHASE 30:**
While the local codebase is hardened and builds cleanly, **Cloud Supabase Staging has NOT been executed or verified.** Local PGlite WASM execution is not a substitute for cloud multi-tenant Supabase validation.

---

## 2. Audit of the 6 Cloud Database & Storage Objects

In Phase 24, six critical out-of-band objects were identified that cannot be verified locally and require inspection in a live Supabase staging project before production cutover:

| # | Out-of-Band Object | Architectural Classification | Current Verification Status | Security Requirement in Cloud Staging |
| :---: | :--- | :--- | :---: | :--- |
| **1** | `agent_leaderboard_view` | Out-of-band SQL View | **UNVERIFIED (LOCAL ONLY)** | Must verify that joins to `call_logs` enforce `WITH (security_invoker = true)` so callers cannot bypass tenant RLS. |
| **2** | `attendance_selfies` | Supabase Storage Bucket | **UNVERIFIED (LOCAL ONLY)** | Storage bucket policies must restrict access strictly to `<tenant_id>/...` paths via `current_tenant_id()`. |
| **3** | `kyc_documents` | Supabase Storage Bucket | **UNVERIFIED (LOCAL ONLY)** | Public bucket reads must be disabled; uploads via `/kyc-upload/[token]` must be strictly scoped and non-enumerable. |
| **4** | `system_activity_logs` | Legacy Admin Audit Table | **UNVERIFIED (LOCAL ONLY)** | RLS policy must replace legacy `user_metadata` checks with `public.is_super_admin()`. |
| **5** | `auth.users` | Supabase Auth System Table | **UNVERIFIED (LOCAL ONLY)** | Existing auth users and metadata must be audited before enabling strict trigger `on_auth_user_created`. |
| **6** | `public.users` | Core Tenant Identity Table | **UNVERIFIED (LOCAL ONLY)** | Must confirm every active user has valid non-null `tenant_id` and role before re-enabling strict RLS in `002`. |

---

## 3. Credential Exposure & Rotation Readiness

### The Historical Vulnerability
Prior to Phase 23.2, production credentials across 12 distinct provider domains were hardcoded into Git history, configuration files, and client-side browser bundles.

### Current Mitigation Status
- **Code-Level Purge:** All hardcoded literals have been stripped from `/Users/apple/Downloads/CRM-reconciled`. The codebase cleanly references environment variables (`.env.example`).
- **Live Rotation Status: UNROTATED (REQUIRES OWNER ACTION).** Because automated rotation of live production accounts was strictly prohibited, these credentials remain active on external provider portals.

### The 12 Domain Credential Rotation Plan

| Domain | Environment Variable(s) | Rotation Urgency | Impacted Integrations | Cutover Action |
| :--- | :--- | :---: | :--- | :--- |
| **Supabase** | `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, Anon Key | **P0 (Critical)** | All CRM API routes, Auth, Storage, RLS | Rotate in Supabase dashboard; update server env. |
| **Fonada** | `FONADA_WHATSAPP_BEARER_TOKEN`, `FONADA_PASSWORD` | **P0 (Critical)** | Outbound WhatsApp, OBD dialer, webhooks | Generate new token in Fonada portal; update webhooks. |
| **Ozonetel** | `OZONETEL_API_KEY`, `OZONETEL_PORTAL_PASS` | **P0 (Critical)** | Watchdog cron, campaign sync, sticky routing | Reset password/API key in Ozonetel CloudAgent portal. |
| **CloudConnect** | `CLOUDCONNECT_API_TOKEN`, `CLOUDCONNECT_WEBHOOK_SECRET` | **P0 (Critical)** | Click-to-call, screen-pop, webhooks | Re-issue API token and configure signed webhook secret. |
| **Resend** | `RESEND_API_KEY` | **P0 (Critical)** | Daily report crons and alert emails | Revoke compromised API key; issue new restricted key. |
| **OpenRouter** | `OPENROUTER_API_KEY` | **P0 (Critical)** | AI call QA scoring, assistant guide chat | Revoke exposed token in OpenRouter dashboard. |
| **Calendarific** | `CALENDARIFIC_API_KEY` | **P1 (High)** | Holiday proxy (`/api/admin/holidays`) | Key was leaked in browser bundle; revoke immediately. |
| **Razorpay** | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | **P0 (Critical)** | Customer payments, recharge checkout | Rotate API keys and webhook secret in Razorpay portal. |
| **Upstash QStash**| `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY` | **P1 (High)** | Fonada background worker queue | Rotate via Upstash console dual signing keys. |
| **Upstash Redis** | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | **P1 (High)** | Distributed API rate limiting | Re-generate Redis token in Upstash console. |
| **Internal Secrets**| `CRON_SECRET`, `INTERNAL_WEBHOOK_SECRET` | **P0 (Critical)** | 10 `/api/cron/*` endpoints, debug routes | Generate new random 64-character hex secrets. |
| **Website Gateway** | `WEBSITE_LEAD_HMAC_SECRET`, `INCOMING_LEADS_HMAC` | **P0 (Critical)** | Website to CRM lead handoff (`/api/leads`) | Keep `CRM_STAGE_A_SECURITY_APPROVED=false` until live cutover. |

---

## 4. Conclusion & Staging Prerequisite Sign-Off

The CRM backend cannot be certified for production go-live until:
1. A dedicated staging Supabase project is provisioned.
2. Migrations `001`, `002`, `003` are applied and the 6 cloud objects verified.
3. The 12 credential groups are rotated during an owner-approved maintenance window.
