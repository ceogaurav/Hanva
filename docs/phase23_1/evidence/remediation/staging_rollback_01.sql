-- ============================================================================
-- HANVA CRM — STAGING ROLLBACK & POST-MIGRATION VERIFICATION SCRIPT
-- Mode: STAGING RECOVERY BLUEPRINT
-- ============================================================================

-- 1. PRE-MIGRATION SNAPSHOT VERIFICATION QUERIES (Read-Only):
-- SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
-- SELECT proname, prosecdef, proconfig FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace WHERE n.nspname = 'public' AND prosecdef = true;
-- SELECT id, email, role, tenant_id FROM public.users WHERE tenant_id IS NULL;

-- 2. CONTROLLED ROLLBACK STATEMENTS (if staging regression requires revert):
BEGIN;

DROP POLICY IF EXISTS "Tenant isolation select users" ON public.users;
DROP POLICY IF EXISTS "Tenant isolation self update users" ON public.users;
DROP POLICY IF EXISTS "Tenant admins manage users" ON public.users;

DROP POLICY IF EXISTS "Tenant leads select" ON public.leads;
DROP POLICY IF EXISTS "Tenant leads insert" ON public.leads;
DROP POLICY IF EXISTS "Tenant leads update" ON public.leads;
DROP POLICY IF EXISTS "Tenant leads delete" ON public.leads;

DROP POLICY IF EXISTS "Tenant call_logs select" ON public.call_logs;
DROP POLICY IF EXISTS "Tenant call_logs insert" ON public.call_logs;

DROP FUNCTION IF EXISTS public.bulk_assign_leads(uuid[], uuid, uuid);
DROP FUNCTION IF EXISTS public.is_current_user_tenant_admin();

-- Restore staging backup taken via pg_dump before executing migration_01 if legacy behavior needed.
COMMIT;
