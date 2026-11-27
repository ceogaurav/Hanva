# HANVA TECHNOLOGIES — COMMERCIAL INDUSTRY LANDING PAGES REPORT

**Project:** Hanva Technologies  
**Website:** https://www.hanva.in  
**Phase:** 25  
**Date:** November 2026  
**Status:** Completed & Validated  

---

## 1. Commercial Strategy & Opportunity

Prior to Phase 25, Hanva's website featured 9 enterprise industry pages (Real Estate, Healthcare, Education, BFSI, Insurance, Automobile, Logistics, Recruitment). However, Hanva's three flagship SaaS platforms are specifically engineered for:
1. **Salons, Spas & Wellness Studios** -> Hanva Salon Software
2. **Restaurants, Cafes, QSRs & Cloud Kitchens** -> Hanva Restaurant POS
3. **Telecalling Teams, Outbound Sales Agencies & BPOs** -> Hanva CRM & Telephony

In Phase 25, three dedicated, high-commercial-intent industry landing pages were engineered to capture buyers searching for industry-tailored operational software.

---

## 2. Newly Created Industry Landing Pages

### A. Salons & Spas Management Architecture
- **URL:** `https://www.hanva.in/industry/salons-and-spas/`
- **Target Audience:** Salon owners, day spa proprietors, hair studio directors, and aesthetic clinic managers.
- **Target Search Queries:** `salon management software india`, `spa software with gst billing`, `salon appointment booking software`, `salon staff commission software`.
- **Primary Pain Points Addressed:**
  - Front-desk chaos and phone booking overlaps during weekend peak hours.
  - End-of-month stylist commission disputes over manual service ledgers.
  - Unmonitored back-bar consumable leakage (color, developer, wax, facial kits).
  - Weak customer retention and lack of systematic WhatsApp rebooking reminders.
- **Solution Architecture:**
  - Color-coded multi-stylist appointment calendar with public online booking mini-site.
  - Fast GST POS checkout with split tender (Cash + Card + UPI QR).
  - Staff PIN portal with real-time personal earnings and tier-based commissions.
  - Recipe auto-consumption rules deducting consumables at checkout.
- **Conversion Hook:** WhatsApp Demo Enquiry routing with contextual message prefill (`buildSaasDemoWhatsAppUrl("salon")`).
- **Structured Data:** Schema.org `Service` markup.

### B. Restaurants & Cafes POS Operations Architecture
- **URL:** `https://www.hanva.in/industry/restaurants-and-cafes/`
- **Target Audience:** Restaurateurs, cafe proprietors, QSR operators, bakeries, and cloud kitchen managers.
- **Target Search Queries:** `restaurant pos software india`, `cafe billing software with kot`, `restaurant kitchen display system`, `offline restaurant pos software`.
- **Primary Pain Points Addressed:**
  - Wi-Fi or broadband drops freezing billing counters during dinner peak rush.
  - Handwritten KOT slips causing missed dish modifiers and kitchen errors.
  - Raw ingredient food waste and uncontrolled recipe variance.
  - Slow checkout table bottlenecks waiting for manual card machine entry.
- **Solution Architecture:**
  - Offline-first IndexedDB queue ensuring zero billing downtime during internet outages.
  - Automated KOT printer routing by station (Bar, Tandoor, Main Kitchen) and digital KDS touch boards.
  - India GST 50/50 CGST/SGST tax split and dynamic NPCI UPI QR code generation on bills.
  - Recipe Bill of Materials (BOM) inventory depletion.
- **Conversion Hook:** WhatsApp Demo Enquiry routing with contextual message prefill (`buildSaasDemoWhatsAppUrl("pos")`).
- **Structured Data:** Schema.org `Service` markup.

### C. Telecalling & BPO Lead Acceleration Architecture
- **URL:** `https://www.hanva.in/industry/telecalling-and-bpo/`
- **Target Audience:** Telesales directors, outbound call center heads, DSA loan agencies, and BPO operations managers.
- **Target Search Queries:** `telecalling crm software india`, `call center crm with click to call`, `telecaller call recording software`, `outbound sales crm with dialer`.
- **Primary Pain Points Addressed:**
  - Customer data theft and lead leakage when reps download shared Google Sheets.
  - Manual 10-digit dialing fatigue limiting agents to 40 calls per day.
  - Lack of verified call recordings for quality assurance and dispute resolution.
  - Disconnected agent disposition tracking and unverified remote shift attendance.
- **Solution Architecture:**
  - Role-based lead vaults with strict CSV export controls and automated round-robin allocation.
  - 1-click cloud Click-to-Call (C2C) dialing via certified carrier partners (CloudConnect, Ozonetel, Fonada).
  - In-browser HTML5 audio playback for immediate call recording quality audits.
  - Real-time disposition tagging and geo/camera attendance tracking.
- **Conversion Hook:** WhatsApp Demo Enquiry routing with contextual message prefill (`buildSaasDemoWhatsAppUrl("crm")`).
- **Structured Data:** Schema.org `Service` markup.

---

## 3. Directory Integration
All three new verticals were integrated directly into `/industry/` with custom Lucide icons (`Scissors`, `UtensilsCrossed`, `Headphones`) and featured cards.
