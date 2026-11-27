# CRM AUTHENTICATION AND API REMEDIATION REPORT

**Scope Assessed & Remediated:** **53 / 53** API route files (`app/api/**/route.ts`) plus `middleware.ts` & `lib/supabase/middleware.ts`.  
**Full Reconciled Inventory:** [evidence/crm_api_inventory_reconciled.csv](./evidence/crm_api_inventory_reconciled.csv)  
**Verified Zero Unguarded Routes:** `auth_mechanism = NONE` count = **0 / 53**.

---

## 1. Centralized Security Guard Layer (`lib/security/crm-guards.ts`)

All route handlers now share a strict, fail-closed library (`lib/security/crm-guards.ts`, `535` lines):
- **`requireAuthenticatedSession(request)`:** Resolves caller from SSR Supabase cookies OR explicit `Authorization: Bearer <jwt>`, validates token with `supabaseAdmin.auth.getUser(token)`, then loads `{ id, email, full_name, role, tenant_id, is_active }` **exclusively from database `public.users`** (never `user_metadata`), failing closed with `401` (unauthenticated), `403` (missing/disabled profile or missing tenant/role), or `503` (missing Supabase env config).
- **`requireTenantAdmin({ request, allowedRoles, requestedTenantId })`:** Enforces DB role membership (default: `super_admin`, `tenant_admin`, `owner`, `admin`, `team_leader`) and rejects cross-tenant `requestedTenantId` overrides from non-`super_admin` callers with `403`.
- **`assertCanGrantRole(actorRole, targetRole)`:** Prevents horizontal/vertical privilege escalation (`tenant_admin` cannot grant `super_admin` or `owner`; `admin` cannot grant `super_admin`, `owner`, or `tenant_admin`).
- **`verifyCronAuthorization(request)`:** Enforces strict `requireServerSecret("CRON_SECRET", 16)` + `constantTimeEquals` against `Authorization: Bearer` header—eliminating `Bearer undefined` bypasses and `?key=` URL query secret leakage.

---

## 2. Route-by-Route Remediations Across Categories

| Route Group (Count) | Previous Vulnerability | Reconciled Phase 23.2 Control | Verification Result |
| --- | --- | --- | --- |
| **Admin Routes (`17`)** | Unauthenticated `broadcast`, `fix-checkout` & `fix-ivr-logs` GET mutations, `reports/calls` cross-tenant override, `users` escalation | All 17 protected by `requireTenantAdmin`; `fix-checkout` & `fix-ivr-logs` changed to POST-only `super_admin` (`405` on GET); `leads/export` adds `csvSafeCell` formula neutralization (`=+\-@\t\r`); new `holidays` proxy | `[T-API-1]`, `[T-API-2]`, `[T-API-3]`, `[T-API-4]`, `[T-API-8]` PASS |
| **User / Agent Routes (`7`)** | Unauthenticated `assistant`, `click-to-call`, `companies/search`, `kyc-members`, unvalidated `notifications/send`, `transfer-lead` | Enforced `requireAuthenticatedSession` (`401` unauth); `notifications/send` validates `userIds` tenant ownership BEFORE VAPID checks; `transfer-lead` & `click-to-call` bind `actor.tenantId` | `[T-API-1]`, `[T-API-3]`, `[T-API-4]` PASS |
| **Mobile Routes (`2`)** | `/api/telecaller/sim-calls` unauthenticated + `organizations LIMIT 1` cross-tenant fallback; `/api/mobile/login` lacked rate limiting | `login`: rate-limited (`10 / 300s`), audits outcome, returns `token`, `access_token`, `refresh_token`; `sim-calls`: requires Bearer JWT, derives `tenantId` & `agent_id` from DB, rejects spoofed `tenant_id` (`403`), deduplicates identical call timestamps | `[T-API-4]`, `[T-API-5]`, `[T-API-10]` PASS |
| **Cron & Debug Routes (`10`)** | 5 crons allowed `"Bearer undefined"`; `daily-report` & `debug/daily-report` leaked secrets via `?key=` and echoed key prefix + emails | All 9 `/api/cron/*` + `/api/debug/daily-report` enforce `verifyCronAuthorization` (Bearer header only, `401`/`503`); redacted debug diagnostics (`0` PII emails, `0` key prefixes) | `[T-API-6]` PASS |
| **Webhooks (`17`)** | Razorpay fail-open without header; CloudConnect hardcoded key; unauthenticated `ivr`, `c2c`, `ai-obd`, `fonada`, `unicorn`, `trigger-push` | All 17 enforce HMAC, QStash signature (`503` when keys absent), per-tenant Bearer `constantTimeEquals`, or strict shared secret + replay/idempotency protections | `[T-API-7]`, `[T-API-9]` PASS |
| **Edge Middleware (`middleware.ts`, `lib/supabase/middleware.ts`)** | `api/*` paths slipped into HTML redirects or relied solely on route checks | Public API allowlist limited solely to cron/webhook/mobile-login/debug endpoints (all strictly self-guarded); all other `/api/*` requests without SSR session OR Bearer header fail closed with JSON `401` | Verified across `T-API-1`–`T-API-10` |
