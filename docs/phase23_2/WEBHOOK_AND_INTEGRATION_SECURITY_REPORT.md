# WEBHOOK AND INTEGRATION SECURITY REPORT

**Scope:** All **17 webhook route handlers** (`/api/payments/razorpay/webhook` + 16 `/api/webhooks/**` endpoints) + outbound provider modules in `/Users/apple/Downloads/CRM-reconciled`.

---

## 1. Webhook Authentication & Fail-Closed Design

| Endpoint | Previous State | Reconciled Phase 23.2 Security | Staging Result |
| --- | --- | --- | --- |
| `/api/payments/razorpay/webhook` | Fail-open when `x-razorpay-signature` omitted | Requires strict `verifyHmacWebhookSignature` (`RAZORPAY_WEBHOOK_SECRET`, fail `401`/`503`); credits wallet idempotently (`wallet_ledger` unique index + replay check returning `"Already credited"`) | `[T-API-7]`: `401` / `200` / replay handled |
| `/api/webhooks/cloudconnect` (+ `ozonetel/callback`, `ozonetel/ivr` re-exports) | Hardcoded literal secret backdoor + WS channel memory leak | Removed literal secret; uses `verifySharedWebhookToken` (`CLOUDCONNECT_WEBHOOK_SECRET`, `OZONETEL_WEBHOOK_SECRET`); replaced `.channel().send()` leaks with `broadcastScreenPop()` | `[T-API-7]`: backdoor `401`, valid `200` |
| `/api/webhooks/whatsapp` | Unverified GET challenge + unverified POST payloads | Strict GET `WHATSAPP_VERIFY_TOKEN` constant-time verify (`403` mismatch); POST requires valid `verifyHmacWebhookSignature` (`WHATSAPP_APP_SECRET`, `x-hub-signature-256`) or `verifySharedWebhookToken` (`401` otherwise) | `[T-API-7]`: GET `403`/`200`, POST no-sig `401` |
| `/api/webhooks/incoming-leads` | Accepted `?token=` query secret leaks & raw payload | Rejects `?token=` query auth; accepts strict HMAC (`INCOMING_LEADS_HMAC_SECRET`, `x-hanva-signature` + timestamp skew `<= 300s`) or header Bearer/`X-Webhook-Secret`; deduplicates via idempotency key | `[T-API-7]`: query `401`, HMAC `200`, replay `deduplicated=true` |
| `/api/webhooks/fonada/worker` | Exposed module-level `verifySignatureAppRouter` failing at boot if keys absent | Lazily verifies `@upstash/qstash` signatures (`QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`), failing closed with HTTP `503` when unconfigured | `[T-API-9]`: `503` when unconfigured |
| `/api/webhooks/portals` | Validated secrets with string equality without rate limit | Distributed IP rate limit (`60 / 60s`), `Authorization: Bearer` header required (`401`), `constantTimeEquals` against active `portal_credentials` (`403` mismatch), audit log | `[T-API-9]`: unauth `401` |
| `/api/webhooks/{ivr,fonada,c2c,ai-obd,ozonetel/sticky,inbound-routing,trigger-push,unicorn-call-outcomes}` | Unauthenticated `service_role` ingestion (`trigger-push`, `unicorn`, `c2c`, `ai-obd`, `ivr`, `inbound-routing`) | All enforce strict `verifySharedWebhookToken` against non-empty provider secrets (`FONADA_WEBHOOK_SECRET`, `OZONETEL_WEBHOOK_SECRET`, `UNICORN_WEBHOOK_SECRET`, `INTERNAL_WEBHOOK_SECRET`, `CLOUDCONNECT_WEBHOOK_SECRET`) + `getSupabaseAdminStrict()` | `[T-API-9]`: `401` across all unauth requests |

---

## 2. Third-Party Outbound Hygiene

- Removed `NODE_TLS_REJECT_UNAUTHORIZED = "0"` in `app/actions/whatsapp-billing-alerts.ts`, restoring strict TLS certificate validation.
- Removed hardcoded Fonada bearer tokens, Ozonetel credentials, Calendarific browser key, and OpenRouter keys across server actions and scripts (`app/actions/*`, `lib/ozonetel-*`).
- Standardized idempotency keys in `migrations/003_idempotency_audit_and_rate_limits.sql` (`webhook_idempotency_keys`, `idx_wallet_ledger_recharge_ref_uniq`, `idx_ivr_call_logs_batch_dedupe_uniq`).
