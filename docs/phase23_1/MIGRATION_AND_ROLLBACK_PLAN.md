# STAGING MIGRATION & ROLLBACK PLAN

**Phase:** 23.1 (Section 15 Database Cutover Blueprint)  
**Migration Script:** [`staging_migration_01_rls_and_security_definer.sql`](./evidence/remediation/staging_migration_01_rls_and_security_definer.sql)  
**Rollback Script:** [`staging_rollback_01.sql`](./evidence/remediation/staging_rollback_01.sql)  
**Execution Status:** **`NOT RUN ON PRODUCTION (BLOCKED — STAGING PROVISIONING REQUIRED)`**

---

## 1. Pre-Migration Requirements

1. **Provision Isolated Staging Supabase Project:** Never execute Phase 23.1 migrations against `/Users/apple/Downloads/CRM/.env.local`'s current cloud Supabase instance.
2. **Capture Authoritative Schema Snapshot:** Export live DDL (`pg_dump --schema-only`) from authoritative DB and commit definitions for all `27` missing tables (`organizations`, `tenant_settings`, `tenant_wallets`, `wallet_ledger`, `notifications`, etc.) and existing `bulk_assign_leads` RPC so versioned Git scripts match reality.
3. **Data Integrity Pre-Checks (Read-Only):**
   - Identify any orphan `users` or `leads` rows with `tenant_id IS NULL`.
   - Confirm no duplicate `(tenant_id, idempotency_key)` values exist before creating unique index.
4. **Full Database Snapshot Backup:** Take recoverable PostgreSQL dump / point-in-time snapshot prior to staging migration.

---

## 2. Ordered Migration Execution Sequence

1. Run **Section 1** of `staging_migration_01_rls_and_security_definer.sql` (safe `SECURITY DEFINER` helpers with `SET search_path = public` + `handle_new_user()` hardcoded `'telecaller'` role trigger).
2. Run **Section 2** (`ALTER TABLE public.users ENABLE ROW LEVEL SECURITY` + non-recursive tenant policies via `get_current_tenant_id()`).
3. Run **Section 3** (`leads` schema columns + idempotency unique index + strict `tenant_id` policies on `leads`, `call_logs`, `security_audit_logs`, `api_rate_limits`).
4. Run **Section 4** (remediated `get_telecaller_lead_counts`, `get_next_auto_dial_lead`, `bulk_assign_leads` with `REVOKE ALL FROM PUBLIC`).
5. **Post-Migration Verification Queries:**
   - Verify `rowsecurity = true` in `pg_tables` across `users`, `leads`, `call_logs`, `notes`, `follow_ups`, `security_audit_logs`.
   - Verify every `SECURITY DEFINER` function in `pg_proc` has non-null `proconfig` (`search_path=public`).
6. **Application Compatibility Impact:** Requires CRM server routes using `is_admin()` (`user_metadata`) or unauthenticated `/api/telecaller/sim-calls` or admin/users client profile queries to run alongside the hardened API/RBAC patch (`crm_security_guard_reference.ts`) and Android APK v2.

---

## 3. Rollback & Production Secret Rotation Plan (Requires Owner Approval)

- **SQL Rollback:** Execute [`staging_rollback_01.sql`](./evidence/remediation/staging_rollback_01.sql) or restore pre-migration `pg_dump` snapshot cleanly inside staging.
- **Planned Credential Rotation Schedule (ZERO Live Rotations Executed):**
  1. Rotate Supabase `SUPABASE_SERVICE_ROLE_KEY` if ever shared loosely; revoke `test_unicorn_api.js` test password.
  2. Rotate committed/exposed third-party secrets **after** removing fallbacks from code and purging Git history (`git-filter-repo`): Fonada WABA Bearer tokens (`fsk_...`), `FONADA_USERID`/`PASSWORD`, `FONADA_OBD_UKEY`, Resend `RESEND_API_KEY`, `CRON_SECRET`, `CLOUDCONNECT_WEBHOOK_SECRET`, `CLOUDCONNECT_API_TOKEN`, `OZONETEL_API_KEY` + portal password, and client-exposed Calendarific `API_KEY`.
