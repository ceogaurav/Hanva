-- =============================================================================
-- HANVA CRM Phase 23.2 — Stage E Migration 001
-- Reconciled Missing Table DDLs & Column Alignments
-- Derived from static inspection of all CRM-reconciled queries (app/, lib/, components/)
-- Safe & Idempotent (CREATE TABLE IF NOT EXISTS / ADD COLUMN IF NOT EXISTS)
-- =============================================================================

-- Core built-in gen_random_uuid() is native in PostgreSQL 13+ (no pgcrypto extension required)

-- 1. Core Tenant Organizations Table
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  plan text NOT NULL DEFAULT 'starter',
  industry text NOT NULL DEFAULT 'general',
  enabled_statuses jsonb NOT NULL DEFAULT '["new", "contacted", "Interested", "Documents_Sent", "Login Done", "Transferred to KYC", "Underwriting", "Approved", "Disbursed", "Not_Interested", "follow_up", "not_eligible", "nr", "self_employed", "recycle_pool"]'::jsonb,
  enabled_modules jsonb NOT NULL DEFAULT '["leads", "dialer", "team", "attendance", "whatsapp", "analytics", "wallboard", "ivr", "files", "logs"]'::jsonb,
  workflow_triggers jsonb NOT NULL DEFAULT '{"on_document_request": "Documents_Sent", "on_kyc_transfer": "Transferred to KYC", "on_revenue_marked": "Disbursed", "on_login_done": "Login Done"}'::jsonb,
  is_suspended boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.organizations
  ADD COLUMN IF NOT EXISTS plan text NOT NULL DEFAULT 'starter',
  ADD COLUMN IF NOT EXISTS industry text NOT NULL DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS enabled_statuses jsonb NOT NULL DEFAULT '["new", "contacted", "Interested", "Documents_Sent", "Login Done", "Transferred to KYC", "Underwriting", "Approved", "Disbursed", "Not_Interested", "follow_up", "not_eligible", "nr", "self_employed", "recycle_pool"]'::jsonb,
  ADD COLUMN IF NOT EXISTS enabled_modules jsonb NOT NULL DEFAULT '["leads", "dialer", "team", "attendance", "whatsapp", "analytics", "wallboard", "ivr", "files", "logs"]'::jsonb,
  ADD COLUMN IF NOT EXISTS workflow_triggers jsonb NOT NULL DEFAULT '{"on_document_request": "Documents_Sent", "on_kyc_transfer": "Transferred to KYC", "on_revenue_marked": "Disbursed", "on_login_done": "Login Done"}'::jsonb,
  ADD COLUMN IF NOT EXISTS is_suspended boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now());

-- Align base tables with multi-tenant columns used in application code
ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS manager_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS team_id uuid,
  ADD COLUMN IF NOT EXISTS department text,
  ADD COLUMN IF NOT EXISTS allow_wfh boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS current_status text NOT NULL DEFAULT 'offline',
  ADD COLUMN IF NOT EXISTS status_reason text,
  ADD COLUMN IF NOT EXISTS status_updated_at timestamptz,
  ADD COLUMN IF NOT EXISTS cloudconnect_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS shift_status text,
  ADD COLUMN IF NOT EXISTS monthly_target numeric(14,2),
  ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT '{}'::jsonb;

ALTER TABLE public.leads
  DROP CONSTRAINT IF EXISTS leads_source_check,
  DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS kyc_member_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS lead_score integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS score integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS loan_amount numeric(14,2),
  ADD COLUMN IF NOT EXISTS disbursed_amount numeric(14,2),
  ADD COLUMN IF NOT EXISTS disbursed_at timestamptz,
  ADD COLUMN IF NOT EXISTS loan_type text,
  ADD COLUMN IF NOT EXISTS project text,
  ADD COLUMN IF NOT EXISTS custom_fields jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS last_message_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_message_content text,
  ADD COLUMN IF NOT EXISTS last_message_type text,
  ADD COLUMN IF NOT EXISTS kyc_reminder_sent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS kyc_requested_at timestamptz;

ALTER TABLE public.call_logs
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS cloudconnect_uuid text,
  ADD COLUMN IF NOT EXISTS call_type text DEFAULT 'outbound',
  ADD COLUMN IF NOT EXISTS duration_seconds integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS talk_time_seconds integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS duration integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS disposition text,
  ADD COLUMN IF NOT EXISTS recording_url text,
  ADD COLUMN IF NOT EXISTS credits_used numeric(10,2) DEFAULT 0;

-- Unique constraint only when cloudconnect_uuid is non-null
CREATE UNIQUE INDEX IF NOT EXISTS idx_call_logs_cloudconnect_uuid_uniq
  ON public.call_logs (cloudconnect_uuid) WHERE cloudconnect_uuid IS NOT NULL;

ALTER TABLE public.notes
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

ALTER TABLE public.follow_ups
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

ALTER TABLE public.chat_messages
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

ALTER TABLE public.deals
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

ALTER TABLE public.site_visits
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

ALTER TABLE public.lead_score_logs
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

ALTER TABLE public.portal_credentials
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

ALTER TABLE public.automations
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

ALTER TABLE public.automation_logs
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

ALTER TABLE public.notification_history
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

ALTER TABLE public.attendance
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;
ALTER TABLE public.breaks
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;
ALTER TABLE public.leaves
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;
ALTER TABLE public.holidays
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;
ALTER TABLE public.attendance_settings
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;
ALTER TABLE public.attendance_adjustments
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE;

-- 2. Tenant Settings
CREATE TABLE IF NOT EXISTS public.tenant_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL UNIQUE REFERENCES public.organizations(id) ON DELETE CASCADE,
  webhook_secret uuid NOT NULL DEFAULT gen_random_uuid(),
  fonada_userid text,
  fonada_password text,
  fonada_waba_number text,
  fonada_client_id text,
  fonada_secret text,
  wa_userid text,
  wa_password text,
  wa_waba_number text,
  whatsapp_api_key text,
  whatsapp_ai_agent_enabled boolean NOT NULL DEFAULT false,
  unicorn_api_key text,
  ivr_digit_auto_assign boolean NOT NULL DEFAULT true,
  auto_dialer_enabled boolean NOT NULL DEFAULT false,
  billing_pulse_seconds integer NOT NULL DEFAULT 15,
  credits_per_pulse numeric(10,2) NOT NULL DEFAULT 1,
  cron_auto_checkout boolean NOT NULL DEFAULT true,
  cron_auto_refill boolean NOT NULL DEFAULT false,
  cron_daily_report boolean NOT NULL DEFAULT false,
  cron_kyc boolean NOT NULL DEFAULT false,
  cron_sla boolean NOT NULL DEFAULT false,
  cron_smart_notifications boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Tenant Wallets & Ledger
CREATE TABLE IF NOT EXISTS public.tenant_wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL UNIQUE REFERENCES public.organizations(id) ON DELETE CASCADE,
  credits_balance numeric(14,2) NOT NULL DEFAULT 0,
  balance numeric(14,2) NOT NULL DEFAULT 0,
  low_balance_threshold numeric(14,2) NOT NULL DEFAULT 1000,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.wallet_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  amount numeric(14,2) DEFAULT 0,
  credits numeric(14,2) NOT NULL,
  transaction_type text NOT NULL,
  description text,
  reference_id text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
  follow_up_id uuid,
  type text NOT NULL DEFAULT 'system',
  title text NOT NULL,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. IVR Buffering, Campaign Configs, Campaign History & Call Logs
CREATE TABLE IF NOT EXISTS public.webhook_buffer (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  payload jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  error_log text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  processed_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.ivr_campaign_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  campaign_name text NOT NULL,
  template_name text,
  did_number text,
  is_active boolean NOT NULL DEFAULT true,
  config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.ivr_campaign_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  campaign_name text NOT NULL,
  lead_batch_name text,
  fonada_lead_id text,
  total_contacts integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'launched',
  last_webhook_received_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.ivr_call_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  batch_id uuid REFERENCES public.ivr_campaign_history(id) ON DELETE SET NULL,
  mobile_number text NOT NULL,
  attempt_num integer NOT NULL DEFAULT 1,
  start_date timestamptz,
  answer_date timestamptz,
  end_date timestamptz,
  call_duration integer NOT NULL DEFAULT 0,
  bill_seconds integer NOT NULL DEFAULT 0,
  disposition text NOT NULL DEFAULT 'UNKNOWN',
  hangup_cause text,
  hangup_code text,
  clid text,
  digits_pressed text,
  credits_used numeric(10,2) NOT NULL DEFAULT 0,
  raw_payload jsonb,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Logins / Bank Applications Pipeline
CREATE TABLE IF NOT EXISTS public.logins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES public.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  phone text,
  bank_name text,
  status text NOT NULL DEFAULT 'Logged In',
  notes text,
  bank_attempts jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. HR, Attendance Extensions, Targets, Agent State, Broadcasts & Face Embeddings
CREATE TABLE IF NOT EXISTS public.office_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  lat numeric(10,7) NOT NULL,
  lng numeric(10,7) NOT NULL,
  radius numeric(8,3) NOT NULL DEFAULT 0.5,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.leave_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  annual_allowances jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.employee_broadcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.employee_face_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  face_embeddings jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.user_targets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_amount numeric(14,2) NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.agent_state_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status text NOT NULL,
  reason text,
  started_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  ended_at timestamptz,
  duration_seconds integer
);

-- 8. Activity, Audit, QA, Scripts, Interactions, Real Estate & Tenant Docs
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  activity_type text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  table_name text NOT NULL,
  record_id text NOT NULL,
  operation text NOT NULL,
  performed_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
  old_data jsonb,
  new_data jsonb,
  changed_fields text[],
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.call_qa_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  call_log_id uuid REFERENCES public.call_logs(id) ON DELETE CASCADE,
  agent_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  evaluator_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  greeting_score integer DEFAULT 0,
  product_knowledge_score integer DEFAULT 0,
  objection_handling_score integer DEFAULT 0,
  total_score integer GENERATED ALWAYS AS (COALESCE(greeting_score, 0) + COALESCE(product_knowledge_score, 0) + COALESCE(objection_handling_score, 0)) STORED,
  comments text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.call_scripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  trigger_status text NOT NULL,
  title text,
  script_text text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  type text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.lead_custom_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  field_key text NOT NULL,
  field_value text
);

CREATE TABLE IF NOT EXISTS public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title text NOT NULL,
  location text,
  type text,
  bhk_config text,
  price numeric(14,2),
  status text NOT NULL DEFAULT 'available',
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS type text,
  ADD COLUMN IF NOT EXISTS bhk_config text,
  ADD COLUMN IF NOT EXISTS price numeric(14,2),
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'available',
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now());

CREATE TABLE IF NOT EXISTS public.tenant_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title text NOT NULL,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size_kb integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.tenant_master_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  source_file_name text NOT NULL,
  payload jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.system_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Note: 'attendance_selfies' and 'kyc_documents' are Supabase Storage Buckets
-- referenced exclusively via supabase.storage.from(...), not PostgreSQL heap tables.
