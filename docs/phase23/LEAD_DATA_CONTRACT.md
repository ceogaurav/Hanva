# LEAD DATA CONTRACT

**Contract ID:** `HANVA-WEB-LEAD-V1`  
**Endpoint:** `POST /api/leads/` (Website Server-Side Ingestion Gateway)  
**Format:** `application/json`, UTF-8, `Content-Length <= 16384` bytes (`16 KB`)  
**Mode:** Server-side validation + normalization on HANVA; downstream CRM webhook dispatch fail-closed/gated by Stage A security clearance.

---

## 1. Website Inbound Request Schema (`POST /api/leads/`)

> [!IMPORTANT]
> Client browsers MAY submit business enquiry fields and attribution context ONLY. Privileged internal CRM fields (`tenant_id`, `assigned_to`, `status`, `score`, `priority`, `verified_user_id`) are NEVER accepted for direct binding. If supplied in the browser payload, privileged override fields (`tenant_id`, `organization_id`, `assigned_to`) trigger explicit `400 Bad Request` (`PRIVILEGED_FIELD_FORBIDDEN`) rejection during strict security validation.

| JSON Field | Type | Required | Constraints & Normalization Rules |
| --- | --- | --- | --- |
| `full_name` | `string` | Yes | Trimmed, control chars stripped, length `2..100` chars |
| `phone` | `string` | Yes | Accepts India (`9876543210`, `+91 9876543210`, `09876543210`) & international E.164 (`+44...`, `+1...`, `+971...`). Normalized to strict E.164 (`+[country][number]`, total digits `10..15`, starting digit non-zero after `+`; India 10-digit defaults `+91`) |
| `email` | `string \| null` | No | Optional (supports WhatsApp-first / phone-only leads). If present & non-empty: lowercase, max `254` chars, strict email regex |
| `company_name` | `string \| null` | No | Trimmed, max `120` chars |
| `product_or_service` | `enum \| string` | Yes | Canonical slug or display label matching allowlist (`crm`, `salon-software`, `restaurant-pos`, `digital-marketing`, `seo-services`, `performance-marketing`, `social-media-marketing`, `software-development`, `custom-crm-development`, `cloud-telephony`, `ivr-system`, `smart-ivr`, `auto-dialer`, `predictive-dialer`, `call-center-software`, `telecalling-crm`, `whatsapp-crm`, `virtual-numbers`, `toll-free-numbers`, `enterprise`, `general`) |
| `team_size` | `string \| null` | No | Max `60` chars (e.g., `"Single Outlet / 1-5 Staff"`, `"16-50 Staff / Agents"`) |
| `city` | `string \| null` | No | Max `80` chars (optional location hub context) |
| `notes` | `string \| null` | No | Trimmed, sanitized plain text, max `1000` chars |
| `preferred_channel` | `enum` | No | `'whatsapp' \| 'phone' \| 'email' \| 'api_enquiry'` (default `'whatsapp'`) |
| `lead_idempotency_key` | `string` | No | Client-generated UUID or stable token (`16..128` hex/alnum/hyphen chars). If omitted, server computes deterministic bucket key from normalized contact + product + UTC window |
| `consent_accepted` | `boolean` | Yes | Must equal `true`; records explicit DPDP Act 2023 processing notice acknowledgment |
| `source_page` | `string` | Yes | Same-origin site path (`/...`), validated max `256` chars |
| `utm_source` | `string \| null` | No | Optional non-PII attribution (`1..64` safe slug chars) |
| `utm_medium` | `string \| null` | No | Optional (`1..64` safe slug chars) |
| `utm_campaign` | `string \| null` | No | Optional (`1..80` safe slug chars) |
| `website_url_check` | `string` | No | Honeypot field — MUST be empty; non-empty triggers silent/clean `400 SPAM_DETECTED` rejection without forwarding |

---

## 2. Canonical Server-Normalized CRM Payload (`HANVA -> CRM Gateway`)

```json
{
  "schema_version": "hanva.lead.v1",
  "lead_idempotency_key": "sha256:...",
  "dedupe_fingerprint": "sha256:...",
  "created_at": "2026-11-26T14:20:00.000Z",
  "source": "website",
  "lead_category": "product_enquiry",
  "lead_category_label": "Product enquiry",
  "product_slug": "salon-software",
  "product_label": "Hanva Salon Software",
  "routing_queue": "saas_salon_demo",
  "priority": "high",
  "status": "new",
  "contact": {
    "full_name": "Ananya Verma",
    "company_name": "Glow Studio",
    "email": "ananya@example.in",
    "phone_e164": "+919876543210",
    "phone_country": "IN"
  },
  "qualification": {
    "team_size": "6-15 Staff / Agents",
    "city": "Bengaluru",
    "notes": "Need multi-staff appointment and GST billing demo.",
    "preferred_channel": "whatsapp"
  },
  "attribution": {
    "source_page": "/products/salon-software/",
    "utm_source": "google",
    "utm_medium": "organic",
    "utm_campaign": "salon_india"
  },
  "consent": {
    "privacy_policy_version": "2026-11-26",
    "consent_accepted": true,
    "consent_timestamp": "2026-11-26T14:20:00.000Z"
  }
}
```

---

## 3. API Response Contract (Safe External Contract)

- **Never returns:** Internal DB secrets, full organization lists, other users' emails/phones, stack traces, SQL errors, or raw downstream tokens.
- **201 Created (New Accepted Lead):**
```json
{
  "ok": true,
  "status": "created",
  "correlation_id": "req_...",
  "lead_reference": "HNV-...",
  "integration_mode": "sandbox_mock",
  "production_crm_synced": false,
  "classification": {
    "category": "Product enquiry",
    "product": "Hanva Salon Software",
    "routing_queue": "saas_salon_demo"
  },
  "fallback": {
    "whatsapp_url": "https://wa.me/918423711043?text=...",
    "email": "info@hanva.in",
    "phone": "+91 8423711043"
  }
}
```
- **200 OK (Idempotent Retry Replay):** Same schema with `"status": "duplicate_replay"`, `"duplicate_detected": true`.
- **409 Conflict (Matching Fingerprint / Conflicting Duplicate Submission within Dedupe Window):** Safe notice `"duplicate_conflict"`, preserving existing lead without overwrite, plus `fallback.whatsapp_url`.
- **503 Service Unavailable (Upstream CRM Blocked / Timeout / Unconfigured):** `"production_crm_synced": false`, explicit truthful error code (`CRM_INTEGRATION_BLOCKED` or `CRM_UPSTREAM_UNAVAILABLE`) + WhatsApp/Email/Phone fallback URLs so the customer enquiry never dies silently.
