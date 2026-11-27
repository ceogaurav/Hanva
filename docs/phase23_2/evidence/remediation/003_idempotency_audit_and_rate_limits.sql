-- =============================================================================
-- HANVA CRM Phase 23.2 — Stage E Migration 003
-- Security Audit Logging, Webhook Idempotency, Distributed Rate Limiting,
-- and Financial/CDR Deduplication Indexes
-- =============================================================================

-- 1. Persistent Security Audit Logs
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  actor_user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  route text NOT NULL,
  outcome text NOT NULL CHECK (outcome IN ('allowed', 'denied', 'error')),
  reason text,
  subject_digest text,
  resource_count integer,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_security_audit_logs_tenant_time
  ON public.security_audit_logs (tenant_id, created_at DESC);

ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "security_audit_logs_read_admin" ON public.security_audit_logs;
CREATE POLICY "security_audit_logs_read_admin" ON public.security_audit_logs FOR SELECT
  USING (
    public.is_super_admin()
    OR (public.is_crm_admin() AND tenant_id = public.current_tenant_id())
  );

-- 2. Shared Persistent Rate Limit Buckets (Supabase fallback when Redis is absent)
CREATE TABLE IF NOT EXISTS public.api_rate_limits (
  bucket_key text PRIMARY KEY,
  window_start timestamptz NOT NULL,
  hit_count integer NOT NULL DEFAULT 1,
  expires_at timestamptz NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_api_rate_limits_expires
  ON public.api_rate_limits (expires_at);

ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;
-- Zero client-side policies: accessed exclusively by server-side service_role guards

-- 3. Website & Webhook Idempotency Store
CREATE TABLE IF NOT EXISTS public.webhook_idempotency_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  source text NOT NULL,
  idempotency_key text NOT NULL,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (tenant_id, source, idempotency_key)
);

ALTER TABLE public.webhook_idempotency_keys ENABLE ROW LEVEL SECURITY;

-- 4. Financial & CDR Replay Prevention Constraints
CREATE UNIQUE INDEX IF NOT EXISTS idx_wallet_ledger_recharge_ref_uniq
  ON public.wallet_ledger (tenant_id, transaction_type, reference_id)
  WHERE reference_id IS NOT NULL AND transaction_type = 'RECHARGE';

CREATE UNIQUE INDEX IF NOT EXISTS idx_ivr_call_logs_batch_dedupe_uniq
  ON public.ivr_call_logs (batch_id, mobile_number, call_duration)
  WHERE batch_id IS NOT NULL;
