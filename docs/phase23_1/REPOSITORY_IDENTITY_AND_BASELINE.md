# REPOSITORY IDENTITY & BASELINE

**Phase:** 23.1 (Section 2 Mandatory Verification)  
**Outcome:** **`UNRESOLVED / CONFLICTS CONFIRMED — MUTATION STOPPED TO PREVENT CODE LOSS`**

---

## 1. Local & Remote Repository Measurements

| Repository / Workspace | Remote URL / Tracking | Branch & Commit Hash | Working Tree Status |
| --- | --- | --- | --- |
| **`/Users/apple/Downloads/CRM`** | `origin`: `https://github.com/gauravhotstar/CRM.git` (fetch & push) | `main` @ `3d3f81a7e38345acf609cc47fec34dfbf631090c` (`318` commits, Sat Oct 24 2026) | Dirty: **`75` uncommitted modified/untracked files** (edited Nov 11–Nov 25, 2026) |
| **`https://github.com/seobanks/CRM`** | Upstream mirror origin (`seobanks/CRM`) | `main` @ `bec603f93a7a905bbaba1d18a3252355b4b97626` (`328` commits, Thu Nov 05 2026) | Clean remote clone inspected read-only inside artifact scratch dir |
| **`https://github.com/gauravhotstar/CRM`** | Mirror target (`origin`) | `main` @ `3d3f81a7e38345acf609cc47fec34dfbf631090c` | Remote matches local `HEAD` (`0` commits ahead/behind remote `origin/main`, `10` commits behind `seobanks/CRM`) |
| **`/Users/apple/Downloads/HANVA`** | Website workspace (`https://www.hanva.in`) | `main` @ `c5ec9928093c78bb7f87a1e4d5957bb91f2120e3` | Phase 20–23 work intact (`lib/leads/*`, `app/api/leads/route.ts`, `.env.example` added in Phase 23) |
| **`/Users/apple/Downloads/hanva-telecaller-android`** | Non-git mobile workspace | N/A | Prebuilt APK & Vite/Capacitor source (`src/App.tsx`); left strictly unmodified |

---

## 2. Ancestry, Mirror Mechanics & Why Divergence Occurred

1. **Historical Upstream Proof (`seobanks/CRM/.github/workflows/mirror.yml`):**
   - `seobanks/CRM` configured a GitHub Actions workflow (`Mirror Repo`) running `git push --force mirror main` into `https://github.com/gauravhotstar/CRM.git`.
   - `git merge-base --is-ancestor 3d3f81a7 HEAD` is `TRUE` on `seobanks/CRM`. Mirroring succeeded through commit `3d3f81a7` (Oct 24, 2026) and failed/halted thereafter.
2. **10 Commits Unique to `seobanks/CRM` (`3d3f81a7..bec603f9`, Oct 29–Nov 05):**
   - `74a05e7` .. `bec603f`: Heatmap screenshot share modals, BanksCart logos (`public/bankscart-logo.png`, `lib/bankscart-logo-base64.ts`), telecaller descending sort (`83e5b19`), DID registry cache (`lib/did-registry-cache.ts`), `call_logs` 406 upsert & Realtime channel leak fixes (`1e52566`), statement timeout / call metrics fixes (`2316c49`, `bec603f` -> `app/api/admin/reports/calls/route.ts`).
   - Total changed across `seobanks/CRM` unique commits: **`48` files**. **`10` files exist ONLY in `seobanks/CRM`** and are absent from `/Users/apple/Downloads/CRM`.
3. **75 Uncommitted Files Unique to Local `/Users/apple/Downloads/CRM` (Nov 11–Nov 25):**
   - Major SaaS/billing/telephony/mobile developments were written directly into local `/Users/apple/Downloads/CRM` atop `3d3f81a7` without committing to GitHub: Razorpay billing (`razorpay-actions.ts`, `api/payments/razorpay/webhook`, `app/pay/`), GST invoicing (`invoice-action.ts`, `app/admin/invoices/`), WhatsApp billing alerts, Ozonetel campaign health watchdog (`api/cron/campaign-health-watchdog`, `api/admin/campaign-health-watchdog`, `lib/ozonetel-campaign-health.ts`), Mobile APK routes (`api/mobile/login`, `api/telecaller/sim-calls`), Company Eligibility microservice routes, and modified `middleware.ts`, `package.json`, `pnpm-lock.yaml`.
4. **Direct Overlap & Divergence Across `12` Files:**
   - Comparing SHA-256 checksums of all `12` overlapping files changed in BOTH `seobanks/CRM` (`3d3f81a..bec603f`) and local `/Users/apple/Downloads/CRM` dirty working tree (`crm_repo_reconciliation_matrix.txt`):
     - **`1` matches byte-for-byte:** `app/admin/settings/page.tsx` (`b6834aa999b1`).
     - **`11` have diverged contents:** `app/actions/tenant-settings.ts`, `app/actions/whatsapp.ts`, `app/admin/ivr-upload/page.tsx`, `app/admin/page.tsx`, `app/api/webhooks/cloudconnect/route.ts`, `app/api/webhooks/ivr/route.ts`, `app/api/webhooks/whatsapp/route.ts`, `app/telecaller/leads/page.tsx`, `components/leads-table.tsx`, `components/telecaller-lead-filters.tsx`, and `lib/whatsapp-rate-limiter.ts`.

---

## 3. Authoritative Determination & Preservation Action

- **Determination:** Neither unmerged branch can autonomously overwrite the other: `seobanks/CRM` holds essential Nov 05 production performance/Realtime leak fixes (`48` files), whereas local `/Users/apple/Downloads/CRM` holds **`63` unique local files + `11` diverged files** built through Nov 25 including Razorpay/Invoices/Mobile APK/Watchdog.
- **Preservation:** Saved complete local baseline snapshots before stopping CRM edits:
  - `docs/phase23_1/evidence/crm_pre_23_1_status.txt`
  - `docs/phase23_1/evidence/crm_pre_23_1_diff.patch`
  - `docs/phase23_1/evidence/seobanks_unique_commits_stat.txt`
  - `docs/phase23_1/evidence/crm_repo_reconciliation_matrix.txt`
- **Action Taken:** Stopped all edits to `/Users/apple/Downloads/CRM` source per Section 2 & Section 18; delivered full standalone security patches, ordered staging migrations, and rollback scripts under `docs/phase23_1/evidence/remediation/` pending explicit owner reconciliation decision.
