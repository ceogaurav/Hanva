# API AUTHENTICATION & AUTHORIZATION REPORT

**Phase:** 23 (Stage B Security Contract)  
**Scope:** Website Inbound Endpoint Auth Model vs. Server-to-Server CRM Ingestion Auth Model

---

## 1. Public Website Form Endpoint (`POST /api/leads/`)

Since public visitors on `https://www.hanva.in` are unauthenticated prospective buyers:
- Authentication is NOT via user login; instead, security rests on **Zero-Trust Server Enforcement**:
  1. **Origin & Method Enforcement:** `POST` only (`GET`/`PUT`/`DELETE` return `405 Method Not Allowed`). Cross-origin abuse mitigated by CSP + explicit allowed-origin verification when `Origin` header is present (`https://www.hanva.in`, local dev/QA test hosts).
  2. **Content-Type & Payload Size Cap:** Requires `application/json`; rejects > `16 KB` payloads with `413 Payload Too Large`.
  3. **Privilege Downgrade / Field Allowlisting:** Browser input passes strict schema allowlisting; any attempt to inject `tenant_id`, `organization_id`, `assigned_to`, `status`, `score`, `is_admin` returns `400 Bad Request` (`PRIVILEGED_FIELD_FORBIDDEN`).
  4. **Rate Limiting & Bot Shield:** Per-IP sliding window limit returning `429 Too Many Requests` + `Retry-After` header; honeypot (`website_url_check`) traps automated scripts.
  5. **CSRF / Replay Protection:** JSON-only `Content-Type: application/json` plus optional custom header/origin verification + `lead_idempotency_key` enforcement.

---

## 2. Hardened Website -> CRM Server-to-Server Auth (Future Unblock Specification)

When Stage A blockers in `/Users/apple/Downloads/CRM` are resolved, the legacy `?token=` URL parameter (`incoming-leads/route.ts`) MUST NOT be reused. Instead:

1. **Transport:** HTTPS TLS 1.2+ only.
2. **Dual Credential Verification:**
   - `Authorization: Bearer <CRM_WEBSITE_INGEST_TOKEN>` (high-entropy 256-bit secret scoped *exclusively* to single internal `HANVA_INTERNAL_TENANT_ID`, never admin/global scope).
   - `X-Hanva-Timestamp: <unix_epoch_seconds>` rejected if clock skew > `±300 seconds`.
   - `X-Hanva-Signature: v1=<hex(HMAC_SHA256(CRM_WEBSITE_HMAC_SECRET, timestamp + "." + rawBody))>` compared with `crypto.timingSafeEqual`.
   - `X-Idempotency-Key: <deterministic_or_uuid_key>`.
3. **Zero Static Fallback Policy:** If `CRM_WEBSITE_INGEST_TOKEN` or `CRM_WEBSITE_HMAC_SECRET` is missing in either HANVA or CRM runtime env, the server MUST fail closed with `503` (never fall back to `'secret'`, `'placeholder-key'`, or default strings).
4. **CRM Internal Route Auth Requirements:**
   - Every `/api/admin/*`, `/api/telecaller/*`, `/api/kyc-members`, `/api/companies/search` endpoint in CRM must validate Supabase session JWT (`supabase.auth.getUser()`) AND verify matching `tenant_id` ownership inside server code as well as Postgres RLS.
