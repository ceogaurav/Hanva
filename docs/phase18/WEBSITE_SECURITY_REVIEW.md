# Phase 18 — Website Security Review

## Scope & Methodology
Reviewed `app/`, `components/`, `lib/`, `next.config.mjs`, `.env.example`, `public/`, and client/server boundaries across all 69 routes.

## Security Checklist & Findings

| Area | Finding | Risk / Action |
|---|---|---|
| **Secrets & Credentials** | Only `.env.example` exists (`NODE_ENV`, `PORT`, `NEXT_PUBLIC_SITE_URL`, commented `CONTACT_FORM_WEBHOOK_URL`). Zero `.env*` secret files, zero API keys, zero tokens, zero database URLs in code or `docs/phase18/`. | Clean — No secrets committed |
| **Environment Variable Exposure** | `grep process.env` across `app/`, `components/`, `lib/` returned zero runtime secret reads. Canonical metadata uses explicit `https://www.hanva.in`. | Clean |
| **Unsafe HTML Rendering** | Only two `dangerouslySetInnerHTML` usages exist: (1) `app/layout.tsx` static hardcoded legacy hash migration IIFE (`'#pricing'`, `'#contact'`, etc.) with strict `window.location.pathname === '/'` exact lookup table (`window.location.replace(mapping[hash])`, zero raw user-input reflection); (2) `components/shared/schema-org.tsx` serializing static server JSON-LD with `.replace(/</g, "\\u003c")` XSS escaping. | Low / Safe |
| **External Redirects & `window.open`** | All external `target="_blank"` anchors across `app/` and `components/` include `rel="noopener noreferrer"` (verified automatically across all `.tsx` files). `app/company/contact/page.tsx` opens WhatsApp via `window.open(waUrl, "_blank", "noopener,noreferrer")` built strictly on `https://wa.me/918423711043` (`lib/config.ts`). | Clean |
| **API Routes & Database Access** | Zero `app/api/` routes, zero Server Actions (`"use server"`), zero database clients, zero server-side `fetch()` proxies. | Minimal attack surface (100% static App Router) |
| **Input Validation & Forms** | `app/company/contact/page.tsx` validates `fullName`, `workEmail`, `phone` (10–15 digits), enforces honeypot check, sanitizes query params (`replace`, `.slice()`, bounded `Math.min/Math.max`), and builds URL-encoded client WhatsApp handoff links with no unvalidated HTML execution. | Clean |
| **Cookies & Browser Storage** | Zero `document.cookie`, `localStorage`, or `sessionStorage` usage. | Clean |
| **Analytics Privacy** | `lib/analytics.ts` explicitly filters `DISALLOWED_PII_KEYS`, strips query strings/hashes/emails/phone patterns, and pushes only non-PII `page_path`/`page_category`/`device_class` to `window.__hanvaAnalyticsQueue` and local CustomEvent. | Clean |
| **Server / Client Boundaries** | Next.js `16.4.6` patches all known RSC deserialization, cache poisoning, Server Action DoS, and Image Optimization RCE vulnerabilities. | Remediated (`next@16.4.6`) |
| **Image Handling** | `next.config.mjs` enforces `images: { unoptimized: true }`, serving local PNG/ICO assets from `public/` (`logo.png`, `og-image.png`, `icon.png`, `apple-touch-icon.png`) without exposing a sharp/SVG dynamic optimizer attack surface. | Clean |
| **HTTP Header Exposure (`X-Powered-By`)** | `poweredByHeader: false` in `next.config.mjs`; verified `x-powered-by` header is absent (`false`) in `qa_phase18.json`. | Clean |
| **CORS & Security Headers** | No wildcard CORS configured by the Next.js codebase (`vercel.json` / `next.config.mjs`); enforced `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` in `next.config.mjs` (note: live Vercel host currently shows pre-Phase 12 headers until deployed). | Documented & enforced in `next.config.mjs` |
