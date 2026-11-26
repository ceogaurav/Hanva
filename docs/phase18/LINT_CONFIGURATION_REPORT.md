# Phase 18 — Lint Configuration Report

## 1. Problem Resolved
In Phases 14.1–17.1, `pnpm lint` executed `next lint`, which prompted interactively and failed non-interactive CI runs because:
1. No ESLint package or configuration file existed in the repository.
2. In Next.js 16, `next lint` is removed in favor of standard ESLint CLI execution (`eslint .`).

## 2. Implemented Configuration
- **Packages Installed (`devDependencies`):** `eslint@9.39.5`, `eslint-config-next@16.4.6`
- **Script Updated (`package.json`):** `"lint": "eslint ."`
- **Flat Configuration Created (`eslint.config.mjs`):**
  - Imports `defineConfig` and `globalIgnores` from `eslint/config`.
  - Applies `eslint-config-next/core-web-vitals` (React, React Hooks, JSX a11y, Import, and `@next/next` Core Web Vitals rules).
  - Applies `eslint-config-next/typescript` (`@typescript-eslint` recommended + unused vars/expressions warnings).
- **Documented Exclusions (`globalIgnores`):**
  - `.next/**`, `out/**`, `build/**`, `next-env.d.ts` (Next.js generated build/type outputs).
  - `preview/**` (legacy excluded preview folder matching `tsconfig.json`).
  - `docs/**` (historical QA scripts and frozen source snapshots from Phases 12–18).

## 3. Initial Errors Exposed & Fixed (Zero Rule Disabling)
Running `pnpm lint` initially exited with code `1` (`4 errors, 111 warnings` in `docs/phase18/evidence/lint_initial.log`). All 4 errors plus the single config warning were fixed properly in code:
1. `components/shared/schema-org.tsx` (lines 28–29, `@typescript-eslint/no-explicit-any` x2): Replaced `Record<string, any>` with `Record<string, unknown>`.
2. `components/shared/product-layout.tsx` (line 56, `@typescript-eslint/no-explicit-any`): Replaced `Record<string, any>` with `Record<string, unknown>`.
3. `app/company/contact/page.tsx` (line 149, `react-hooks/set-state-in-effect`): Refactored query parameter hydration into a pure `deriveSearchParamContext()` helper used during lazy `React.useState(() => ...)` initialization inside `<React.Suspense>`, eliminating synchronous `setState` inside `useEffect`.
4. `eslint.config.mjs`: Removed unused `__dirname` variable (`-1` warning).

## 4. Final Non-Interactive Verification (`docs/phase18/evidence/lint_final.log`)
- **Command:** `pnpm lint` (`eslint .`)
- **Exit Code:** `0`
- **Errors:** `0`
- **Pre-Existing Warnings Separated from Phase 18 Issues:** `110` pre-existing warnings (`109` unused icon/component imports `@typescript-eslint/no-unused-vars` across existing static pages/layouts, plus `1` pre-existing `import/no-anonymous-default-export` in `postcss.config.mjs`). Left untouched to minimize unnecessary churn across unrelated pages while preserving strict CI failure on all lint errors.
