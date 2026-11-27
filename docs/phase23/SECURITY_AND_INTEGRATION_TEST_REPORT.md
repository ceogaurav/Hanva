# SECURITY & INTEGRATION TEST REPORT

**Phase:** 23 (Stage E Empirical Verification Results)  
**Test Fixtures:** `docs/phase23/evidence/synthetic_lead_fixtures.json` (100% synthetic non-production fixtures)  
**Machine Results:** `docs/phase23/evidence/phase23_verification_results.json`  
**Execution Log:** `docs/phase23/evidence/phase23_security_integration_run.log`  
**Outcome:** **`33 Passed, 0 Failed` (`sandbox_mock` + isolated fail-closed `503` + isolated `429`)**

> [!NOTE]
> All `201 Created` functional assertions ran against HANVA's gated `sandbox_mock` adapter (`production_crm_synced: false`), while isolated `503` tests verified fail-closed enforcement under `CRM_INTEGRATION_MODE=disabled` and unapproved `live_signed_gateway`. Live production CRM database writes were NEVER executed because Stage A CRM integration remains `BLOCKED`.

---

## 1. Functional Ingestion, Classification & Deduplication Suite (`12 / 12` PASS)

| Check ID | Expected Behavior | Verified Result |
| --- | --- | --- |
| `valid_crm_india` | `9876543001` -> `+919876543001`, `Product enquiry`, `saas_crm_demo`, `production_crm_synced=false` | `PASS` (`201`) |
| `valid_salon_india` | `+91 98765-43002` -> `+919876543002`, `Product enquiry`, `saas_salon_demo` | `PASS` (`201`) |
| `valid_pos_india` | `09876543003` + display string `"Hanva Restaurant POS"` -> `+919876543003`, `saas_pos_demo` | `PASS` (`201`) |
| `valid_digital_marketing_service` | `Service enquiry`, `digital_marketing_desk` | `PASS` (`201`) |
| `valid_software_dev_service` | `Service enquiry`, `custom_engineering_desk` | `PASS` (`201`) |
| `valid_telecom_service` | `Service enquiry`, `cloud_telephony_desk` | `PASS` (`201`) |
| `valid_intl_uk_whatsapp_only` | `+44 7700 900123`, omitted email -> `+447700900123` (`GB`), `email_provided=false` | `PASS` (`201`) |
| `valid_intl_us` | `+1-415-555-0199` -> `+14155550199` (`US_CA`) | `PASS` (`201`) |
| `valid_cross_product_same_phone` | Same `+919876543001` enquiring about `restaurant-pos` creates distinct lead without false collision | `PASS` (`201`) |
| `idempotent_retry_replay` | Exact retry with same `lead_idempotency_key` returns same `lead_reference` without duplicate creation | `PASS` (`200`) |
| `idempotency_key_conflict` | Same `lead_idempotency_key` with altered phone rejected cleanly | `PASS` (`409`) |
| `duplicate_fingerprint_cooldown` | Same phone + product with new key rejected cleanly preserving existing record | `PASS` (`409`) |

---

## 2. Security, Input Hardening & Fail-Closed Suite (`21 / 21` PASS)

| Check ID | Expected Behavior | Verified Result |
| --- | --- | --- |
| `method_get_405` | Non-POST HTTP method rejected with `Allow: POST` | `PASS` (`405`) |
| `reject_privileged_tenant_id` / `assigned_to` / `status` | Privileged CRM fields in client body rejected (`PRIVILEGED_FIELD_FORBIDDEN`) | `PASS` (`400` all 3) |
| `reject_foreign_origin` | Untrusted `Origin: https://evil-attacker.example` blocked | `PASS` (`403`) |
| `reject_xss_script` | `<script>alert(1)</script>` blocked | `PASS` (`400`) |
| `reject_honeypot_spam` | Populated `website_url_check` trapped (`SPAM_DETECTED`) | `PASS` (`400`) |
| `reject_missing_consent` | `consent_accepted: false` rejected (`CONSENT_REQUIRED`) | `PASS` (`400`) |
| `reject_bad_phone_0..3` | `"12345"`, `"0000000000"`, `"+911234567890"`, `"not-a-phone"` rejected (`INVALID_PHONE`) | `PASS` (`400` all 4) |
| `reject_malformed_json` / non-JSON / oversized `> 16 KB` | Protocol & DoS size guards enforced cleanly | `PASS` (`400` / `415` / `413`) |
| `fail_closed_disabled` & `fail_closed_live_unapproved` | Isolated port `3002` & `3003` fail closed with `CRM_INTEGRATION_BLOCKED` & WhatsApp fallback | `PASS` (`503` both) |
| `rate_limit_429_enforced` | Isolated port `3004` (`LEAD_RATE_LIMIT_MAX=4`) triggers `429` + `Retry-After: 60` on burst | `PASS` (`429`) |
| `bundle_scan` | `18` client JS chunks under `.next/static` scanned -> `0` secrets/service keys exposed | `PASS` (`0` leaks) |
| `log_pii_audit` | `26` structured gateway logs audited in `task-6935.log` -> `0` plaintext PII strings | `PASS` (`0` PII hits) |
