# Phase 18 — Regression Test Report

Executed on the final production Next.js `16.4.6` + React `19.3.1` server (`http://localhost:3001`) using `docs/phase18/evidence/verify_phase18.py` and targeted Chromium lazy-image follow-up verification.

## 1. Full 69-Route Automated Coverage (`docs/phase18/evidence/qa_phase18.json`)
- **HTTP Status 200:** `69 / 69` routes (homepage, products hub, CRM, Salon Software, Restaurant POS, Digital Marketing pages, Software Development pages, Telecom service pages, Solutions, Industries, Compare, all 4 buyer guides, all 6 location pages, Contact, About, Pricing & Calculator, Trust/Governance).
- **Console Errors & Uncaught Page Exceptions:** `0` across all `69` routes (`any_console_or_page_errors: 0`).
- **CSP Violations (`securitypolicyviolation`):** `0` across all `69` routes (`any_csp_violations: 0`).
- **SEO & Schema:** `69 / 69` valid `www.hanva.in` canonicals, `69 / 69` valid JSON-LD schemas, `0` `noindex` flags.
- **Internal Links:** `69 / 69` unique internal targets HTTP `200`.
- **WhatsApp CTAs:** `227` links checked across all `69` pages — `100%` target `https://wa.me/918423711043`.
- **Images Verification:** `67 / 69` routes passed initial eager/quick-scroll check; the 2 remaining routes (`/products/crm/` and `/resources/telecalling-crm-guide/`) had below-the-fold footer `/logo.png` (`loading="lazy"`) finish after 150ms and passed explicit scroll verification (`complete: True, naturalWidth: 512` on both).

## 2. Interactive Feature Tests
- **Contact Form (`/company/contact/?product=crm&plan=growth-pro`):**
  - `Pre-selected context:` badge hydrated on initial render via `deriveSearchParamContext` (`context_badge_visible: true`).
  - Validated & submitted form → WhatsApp preview panel rendered and generated `https://wa.me/918423711043?text=...` link (`handoff_whatsapp_generated: true`).
- **Pricing Calculator (`/pricing/calculator/`):** Loaded cleanly (`h1_count: 1`, `0` errors).
- **Mobile Navigation Drawer (`375x812`):**
  - `initially_closed: true`
  - `drawer_opened: true`
  - `resources_link_visible: true`
  - `closed_after_nav: true` (navigated cleanly to `/resources/`)

## 3. Responsive Viewports & Captured Screenshots (`17` Full-Page PNGs)
- **Horizontal Overflow (`scrollWidth > innerWidth`):** `false` (`0` overflows) across Desktop (`1440px`, all 69 routes), Tablet (`768px`, 23 representative routes), and Mobile (`375px`, 23 representative routes).
- **Screenshots Stored in `docs/phase18/screenshots/` (`17` files):**
  - Desktop (`1440px`): `home`, `products`, `products_crm`, `products_salon-software`, `products_restaurant-pos`, `digital-marketing`, `software-development`, `company_contact`, `company_about`, `locations_bengaluru`, `resources_salon-management-software-guide`.
  - Tablet (`768px`): `home`, `products`.
  - Mobile (`375px`): `home`, `products_crm`, `locations_bengaluru`, `company_contact`.
