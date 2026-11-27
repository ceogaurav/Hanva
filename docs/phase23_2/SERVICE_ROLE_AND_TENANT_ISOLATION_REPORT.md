# SERVICE ROLE AND TENANT ISOLATION REPORT

**Reconciled Baseline:** Every `SUPABASE_SERVICE_ROLE_KEY` client construction in `/Users/apple/Downloads/CRM-reconciled/app/api/**` and `lib/security/crm-guards.ts` was audited and standardized through `getSupabaseAdminStrict()`.

---

## 1. Eliminating Arbitrary Cross-Tenant Service-Role Risk

Before Phase 23.2, over 10 unauthenticated API routes bypassed PostgreSQL RLS with `createClient(..., process.env.SUPABASE_SERVICE_ROLE_KEY)` while trusting client-supplied `tenant_id`, `leadIds`, `userIds`, or `organizations LIMIT 1` defaults.

### Controls Enforced Before Service-Role DB Operations
1. **Verified DB Actor First:** Admin & user routes obtain `{ actor, effectiveTenantId, supabaseAdmin }` from `requireTenantAdmin()` or `requireAuthenticatedSession()`. Every downstream Supabase query explicitly predicates `.eq("tenant_id", effectiveTenantId)`.
2. **Array & Target Ownership Validation:**
   - `/api/admin/leads/bulk-assign`: Verifies assignee belongs to `effectiveTenantId` (`403` otherwise) and rejects any `leadIds` batch containing leads outside `effectiveTenantId` before executing `bulk_assign_leads`.
   - `/api/notifications/send`: Checks ALL target `userIds` in `public.users` belong to `effectiveTenantId` (`403` on foreign tenant user IDs) before checking VAPID config (`503`) or sending pushes.
   - `/api/admin/ai-call`: Verifies `leadId` row belongs to `effectiveTenantId` (`403` on cross-tenant lead) prior to outbound dialing.
   - `/api/admin/broadcast`, `/api/admin/reports/calls`, `/api/admin/leads/export`, `/api/transfer-lead`: All reject cross-tenant scope attempts (`403`) or lock strictly to `effectiveTenantId`.
3. **Elimination of `organizations LIMIT 1` Cross-Tenant Fallback:**
   - Removed the dangerous `LIMIT 1` default organization lookup from `/api/telecaller/sim-calls/route.ts` and hardened cron/webhook lookup paths so ambiguous or missing tenant identifiers fail closed instead of leaking data to the first tenant alphabetically.
4. **Fail-Closed Startup Without Mock Queries:**
   - `getSupabaseAdminStrict()` calls `requireServerSecret("NEXT_PUBLIC_SUPABASE_URL", 12)` and `requireServerSecret("SUPABASE_SERVICE_ROLE_KEY", 20)`. Missing server config throws `SecurityConfigurationError` (HTTP `503`), and `lib/supabase/server.ts` no longer silently returns empty mock data.

---

## 2. Verified Multi-Tenant Isolation Results

- **PostgreSQL Engine Verification (`pg_rls_verification.json`):** `T-DB-1`, `T-DB-2`, `T-DB-3`, `T-DB-6`, `T-DB-8`, `T-DB-9`, `T-DB-10`, and `T-DB-13` proved strict Tenant A vs Tenant B isolation at RLS and SQL RPC layers (`13/13` PASS).
- **HTTP Staging Verification (`staging_api_verification.json`):** `T-API-4` proved cross-tenant attempts return HTTP `403` across `reports/calls`, `bulk-assign`, `notifications/send`, `ai-call`, and `sim-calls`; `T-API-8` confirmed CSV export excludes Tenant B rows (`11/11` PASS).
