# DEPENDENCY SECURITY REMEDIATION REPORT

**Audit Tool:** `pnpm audit --json`  
**Phase 24 Baseline (`CRM-reconciled` `122466d`):** [baseline_audit.json](./evidence/baseline_audit.json)  
**Phase 24 Remediated (`4dd3467`):** [upgrade_audit.json](./evidence/upgrade_audit.json)

---

## 1. Quantitative Remediation Summary

| Severity | Phase 23.1 Raw Baseline | Phase 23.2 Reconciled | Phase 24 Final |
| --- | ---: | ---: | ---: |
| **Critical** | 3 | 3 | **0** *(100% resolved)* |
| **High** | 24 | 9 | **0** *(100% resolved)* |
| **Moderate** | 19 | 14 | **0** *(100% resolved)* |
| **Low** | 2 | 2 | **0** *(100% resolved)* |
| **Total Advisories** | **48** | **28** | **0** |

---

## 2. Specific Package Changes & Compatibility Verification

| Package | Change Applied | Advisories Eliminated | Compatibility Verification |
| --- | --- | --- | --- |
| **`next` / `eslint-config-next`** | `14.2.35` -> **`15.5.29`** | `26` (`3` Crit, `9` High, `12` Mod, `2` Low) including `1193677`, `1193733`, `1242817`, `1242819`, `1248082`, plus Nov 2026 `GHSA-mfr8-8qww-v76h` / `GHSA-f3mh-rxg3-f5g2` | `tsc`, `lint`, `next build`, `phase24_verify.mjs` (`15/15` checks) PASS |
| **`postcss`** | Direct `^8.5.33` + override `>=8.5.23` (`8.5.20 -> 8.5.33`) | `1` Moderate (`1130709`: `sourceMappingURL` arbitrary `.map` read) | Full Tailwind v4 + CSS production build PASS |
| **`uuid`** (via `exceljs 4.4.0`) | Override `>=11.1.1` (`8.3.2 -> 11.1.1`+, CJS `./dist/cjs/index.js` verified) | `1` Moderate (`1119441`: v3/v5/v6 buffer bounds) | Direct XLSX binary generation smoke test (`T-FUNC-2`, `6407` bytes `PK` archive) PASS |
| **`react` / `react-dom` / `@types/*`** | `18.3.1` -> `19.3.1` (`vaul 0.9.9 -> 1.1.2`) | Unblocks patched Next 15 React Server Components runtime | All `9/9` security + `6/6` functional tests PASS |

---

## 3. Image Optimizer, SVG, Middleware & Caching Hardening Verification

- **`images.dangerouslyAllowSVG: false`:** Explicitly preserved and hardcoded in `next.config.mjs:14`. No wildcard or arbitrary untrusted `images.remotePatterns` exist.
- **No Unintended Caching / Cross-Tenant Leaks:**
  - `app/admin/layout.tsx`, `app/telecaller/layout.tsx`, `app/kyc-team/layout.tsx` remain `force-dynamic`.
  - All sensitive API routes (`holidays`, `companies/search`, `leads/export`, `reports/calls`) remain dynamic / `cache: "no-store"`.
  - Next `15.5.29` fixes cross-tenant `use cache` key collisions and Edge cookie leakage advisories upstream.
- **Remaining Advisories (`0`):** None reported by `pnpm audit --json`. Note on `sharp`: not declared in `package.json`; if production hosting installs system/image `sharp`, deploy with `>=0.35.5` per Next 15 guidance.
