# FINAL PHASE 24 ACCEPTANCE CHECKLIST

**Phase 24 Target:** `/Users/apple/Downloads/CRM-reconciled` (`security/phase-24-nextjs-modernization` @ `4dd3467`)  
**Disposition:** **`PASS FOR PHASE 24 FRAMEWORK UPGRADE & LOCAL VERIFICATION`** | **`NO-GO FOR LIVE PRODUCTION CUTOVER PENDING CLOUD STAGING, CREDENTIAL ROTATION & ANDROID APK V2`**

---

| # | Acceptance Criterion (Section 16) | Status | Verified Basis |
| ---: | --- | --- | --- |
| 1 | Reconciled Phase 23.2 branch preserved intact | **PASS** | `security/phase-23-2-reconciled` untouched at `122466d`; backup bundle/tarball SHA-256 verified |
| 2 | Framework version supported & security-verified | **PASS** | Upgraded to patched `next@15.5.29` (`backport` LTS) over `next@16.4.6` to keep edge `middleware.ts`, `next lint`, and Webpack predictability while patching all advisories |
| 3 | Critical & High advisories resolved (`pnpm audit --json`) | **PASS (`0 / 0 / 0 / 0`)** | Reduced from `28` (`3` Crit, `9` High, `14` Mod, `2` Low) to **`0` advisories total**; ExcelJS compatibility with `uuid >= 11.1.1` verified (`6407`B XLSX) |
| 4 | React 19 compatibility verified | **PASS** | Upgraded `18.3.1 -> 19.3.1` + `vaul 1.1.2` + `use(props.params)` + `timeline-view.tsx` type fix; `0` unmet `@ai-sdk/react` errors (`1` pre-existing `react-day-picker`/`date-fns` peer warn retained) |
| 5 | `tsc --noEmit` passes cleanly | **PASS** | `0` errors (`2.40s`) without `ignoreBuildErrors` |
| 6 | `pnpm lint` passes cleanly | **PASS** | `0` ESLint errors (`83` pre-existing hook/img warnings, `4.15s`) without `ignoreDuringBuilds` |
| 7 | Clean `pnpm build` passes cleanly | **PASS** | Clean Next 15.5.29 Webpack build (`37.29s`, exit `0`, `--frozen-lockfile` `263ms` pass) |
| 8 | Security middleware & all 53 hardened API routes intact | **PASS** | `middleware.ts` JSON `401` + `updateSession`, `[T-SEC-1]` (`14/14` `401`) & `[T-SEC-2]` (`401/405/405/403`) |
| 9 | RLS, SQL RPC & cross-tenant isolation pass | **PASS** | `13/13` PostgreSQL 19.0 WASM (`PGlite`) + `[T-SEC-3]`/`[T-SEC-4]`/`[T-SEC-7]` HTTP cross-tenant `403` |
| 10 | Webhook verification & idempotency functional | **PASS** | `[T-SEC-6]` & `[T-FUNC-5]` (`Razorpay` HMAC + dedupe, `CloudConnect`, `WA`, `Incoming HMAC` + dedupe, telephony webhooks, QStash `503` unconfigured) |
| 11 | Core CRM workflows pass regression tests | **PASS (WITH ENV NOTES)** | `[T-FUNC-1..6]` (`6/6` PASS): SSR/async dynamic routes, bulk-assign, ExcelJS XLSX, `users/[id]` PATCH, SIM-calls dedupe, C2C, Reports, Ops Snapshot, Broadcast. External symlink `companies.db` missing & unconfigured Ozonetel Watchdog (`500`) verified as honest fail-safe/fail-closed behavior |
| 12 | Android API contract & APK v1 compatibility documented | **PASS** | Contract `token`/`access_token` + `Bearer` verified (`T-FUNC-4`); APK v2 rollout blocker preserved in `ANDROID_API_COMPATIBILITY_REPORT.md` |
| 13 | Before/after performance metrics recorded | **PASS** | Build `+2.51s`, SSR `/auth/login` `-15%`, Cron `-45.4%`, single-process Next 15 server RSS (`234.3 MB`) documented cleanly |
| 14 | Cloud staging blockers & rotation checklist documented | **PASS** | 6 Supabase objects (`agent_leaderboard_view`, `attendance_selfies`, `kyc_documents`, `system_activity_logs`, `auth.users`, `public.users`) + 12-provider rotation runbook ready |
| 15 | Rollback instructions documented cleanly | **PASS** | `git checkout 122466d` + `migrations/rollback_23_2.sql` cleanly decoupled |
| 16 | Strict change control & HANVA isolation maintained | **PASS** | No prod deploy, no GitHub push, `CRM` untouched (`3d3f81a`), `hanva-telecaller-android` untouched, HANVA `CRM_STAGE_A_SECURITY_APPROVED=false` (`[T-HANVA-ISO]` PASS) |
