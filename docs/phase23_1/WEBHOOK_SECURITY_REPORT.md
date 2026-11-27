# WEBHOOK SECURITY REPORT

**Phase:** 23.1 (Section 9 Complete CRM Webhook Assessment)  
**Total Webhook Routes Audited:** **`15` routes** (`app/api/webhooks/**` + `app/api/payments/razorpay/webhook`)

---

## 1. Complete CRM Webhook Security Matrix

| Webhook Route | Provider / Sender | Current Auth / Sig Check | Critical Gaps Verified | Recommended Hardening |
| --- | --- | --- | --- | --- |
| `/api/payments/razorpay/webhook` | Razorpay | `HMAC-SHA256` over raw text **ONLY IF** `webhookSecret && signature` present | **CRITICAL FAIL-OPEN:** Omitting `x-razorpay-signature` skips HMAC validation (`L20`), crediting `wallet_ledger` & `tenant_wallets`! Non-constant-time `===` compare. | Require both `RAZORPAY_WEBHOOK_SECRET` and `x-razorpay-signature`; verify `timingSafeEqual`; validate currency/amount match & DB `reference_id` unique constraint |
| `/api/webhooks/cloudconnect` | CloudConnect / Ozonetel | String comparison against `CLOUDCONNECT_WEBHOOK_SECRET \|\| '[REDACTED]'` | **CRITICAL BACKDOOR (`L219-220`):** Explicitly accepts hardcoded secret literal even if env var is set; accepts `?api_key=` in URL query string; logs key suffixes. | Delete hardcoded backdoor literal; require HMAC or high-entropy `Authorization: Bearer` / `X-Webhook-Secret` header; migrate provider away from URL query secrets; add `call_logs` dedupe/replay window |
| `/api/webhooks/ozonetel/sticky` | Ozonetel Sticky | String comparison against `CLOUDCONNECT_WEBHOOK_SECRET \|\| '[REDACTED]'` | Hardcoded fallback string; `?api_key=` in query params; returns `leads` record (`phone_name`) globally across tenants on phone match | Remove fallback secret; require header secret or signed IP/HMAC; filter by DID/tenant lookup |
| `/api/webhooks/ozonetel/{callback,ivr}` | Ozonetel | Re-exports `cloudconnect/route.ts` | Inherits `cloudconnect` backdoor & URL secret leakage | Remediate in shared `cloudconnect` or split with Ozonetel-specific signed verification |
| `/api/webhooks/whatsapp` | Fonada / Meta WABA | **GET:** logs token, **ignores equality**, returns `200 challenge`. **POST:** Zero signature check! | Arbitrary `?tenant_id=` query param injection, zero `X-Hub-Signature-256` verification, hardcoded Fonada `userid`/`password`/`fsk_` bearer token | Enforce `token === requireServerSecret('WHATSAPP_VERIFY_TOKEN')` in `GET`; verify `X-Hub-Signature-256` / provider Bearer secret in `POST`; derive tenant strictly from verified WABA phone number ID (not caller `?tenant_id=`) |
| `/api/webhooks/fonada` | Fonada IVR Edge Catcher | **NONE** on inbound `POST` | Unauthenticated attackers inject arbitrary rows into `webhook_buffer`; invokes `process-webhooks` using hardcoded `CRON_SECRET` fallback | Require Fonada shared webhook token/HMAC header + timestamp replay (`<= 300s`); remove hardcoded `CRON_SECRET` fallback |
| `/api/webhooks/fonada/worker` | Upstash QStash | `verifySignatureEdge(processWebhook)` | Assigns `QSTASH_CURRENT_SIGNING_KEY = "mock_key_for_nextjs_build"` at module load if env missing! | Guard lazily at runtime (`fail closed 503` if QStash keys unset) instead of mutating `process.env` with static mock strings |
| `/api/webhooks/ivr` | Fonada IVR DID | **NONE** | Unauthenticated attackers forge DID + caller events, creating leads & debiting credits globally | Require provider bearer/HMAC secret matching verified DID config + deduplicate CDR IDs |
| `/api/webhooks/c2c` | Telephony C2C CDR | **NONE** | Unauthenticated agent status mutation & billing ledger manipulation | Enforce HMAC/Bearer webhook token + idempotent CDR call UUID |
| `/api/webhooks/ai-obd` | AI Dialer CDR | **NONE** | Unauthenticated wallet deductions & lead `nr` mutation matching last 10 phone digits across all orgs | Enforce provider HMAC/Bearer + call UUID scoping to owning `tenant_id` |
| `/api/webhooks/inbound-routing` | Fonada Dynamic Routing | **NONE** | Unauthenticated global lead phone lookup & `users.current_status` overwrite | Enforce provider secret header + DID-to-tenant resolution |
| `/api/webhooks/trigger-push` | Supabase DB Webhook | **NONE** | Unauthenticated caller passes arbitrary `{ record: { user_id } }` pushing browser notifications | Require HMAC webhook secret header verified by Supabase pg_net trigger + move push dispatch into signed server actions |
| `/api/webhooks/unicorn-call-outcomes` | Unicorn AI | **NONE** | Unauthenticated `POST` mutating lead status by UUID & firing WhatsApp blasts | Require HMAC-SHA256 / Bearer `UNICORN_WEBHOOK_SECRET` + timestamp check + tenant-scoped validation |
| `/api/webhooks/incoming-leads` | External Webhooks | `tenant_settings.webhook_secret` via `?token=` query string | Logs raw invalid tokens & full PII bodies; single-tenant UUID trigger (`L107`); no idempotency/rate limit; rejects E.164 international phones | Deprecate `?token=` query auth -> use `Authorization: Bearer` + `X-Hanva-Signature` HMAC + `X-Idempotency-Key`; redact logs; preserve E.164 phones |
| `/api/webhooks/portals` | Real Estate Portals | `portal_credentials.webhook_secret` via `Authorization: Bearer` | Uses non-constant-time DB match + inserts placeholder `"0000000000"` if phone missing; zero rate limiting | Keep Bearer header model, add validation (`phone` required), rate limit, idempotency key, & fail-closed round-robin |

---

## 2. Provider Fallback Strategy Note

Where third-party legacy telephony providers (e.g., certain Indian IVR/Ozonetel callbacks) cannot sign HTTP headers via HMAC-SHA256 natively:
1. Prefer **mutual HTTPS header token (`X-Webhook-Secret`)** over URL query strings whenever provider dashboards permit custom headers.
2. Where a provider strictly supports URL query webhooks only, generate a **256-bit per-tenant rotated token hashed (SHA-256) in DB**, restrict the route strictly to read-only idempotent buffering, enforce strict **provider source IP allowlisting + payload field sanity checks + zero console logging of query strings/tokens**, and document the residual URL-token limitation explicitly.
