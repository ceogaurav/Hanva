# GIT DIFF AND CHANGELOG (PHASE 24)

**Branch Created:** `security/phase-24-nextjs-modernization` (branched cleanly from untouched `security/phase-23-2-reconciled` @ `122466d`)  
**Commit Hash:** `4dd3467` (`4dd346777b9212293fb0f1a8972116b2078971ad`)  
**Diff Artifacts:** [upgrade_package_diff.txt](./evidence/upgrade_package_diff.txt), [upgrade_lockfile_diff_stat.txt](./evidence/upgrade_lockfile_diff_stat.txt), [upgrade_code_diff.patch](./evidence/upgrade_code_diff.patch), [upgrade_git_log.txt](./evidence/upgrade_git_log.txt)

---

## File-by-File Changelog (`20` Modified Files, `+1179 / -836`)

| File | Category | Change Summary |
| --- | --- | --- |
| `package.json` | Dependencies | Upgraded `next` (`^14.2.35 -> ^15.5.29`), `react` & `react-dom` (`^18 -> ^19.2.9`), `vaul` (`^0.9.9 -> ^1.1.2`), `postcss` (`^8.5.18 -> ^8.5.33`), `@types/react` (`^19.2.17`), `@types/react-dom` (`^19.2.3`), `eslint-config-next` (`15.5.29`); added `uuid >= 11.1.1` & `postcss >= 8.5.23` overrides |
| `pnpm-lock.yaml` | Lockfile | Updated dependency graph cleanly (`+1118 / -781`, `0` audit advisories, verified via `--frozen-lockfile`) |
| `next.config.mjs` | Image Security | Explicitly added `dangerouslyAllowSVG: false` under `images` while preserving strict `ignoreDuringBuilds: false` & `ignoreBuildErrors: false` |
| `components/timeline-view.tsx` | React 19 Types | Replaced removed global `JSX.Element` namespace with `React.ReactNode` |
| `lib/supabase/server-action.ts` | Async Cookies | Fixed synchronous `cookies()` -> `await cookies()` inside `createServerActionClient()` |
| `app/admin/attendance/analytics/page.tsx` | Next 15 Dynamic | Added `"use client"` directive required by Next 15 for `next/dynamic(..., { ssr: false })` |
| `app/api/admin/users/[id]/route.ts` | Async API Params | Updated `PATCH` signature to `props: { params: Promise<{ id: string }> }` + `await props.params` |
| `app/admin/users/[id]/edit/page.tsx`, `app/pay/[tenantId]/page.tsx`, `app/kyc-upload/[token]/page.tsx` | Async Server Params | Awaited `Promise<params>` & `Promise<searchParams>` in Server Components |
| `app/admin/calls/page.tsx`, `app/admin/inbox/page.tsx`, `app/admin/leads/page.tsx`, `app/admin/reports/page.tsx`, `app/telecaller/calls/page.tsx`, `app/telecaller/leads/page.tsx` | Async SearchParams | Awaited `Promise<searchParams>` cleanly in async SSR page entrypoints |
| `app/admin/leads/[id]/page.tsx`, `app/kyc-team/[id]/page.tsx`, `app/kyc-team/leads/[id]/page.tsx`, `app/telecaller/leads/[id]/page.tsx` | React 19 Client `use()` | Updated dynamic client pages to `props: { params: Promise<{ id: string }> }` unwrapped with `React.use(props.params)` |
