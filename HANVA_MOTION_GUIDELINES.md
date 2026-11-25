# HANVA TECHNOLOGIES — MOTION & INTERACTION GUIDELINES
## Purposeful Physics-Based Animation, GSAP Recipes & Performance Governance

**Document ID:** `HANVA-MOTION-v1.1`  
**Phase:** 1.1 — Cross-Document Audit, Corrections & Governance  
**Date:** November 24, 2026  
**Status:** Approved for Implementation  
**Methodology Heritage:** `design-motion-principles` (Emil Kowalski, Jakub Krehel, Jhey Tompkins) & `transitions.dev`  

---

## 1. MOTION PHILOSOPHY & PERFORMANCE GOVERNANCE

Motion at Hanva is an **ergonomic communication tool**, never a decorative gimmick. It adheres to three unbreakable laws:

1. **Law of Non-Interference:** Motion must never block a user from reading content, clicking a button, or submitting a form.
2. **Law of Spatial Continuity:** UI elements enter from where they logically exist and transition smoothly to their new state (e.g. accordion expansions scale naturally from their header).
3. **Law of Zero Gratuitous Lag:** Preloaders, floating particle orbits, and endless pulsing backgrounds are prohibited. Micro-interactions must feel instantaneous (sub-200ms).

---

## 2. TIMING SCALES & EASING CURVES

```css
:root {
  /* Durations */
  --duration-instant: 100ms; /* Button presses, checkbox ticks */
  --duration-fast:    180ms; /* Tooltips, hover state shifts, pill toggles */
  --duration-normal:  280ms; /* Dropdown reveals, drawer slide-outs */
  --duration-slow:    450ms; /* Complex layout transitions, modal reveals */

  /* Easing Curves (Physics-Based) */
  --ease-snappy: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-fluid: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 3. PURPOSEFUL GSAP ANIMATION RECIPES

For pages leveraging GreenSock (GSAP), the following recipes provide tested, hardware-accelerated animations:

### 3.1 Hero Staggered Reveal (`heroStagger`)
Executed once on initial page load with zero render-blocking delay:
```javascript
// GSAP Hero Entrance Recipe
gsap.from('.hero-badge, .hero-title, .hero-desc, .hero-cta-group', {
  y: 18,
  opacity: 0,
  duration: 0.6,
  stagger: 0.08,
  ease: 'power3.out',
  clearProps: 'all' // Eliminates residual transform styles
});
```

### 3.2 Visual IVR Call Routing Pulse (`ivrPulseRoute`)
Demonstrates call packet transmission along an SVG connector:
```javascript
// Animates SVG stroke-dashoffset along the connector path
gsap.to('.ivr-connector-active', {
  strokeDashoffset: -40,
  duration: 1.2,
  repeat: -1,
  ease: 'none'
});
```

### 3.3 Interactive Pricing Calculator Reaction (`priceSlidePhysics`)
When the user drags the agent seat slider, the monthly cost figure animates smoothly using a numeric rolling transition:
```javascript
// Smooth Numerical Interpolation
gsap.to(pricingState, {
  displayedTotal: calculatedTotal,
  duration: 0.35,
  ease: 'power2.out',
  onUpdate: () => {
    priceDisplayElement.textContent = '₹' + Math.round(pricingState.displayedTotal).toLocaleString('en-IN');
  }
});
```

---

## 4. REDUCED-MOTION ACCESSIBILITY (`prefers-reduced-motion`)

For users with vestibular disorders or operating system motion reduction enabled, animations are disabled or simplified to clean opacity dissolves:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .fade-in-element {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## 5. PERFORMANCE & HARDWARE CONSTRAINTS

1. **Hardware Acceleration:** Animations are restricted strictly to `transform` and `opacity`. Animating `width`, `height`, `top`, or `padding` is prohibited as it causes browser layout recalculation and dropped frames.
2. **Mobile Throttling:** On low-power mobile viewports (`<= 480px`), looping SVG connector animations are paused automatically to conserve battery life and GPU cycles.
3. **Paint Containment:** Animated containers use `will-change: transform, opacity;` and `contain: paint layout;` to isolate repaint areas from the rest of the DOM.
4. **Third-Party Script Overhead:** GSAP core is loaded conditionally via dynamic import only on pages featuring the interactive call flow simulator or pricing calculator, preventing unnecessary script execution on static content pages.
