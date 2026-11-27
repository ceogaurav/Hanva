-- =============================================================================
-- HANVA CRM Phase 23.2 — Stage E Migration 002
-- Row-Level Security (RLS) Enablement, Tenant Isolation Policies,
-- and SECURITY DEFINER Search-Path + Authorization Hardening
-- =============================================================================

-- 1. Authoritative Role & Tenant Helpers (Never trust mutable user_metadata!)
CREATE OR REPLACE FUNCTION public.current_app_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.current_tenant_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT tenant_id FROM public.users WHERE id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(public.current_app_role() = 'super_admin', false);
$$;

CREATE OR REPLACE FUNCTION public.is_crm_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(
    public.current_app_role() IN ('super_admin', 'tenant_admin', 'owner', 'admin', 'team_leader'),
    false
  );
$$;

-- Hardens legacy scripts/007 is_admin() which trusted auth.jwt()->'user_metadata'->>'role'
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT public.is_crm_admin();
$$;

-- 2. Harden handle_new_user() Auth Trigger (Prevent Signup Role Escalation)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_safe_role text;
BEGIN
  -- Derive initial role strictly from server-controlled app_metadata, never client user_metadata
  v_safe_role := COALESCE(NULLIF(TRIM(new.raw_app_meta_data ->> 'role'), ''), 'telecaller');
  IF v_safe_role NOT IN (
    'super_admin', 'tenant_admin', 'owner', 'admin', 'team_leader',
    'marketing_manager', 'kyc_team', 'telecaller'
  ) THEN
    v_safe_role := 'telecaller';
  END IF;

  INSERT INTO public.users (id, email, full_name, role, phone, tenant_id)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'full_name', new.email),
    v_safe_role,
    new.raw_user_meta_data ->> 'phone',
    CASE
      WHEN (new.raw_app_meta_data ->> 'tenant_id') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      THEN (new.raw_app_meta_data ->> 'tenant_id')::uuid
      ELSE NULL
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    phone = COALESCE(public.users.phone, EXCLUDED.phone);

  RETURN new;
END;
$$;

-- 3. Harden SECURITY DEFINER RPCs with Tenant & Caller Ownership Enforcement
CREATE OR REPLACE FUNCTION public.get_telecaller_lead_counts(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_tenant uuid;
  v_target_tenant uuid;
  v_total int;
  v_new int;
  v_contacted int;
  v_login int;
  v_disbursed int;
BEGIN
  v_caller_tenant := public.current_tenant_id();
  SELECT tenant_id INTO v_target_tenant FROM public.users WHERE id = p_user_id;

  IF NOT public.is_super_admin() THEN
    IF auth.uid() IS NULL THEN
      RAISE EXCEPTION 'Unauthorized';
    END IF;
    IF p_user_id != auth.uid() AND NOT (public.is_crm_admin() AND v_caller_tenant IS NOT NULL AND v_caller_tenant = v_target_tenant) THEN
      RAISE EXCEPTION 'Forbidden: Cannot inspect lead counts outside your scope';
    END IF;
  END IF;

  SELECT count(*) INTO v_total FROM public.leads WHERE assigned_to = p_user_id AND tenant_id = v_target_tenant;
  SELECT count(*) INTO v_new FROM public.leads
    WHERE assigned_to = p_user_id AND tenant_id = v_target_tenant
      AND status IN ('new', 'New Lead', 'New', 'NEW', 'new lead');
  SELECT count(*) INTO v_contacted FROM public.leads
    WHERE assigned_to = p_user_id AND tenant_id = v_target_tenant
      AND status IN ('contacted', 'Contacted', 'Interested', 'interested');
  SELECT count(*) INTO v_login FROM public.leads
    WHERE assigned_to = p_user_id AND tenant_id = v_target_tenant
      AND status IN ('login', 'Login', 'login done', 'Login Done');
  SELECT count(*) INTO v_disbursed FROM public.leads
    WHERE assigned_to = p_user_id AND tenant_id = v_target_tenant
      AND status IN ('disbursed', 'Disbursed', 'converted', 'Converted');

  RETURN json_build_object(
    'total', v_total,
    'new', v_new,
    'contacted', v_contacted,
    'login', v_login,
    'disbursed', v_disbursed
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_next_auto_dial_lead(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_tenant_id uuid;
  v_lead record;
  v_overloaded_agent uuid;
  v_today timestamptz := current_date;
  v_24h_ago timestamptz := now() - interval '24 hours';
BEGIN
  IF auth.uid() IS NULL OR (p_user_id != auth.uid() AND NOT public.is_super_admin()) THEN
    RAISE EXCEPTION 'Forbidden: Auto-dial caller mismatch';
  END IF;

  SELECT tenant_id INTO v_tenant_id FROM public.users WHERE id = p_user_id;
  IF v_tenant_id IS NULL THEN
    RETURN NULL;
  END IF;

  -- Tier 1: Own new leads within same tenant
  SELECT * INTO v_lead FROM public.leads
  WHERE tenant_id = v_tenant_id AND assigned_to = p_user_id AND status ILIKE ANY (ARRAY['New Lead', 'new'])
  ORDER BY
    CASE COALESCE(priority, 'none')
      WHEN 'urgent' THEN 4 WHEN 'high' THEN 3 WHEN 'medium' THEN 2 WHEN 'low' THEN 1 ELSE 0
    END DESC,
    created_at ASC
  LIMIT 1;
  IF FOUND THEN RETURN row_to_json(v_lead); END IF;

  -- Tier 2: Unassigned new leads STRICTLY within same tenant
  SELECT * INTO v_lead FROM public.leads
  WHERE tenant_id = v_tenant_id AND assigned_to IS NULL AND status ILIKE ANY (ARRAY['New Lead', 'new'])
  ORDER BY
    CASE COALESCE(priority, 'none')
      WHEN 'urgent' THEN 4 WHEN 'high' THEN 3 WHEN 'medium' THEN 2 WHEN 'low' THEN 1 ELSE 0
    END DESC,
    created_at ASC
  LIMIT 1;
  IF FOUND THEN
    UPDATE public.leads SET assigned_to = p_user_id WHERE id = v_lead.id AND tenant_id = v_tenant_id;
    v_lead.assigned_to := p_user_id;
    RETURN row_to_json(v_lead);
  END IF;

  -- Tier 3: Overloaded agent ONLY within same tenant
  SELECT assigned_to INTO v_overloaded_agent
  FROM public.leads
  WHERE tenant_id = v_tenant_id
    AND status ILIKE ANY (ARRAY['New Lead', 'new'])
    AND assigned_to IS NOT NULL
    AND assigned_to != p_user_id
  GROUP BY assigned_to
  HAVING count(*) > 5
  LIMIT 1;

  IF FOUND THEN
    SELECT * INTO v_lead FROM public.leads
    WHERE tenant_id = v_tenant_id AND assigned_to = v_overloaded_agent AND status ILIKE ANY (ARRAY['New Lead', 'new'])
    ORDER BY created_at ASC
    LIMIT 1;
    IF FOUND THEN
      UPDATE public.leads SET assigned_to = p_user_id WHERE id = v_lead.id AND tenant_id = v_tenant_id;
      v_lead.assigned_to := p_user_id;
      RETURN row_to_json(v_lead);
    END IF;
  END IF;

  -- Tier 4-7 strictly scoped by tenant_id
  SELECT * INTO v_lead FROM public.leads
  WHERE tenant_id = v_tenant_id AND assigned_to = p_user_id
    AND status ILIKE ANY (ARRAY['Follow Up', 'Contacted', 'follow_up'])
    AND last_contacted < v_today
  ORDER BY last_contacted ASC NULLS FIRST LIMIT 1;
  IF FOUND THEN RETURN row_to_json(v_lead); END IF;

  SELECT l.* INTO v_lead FROM public.leads l
  WHERE l.tenant_id = v_tenant_id AND l.assigned_to = p_user_id
    AND l.status ILIKE ANY (ARRAY['nr', 'Not Reachable'])
    AND (SELECT count(*) FROM public.call_logs cl WHERE cl.lead_id = l.id AND cl.created_at >= v_today) < 4
  ORDER BY l.last_contacted ASC NULLS FIRST LIMIT 1;
  IF FOUND THEN RETURN row_to_json(v_lead); END IF;

  SELECT * INTO v_lead FROM public.leads
  WHERE tenant_id = v_tenant_id AND assigned_to = p_user_id
    AND status ILIKE ANY (ARRAY['Interested', 'interested']) AND last_contacted < v_24h_ago
  ORDER BY last_contacted ASC NULLS FIRST LIMIT 1;
  IF FOUND THEN RETURN row_to_json(v_lead); END IF;

  SELECT * INTO v_lead FROM public.leads
  WHERE tenant_id = v_tenant_id AND assigned_to = p_user_id
    AND status ILIKE ANY (ARRAY['Not Interested', 'Not_Interested', 'recycle_pool']) AND last_contacted < v_today
  ORDER BY last_contacted ASC NULLS FIRST LIMIT 1;
  IF FOUND THEN RETURN row_to_json(v_lead); END IF;

  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.bulk_assign_leads(p_lead_ids uuid[], p_assigned_to uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_assignee_tenant uuid;
  v_caller_tenant uuid;
  v_foreign_count int;
BEGIN
  SELECT tenant_id INTO v_assignee_tenant FROM public.users WHERE id = p_assigned_to;
  IF v_assignee_tenant IS NULL THEN
    RAISE EXCEPTION 'Target assignee or tenant missing';
  END IF;

  -- When invoked via authenticated JWT (non-service-role), enforce admin role & tenant lock
  IF auth.uid() IS NOT NULL AND current_setting('request.jwt.claim.role', true) != 'service_role' THEN
    v_caller_tenant := public.current_tenant_id();
    IF NOT public.is_super_admin() THEN
      IF NOT public.is_crm_admin() OR v_caller_tenant IS DISTINCT FROM v_assignee_tenant THEN
        RAISE EXCEPTION 'Forbidden: Bulk assignment denied across tenant or role boundary';
      END IF;
    END IF;
  END IF;

  SELECT count(*) INTO v_foreign_count
  FROM public.leads
  WHERE id = ANY(p_lead_ids) AND tenant_id IS DISTINCT FROM v_assignee_tenant;

  IF v_foreign_count > 0 THEN
    RAISE EXCEPTION 'Forbidden: Lead selection spans another tenant';
  END IF;

  UPDATE public.leads
  SET assigned_to = p_assigned_to, assigned_at = now(), updated_at = now()
  WHERE id = ANY(p_lead_ids) AND tenant_id = v_assignee_tenant;
END;
$$;

-- 4. Enable RLS on ALL CRM Tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_buffer ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ivr_call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ivr_campaign_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ivr_campaign_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ivr_upload_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_did_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.office_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_face_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_state_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_qa_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_custom_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_master_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_lead_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_score_logs ENABLE ROW LEVEL SECURITY;

-- 5. Drop Insecure Legacy Policies (INCLUDING scripts/001, 002, 007, & WITH CHECK (true) DID policies)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can insert new users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;

DROP POLICY IF EXISTS "Telecallers can view assigned leads" ON public.leads;
DROP POLICY IF EXISTS "Telecallers can update assigned leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;

DROP POLICY IF EXISTS "Super admin can insert DIDs" ON public.tenant_did_registry;
DROP POLICY IF EXISTS "Super admin can update DIDs" ON public.tenant_did_registry;
DROP POLICY IF EXISTS "Super admin can delete DIDs" ON public.tenant_did_registry;
DROP POLICY IF EXISTS "Tenants can read their own DIDs" ON public.tenant_did_registry;

-- Drop legacy global-admin attendance/HR policies from scripts/010
DROP POLICY IF EXISTS "Admins can view all attendance" ON public.attendance;
DROP POLICY IF EXISTS "Admins can insert attendance" ON public.attendance;
DROP POLICY IF EXISTS "Admins can update attendance" ON public.attendance;
DROP POLICY IF EXISTS "Users can view their own attendance" ON public.attendance;
DROP POLICY IF EXISTS "Users can insert their own attendance" ON public.attendance;
DROP POLICY IF EXISTS "Users can update their own attendance" ON public.attendance;

DROP POLICY IF EXISTS "Admins can view all breaks" ON public.breaks;
DROP POLICY IF EXISTS "Admins can insert breaks" ON public.breaks;
DROP POLICY IF EXISTS "Admins can update breaks" ON public.breaks;
DROP POLICY IF EXISTS "Users can view their own breaks" ON public.breaks;
DROP POLICY IF EXISTS "Users can insert their own breaks" ON public.breaks;
DROP POLICY IF EXISTS "Users can update their own breaks" ON public.breaks;

DROP POLICY IF EXISTS "Admins can view all leaves" ON public.leaves;
DROP POLICY IF EXISTS "Admins can update leaves status" ON public.leaves;
DROP POLICY IF EXISTS "Users can view their own leaves" ON public.leaves;
DROP POLICY IF EXISTS "Users can insert their own leaves" ON public.leaves;

DROP POLICY IF EXISTS "Users can view holidays" ON public.holidays;
DROP POLICY IF EXISTS "Admins can manage holidays" ON public.holidays;
DROP POLICY IF EXISTS "Users can view attendance settings" ON public.attendance_settings;
DROP POLICY IF EXISTS "Admins can manage attendance settings" ON public.attendance_settings;
DROP POLICY IF EXISTS "Users can view adjustments for their attendance" ON public.attendance_adjustments;
DROP POLICY IF EXISTS "Admins can view all adjustments" ON public.attendance_adjustments;
DROP POLICY IF EXISTS "Admins can insert adjustments" ON public.attendance_adjustments;

-- 6. Strict Multi-Tenant & Least-Privilege RLS Policies

-- organizations
DROP POLICY IF EXISTS "tenant_org_select" ON public.organizations;
CREATE POLICY "tenant_org_select" ON public.organizations FOR SELECT
  USING (public.is_super_admin() OR id = public.current_tenant_id());

DROP POLICY IF EXISTS "super_admin_org_manage" ON public.organizations;
CREATE POLICY "super_admin_org_manage" ON public.organizations FOR ALL
  USING (public.is_super_admin()) WITH CHECK (public.is_super_admin());

-- users (CRITICAL: self-profile cannot escalate role or tenant_id; admins restricted to own tenant)
DROP POLICY IF EXISTS "users_tenant_select" ON public.users;
CREATE POLICY "users_tenant_select" ON public.users FOR SELECT
  USING (
    public.is_super_admin()
    OR id = auth.uid()
    OR tenant_id = public.current_tenant_id()
  );

DROP POLICY IF EXISTS "users_self_safe_update" ON public.users;
CREATE POLICY "users_self_safe_update" ON public.users FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    AND role = public.current_app_role()
    AND tenant_id IS NOT DISTINCT FROM public.current_tenant_id()
  );

DROP POLICY IF EXISTS "users_admin_manage" ON public.users;
CREATE POLICY "users_admin_manage" ON public.users FOR ALL
  USING (
    public.is_super_admin()
    OR (public.is_crm_admin() AND tenant_id = public.current_tenant_id())
  )
  WITH CHECK (
    public.is_super_admin()
    OR (public.is_crm_admin() AND tenant_id = public.current_tenant_id() AND role <> 'super_admin')
  );

-- leads
DROP POLICY IF EXISTS "leads_tenant_select" ON public.leads;
CREATE POLICY "leads_tenant_select" ON public.leads FOR SELECT
  USING (
    public.is_super_admin()
    OR (
      tenant_id = public.current_tenant_id()
      AND (public.is_crm_admin() OR assigned_to = auth.uid() OR kyc_member_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "leads_tenant_insert" ON public.leads;
CREATE POLICY "leads_tenant_insert" ON public.leads FOR INSERT
  WITH CHECK (
    public.is_super_admin()
    OR tenant_id = public.current_tenant_id()
  );

DROP POLICY IF EXISTS "leads_tenant_update" ON public.leads;
CREATE POLICY "leads_tenant_update" ON public.leads FOR UPDATE
  USING (
    public.is_super_admin()
    OR (
      tenant_id = public.current_tenant_id()
      AND (public.is_crm_admin() OR assigned_to = auth.uid() OR kyc_member_id = auth.uid())
    )
  )
  WITH CHECK (
    public.is_super_admin()
    OR tenant_id = public.current_tenant_id()
  );

DROP POLICY IF EXISTS "leads_admin_delete" ON public.leads;
CREATE POLICY "leads_admin_delete" ON public.leads FOR DELETE
  USING (
    public.is_super_admin()
    OR (public.is_crm_admin() AND tenant_id = public.current_tenant_id())
  );

-- call_logs
DROP POLICY IF EXISTS "Users can view call logs for accessible leads" ON public.call_logs;
DROP POLICY IF EXISTS "Team leads can view team call logs" ON public.call_logs;
DROP POLICY IF EXISTS "Managers can view department call logs" ON public.call_logs;
DROP POLICY IF EXISTS "call_logs_tenant_access" ON public.call_logs;
CREATE POLICY "call_logs_tenant_access" ON public.call_logs FOR ALL
  USING (
    public.is_super_admin()
    OR (
      tenant_id = public.current_tenant_id()
      AND (public.is_crm_admin() OR user_id = auth.uid())
    )
  )
  WITH CHECK (
    public.is_super_admin()
    OR tenant_id = public.current_tenant_id()
  );

-- notifications
DROP POLICY IF EXISTS "notifications_tenant_user_select" ON public.notifications;
CREATE POLICY "notifications_tenant_user_select" ON public.notifications FOR SELECT
  USING (
    public.is_super_admin()
    OR (
      (tenant_id IS NULL OR tenant_id = public.current_tenant_id())
      AND user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "notifications_tenant_user_update" ON public.notifications;
CREATE POLICY "notifications_tenant_user_update" ON public.notifications FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- tenant_did_registry (Fixes scripts/sql WITH CHECK(true) takeover vulnerability)
CREATE POLICY "did_registry_tenant_read" ON public.tenant_did_registry FOR SELECT
  USING (
    public.is_super_admin()
    OR tenant_id = public.current_tenant_id()::text
  );

CREATE POLICY "did_registry_super_admin_write" ON public.tenant_did_registry FOR ALL
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- webhook_buffer (server-only ingestion; super_admin diagnostics only)
DROP POLICY IF EXISTS "webhook_buffer_super_admin_only" ON public.webhook_buffer;
CREATE POLICY "webhook_buffer_super_admin_only" ON public.webhook_buffer FOR ALL
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- Generic Tenant-Isolated Policies for Tenant-Owned Tables
DO $$
DECLARE
  t text;
  tenant_tables text[] := ARRAY[
    'notes', 'follow_ups', 'chat_messages', 'tenant_settings', 'tenant_wallets',
    'wallet_ledger', 'ivr_call_logs', 'ivr_campaign_history', 'ivr_campaign_configs',
    'logins', 'deals', 'site_visits', 'office_locations', 'leave_policies',
    'employee_broadcasts', 'employee_face_data', 'user_targets', 'agent_state_logs',
    'activity_logs', 'audit_logs', 'call_qa_scores', 'call_scripts',
    'interactions', 'lead_custom_fields', 'properties', 'tenant_documents',
    'tenant_master_data', 'portal_credentials', 'automations', 'automation_logs',
    'lead_score_logs', 'holidays', 'attendance_settings',
    'attendance', 'breaks', 'leaves', 'attendance_adjustments'
  ];
BEGIN
  FOREACH t IN ARRAY tenant_tables LOOP
    EXECUTE format('DROP POLICY IF EXISTS "%I_tenant_isolation" ON public.%I;', t, t);
    IF t IN ('tenant_settings', 'tenant_wallets', 'wallet_ledger', 'portal_credentials', 'automations') THEN
      EXECUTE format(
        'CREATE POLICY "%I_tenant_isolation" ON public.%I FOR ALL USING (public.is_super_admin() OR (public.is_crm_admin() AND tenant_id = public.current_tenant_id())) WITH CHECK (public.is_super_admin() OR (public.is_crm_admin() AND tenant_id = public.current_tenant_id()));',
        t, t
      );
    ELSE
      EXECUTE format(
        'CREATE POLICY "%I_tenant_isolation" ON public.%I FOR ALL USING (public.is_super_admin() OR tenant_id = public.current_tenant_id()) WITH CHECK (public.is_super_admin() OR tenant_id = public.current_tenant_id());',
        t, t
      );
    END IF;
  END LOOP;
END $$;

-- Read-only platform catalog tables for authenticated users; super_admin write
DROP POLICY IF EXISTS "global_lead_statuses_read" ON public.global_lead_statuses;
CREATE POLICY "global_lead_statuses_read" ON public.global_lead_statuses FOR SELECT
  USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "global_lead_statuses_write" ON public.global_lead_statuses;
CREATE POLICY "global_lead_statuses_write" ON public.global_lead_statuses FOR ALL
  USING (public.is_super_admin()) WITH CHECK (public.is_super_admin());

DROP POLICY IF EXISTS "system_announcements_read" ON public.system_announcements;
CREATE POLICY "system_announcements_read" ON public.system_announcements FOR SELECT
  USING (auth.uid() IS NOT NULL AND is_active = true);
DROP POLICY IF EXISTS "system_announcements_write" ON public.system_announcements;
CREATE POLICY "system_announcements_write" ON public.system_announcements FOR ALL
  USING (public.is_super_admin()) WITH CHECK (public.is_super_admin());
