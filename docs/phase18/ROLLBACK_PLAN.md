# Phase 18 — Backup & Rollback Plan

## 1. Preserved Pre-Upgrade State
- **Git Branch:** `main`
- **Starting Commit Hash:** `10806f670e158001d8218f78f3a610adc702eb9b`
- **Pre-Phase 18 Diff Backup:** `docs/phase18/evidence/git_pre_phase18_diff.patch`
- **Snapshot Directory:** `docs/phase18/evidence/rollback_snapshot/`
  - `package.json` (`next@^14.2.35`, `react@^18.3.1`, `react-dom@^18.3.1`)
  - `pnpm-lock.yaml` (`lockfileVersion: '9.0'`)
  - `next.config.mjs`
  - `postcss.config.mjs`
  - `tsconfig.json`

## 2. Exact Rollback Procedure
If any unexpected build, SEO, layout, or dependency regression occurs after Phase 18 changes:

```bash
cd /Users/apple/Downloads/HANVA

# 1. Restore pre-Phase 18 configuration and dependency manifests
cp docs/phase18/evidence/rollback_snapshot/package.json ./package.json
cp docs/phase18/evidence/rollback_snapshot/pnpm-lock.yaml ./pnpm-lock.yaml
cp docs/phase18/evidence/rollback_snapshot/next.config.mjs ./next.config.mjs
cp docs/phase18/evidence/rollback_snapshot/postcss.config.mjs ./postcss.config.mjs
cp docs/phase18/evidence/rollback_snapshot/tsconfig.json ./tsconfig.json

# 2. Remove Phase 18 ESLint flat config if reverting to Next 14
rm -f eslint.config.mjs

# 3. Reinstall exact locked dependency tree and rebuild
pnpm install --frozen-lockfile
rm -rf .next
npx tsc --noEmit && pnpm build
```

If reverting the workspace completely to the original committed Git baseline instead of Phase 17.1 uncommitted state, first apply `docs/phase18/evidence/git_pre_phase18_diff.patch` after resetting tracked files (`git checkout -- .`), while preserving untracked Phase 14–17.1 pages.

## 3. Change Control Boundaries
- Zero commits pushed to GitHub.
- Zero deployment or DNS/Vercel configuration modifications.
- External SaaS repositories and databases untouched.
