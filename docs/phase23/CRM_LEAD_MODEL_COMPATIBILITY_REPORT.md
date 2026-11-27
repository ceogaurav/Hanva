# CRM LEAD MODEL COMPATIBILITY REPORT

**Phase:** 23 (Stage A/B Model Reconciliation)  
**Web Target:** `https://www.hanva.in` (`ContactEnquiryPayload` in `HANVA/lib/config.ts`)  
**CRM Target:** `/Users/apple/Downloads/CRM` (`scripts/002_create_leads_table.sql`, `scripts/013_add_enabled_statuses_to_organizations.sql`, `scripts/014_create_global_lead_statuses.sql`, `app/api/webhooks/incoming-leads/route.ts`, `app/api/webhooks/portals/route.ts`)  
**Android Companion Target (Read-Only):** `/Users/apple/Downloads/hanva-telecaller-android/src/App.tsx`

---

## 1. Existing CRM `leads` Schema vs. Runtime Payload Matrix

| Field / Attribute | Base Migration (`002_create_leads_table.sql`) | Observed Runtime Inserts (`incoming-leads`, `portals`, `ivr`, `new/page.tsx`) | Compatibility Gap / Risk | Required Resolution in Blueprint |
| --- | --- | --- | --- | --- |
| `id` | `uuid primary key default gen_random_uuid()` | Server-generated UUID | Compatible | Keep DB-generated UUID v4; return masked `crm_lead_ref` or internal UUID only to authenticated server caller |
| `tenant_id` | **Missing in `002`** (indexes added in `025`) | Required UUID FK to `organizations(id)` | Migration drift: `ALTER TABLE` missing from Git scripts | Enforce `NOT NULL` FK on `leads.tenant_id`; derived server-side (`HANVA_INTERNAL_TENANT_ID`) |
| `name` | `text not null` | Required full name (`name`) | Website captures `full_name` (2–100 chars) | Map website `full_name` -> `leads.name` |
| `phone` | `text not null` | `incoming-leads` strips non-digits and rejects `cleanPhone.length !== 10` (`400`) | **HIGH GAP:** Rejects valid international customers (US/UK/UAE/SG) required by Hanva secondary markets | Preserve normalized E.164 (`+919876543210`, `+447...`) in `phone` + store raw/normalized split or allow 10–15 digit E.164 without truncating country code |
| `email` | `text` (nullable) | Nullable `email` (`new/page.tsx`, `portals/route.ts`) | Website form allows WhatsApp-only users to omit email (`workEmail` optional unless choosing Email fallback) | Validate RFC-style syntax when non-empty; send `null` when omitted |
| `source` | `check (source in ('website', 'referral', 'cold_call', 'social_media', 'advertisement', 'other'))` | `portals` passes `portal_name`, `incoming-leads` passes arbitrary string | **CONSTRAINT DRIFT:** Check constraint in `002` would fail on `'portal_name'` unless dropped out-of-band | Map website primary `source = 'website'` (strictly fits original `002` CHECK constraint!) and carry sub-source (`contact_form`, `product_page`, UTM parameters) in structured fields |
| `status` | Check `('new', 'contacted', 'Interested', 'proposal', 'negotiation', 'closed_won', 'closed_lost', 'follow_up')` | `global_lead_statuses` (`014`) + `organizations.enabled_statuses` (`013`) add `'Documents_Sent'`, `'Login Done'`, `'Transferred to KYC'`, `'Underwriting'`, `'Approved'`, `'Disbursed'`, `'Not_Interested'`, `'not_eligible'`, `'nr'`, `'self_employed'`, `'recycle_pool'` | Legacy `leads_status_check` vs new dynamic org statuses (`013/014`). Note Android app sends lowercase `'interested'`, `'not_interested'`, `'documents_sent'`, `'disbursed'` while CRM table expects mixed case `'Interested'`, `'Not_Interested'`, `'Documents_Sent'`, `'Disbursed'`! | Website ingestion always creates initial status `'new'` (valid across BOTH `002` and `013/014`). Document case mismatch cleanly for Android team without altering Android workspace |
| `priority` | `text check ('low','medium','high','urgent')` | `'high'` (portals/ivr), `'medium'` (manual) | Compatible | Server assigns `'high'` for demo/pricing/SaaS requests, `'medium'` for general enquiries |
| `project` | **Missing in `002`** | Inserted by `incoming-leads/route.ts:91` | Migration drift if `project` column missing in some DB instances | Carry `product_or_service` mapped to `project` if column verified present, plus duplicate safely inside `custom_fields` |
| `custom_fields` | **Missing in `002`**, table `lead_custom_fields` exists in `real_estate_schema.sql` | JSONB inserted by `incoming-leads/route.ts:94` | Dual custom-field mechanism (`leads.custom_fields` JSONB vs `lead_custom_fields` KV table) | Formalize `custom_fields jsonb` + `idempotency_key text` in proposed SQL migration |
| `assigned_to` | `uuid references users(id)` | Nullable (`round robin` in `app/actions/routing.ts` when active telecallers on shift) | Client should NEVER set `assigned_to` | Leave `null` at website ingestion; optionally invoke CRM tenant-safe round-robin router server-side |

---

## 2. SaaS Demo & Services Mapping Into CRM

Website enquiries originate across 3 flagship SaaS products and 3 IT/telecom service lines. The CRM tenant (`Hanva Technologies`) must support:
1. Distinguishing **Product enquiry** (`Hanva CRM`, `Hanva Salon Software`, `Hanva Restaurant POS`) vs **Service enquiry** (`Digital Marketing`, `Custom Software Development`, `Telecom / Cloud Telephony`).
2. Capturing structured routing metadata without breaking existing CRM UI tables (`leads-table.tsx`), Android SIM-call sync (`hanva-telecaller-android`), or WhatsApp automation triggers.
3. Explicitly keeping **WhatsApp clicks** (`https://wa.me/918423711043`) out of `leads` auto-creation unless a visitor explicitly submits a consented form/API request.
