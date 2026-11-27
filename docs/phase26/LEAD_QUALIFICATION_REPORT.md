# HANVA TECHNOLOGIES — LEAD QUALIFICATION REPORT
## 3-Click Qualification Journey, Intent Scoring & Pre-filled WhatsApp Routing

**Company:** Hanva Technologies  
**Website:** https://www.hanva.in  
**Phase:** 26  
**Component:** `components/interactive/lead-qualifier.tsx`  
**Target URL:** `/company/contact/`  
**Official WhatsApp:** `+91 8423711043`  
**Date:** November 2026

---

## 1. Objective: Eliminating B2B Lead Friction

Traditional B2B lead generation relies on long, intimidating web forms requesting 8 to 12 fields (Company Name, Annual Revenue, Number of Employees, Implementation Date, Job Title, Work Email, Phone, Project Budget).

For fast-moving Indian SMB business owners, this creates immense drop-off:
- Owners browsing on mobile devices find typing long paragraphs on soft keyboards tedious.
- Concerns about spam and unsolicited cold calls discourage users from entering phone numbers into anonymous web forms.
- Many prospects have clear intent but do not know how to articulate their technical requirements.

Phase 26 engineered the **Fast-Track 3-Click Lead Qualifier (`lead-qualifier.tsx`)**. This interactive widget transforms high-friction text entry into a rapid, 30-second structured selection that prepares a pre-filled WhatsApp enquiry message ready for one-tap review and transmission.

---

## 2. The 3-Step Qualification Flow

```
┌────────────────────────────────────────────────────────┐
│ STEP 1: Select Solution Category                       │
│ [Hanva CRM] [Salon Software] [Restaurant POS] [Telecom]│
├────────────────────────────────────────────────────────┤
│ STEP 2: Specify Operating Scale                        │
│ (Dynamic options based on selected category)           │
├────────────────────────────────────────────────────────┤
│ STEP 3: Identify Primary Operational Bottleneck        │
│ (Tailored options addressing core pain points)         │
├────────────────────────────────────────────────────────┤
│ RESULT: Instant Qualification Summary                  │
│ Generated Structured WhatsApp Message → One-Tap Handoff│
└────────────────────────────────────────────────────────┘
```

### Step 1: Solution Category Selection
The user chooses their area of interest from 5 clear options:
- **Hanva CRM:** Telecalling, sales pipelines, lead management, and cloud calling.
- **Hanva Salon Software:** Appointment booking, stylist PIN portal, inventory, and GST billing.
- **Hanva Restaurant POS:** Table layout, station KOTs, KDS, offline billing, and recipe BOM.
- **Telecom & Cloud PBX:** Smart IVR, auto-dialers, 1800 toll-free numbers, and virtual numbers.
- **Custom Software & Marketing:** Bespoke web/mobile applications, SEO, and Google Ads.

### Step 2: Scale & Team Size Specification
The options in Step 2 adapt dynamically based on the solution chosen in Step 1:
- *For CRM:* 1-5 Telecallers | 6-15 Sales Agents | 16-50 Enterprise Seats | 50+ Multi-Branch Team.
- *For Salon Software:* Single Salon / Spa Outlet | 2-3 Boutique Studios | 4-10 Multi-City Chain | Freelance Grooming Lounge.
- *For Restaurant POS:* Single Cafe / QSR Counter | Casual Dine-In (10-30 Tables) | Multi-Outlet Food Chain | Cloud Kitchen / Delivery Only.
- *For Telecom:* 1-5 Agent Desk | 6-20 Inbound Lines | 21-50 Contact Center | 50+ Outbound Calling Suite.
- *For Custom Engineering:* Early-Stage Prototype / MVP | Business Process Automation | Legacy System Modernization | Enterprise Platform.

### Step 3: Primary Operational Focus (The Pain Point)
The user selects their immediate priority:
- *For CRM:* Centralizing unorganized lead sources | Enforcing telecaller calling discipline | In-browser call recording playback | KYC collection and deal stages.
- *For Salon Software:* Eliminating appointment double-bookings | Resolving stylist commission disputes | Preventing back-bar product shrinkage | Fast GST checkout with UPI BharatQR.
- *For Restaurant POS:* Preventing POS crashes during internet outages | Eliminating lost kitchen tickets with KDS | Dynamic UPI QR billing at tables | Real-time recipe ingredient costing.
- *For Telecom:* Professional multi-level IVR greeting | Predictive dialing for telemarketing | Virtual number tracking for marketing ads | Secure, compliant call logging.
- *For Custom Engineering:* Custom workflow software tailored to our business | Mobile app development (iOS & Android) | High-converting web portal | Inbound SEO & Google Ads customer acquisition.

---

## 3. Structured Message Synthesis & Routing Protocol

Once the user completes Step 3, the widget synthesizes a structured, highly legible message payload and generates a dynamic WhatsApp URL:

```
https://wa.me/918423711043?text=Hello%20Hanva%20Team%2C%0A%0AI%20completed%20the%20Solution%20Qualifier%20on%20your%20website%3A%0A%E2%80%A2%20Solution%3A%20Hanva%20Restaurant%20POS%0A%E2%80%A2%20Scale%3A%20Casual%20Dine-In%20(10-30%20Tables)%0A%E2%80%A2%20Immediate%20Focus%3A%20Preventing%20POS%20crashes%20during%20internet%20outages%0A%0APlease%20share%20product%20details%2C%20a%20guided%20demo%2C%20and%20pricing%20information.
```

### Formatted Message Representation in WhatsApp:
```text
Hello Hanva Team,

I completed the Solution Qualifier on your website:
• Solution: Hanva Restaurant POS
• Scale: Casual Dine-In (10-30 Tables)
• Immediate Focus: Preventing POS crashes during internet outages

Please share product details, a guided demo, and pricing information.
```

---

## 4. Analytics & Attribution Integration

The widget fires custom analytics events into Hanva's non-PII tracking architecture:
- `trackProductDemoInteraction`: Triggered when the user advances between Step 1, Step 2, and Step 3.
- `trackLeadQualified`: Triggered upon completion of Step 3, logging:
  - `product_category`: e.g., `"restaurant-pos"`
  - `scale_bracket`: e.g., `"Casual Dine-In (10-30 Tables)"`
  - `focus_area`: e.g., `"offline_resilience"`
  - `handoff_channel`: `"whatsapp"`
- Zero PII (no personal identity tokens) is transmitted to Google Tag Manager or GA4.

---

## 5. User Experience & Fallback Safeguards

1. **Review Before Send:** Clicking "Continue to WhatsApp" launches the official WhatsApp application with the message pre-filled in the text composer. The user retains total control to review, edit, or append details before hitting Send.
2. **Alternative Direct Channel Notice:** Beneath the button, clear fallback text informs users that they can also contact Hanva via direct telephone (`+91 8423711043`) or email (`contact@hanva.in`) if they prefer not to use WhatsApp.
3. **Reset Capability:** A "Change Selections" button allows the user to return to Step 1 and reconfigure their parameters at any time.
