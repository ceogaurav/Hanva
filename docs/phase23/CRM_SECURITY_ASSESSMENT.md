# STAGE A — CRM SECURITY ASSESSMENT REPORT

**Target Audited:** `/Users/apple/Downloads/CRM` (`gauravhotstar/CRM`, branch `main` @ `3d3f81a7` + dirty working tree)  
**Comparison Note:** Phase 13 established `https://github.com/seobanks/CRM` (`bec603f9`) as the authoritative CRM upstream, whereas the local CRM workspace tracks `https://github.com/gauravhotstar/CRM.git` with substantial diverged billing/Razorpay/telecaller-mobile work.  
**Stage A Security Gate Decision:** **`FAILED — PRODUCTION CRM INTEGRATION BLOCKED`**

> [!CAUTION]
> Live website-to-production CRM writes are explicitly blocked and disabled. Connecting `https://www.hanva.in` directly to the current `/Users/apple/Downloads/CRM` backend or Supabase database before remediating the Critical findings below would expose multi-tenant lead PII, privileged service-role credentials, and unauthenticated write paths.

---

## 1. Executive Severity Summary

| Severity | Count Verified | Summary of Verified Defects |
| --- | --- | --- |
| **Critical** | 5 | API middleware bypass + 10 unauthenticated `service_role` routes; disabled `public.users` RLS; unauthenticated cross-tenant `/api/admin/broadcast` & `/api/telecaller/sim-calls`; missing tenant guard on `bulk_assign_leads`; silent mock client when Supabase env vars missing |
| **High** | 4 | Hardcoded fallback API keys & webhook/cron secrets across 9 files (all values redacted here); query-string `?token=` secret leakage and console PII logging on `incoming-leads`; build suppression of TypeScript & ESLint errors; dual-repository divergence (`seobanks/CRM` vs `gauravhotstar/CRM`) |
| **Medium** | 3 | International phone rejection on `incoming-leads`; zero idempotency/deduplication/rate limiting on ingestion webhooks; Android APK login fallback to client mock tenant + unauthenticated call sync |

---

## 2. Detailed Verified Security Findings

### Finding SEC-01 [CRITICAL]: Global `/api/*` Middleware Bypass & Unauthenticated Service-Role Routes
- **Evidence:**
  - `CRM/middleware.ts:6-12` unconditionally returns `NextResponse.next()` for `/api`, `/pay`, and `/kyc-upload`.
  - Inventory across all `51` API route handlers (`app/api/**/route.ts`) identified **`16` handlers containing zero session auth or webhook token checks**, of which **`10` import/instantiate `SUPABASE_SERVICE_ROLE_KEY`** (full RLS bypass):
    - `app/api/admin/broadcast/route.ts`
    - `app/api/admin/fix-checkout/route.ts`
    - `app/api/admin/fix-ivr-logs/route.ts`
    - `app/api/webhooks/ai-obd/route.ts`
    - `app/api/webhooks/c2c/route.ts`
    - `app/api/webhooks/fonada/worker/route.ts`
    - `app/api/webhooks/inbound-routing/route.ts`
    - `app/api/webhooks/ivr/route.ts`
    - `app/api/webhooks/trigger-push/route.ts`
    - `app/api/webhooks/unicorn-call-outcomes/route.ts`
- **Impact:** Any unauthenticated external caller can invoke admin mutations or forge webhook/IVR/call-outcome events with service-role database privileges.

### Finding SEC-02 [CRITICAL]: Unauthenticated Cross-Tenant Broadcast & Weak Admin Bulk Assign Tenant Checks
- **Evidence:**
  - `CRM/app/api/admin/broadcast/route.ts`: Executes zero `supabase.auth.getUser()` validation, trusts client-supplied `currentUserId` in JSON payload, uses `SUPABASE_SERVICE_ROLE_KEY`, and queries `.from('users')` without filtering by sender `tenant_id`.
  - `CRM/app/api/admin/leads/bulk-assign/route.ts:14-48`: Authenticates caller role (`admin`/`tenant_admin`/`super_admin`), but calls `supabase.rpc('bulk_assign_leads', { p_lead_ids, p_assigned_to })` using `service_role` without confirming that `leadIds` and `assignedTo` belong to `currentUser`'s `tenant_id`.
- **Impact:** Cross-tenant spam notifications and cross-tenant lead reassignment IDOR.

### Finding SEC-03 [CRITICAL]: Unauthenticated Mobile Call-Log Endpoint & Default-First-Tenant Fallback
- **Evidence:**
  - `CRM/app/api/telecaller/sim-calls/route.ts:50-54`: Performs zero Bearer JWT verification (`Authorization` header ignored), trusts client-supplied `tenant_id` and `agent_id`, and executes `SELECT id FROM organizations LIMIT 1` whenever `tenant_id` is omitted.
  - `hanva-telecaller-android/src/App.tsx:114-126` & SIM sync handler: Falls back on login failure to a hardcoded client-side mock user when `emailInput.includes('@')` and posts call dispositions without an `Authorization` token.
- **Impact:** Anyone knowing a tenant UUID (or omitting `tenant_id`) can inject/overwrite call logs and lead statuses in the first tenant organization. Notice: Securing `/api/telecaller/sim-calls` with strict JWT Bearer verification requires coordinated Android app update (read-only finding; Android workspace untouched).

### Finding SEC-04 [CRITICAL]: Row Level Security Explicitly Disabled on `public.users` + Schema Migration Drift
- **Evidence:**
  - `CRM/scripts/007_fix_users_rls_policies.sql:48` executes: `alter table public.users disable row level security;`.
  - `CRM/scripts/002_create_leads_table.sql` creates `leads` with global role policies (`role = 'admin'`) without `tenant_id`, while later scripts (`025`, `029`, `sql/performance_indexes.sql`) create indexes on `leads.tenant_id` and reference `get_current_tenant_id()`, without any checked-in migration showing `ALTER TABLE leads ADD COLUMN tenant_id` or multi-tenant `leads` RLS policies.
- **Impact:** Direct `anon`/authenticated Supabase REST queries against `public.users` are unprotected at DB level, and repository SQL state cannot reproduce production schema reliably without exporting/reconciling live DDL.

### Finding SEC-05 [CRITICAL]: Silent Fail-Open Mock Database Client When Env Vars Absent
- **Evidence:**
  - `CRM/lib/supabase/server.ts:27-36`: When `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` is unset, logs a warning and returns a dummy Proxy resolving `{ data: null, error: null }`.
  - Multiple `service_role` routes initialize `createClient(url || "https://placeholder-project.supabase.co", key || "placeholder-key")` at module top level (`admin/leads/bulk-assign/route.ts:6-9`, `webhooks/incoming-leads/route.ts:8-11`).
- **Impact:** Misconfigured deployments fail open/silently instead of aborting startup or returning `503`.

### Finding SEC-06 [HIGH]: Hardcoded Fallback Credentials & Webhook/Cron Bypass Literals (REDACTED)
Every hardcoded credential below is **redacted (`[REDACTED]`)** in accordance with Phase 23 security rules. All values require immediate revocation/rotation outside source control:
- `CRM/app/actions/whatsapp.ts` (`L65, L70-74, L133, L208`): Hardcoded fallback `FONADA_WHATSAPP_ACCOUNT_ID`, `FONADA_USERID`, `FONADA_PASSWORD`, `FONADA_WABA_NUMBER`, `FONADA_WHATSAPP_BEARER_TOKEN` (`[REDACTED]`).
- `CRM/app/actions/whatsapp-billing-alerts.ts` (`L159, L288-290`): Hardcoded fallback `FONADA_WHATSAPP_BEARER_TOKEN`, `FONADA_USERID`, `FONADA_PASSWORD` (`[REDACTED]`).
- `CRM/app/actions/cloudconnect.ts` (`L6`): Hardcoded fallback `CLOUDCONNECT_API_TOKEN` (`[REDACTED]`).
- `CRM/app/api/webhooks/whatsapp/route.ts` (`L23, L71-74`): Hardcoded webhook verify token (`[REDACTED]`) and fallback Fonada WABA credentials (`[REDACTED]`).
- `CRM/app/api/webhooks/cloudconnect/route.ts` (`L212`) & `app/api/webhooks/ozonetel/sticky/route.ts` (`L49`): Fallback `CLOUDCONNECT_WEBHOOK_SECRET || '[REDACTED]'`.
- `CRM/app/api/webhooks/fonada/route.ts` (`L80`): Fallback `CRON_SECRET || '[REDACTED]'`.
- `CRM/app/api/cron/process-webhooks/route.ts` (`L119, L123`): Hardcoded `CRON_SECRET` fallback (`[REDACTED]`) and direct literal check (`authHeader !== "[REDACTED]"`).
- `CRM/app/api/cron/daily-report/route.ts` (`L7`): Hardcoded `RESEND_API_KEY || '[REDACTED]'` fallback.

### Finding SEC-07 [HIGH]: Query-String Token Leakage, PII Logging & Build Suppression
- **Evidence:**
  - `CRM/app/api/webhooks/incoming-leads/route.ts:18-19, 34, 53`: Accepts secret `?token=` in URL query string (leaked to access logs/proxies/referrers), logs invalid token (`L34`) and entire incoming PII JSON body (`L53`) to stdout/logs.
  - `CRM/app/api/webhooks/incoming-leads/route.ts:107`: Hardcodes single organization UUID for automatic WhatsApp dispatch (`576a6280-a9a2-425c-b1dd-eabfff3a00c6`).
  - `CRM/next.config.mjs`: Configures `eslint: { ignoreDuringBuilds: true }` and `typescript: { ignoreBuildErrors: true }`, hiding static type/security defects during CI builds.

---

## 3. Repository Governance & Authoritative Source Conflict

- Phase 13 audited `seobanks/CRM` (`bec603f9`); local workspace `/Users/apple/Downloads/CRM` points to `gauravhotstar/CRM` (`3d3f81a7`) with ~70 uncommitted dirty changes.
- Until one authoritative production repository & clean branch is designated and reconciled against live Supabase DDL, schema compatibility and automated webhook deployments are high-risk.

---

## 4. Mandatory Blockers Before Production Integration Can Proceed

1. **Remove all hardcoded secret fallbacks** across the 9 CRM files above and rotate all exposed Fonada, Resend, CloudConnect, cron, and webhook tokens in Supabase/Vercel/host env stores.
2. **Enforce Fail-Closed Auth** across all `/api/admin/*`, `/api/cron/*`, `/api/telecaller/*`, and `/api/webhooks/*` routes (constant-time HMAC/Bearer verification; zero unauthenticated `service_role` handlers).
3. **Re-enable & Verify DB RLS** on `public.users`, `public.leads`, `public.call_logs`, `public.follow_ups`, `public.notes`, `public.notifications`, and `public.tenant_settings` using `docs/phase23/evidence/proposed_crm_rls_and_idempotency_migration.sql`.
4. **Provision Dedicated Website Ingestion Service Endpoint** using signed headers (`Authorization` + `X-Hanva-Signature` HMAC-SHA256 + `X-Hanva-Timestamp` + `X-Idempotency-Key`), eliminating `?token=` URL parameters and full-PII console logging.
5. **Resolve `seobanks/CRM` vs `gauravhotstar/CRM` repository divergence** and remove `ignoreBuildErrors`/`ignoreDuringBuilds` in CRM `next.config.mjs`.
