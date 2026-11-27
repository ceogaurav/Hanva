# FRAMEWORK VERSION AND SECURITY RESEARCH

**Research Date:** 2026-11-27  
**Execution Environment:** Node.js `v22.23.4`, `pnpm 12.18.0`

---

## 1. Live Registry Target Evaluation (`next` Dist-Tags & Patch Coverage)

Queried live from npm registry on `2026-11-27`:
- **`next-14` (`14.2.35` baseline):** End-of-patch for v14; carries **26 advisories** (`3` Critical, `9` High, `12` Moderate, `2` Low) including unauthenticated Image Optimizer SVG/AVIF RCE (`1193733`, `1242817`), Windows RCE (`1193677`), and Server Action DoS/SSRF advisories.
- **`backport` (`15.5.29` LTS maintenance line):** Latest security-patched Next.js 15 release (`>=15.5.28` resolves all October 2026 Critical/High CVEs including `CVE-2026-96889` / `CVE-2026-94482`, and `15.5.29` additionally patches the November 2026 Cross-Tenant Cache Disclosure `CVE-2026-119790` / `GHSA-mfr8-8qww-v76h`, `GHSA-f3mh-rxg3-f5g2`, and response-forwarding disclosure `1248082`).
- **`latest` (`16.4.6` major release):** Active Next.js 16 release (`16.4.5+` carries the same security fixes as `15.5.29`).

---

## 2. Side-by-Side Technical Comparison (`15.5.29` vs `16.4.6`)

| Criterion | Next.js `15.5.29` (`backport`) | Next.js `16.4.6` (`latest`) | Risk Impact on Hanva CRM |
| --- | --- | --- | --- |
| **Security Advisory Coverage (`pnpm audit`)** | **0 advisories (`0/0/0/0`)** | `0` Next advisories | Parity across all Critical, High, Moderate, Low CVEs |
| **Node.js Requirement** | `^18.18 \|\| ^19.8 \|\| >=20.0` | `>=20.9.0` | Both supported by Node `22.23.4` |
| **Edge Auth (`middleware.ts`)** | Native `middleware.ts` preserved intact (`updateSession` + Bearer bypass) | Rebrands/shifts `middleware.ts` -> `proxy.ts` network boundary | `15.5.29` avoids rewriting verified Phase 23.2 security edge boundary |
| **Linting Pipeline (`next lint`)** | Supports ESLint 8.57.1 + `.eslintrc.json` + `next lint` (`eslint-config-next 15.5.29`) | **Removes `next lint` CLI**, mandates ESLint `>=9` flat-config + `@typescript-eslint` v8 migration | `15.5.29` retains clean non-interactive `pnpm lint` gate without rewriting CI |
| **Default Bundler (`next build`)** | Stable Webpack production bundler | Switches default bundler to Turbopack (`@vladmandic/face-api` dynamic `require` & Tailwind v4 risk) | `15.5.29` preserves verified Webpack build predictability |
| **Async Request APIs (`cookies`, `params`)** | Enforces async typing/warnings while migrating `await cookies()` / `Promise<params>` | Hard-breaks any missed sync request access | Migrated **all 14 files** cleanly in Phase 24 (`0` warnings), preparing forward path to Next 16 |
| **React Compatibility** | `react@^18.2 \|\| ^19.0` (verified on **`19.3.1`**) | Requires React 19 | CRM upgraded cleanly to `react 19.3.1` + `vaul 1.1.2` |

---

## 3. Selection Decision

Per Section 3 (*"Select the safest supported version that passes the full application test suite"*), Phase 24 selects **`next@15.5.29` + `eslint-config-next@15.5.29` + `react@19.3.1` (`^19.2.9`) + `react-dom@19.3.1`**:
- Eliminates **100% of dependency advisories (`28 -> 0`)**.
- Migrates the entire App Router codebase to React 19 and async request APIs (`await cookies()`, `Promise<params>`, `Promise<searchParams>`, `use(params)`).
- Preserves the audited Phase 23.2 `middleware.ts` security perimeter, Webpack bundling (`face-api`), and `next lint` quality gates with zero production-breaking churn.
