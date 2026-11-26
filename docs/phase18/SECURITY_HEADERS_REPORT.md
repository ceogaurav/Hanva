# Phase 18 — Security Headers Report

## 1. Local Production Verification (`next@16.4.6` on `http://localhost:3001`)
Captured from HTTP response headers in `docs/phase18/evidence/qa_phase18.json`:

| Header | Configured Value (`next.config.mjs`) | Observed on `http://localhost:3001` | Purpose & Assessment |
|---|---|---|---|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'self'; base-uri 'self'; form-action 'self' mailto: https://wa.me` | Exact match | Upgraded from `Content-Security-Policy-Report-Only` to enforced `Content-Security-Policy`; added `object-src 'none'` and `https://wa.me` in `form-action`. Audited with Chromium `securitypolicyviolation` listener across all 69 routes: **`0` violations**. Note: `script-src`/`style-src` retain `'unsafe-inline'` to support static pre-rendered Next.js hydration and JSON-LD scripts without breaking static edge caching; `upgrade-insecure-requests` was intentionally omitted so local HTTP QA works cleanly while HSTS handles HTTPS upgrades. |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Exact match | 2-year HSTS across subdomains. |
| `X-Content-Type-Options` | `nosniff` | Exact match | Prevents MIME-type sniffing. |
| `X-Frame-Options` | `SAMEORIGIN` | Exact match | Clickjacking defense alongside CSP `frame-ancestors 'self'`. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Exact match | Tightened from `origin-when-cross-origin` to prevent referrer leakage on HTTPS-to-HTTP downgrades. |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Exact match | Disables unused browser sensor APIs. |
| `X-DNS-Prefetch-Control` | `on` | Exact match | Preserved. |
| `X-Powered-By` | `poweredByHeader: false` | Absent (`x-powered-by-present: false`) | Suppresses Next.js stack fingerprinting header. |

## 2. Live Production Note (`https://www.hanva.in`, `curl -sI` before deploy)
Currently deployed `https://www.hanva.in` (Vercel edge, pre-Phase 12 build) already serves `strict-transport-security`, `x-content-type-options: nosniff`, `x-frame-options: SAMEORIGIN`, `referrer-policy: origin-when-cross-origin`, and `x-dns-prefetch-control: on`, alongside Vercel CDN default `access-control-allow-origin: *` for public static HTML. Once owner-approved deployment occurs, the tightened `Content-Security-Policy`, `Permissions-Policy`, and `Referrer-Policy: strict-origin-when-cross-origin` from `next.config.mjs` will take effect.
