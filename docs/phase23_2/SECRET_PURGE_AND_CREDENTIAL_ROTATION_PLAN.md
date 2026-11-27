# SECRET PURGE AND CREDENTIAL ROTATION PLAN

**Verification Status:** Automated regex secret scan on `/Users/apple/Downloads/CRM-reconciled` completed (`ZERO_SECRET_MATCHES` across code, excluding `node_modules`/`.next`/.git).

---

## 1. Purged Hardcoded Credentials & Unsafe Fallbacks (`CRM-reconciled`)

| Defect Category | Affected Files Remediated | Action Taken |
| --- | --- | --- |
| **Hardcoded Webhook / API Keys** | `app/api/webhooks/cloudconnect/route.ts`, `app/actions/whatsapp.ts`, `app/actions/ai-obd-dialer.ts`, `app/actions/cloudconnect.ts`, `app/actions/campaigns.ts`, `app/actions/conference.ts`, `app/actions/ivr-upload-action.ts`, `app/actions/whatsapp-billing-alerts.ts`, `lib/ozonetel-cloudagent.ts`, `lib/ozonetel-campaign-health.ts`, `lib/kyc-utils.ts` | Replaced all literal API keys, Fonada bearer strings, Ozonetel credentials, and hardcoded internal tokens with `requireServerSecret()` / server `process.env` reads; fail-closed error on missing config |
| **Exposed Client Bundle Secret** | `app/admin/attendance/dashboard.tsx` -> new `app/api/admin/holidays/route.ts` | Removed direct client-side Calendarific key usage; moved lookup behind authenticated `/api/admin/holidays` server route |
| **Debug Scripts & Hardcoded PII** | `app/admin/settings/page.tsx`, `scripts/test-openrouter.ts`, `scripts/tenant-lead-whatsapp-listener.js`, `app/actions/whatsapp.ts` | Removed hardcoded legacy support email literals, OpenRouter script key literals, and cross-tenant org/email fallbacks |
| **Silent Mock Fallback & TLS Bypass** | `lib/supabase/server.ts`, `app/actions/whatsapp-billing-alerts.ts` | Replaced silent `makeMockQuery()` / `"placeholder-project.supabase.co"` / `"placeholder-key"` with explicit fail-closed errors; removed `NODE_TLS_REJECT_UNAUTHORIZED = "0"` |
| **Key Prefix & Admin Password Leaks** | `app/api/debug/daily-report/route.ts`, `app/api/cron/daily-report/route.ts`, `app/api/admin/users/route.ts` | Removed `?key=` query bypasses, removed partial secret prefix echoing (`starts with`), and removed plaintext passwords / email PII from responses and console logs |

---

## 2. Mandatory Pre-Production Credential Rotation Schedule

Because several secrets were previously committed into Git history (`gauravhotstar/CRM` & `seobanks/CRM`) and client JS chunks, **remediating code alone is insufficient**—every credential below MUST be rotated before enabling production or website-to-CRM traffic:

| Priority | Service / Key Env Var | Owner | Action Required Before Production Cutover |
| --- | --- | --- | --- |
| **P0** | `SUPABASE_SERVICE_ROLE_KEY`, Supabase JWT Secret | Infra / DB Admin | Rotate in Supabase dashboard; audit `auth.users` & `public.users` for unauthorized accounts created prior to RLS/trigger fix |
| **P0** | `FONADA_WHATSAPP_BEARER_TOKEN`, `FONADA_PASSWORD`, `FONADA_WEBHOOK_SECRET` | Messaging Ops | Re-issue bearer token and SIP/API password in Fonada portal; configure new header secret |
| **P0** | `OZONETEL_API_KEY`, `OZONETEL_PORTAL_PASS`, `CLOUDCONNECT_WEBHOOK_SECRET` | Telephony Ops | Rotate Ozonetel/CloudConnect API keys and webhook shared secrets in vendor portal |
| **P0** | `RESEND_API_KEY`, `OPENROUTER_API_KEY`, `RAZORPAY_WEBHOOK_SECRET` | Platform Ops | Revoke old Resend, OpenRouter, and Razorpay webhook secrets; generate fresh secrets `>= 32` chars |
| **P1** | `CALENDARIFIC_API_KEY`, `MEILISEARCH_MASTER_KEY`, `VAPID_PRIVATE_KEY` | Platform Ops | Rotate Calendarific key (previously browser-exposed) and Meilisearch master key |
| **P1** | `CRON_SECRET`, `UPSTASH_REDIS_REST_TOKEN`, `QSTASH_*`, `INCOMING_LEADS_HMAC_SECRET` | Release Eng | Generate unique 32-byte random hex secrets per environment (`staging` vs `production`) |
