# HANVA TECHNOLOGIES — RESPONSIVE DESIGN GUIDELINES
## Multi-Viewport Layout Adaptation, Touch Ergonomics & Accessibility Rules

**Document ID:** `HANVA-RESPONSIVE-v1.1`  
**Phase:** 1.1 — Cross-Document Audit, Corrections & Governance  
**Date:** November 24, 2026  
**Status:** Approved for Implementation  
**Accessibility Compliance:** WCAG 2.1 AA Certified Standards  

---

## 1. SYNCHRONIZED VIEWPORT TIERS (6 TIERS)

The Hanva web architecture is built on a **mobile-first, content-adaptive fluid grid**. Layouts are strictly verified across six synchronized viewport tiers:

```
+---------------------------------------------------------------------------------------------------------+
| SYNCHRONIZED VIEWPORT SPECIFICATION MATRIX                                                              |
+---------------------+-------------------+---------------------+-----------------------------------------+
| Viewport Tier       | Width Boundary    | Representative Device| Architectural Behavior                  |
+---------------------+-------------------+---------------------+-----------------------------------------+
| 1. Small Mobile     | 360px – 389px     | Galaxy S-Series, SE | Single-column, 16px margins, tight cards|
| 2. Mobile Standard  | 390px – 767px     | iPhone 14/15/16     | Single-column stack, sticky bottom CTA  |
| 3. Tablet           | 768px – 1023px    | iPad Mini / Air     | 2-column grids, mobile drawer toggle    |
| 4. Laptop Standard  | 1024px – 1279px   | MacBook Air 13"     | Desktop mega-menu (2x2 adaptive grid)   |
| 5. Desktop Standard | 1280px – 1439px   | 24" Enterprise iMac | Full 4-column mega-menu, max container  |
| 6. Wide Workstation | 1440px – 1920px+  | 27" 4K Monitor      | Centered 1440px container, wide gutters |
+---------------------+-------------------+---------------------+-----------------------------------------+
```

---

## 2. TOUCH ERGONOMICS & MINIMUM HIT BOUNDARY RULES

### 2.1 The Small-Button Touch Target Conflict Resolution
- **Desktop Fine-Pointer (`@media (pointer: fine)`):** Compact buttons (`.btn-sm`) may render at **36px visual height** for high-density dashboard layouts.
- **Touch Devices (`@media (pointer: coarse)`):** Every interactive control (including `.btn-sm`, checkboxes, icon toggles, and dropdown triggers) is automatically enforced with a **minimum 44 × 44px bounding hit box** using transparent pseudo-elements (`::after` hit-area expansion) or 44px minimum layout constraints:
  ```css
  @media (pointer: coarse) {
    .btn-sm,
    .nav-btn,
    .theme-toggle-btn {
      min-height: 44px;
      min-width: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
  ```

---

## 3. MOBILE STICKY CTA COLLISION MITIGATION

On mobile viewports (`< 768px`), a persistent bottom conversion bar ("Book a Demo / Call Sales") remains pinned to the viewport bottom (`position: fixed; bottom: 0`).

**Anti-Collision Rule:**
To prevent the sticky CTA from obscuring footer links, forms, or submit buttons:
1. The global `body` tag receives an automated bottom padding offset:
   ```css
   @media (max-width: 767px) {
     body {
       padding-bottom: calc(72px + env(safe-area-inset-bottom, 16px));
     }
   }
   ```
2. When interactive modals or mobile navigation drawers open, the sticky CTA is suppressed (`display: none`) to eliminate double-bar touch confusion.

---

## 4. LAPTOP (1024PX–1279PX) MEGA-MENU TRANSITION

To eliminate sudden layout wrapping or text truncation when transitioning between standard desktops (1280px+) and smaller laptops (1024px):
- **1280px+:** The "Products" mega-menu renders as a 4-column wide grid (Telephony, Contact Center, CRM, Featured Spotlight).
- **1024px–1279px:** The mega-menu smoothly adapts into a **2 × 2 balanced grid** with a container max-width of 720px, preventing horizontal scrollbars or screen overflow.
- **Below 1024px:** The mega-menu gracefully collapses into the accessible mobile slide-out drawer.

---

## 5. COMPONENT REFLOW RULES ACROSS BREAKPOINTS

### 5.1 Pricing Tables
- **Desktop (>= 1024px):** 3-column side-by-side comparison table (Starter, Professional, Enterprise).
- **Tablet (768px–1023px):** 2-column grid with Enterprise tier spanning full-width underneath.
- **Mobile (< 768px):** Transformed into a **Segmented Tab Switcher** (`[Starter] | [Professional (Rec)] | [Enterprise]`).

### 5.2 Visual IVR Call Flow
- **Desktop (>= 1024px):** Horizontal left-to-right diagram with connector lines.
- **Mobile (< 1024px):** Reflows automatically into a **Vertical Stepper Timeline** with downward arrow connectors.

### 5.3 Telephony Call Logs
- **Desktop (>= 1024px):** Multi-column tabular data grid.
- **Mobile (< 768px):** Reflows into stacked **Compact Telephony Cards** showing Caller ID, Live Status, Duration, and Play button.

---

## 6. KEYBOARD & SCREEN-READER ACCESSIBILITY (WCAG 2.1 AA)

1. **Mobile Drawer Focus Trap:** When the mobile drawer is opened:
   - Focus is immediately shifted to the close button (`.drawer-close-btn`).
   - Tabbing loops strictly within drawer links.
   - Pressing `Escape` closes the drawer and restores focus to the hamburger button.
   - Background content is marked `aria-hidden="true"`.
2. **Form Error Accessibility:**
   - Invalid fields receive `aria-invalid="true"`.
   - Error messages are associated with inputs via `aria-describedby="[field]-error"`.
   - Focus rings display a high-contrast double outline (`outline: 2px solid #2563EB; outline-offset: 2px;`).
3. **Reduced Motion:** All layout transitions respect `@media (prefers-reduced-motion: reduce)`.
