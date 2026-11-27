# RATE LIMITING & ABUSE PROTECTION REPORT

**Phase:** 23.1 (Section 11 Distributed Multi-Instance Design)  
**Target:** `/Users/apple/Downloads/CRM` (Deployed multi-function Next.js serverless runtime on Vercel / Node workers)

---

## 1. Current Baseline Assessment

- **API Route Rate Limiting:** **`0 / 51` CRM API routes** enforce HTTP rate limiting or `429 Too Many Requests` (`crm_api_inventory_baseline.csv`).
- **Existing Business Limiters:** Only `CRM/lib/whatsapp-rate-limiter.ts` exists (`checkDailyDocMessageLimit` queries `chat_messages` count per phone per day — business messaging quota, NOT HTTP/abuse throttling).
- **Risk With Process-Local Maps in CRM Production:** Serverless/Edge workers spawn stateless short-lived isolates; JavaScript `Map` counters reset per cold start and fail under distributed brute-force or webhook floods. Note that Upstash QStash (`@upstash/qstash`) is already provisioned in CRM (`package.json`), making **Upstash Redis (`REST` atomic sliding-window)** or **PostgreSQL `api_rate_limits` atomic UPSERT** (`staging_migration_01_rls_and_security_definer.sql`) cleanly deployable without local-map state drift.

---

## 2. Recommended Shared Rate Limiting Specification

| Endpoint Group | Bucket Key | Window & Max Requests | Failure Mode (Store Unavailable) |
| --- | --- | --- | --- |
| Auth & Mobile Login (`/api/auth/*`, `/api/mobile/login`) | `sha256(client_ip)` + `sha256(email_lower)` | `10` req / `15 min` (IP), `5` failed / `15 min` (account) | **Fail closed (`503`)** on login bursts |
| Lead Ingestion / Website Gateway (`incoming-leads`, `portals`, future website webhook) | `sha256(client_ip)` + `sha256(tenant_id)` | `30` req / `1 min` (IP), `300` req / `1 min` (tenant) | **Fail closed (`503`)** |
| Broadcasts & Bulk Assign (`/api/admin/broadcast`, `/api/admin/leads/bulk-assign`, `/api/admin/ai-call`) | `tenant_id` + `actor_user_id` | `5` req / `5 min` (broadcast), `20` req / `1 min` (bulk assign) | **Fail closed (`503`)** |
| Telecaller Call Ingestion (`/api/telecaller/sim-calls`) | `user_id` + `tenant_id` | `60` req / `1 min` per authenticated agent | Queue client retry locally in Capacitor |
| Provider Webhooks (`cloudconnect`, `fonada`, `whatsapp`, `razorpay`) | `provider_name` + `tenant_id` | `600` req / `1 min` (signature validated BEFORE heavy DB writes) | Return `429` with `Retry-After` so provider retries cleanly |

- **Atomicity & Expiry:** Upstash Redis Lua script (`INCR` + `PEXPIRE`) or Postgres `INSERT ... ON CONFLICT (bucket_key) DO UPDATE ...` prevents race conditions across concurrent serverless instances, and every `429` returns `Retry-After` without masking downstream alerts.
