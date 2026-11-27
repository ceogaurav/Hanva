# RLS & TENANT ISOLATION REMEDIATION REPORT

**Phase:** 23.1 (Section 6 Database Access Control Remediation)  
**Machine-Readable Full Table Inventory (`54` tables/views):** [`docs/phase23_1/evidence/crm_table_rls_inventory.csv`](./evidence/crm_table_rls_inventory.csv)  
**Ordered Staging Migration:** [`staging_migration_01_rls_and_security_definer.sql`](./evidence/remediation/staging_migration_01_rls_and_security_definer.sql)  
**Staging Rollback Blueprint:** [`staging_rollback_01.sql`](./evidence/remediation/staging_rollback_01.sql)

---

## 1. Key Findings Across All `54` Application & SQL Tables

1. **`public.users` RLS Explicitly Disabled (`CRITICAL`):**
   - Verified in `CRM/scripts/007_fix_users_rls_policies.sql:48`: `alter table public.users disable row level security;`
   - Earlier policies caused infinite recursion (`users` querying `users`). Instead of introducing a `SECURITY DEFINER` tenant-lookup function (`SET search_path = public`), line `15` defined `is_admin()` reading client-writable `auth.jwt() ->> 'user_metadata' ->> 'role'`, and line `48` disabled RLS entirely!
2. **Versioned DDL & RLS Drift (`27` Missing Table Definitions):**
   - `27` tables/views queried by CRM code (`organizations`, `tenant_settings`, `tenant_wallets`, `wallet_ledger`, `notifications`, `webhook_buffer`, `ivr_call_logs`, `ivr_campaign_history`, `ivr_campaign_configs`, `kyc_documents`, `logins`, `employee_broadcasts`, `employee_face_data`, `attendance_selfies`, `activity_logs`, `audit_logs`, `tenant_documents`, `tenant_master_data`, `user_targets`, `agent_leaderboard_view`, etc.) exist only in out-of-band Supabase schema edits with **zero checked-in `CREATE TABLE` or `ENABLE ROW LEVEL SECURITY` scripts in Git**.
3. **Vulnerable `SECURITY DEFINER` RPCs & Triggers:**
   - **`scripts/027_create_telecaller_lead_counts.sql` (`get_telecaller_lead_counts`):** Runs `SECURITY DEFINER` without `SET search_path`, without checking `auth.uid()` or caller `tenant_id`, allowing any authenticated user to read counts of any tenant's `p_user_id`.
   - **`scripts/028_create_auto_dial_rpc.sql` (`get_next_auto_dial_lead`):** Runs `SECURITY DEFINER` without `SET search_path` and queries/steals unassigned or overloaded `leads` **without filtering `tenant_id`** — allowing cross-tenant lead stealing across customer workspaces!
   - **`scripts/032_update_user_trigger_for_phone.sql` (`handle_new_user`):** Reads `COALESCE(new.raw_user_meta_data ->> 'role', 'telecaller')` during Supabase signup, creating a direct user self-escalation vector unless hard-locked to `'telecaller'`.
   - **Out-of-band `bulk_assign_leads` RPC** (called by `app/api/admin/leads/bulk-assign/route.ts:42` using `service_role`): Absent from checked-in SQL scripts; must enforce `p_expected_tenant_id` on both target `leads` and target `users`.

---

## 2. Core Data Tables RLS Coverage Summary

| Table | App Used | DDL In Git | Current RLS / Policy Posture in Git | Required Remediation (In `staging_migration_01`) |
| --- | --- | --- | --- | --- |
| `users` | Yes | Yes (`001`) | **DISABLED (`007` L48)** + unsafe `is_admin()` | Enable RLS; enforce `id = auth.uid() OR tenant_id = get_current_tenant_id()`; prevent self `role`/`tenant_id` change; forbid non-super-admin granting `super_admin` |
| `organizations` | Yes | **Missing** | Unverified out-of-band | Export live DDL + enforce `id = get_current_tenant_id()` SELECT policy for tenant users |
| `leads` | Yes | Partial (`002`) | Legacy `002` policies check `role = 'admin'` without `tenant_id` (`tenant_id` added out-of-band) | Enforce `tenant_id = get_current_tenant_id()` across `SELECT/INSERT/UPDATE/DELETE`; add `idempotency_key` unique index |
| `call_logs` | Yes | Yes (`005, 006`) | `006` joins `users` on `team_id`/`department` without `tenant_id` guard! | Replace with strict `tenant_id = get_current_tenant_id()` + `user_id = auth.uid()`/`admin` policies |
| `follow_ups` / `notes` | Yes | Yes (`003, 004`) | Inherited `leads` accessibility without explicit `tenant_id` check | Add explicit `tenant_id = get_current_tenant_id()` policies |
| `notifications` / `employee_broadcasts` | Yes | **Missing** | Unknown out-of-band | Export live DDL; restrict SELECT to `user_id = auth.uid()` + `tenant_id` |
| `tenant_wallets` / `wallet_ledger` / `tenant_settings` | Yes | **Missing** | Unknown out-of-band | Export live DDL; `SELECT` restricted to `tenant_id = get_current_tenant_id()`; financial mutations (`RECHARGE`, `AI_CALL`, `IVR_CAMPAIGN`) restricted exclusively to verified `service_role` server paths |
| `attendance` / `breaks` / `leaves` / `holidays` | Yes | Yes (`010`) | `010` policies lack `tenant_id` predicate (`role = 'admin'`) | Add `tenant_id = get_current_tenant_id()` predicate to admin policies |
| `deals` / `lead_score_logs` / `site_visits` / `portal_credentials` / `tenant_did_registry` / `ivr_upload_requests` | Yes | Yes (`016-022`, `sql/`) | Properly scoped to `tenant_id = (select tenant_id from users where id = auth.uid())` | Keep policies and switch subquery to hardened `get_current_tenant_id()` helper |

*(Full 54-row CSV: `docs/phase23_1/evidence/crm_table_rls_inventory.csv`)*

---

## 3. Staging Migration Execution Gate

Per **Section 15 & Section 19**: No SQL migrations were executed against `/Users/apple/Downloads/CRM`'s `.env.local` cloud Supabase project. Run `staging_migration_01_rls_and_security_definer.sql` ONLY after schema reconciliation (`pg_dump --schema-only` of missing 27 tables) inside an isolated Supabase staging project.
