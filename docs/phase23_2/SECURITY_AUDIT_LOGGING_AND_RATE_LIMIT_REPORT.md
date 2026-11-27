# SECURITY AUDIT LOGGING AND RATE LIMITING REPORT

**Database Migration:** `migrations/003_idempotency_audit_and_rate_limits.sql`  
**Runtime Guard Implementation:** `lib/security/crm-guards.ts` (`emitSecurityAuditLog`, `checkSharedRateLimit`)

---

## 1. Privacy-Safe Security Audit Logging (`emitSecurityAuditLog`)

Previously, `app/api/admin/users/route.ts` logged raw credentials, while debug/cron routes echoed secret key prefixes and PII emails. Phase 23.2 enforces structured, redacted security telemetry:

- **Redaction by Design:** Email addresses and phone numbers are converted into truncated cryptographic SHA-256 digests (`subject_digest = "sha256:<12-hex-chars>"`) prior to logging—zero plaintext PII or secrets appear in stdout (`[SECURITY_AUDIT] ...`) or `public.security_audit_logs`.
- **Table & RLS Protection (`003`):**
  - Created `public.security_audit_logs (id, tenant_id, actor_user_id, event_type, route, outcome, reason, subject_digest, resource_count, created_at)`.
  - RLS enabled: `security_audit_logs_read_admin` allows tenant admins (`is_crm_admin()`) to read only their own `tenant_id` logs and `super_admin` to view cross-tenant; writes occur strictly through verified server-side `service_role` handlers (`T-DB-12` PASS).
- **Verified Runtime Emissions:** Executing `staging_api_verify.mjs` generated **19 structured `security_audit_logs` records** covering `mobile.login` (allowed/denied), `admin.users.*`, `admin.leads_export`, `admin.leads_bulk_assign`, `webhooks.incoming_leads`, `webhooks.portals`, and `payments.razorpay` without blocking error responses.

---

## 2. Distributed Multi-Instance Rate Limiting (`checkSharedRateLimit`)

Replaced stateless per-container assumptions with a strict tiered rate limiter (`lib/security/crm-guards.ts:390-472`):
1. **Primary Tier (`UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`):** Atomic fixed-window `INCR` + `EXPIRE` pipeline via Upstash REST.
2. **Secondary Persistent Database Tier (`public.api_rate_limits`):** Atomic PostgreSQL window counters persisted in Supabase across serverless invocations when Redis is not provisioned.
3. **Isolated Test Memory Tier:** Bounded Map fallback exclusively for ephemeral local runs without persistent DB.

- **Protected Sensitive Endpoints:** `/api/mobile/login` (`10` attempts / `300s` per IP+email), `/api/webhooks/incoming-leads`, `/api/webhooks/portals`, `/api/companies/search`, and `/api/assistant` (`30` / `60s` per user).
- **Staging Proof (`T-API-10`):** Rapidly submitting 12 wrong passwords to `/api/mobile/login` produced ten HTTP `401` responses followed by HTTP `429` (`Retry-After: 300`) on attempts 11 & 12.
