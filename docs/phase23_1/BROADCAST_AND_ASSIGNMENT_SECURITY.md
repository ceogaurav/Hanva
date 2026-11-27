# BROADCAST & LEAD ASSIGNMENT SECURITY REPORT

**Phase:** 23.1 (Section 7 Cross-Tenant Action Audit)  
**Inspected Paths:** `CRM/app/api/admin/broadcast/route.ts`, `CRM/app/api/admin/leads/bulk-assign/route.ts`, `CRM/app/actions/routing.ts`, `CRM/app/api/transfer-lead/route.ts`, `CRM/lib/kyc-utils.ts`

---

## 1. Broadcast Endpoint (`/api/admin/broadcast`)

### Verified Vulnerabilities
1. **Zero Session Auth:** No `supabase.auth.getUser()` call; accepts caller-supplied `{ currentUserId, title, message, targetRole }` directly in JSON request body.
2. **Service-Role Cross-Tenant Exposure:** Instantiates `SUPABASE_SERVICE_ROLE_KEY` client at top level, queries `users` globally for `currentUserId`, then fetches target recipients `.from('users').select('id, role')` **without `.eq('tenant_id', sender.tenant_id)`** — broadcasting announcements and `employee_broadcasts` / push payloads across OTHER companies' employees!
3. **Zero Input Bounds / Safe Audit:** Unbounded `title`/`message` strings, zero rate limiting, and zero security audit log (`actor`, `tenant_id`, `recipient_count`).

### Required Hardening Design
1. Derive `actor` exclusively via `await supabase.auth.getUser()`; load verified DB profile `{ id, role, tenant_id, is_active }`.
2. Enforce `['super_admin', 'tenant_admin', 'owner', 'admin', 'team_leader'].includes(profile.role)` and disallow caller-supplied `currentUserId` / `tenant_id` override (unless `super_admin` explicitly scoped).
3. Filter target recipients strictly `.eq('tenant_id', effectiveTenantId).eq('is_active', true)` and restrict `targetIds` against same-tenant rows (reject non-matching IDs cleanly with `403`).
4. Apply distributed rate limiting (`5` broadcasts / `5 min` / tenant) + emit redacted `security_audit_logs` entry (`broadcast_executed`).

---

## 2. Lead Bulk Assignment & Round-Robin / KYC Transfer

### Verified Vulnerabilities
1. **`/api/admin/leads/bulk-assign`:** Checks authenticated admin role, omits `.select("tenant_id")` and omits tenant ownership check, calls `supabaseAdmin.rpc('bulk_assign_leads', { p_lead_ids, p_assigned_to })` and inserts `notifications` using `service_role`. An admin in Org A can hijack Org B leads or assign Org A leads to an Org B user.
2. **`app/actions/routing.ts:67-70`:** `assignLeadRoundRobin(tenantId, leadId)` filters agents by `tenantId`, then runs `.update({ assigned_to: selectedAgentId, status: 'new' }).eq('id', leadId)` without `.eq('tenant_id', tenantId)`.
3. **`/api/transfer-lead` + `lib/kyc-utils.ts:58-70`:** Trusts `leadId` and `kycMemberId` from body without verifying `lead.tenant_id === user.tenant_id` or that `kycMemberId` belongs to the same active tenant & `kyc_team` role.
4. **`scripts/028_create_auto_dial_rpc.sql` (`get_next_auto_dial_lead`):** `SECURITY DEFINER` RPC reassigns leads across tenants due to missing `WHERE tenant_id = v_caller_tenant`.

### Required Hardening Design
1. Validate UUID array lengths (`1..500`), verify caller `tenant_id` from verified DB profile, confirm `p_assigned_to` is an active member of `effectiveTenantId`, and enforce `WHERE id = ANY(p_lead_ids) AND tenant_id = p_expected_tenant_id` inside SQL RPC (`staging_migration_01_rls_and_security_definer.sql`).
2. Verify returned update count matches or log partial/mismatched ownership cleanly as `403`, record `lead_bulk_assigned` audit event, and add `tenant_id` to notification insert.
3. Scope `routing.ts`, `transferLeadToKyc`, and `get_next_auto_dial_lead` identically by `tenant_id`.
