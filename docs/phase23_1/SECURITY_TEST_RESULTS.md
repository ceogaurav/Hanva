# SECURITY TEST RESULTS

**Phase:** 23.1 (Section 13 Empirical Execution Record & Truthful Boundaries)  
**Executed Test Suite:** [`verify_phase23_1_reference_guards.mjs`](./evidence/remediation/verify_phase23_1_reference_guards.mjs)  
**Test Log & JSON Results:** [`phase23_1_reference_tests.log`](./evidence/phase23_1_reference_tests.log), [`phase23_1_reference_tests.json`](./evidence/phase23_1_reference_tests.json)

---

## 1. Execution Scope Disclosure (Strict Honesty Rule)

- **Executed & Passed (`14 / 14`):** TypeScript compilation (`tsc --strict`) and Node verification of our Phase 23.1 reference guard library (`crm_security_guard_reference.ts`), staging SQL migration assertions (`staging_migration_01`), and HANVA live local server verification (`http://127.0.0.1:3001/company/contact/` returning `HTTP 200`, `CRM_STAGE_A_SECURITY_APPROVED=false`).
- **BLOCKED / NOT EXECUTED Against Live/Staging CRM DB (`Pending Owner Reconciliation & Staging DB Provisioning`):**
  Per Section 2, Section 13, Section 18, and Section 19:
  - `/Users/apple/Downloads/CRM/.env.local` targets live cloud Supabase (`supabase_cloud=True`) and live third-party secrets. Zero isolated staging Supabase DB exists locally.
  - Modifying `/Users/apple/Downloads/CRM` source routes directly was stopped at the Repository Identity gate due to `11` diverged files and `10` unmerged commits in `seobanks/CRM`.
  - Therefore, **live multi-tenant DB query tests (Tenant A vs Tenant B RLS execution against PostgreSQL)** and **live CRM route regression tests** are **`BLOCKED / NOT EXECUTED`** and must run in an isolated staging environment after repository reconciliation.

---

## 2. Offline Reference Security & Fail-Closed Tests Executed (`14 / 14 PASS`)

| Test Case | Category | Outcome | Verified Assertion |
| --- | --- | --- | --- |
| `require_server_secret_fails_closed_when_missing` | Fail-closed Secrets | **PASS** | Throws `SecurityConfigError` instead of falling back to hardcoded strings |
| `cron_rejects_bearer_undefined_when_secret_unset` | Cron Auth | **PASS** | Explicitly rejects `"Bearer undefined"` when `CRON_SECRET` unset |
| `cron_rejects_wrong_secret_when_real_secret_set` | Cron Auth | **PASS** | Rejects arbitrary wrong/legacy token with `INVALID_CRON_TOKEN` |
| `cron_accepts_valid_bearer_secret` | Cron Auth | **PASS** | Constant-time equality passes valid `CRON_SECRET` |
| `webhook_rejects_missing_signature_fixes_razorpay_fail_open` | Webhook HMAC | **PASS** | Rejects missing signature (`MISSING_SIGNATURE`) — fixes Razorpay fail-open flaw |
| `webhook_rejects_tampered_payload` | Webhook HMAC | **PASS** | Modified payload `tenant_a -> tenant_b` rejected (`SIGNATURE_MISMATCH`) |
| `webhook_rejects_stale_replay_over_300s` | Webhook Replay | **PASS** | Timestamp > 300s rejected (`STALE_OR_INVALID_TIMESTAMP`) |
| `webhook_accepts_valid_hmac_and_fresh_timestamp` | Webhook HMAC | **PASS** | Valid timestamped `v1=` HMAC signature accepted |
| `tenant_context_blocks_cross_tenant_override_by_tenant_admin` | Tenant Isolation | **PASS** | `tenant_admin` attempting `requestedTenantId = tenant-bbb` rejected (`CROSS_TENANT_OVERRIDE_FORBIDDEN`) |
| `role_hierarchy_blocks_tenant_admin_granting_super_admin` | Privilege Escalation | **PASS** | `assertCanGrantRole('tenant_admin', 'super_admin')` blocked |
| `role_hierarchy_blocks_telecaller_granting_any_role` | RBAC | **PASS** | `assertCanGrantRole('telecaller', 'admin')` blocked |
| `audit_record_redacts_phone_or_email` | Audit Privacy | **PASS** | `+919876543210` masked to `sha256:...`; zero plaintext PII |
| `hanva_production_crm_integration_remains_blocked` | Website Safety | **PASS** | `CRM_STAGE_A_SECURITY_APPROVED=false` verified intact in HANVA |
| `sql_migration_re_enables_users_rls_and_scopes_definer_rpcs` | SQL Hardening | **PASS** | `ALTER TABLE public.users ENABLE ROW LEVEL SECURITY`, `SET search_path = public`, `REVOKE ALL FROM PUBLIC` verified |

---

## 3. Blocked Live Staging Test Matrix (Ready to Execute Once Staging DB Provisioned)

The following synthetic multi-tenant staging test cases (`Tenant A` vs `Tenant B`) remain `BLOCKED` pending staging Supabase provisioning:
- `auth_*`: Live expired JWT rejection, session revocation, invalid role against CRM routes.
- `rls_tenant_a_vs_b`: Direct Supabase PostgREST queries under Tenant A JWT attempting `SELECT/UPDATE/DELETE` on Tenant B `users`, `leads`, `call_logs`, `notifications`, `tenant_wallets`, plus RPC `get_telecaller_lead_counts` & `get_next_auto_dial_lead` & `bulk_assign_leads`.
- `crm_regression`: Login, user creation, lead creation/editing/assignment, calling/IVR campaign flow, and mobile APK v2 Bearer flow in staging.
