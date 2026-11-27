# RELIABILITY & RETRY REPORT

**Phase:** 23 (Stage D Fault Tolerance & Fallback Verification)  
**Target:** `HANVA/lib/leads/crm-adapter.ts`, `HANVA/lib/leads/dedupe.ts`, `HANVA/app/api/leads/route.ts`

---

## 1. Failure Modes & Deterministic Safe Responses

| Condition / Failure Mode | Server Behavior | HTTP Status | Client / Visitor Preservation |
| --- | --- | --- | --- |
| `CRM_INTEGRATION_MODE=disabled` | Short-circuits before network dispatch; skips dedupe commit so retry succeeds when re-enabled | `503` (`CRM_INTEGRATION_BLOCKED`) | Returns `fallback.whatsapp_url` (`https://wa.me/918423711043?text=...`), `info@hanva.in`, and `+91 8423711043` |
| `CRM_INTEGRATION_MODE=live_signed_gateway` without `CRM_STAGE_A_SECURITY_APPROVED=true` or secrets | Fail-closed safety gate blocks dispatch | `503` (`CRM_INTEGRATION_BLOCKED`) | Returns `production_crm_synced: false` + full WhatsApp/Email/Phone fallback |
| Live gateway outbound timeout (`> 5000ms` via `AbortController`) or `5xx` | Bounded retry (at most 1 retry using exact same `X-Idempotency-Key`); zero retries on `4xx` | `503` / `502` | Never enters dedupe store on transient failure; returns WhatsApp fallback URL |
| Client double-click / network retry with matching `lead_idempotency_key` & identical payload | Returns original masked `lead_reference` without creating duplicate row | `200` (`duplicate_replay`) | Consistent confirmation reference + fallback links |
| Rate-limit burst exceeding sliding window threshold | Blocks abusive bursts while preventing resource exhaustion | `429` (`RATE_LIMIT_EXCEEDED`) + `Retry-After` | Direct WhatsApp/Email/Phone fallback retained |
| Oversized payload (`> 16384` bytes) or non-JSON body | Rejected prior to deep JSON parsing | `413` / `415` | Clean structured JSON error (`no stack trace`) |

---

## 2. Non-Destructive Transaction Ordering

`app/api/leads/route.ts` commits `commitLeadDeduplication(lead, leadReference)` **strictly after** `dispatchNormalizedLead(...)` returns `ok: true`. Transient downstream CRM unavailability (`503`) therefore never poisons the idempotency cache against subsequent retries.
