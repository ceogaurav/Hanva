# MOBILE API SECURITY REPORT

**Phase:** 23.1 (Section 8 Telecaller Android & Mobile Endpoint Assessment)  
**CRM Endpoints Inspected:** `CRM/app/api/mobile/login/route.ts`, `CRM/app/api/telecaller/sim-calls/route.ts`  
**Android Companion Inspected (Read-Only):** `/Users/apple/Downloads/hanva-telecaller-android/src/App.tsx` (Untouched)

---

## 1. Critical Vulnerabilities Confirmed

### MOB-01 [CRITICAL]: `/api/telecaller/sim-calls` Has Zero Authentication & First-Org Fallback
- **Evidence (`CRM/app/api/telecaller/sim-calls/route.ts`):**
  - Performs **zero `Authorization: Bearer <jwt>` verification**.
  - Accepts arbitrary `tenant_id`, `agent_id`, `phone_number`, `direction`, `duration_seconds`, `disposition`, and `notes` directly from unauthenticated JSON body.
  - Lines `50-54`: When `tenant_id` is omitted, queries `SELECT id FROM organizations LIMIT 1`, mutating leads and inserting `call_logs` into an arbitrary tenant!
- **Cross-Tenant Impact:** Anyone on the internet can inject fabricated SIM call logs, flip lead dispositions, or corrupt telecaller activity stats.

### MOB-02 [CRITICAL]: Android App Client-Side Auth Bypass & Hardcoded Tenant Fallback
- **Evidence (`/Users/apple/Downloads/hanva-telecaller-android/src/App.tsx:113-126`):**
  - Calls `POST https://crm.hanva.in/api/mobile/login`. If the API returns `!res.ok` or errors, the catch/fallback block checks `if (emailInput.includes('@'))` and logs the device in locally anyway as `"Telecaller Agent"` with a hardcoded UUID `tenant_id`!
  - Subsequent `sim-calls` POST requests send `{ agent_id, tenant_id, ... }` in JSON body **without storing or transmitting `access_token`**.

### MOB-03 [MEDIUM]: Status Value Case Mismatch Between APK and CRM DB Constraints
- `App.tsx:31-36` sends lowercase dispositions (`'interested'`, `'follow_up'`, `'documents_sent'`, `'not_interested'`, `'nr'`, `'disbursed'`).
- `CRM/scripts/014_create_global_lead_statuses.sql` & `002_create_leads_table.sql` define mixed-case statuses (`'Interested'`, `'Documents_Sent'`, `'Not_Interested'`, `'Disbursed'`). `sim-calls` partially normalizes `'documents_sent'`/`'not_interested'`/`'interested'`, yet a strict canonical disposition map is needed.

### MOB-04 [HIGH]: `/api/mobile/login` Lacks Brute-Force Rate Limiting & Audit Logging
- Uses `service_role` to query `users` profile (`is_active` check present), does not enforce distributed rate limiting per IP/email, and does not return a standardized scoped session contract guaranteeing the APK discards client-side mock login fallbacks.

---

## 2. Coordinated Migration & Security Remediation Plan (Zero Breakage Constraint)

Per Section 8 (*"Review compatibility with the existing Android app without changing its production behavior. If mobile authentication requires a coordinated update, document the exact changes and stop before a breaking API change"*):

1. **Step 1 (CRM Pre-Deploy — Backward-Compatible Prep):** Add Bearer JWT verification support (`supabaseAdmin.auth.getUser(token)`) in `/api/telecaller/sim-calls` alongside rate limiting + removal of `organizations LIMIT 1` fallback, while monitoring legacy unauthenticated traffic temporarily in a short migration window ONLY in staging/canary (rejecting invalid tokens immediately and disallowing production sync until APK is rolled out).
2. **Step 2 (Coordinated APK Release v2 — After Owner Approval):** Update `hanva-telecaller-android/src/App.tsx` to:
   - Store `session.access_token` & `refresh_token` securely in Capacitor `Preferences` (never bypass failed login on `emailInput.includes('@')`!).
   - Attach `Authorization: Bearer <access_token>` to `/api/telecaller/sim-calls` and stop sending client-trusted `tenant_id`/`agent_id` as authority.
   - Generate per-call `client_call_uuid` for duplicate submission / idempotent retry protection (`uq_call_logs_client_call_uuid`).
3. **Step 3 (Enforce Strict JWT-Only Cutoff):** Reject unauthenticated `POST /api/telecaller/sim-calls` with `401 Unauthorized` and enforce server-derived `user.id` + `profile.tenant_id` + lead ownership verification.
