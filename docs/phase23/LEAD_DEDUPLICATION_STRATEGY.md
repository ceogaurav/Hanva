# LEAD DEDUPLICATION STRATEGY

**Phase:** 23 (Stage B / Stage D Specification)  
**Scope:** Website Ingestion Gateway (`HANVA/lib/leads/dedupe.ts`) + Proposed CRM Postgres Constraint (`proposed_crm_rls_and_idempotency_migration.sql`)

---

## 1. Problems Identified in Current CRM Webhook (`incoming-leads`)

`CRM/app/api/webhooks/incoming-leads/route.ts` performs direct `.insert()` on every HTTP `POST` without:
- Client or gateway `idempotency_key` enforcement;
- Retry deduplication across network timeouts / double-clicks;
- Normalized E.164 phone + product window comparison.

As a result, network retries or repeated clicks silently generate multiple duplicate rows and spam automated WhatsApp triggers.

---

## 2. Multi-Layer Deduplication Architecture

### Layer 1: Request Idempotency Key (Double-Submit & Retry Safety)
- **Header / Body Input:** `X-Idempotency-Key` header or `lead_idempotency_key` JSON field (must be 16–128 URL-safe chars).
- **Fallback Automatic Bucket Key:** If omitted by caller, compute:
  `SHA-256(normalized_phone_e164 + "|" + normalized_email + "|" + canonical_product_slug + "|" + UTC_YYYYMMDD)`
- **Behavior on Replay (`Same Idempotency Key + Same Normalized Hash`):**
  - Do NOT create a second lead record.
  - Do NOT trigger duplicate WhatsApp/notification workflows.
  - Return HTTP **`200 OK`** with `"status": "duplicate_replay"` and original masked `lead_reference`.

### Layer 2: Contact + Product Cooldown Window (Anti-Duplicate Across Separate Form Opens)
- **Fingerprint:** `SHA-256(normalized_phone_e164 + "|" + canonical_product_slug)` (plus optional `normalized_email` verification).
- **Window:** 24 hours inside CRM database / website ingestion buffer.
- **Collision Behavior (`Different Idempotency Key, Same Phone + Product within 24h`):**
  - Default **Safe Non-Destructive Policy:** Do NOT overwrite existing telecaller notes, `assigned_to`, `status`, or `priority`.
  - Return HTTP **`409 Conflict`** (safe duplicate response) or append an idempotent `notes` / activity log entry *only* inside CRM when an explicit CRM enrichment endpoint is active — never blindly overwriting lead ownership or clobbering status back to `'new'`.
- **Conflict Policy When Payload Mismatch Occurs With Reused Idempotency Key:**
  - If the caller explicitly supplies an existing `X-Idempotency-Key` with a **different** phone number or product payload hash, reject cleanly with **`409 Conflict` (`IDEMPOTENCY_KEY_REUSED_WITH_DIFFERENT_PAYLOAD`)** to prevent silent mutation or spoofing.

### Layer 3: Database Enforcement (CRM Remediation Migration)
In `docs/phase23/evidence/proposed_crm_rls_and_idempotency_migration.sql`:
- `ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS idempotency_key text;`
- `CREATE UNIQUE INDEX IF NOT EXISTS uq_leads_tenant_idempotency_key ON public.leads (tenant_id, idempotency_key) WHERE idempotency_key IS NOT NULL;`
- Postgres guarantees atomic duplicate immunity under concurrent requests (`23505 unique_violation` handled cleanly as idempotent lookup).

---

## 3. Coexistence Rule: Repeat Visitor Across *Different* Products

- If `+919876543210` submits an enquiry for **`Hanva CRM`** at 10:00 IST and later submits an enquiry for **`Hanva Restaurant POS`** at 10:15 IST:
  - Different `canonical_product_slug` => **Distinct deduplication fingerprint**.
  - Both legitimate product enquiries are accepted cleanly without colliding.
- WhatsApp click-to-chat (`https://wa.me/918423711043`) clicks remain completely external and never write synthetic rows to the deduplication store.
