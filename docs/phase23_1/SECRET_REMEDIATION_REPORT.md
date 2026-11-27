# SECRET & CREDENTIAL REMEDIATION REPORT

**Phase:** 23.1 (Section 3 Forensic Secret Audit — All Values Redacted)  
**Evidence Artifacts:** `docs/phase23_1/evidence/crm_secret_scan_redacted.txt`, `docs/phase23_1/evidence/remediation/env.example.hardened`  
**Total Secret/Fallback Pattern Matches Across CRM:** **`58` matches across `21` files** (+ `.env.local` & `.gitignore` review)

> [!CAUTION]
> **Active vs. Historical Compromise:** At least **`10` files** contain hardcoded credentials/tokens/fallback keys **already committed into Git `HEAD` (`3d3f81a` & `seobanks/CRM`)**, meaning Git history itself is tainted and **credential rotation is mandatory even after code removal**.

---

## 1. Comprehensive Redacted Secret Inventory

| File Path | Secret Category | Active / Historical | Committed in Git `HEAD` | Client / Browser Exposed | Rotation Required | Recommended Remediation |
| --- | --- | --- | --- | --- | --- | --- |
| `app/admin/attendance/dashboard.tsx` (`L535`) | Calendarific `API_KEY` | Active | **YES** | **YES (`"use client"`)** | **Yes** | Move holiday sync to server route reading `CALENDARIFIC_API_KEY`; rotate key |
| `dashboard_old.tsx` (`L523`) | Calendarific `API_KEY` | Historical/Dead file | **YES** | **YES (React component)** | **Yes** | Delete dead file from repo after Git purge / rotation |
| `test_unicorn_api.js` (`L1-2`) | Test/service login `email` + `password` | Local file (`untracked`) | **No** | No | **Yes** (if valid creds) | Remove local credential test file; store test creds outside workspace |
| `app/actions/whatsapp.ts` (`L65,70-74,133,208+`) | Fonada WABA Bearer token (`fsk_...`), `userid`, `password`, account UUID | Active | No (dirty local; *Note: verify `seobanks/CRM` too*) | Server Action (server-side) | **YES (CRITICAL)** | Strip fallback literals; fail closed with `requireServerSecret(...)`; rotate Fonada tokens |
| `app/actions/whatsapp-billing-alerts.ts` (`L159,288-290`) | Fonada Bearer token (`fsk_...`), `userid`, `password` | Active | No (`untracked`) | Server Action | **YES (CRITICAL)** | Strip fallback literals; fail closed; rotate Fonada creds |
| `app/api/webhooks/whatsapp/route.ts` (`L71-74,543`) | Fonada Bearer (`fsk_...`), `userid`, `password`, WABA number | Active | **YES** | No (API route) | **YES (CRITICAL)** | Strip fallback literals; fail closed; rotate Fonada creds |
| `scripts/tenant-lead-whatsapp-listener.js` (`L17,65,67`) | Hardcoded Supabase URL + Fonada `userid`/WABA | Active | **YES** | No (Node script) | **Yes** | Require `NEXT_PUBLIC_SUPABASE_URL` & DB creds; fail at startup |
| `app/api/cron/daily-report/route.ts` (`L7`) | Resend API key (`re_...`) fallback | Active | **YES** | No | **YES (CRITICAL)** | Remove fallback string; require `RESEND_API_KEY`; rotate key in Resend |
| `app/api/admin/ai-call/route.ts` (`L92`) | Fonada OBD `ukey` literal + static `userId`/`campaignId` | Active | **YES** | No | **YES (HIGH)** | Move `FONADA_OBD_UKEY` to env/DB tenant config; rotate `ukey` |
| `app/api/cron/process-webhooks/route.ts` (`L119,123`) | Hardcoded `CRON_SECRET` fallback literal + direct comparison | Active | **YES** | No | **YES (CRITICAL)** | Remove literal fallback; use fail-closed `verifyCronAuthorization()` |
| `app/api/webhooks/fonada/route.ts` (`L80`) | Hardcoded `CRON_SECRET` fallback literal | Active | **YES** | No | **YES (CRITICAL)** | Remove literal; replace HTTP self-call with signed internal invocation / direct call |
| `app/api/webhooks/cloudconnect/route.ts` (`L212,219-220`) | Hardcoded `CLOUDCONNECT_WEBHOOK_SECRET` fallback + bypass check | Active | **YES** | No | **YES (CRITICAL)** | Remove literal backdoor; rotate `CLOUDCONNECT_WEBHOOK_SECRET` |
| `app/api/webhooks/ozonetel/sticky/route.ts` (`L49`) | Hardcoded `CLOUDCONNECT_WEBHOOK_SECRET` fallback literal | Active | **YES** | No | **YES (CRITICAL)** | Remove literal fallback; require env secret |
| `app/api/webhooks/fonada/worker/route.ts` (`L9-14`) | Hardcoded `"mock_key_for_nextjs_build"` assigned if QStash env missing | Active | **YES** | No | No (QStash real keys) | Never mutate signing env vars at module scope; check at request time and return `503` if unset |
| `app/actions/cloudconnect.ts` (`L6`) | Hardcoded `CLOUDCONNECT_API_TOKEN` fallback | Active | No (local dirty / historical) | Server Action | **Yes** | Remove literal fallback; fail closed |
| `app/actions/ivr-upload-action.ts` (`L531,574,750`) | Hardcoded `OZONETEL_API_KEY` & `OZONETEL_USER_NAME` fallbacks | Active | No (local dirty) | Server Action | **Yes** | Remove fallback literals; require env secrets |
| `lib/ozonetel-cloudagent.ts` (`L14-16`) & `ozonetel-campaign-health.ts` (`L44`) | Hardcoded Ozonetel portal user/pass/API key + Supabase URL fallback | Active | No (`untracked`) | Server lib | **YES (CRITICAL)** | Strip portal password & API key fallbacks; fail closed; rotate Ozonetel credentials |
| `lib/meilisearch.ts` (`L6`), `companies/search` (`L6`), `master-data/stats` (`L80`) | Default URL fallbacks (`NEXT_PUBLIC_MEILISEARCH_HOST`, `COMPANY_ELIGIBILITY_API_URL`) | Active | Mixed | Partial (`NEXT_PUBLIC_`) | No | Enforce explicit URL env config on startup |
| `app/auth/{login,signup}/page.tsx`, `app/auth/callback/route.ts` | Localhost / redirect URL fallbacks | Low-risk config | Mixed | Yes (`auth` pages) | No | Keep server/origin allowlist strict |

---

## 2. Environment Hygiene & Startup Fail-Closed Remediation Blueprint

- Verified `.gitignore` includes `.env*` (safe on working tree, **does NOT erase credentials committed directly in `.ts/.tsx/.js` source files**!).
- Checked `NEXT_PUBLIC_*` references: only `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `NEXT_PUBLIC_IVR_CREDIT_PRICE`, `NEXT_PUBLIC_MEILISEARCH_HOST`, `NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY` appear in `NEXT_PUBLIC_*`. Confirm `MEILISEARCH_SEARCH_KEY` is read-only search key, never master key.
- Prepared complete placeholder-only template [`env.example.hardened`](./evidence/remediation/env.example.hardened) covering all `30` required env keys safely + fail-closed `requireServerSecret()` inside [`crm_security_guard_reference.ts`](./evidence/remediation/crm_security_guard_reference.ts).
- **Zero live rotations executed** per Section 3 & Section 19; documented rotation plan in `MIGRATION_AND_ROLLBACK_PLAN.md`.
