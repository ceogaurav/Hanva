# BUILD & CODE QUALITY REPORT

**Phase:** 23.1 (Section 14 Verification Baseline)  
**Target:** `/Users/apple/Downloads/CRM` (Left strictly unmodified per Repository Identity Stop Gate)

---

## 1. Baseline Build, TypeScript, ESLint & Vulnerability Audit Results

| Check | Command Run | Outcome | Verified Details |
| --- | --- | --- | --- |
| **CRM Config Suppression (`next.config.mjs`)** | Inspected `CRM/next.config.mjs` | **FAIL (Suppressed)** | Lines `6-12`: `eslint: { ignoreDuringBuilds: true }`, `typescript: { ignoreBuildErrors: true }` hide compile & lint failures in production builds |
| **TypeScript Typecheck** | `pnpm exec tsc --noEmit` (`CRM`) | **FAIL (`exit 2`, `79` error lines)** | Logged verbatim in `docs/phase23_1/evidence/crm_pre_tsc.log`. Key breaks: `app/api/assistant/route.ts` & `components/ai-guide-assistant.tsx` (`ai` v6 breaking changes: `maxTokens`, `toDataStreamResponse`, `useChat`), `app/api/cron/sla/route.ts` (`@supabase/supabase-js` v2.110 type mismatches), `components/leads-table.tsx:1006` (`Cannot find name 'classifySentiment'`), `app/admin/leads/[id]/page.tsx` (missing `tenant_id` / `score` on `Lead`), implicit `any` parameters across actions/charts, missing `@opennextjs/cloudflare` in `open-next.config.ts` |
| **ESLint Check** | `pnpm lint` (`CRM`) | **BLOCKED (No Config)** | Zero `.eslintrc*` / `eslint.config.*` file exists in `/Users/apple/Downloads/CRM`, causing `next lint` to hang waiting on interactive setup prompt |
| **CRM Production Build (`next build`)** | Not executed on `/Users/apple/Downloads/CRM` | **NOT RUN (Blocked)** | Running `next build` mutates `.next/` cache on an unreconciled workspace while `ignoreBuildErrors: true` is active and `79` `tsc` errors exist |
| **Dependency Security Audit** | `pnpm audit --json` (`CRM`) | **FAIL (`48` advisories)** | Logged in `crm_pnpm_audit.json` across `393` dependencies: **`3` Critical, `24` High, `19` Moderate, `2` Low** (`next ^14.2.35`, etc.) |
| **Reference Remediation Guard TS Compile** | `pnpm exec tsc --strict` (`HANVA` compiler on `crm_security_guard_reference.ts`) | **PASS (`0` errors)** | Cleanly compiled reference TypeScript security module without weakening strict flags |

---

## 2. Remediation Prerequisites Before Removing Build Suppression

Before setting `ignoreDuringBuilds: false` and `ignoreBuildErrors: false` in reconciled CRM `next.config.mjs`:
1. Fix `ai` v6 SDK calls (`app/api/assistant/route.ts`, `components/ai-guide-assistant.tsx`), `classifySentiment` import in `components/leads-table.tsx:1006`, Supabase `Lead` interface (`tenant_id`, `score`), and `cron/sla/route.ts` query types.
2. Add non-interactive ESLint config (`.eslintrc.json` / `eslint.config.mjs` extending `next/core-web-vitals`).
3. Upgrade vulnerable Next.js `^14.2.35` and dependencies flagged by `pnpm audit`.
