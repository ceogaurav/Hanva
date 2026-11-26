# Phase 18 — Official Security Advisory Research

Sources consulted: `pnpm audit --json` against the npm/GitHub Advisory Database (`https://github.com/advisories`), official Next.js documentation and advisories (`https://nextjs.org/blog`, `https://github.com/vercel/next.js/security/advisories`), and official PostCSS security advisories (`https://github.com/postcss/postcss/security/advisories`).

---

## 1. PostCSS Advisories (`postcss@8.4.31` via `next@14.2.35 > postcss`)

Note: Direct devDependency `@tailwindcss/postcss@4.3.5` already resolves `postcss@8.5.33` (patched). Only `next@14.2.35`'s bundled dependency (`postcss@8.4.31`) triggers these advisories.

| Advisory ID | GHSA / CVE | Severity | Affected | Patched | Type | Code Path Used by Hanva? | Recommended Fix | Breaking Change Risk |
|---|---|---|---|---|---|---|---|---|
| `1117015` | `GHSA-qx2v-qp2m-jg93` / `CVE-2026-41305` | Moderate | `<8.5.10` | `>=8.5.10` | Transitive (`next > postcss`) | Build-time CSS compilation of trusted repo styles only (no untrusted user CSS stringified) | Upgrade `next` to release using `postcss >= 8.5.23` (`next@16.4.6`) | None for CSS compilation |
| `1124252` | `GHSA-6g55-p6wh-862q` / `CVE-2026-45623` | High | `<=8.5.11` | `>=8.5.12` | Transitive (`next > postcss`) | Build-time trusted CSS only (`sourceMappingURL` arbitrary file read) | Upgrade `next` to `16.4.6` (`postcss@8.5.23`) | None |
| `1139510` | `GHSA-r28c-9q8g-f849` / `CVE-2026-73646` | High | `<=8.5.17` | `>=8.5.18` | Transitive (`next > postcss`) | Build-time trusted CSS only (`.map` path traversal) | Upgrade `next` to `16.4.6` (`postcss@8.5.23`) | None |
| `1130709` | `GHSA-fxqj-rqcc-2cmp` / `CVE-2026-69153` | Moderate | `<=8.5.22` | `>=8.5.23` | Transitive (`next > postcss`) | Build-time trusted CSS only (incomplete `from` unset fix) | Upgrade `next` to `16.4.6` (`postcss@8.5.23`) | None |

---

## 2. Next.js Advisories (`next@14.2.35`, direct dependency — 26 advisories)

| Advisory ID | GHSA | Severity | Affected | Patched | Code Path Used by Hanva? | Remediation | Breaking Change Risk |
|---|---|---|---|---|---|---|---|
| `1193677` | `GHSA-p293-qw3h-jr36` | Critical | `>=13.4.0 <15.5.24` | `>=15.5.24` | Partially mitigated by Linux/Vercel host (Windows-hosted servers) | Upgrade `next` to `>=15.5.29` / `16.4.6` | Covered in Compatibility Plan |
| `1193733` | `GHSA-2xp9-vwfh-vxw4` | Critical | `>=10.0.0 <15.5.24` | `>=15.5.24` | Mitigated by `images: { unoptimized: true }`, no Image Optimizer AVIF route active | Upgrade `next` to `>=15.5.29` / `16.4.6` | None (keep `unoptimized: true`) |
| `1242817` | `GHSA-2464-fhr4-w9xw` | Critical | `>=10.0.0 <=15.5.27` | `>=15.5.28` | Mitigated by `images: { unoptimized: true }` (Image Optimization SVG RCE) | Upgrade `next` to `>=15.5.29` / `16.4.6` | None |
| `1112653` | `GHSA-h25m-26qc-wcjf` | High | `>=13.0.0 <15.0.8` | `>=15.0.8` | App Router RSC deserialization path present | Upgrade `next` | Test static RSC hydration |
| `1116376` | `GHSA-q4gf-8mx6-v5v3` | High | `>=13.0.0 <15.5.15` | `>=15.5.15` | App Router Server Components present | Upgrade `next` | Test App Router build |
| `1117931` | `GHSA-8h8q-6873-q5fj` | High | `>=13.0.0 <15.5.16` | `>=15.5.16` | App Router Server Components present | Upgrade `next` | Test App Router build |
| `1118954` | `GHSA-c4j6-fc7j-m34r` | High | `>=13.4.13 <15.5.16` | `>=15.5.16` | No WebSocket upgrades used; framework code path present | Upgrade `next` | None |
| `1118962` | `GHSA-36qx-fr4f-26g5` | High | `>=12.2.0 <15.5.16` | `>=15.5.16` | Not used (no Pages Router i18n/middleware) | Upgrade `next` | None |
| `1124172` | `GHSA-m99w-x7hq-7vfj` | High | `>=13.0.0 <15.5.21` | `>=15.5.21` | No Server Actions defined; App Router bundle includes RSC runtime | Upgrade `next` | None |
| `1124185` | `GHSA-89xv-2m56-2m9x` | High | `>=14.1.1 <15.5.21` | `>=15.5.21` | No Server Actions / custom server used | Upgrade `next` | None |
| `1124193` | `GHSA-p9j2-gv94-2wf4` | High | `>=12.0.0 <15.5.21` | `>=15.5.21` | Static `next.config.mjs` redirects only (no external host rewrites) | Upgrade `next` | Verify redirects |
| `1242819` | `GHSA-p3m5-59mp-jv5r` | High | `>=13.0.0 <=15.5.27` | `>=15.5.28` | No Server Actions defined; App Router runtime present | Upgrade `next` | None |
| `1112593` | `GHSA-9g9p-9gw9-jx7f` | Moderate | `>=10.0.0 <15.5.10` | `>=15.5.10` | Not used (`images: { unoptimized: true }`, no `remotePatterns`) | Upgrade `next` | None |
| `1114897` | `GHSA-ggv3-7p47-pfv8` | Moderate | `>=9.5.0 <15.5.13` | `>=15.5.13` | No dynamic rewrites configured | Upgrade `next` | None |
| `1114940` | `GHSA-3x4c-7xq6-9pq8` | Moderate | `>=10.0.0 <15.5.14` | `>=15.5.14` | Not used (`images: { unoptimized: true }`) | Upgrade `next` | None |
| `1118944` | `GHSA-ffhc-5mcf-pf4q` | Moderate | `>=13.4.0 <15.5.16` | `>=15.5.16` | Not using dynamic CSP nonces | Upgrade `next` | None |
| `1118948` | `GHSA-gx5p-jg67-6x7h` | Moderate | `>=13.0.0 <15.5.16` | `>=15.5.16` | Not using `next/script` `beforeInteractive` with untrusted input | Upgrade `next` | None |
| `1118952` | `GHSA-h64f-5h5j-jqjh` | Moderate | `>=10.0.0 <15.5.16` | `>=15.5.16` | Not used (`images: { unoptimized: true }`) | Upgrade `next` | None |
| `1118958` | `GHSA-wfc6-r584-vfw7` | Moderate | `>=14.2.0 <15.5.16` | `>=15.5.16` | App Router RSC responses present (static prerendered) | Upgrade `next` | Verify static RSC headers |
| `1124187` | `GHSA-68g3-v927-f742` | Moderate | `>=13.0.0 <15.5.21` | `>=15.5.21` | Static GET routes only (no dynamic POST routes) | Upgrade `next` | None |
| `1124189` | `GHSA-4633-3j49-mh5q` | Moderate | `>=13.0.0 <15.5.21` | `>=15.5.21` | Static GET routes only | Upgrade `next` | None |
| `1124191` | `GHSA-4c39-4ccg-62r3` | Moderate | `>=13.0.0 <15.5.21` | `>=15.5.21` | Not using Edge runtime Server Actions | Upgrade `next` | None |
| `1124197` | `GHSA-955p-x3mx-jcvp` | Moderate | `>=13.0.0 <15.5.21` | `>=15.5.21` | No internal Server Functions defined | Upgrade `next` | None |
| `1248082` | `GHSA-pc58-hwjq-p385` | Moderate | `<=15.5.28` | `>=15.5.29` | Not forwarding `fetch()` responses in self-hosted SSR | Upgrade `next` to `>=15.5.29` / `16.4.6` | None |
| `1118942` | `GHSA-3g8h-86w9-wvmq` | Low | `>=12.2.0 <15.5.16` | `>=15.5.16` | No `middleware.ts` / proxy redirects | Upgrade `next` | None |
| `1118946` | `GHSA-vfv6-92ff-j949` | Low | `>=13.4.6 <15.5.16` | `>=15.5.16` | App Router RSC cache-busting mechanism | Upgrade `next` | None |

---

## 3. Research Conclusion
1. Staying on Next.js 14.x (`14.2.35` is the final `next-14` tag) leaves all 26 Next.js advisories unpatched permanently because security fixes moved to `15.5.29` (`backport`) and `16.4.x` (`latest`).
2. Upgrading to `next@15.5.29` resolves the 26 Next.js advisories, **but `next@15.5.29` still pins `"postcss": "8.4.31"`**, leaving the 4 PostCSS advisories (`2` High, `2` Moderate) unpatched unless package overrides are added.
3. Upgrading to **`next@16.4.6`** (active `latest` LTS line) natively pins **`"postcss": "8.5.23"`**, remediating all 26 Next.js advisories AND all 4 PostCSS advisories with zero overrides, provided the codebase passes the 14-point compatibility assessment.
