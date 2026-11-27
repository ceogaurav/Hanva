# CRM SCHEMA RECONCILIATION AND MIGRATION REPORT

**Migrations Authored:** `migrations/001_reconciled_missing_tables.sql`, `migrations/002_rls_and_security_definer_hardening.sql`, `migrations/003_idempotency_audit_and_rate_limits.sql`, `migrations/rollback_23_2.sql` inside `/Users/apple/Downloads/CRM-reconciled`.  
**Full Reconciled Inventory:** [evidence/crm_table_rls_reconciled.csv](./evidence/crm_table_rls_reconciled.csv) (`57` entries).

---

## 1. Schema Drift Discovered & Remediated During Real Engine Testing

Executing the legacy SQL chain in PostgreSQL (`PGlite 19.0 WASM`) surfaced historical broken assumptions invisible in static inspection:
1. **`26` App-Queried Base Tables Missing Versioned DDL:** `organizations`, `tenant_settings`, `tenant_wallets`, `wallet_ledger`, `notifications`, `webhook_buffer`, `ivr_campaign_configs`, `ivr_campaign_history`, `ivr_call_logs`, `logins`, `office_locations`, `leave_policies`, `employee_broadcasts`, `employee_face_data`, `user_targets`, `agent_state_logs`, `activity_logs`, `audit_logs`, `call_qa_scores`, `call_scripts`, `interactions`, `lead_custom_fields`, `properties`, `tenant_documents`, `tenant_master_data`, `system_announcements`. Reconstructed safely in `001` with `CREATE TABLE IF NOT EXISTS`.
2. **Broken Legacy FK & Missing `tenant_id` Columns:**
   - `scripts/016_create_deals_table.sql` references `public.properties(id)`, which had no Git DDL (`001` creates `public.properties` before `deals`).
   - Legacy scripts `007`, `009`, `010`, `016`, `017`, `018`, `019`, and `022` omitted `tenant_id` in base table creation or needed idempotent `ALTER TABLE ... ADD COLUMN IF NOT EXISTS tenant_id` alignment.
3. **Invalid Operator Bug in `scripts/007`:** `scripts/007_fix_users_rls_policies.sql` contained broken JSON operator syntax (`->> 'user_metadata' ->> 'role'`) before disabling `public.users` RLS (`ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;`). Fixed by dropping legacy policies cleanly and never relying on `scripts/007`.
4. **Storage Buckets vs Base Tables Clarified:** Documented in `001` & `crm_table_rls_reconciled.csv` that `attendance_selfies` and `kyc_documents` operate as Supabase Storage buckets (checked manually on `storage.objects`), while `agent_leaderboard_view` is an out-of-band SQL view and `system_activity_logs` originates in `sql/super_admin_extensions.sql`.

---

## 2. Reconciled Migration Chain & Verification

| Migration File | Purpose | PGlite 19.0 Status |
| --- | --- | --- |
| `migrations/001_reconciled_missing_tables.sql` | Idempotent `CREATE TABLE IF NOT EXISTS` for `26` missing base tables + `ADD COLUMN IF NOT EXISTS` column alignments | Executed cleanly |
| `migrations/002_rls_and_security_definer_hardening.sql` | Hardens `5` role/tenant helpers + `handle_new_user()` + `3` RPCs; enables RLS on `49` CRM tables (including `users`); drops insecure legacy & `WITH CHECK (true)` policies | **13/13** functional checks PASS |
| `migrations/003_idempotency_audit_and_rate_limits.sql` | Creates `security_audit_logs`, `api_rate_limits`, `webhook_idempotency_keys` (all RLS enabled) + unique indexes (`idx_wallet_ledger_recharge_ref_uniq`, `idx_ivr_call_logs_batch_dedupe_uniq`) | Executed + duplicate recharge blocked (`T-DB-11`) |
| `migrations/rollback_23_2.sql` | Cleanly removes `003` tables/indexes, `002` policies, and `CASCADE`-drops Phase 23.2 SQL functions | Executed cleanly (`T-DB-12`) |
