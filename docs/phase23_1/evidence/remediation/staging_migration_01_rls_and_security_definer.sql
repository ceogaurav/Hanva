-- ============================================================================
-- HANVA CRM — ORDERED STAGING SECURITY & TENANT ISOLATION MIGRATION 01
-- Mode: STAGING ONLY — DO NOT RUN ON PRODUCTION WITHOUT OWNER APPROVAL
-- Target: Supabase PostgreSQL (Reconciled staging DB after Git alignment)
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- 1. SAFE SECURITY-DEFINER TENANT CONTEXT & AUTHORIZATION HELPERS
-- ----------------------------------------------------------------------------
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
    AND COALESCE(is_active, true) = true
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_current_tenant_id() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_current_tenant_id() TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.is_current_user_tenant_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users u
    WHERE u.id = auth.uid()
      AND COALESCE(u.is_active, true) = true
      AND u.role IN ('super_admin', 'tenant_admin', 'owner', 'admin')
  );
$$;

REVOKE ALL ON FUNCTION public.is_current_user_tenant_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_current_user_tenant_admin() TO authenticated, service_role;

-- Retire insecure metadata-trusting is_admin() (scripts/007_fix_users_rls_policies.sql)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_current_user_tenant_admin();
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

-- Harden signup trigger (scripts/032): NEVER accept role/tenant_id from user_metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, phone, is_active)
  VALUES (
    new.id,
    new.email,
    COALESCE(NULLIF(trim(new.raw_user_meta_data ->> 'full_name'), ''), new.email),
    'telecaller',
    new.raw_user_meta_data ->> 'phone',
    true
  )
  ON CONFLICT (id) DO UPDATE SET
    phone = EXCLUDED.phone
  WHERE public.users.phone IS NULL;

  RETURN new;
END;
$$;

-- ----------------------------------------------------------------------------
-- 2. RE-ENABLE & ENFORCE TENANT-SCOPED RLS ON public.users (Fixes scripts/007 L48)
-- ----------------------------------------------------------------------------
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can insert new users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Tenant isolation select users" ON public.users;
DROP POLICY IF EXISTS "Tenant isolation self update users" ON public.users;
DROP POLICY IF EXISTS "Tenant admins manage users" ON public.users;

CREATE POLICY "Tenant isolation select users"
ON public.users
FOR SELECT
TO authenticated
USING (
  id = auth.uid()
  OR tenant_id::uuid = public.get_current_tenant_id()
);

-- Self-update allowed ONLY without mutating role or tenant_id (checked via trigger/policy guard)
CREATE POLICY "Tenant isolation self update users"
ON public.users
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (
  id = auth.uid()
  AND tenant_id::uuid = public.get_current_tenant_id()
  AND role = (SELECT u.role FROM public.users u WHERE u.id = auth.uid())
);

CREATE POLICY "Tenant admins manage users"
ON public.users
FOR ALL
TO authenticated
USING (
  tenant_id::uuid = public.get_current_tenant_id()
  AND public.is_current_user_tenant_admin()
)
WITH CHECK (
  tenant_id::uuid = public.get_current_tenant_id()
  AND role <> 'super_admin'
);

-- ----------------------------------------------------------------------------
-- 3. LEADS, CALL_LOGS, NOTES, FOLLOW_UPS, NOTIFICATIONS, AUDIT & RATE-LIMIT RLS
-- ----------------------------------------------------------------------------
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS project text,
  ADD COLUMN IF NOT EXISTS custom_fields jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS idempotency_key text,
  ADD COLUMN IF NOT EXISTS lead_category text,
  ADD COLUMN IF NOT EXISTS consent_timestamp timestamp with time zone;

CREATE UNIQUE INDEX IF NOT EXISTS uq_leads_tenant_idempotency_key
  ON public.leads (tenant_id, idempotency_key)
  WHERE idempotency_key IS NOT NULL;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Telecallers can view assigned leads" ON public.leads;
DROP POLICY IF EXISTS "Telecallers can update assigned leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
DROP POLICY IF EXISTS "Tenant leads select" ON public.leads;
DROP POLICY IF EXISTS "Tenant leads insert" ON public.leads;
DROP POLICY IF EXISTS "Tenant leads update" ON public.leads;
DROP POLICY IF EXISTS "Tenant leads delete" ON public.leads;

CREATE POLICY "Tenant leads select"
ON public.leads
FOR SELECT
TO authenticated
USING (
  tenant_id = public.get_current_tenant_id()
  AND (
    assigned_to = auth.uid()
    OR public.is_current_user_tenant_admin()
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid()
        AND u.tenant_id::uuid = public.leads.tenant_id
        AND u.role IN ('team_leader', 'kyc_team', 'marketing_manager')
    )
  )
);

CREATE POLICY "Tenant leads insert"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (
  tenant_id = public.get_current_tenant_id()
  AND public.is_current_user_tenant_admin()
);

CREATE POLICY "Tenant leads update"
ON public.leads
FOR UPDATE
TO authenticated
USING (
  tenant_id = public.get_current_tenant_id()
  AND (
    assigned_to = auth.uid()
    OR public.is_current_user_tenant_admin()
  )
)
WITH CHECK (
  tenant_id = public.get_current_tenant_id()
);

CREATE POLICY "Tenant leads delete"
ON public.leads
FOR DELETE
TO authenticated
USING (
  tenant_id = public.get_current_tenant_id()
  AND public.is_current_user_tenant_admin()
);

-- Call Logs strict tenant scope
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tenant call_logs select" ON public.call_logs;
DROP POLICY IF EXISTS "Tenant call_logs insert" ON public.call_logs;
CREATE POLICY "Tenant call_logs select"
ON public.call_logs
FOR SELECT
TO authenticated
USING (tenant_id = public.get_current_tenant_id());

CREATE POLICY "Tenant call_logs insert"
ON public.call_logs
FOR INSERT
TO authenticated
WITH CHECK (
  tenant_id = public.get_current_tenant_id()
  AND (user_id = auth.uid() OR public.is_current_user_tenant_admin())
);

-- Security Audit Log Table & Shared Rate Limit Table (Staging DDL)
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  actor_user_id uuid,
  event_type text NOT NULL,
  route text NOT NULL,
  outcome text NOT NULL,
  reason text,
  subject_digest text,
  resource_count integer,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tenant admins view tenant audit logs" ON public.security_audit_logs;
CREATE POLICY "Tenant admins view tenant audit logs"
ON public.security_audit_logs
FOR SELECT
TO authenticated
USING (
  tenant_id = public.get_current_tenant_id()
  AND public.is_current_user_tenant_admin()
);

CREATE TABLE IF NOT EXISTS public.api_rate_limits (
  bucket_key text PRIMARY KEY,
  window_start timestamp with time zone NOT NULL,
  hit_count integer NOT NULL DEFAULT 1,
  expires_at timestamp with time zone NOT NULL
);

ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 4. REMEDIATE SECURITY-DEFINER RPCS (027, 028, bulk_assign_leads)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_telecaller_lead_counts(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_tenant uuid;
  v_target_tenant uuid;
  v_is_admin boolean;
  v_total int;
  v_new int;
  v_contacted int;
  v_login int;
  v_disbursed int;
BEGIN
  v_caller_tenant := public.get_current_tenant_id();
  v_is_admin := public.is_current_user_tenant_admin();
  SELECT tenant_id::uuid INTO v_target_tenant FROM public.users WHERE id = p_user_id;

  IF v_caller_tenant IS NULL OR v_target_tenant IS DISTINCT FROM v_caller_tenant THEN
    RAISE EXCEPTION 'Forbidden: cross-tenant access denied';
  END IF;
  IF p_user_id <> auth.uid() AND NOT v_is_admin THEN
    RAISE EXCEPTION 'Forbidden: insufficient permissions';
  END IF;

  SELECT count(*) INTO v_total FROM leads WHERE tenant_id = v_caller_tenant AND assigned_to = p_user_id;
  SELECT count(*) INTO v_new FROM leads WHERE tenant_id = v_caller_tenant AND assigned_to = p_user_id AND status IN ('new', 'New Lead', 'New', 'NEW', 'new lead');
  SELECT count(*) INTO v_contacted FROM leads WHERE tenant_id = v_caller_tenant AND assigned_to = p_user_id AND status IN ('contacted', 'Contacted', 'Interested', 'interested');
  SELECT count(*) INTO v_login FROM leads WHERE tenant_id = v_caller_tenant AND assigned_to = p_user_id AND status IN ('login', 'Login', 'login done', 'Login Done');
  SELECT count(*) INTO v_disbursed FROM leads WHERE tenant_id = v_caller_tenant AND assigned_to = p_user_id AND status IN ('disbursed', 'Disbursed', 'converted', 'Converted');

  RETURN json_build_object('total', v_total, 'new', v_new, 'contacted', v_contacted, 'login', v_login, 'disbursed', v_disbursed);
END;
$$;

REVOKE ALL ON FUNCTION public.get_telecaller_lead_counts(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_telecaller_lead_counts(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.get_next_auto_dial_lead(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_tenant uuid;
  v_lead record;
BEGIN
  IF auth.uid() IS NULL OR p_user_id IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'Forbidden: caller mismatch';
  END IF;

  v_caller_tenant := public.get_current_tenant_id();
  IF v_caller_tenant IS NULL THEN
    RAISE EXCEPTION 'Forbidden: missing tenant binding';
  END IF;

  -- Strictly scoped to v_caller_tenant ONLY (fixes global cross-tenant lead stealing!)
  SELECT * INTO v_lead
  FROM public.leads
  WHERE tenant_id = v_caller_tenant
    AND assigned_to = p_user_id
    AND status ILIKE ANY (ARRAY['New Lead', 'new'])
  ORDER BY created_at ASC
  LIMIT 1;

  IF FOUND THEN
    RETURN row_to_json(v_lead);
  END IF;

  SELECT * INTO v_lead
  FROM public.leads
  WHERE tenant_id = v_caller_tenant
    AND assigned_to IS NULL
    AND status ILIKE ANY (ARRAY['New Lead', 'new'])
  ORDER BY created_at ASC
  FOR UPDATE SKIP LOCKED
  LIMIT 1;

  IF FOUND THEN
    UPDATE public.leads
    SET assigned_to = p_user_id, updated_at = timezone('utc'::text, now())
    WHERE id = v_lead.id AND tenant_id = v_caller_tenant;
    v_lead.assigned_to := p_user_id;
    RETURN row_to_json(v_lead);
  END IF;

  RETURN NULL;
END;
$$;

REVOKE ALL ON FUNCTION public.get_next_auto_dial_lead(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_next_auto_dial_lead(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.bulk_assign_leads(
  p_lead_ids uuid[],
  p_assigned_to uuid,
  p_expected_tenant_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_updated_count integer;
  v_assignee_tenant uuid;
BEGIN
  SELECT tenant_id::uuid INTO v_assignee_tenant
  FROM public.users
  WHERE id = p_assigned_to AND COALESCE(is_active, true) = true;

  IF v_assignee_tenant IS DISTINCT FROM p_expected_tenant_id THEN
    RAISE EXCEPTION 'Forbidden: target employee does not belong to caller tenant or is inactive';
  END IF;

  UPDATE public.leads
  SET assigned_to = p_assigned_to,
      updated_at = timezone('utc'::text, now())
  WHERE id = ANY(p_lead_ids)
    AND tenant_id = p_expected_tenant_id;

  GET DIAGNOSTICS v_updated_count = ROW_COUNT;
  RETURN v_updated_count;
END;
$$;

REVOKE ALL ON FUNCTION public.bulk_assign_leads(uuid[], uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.bulk_assign_leads(uuid[], uuid, uuid) TO service_role;

COMMIT;
