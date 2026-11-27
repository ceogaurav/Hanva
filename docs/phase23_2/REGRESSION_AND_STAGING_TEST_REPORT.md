# REGRESSION AND STAGING TEST REPORT

**Execution Environment:**
- **Database Suite (`pg_rls_verify.mjs`):** `@electric-sql/pglite` real PostgreSQL 19.0 WASM executing `migrations/001`, `002`, `003`, and `rollback_23_2.sql`.
- **HTTP Staging Suite (`staging_api_verify.mjs`):** Live compiled Next.js `14.2.35` production server (`pnpm start -p 3009` built cleanly from `/Users/apple/Downloads/CRM-reconciled`) backed by an isolated HTTP Supabase harness (`127.0.0.1:3999`) + live HANVA marketing site (`http://127.0.0.1:3001`).

**Evidence Files:** [pg_rls_verification.json](./evidence/pg_rls_verification.json), [staging_api_verification.json](./evidence/staging_api_verification.json), [pg_rls_verify_run.txt](./evidence/pg_rls_verify_run.txt), [staging_api_verify_run.txt](./evidence/staging_api_verify_run.txt)

---

## 1. PostgreSQL Engine RLS & Function Suite (`13 / 13 PASS`)

| ID | Test Case Verified on PostgreSQL 19.0 | Result | Key Observation |
| --- | --- | --- | --- |
| `T-DB-1` | Tenant A telecaller cannot read Tenant B leads | **PASS** | Returns `aaaa1111-0000-4000-8000-000000000001` only |
| `T-DB-2` | Tenant A telecaller cannot mutate Tenant B lead | **PASS** | `updated=0` |
| `T-DB-3` | Tenant A admin user list excludes Tenant B users | **PASS** | `count=3` (Tenant A rows only) |
| `T-DB-4` | Telecaller self role-escalation blocked by `users_self_safe_update` `WITH CHECK` | **PASS** | `blocked=true` |
| `T-DB-5` | Non-super-admin blocked from hijacking `tenant_did_registry` | **PASS** | `blocked=true` |
| `T-DB-6` | Wallets visible only to own tenant admins (zero telecaller/cross-tenant read) | **PASS** | `adminA=1, empA=0` |
| `T-DB-7` | `handle_new_user()` ignores `user_metadata.role` privilege escalation | **PASS** | `assigned_role=telecaller` |
| `T-DB-8` | `get_next_auto_dial_lead` enforces tenant & caller lock | **PASS** | `leadTenant=11111111-1111-4111-8111-111111111111, foreignCallBlocked=true` |
| `T-DB-9` | `get_telecaller_lead_counts` rejects cross-tenant inspection | **PASS** | `blocked=true` |
| `T-DB-10` | `bulk_assign_leads` rejects cross-tenant lead array | **PASS** | `blocked=true` |
| `T-DB-11` | `wallet_ledger` unique index blocks duplicate Razorpay recharge | **PASS** | `duplicateBlocked=true` |
| `T-DB-13` | Attendance rows isolated strictly by tenant even for admin role | **PASS** | `rows=1` |
| `T-DB-12` | `security_audit_logs` admin read + `rollback_23_2.sql` reversible execution | **PASS** | `rollback executed cleanly` |

---

## 2. Staging HTTP API, Security & Isolation Suite (`11 / 11 PASS`)

| ID | HTTP Staging Test Case | Result | Key Detail |
| --- | --- | --- | --- |
| `T-API-1` | All 14 protected/user/admin/mobile endpoints fail closed `401` unauthenticated | **PASS** | All `14/14` returned `401` |
| `T-API-2` | Maintenance GET routes fail closed & non-super-admin POST blocked | **PASS** | `unauth=401, fixCheckoutGet=405, fixIvrGet=405, empPost=403` |
| `T-API-3` | Telecaller w/ spoofed `user_metadata.role='admin'` & Admin role escalation blocked | **PASS** | `empReports=403, empNotif=403, grantSuper=403, patchSuper=403` |
| `T-API-4` | Cross-tenant API access rejected `403` across `reports/bulk/notif/ai-call/sim-calls` | **PASS** | All `5/5` returned `403` |
| `T-API-5` | Same-tenant Admin reports, Mobile Login JWT, & SIM-call deduplication succeed | **PASS** | `calls=200, login=200, sim1=200, simDup=true` |
| `T-API-6` | Cron & Debug enforce Bearer `CRON_SECRET`, reject `?key=`, omit PII/key prefixes | **PASS** | `unauth=401, cronQuery=401, dbgQuery=401, cronValid=200, dbgValid=200` |
| `T-API-7` | Signed Webhooks verify HMAC/headers, reject backdoors/`?token=`, deduplicate replays | **PASS** | `rzp(401/200/Already credited), cc(401/200), wa(403/200/401), inc(401/200/true)` |
| `T-HANVA-ISO` | HANVA `/api/leads/` stays isolated (non-prod `sandbox_mock`, zero prod sync, WhatsApp intact) | **PASS** | `status=201, mode=sandbox_mock, synced=false, waPhone=+91 8423711043` |
| `T-API-8` | CSV export neutralizes formula cells (`=cmd|...`, `+SUM(...)`) & excludes Tenant B | **PASS** | `status=200, neutralized=true, isolated=true` |
| `T-API-9` | All 10 remaining telephony/portal/worker webhooks fail closed unauthenticated | **PASS** | `401` x `9`, QStash `503` unconfigured |
| `T-API-10` | Shared rate limiter triggers `429` on `/api/mobile/login` brute force (`>10` reqs) | **PASS** | `10 x 401` then `429, 429` |

**Audit Telemetry:** `19` structured `security_audit_logs` records captured cleanly.  
**Scope Note:** Live cloud Supabase staging database migration execution (verifying existing `auth.users`, views, Storage buckets, and external live vendor callbacks) remains pending staging environment provisioning.
