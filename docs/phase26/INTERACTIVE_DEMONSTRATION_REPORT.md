# HANVA TECHNOLOGIES — INTERACTIVE DEMONSTRATION REPORT
## Architecture, Technical Specification & State Design of Simulation Components

**Company:** Hanva Technologies  
**Website:** https://www.hanva.in  
**Phase:** 26  
**Components Evaluated:**
- `components/interactive/crm-workflow-explorer.tsx`
- `components/interactive/salon-workflow-explorer.tsx`
- `components/interactive/restaurant-pos-explorer.tsx`
**Date:** November 2026

---

## 1. Architectural Philosophy

Indian SMB buyers encounter software fatigue when confronted with passive marketing screenshots or wall-of-text feature lists. They need to experience the software's logic and user interface mechanics before investing time in a scheduled demonstration.

Phase 26 engineered three client-side interactive workflow simulators designed around three core principles:
1. **Architectural Truthfulness:** Every stage, status, and control maps directly to existing codebase logic in Hanva's software repositories.
2. **Zero PII & Synthetic Realism:** Uses authentic Indian SMB business contexts (real estate telecalling, luxury salon spa appointments, rush-hour restaurant dining) with 100% synthetic, non-PII test fixtures.
3. **Frictionless Conversion Bridge:** Every workflow explorer culminates in a direct WhatsApp CTA that transfers the prospect's exploration context directly to Hanva's sales engineering desk on `+91 8423711043`.

---

## 2. Component Deep-Dive

### A. Hanva CRM Workflow Explorer (`crm-workflow-explorer.tsx`)

#### Purpose
Simulates the end-to-end sales lifecycle for telecalling teams, from inbound lead ingestion to managerial QA call review.

#### State Architecture
- `activeStep` (0 to 5): Controls the visible lifecycle stage.
- `selectedRole` (`telecaller` | `closer` | `manager`): Alters the viewport perspective and access privileges.
- `isPlayingAudio` (boolean): Controls the simulated WebRTC call recording playback.
- `audioProgress` (0 to 100): Simulates timeline scrubbing across the audio recording.
- `leadStatus`: Dynamic lead stage (`new` | `contacted` | `qualified` | `kyc_uploaded` | `closed_won`).

#### The 6 Simulated Stages
1. **Inbound Webhook Capture:** Displays raw webhook JSON intake (Name: "Rajesh Sharma", Source: "Google Ads High-Intent Form", Budget: "₹75L - ₹1.2Cr", Score: 88/100).
2. **Smart Allocation Engine:** Demonstrates automated rule-based distribution assigning the lead to Senior Telecaller Priya Verma based on language skill and active load.
3. **1-Click Click-to-Call (C2C):** Simulates an agent browser click initiating an Exotel/carrier bridge. Shows active call timer, customer phone masking (`+91 98765 43***`), and live call status (`RINGING` → `CONNECTED`).
4. **Call Disposition & Reminders:** Telecaller logs call outcome: "Interested - Needs 3BHK Brochure", schedules follow-up for tomorrow 11:30 AM, and triggers an automated WhatsApp brochure link.
5. **Deal Pipeline & KYC Vault:** Moves deal stage to "KYC Verification". Shows secure document upload preview: Aadhaar and PAN card verification tokens.
6. **QA Auditing & Audio Playback:** Manager perspective with playable 2m 14s call recording, speech waveform visualizer, and agent quality scorecard (Pitches script: 9/10, Objections: 8/10).

#### Conversion Bridge
Direct button: "Discuss CRM Implementation on WhatsApp" linking to `https://wa.me/918423711043` with prefilled message: `"Hello Hanva Team, I tested the CRM Workflow Explorer on your website and would like a live demonstration."`

---

### B. Hanva Salon Software Workflow Explorer (`salon-workflow-explorer.tsx`)

#### Purpose
Demonstrates how salon front-desk chaos, inventory leakage, and stylist commission disputes are solved in daily salon operations.

#### State Architecture
- `activeStep` (0 to 5): Controls the salon service timeline.
- `isGstIncluded` (boolean): Toggles between GST-inclusive and GST-exclusive billing calculations.
- `selectedService`: Dynamic selection of treatment (e.g., "Luxe Hair Spa & Keratin Polish").
- `inventoryLevels`: Real-time stock counts updating dynamically upon billing completion.

#### The 6 Simulated Stages
1. **Client Online Booking Mini-Site:** Client "Priya Patel" selects "Keratin Treatment" on the public booking mini-site for 03:30 PM with Senior Stylist Rahul.
2. **Front-Desk Appointment Grid:** Front-desk manager confirms chair assignment, views stylist workload, and tags client as "VIP / Organic Products Only".
3. **Stylist PIN Portal:** Rahul enters a 4-digit PIN on the shared salon tablet, views client notes, begins the service, and marks prep time.
4. **Back-Bar Inventory Auto-Consumption:** System automatically deducts 60ml Argan Hair Mask and 1 ampoule Serum from back-bar stock when the service is checked in, preventing inventory leakage.
5. **GST Split POS Checkout:** Fast checkout screen showing SAC Code 9997, 18% GST (9% CGST + 9% SGST), split payment tender: ₹2,000 via UPI QR + ₹950 via Cash.
6. **Stylist Commission & Z-Report:** Day-end reconciliation showing Rahul's 10% service commission (₹250), salon daily gross sales, and register cash tally.

#### Conversion Bridge
Direct button: "Schedule Salon Software Demo on WhatsApp" linking to `https://wa.me/918423711043` with prefilled message: `"Hello Hanva Team, I tested the Salon Software Explorer on your website and would like to see a demo for my salon."`

---

### C. Hanva Restaurant POS Explorer (`restaurant-pos-explorer.tsx`)

#### Purpose
Simulates high-pressure restaurant rush hour operations, proving station KOT routing, offline network resilience, and recipe costing.

#### State Architecture
- `activeStep` (0 to 5): Controls order progress.
- `isOfflineMode` (boolean): Interactive toggle that cuts simulated internet connectivity and activates the IndexedDB offline queue.
- `activeTable`: Table selection (e.g., Table T-04, 4 Pax).
- `kitchenStatus`: Station prep states (Tandoor, Chinese, Bar).

#### The 6 Simulated Stages
1. **Dine-In Table Layout & QR Ordering:** Visual 12-table layout. Captain opens Table T-04 and inputs 2x Paneer Tikka, 2x Butter Naan, 1x Mocktail.
2. **Station-Routed Thermal KOTs:** Order splits automatically: Paneer Tikka routes to Tandoor Station (KOT #104), Mocktail routes to Bar Station (BOT #42) with duplicate-print prevention.
3. **Live Kitchen Display System (KDS):** Chef's live touchscreen display shows ticket timer (04m 12s, Green status) and bump-bar "Order Ready" action.
4. **Offline Resilience Test:** User clicks "Simulate Wi-Fi Drop". The system displays an amber badge: `OFFLINE QUEUE ACTIVE (IndexedDB)`. User can continue adding orders; upon toggling back online, orders sync automatically without data loss.
5. **India GST & Dynamic UPI QR:** Checkout calculates 5% Restaurant GST (2.5% CGST + 2.5% SGST) and displays a simulated BharatQR code for instant UPI payment.
6. **Recipe BOM Costing:** Back-of-house view showing automatic depletion of 400g Paneer, 100g Butter, and live calculation of food cost percentage (28.4%).

#### Conversion Bridge
Direct button: "Request Restaurant POS Demo on WhatsApp" linking to `https://wa.me/918423711043` with prefilled message: `"Hello Hanva Team, I tested the Restaurant POS Explorer on your website and would like to see a demo for my restaurant/cafe."`

---

## 3. Performance & Accessibility (a11y) Verification

- **Zero Heavy Dependencies:** Built using lightweight React hooks (`useState`, `useEffect`), Tailwind CSS classes, and Lucide SVG icons. Zero third-party canvas or charting libraries loaded in the critical path.
- **Full Keyboard & Screen Reader Accessibility:**
  - Semantic step progression buttons with `aria-pressed`, `aria-label`, and clear focus indicators (`focus:ring-2`).
  - Color-blind safe palette: Status badges combine distinct icons (`CheckCircle`, `Clock`, `AlertTriangle`) alongside color cues.
  - Interactive audio scrub simulation uses native `<input type="range" />` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.
- **Bundle Footprint:** All three interactive components add less than 8 KB of gzipped JavaScript combined.
- **Hydration Safety:** All components utilize `"use client"` directives with client-safe state initializers, ensuring zero hydration mismatches during Next.js static prerendering.
