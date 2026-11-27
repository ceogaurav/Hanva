# Phase 20 — Core Web Vitals & Performance Report

## 1. Field Data vs. Lab Data Strict Distinction

| Metric Category | Availability Status | Notes |
|---|---|---|
| **Field Data (Real Users — CrUX / GSC Core Web Vitals / Real INP)** | **Unavailable / BLOCKED** | No Google Search Console Core Web Vitals report or CrUX public field data volume is accessible for `https://www.hanva.in` (newly launched/expanded static pages). Real-user INP cannot be measured from synthetic runs. |
| **Lab Data (Synthetic — Lighthouse `13.6.0` on Live `https://www.hanva.in`)** | **Measured Below (`8` Runs)** | Executed November 26, 2026 against live production (`commit c5ec992`). Represents emulated device/network lab conditions only — does not substitute for field CWV pass claims. |

---

## 2. Live Lighthouse 13.6.0 Synthetic Lab Results (`docs/phase20/lighthouse/*.json`)

| Page Tested | Form Factor | Perf | A11y | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index | Interactive |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` (Homepage) | Desktop (`--preset=desktop`) | `100` | `100` | `100` | `100` | `0.3 s` | `0.3 s` | `0 ms` | `0` | `0.3 s` | `0.3 s` |
| `/` (Homepage) | Mobile | `100` | `100` | `100` | `100` | `0.9 s` | `0.9 s` | `20 ms` | `0` | `1.6 s` | `2.0 s` |
| `/products/crm/` | Mobile | `100` | `100` | `100` | `100` | `1.0 s` | `1.0 s` | `0 ms` | `0` | `1.0 s` | `1.0 s` |
| `/products/salon-software/` | Mobile | `100` | `100` | `100` | `100` | `0.9 s` | `0.9 s` | `10 ms` | `0` | `0.9 s` | `1.9 s` |
| `/products/restaurant-pos/` | Mobile | `100` | `100` | `100` | `100` | `1.0 s` | `1.0 s` | `0 ms` | `0` | `1.0 s` | `1.9 s` |
| `/resources/salon-management-software-guide/` | Mobile | `100` | `100` | `100` | `100` | `1.0 s` | `1.0 s` | `0 ms` | `0` | `1.0 s` | `1.9 s` |
| `/locations/bengaluru/` | Mobile | `100` | `100` | `100` | `100` | `1.0 s` | `1.0 s` | `0 ms` | `0` | `1.0 s` | `1.9 s` |
| `/company/contact/` | Mobile | `98` | `100` | `100` | `100` | `0.9 s` | `2.4 s` | `0 ms` | `0` | `0.9 s` | `2.5 s` |

---

## 3. Diagnostic Findings & Prioritized Optimization Notes
1. **System Font Stack Advantage (`app/globals.css`):** Using OS system fonts eliminates webfont blocking and contributes to `0` CLS (`0`) and sub-1s mobile LCP on 6 of 7 tested routes.
2. **Client JS & Opt-In Analytics Overhead:** Keeping GA4/GTM external scripts unloaded prior to consent preserves near-zero Mobile TBT (`0`–`20 ms`). Note: Once live GTM/GA4 scripts load after consent grant in production, monitor main-thread TBT and INP field metrics.
3. **Specific Finding on `/company/contact/` Mobile (`LCP = 2.4 s`, `Perf = 98`):** The client-rendered `<ContactPageContent>` inside `<React.Suspense fallback={<div className="min-h-screen" />}>` delays initial hero painting until JS hydration resolves `useSearchParams()`. Rendering a static server-rendered hero header (`<h1>Let's Build Your Voice Architecture</h1>` + direct channels) above the client `<Suspense>` form card is a prioritized medium-effort engineering enhancement in the 90-Day Plan to pull Mobile LCP under `1.2 s`.
4. **Images:** Header `/logo.png` uses `priority` eager loading; footer `/logo.png` uses `loading="lazy"`; real `.webp` product UI screenshots (`Phase 15` roadmap) should carry explicit `width`/`height` dimensions and modern WebP compression when uploaded so CLS remains `0`.
