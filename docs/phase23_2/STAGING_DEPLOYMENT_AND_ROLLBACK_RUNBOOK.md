# STAGING DEPLOYMENT AND ROLLBACK RUNBOOK

**Target Codebase:** `/Users/apple/Downloads/CRM-reconciled` (branch `security/phase-23-2-reconciled` @ `122466d`)

---

## 1. Pre-Deployment Prerequisites

1. **Provision Isolated Staging Supabase & Services:** Create a dedicated Supabase project (NOT live production `.env.local`). Optionally provision staging Upstash Redis and QStash keys.
2. **Generate Unique Staging Secrets (from `.env.example`):**
   - Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
   - Generate `>= 32`-byte random hex tokens for `CRON_SECRET`, `INCOMING_LEADS_HMAC_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `CLOUDCONNECT_WEBHOOK_SECRET`, `FONADA_WEBHOOK_SECRET`, `OZONETEL_WEBHOOK_SECRET`, `UNICORN_WEBHOOK_SECRET`, `INTERNAL_WEBHOOK_SECRET`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_APP_SECRET`.
   - Set `WEBSITE_LEAD_INGEST_BEARER`, `WEBSITE_LEAD_HMAC_SECRET`, and `HANVA_INTERNAL_TENANT_ID` only during staging signed-gateway tests.

---

## 2. Database Migration Sequence (Staging Supabase)

Execute in exact order (after inspecting pre-existing production-clone schema & taking a pg_dump snapshot):
1. `psql "$STAGING_DB_URL" -f migrations/001_reconciled_missing_tables.sql` (adds missing base tables + missing `tenant_id`/column alignments).
2. `psql "$STAGING_DB_URL" -f migrations/002_rls_and_security_definer_hardening.sql` (re-enables `users` RLS, drops permissive/legacy policies, enables RLS on all `49` base tables, hardens `SECURITY DEFINER` RPCs and `handle_new_user()`).
3. `psql "$STAGING_DB_URL" -f migrations/003_idempotency_audit_and_rate_limits.sql` (adds `security_audit_logs`, `api_rate_limits`, `webhook_idempotency_keys`, unique dedupe indexes).

### Post-Migration Manual Supabase Checks
- Verify `agent_leaderboard_view` uses `security_invoker = true` (or restrict grant).
- Verify `system_activity_logs` legacy policy references `public.is_super_admin()` rather than `user_metadata`.
- Verify Supabase Storage buckets `attendance_selfies` and `kyc_documents` (`storage.objects`) scope reads/uploads strictly by authenticated tenant users.

---

## 3. Application Deployment & Health Verification

1. Build strictly in CI/staging: `pnpm install --frozen-lockfile && pnpm exec tsc --noEmit && pnpm lint && pnpm build`.
2. Start app (`pnpm start`) and confirm:
   - Unauthenticated `GET /api/admin/reports/calls` -> `401`.
   - Unauthenticated `POST /api/webhooks/cloudconnect` -> `401`.
   - `GET /api/cron/ozonetel-campaign-sync` without header -> `401`; with `Authorization: Bearer $CRON_SECRET` -> `200`.

---

## 4. Rollback Procedure

1. **Application Rollback:** Redeploy previous container / git tag (`git checkout 3d3f81a7` ONLY if emergency outage — note prior codebase lacked API hardening; prefer hotfixing on `security/phase-23-2-reconciled`).
2. **Database Migration Rollback (Verified in `T-DB-12`):**
   ```bash
   psql "$STAGING_DB_URL" -f migrations/rollback_23_2.sql
   ```
   `rollback_23_2.sql` safely removes `003` tables/indexes and `CASCADE`-drops `002` functions and dependent policies cleanly. Re-apply previous policy backup SQL if rolling back after cutover.
