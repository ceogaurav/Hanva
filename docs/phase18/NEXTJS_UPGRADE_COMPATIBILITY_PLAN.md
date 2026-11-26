# Phase 18 — Next.js Upgrade Compatibility Plan

**Selected Target:** `next@16.4.6` (Active stable `latest`)  
**Alternative Evaluated:** `next@15.5.29` (`backport` LTS) — rejected as primary choice unless `16.4.6` fails compatibility, because `15.5.29` still pins vulnerable `postcss@8.4.31`.  
**React Strategy:** Keep `react@^18.3.1` / `react-dom@^18.3.1` initially if fully compatible with `next@16.4.6` and `eslint-config-next@16.4.6` (Next.js 16 peer range is `^18.2.0 || ^19.0.0`), avoiding unnecessary React 19 / `lucide-react@0.454.0` runtime & peer churn across 69 pages; upgrade React only if Next 16 build/runtime testing shows it is required.

---

## 14-Point Compatibility Assessment

| # | Area | Current Usage in Hanva | Next.js 16.4.6 Impact | Required Action |
|---|---|---|---|---|
| 1 | Next.js Framework | `next@14.2.35`, App Router, static generation | Major upgrade `14.2.35 -> 16.4.6`; Turbopack default bundler | Test `pnpm build` & verify all 69 routes |
| 2 | React & React DOM | `react@18.3.1`, `react-dom@18.3.1`, `@radix-ui/*`, `lucide-react@0.454.0` | `next@16.4.6` peer range allows `^18.2.0 || ^19.0.0` (React 18 deprecated but supported in v16) | Test `18.3.1` with `next@16.4.6`; monitor build/runtime warnings |
| 3 | Node.js | `v22.23.4` (`@types/node@^22.10.0`) | Next 16 requires `>=20.9.0` | Already satisfied (`v22.23.4`) |
| 4 | App Router vs Pages Router | 100% App Router (`app/`), zero `pages/` directory | Full App Router support; zero `pages/` conflicts | None |
| 5 | Middleware Behavior | No `middleware.ts` exists | `middleware.ts -> proxy.ts` rename N/A | None |
| 6 | Route Handlers & APIs | No `app/api/` routes; no Server Actions; no sync `cookies()`/`headers()` | Async Request API breaking changes N/A | Verify client `useSearchParams()` in `app/company/contact/page.tsx` stays wrapped in `<React.Suspense>` |
| 7 | Server & Client Components | Static Server Component pages + explicit `"use client"` interactive shells (`header`, `mobile-drawer`, `calculator`, `contact`, `faq`) | RSC serialization patched; React Compiler disabled (opt-in) | Verify hydration & zero console errors |
| 8 | Build Configuration | `next.config.mjs` (`trailingSlash`, `reactStrictMode`, `poweredByHeader`, `redirects`, `headers`), `postcss.config.mjs` (`@tailwindcss/postcss@4.3.5`) | Turbopack works cleanly with Tailwind v4 `@tailwindcss/postcss` and ESM `next.config.mjs` | Verify CSS compilation and asset hashes |
| 9 | Image Optimization | `images: { unoptimized: true }` in `next.config.mjs`; `components/ui/logo.tsx` uses `next/image` on `/logo.png` | `unoptimized: true` disables vulnerable sharp/AVIF/SVG optimizer endpoint; supported cleanly in Next 16 | Verify `/logo.png` renders crisp in header/footer |
| 10 | Metadata & Canonicals | Static `export const metadata: Metadata` with `metadataBase: new URL("https://www.hanva.in")` and per-route canonicals | Standard Metadata API unchanged for static `metadata` objects | Verify canonical tags & OG/Twitter meta across all 69 routes |
| 11 | Sitemap & Robots | `app/sitemap.ts` (`69` URLs) and `app/robots.ts` (`MetadataRoute`) | MetadataRoute exports unchanged in Next 16 | Verify `/sitemap.xml` returns 69 `https://www.hanva.in` URLs |
| 12 | Third-Party Integrations | `lucide-react`, `@radix-ui/*`, `clsx`, `tailwind-merge`, `class-variance-authority`, external `https://wa.me/918423711043` links, privacy-safe `lib/analytics.ts` | Pure React/browser packages; `@radix-ui/*` supports React 18 & 19 | Test Dialog, Accordion, Dropdown, Mobile Drawer, Calculator, Contact form |
| 13 | Hosting & Deployment | `vercel.json` (`"framework": "nextjs"`), static/edge headers via `next.config.mjs` | Supported directly on Vercel with Node 22 & Next 16 preset | Verify local `pnpm start` headers & static output |
| 14 | TypeScript & ESLint | TypeScript `5.9.3` (`>=5.1.0`), `.eslintrc` missing (`next lint` prompts) | `next lint` removed in Next 16; migrate to `eslint@^9.39.5` + `eslint-config-next@16.4.6` flat config (`eslint.config.mjs`) and `"lint": "eslint ."` | Install `eslint@^9.39.5` + `eslint-config-next@16.4.6`, create `eslint.config.mjs`, fix/verify lint output |

---

## Fallback Plan
If `next@16.4.6` introduces any incompatible Turbopack/React-18 runtime issue during verification, roll back cleanly to `next@15.5.29` with an explicitly documented `pnpm.overrides` entry for `postcss@^8.5.23` and re-run full regression tests.
