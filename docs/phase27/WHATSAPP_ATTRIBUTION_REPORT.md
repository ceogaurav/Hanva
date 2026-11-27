# HANVA TECHNOLOGIES — WHATSAPP ATTRIBUTION REPORT
## End-to-End Acquisition Journey, Contextual Prefilling & Non-PII Event Taxonomy

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 27  
**Official WhatsApp Endpoint:** `+91 8423711043` (`https://wa.me/918423711043`)  
**Date:** November 2026

---

## 1. The Strategic Role of WhatsApp in Indian B2B Commerce

In India, WhatsApp is not merely a chat application; it is the universal operating system for business communication. Founders, salon owners, restaurateurs, and sales heads prefer conducting preliminary software evaluations, reviewing product decks, discussing custom requirements, and scheduling demonstrations via WhatsApp rather than email or phone calls from unknown numbers.

**However, marketing attribution often breaks during the transition from website to WhatsApp:**
- Marketers lose visibility when a web user clicks a link and enters a private chat app.
- Sales representatives receiving an inbound message often have zero context regarding which ad, keyword, or page prompted the enquiry.

Phase 27 implements a **Contextual WhatsApp Attribution Framework** that bridges web analytics with sales desk conversations while strictly respecting customer privacy.

---

## 2. Contextual Message Synthesis Architecture

When a visitor clicks a WhatsApp button on Hanva, the link builder dynamically interpolates the product identity, specific feature intent, and acquisition channel into the prefilled message text.

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User arrives via Google Ads:                             │
│    ?utm_source=google&utm_medium=cpc&utm_campaign=crm_india │
├─────────────────────────────────────────────────────────────┤
│ 2. lib/utm.ts extracts attribution:                         │
│    channel = "paid_search", source = "Google"               │
├─────────────────────────────────────────────────────────────┤
│ 3. User clicks "Request Demo on WhatsApp" on /products/crm/ │
├─────────────────────────────────────────────────────────────┤
│ 4. buildSaasDemoWhatsAppUrl("crm", "Google") compiles text: │
│    "I'm interested in a demo of Hanva CRM.                  │
│     I found you through Google."                            │
├─────────────────────────────────────────────────────────────┤
│ 5. wa.me link opens WhatsApp with prefilled message         │
└─────────────────────────────────────────────────────────────┘
```

### Contextual Message Matrix by Product & Source

#### Hanva CRM
- *From Organic Google Search:* `"I'm interested in a demo of Hanva CRM. I found you through Google."`
- *From Paid Google Search:* `"I'm interested in a demo of Hanva CRM. I found you through Google Search."`
- *From Direct / Referral:* `"I'm interested in a demo of Hanva CRM."`

#### Hanva Salon Software
- *From Organic Google Search:* `"I'm interested in a demo of Hanva Salon Software. I found you through Google."`
- *From Social Media:* `"I'm interested in a demo of Hanva Salon Software. I found you through Social Media."`
- *From Direct:* `"I'm interested in a demo of Hanva Salon Software."`

#### Hanva Restaurant POS
- *From Paid Search:* `"I'm interested in a demo of Hanva Restaurant POS. I found you through Google."`
- *From Offline Resilience Test:* `"Hello Hanva Team, I tested the Restaurant POS Explorer on your website and would like to see a demo for my restaurant/cafe."`

#### 3-Click Solution Qualifier (`lead-qualifier.tsx`)
Generates structured multi-attribute enquiry payloads:
```text
Hello Hanva Team,

I completed the Solution Qualifier on your website:
• Solution: Hanva Restaurant POS
• Scale: Casual Dine-In (10-30 Tables)
• Immediate Focus: Preventing POS crashes during internet outages

Please share product details, a guided demo, and pricing information.
```

---

## 3. Strict Event Separation & Measurement Standards

In accordance with Phase 27 corrections, analytics measurement maintains total separation between client actions and confirmed business outcomes:

```
[1. whatsapp_click]
       ↓ (User clicks the button on webpage)
[2. enquiry_handoff]
       ↓ (Browser launches wa.me URL with prefilled text)
[3. enquiry_received] (External Sales Desk Metric)
       ↓ (Prospect taps "Send" in WhatsApp; message arrives on sales phone)
[4. lead_qualified] (Sales Desk Qualification Action)
       ↓ (Sales engineer confirms fit, scale, and purchase authority)
[5. demo_scheduled]
       ↓ (Calendar invite confirmed)
[6. demo_completed]
       ↓ (Live walkthrough executed)
[7. sale_won]
       ↓ (Commercial contract signed)
```

### Privacy & Technical Rules:
- **Never Treat Link Clicks as Completed Enquiries:** Clicking a WhatsApp link is recorded as `enquiry_handoff`. It is never recorded as `enquiry_received` or `lead_qualified` on the website.
- **Zero PII in Analytics Payloads:** Event payloads log only `product_name`, `destination`, `traffic_channel`, and `utm_campaign`. Customer phone numbers, names, and personal chat messages are never sent to GA4 or third-party trackers.
