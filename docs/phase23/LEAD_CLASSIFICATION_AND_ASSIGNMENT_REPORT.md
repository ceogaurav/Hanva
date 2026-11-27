# LEAD CLASSIFICATION & ASSIGNMENT REPORT

**Phase:** 23 (Stage B Business Routing Specification)  
**Scope:** Mapping Hanva Technologies website traffic into CRM queues without client-side privilege injection

---

## 1. Classification Matrix (Website Product/Service Taxonomy -> CRM Fields)

| Website Selection / Slug | Normalized Label | Category (`lead_category_label`) | CRM `source` | Priority | Target Queue (`routing_queue`) |
| --- | --- | --- | --- | --- | --- |
| `crm` | Hanva CRM | **Product enquiry** | `website` | `high` | `saas_crm_demo` |
| `salon-software` | Hanva Salon Software | **Product enquiry** | `website` | `high` | `saas_salon_demo` |
| `restaurant-pos` | Hanva Restaurant POS | **Product enquiry** | `website` | `high` | `saas_pos_demo` |
| `telecalling-crm` | Telecalling & Sales CRM | **Product enquiry** | `website` | `high` | `telecom_crm_desk` |
| `whatsapp-crm` | WhatsApp Business CRM | **Product enquiry** | `website` | `high` | `telecom_crm_desk` |
| `cloud-telephony`, `ivr-system`, `smart-ivr`, `auto-dialer`, `predictive-dialer`, `call-center-software`, `virtual-numbers`, `toll-free-numbers` | Respective Telecom Product | **Service enquiry** (Telecom Infrastructure) | `website` | `high` | `cloud_telephony_desk` |
| `digital-marketing`, `seo-services`, `performance-marketing`, `social-media-marketing` | Digital Marketing Services | **Service enquiry** | `website` | `medium` | `digital_marketing_desk` |
| `software-development`, `custom-crm-development`, `web-application-development`, `mobile-app-development`, `saas-product-development`, `api-integration-automation`, `ecommerce-development` | Custom Software & AI Development | **Service enquiry** | `website` | `high` | `custom_engineering_desk` |
| `enterprise` | Enterprise Telecom & CRM Suite | **Product enquiry** | `website` | `high` | `enterprise_solutions_desk` |
| `general` / fallback | General Enquiry | **Service enquiry** | `website` | `medium` | `general_sales_triage` |

---

## 2. Assignment Governance & CRM Routing Rules

1. **Zero Browser Assignment Control:**
   - The browser cannot choose `assigned_to`, `tenant_id`, or `status`. New leads always initialize with `status = 'new'`.
2. **Existing CRM Round-Robin Observation (`CRM/app/actions/routing.ts`):**
   - `assignLeadRoundRobin(tenantId, leadId)` assigns leads to `role = 'telecaller'`, `is_active = true`, `is_on_shift = true` with lowest daily load.
   - **Verified Defect:** Update statement `routing.ts:67-70` filters only `.eq('id', leadId)` without `.eq('tenant_id', tenantId)`. Before calling `assignLeadRoundRobin` from automated website ingestion, `routing.ts` must add `.eq('tenant_id', tenantId)` AND support product-specialty routing filters so SaaS vs Digital Marketing vs Custom Software leads do not land arbitrarily.
3. **Unassigned Safe Queue Default:**
   - If zero matching agents are on shift, `assigned_to` remains `null` (`status = 'new'`, `routing_queue` stored in `custom_fields`) for manual supervisor triage rather than blocking lead capture.
