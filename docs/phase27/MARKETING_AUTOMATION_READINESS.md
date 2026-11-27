# HANVA TECHNOLOGIES — MARKETING AUTOMATION READINESS
## Automation Capabilities, Consent Verification & Architectural Roadmap

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 27  
**Date:** November 2026

---

## 1. Automation Governance & Consent Framework

Marketing automation accelerates sales velocity, but improper implementation can violate telecommunications regulations (TRAI DLT guidelines) and data privacy legislation (DPDP Act 2023).

### Strict Policy Mandates:
1. **Zero Unsolicited WhatsApp Outbound:** Hanva never sends unsolicited promotional messages to individuals who have not explicitly initiated an enquiry.
2. **Zero Automated Webhook Spam:** No external marketing webhooks or automated sequences are activated without verified opt-in consent and approved WhatsApp Business template headers.
3. **Strict CRM Boundary:** The website remains isolated from the production CRM backend until Phase 23.2 and 24 security remediations receive formal release approval.

---

## 2. Capability Audit: Current vs Proposed Automations

```
┌─────────────────────────────────┬───────────────────┬─────────────────────────────────┐
│ Automation Capability           │ Current Status    │ Architecture / Requirement      │
├─────────────────────────────────┼───────────────────┼─────────────────────────────────┤
│ Contextual WhatsApp Prefilling  │ IMPLEMENTED       │ Client-side URL synthesis       │
│ Client-Side Form Validation     │ IMPLEMENTED       │ Native React state & regex      │
│ In-Memory UTM Channel Staging   │ IMPLEMENTED       │ lib/utm.ts consent-aware cache  │
│ Automated WA Lead Acknowledgement│ PREPARED / ROADMAP│ Requires WhatsApp Business API  │
│ Automated Sales Slack/Email Alert│ PREPARED / ROADMAP│ Requires Internal Webhook Worker│
│ Scheduled Demo Calendar Reminders│ PREPARED / ROADMAP│ Requires Google Calendar Bridge │
│ Automated CRM Lead Injection    │ BLOCKED BY AUDIT  │ Requires Phase 23/24 Release    │
└─────────────────────────────────┴───────────────────┴─────────────────────────────────┘
```

---

## 3. Automation Specifications (Prepared for Future Activation)

### A. Real-Time Sales Notification Webhook (Prepared)
- **Trigger:** Form submitted on `/company/contact/` with valid inputs.
- **Target:** Internal sales operations notification channel (Encrypted Slack or Telegram webhook).
- **Payload:** Non-PII summary (Product Category, Scale Bracket, Time, Traffic Source). Personal details transmitted only over TLS 1.3 to authorized sales desk endpoints.

### B. WhatsApp Lead Acknowledgment (Prepared)
- **Trigger:** Inbound WhatsApp message received on `+91 8423711043`.
- **Requirement:** Meta-approved WhatsApp Business Message Template:
  ```text
  Hello {{1}}, thank you for contacting Hanva Technologies. 
  A product specialist has received your enquiry regarding {{2}} 
  and will connect with you shortly during our business hours 
  (Mon-Sat, 9 AM - 7 PM IST).
  ```

### C. Calendar Demo Reminder Workflow (Prepared)
- **Trigger:** Demonstration scheduled in Stage 7 of Sales Workflow.
- **Cadence:**
  - T-24 Hours: Automated calendar invite update.
  - T-2 Hours: WhatsApp reminder with meeting link:
    ```text
    Reminder: Your Hanva {{1}} demonstration is scheduled for today at {{2}}. 
    Meeting Link: {{3}}. Reply to this message if you need to reschedule.
    ```

---

## 4. Technical Prerequisites for Production Automation Launch

1. **Meta WhatsApp Business API Integration:** Provisioning an official WhatsApp Business Cloud API account connected to `+91 8423711043`.
2. **Template Pre-Registration:** Pre-registering all notification templates with Meta to ensure 100% template approval.
3. **Formal Security Sign-Off:** Execution of Phase 23.2 and Phase 24 security releases before allowing the public website to post directly to the authoritative CRM repository (`https://github.com/seobanks/CRM`).
