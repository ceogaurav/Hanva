# API ARCHITECTURE & THREAT MODEL

**Phase:** 23 (Stage B Security Architecture)  
**Ingestion Endpoint:** `POST https://www.hanva.in/api/leads/` (Website Server Route)  
**Target Downstream Endpoint (Blocked Until Stage A Pass):** Hardened CRM `POST https://crm.hanva.in/api/v1/ingest/website-leads`

---

## 1. End-to-End Architecture & Security Boundaries

```text
[Visitor Browser]
   |  (1) Explicit consent + business fields only (NO secrets, NO tenant_id, NO status)
   v
[HANVA Next.js Server: POST /api/leads/]
   |-- Validates Content-Type, Content-Length <= 16KB, JSON shape
   |-- Rejects honeypot bots, XSS/control chars, privileged field overrides
   |-- Sliding-window IP rate limit + origin/same-host checks
   |-- Normalizes phone (E.164 IN + Intl), classifies product vs service, hashes dedupe key
   |-- Emits redacted correlation-ID telemetry (ZERO PII / ZERO secrets)
   |
   +--> Mode Gate (CRM_INTEGRATION_MODE):
          - "disabled" / "sandbox_mock" (CURRENT REQUIRED PRODUCTION STATE):
              Fail-closed for live CRM DB writes; sandbox mock adapter verifies pipeline locally
              and returns honest fallback/WhatsApp metadata.
          - "live_signed_gateway" (FUTURE — REQUIRES STAGE A REMEDIATION SIGN-OFF):
              HMAC-SHA256 signed server-to-server POST -> CRM hardened ingestion API
              (NEVER raw Supabase anon/service key on HANVA frontend or edge).
```

### Key Architectural Invariants
1. **Fail-Closed Gate:** Live CRM network dispatch MUST NOT activate unless BOTH explicit `CRM_INTEGRATION_MODE=live_signed_gateway` AND cryptographic signing/endpoint environment variables exist AND Stage A sign-off checklist is satisfied.
2. **Never Leak CRM Secrets Into HANVA Browser Bundles:** Neither `NEXT_PUBLIC_*` nor client bundles ever reference CRM tokens, webhook secrets, or Supabase keys.
3. **WhatsApp Primary Conversion Unbroken:** Clicking any `https://wa.me/918423711043?...` link triggers client handoff directly and NEVER invokes `POST /api/leads/` in the background.

---

## 2. STRIDE Threat Model

| Threat Category | Concrete Attack Vector | Mitigation Control Enforced in Phase 23 |
| --- | --- | --- |
| **Spoofing** | Attacker spoofs website webhook direct to CRM URL `?token=` or calls `/api/telecaller/sim-calls` without auth | Blocked downstream dispatch while CRM unhardened; target S2S contract requires Bearer service token + `X-Hanva-Signature: sha256=...` HMAC over `${timestamp}.${rawBody}` + timestamp replay window (`<= 300s`) |
| **Tampering** | Malicious browser sends `"tenant_id": "<other-org>"`, `"assigned_to"`, `"status": "Approved"`, or oversized JSON / XSS scripts | Server explicitly rejects requests containing `tenant_id`, `organization_id`, `assigned_to`, `status`, or `role` (`400`); enforces `16 KB` body limit; strips control chars and rejects `<script`/HTML tag payloads |
| **Repudiation** | Missing trace when lead submission succeeds/fails or duplicates occur | Every `/api/leads/` request generates cryptographic `correlation_id` (`req_...`), logs structured JSON outcome + SHA-256 contact digest (zero plaintext PII) |
| **Information Disclosure** | Leakage of CRM URLs, service tokens, DB error messages, stack traces, or existing lead records on `409`/`500` | Normalized error mapper strips upstream/stack details; duplicate conflict returns only `lead_reference` created/matched for that fingerprint (never existing customer data or third-party rows); server logs mask PII |
| **Denial of Service** | Bot flood exhausting DB / WhatsApp Business API quota via automated form posts | Sliding-window rate limit per client IP (`429 Too Many Requests` + `Retry-After`), honeypot trap, strict max lengths (`notes <= 1000`), and deduplication cooldown |
| **Elevation of Privilege** | Exploiting CRM `/api/admin/broadcast` or `/api/admin/leads/bulk-assign` or `public.users` disabled RLS | Documented as Critical Stage A blockers in `CRM_SECURITY_ASSESSMENT.md`; live CRM integration kept disabled until remediated |
