# SERVICE-ROLE KEY USAGE AUDIT

**Phase:** 23.1 (Section 5 Privileged Access Assessment)  
**Policy Rule:** `SUPABASE_SERVICE_ROLE_KEY` bypasses all PostgreSQL Row Level Security policies. It must NEVER compensate for missing session/HMAC verification or missing `tenant_id` authorization checks.

---

## 1. Revalidated Inventory of Unauthenticated & Weakly Scoped Service-Role Routes

Phase 23 flagged `10` unauthenticated service-role routes; Phase 23.1 inspection confirmed **`12` completely unauthenticated `service_role` routes** plus **`15` additional cron/webhook/admin routes using `service_role` with fail-open checks or missing tenant enforcement (`27` routes total directly importing `SUPABASE_SERVICE_ROLE_KEY`!)**.

### Group A: Completely Unauthenticated `service_role` Routes (Must Remove, Fail Closed, or Gate Strictly)
1. **`app/api/admin/broadcast/route.ts`**: Unauthenticated `service_role` query on `users` trusting JSON `currentUserId` across tenants. **Justification:** NONE for public access — requires session auth + admin role + `eq('tenant_id', sessionTenantId)` + recipient validation (eliminate `service_role` entirely via user-scoped SSR client or restrict via server-verified RPC).
2. **`app/api/admin/fix-checkout/route.ts`**: One-off GET migration helper scanning ALL `attendance` rows globally. **Justification:** Obsolete ad-hoc maintenance script — REMOVE route handler immediately (run offline admin SQL only).
3. **`app/api/admin/fix-ivr-logs/route.ts`**: One-off GET route executing `DELETE` on `call_logs` globally via `service_role`. **Justification:** Dangerous production data-deletion endpoint — REMOVE route handler immediately.
4. **`app/api/telecaller/sim-calls/route.ts`**: Unauthenticated `POST` falling back to `SELECT id FROM organizations LIMIT 1` and writing `call_logs` + `leads`. **Justification:** Mobile clients can authenticate via Supabase Bearer JWT (`supabase.auth.getUser(jwt)`), deriving `agent.id` and `agent.tenant_id` exclusively from session DB row; remove `service_role` fallback once APK sends Bearer JWT.
5. **`app/api/mobile/login/route.ts`**: Uses `service_role` solely to read `users` profile (`id, full_name, email, role, tenant_id, is_active`) right after `signInWithPassword`. **Risk:** Missing per-IP/account brute-force rate limit & exposed internal error messages; use authenticated user's own session token once `users` RLS allows self-select!
6. **`app/api/webhooks/ivr/route.ts`**: Unauthenticated `service_role` route creating random-named leads, wallet debits, and WhatsApp blasts. **Justification:** Legitimate server-to-server provider webhook — MUST verify provider HMAC/token or DID webhook secret + restrict fields per matched `tenant_did_registry` row before using `service_role`.
7. **`app/api/webhooks/c2c/route.ts`**: Unauthenticated `service_role` route mutating `users.current_status`, `call_logs`, `leads`, `wallet_ledger`. Requires provider signature/token verification.
8. **`app/api/webhooks/ai-obd/route.ts`**: Unauthenticated `service_role` wallet debit & `nr` update matching only last 10 phone digits globally (risking wrong-tenant updates when two tenants share a lead phone!).
9. **`app/api/webhooks/inbound-routing/route.ts`**: Unauthenticated sticky agent lookup & `users.current_status = 'on_call'` update without tenant/DID binding.
10. **`app/api/webhooks/trigger-push/route.ts`**: Unauthenticated `push_subscriptions` lookup & web-push send trusting `{ record: { user_id } }` from caller. Must verify Supabase webhook signature header (`X-Supabase-Signature` / shared HMAC bearer) — or better, invoke push internally in authenticated server actions.
11. **`app/api/webhooks/unicorn-call-outcomes/route.ts`**: Zero auth/signature verification (`createClient as createServerClient` alias misleadingly named!) updating `leads` by UUID alone and triggering outbound WhatsApp. Requires signed HMAC bearer + tenant binding.
12. **`app/api/webhooks/whatsapp/route.ts`**: `POST` lets caller pass `?tenant_id=` query parameter and executes `service_role` updates without webhook HMAC verification (`x-hub-signature-256`).

### Group B: Authenticated / Secret-Checked `service_role` Routes With Active Security Flaws
- **`app/api/admin/leads/bulk-assign/route.ts`**: Authenticates user, omits `tenant_id` check, executes `service_role` RPC `bulk_assign_leads`. Fix via `tenant_id` verification + hardened `bulk_assign_leads(..., p_expected_tenant_id)`.
- **`app/api/admin/ai-call/route.ts`**: Authenticates user role, omits `tenant_id` check before reading `leads` and deducting `tenant_wallets`! Filter `.eq('tenant_id', adminTenantId)` and require lead ownership.
- **`app/api/admin/users/route.ts` & `[id]/route.ts`**: Require `service_role` ONLY for `auth.admin.createUser` / `updateUserById`, MUST restrict grantable roles via `assertCanGrantRole(actor.role, requestedRole)` so `tenant_admin` cannot create/promote `super_admin`.
- **`app/api/payments/razorpay/webhook/route.ts`**: Needs `service_role` only after mandatory fail-closed `x-razorpay-signature` HMAC validation (`MISSING_SIGNATURE -> 401`, never skipped!).
- **`app/api/cron/*` (`7` routes)**: Need `service_role` only across multi-tenant batch loops AFTER fail-closed `verifyCronAuthorization()`.
- **`app/actions/whatsapp.ts` & `whatsapp-billing-alerts.ts` & `lib/supabase/server.ts`**: Note `server.ts:27-36` silently falls back to mock proxy if anon env missing, while `service_role` top-level `createClient(url || "placeholder", key || "placeholder")` fails silently instead of failing fast!
