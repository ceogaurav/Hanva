-- =============================================================================
-- HANVA CRM Phase 23.2 — Stage E Reversible Rollback Script
-- Reverts 003 objects, 002 policies/functions cleanly inside a transaction
-- Note: Preserves core existing CRM tables; only removes Phase 23.2 added
-- security tables/policies/indexes cleanly for verified staging rollback.
-- =============================================================================

BEGIN;

DROP INDEX IF EXISTS public.idx_ivr_call_logs_batch_dedupe_uniq;
DROP INDEX IF EXISTS public.idx_wallet_ledger_recharge_ref_uniq;
DROP TABLE IF EXISTS public.webhook_idempotency_keys;
DROP TABLE IF EXISTS public.api_rate_limits;
DROP TABLE IF EXISTS public.security_audit_logs;

DROP POLICY IF EXISTS "did_registry_super_admin_write" ON public.tenant_did_registry;
DROP POLICY IF EXISTS "did_registry_tenant_read" ON public.tenant_did_registry;
DROP POLICY IF EXISTS "users_admin_manage" ON public.users;
DROP POLICY IF EXISTS "users_self_safe_update" ON public.users;
DROP POLICY IF EXISTS "users_tenant_select" ON public.users;
DROP POLICY IF EXISTS "leads_admin_delete" ON public.leads;
DROP POLICY IF EXISTS "leads_tenant_update" ON public.leads;
DROP POLICY IF EXISTS "leads_tenant_insert" ON public.leads;
DROP POLICY IF EXISTS "leads_tenant_select" ON public.leads;

DROP FUNCTION IF EXISTS public.bulk_assign_leads(uuid[], uuid) CASCADE;
DROP FUNCTION IF EXISTS public.is_crm_admin() CASCADE;
DROP FUNCTION IF EXISTS public.is_super_admin() CASCADE;
DROP FUNCTION IF EXISTS public.current_tenant_id() CASCADE;
DROP FUNCTION IF EXISTS public.current_app_role() CASCADE;

COMMIT;
