# PRIVACY & DATA PROTECTION REPORT

**Phase:** 23 (Stage B DPDP Act 2023 Compliance & Data Governance)  
**Reference:** `HANVA/app/company/privacy-policy/page.tsx`, `HANVA/lib/analytics.ts`  
**Contact for Privacy Requests:** `privacy@hanva.in` (Hanva Technologies Private Limited)

---

## 1. Alignment With Indian Digital Personal Data Protection Act, 2023 (DPDP Act)

1. **Purpose Limitation & Minimal Collection:**
   - `POST /api/leads/` collects strictly what is necessary to evaluate and respond to a demo, pricing, or software/marketing consultation request: `full_name`, `phone`, optional `email`, optional `company_name`, `product_or_service`, optional `team_size`/`city`, and free-text `notes` (`<= 1000` chars).
   - No Aadhaar, PAN, passport, payment card, bank credentials, or sensitive biometric/health fields are collected or accepted.
2. **Explicit Affirmative Consent:**
   - `consent_accepted: true` is mandatory for server-side `POST /api/leads/` submission, recording explicit UTC timestamp (`consent_timestamp`) and active privacy policy version (`2026-11-26`).
   - Visitors preferring zero website server persistence retain the choice to use direct `https://wa.me/918423711043` WhatsApp handoff, `tel:+918423711043`, or `mailto:info@hanva.in` without server storage.
3. **Zero PII in Analytics & Observability Logs:**
   - `HANVA/lib/analytics.ts` strictly forbids PII (`full_name`, `email`, `phone`, `company_name`, `notes`) inside GA4/GTM/DataLayer payloads.
   - Server observability logs inside `POST /api/leads/` emit masked metadata ONLY (`correlation_id`, `product_slug`, `lead_category`, `phone_country`, `phone_last2_or_sha256_prefix`, HTTP status, mode) — NEVER plaintext phone numbers, emails, names, notes, or secrets.
4. **Truthfulness Over Privacy Notice:**
   - Notice currently inside `app/company/contact/page.tsx` explicitly informs visitors whether data stays local in-browser (WhatsApp/Email handoff) vs. submitted via server API once live CRM integration is enabled. We preserve complete factual truthfulness — no UI element claims "Saved to live Hanva CRM" while `CRM_INTEGRATION_MODE !== "live_signed_gateway"`.
5. **Cross-Boundary / Storage Safeguards Blocking Live Dispatch:**
   - Because `/Users/apple/Downloads/CRM` currently logs raw PII request bodies (`incoming-leads/route.ts:53`), disables RLS on `public.users`, and exposes hardcoded fallback keys, shipping visitor PII into the unhardened CRM database would violate Hanva's privacy commitments under `app/company/privacy-policy/page.tsx`. Blocking live sync until Stage A remediation satisfies data-protection due care.
