# CLOUD STAGING READINESS REPORT

**Current Staging Gap:** `.env.local` in `/Users/apple/Downloads/CRM` targets production cloud Supabase. Phase 24 did **NOT** touch `.env.local`, connect to production Supabase, or provision a paid cloud project without explicit approval.  
**SQL Engine Pre-Validation:** Verified clean `13 / 13` pass on `@electric-sql/pglite` PostgreSQL 19.0 WASM ([phase24_pg_rls_verification.json](./evidence/phase24_pg_rls_verification.json)).

---

## 1. Verified Migration Chain & Reverse Rollback Order

Migrations in `/Users/apple/Downloads/CRM-reconciled/migrations/` require **no framework-specific changes** for Next.js 15.5.29 and apply sequentially in strict idempotent order:

| Step | Script | Purpose & Guarantees | Rollback Companion |
| ---: | --- | --- | --- |
| **1** | `migrations/001_reconciled_missing_tables.sql` | Creates `26` missing app-queried tables (`IF NOT EXISTS`) + adds missing `tenant_id` / alignment columns without destroying existing data | Additive/non-destructive |
| **2** | `migrations/002_rls_and_security_definer_hardening.sql` | Hardens `current_app_role()`, `current_tenant_id()`, `is_super_admin()`, `is_crm_admin()`, `is_admin()`, `handle_new_user()`, `027`/`028` RPCs; re-enables `users` RLS & enables RLS on `49` CRM tables | `migrations/rollback_23_2.sql` |
| **3** | `migrations/003_idempotency_audit_and_rate_limits.sql` | Creates `security_audit_logs`, `api_rate_limits`, `webhook_idempotency_keys`, and unique recharge/CDR dedupe indexes | `migrations/rollback_23_2.sql` |

---

## 2. Mandatory Supabase Staging Preflight Requirements (6 Out-of-Band Objects)

Before declaring cloud staging live, DBA must inspect and verify these 6 database/storage objects in the isolated Supabase project:

| Object | Classification | Required Verification in Cloud Supabase Staging |
| --- | --- | --- |
| **`agent_leaderboard_view`** | Out-of-band SQL view | Confirm underlying joins to `call_logs`/`users` use `WITH (security_invoker = true)` (PostgreSQL 15+) or explicit `REVOKE` so callers cannot bypass base-table RLS |
| **`attendance_selfies`** | Supabase Storage Bucket | Inspect `storage.objects` policies ensuring bucket paths (`<tenant_id>/...`) allow authenticated reads/uploads strictly within own tenant (`current_tenant_id()` or signed URLs) |
| **`kyc_documents`** | Supabase Storage Bucket | Confirm public reads are disabled; uploads via public `/kyc-upload/[token]` flow strictly scoped and non-enumerable; admin/KYC reads enforce tenant boundary |
| **`system_activity_logs`** | Legacy table (`sql/super_admin_extensions.sql`) | Inspect live RLS policy and replace any legacy `user_metadata` check with `public.is_super_admin()` |
| **`auth.users`** | Supabase Auth system table | Audit existing users & `raw_app_meta_data` / `raw_user_meta_data` before enabling trigger `on_auth_user_created`; backfill any orphan auth user into `public.users` prior to strict enforcement |
| **`public.users`** | Core tenant identity table | Confirm every active user has valid non-null `tenant_id` matching `organizations(id)` and valid `role` in allowed CRM set before re-enabling `002` strict RLS |

---

## 3. Required Staging Secrets & Pre-Execution Approval Step

Provision a dedicated free/staging Supabase project (with cloned sanitized schema, **zero** production customer data), populate isolated secrets from `.env.example` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `UPSTASH_REDIS_REST_*`, `QSTASH_*`, vendor sandbox webhook secrets), obtain owner sign-off, and run `psql "$STAGING_DB_URL" -f migrations/00{1,2,3}*.sql`.
