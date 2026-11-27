# AUDIT LOGGING & PRIVACY REPORT

**Phase:** 23.1 (Section 12 Security Audit Trail & DPDP PII Protection)  
**Target Schema:** `public.security_audit_logs` in [`staging_migration_01_rls_and_security_definer.sql`](./evidence/remediation/staging_migration_01_rls_and_security_definer.sql)  
**Helper Reference:** `buildSafeSecurityAuditRecord()` in [`crm_security_guard_reference.ts`](./evidence/remediation/crm_security_guard_reference.ts)

---

## 1. Current Logging Risks Observed in CRM

1. **`app/api/webhooks/incoming-leads/route.ts:34, 53`:** Logs raw invalid webhook tokens and complete unredacted incoming JSON PII payloads (`name`, `phone`, `email`, `notes`).
2. **`app/api/cron/process-webhooks/route.ts:124`:** Logs `authHeader` directly (`console.error("Unauthorized Cron Attempt Blocked! Header received:", authHeader)`), writing presented Bearer credentials into Vercel/stdout logs.
3. **`app/api/webhooks/whatsapp/route.ts:26`:** Logs `hub.verify_token` directly (`Mode: ..., Token: ...`).
4. **`app/api/webhooks/c2c/route.ts:23` & `unicorn-call-outcomes/route.ts:9`:** Log raw webhook JSON bodies including phone numbers and message payloads.
5. **`app/api/admin/users/route.ts:49`:** Logs full `{ email, password, full_name, phone, role }` body object directly via `console.log("👉 Incoming Data:", body)` — **exposing plaintext user passwords in server logs!!**

---

## 2. Hardened Audit Logging Specification

1. **Audited Security Events (`security_audit_logs`):**
   - `auth_login_success`, `auth_login_failed`
   - `role_changed`, `tenant_membership_changed`
   - `lead_bulk_assigned`, `broadcast_executed`, `admin_action`
   - `webhook_auth_failed`, `sensitive_export` (`/api/admin/leads/export`)
2. **Forbidden From Logs (Zero Exceptions):**
   - Passwords (immediate remediation target: `admin/users/route.ts:49`!), access/refresh tokens, Bearer/HMAC headers, verify tokens, full phone numbers, full message contents.
   - Replace phone/email references with `sha256(normalized_value).slice(0, 12)` (`subject_digest`) as validated by unit test `audit_record_redacts_phone_or_email`.
3. **Access Control & Retention:**
   - RLS on `public.security_audit_logs` restricts `SELECT` strictly to verified admins of the matching `tenant_id`; append-only writes handled server-side (no client `UPDATE`/`DELETE` policies).
   - Recommended retention: `365 days` hot queryable security logs (`180 days` archived for forensic DPDP compliance); introduce zero external GA4/GTM analytics pipelines without explicit owner approval.
