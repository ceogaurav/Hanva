# PRODUCTION CUTOVER CHECKLIST (MANDATORY PRE-FLIGHT GATES)

**Note:** Production cutover and HANVA live website CRM integration are **NOT AUTHORIZED** in Phase 23.2. Complete **every check below** in order during a planned maintenance window prior to authorising live traffic:

| # | Gate / Action | Verification Owner | Completion Criteria |
| --- | --- | --- | --- |
| 1 | **Provision & Test Isolated Cloud Staging DB** | DBA / DevOps | Run `migrations/001`, `002`, `003` cleanly against cloud Supabase staging; confirm `users`, `leads`, `wallet_ledger`, `security_audit_logs` RLS & `027`/`028` RPC isolation live |
| 2 | **Verify View, System Logs & Storage Buckets in Supabase** | DBA / Security | Confirm `agent_leaderboard_view` `security_invoker = true`, `system_activity_logs` policy uses `is_super_admin()`, and Storage buckets `attendance_selfies` & `kyc_documents` isolate tenants |
| 3 | **Rotate All Exposed Vendor & Database Secrets (P0/P1)** | SecOps / Infra | New keys live for Supabase `SERVICE_ROLE_KEY`, Fonada, Ozonetel/CloudConnect, Razorpay webhooks, Resend, OpenRouter, Calendarific, Meilisearch, QStash, Redis, and unique `CRON_SECRET` / `INCOMING_LEADS_HMAC_SECRET` |
| 4 | **Configure Distributed Infrastructure (`Redis` & `QStash`)** | Infra | `UPSTASH_REDIS_REST_*` and `QSTASH_*` populated & validated across serverless instances |
| 5 | **Release Android APK v2 & Validate Field Sync** | Mobile Eng | APK v2 (`Authorization: Bearer` header + zero `mockUser` bypass) verified against staging `/api/mobile/login` & `/api/telecaller/sim-calls`; telecallers upgraded |
| 6 | **Update Telephony & Portal Provider Webhook Headers** | Telephony Ops | Fonada, Ozonetel/CloudConnect, Unicorn, Razorpay, WhatsApp Meta, and 99acres/MagicBricks dashboards updated with new HMAC secrets / headers |
| 7 | **Take Pre-Cutover Production DB Snapshot** | DBA | Verified point-in-time recovery snapshot prior to running `migrations/001..003` on prod |
| 8 | **Approve Reconciled Branch Promotion (`security/phase-23-2-reconciled`)** | Repo Owner | Formal sign-off to merge `122466d` cleanly to `main` and deploy |
| 9 | **Execute Phase 24 Website Signed Gateway Staging Test** | Fullstack Eng | Configure `HANVA` `.env` with HTTPS `CRM_WEBSITE_INGEST_URL` + `>=32` byte HMAC/Bearer + `CRM_STAGE_A_SECURITY_APPROVED=true` in staging only; confirm lead flows end-to-end before prod switch |
| 10 | **Schedule Major Framework Upgrade (`next@14.2.35` -> `>=15.5.28`)** | Tech Lead | Formal upgrade sprint tracked to remediate remaining `26` Next.js CVEs |
