# API ROUTE SECURITY INVENTORY REPORT

**Phase:** 23.1 (Section 4 Complete 51-Route Assessment)  
**Machine-Readable Full CSV Inventory:** [`docs/phase23_1/evidence/crm_api_inventory_baseline.csv`](./evidence/crm_api_inventory_baseline.csv)  
**Routes Audited:** **`51 / 51`** (`app/api/**/route.ts`)  
**Risk Breakdown:** **`28` CRITICAL · `14` HIGH · `9` MEDIUM · `0` LOW**

---

## 1. Key Revalidation Correction vs. Phase 23 Initial Count

- Phase 23 regex heuristics identified `16` routes lacking auth patterns and `10` with `service_role`.
- Phase 23.1 line-by-line source inspection corrected a **false negative** in `app/api/webhooks/unicorn-call-outcomes/route.ts` (`createClient as createServerClient` was aliased from `@supabase/supabase-js` with ZERO user auth!), and audited QStash/Cron/Mobile/WhatsApp GET+POST semantics:
  - **`20` routes** enforce **neither** real Supabase session auth (`auth.getUser()`) **nor** valid inbound secret/signature checks.
  - **`12` routes** invoke **`SUPABASE_SERVICE_ROLE_KEY`** with **zero incoming auth/signature enforcement**.
  - Plus **`7` Cron/Razorpay routes** contain active **fail-open auth bugs** (`Bearer ${undefined}` or omitted-signature bypass or `NODE_ENV !== 'development'` bypass), and **`5` session-authenticated Admin routes** contain **cross-tenant IDOR or privilege escalation** flaws.

---

## 2. Complete Route-by-Route Inventory (All `51` API Routes)

| # | Route | Methods | Auth (`getUser`) | Secret / Sig | Tenant Guard | `service_role` | Rate Limit | Risk | Status |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `/api/admin/ai-call` | POST | Yes | No | **Missing** (IDOR on `leadId`) | **Yes** | No | **HIGH** | Blocked (Remediation in Blueprint) |
| 2 | `/api/admin/broadcast` | POST | **No** | No | **No** (trusts `currentUserId`) | **Yes** | No | **CRITICAL** | Blocked |
| 3 | `/api/admin/campaign-health-watchdog` | GET\|POST | Yes (GET missing role) | No | **No** (global watchdog) | No (calls lib*) | No | **HIGH** | Blocked (*lib uses `service_role`) |
| 4 | `/api/admin/delete-file` | POST | Yes | No | **Missing** (global Meili delete) | No | No | **HIGH** | Blocked |
| 5 | `/api/admin/fix-checkout` | GET | **No** | No | **No** | **Yes** | No | **CRITICAL** | Blocked (Convert to Admin POST or delete) |
| 6 | `/api/admin/fix-ivr-logs` | GET | **No** | No | **No** (`DELETE call_logs`) | **Yes** | No | **CRITICAL** | Blocked |
| 7 | `/api/admin/init-meili` | GET | Yes | No | Weak (claims unowned docs) | No | No | **MEDIUM** | Blocked |
| 8 | `/api/admin/leads/bulk-assign` | POST | Yes | No | **No** (`bulk_assign_leads` unscoped) | **Yes** | No | **CRITICAL** | Blocked |
| 9 | `/api/admin/leads/export` | GET | Yes | No | Yes (`eq('tenant_id', profile.tenant_id)`) | No | No | **MEDIUM** | Add CSV formula injection escape + audit log |
| 10 | `/api/admin/master-data/entry` | POST\|DELETE | Yes | No | **DELETE misses `tenant_id`** | No | No | **HIGH** | Blocked |
| 11 | `/api/admin/master-data/stats` | GET | Yes | No | **Global stats** | No | No | **HIGH** | Blocked |
| 12 | `/api/admin/operations/snapshot` | GET | Yes | No | **Yes** (profile verified) | No | No | **MEDIUM** | Good baseline pattern; add rate limit |
| 13 | `/api/admin/upload-companies` | POST | Yes | No | Yes (`tenant_id` stamped) | No | No | **MEDIUM** | Add payload size cap & rate limit |
| 14 | `/api/admin/users` | POST | Yes | No | Partial | **Yes** | No | **CRITICAL** | `tenant_admin` can create `super_admin` |
| 15 | `/api/admin/users/[id]` | PATCH | Yes | No | Partial (`super_admin` role grant allowed) | **Yes** | No | **CRITICAL** | Unvalidated `role` lets `tenant_admin` escalate |
| 16 | `/api/assistant` | POST | **No** | No | N/A | No | No | **HIGH** | Unauthenticated LLM quota exhaustion + broken `ai` v6 call |
| 17 | `/api/click-to-call` | POST | **No** | No | **No** | No | No | **HIGH** | Unauthenticated telephony mock endpoint |
| 18 | `/api/companies/search` | GET | **No** | No | No | No | No | **HIGH** | Public unauthenticated directory + Python `execFile` |
| 19 | `/api/cron/auto-checkout` | GET | No | **Fail-open** | Multi-tenant loop | **Yes** | No | **CRITICAL** | `Bearer ${undefined}` + `?key=` + dev bypass |
| 20 | `/api/cron/auto-refill` | GET | No | **Fail-open** | Multi-tenant loop | **Yes** | No | **CRITICAL** | `Bearer ${undefined}` + `?key=` + dev bypass |
| 21 | `/api/cron/campaign-health-watchdog` | GET\|POST | **No** | **No** | No | Calls lib* | No | **CRITICAL** | Unauthenticated public trigger (*lib mutates campaigns) |
| 22 | `/api/cron/daily-report` | GET | No | Hardcoded | Multi-tenant loop | **Yes** | No | **CRITICAL** | Hardcoded Resend key + URL secret |
| 23 | `/api/cron/kyc` | GET | No | **Fail-open** | Multi-tenant loop | **Yes** | No | **CRITICAL** | `Bearer ${undefined}` when `CRON_SECRET` unset |
| 24 | `/api/cron/ozonetel-campaign-sync` | GET\|POST | **No** | **No** | No | No | No | **HIGH** | Missing Cron Bearer verification |
| 25 | `/api/cron/process-webhooks` | GET | No | **Hardcoded fallback** | Lead lookup | **Yes** | No | **CRITICAL** | Hardcoded `CRON_SECRET` fallback + literal check |
| 26 | `/api/cron/sla` | GET | No | **Fail-open** | Multi-tenant loop | **Yes** | No | **CRITICAL** | `Bearer ${undefined}` + 18 TS errors |
| 27 | `/api/cron/smart-notifications` | GET | No | **Fail-open** | Multi-tenant loop | **Yes** | No | **CRITICAL** | `Bearer ${undefined}` + `?key=` + dev bypass |
| 28 | `/api/debug/daily-report` | GET | No | **Leak + `undefined`** | Leaks **all enabled tenants & emails** | **Yes** | No | **CRITICAL** | Leaks `RESEND_API_KEY` prefix + all user PII emails! |
| 29 | `/api/kyc-members` | GET | **No** (`getKycTeamMembers` checks inside) | No | Returns `[]` if unauth (lib checks user) | No | No | **HIGH** | Should return explicit `401` at route boundary |
| 30 | `/api/mobile/login` | POST | Public login | No | Profile lookup | **Yes** | **No** | **CRITICAL** | Zero rate limit + APK client bypass fallback |
| 31 | `/api/notifications/send` | GET\|POST | Yes | No | **No** (`user_metadata.role` trusted!) | No | No | **HIGH** | Trusts user-editable `user_metadata`; no `tenant_id` on `userIds` |
| 32 | `/api/notifications/subscribe` | POST | Yes | No | Own `user_id` | No | No | **MEDIUM** | Missing Zod payload check |
| 33 | `/api/notifications/unsubscribe` | POST | Yes | No | Own `user_id` | No | No | **MEDIUM** | Missing Zod payload check |
| 34 | `/api/payments/razorpay/webhook` | POST | No | **Fail-open** | `notes.tenant_id` | **Yes** | No | **CRITICAL** | Skips HMAC check if `x-razorpay-signature` omitted! |
| 35 | `/api/telecaller/sim-calls` | POST | **No** | No | **No** (`LIMIT 1` org fallback) | **Yes** | No | **CRITICAL** | Zero JWT verification; cross-tenant call log forgery |
| 36 | `/api/transfer-lead` | POST | Yes | No | **No** (`leads.eq('id')` unscoped) | No | No | **HIGH** | Telecaller can transfer leads / assign invalid `kyc_member_id` |
| 37 | `/api/webhooks/ai-obd` | POST | **No** | **No** | Lookup by last 10 phone digits | **Yes** | No | **CRITICAL** | Unauthenticated wallet debit & call_log/lead mutation |
| 38 | `/api/webhooks/c2c` | POST | **No** | **No** | Agent phone lookup | **Yes** | No | **CRITICAL** | Unauthenticated call_log + user status overwrite |
| 39 | `/api/webhooks/cloudconnect` | GET\|POST | No | **Hardcoded backdoor** | DID lookup | **Yes** | No | **CRITICAL** | Accepts hardcoded fallback string even in prod! |
| 40 | `/api/webhooks/fonada` | GET\|POST | **No** | **No** | Delayed lookup | **Yes** | No | **CRITICAL** | Unauthenticated buffer injection + hardcoded `CRON_SECRET` |
| 41 | `/api/webhooks/fonada/worker` | POST | No | QStash (mock fallback) | Campaign/phone lookup | **Yes** | No | **CRITICAL** | `QSTASH_*_KEY` assigned `"mock_key_for_nextjs_build"` if unset |
| 42 | `/api/webhooks/inbound-routing` | POST | **No** | **No** | **Global phone lookup** | **Yes** | No | **CRITICAL** | Unauthenticated sticky routing & agent `on_call` mutation |
| 43 | `/api/webhooks/incoming-leads` | POST | No | `?token=` URL param | Lookup `tenant_settings.webhook_secret` | **Yes** | **No** | **CRITICAL** | Logs raw token & full PII; rejects intl numbers; single-tenant UUID trigger |
| 44 | `/api/webhooks/ivr` | GET\|POST | **No** | **No** | DID lookup | **Yes** | No | **CRITICAL** | Unauthenticated fake lead creation + wallet/WhatsApp trigger |
| 45 | `/api/webhooks/ozonetel/callback` | GET\|POST | No | Re-exports `cloudconnect` | Inherits `cloudconnect` | Via `cloudconnect` | No | **HIGH** | Inherits `cloudconnect` secret backdoor |
| 46 | `/api/webhooks/ozonetel/ivr` | GET\|POST | No | Re-exports `cloudconnect` | Inherits `cloudconnect` | Via `cloudconnect` | No | **HIGH** | Inherits `cloudconnect` secret backdoor |
| 47 | `/api/webhooks/ozonetel/sticky` | GET\|POST | No | Hardcoded fallback | Lookup `leads` by phone | **Yes** | No | **CRITICAL** | Uses `CLOUDCONNECT_WEBHOOK_SECRET` fallback + returns lead data |
| 48 | `/api/webhooks/portals` | POST | No | Bearer DB lookup | Yes (`credential.tenant_id`) | **Yes** | No | **MEDIUM** | Static token compare, inserts `"0000000000"` phone fallback |
| 49 | `/api/webhooks/trigger-push` | POST | **No** | **No** | None (`record.user_id`) | **Yes** | No | **CRITICAL** | Unauthenticated push spam trigger |
| 50 | `/api/webhooks/unicorn-call-outcomes` | POST | **No** | **No** | **None (`eq('id', leadId)`)** | **Yes** | No | **CRITICAL** | Unauthenticated lead status mutation + outbound WhatsApp trigger |
| 51 | `/api/webhooks/whatsapp` | GET\|POST | **No** | **Bypassed GET / Missing POST** | **Query `?tenant_id=` override** | **Yes** | No | **CRITICAL** | Logs `hub.verify_token`, always accepts GET challenge, zero sig on POST, hardcoded WABA creds |

> Full 13-column CSV recorded in `docs/phase23_1/evidence/crm_api_inventory_baseline.csv`. Remediation stopped at repository reconciliation gate.
