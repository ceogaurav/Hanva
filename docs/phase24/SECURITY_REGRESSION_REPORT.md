# SECURITY REGRESSION REPORT (PHASE 24)

**Test Harness:** Compiled `Next.js 15.5.29` + `React 19.3.1` production server (`127.0.0.1:3010`), isolated `@electric-sql/pglite` PostgreSQL 19.0 engine, and live HANVA website (`127.0.0.1:3001`).  
**Evidence Files:** [phase24_security_regression.json](./evidence/phase24_security_regression.json), [phase24_pg_rls_verification.json](./evidence/phase24_pg_rls_verification.json)

---

## 1. HTTP Security & Isolation Regression Results (`9 / 9 PASS`, `24` Audit Logs Recorded)

| ID | Control Verified on Next 15.5.29 | Observed Output | Status |
| --- | --- | --- | --- |
| `T-SEC-1` | 14 protected/user/admin/mobile endpoints fail closed unauthenticated (`401`) | All `14/14` returned `401` | **PASS** |
| `T-SEC-2` | Maintenance GET routes return `401` unauth / `405` auth; non-`super_admin` POST blocked (`403`) | `401/405/405/403` | **PASS** |
| `T-SEC-3` | Spoofed `user_metadata.role='admin'` & admin->`super_admin` privilege escalation blocked (`403`) | `403/403/403/403` across `reports`, `notifications/send`, `users`, `users/[id]` | **PASS** |
| `T-SEC-4` | Cross-tenant isolation across `reports/calls`, `bulk-assign`, `notifications/send`, `ai-call`, `sim-calls` | All `5/5` rejected with HTTP `403` | **PASS** |
| `T-SEC-5` | Cron & Debug enforce Bearer `CRON_SECRET`, reject `?key=` query leakage, omit PII | `401/401/401/200/200`, `0` `@` emails or secret prefixes | **PASS** |
| `T-SEC-6` | All 14 webhook endpoints + Razorpay HMAC & duplicate recharge idempotency | Razorpay no-sig `401`, valid `200`, replay `"Already credited"`; CloudConnect backdoor `401`; WA `403`/`200`/`401`; 9 telephony/portal webhooks `401` + QStash worker `503` unconfigured | **PASS** |
| `T-SEC-7` | CSV export neutralizes `=cmd\|...`, `+SUM(...)` & isolates cross-tenant rows | HTTP `200`, neutralized cells present, `Beta Lead` absent | **PASS** |
| `T-SEC-8` | Shared brute-force rate limiter on `/api/mobile/login` | `10 x 401`, then HTTP `429` on attempts 11–12 | **PASS** |
| `T-HANVA-ISO` | HANVA marketing website `/api/leads/` isolation & WhatsApp fallback preserved | `status=201, mode=sandbox_mock, production_crm_synced=false`, phone `+91 8423711043` | **PASS** |

---

## 2. Database RLS & SQL Function Re-Verification (`13 / 13 PASS`)

Re-executed `pg_rls_verify.mjs` against `/Users/apple/Downloads/CRM-reconciled/migrations/{001,002,003,rollback_23_2}.sql` on PostgreSQL 19.0 WASM:
- Zero schema changes were introduced or needed by the Next 15 / React 19 upgrade (`13/13` PASS: `T-DB-1` through `T-DB-13`, reversible rollback clean).
