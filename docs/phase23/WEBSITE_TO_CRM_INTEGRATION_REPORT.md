# WEBSITE-TO-CRM INTEGRATION REPORT

**Phase:** 23 (Stage D Implementation Status)  
**Website Endpoint:** `POST /api/leads/` (`HANVA/app/api/leads/route.ts`)  
**Production CRM Sync Status:** **`BLOCKED / DISABLED BY STAGE A SECURITY GATE`**  
**Active Verified Mode:** **`sandbox_mock`** (non-production local ingestion, normalization, deduplication, and fail-closed verification adapter)

---

## 1. Integration Summary

1. **Server-Side Website Ingestion Pipeline Built & Verified (`1,435` LOC across 5 TypeScript modules):**
   - `lib/leads/schema.ts` (`599` lines): Strict zero-trust request validator (`full_name`, India + international E.164 `phone`, optional `email`, `product_or_service` classification, DPDP `consent_accepted`, `source_page`, UTM sanitization, honeypot spam guard, XSS/control char sanitization, and rejection of privileged CRM override fields `tenant_id`, `organization_id`, `assigned_to`, `status`, `role`, `score`, `is_admin`, `verified_user_id`).
   - `lib/leads/security.ts` (`227` lines): 16 KB body size ceiling (`413`), JSON-only media check (`415`), same-origin verification (`403`), sliding-window IP rate limiter (`429`), SHA-256/HMAC helpers, and zero-PII structured audit logger.
   - `lib/leads/dedupe.ts` (`86` lines): Idempotency-key replay handling (`200 duplicate_replay`), idempotency mismatch blocking (`409 IDEMPOTENCY_KEY_CONFLICT`), and 24-hour fingerprint cooldown preventing duplicate creates without clobbering existing CRM records (`409 DUPLICATE_SUBMISSION`).
   - `lib/leads/crm-adapter.ts` (`203` lines): Fail-closed adapter supporting `disabled`, `sandbox_mock`, and future `live_signed_gateway`. Refuses to transmit to live CRM unless `CRM_STAGE_A_SECURITY_APPROVED=true`, `https://` ingest URL, 32+ char Bearer token, and 32+ char HMAC signing secret are present.
   - `app/api/leads/route.ts` (`320` lines): HTTP handler exposing `POST /api/leads/` (`dynamic = "force-dynamic"`, `Cache-Control: no-store`, method guard `405` on `GET`/`PUT`/`DELETE`).

2. **Public Contact Page Coexistence Preserved (`app/company/contact/page.tsx`):**
   - Because production CRM writes are explicitly blocked by Stage A security findings, `app/company/contact/page.tsx` remains unchanged as a transparent client-side WhatsApp (`https://wa.me/918423711043`) and Email (`info@hanva.in`) enquiry formatter (`"without server storage"`), guaranteeing zero deceptive "saved in CRM" messaging for live visitors.
   - Clicking WhatsApp CTAs across all 79 pages continues to open WhatsApp directly and NEVER auto-creates synthetic CRM leads.

---

## 2. Android Compatibility & Read-Only Boundary Statement

- `/Users/apple/Downloads/hanva-telecaller-android` was inspected strictly read-only and remains completely unmodified.
- Compatibility matrix note documented: Android APK (`src/App.tsx`) posts SIM logs to `/api/telecaller/sim-calls` without JWT Bearer headers and falls back to client mock login when `/api/mobile/login` fails. Securing CRM's `/api/telecaller/sim-calls` endpoint during CRM remediation will require a coordinated Android APK release (`HANVA` Phase 23 makes zero uncoordinated breaking changes to CRM or Android).
