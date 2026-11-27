# TENANT ISOLATION & RLS REPORT

**Phase:** 23 (Stage A / Stage B Security Analysis)  
**Target Audited:** `/Users/apple/Downloads/CRM` SQL migrations (`scripts/*.sql`, `sql/*.sql`, `real_estate_schema.sql`) and server/API handlers  
**Status:** **`NON-COMPLIANT FOR PRODUCTION WEBSITE INGESTION`**

---

## 1. Multi-Tenant Data Model Verification

Hanva CRM operates as a multi-tenant SaaS backed by `public.organizations` (`id UUID PRIMARY KEY`) and `tenant_id` foreign keys across operational tables (`users`, `leads`, `deals`, `lead_score_logs`, `site_visits`, `automations`, `portal_credentials`, `ivr_upload_requests`, `notifications`, `call_logs`, `follow_ups`).

Because all Hanva website enquiries must land exclusively inside **Hanva Technologies' own internal sales organization tenant** (never leaked into third-party SaaS customer tenants, and never selectable by website visitors), strict RLS and server-side tenant binding are mandatory.

---

## 2. Verified RLS & Tenant Isolation Defects

### RLS-01: `public.users` Has RLS Explicitly Disabled
- **File:** `CRM/scripts/007_fix_users_rls_policies.sql:48`
- **Statement:** `alter table public.users disable row level security;`
- **Risk:** To resolve an earlier infinite-recursion RLS policy issue, RLS on `public.users` was turned off completely rather than rewritten with a `SECURITY DEFINER` helper (`get_current_tenant_id()`). Any authenticated user or `anon` query (depending on Supabase table grants) can enumerate users, emails, phones, and `tenant_id` values across all organizations.

### RLS-02: Repository Migration Drift on `public.leads`
- **Files:** `CRM/scripts/002_create_leads_table.sql`, `CRM/scripts/025_add_tenant_indexes.sql`, `CRM/scripts/029_create_performance_indexes.sql`
- **Observation:**
  - `002_create_leads_table.sql` defines `public.leads` *without* `tenant_id` and creates policies checking only `assigned_to = auth.uid()` OR `exists (... where role = 'admin')` — zero `tenant_id` predicate!
  - `025_add_tenant_indexes.sql` adds `idx_leads_tenant_id` and mentions ``tenant_id = get_current_tenant_id()`` in comments, yet neither `scripts/` nor `sql/` contains the `ALTER TABLE leads ADD COLUMN tenant_id`, `CREATE FUNCTION get_current_tenant_id()`, or updated tenant-scoped `leads` RLS policies.
- **Risk:** Out-of-band Supabase SQL Editor edits cannot be audited or reproduced cleanly from Git migrations.

### RLS-03: Service-Role API Handlers Bypassing RLS Without Application-Layer Tenant Filters
Even where PostgreSQL RLS exists, CRM API routes use `SUPABASE_SERVICE_ROLE_KEY`, which **bypasses all PostgreSQL RLS policies**:
- `app/api/admin/broadcast/route.ts`: Queries `users` without `.eq('tenant_id', ...)` and trusts client-supplied `currentUserId`.
- `app/api/admin/leads/bulk-assign/route.ts`: Authenticates session user, reads `role` only (not `tenant_id`), and calls `supabase.rpc('bulk_assign_leads', { p_lead_ids, p_assigned_to })` using `service_role`. Unless the uninspected PostgreSQL RPC enforces `tenant_id` internally, a tenant admin in Org A can reassign Org B leads.
- `app/api/telecaller/sim-calls/route.ts:50-54`: Explicitly executes `SELECT id FROM organizations LIMIT 1` as fallback tenant when `tenant_id` is omitted, and accepts any `tenant_id`/`agent_id` in JSON body without session JWT validation.
- `app/actions/routing.ts:67-70`: Updates `leads` filtering only `.eq('id', leadId)` without `.eq('tenant_id', tenantId)`.
- `app/api/webhooks/incoming-leads/route.ts:107`: Hardcodes single-tenant UUID (`576a6280-a9a2-425c-b1dd-eabfff3a00c6`) inside generic webhook code.

---

## 3. Target Architecture Rules for Website-to-CRM Tenant Binding

1. **Zero Client-Supplied Tenant Selection:**
   - The website browser MUST NEVER send `tenant_id`, `organization_id`, `assigned_to`, or `status`.
   - Any client request attempting to pass `tenant_id` or `assigned_to` MUST ignore or reject those fields (`400 Bad Request` / `403 Forbidden` if tampering detected on privileged override fields).
2. **Server-Derived Internal Hanva Tenant Only:**
   - Only the hardened CRM server-side website ingestion endpoint resolves `HANVA_INTERNAL_TENANT_ID` from server configuration (not `organizations LIMIT 1`).
3. **Database RLS Remediation Required:**
   - Included as a ready-to-review standalone SQL blueprint: [`docs/phase23/evidence/proposed_crm_rls_and_idempotency_migration.sql`](./evidence/proposed_crm_rls_and_idempotency_migration.sql).
   - Restores `SECURITY DEFINER SET search_path = public` helper `current_user_tenant_id()`, re-enables `ALTER TABLE public.users ENABLE ROW LEVEL SECURITY`, enforces strict tenant-scoped policies on `users` and `leads`, and adds database-level unique idempotency guarantees.
