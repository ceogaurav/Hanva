# HANVA TECHNOLOGIES — BACKUP, RECOVERY & RELEASE READINESS
## Data Protection, Environment Separation, Rollback Plans & Incident Response

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 30  
**Target Workspaces:** `HANVA`, `CRM-reconciled`, `hanva-telecaller-android`, `PETPOOJA POS`  
**Date:** November 2026

---

## 1. Repository Preservation & Local Backup Status

All engineering workspaces on this local machine maintain intact, uncommitted Git working copies and backups:

| Workspace | Local Path | Active Branch | Clean Git Status? | Backup State |
| :--- | :--- | :--- | :---: | :--- |
| **Website** | `/Users/apple/Downloads/HANVA` | `main` | Clean (Untracked docs only) | Full local Git tree + Phase 25/26/27 ZIP packages |
| **CRM** | `/Users/apple/Downloads/CRM-reconciled` | `security/phase-24-nextjs-modernization` | **Clean (100% clean)** | Preserved at commit `4dd3467`; historical backup in `CRM` |
| **POS** | `/Users/apple/Downloads/PETPOOJA POS` | `main` | Clean | Preserved at commit `99033c7` (`seobanks/POS`) |
| **Android** | `/Users/apple/Downloads/hanva-telecaller-android` | N/A (Folder) | Intact | Preserved local Capacitor/Android build assets |

---

## 2. Environment Separation & Secret Boundary

A critical prerequisite for production release is strict isolation between Development, Staging, and Production environments:

```
┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
│ LOCAL DEVELOPMENT       │ CLOUD STAGING           │ PRODUCTION              │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ • Local Next.js dev     │ • Isolated Supabase     │ • Authoritative Cloud   │
│ • Synthetic mock data   │ • Sanitized mock schema │ • Live Customer Data    │
│ • PGlite / SQLite       │ • Cloud PostgreSQL      │ • High-Availability DB │
│ • Sandbox mock APIs     │ • Sandbox vendor keys   │ • Production API keys   │
│ • Fail-closed gateway   │ • Gated webhooks        │ • Full integration      │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

### Current Audit Finding:
- **Website Environment:** Runs safely in standalone mode with `CRM_STAGE_A_SECURITY_APPROVED=false`. Does NOT connect to production Supabase.
- **CRM Staging Environment: UNPROVISIONED.** The cloud staging environment has not yet been provisioned. Local PGlite WASM execution cannot substitute for cloud multi-tenant validation.

---

## 3. Rollback Runbooks by Component

### A. Website Frontend Rollback
- If an erroneous build is deployed to production DNS/hosting:
  1. Trigger instant rollback to the previous immutable deployment artifact in Vercel/Cloudflare Pages dashboard (RTO < 60 seconds).
  2. Git rollback: Revert commit on `main` branch: `git revert HEAD --no-edit && git push origin main`.

### B. Database Migration Rollback (`CRM-reconciled`)
- The migration chain in `CRM-reconciled/migrations/` includes a dedicated companion rollback script:
  `migrations/rollback_23_2.sql`
- Reverses `001_reconciled_missing_tables.sql`, `002_rls_and_security_definer_hardening.sql`, and `003_idempotency_audit_and_rate_limits.sql` in strict reverse order without schema corruption.

### C. Secret Exposure Incident Response Protocol
- If an API token or webhook secret is accidentally leaked:
  1. Immediately revoke the compromised secret in the vendor portal (Supabase, Fonada, Razorpay, Resend).
  2. Generate a new cryptographically secure random secret (>= 32 bytes hex).
  3. Update production environment variables and trigger zero-downtime redeployment.
  4. Inspect vendor audit logs for unauthorized requests during the compromise window.
