# ROLLBACK AND RECOVERY PLAN (PHASE 24)

## 1. Independent Framework & Database Version Anchors

- **Previous Working Reconciled Commit (Phase 23.2):** `security/phase-23-2-reconciled` @ `122466d` (`next 14.2.35`, `react 18.3.1`, immutable backup SHA-256 `70f40b9c946f2f8be40c32e96c9de7a6d7079e2b5d4d2c8031adc998a04c74d5`).
- **Upgraded Target Commit (Phase 24):** `security/phase-24-nextjs-modernization` @ `4dd3467` (`next 15.5.29`, `react 19.3.1`).
- **Database Schema Coupling:** **Zero** SQL schema changes were required for Phase 24 (`migrations/001`–`003` and `rollback_23_2.sql` remain 100% compatible with BOTH Next `14.2.35` and Next `15.5.29`).

---

## 2. Clean Rollback Procedure (`4dd3467` -> `122466d`)

1. **Git Code & Manifest Rollback (Zero Schema Disruption):**
   ```bash
   cd /Users/apple/Downloads/CRM-reconciled
   git checkout security/phase-23-2-reconciled   # @ 122466d
   pnpm install --frozen-lockfile
   rm -rf .next && pnpm build
   ```
   All `await props.params` / `use(props.params)` adapters revert cleanly with `package.json` & `pnpm-lock.yaml` without touching any database state.
2. **Container / Deployment Rollback:**
   - Redeploy previous container digest or Vercel immutable deployment linked to `122466d` (`next 14.2.35`). Note: reverting to `122466d` re-exposes the Next.js 14.2.35 advisories (never revert further back to unhardened `3d3f81a7`!).
3. **Database Rollback (Independently Reversible):**
   - Because Phase 24 made **no database changes**, Phase 24 code rollback requires **no database rollback**. If staging migrations `001`–`003` ever require independent reversal, run `migrations/rollback_23_2.sql` (verified in `PGlite` `T-DB-12`).
4. **Environment, API & Android Contract Parity:**
   - `.env.example`, `/api/mobile/login`, `/api/telecaller/sim-calls`, all 53 API route schemas, and HANVA `CRM_STAGE_A_SECURITY_APPROVED=false` remain byte-compatible across `122466d` and `4dd3467`.
