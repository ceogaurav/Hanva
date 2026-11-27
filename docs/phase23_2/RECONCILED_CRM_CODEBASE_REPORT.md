# RECONCILED CRM CODEBASE REPORT

**Worktree Path:** `/Users/apple/Downloads/CRM-reconciled`  
**Git Branch:** `security/phase-23-2-reconciled`  
**Commit Chain Beyond `seobanks/CRM` (`bec603f`):**
1. `6cebadb` — `chore(reconcile): merge seobanks/CRM bec603f9 and local Nov 25 working tree onto security/phase-23-2-reconciled` (`90` files changed, `+14513 / -1420`)
2. `4ee83f0` — `security(phase-23.2): purge hardcoded secrets, harden all 53 API routes, add RLS & idempotency migrations, fix TS/ESLint/build` (`133` files changed, `+6526 / -1857`)
3. `122466d` — `docs(env): track placeholder-only .env.example template` (`1` file, `.env.example`, `+65`)

---

## 1. Preserved Business Modules & Capabilities

Both `seobanks/CRM` telemetry stability fixes and `/Users/apple/Downloads/CRM`'s latest Nov 25 workflows coexist and build cleanly together in `/Users/apple/Downloads/CRM-reconciled`:

- **Lead Management & Telecalling:** `app/telecaller/leads/page.tsx`, `components/leads-table.tsx`, `components/telecaller-lead-filters.tsx`, `app/admin/leads/[id]/page.tsx`, `app/telecaller/global-search/page.tsx`, `/api/leads/export`, `/api/admin/leads/bulk-assign`, `/api/transfer-lead`, `/api/click-to-call`.
- **IVR, Dialers & Campaign Watchdog:** `app/admin/ivr-upload/page.tsx`, `app/actions/campaigns.ts`, `app/actions/cloudconnect.ts`, `app/actions/ivr-upload-action.ts`, `app/actions/ai-obd-dialer.ts`, `lib/ozonetel-cloudagent.ts`, `lib/ozonetel-campaign-health.ts`, `lib/did-registry-cache.ts`, `app/super-admin/did-registry/page.tsx`.
- **WhatsApp & Notifications:** `app/actions/whatsapp.ts`, `app/actions/whatsapp-billing-alerts.ts`, `lib/whatsapp-rate-limiter.ts`, `/api/notifications/{send,subscribe,unsubscribe}`, `/api/webhooks/whatsapp`.
- **Razorpay Billing, Invoices & Master Data:** `app/actions/razorpay-actions.ts`, `app/actions/invoice-action.ts`, `app/pay`, `/api/payments/razorpay/webhook`, `app/admin/master-data/page.tsx`, `/api/companies/search`.
- **Attendance, Face Auth, Geofence & Reports:** `app/admin/attendance/{dashboard.tsx,kiosk/page.tsx}`, `components/attendance/face-auth-modal.tsx`, `components/telecaller/GeofenceAccessGuard.tsx`, `/api/admin/reports/calls`, `/api/admin/operations/snapshot`.

---

## 2. New Phase 23.2 Security & Schema Artifacts in Reconciled Repo

- `lib/security/crm-guards.ts` (`535` lines): Centralized strict server secrets, session/Bearer JWT & DB role verification (`public.users`), role escalation matrix (`assertCanGrantRole`), fail-closed `verifyCronAuthorization`, HMAC-SHA256 `verifyHmacWebhookSignature`, constant-time `verifySharedWebhookToken`, Redis/Postgres `checkSharedRateLimit`, and PII-redacting `emitSecurityAuditLog`.
- `app/api/admin/holidays/route.ts`: Authenticated server-only proxy replacing exposed client Calendarific API key.
- `.eslintrc.json` & hardened `next.config.mjs` (`ignoreDuringBuilds: false`, `ignoreBuildErrors: false`).
- `.env.example` (`60` lines, placeholder-only configuration map covering all integrations, QStash, Upstash Redis, and webhook secrets).
- `migrations/`: `001_reconciled_missing_tables.sql`, `002_rls_and_security_definer_hardening.sql`, `003_idempotency_audit_and_rate_limits.sql`, `rollback_23_2.sql`.
