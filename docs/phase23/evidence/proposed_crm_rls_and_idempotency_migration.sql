-- ============================================================================
-- HANVA CRM — PROPOSED STAGE C/D SECURITY & MULTI-TENANT HARDENING BLUEPRINT
-- Target Repository: /Users/apple/Downloads/CRM (Supabase PostgreSQL)
-- Status: PROPOSAL ONLY — Review & apply in controlled staging first!
-- ============================================================================

BEGIN;

-- 1. Helper: Resolve authenticated caller's tenant_id without RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_tenant_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tenant_id::uuid
  FROM public.users
  WHERE id = auth.uid()
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_current_tenant_id() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_current_tenant_id() TO authenticated, service_role;

-- 2. Re-enable Row Level Security on public.users (fixes scripts/007 line 48 disable)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can insert new users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Tenant isolation select users" ON public.users;
DROP POLICY IF EXISTS "Tenant isolation admin update users" ON public.users;

CREATE POLICY "Tenant isolation select users"
ON public.users
FOR SELECT
TO authenticated
USING (
  id = auth.uid()
  OR tenant_id::uuid = public.get_current_tenant_id()
);

CREATE POLICY "Users update own profile limited"
ON public.users
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (
  id = auth.uid()
  AND tenant_id::uuid = public.get_current_tenant_id()
);

CREATE POLICY "Tenant admins manage tenant users"
ON public.users
FOR ALL
TO authenticated
USING (
  tenant_id::uuid = public.get_current_tenant_id()
  AND EXISTS (
    SELECT 1 FROM public.users u
    WHERE u.id = auth.uid()
      AND u.tenant_id::uuid = public.get_current_tenant_id()
      AND u.role IN ('admin', 'tenant_admin', 'owner', 'super_admin')
  )
)
WITH CHECK (
  tenant_id::uuid = public.get_current_tenant_id()
);

-- 3. Reconcile leads schema & website ingestion columns
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS project text,
  ADD COLUMN IF NOT EXISTS custom_fields jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS idempotency_key text,
  ADD COLUMN IF NOT EXISTS lead_category text,
  ADD COLUMN IF NOT EXISTS consent_timestamp timestamp with time zone;

-- 4. Atomic Idempotency & Deduplication Constraints on leads
CREATE UNIQUE INDEX IF NOT EXISTS uq_leads_tenant_idempotency_key
  ON public.leads (tenant_id, idempotency_key)
  WHERE idempotency_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_leads_tenant_phone_created
  ON public.leads (tenant_id, phone, created_at DESC);

-- 5. Enforce Strict Multi-Tenant RLS on public.leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Telecallers can view assigned leads" ON public.leads;
DROP POLICY IF EXISTS "Telecallers can update assigned leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
DROP POLICY IF EXISTS "Tenant isolation leads select" ON public.leads;
DROP POLICY IF EXISTS "Tenant isolation leads insert" ON public.leads;
DROP POLICY IF EXISTS "Tenant isolation leads update" ON public.leads;
DROP POLICY IF EXISTS "Tenant isolation leads delete" ON public.leads;

CREATE POLICY "Tenant isolation leads select"
ON public.leads
FOR SELECT
TO authenticated
USING (
  tenant_id = public.get_current_tenant_id()
  AND (
    assigned_to = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid()
        AND u.tenant_id::uuid = public.leads.tenant_id
        AND u.role IN ('admin', 'tenant_admin', 'team_leader', 'owner', 'super_admin')
    )
  )
);

CREATE POLICY "Tenant isolation leads insert"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (
  tenant_id = public.get_current_tenant_id()
  AND EXISTS (
    SELECT 1 FROM public.users u
    WHERE u.id = auth.uid()
      AND u.tenant_id::uuid = public.leads.tenant_id
      AND u.role IN ('admin', 'tenant_admin', 'team_leader', 'owner', 'super_admin')
  )
);

CREATE POLICY "Tenant isolation leads update"
ON public.leads
FOR UPDATE
TO authenticated
USING (
  tenant_id = public.get_current_tenant_id()
  AND (
    assigned_to = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid()
        AND u.tenant_id::uuid = public.leads.tenant_id
        AND u.role IN ('admin', 'tenant_admin', 'team_leader', 'owner', 'super_admin')
    )
  )
)
WITH CHECK (
  tenant_id = public.get_current_tenant_id()
);

CREATE POLICY "Tenant isolation leads delete"
ON public.leads
FOR DELETE
TO authenticated
USING (
  tenant_id = public.get_current_tenant_id()
  AND EXISTS (
    SELECT 1 FROM public.users u
    WHERE u.id = auth.uid()
      AND u.tenant_id::uuid = public.leads.tenant_id
      AND u.role IN ('admin', 'tenant_admin', 'owner', 'super_admin')
  )
);

COMMIT;
