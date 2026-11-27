# RLS AND DATABASE FUNCTION HARDENING REPORT

**SQL Hardening Target:** `migrations/002_rls_and_security_definer_hardening.sql`  
**Verification Engine:** Real PostgreSQL 19.0 (`@electric-sql/pglite`) via `pg_rls_verify.mjs` (**13 / 13 PASS**).

---

## 1. Privilege-Escalation & Auth Helper Fixes

- **Dropped `user_metadata` Trust Across DB Layer:** Replaced client-editable `auth.jwt()->'user_metadata'->>'role'` checks inside `current_app_role()`, `current_tenant_id()`, `is_super_admin()`, `is_crm_admin()`, and `is_admin()` with `SECURITY DEFINER STABLE SET search_path = public` lookups strictly querying `public.users WHERE id = auth.uid() AND COALESCE(is_active, true) = true`.
- **Hardened `handle_new_user()` (`scripts/032` vulnerability fixed):** Ignores signup `raw_user_meta_data` role overrides (`COALESCE(v_role, 'telecaller')` restricted only when trusted server claim or admin provisioning permits; default `'telecaller'`, verified in `T-DB-7`).
- **`public.users` RLS Re-Enabled & Hardened:** Reversed `scripts/007` disabled state; `users_self_safe_update` strictly enforces `role = public.current_app_role()` AND `tenant_id IS NOT DISTINCT FROM public.current_tenant_id()` (`T-DB-4`); `users_admin_manage` enforces same-tenant scope and blocks non-`super_admin` creation/promotion of `super_admin`.

---

## 2. `SECURITY DEFINER` RPCs & Dangerous Policy Cleanups

1. **Tenant-Locked Dialer & Assignment RPCs (`scripts/027` & `028`):**
   - `get_telecaller_lead_counts(p_user_id)`: Raises exception if caller tries inspecting a user outside `current_tenant_id()` unless `is_super_admin()` (`T-DB-9`).
   - `get_next_auto_dial_lead(p_user_id)`: Locks lead assignment strictly to `caller_tenant`, prevents calling for foreign users (`T-DB-8`), and preserves atomic queue skip-locked fairness.
   - `bulk_assign_leads(p_lead_ids, p_assigned_to)`: Verifies callee & admin share tenant AND rejects any array containing leads from another tenant (`T-DB-10`).
2. **Permissive DID Takeover & Cross-Tenant HR Policies Dropped:**
   - Dropped `WITH CHECK (true)` / `USING (true)` policies from `sql/ivr_did_registry_rls_fix.sql`; replaced with `did_registry_tenant_read` + `did_registry_super_admin_write` (`T-DB-5`).
   - Dropped legacy `scripts/010` global-admin HR policies on `attendance`, `breaks`, `leaves`, `holidays`, `attendance_settings`, and `attendance_adjustments`; replaced with strict `tenant_id = current_tenant_id()` policies (`T-DB-13`).
3. **Financial & Sensitive Tables:** `tenant_settings`, `tenant_wallets`, `wallet_ledger`, `portal_credentials`, and `automations` restrict client read/write to `is_super_admin() OR (is_crm_admin() AND tenant_id = current_tenant_id())` (`T-DB-6`).
