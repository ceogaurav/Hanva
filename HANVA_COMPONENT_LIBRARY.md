# HANVA TECHNOLOGIES — COMPONENT LIBRARY SPECIFICATION
## Production-Grade UI Components & Enterprise Product Elements

**Document ID:** `HANVA-COMPONENTS-v1.1`  
**Phase:** 1.1 — Cross-Document Audit, Corrections & Governance  
**Date:** November 24, 2026  
**Status:** Approved for Component Engineering  
**Accessibility Standard:** WCAG 2.1 AA Compliant  

---

## 1. COMPONENT ARCHITECTURE & DESIGN SYSTEM TOKENS

All components are strictly built using the **Hanva Design Tokens** (`HANVA_DESIGN_TOKENS.md`). Components are designed to be framework-agnostic (functional in standard HTML/CSS, React, Vue, or Svelte) and comply with **WCAG 2.1 AA** accessibility standards.

---

## 2. ATOMIC CONTROLS & FORM ELEMENTS

### 2.1 Buttons (`.btn`)
Buttons support 5 visual variants, 3 size scales, and 4 operational states.

```
+----------------------------------------------------------------------------------------------------+
| BUTTON VARIANTS & SPECIFICATIONS                                                                   |
+-------------------+----------------------------+-----------------------------+---------------------+
| Variant           | Default Background / Border| Text Color                  | Hover State         |
+-------------------+----------------------------+-----------------------------+---------------------+
| `.btn-primary`    | #2563EB (Signal Blue)      | #FFFFFF                     | #1D4ED8 (Darkens 8%)|
| `.btn-secondary`  | #0F172A (Primary Navy)     | #FFFFFF                     | #1E293B             |
| `.btn-outline`    | Transparent / #E2E8F0      | #0F172A (Slate 900)         | #F8FAFC / #CBD5E1   |
| `.btn-ghost`      | Transparent / None         | #2563EB (Signal Blue)       | #EFF6FF (Blue 50)   |
| `.btn-destructive`| #E11D48 (Critical Rose)    | #FFFFFF                     | #BE123C             |
+-------------------+----------------------------+-----------------------------+---------------------+
```

#### Size Scale & Touch Boundary Rule
- **Small (`.btn-sm`):** Height 36px on desktop (fine-pointer); padded to a minimum **44 × 44px bounding hit target** on touch devices (`@media (pointer: coarse)`).
- **Medium (`.btn-md` - Default):** Height 44px | Padding: `0 18px` | Font size: 14px | Font weight: 600.
- **Large (`.btn-lg`):** Height 52px | Padding: `0 24px` | Font size: 16px | Font weight: 600.

#### Interactive States
- **Focus Ring:** `outline: none; box-shadow: var(--shadow-focus);` (Double-ring offset 2px).
- **Loading State (`.btn-loading`):** Text hidden; centered 16px SVG spinner with `aria-busy="true"` and `pointer-events: none`.
- **Disabled State (`[disabled]`):** `opacity: 0.55; cursor: not-allowed; filter: grayscale(20%); aria-disabled="true"`.

---

### 2.2 Form Controls (`.form-group`, `.input-field`)
- **Base Input Height:** 44px.
- **Border:** `1px solid var(--color-border-default)` (`#E2E8F0` in light; `rgba(255,255,255,0.1)` in dark).
- **Background:** `var(--color-surface-raised)` with subtle inset shadow.
- **Label:** `display: block; font-size: 13px; font-weight: 600; color: var(--color-text-primary); margin-bottom: 6px;`.
- **Error Identification:** When invalid, input receives `aria-invalid="true"` and `aria-describedby="[id]-error"`. Error text renders in `#E11D48` with SVG alert icon.

---

## 3. BADGES, CHIPS & TELEPHONY STATUS PILLS

Badges provide instantaneous visual status for live telecommunications channels, routes, and regulatory compliance.

```
+---------------------------------------------------------------------------------------------------------+
| TELEPHONY STATUS PILLS & BADGES                                                                         |
+----------------------+----------------------------+----------------------------+------------------------+
| Status Type          | Pill Class                 | Background / Border        | Typography / Icon      |
+----------------------+----------------------------+----------------------------+------------------------+
| Live Line Active     | `.status-pill.live`        | #ECFDF5 / #A7F3D0          | #047857 (Green dot ●)  |
| Call In-Queue / Hold | `.status-pill.queued`      | #FFFBEB / #FDE68A          | #B45309 (Amber dot ●)  |
| Call Dropped / Error | `.status-pill.error`       | #FFF1F2 / #FECDD3          | #BE123C (Rose dot ●)   |
| DLT Aligned Workflow | `.badge-compliance`        | #EFF6FF / #BFDBFE          | #1D4ED8 (Shield Icon 🛡)|
| Recommended Plan Tier| `.badge-recommended`       | #2563EB / #2563EB          | #FFFFFF (Bold Caps)    |
+----------------------+----------------------+----------------------------+------------------------+
```

---

## 4. SIGNATURE PRODUCT EXPERIENCE COMPONENTS

*Note: All interactive product representations are engineered as illustrative prototypes. Unimplemented backend endpoints are clearly labeled.*

### 4.1 Component A: Visual IVR Flow Node (`.ivr-node`)
An interactive node representing an operational step in a business call routing tree:

```
+-------------------------------------------------------------+
| [.ivr-node-header]                                          |
| ⚡ TRIGGER: Inbound Call to +91 800 123 4567                 |
+-------------------------------------------------------------+
| [.ivr-node-body]                                            |
| 🔊 Audio Prompt: "Welcome to Hanva. Press 1 for Sales..."   |
|                                                             |
| Menu Branches:                                              |
| ├── [Key 1] -> Route to Sales Ring Group (3 Agents)         |
| ├── [Key 2] -> Route to Support Queue (Music on Hold)       |
| └── [Key 9] -> Language Selection (Hindi / English)        |
+-------------------------------------------------------------+
| [.ivr-node-footer]                                          |
| Fallback: If no answer after 20s -> Trigger WhatsApp Drip   |
+-------------------------------------------------------------+
```
- **Component States:**
  - *Idle:* Default border `#E2E8F0`, subtle shadow.
  - *Hovered:* Border darkens to `#CBD5E1`.
  - *Active / Simulating:* Border highlights in Signal Blue (`#2563EB`) with a subtle pulse.
  - *Loading:* Skeleton pulse across node text blocks.
  - *Error:* Red alert border with message: "Invalid DTMF key assignment".
- **User Interactions:** Clicking menu branches triggers sound prompt preview or switches target ring groups.
- **Mobile Reflow:** Reflows from horizontal flow to a vertical stepper timeline on viewports `< 768px`.
- **Accessibility:** `role="region"`, `aria-label="IVR Node: Inbound Call Trigger"`, keyboard operable via `Tab` and `Enter`.

---

### 4.2 Component B: Telephony Call Log Row (`.call-log-row`)
Renders an active or historical call item in the Hanva Call Center dashboard:

```
+---------------------------------------------------------------------------------------------------------+
| [● Inbound]  +91 98450 12345  →  Agent: Priya S.  |  03:42  |  [▶ Play Rec]  |  [✓ Qualified Lead]     |
+---------------------------------------------------------------------------------------------------------+
```
- **Component States:**
  - *Connected / In-Progress:* Green pulsing dot, running timer in monospace.
  - *Completed:* Static status dot, audio recording player enabled.
  - *Failed / Missed:* Rose status dot, disposition tag: "Missed Call".
  - *Loading:* Shimmer skeleton row while fetching Call Detail Records (CDR).
  - *Empty State:* "No call records logged for this filter. Outbound and inbound calls will populate here automatically."
- **Data Formatting:** Phone numbers strictly formatted in standard E.164 (`+91 98450 12345`), timestamps in `YYYY-MM-DD HH:mm:ss`.
- **Accessibility:** `role="row"`, screen reader announces: "Call from +91 98450 12345, Duration 3 minutes 42 seconds, Disposition: Qualified Lead".

---

### 4.3 Component C: Telecalling CRM Deal Card (`.crm-deal-card`)
A deal card embedded within a Kanban stage column:

```
+---------------------------------------------------------+
| [.deal-card]                                            |
| Prestige Estates — 24-Agent Outbound Setup              |
| Proposed Pipeline Value: ₹1,20,000 / year               |
|                                                         |
| Contact: Lead Representative (VP Sales)                 |
| Last Activity: Inbound IVR Call Completed               |
| Next Task: Schedule Architectural Review                |
|                                                         |
| [📞 Click-to-Call]    [💬 WhatsApp]     [📄 View Deal]  |
+---------------------------------------------------------+
```
- **Component States:**
  - *Default:* White surface card with 1px slate border.
  - *Hovered:* 2px lift with `box-shadow: var(--shadow-md)`.
  - *Dragging:* Opacity `0.75`, elevated shadow `var(--shadow-xl)`.
  - *Empty Pipeline State:* "No active leads in this stage. Drag deals here or ingest leads via API."
- **No Fictional Testimonials:** Contact details use generalized illustrative enterprise names (e.g. "Lead Representative") rather than fake identities.
- **Accessibility:** Draggable with keyboard alternatives (`Space` to lift, `Arrow Keys` to move between columns, `Enter` to drop).

---

### 4.4 Component D: Interactive Pricing Calculator Widget (`.pricing-calculator`)
An interactive calculator estimating monthly and annual costs:
- **Slider 1 (Seats):** 1 to 50 Telecaller seats.
- **Slider 2 (Numbers):** 1 to 10 Virtual or Toll-Free Numbers.
- **Slider 3 (Minutes):** 500 to 15,000 outbound minutes per month.
- **Granular Breakdown:**
  - Base monthly subscription (proposed rates).
  - Virtual number rentals shown as a distinct line item.
  - Outbound calling usage calculated with standard 30-second pulse rounding.
  - Inbound forwarded call leg costs explicitly identified.
  - Statutory 18% GST line item calculated transparently.
  - **Disclaimer:** *"All figures are proposed estimates subject to final commercial contract and management sign-off."*
- **Component States:**
  - *Calculating:* Live numerical interpolation via smooth easing.
  - *Error State:* Triggered if inputs exceed boundary values: "For deployments exceeding 50 agents or 15,000 minutes, contact enterprise sales for volume quotes."
- **Accessibility:** Sliders feature `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and keyboard arrow adjustments.

---

## 5. MODALS, DRAWERS & ACCORDIONS

### 5.1 Consultation & Demo Booking Modal (`.modal-container`)
- **Overlay:** `background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px);`.
- **Keyboard Handling:** Traps focus inside modal; closes on `Escape` key; clicking backdrop closes modal.
- **Form Progression:**
  - Step 1: Solution categories required (Checkboxes: Cloud Telephony, Smart IVR, Auto Dialer, CRM).
  - Step 2: Contact Information (Name, Work Email, Phone Number, Company).
  - Step 3: Team Scale & Call Volume Selection.

### 5.2 Accordion / FAQ Item (`.faq-accordion`)
- Expandable container with chevron indicator.
- Fully accessible via keyboard (`Enter` / `Space` toggles; `aria-expanded="true/false"`).
- Smooth CSS grid height transition (`grid-template-rows: 0fr -> 1fr`).
- **SEO Policy:** Maintained for user experience and GEO citations; not reliant on Google SERP rich snippet guarantees.
