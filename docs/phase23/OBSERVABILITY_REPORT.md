# OBSERVABILITY REPORT

**Phase:** 23 (Stage D/E Redacted Telemetry & Zero-PII Logging Proof)  
**Logger Module:** `HANVA/lib/leads/security.ts` (`emitRedactedLeadLog`)

---

## 1. Structured Audit Log Schema

Every `/api/leads/` request generates a unique `correlation_id` (`req_<16-hex>`) returned in JSON error/success responses and logged as a single-line structured JSON event containing:
- `timestamp` (UTC ISO-8601)
- `service`: `"hanva-web-lead-gateway"`
- `correlation_id`
- `event` (`lead_created`, `lead_idempotent_replay`, `lead_idempotency_conflict`, `lead_duplicate_conflict`, `lead_validation_failed`, `lead_payload_rejected`, `lead_origin_rejected`, `lead_rate_limited`, `lead_crm_dispatch_blocked_or_failed`)
- `http_status`
- `integration_mode` (`sandbox_mock` / `disabled` / `live_signed_gateway`)
- `product_slug`, `routing_queue`, `phone_country` (categorical metadata only)
- `contact_digest_prefix`: first 12 hex characters of `SHA-256(phoneE164)`
- `lead_reference`: masked reference (`HNV-YYYYMMDD-XXXXXXXX`)
- `error_code`, `latency_ms`

**Explicitly Omitted (Zero-PII Policy):** Plaintext names, phone numbers, emails, company names, notes, IPs, URL tokens, Bearer keys, and HMAC secrets NEVER appear in logs.

---

## 2. Empirical Log Sample Verified (`task-6935.log`)

Audited `26` structured gateway lines generated during Stage E execution (`verify_phase23.py`):
- **Plaintext PII / Fixture Matches:** `0` (`9876543001`, `+919876543001`, `qa.aarav`, `Aarav`, `Meera`, `447700900123`, `4155550199`, `qa-key-` all verified absent).
- **Verified Log Sample:**
```json
{"timestamp":"2026-11-26T14:21:36.943Z","service":"hanva-web-lead-gateway","correlation_id":"req_d6cb8d22fcdc41af","event":"lead_created","http_status":201,"integration_mode":"sandbox_mock","product_slug":"crm","routing_queue":"saas_crm_demo","phone_country":"IN","contact_digest_prefix":"5e128d37fabd","lead_reference":"HNV-20261126-0C5DAF54","error_code":null,"latency_ms":2}
```
