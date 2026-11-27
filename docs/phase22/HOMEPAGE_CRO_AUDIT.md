# HOMEPAGE CRO AUDIT — PHASE 22

**Route Evaluated:** `/` (`app/page.tsx`)  
**Screenshots Reviewed:** `desktop_before_home.png` (`1440x900`), `tablet_before_home.png` (`768x1024`), `mobile_before_home.png` (`375x812`)

---

## 1. First-Viewport Assessment (Desktop & Mobile)

| Element Audited | Before State (`desktop_before_home.png`, `mobile_before_home.png`) | Improvement Identified |
|---|---|---|
| **Hero Value Proposition & Positioning** | Clear 2-line H1 + readable 3-line subtitle naming India/global SaaS, marketing, and communication software. | Concise and credible; add scannable direct jump chips (`Hanva CRM`, `Hanva Salon Software`, `Hanva Restaurant POS`, `Digital Marketing & Software`) immediately above or below CTAs so vertical buyers self-segment in 2 seconds without scrolling blindly. |
| **Primary & Secondary CTAs** | `"Explore SaaS Products"` (Primary blue), `"Request Consultation"` (Outline), and a tiny text link `"Chat with Hanva on WhatsApp (+91 8423711043)"` underneath. | Elevating WhatsApp as an unmistakable primary-grade conversion action (`"Enquire on WhatsApp"` green CTA alongside `"Explore SaaS Products"`) aligns visual hierarchy directly with the primary business objective without losing exploration paths to `/products/` and `/company/contact/`. |
| **Mobile First-Viewport Blocking** | On `mobile_before_home.png` (`375x812`), `<ConsentBanner />` sits `fixed bottom-[76px]`, covering the `"Request Consultation"` and WhatsApp links in Viewport 1! | Make `<ConsentBanner />` more compact on small viewports (`p-3`, concise copy, tight button spacing) so visitors can read CTAs clearly before dismissing. |
| **SaaS Portfolio Distinction (`272-434`)** | Three equal-height cards with distinct accent tokens (`Blue` CRM, `Rose` Salon, `Amber` POS), verified capability bullets, `Explore ...` button + `WhatsApp Demo Enquiry` button using exact `buildSaasDemoWhatsAppUrl(...)`. | Already strong! Add explicit `"Who it's for"` line clarity + `"Contact us for pricing"` cue consistently inside the section header / card footer so pricing expectations are unmistakable. |
| **Services Discovery (`437-490`)** | Digital Marketing (`SEO`, `Google Ads`, `Social`) and Software Development (`6` sub-services) presented cleanly beside SaaS without conflating ready-made SaaS vs custom services. | Add a direct contextual `"Enquire About DM / Custom Software on WhatsApp"` link inside Services discovery so B2B service prospects don't have to navigate away before starting an enquiry. |
| **Trust & Credibility** | Zero fake customer counts, zero fake client logos, zero fabricated testimonials. Verified Bengalore HQ & legal details on footer/contact. | Add a compact non-fabricated verified-company strip right under the hero/bottom CTA (`Registered Indian Entity (CIN/GSTIN) • Bengaluru HQ • Official WhatsApp +91 8423711043 • Contact Us for Pricing`). |
