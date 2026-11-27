# HANVA TECHNOLOGIES — ANALYTICS & CONVERSION MEASUREMENT
## Standardized Event Taxonomy, Non-PII Safeguards & Metric Separation

**Company:** Hanva Technologies  
**Website:** https://www.hanva.in  
**Phase:** 26  
**Implementation File:** `lib/analytics.ts`  
**Compliance Standard:** Digital Personal Data Protection Act, 2023 (DPDP Act)  
**Date:** November 2026

---

## 1. Analytics Architecture & Non-PII Safeguards

Hanva Technologies operates a modern, client-side conversion measurement framework integrated with Google Tag Manager (GTM) and Google Analytics 4 (GA4).

### The Golden Privacy Rule: Absolute PII Prohibition
Under our privacy guidelines and the DPDP Act 2023:
- **NEVER** transmit customer names, personal email addresses, phone numbers, or free-form text input to external analytics trackers (`dataLayer.push` or GA4).
- All analytics event payloads are restricted to **sanitized categorical metadata, interaction states, and non-identifying operational counters**.

---

## 2. Standardized Phase 26 Conversion Event Taxonomy

Phase 26 establishes a rigorous event taxonomy tracking every step of the customer acquisition journey:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. product_page_view                                        │
│    Visitor views a core SaaS product page                   │
├─────────────────────────────────────────────────────────────┤
│ 2. product_demo_view                                        │
│    Interactive demonstration component enters viewport      │
├─────────────────────────────────────────────────────────────┤
│ 3. product_demo_interaction                                 │
│    Visitor toggles roles, steps, audio scrub, or Wi-Fi test │
├─────────────────────────────────────────────────────────────┤
│ 4. contact_form_submit                                      │
│    Visitor completes local validation of contact form       │
├─────────────────────────────────────────────────────────────┤
│ 5. enquiry_handoff                                          │
│    Visitor initiates WhatsApp client redirect               │
├─────────────────────────────────────────────────────────────┤
│ 6. lead_qualified                                           │
│    Visitor finishes 3-step solution & scale qualifier       │
├─────────────────────────────────────────────────────────────┤
│ 7. demo_completed                                           │
│    Visitor steps through all 6 simulation stages            │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Event Payload Specifications

### Event: `product_page_view`
- **Trigger:** Fired when a flagship SaaS page loads.
- **Payload Attributes:**
  - `page_path`: e.g., `"/products/crm/"`
  - `product_name`: `"hanva_crm"` | `"salon_software"` | `"restaurant_pos"`
  - `category`: `"saas_software"`

### Event: `product_demo_view`
- **Trigger:** Fired via IntersectionObserver when the interactive workflow explorer enters visible viewport.
- **Payload Attributes:**
  - `product_name`: `"hanva_crm"` | `"salon_software"` | `"restaurant_pos"`
  - `demo_component`: e.g., `"crm_workflow_explorer"`
  - `viewport_position`: `"interactive_simulation_section"`

### Event: `product_demo_interaction`
- **Trigger:** Fired when a user clicks a step tab, role toggle, audio scrub, or Wi-Fi drop test.
- **Payload Attributes:**
  - `product_name`: `"hanva_crm"`
  - `interaction_type`: `"step_tab_click"` | `"role_toggle"` | `"audio_scrub"` | `"offline_toggle"`
  - `step_index`: `0` to `5`
  - `step_name`: e.g., `"1-Click Click-to-Call (C2C)"`
  - `role_selected`: `"telecaller"` | `"closer"` | `"manager"`

### Event: `demo_completed`
- **Trigger:** Fired when a visitor navigates through all 6 stages of an interactive explorer.
- **Payload Attributes:**
  - `product_name`: `"hanva_crm"`
  - `total_steps`: `6`
  - `time_spent_seconds`: Non-identifying integer duration.

### Event: `contact_form_submit`
- **Trigger:** Fired when the user clicks submit on `/company/contact/` and client validation passes.
- **Strict Privacy Check:** No name, email, or mobile number included in payload.
- **Payload Attributes:**
  - `form_name`: `"contact_demo_enquiry"`
  - `product_interest`: e.g., `"Hanva Restaurant POS"`
  - `team_size_bucket`: e.g., `"Casual Dine-In (10-30 Tables)"`
  - `handoff_method`: `"whatsapp_client_url"`
  - `popup_blocked`: `true` | `false`

### Event: `enquiry_handoff`
- **Trigger:** Fired when a user clicks a WhatsApp CTA button transferring them to WhatsApp web/app.
- **Payload Attributes:**
  - `cta_location`: `"hero"` | `"interactive_explorer"` | `"sticky_bottom_bar"` | `"contact_page"`
  - `product_name`: `"hanva_crm"` | `"salon_software"` | `"restaurant_pos"` | `"telecom"`
  - `cta_type`: `"request_demo_whatsapp"` | `"service_whatsapp"`
  - `experiment_id`: `"EXP-22C"` (where applicable)

### Event: `lead_qualified`
- **Trigger:** Fired when a user completes Step 3 in `<LeadQualifier />`.
- **Payload Attributes:**
  - `product_category`: `"crm"` | `"salon-software"` | `"restaurant-pos"` | `"telecom"`
  - `scale_bracket`: e.g., `"1-5 Telecallers"`
  - `focus_area`: e.g., `"Enforcing telecaller calling discipline"`
  - `handoff_channel`: `"whatsapp"`

---

## 4. Truthfulness & Metric Separation Standards

A critical conversion pitfall is conflating a button click with a closed sale. Hanva's analytics infrastructure strictly enforces **metric separation**:

```
[Link Click] ≠ [Form Validation] ≠ [WhatsApp Delivery] ≠ [Qualified Lead] ≠ [Customer]
```

1. **CTA Link Clicks (`whatsapp_click` / `demo_cta_click`):** Measures initial user interest and link activation. Does NOT prove message transmission.
2. **Form Submission (`contact_form_submit`):** Measures local browser form validation and message compilation.
3. **WhatsApp Handoff (`enquiry_handoff`):** Measures opening of `wa.me/918423711043` with prefilled text.
4. **Verified Inbound Enquiry (Internal CRM Metric):** Recorded ONLY when the prospect actually taps "Send" inside WhatsApp and the message arrives on Hanva's official WhatsApp Business desk.
5. **Qualified Sales Opportunity (Sales Desk Metric):** Recorded after a sales engineer reviews the requirement and confirms fit, budget, and timeline.

By maintaining this separation, executive management receives accurate conversion funnel visibility without inflated vanity figures.
