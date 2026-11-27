# PERFORMANCE COMPARISON REPORT

**Measurement Methodology:** Identical machine (`macOS`, Node `v22.23.4`, `pnpm 12.18.0`), clean `rm -rf .next && /usr/bin/time -p pnpm build`, and `./node_modules/.bin/next start` (`bench_crm_runtime.mjs`) against isolated HTTP mock harness on dedicated port `3011`.  
**Evidence Files:** [baseline_perf.json](./evidence/baseline_perf.json), [upgrade_perf.json](./evidence/upgrade_perf.json), [baseline_build.txt](./evidence/baseline_build.txt), [upgrade_build.txt](./evidence/upgrade_build.txt)

---

## 1. Build, Typecheck, Lint & Bundle Size Comparison

| Metric | Baseline (`next 14.2.35`, `react 18.3.1`) | Upgraded (`next 15.5.29`, `react 19.3.1`) | Delta / Notes |
| --- | --- | --- | --- |
| **`pnpm exec tsc --noEmit`** | `1.57s` (`0` errors) | `2.40s` (`0` errors) | `+0.83s` (`Promise<params>` / React 19 type graph) |
| **`pnpm lint` (`next lint`)** | `1.32s` (`0` errors, `83` warnings) | `4.15s` (`0` errors, `83` warnings) | `+2.83s` (`eslint-config-next 15.5.29` rules) |
| **Clean `pnpm build` (wall time)** | `34.78s` (user `75.68s`) | `37.29s` (user `75.39s`) | `+2.51s` (`+7.2%` wall; identical CPU time) |
| **`.next` Build Artifact Disk Size** | `942 MB` | `1.1 GB` | `+~160 MB` (Next 15 + React 19 server/client manifests) |
| **Shared Client First Load JS** | `87.7 kB` | `103 kB` | `+15.3 kB` (React 19 runtime bundle baseline) |
| **Edge Middleware Bundle** | `82.5 kB` | `90.2 kB` | `+7.7 kB` (`@supabase/ssr` / Next 15 edge runtime) |

---

## 2. Server Startup, SSR & API Latency Comparison

| Runtime Benchmark (`next start -p 3011`) | `next 14.2.35` | `next 15.5.29` | Delta |
| --- | ---: | ---: | --- |
| **Server Ready Startup (`startupReadyMs`)** | `519.55 ms` | `644.24 ms` | `+124.69 ms` (still sub-`0.65s`) |
| **Cold SSR `/auth/login` (`status 200`)** | `6.47 ms` | **`5.50 ms`** | **`-15.0%` faster** |
| **Warm SSR `/auth/login` (5-req avg)** | `4.02 ms` | **`3.39 ms`** | **`-15.7%` faster** |
| **Unauth API `/api/admin/reports/calls` (`401`)** | `1.82 ms` | `2.15 ms` | `+0.33 ms` (within local noise floor) |
| **Authorized Cron `/api/cron/ozonetel-campaign-sync` (`200`)** | `3.77 ms` | **`2.06 ms`** | **`-45.4%` faster** |
| **Measured Process RSS (`serverRssMb`)** | `27.9 MB` *(Next 14 CLI wrapper PID; worker forked)* | `234.3 MB` *(Next 15 runs `next-server` in-process)* | Not directly comparable due to Next 14 child fork vs Next 15 single-process `next-server` |

---

## 3. Caching & Rendering Hygiene Check

- Confirmed `export const dynamic = "force-dynamic"` remains applied across authenticated dashboards (`/admin`, `/telecaller`, `/kyc-team`, `/admin/leads`, `/admin/inbox`, `/admin/reports`, `/pay/[tenantId]`), ensuring zero cross-tenant SSR/route response caching.
- Preserved `images.dangerouslyAllowSVG: false`, `formats: ['image/avif', 'image/webp']`, and `minimumCacheTTL: 3600` in `next.config.mjs`.
