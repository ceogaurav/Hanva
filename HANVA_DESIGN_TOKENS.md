# HANVA TECHNOLOGIES — DESIGN TOKENS SYSTEM
## Production-Grade Multi-Theme Design Tokens & CSS Architecture

**Document ID:** `HANVA-TOKENS-v1.1`  
**Phase:** 1.1 — Cross-Document Audit, Corrections & Governance  
**Date:** November 24, 2026  
**Status:** Approved for Implementation  
**Single Source of Truth:** Core Token Registry for Web, Dashboard & Mobile UI  

---

## 1. DESIGN TOKEN ARCHITECTURE

The Hanva design token system is structured in three modular layers:
1. **Primitive Tokens:** Raw, invariant values (color hex codes, absolute pixel values, font families).
2. **Semantic Tokens:** Context-aware design variables (e.g., `color-bg-canvas`, `color-text-primary`, `color-border-subtle`).
3. **Component Tokens:** Scoped parameters for specific UI elements (e.g., `btn-primary-bg`, `table-row-hover`, `ivr-node-active-border`).

This architecture allows instant, flicker-free switching between the primary **Enterprise Light Mode** and the complementary **Cockpit Dark Mode** via standard CSS Custom Properties.

---

## 2. COLOR TOKEN SYSTEM

### 2.1 Primitive Color Palettes

#### Slate (Neutral Foundation)
```css
--slate-50:  #f8fafc;
--slate-100: #f1f5f9;
--slate-200: #e2e8f0;
--slate-300: #cbd5e1;
--slate-400: #94a3b8;
--slate-500: #64748b;
--slate-600: #475569;
--slate-700: #334155;
--slate-800: #1e293b;
--slate-900: #0f172a; /* Hanva Primary Navy */
--slate-950: #020617;
```

#### Blue (Signal & Action Foundation)
```css
--blue-50:  #eff6ff;
--blue-100: #dbeafe;
--blue-200: #bfdbfe;
--blue-300: #93c5fd;
--blue-400: #60a5fa;
--blue-500: #3b82f6; /* Hanva Secondary Horizon Blue */
--blue-600: #2563eb; /* Hanva Primary Signal Blue */
--blue-700: #1d4ed8;
--blue-800: #1e40af;
--blue-900: #1e3a8a;
--blue-950: #172554;
```

#### Emerald (Operational Success & Live State)
```css
--emerald-50:  #ecfdf5;
--emerald-100: #d1fae5;
--emerald-500: #10b981;
--emerald-600: #059669; /* Hanva Live Telephony Emerald */
--emerald-700: #047857;
```

#### Amber (Hold, Queue & Warning State)
```css
--amber-50:  #fffbeb;
--amber-100: #fef3c7;
--amber-500: #f59e0b;
--amber-600: #d97706; /* Hanva Warning Amber */
```

#### Rose (Dropped Call & Critical State)
```css
--rose-50:  #fff1f2;
--rose-100: #ffe4e6;
--rose-500: #f43f5e;
--rose-600: #e11d48; /* Hanva Critical Rose */
```

---

### 2.2 Semantic Color Mapping (CSS Custom Properties)

```css
/* ==========================================================================
   HANVA ENTERPRISE LIGHT THEME (DEFAULT PUBLIC CANVAS)
   ========================================================================== */
:root {
  /* Surfaces & Backgrounds */
  --color-canvas:            #ffffff;
  --color-surface-subtle:     #f8fafc; /* Slate 50 */
  --color-surface-raised:     #ffffff;
  --color-surface-overlay:    #ffffff;
  --color-surface-hover:      #f1f5f9; /* Slate 100 */
  --color-surface-active:     #e2e8f0; /* Slate 200 */

  /* Typography */
  --color-text-primary:       #0f172a; /* Slate 900 (High-Contrast Header/Body) */
  --color-text-secondary:     #475569; /* Slate 600 (Subtitles, Meta) */
  --color-text-muted:         #64748b; /* Slate 500 (Captions, Footers) */
  --color-text-subtle:        #94a3b8; /* Slate 400 (Placeholders) */
  --color-text-inverse:       #ffffff;

  /* Brand Accents & Interactive */
  --color-brand-primary:      #2563eb; /* Primary Signal Blue */
  --color-brand-hover:        #1d4ed8;
  --color-brand-active:       #1e40af;
  --color-brand-subtle:       #eff6ff; /* Blue 50 */
  --color-brand-border:       #bfdbfe; /* Blue 200 */

  /* Structural Borders */
  --color-border-subtle:      #f1f5f9; /* Slate 100 */
  --color-border-default:     #e2e8f0; /* Slate 200 (Standard Card/Input Border) */
  --color-border-strong:      #cbd5e1; /* Slate 300 */
  --color-border-focus:       #2563eb;

  /* Status Colors */
  --color-status-live-bg:     #ecfdf5;
  --color-status-live-text:   #047857;
  --color-status-live-dot:    #10b981;

  --color-status-warn-bg:     #fffbeb;
  --color-status-warn-text:   #b45309;
  --color-status-warn-dot:    #f59e0b;

  --color-status-error-bg:    #fff1f2;
  --color-status-error-text:  #be123c;
  --color-status-error-dot:   #f43f5e;

  /* Elevation Shadows */
  --shadow-sm:  0 1px 2px 0 rgba(15, 23, 42, 0.05);
  --shadow-md:  0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04);
  --shadow-lg:  0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03);
  --shadow-xl:  0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03);
  --shadow-popover: 0 25px 50px -12px rgba(15, 23, 42, 0.18);
  --shadow-focus: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

/* ==========================================================================
   HANVA COCKPIT DARK THEME (AGENT WORKSTATION & TERMINAL EXPERIENCE)
   ========================================================================== */
[data-theme="dark"] {
  /* Surfaces & Backgrounds */
  --color-canvas:            #0b0f19; /* Pure Obsidian Slate */
  --color-surface-subtle:     #0f172a; /* Slate 900 */
  --color-surface-raised:     #131c31;
  --color-surface-overlay:    #18233c;
  --color-surface-hover:      #1e293b;
  --color-surface-active:     #334155;

  /* Typography */
  --color-text-primary:       #f8fafc; /* Slate 50 */
  --color-text-secondary:     #cbd5e1; /* Slate 300 */
  --color-text-muted:         #94a3b8; /* Slate 400 */
  --color-text-subtle:        #64748b; /* Slate 500 */
  --color-text-inverse:       #0f172a;

  /* Brand Accents & Interactive */
  --color-brand-primary:      #3b82f6; /* Blue 500 */
  --color-brand-hover:        #60a5fa;
  --color-brand-active:       #93c5fd;
  --color-brand-subtle:       rgba(37, 99, 235, 0.12);
  --color-brand-border:       rgba(59, 130, 246, 0.3);

  /* Structural Borders */
  --color-border-subtle:      rgba(255, 255, 255, 0.05);
  --color-border-default:     rgba(255, 255, 255, 0.10);
  --color-border-strong:      rgba(255, 255, 255, 0.18);
  --color-border-focus:       #3b82f6;

  /* Status Colors */
  --color-status-live-bg:     rgba(16, 185, 129, 0.12);
  --color-status-live-text:   #34d399;
  --color-status-live-dot:    #10b981;

  --color-status-warn-bg:     rgba(245, 158, 11, 0.12);
  --color-status-warn-text:   #fbbf24;
  --color-status-warn-dot:    #f59e0b;

  --color-status-error-bg:    rgba(244, 63, 94, 0.12);
  --color-status-error-text:  #fb7185;
  --color-status-error-dot:   #f43f5e;

  /* Elevation Shadows */
  --shadow-sm:  0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.4);
  --shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.4);
  --shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
  --shadow-popover: 0 25px 50px -12px rgba(0, 0, 0, 0.85);
  --shadow-focus: 0 0 0 3px rgba(59, 130, 246, 0.35);
}
```

---

## 3. TYPOGRAPHY SYSTEM

### 3.1 Font Families
```css
:root {
  --font-heading:   'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-body:      'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono:      'Geist Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}
```

### 3.2 Fluid Typography Scale
```css
:root {
  /* Display Headings */
  --text-display-1: clamp(2.5rem, 5vw + 1rem, 4.25rem); /* 40px -> 68px */
  --line-display-1: 1.08;
  --tracking-display-1: -0.035em;
  --weight-display-1: 800;

  --text-display-2: clamp(2rem, 3.5vw + 1rem, 3.25rem); /* 32px -> 52px */
  --line-display-2: 1.12;
  --tracking-display-2: -0.03em;
  --weight-display-2: 700;

  /* Standard Headings */
  --text-h1: clamp(1.75rem, 2.5vw + 0.75rem, 2.5rem); /* 28px -> 40px */
  --line-h1: 1.18;
  --tracking-h1: -0.025em;
  --weight-h1: 700;

  --text-h2: clamp(1.375rem, 1.8vw + 0.6rem, 1.875rem); /* 22px -> 30px */
  --line-h2: 1.25;
  --tracking-h2: -0.02em;
  --weight-h2: 700;

  --text-h3: clamp(1.125rem, 1.2vw + 0.5rem, 1.375rem); /* 18px -> 22px */
  --line-h3: 1.35;
  --tracking-h3: -0.015em;
  --weight-h3: 600;

  --text-h4: 1.125rem; /* 18px */
  --line-h4: 1.4;
  --tracking-h4: -0.01em;
  --weight-h4: 600;

  /* Body Copy */
  --text-body-lg: 1.125rem; /* 18px */
  --line-body-lg: 1.6;

  --text-body-md: 1rem; /* 16px (Base) */
  --line-body-md: 1.55;

  --text-body-sm: 0.875rem; /* 14px */
  --line-body-sm: 1.5;

  --text-body-xs: 0.75rem; /* 12px (Microcopy / Tags) */
  --line-body-xs: 1.4;
  --tracking-body-xs: 0.02em;

  /* Monospace Telephony & Metrics */
  --text-mono-md: 0.9375rem; /* 15px */
  --text-mono-sm: 0.8125rem; /* 13px */
  --line-mono: 1.45;
}
```

---

## 4. SPACING ARCHITECTURE: 4PX MICRO-SPACING & 8PX MAJOR GRID

The spatial rhythm combines a **4px micro-spacing scale** for fine component padding with an **8px major layout grid**:

```css
:root {
  /* 4px Micro-Steps (Fine component padding, icons, borders) */
  --space-0-5: 0.125rem; /* 2px */
  --space-1:   0.25rem;  /* 4px */
  --space-1-5: 0.375rem; /* 6px */
  --space-2:   0.5rem;   /* 8px (Grid Baseline) */
  --space-2-5: 0.625rem; /* 10px */
  --space-3:   0.75rem;  /* 12px */

  /* 8px Major Layout Steps (Margins, card gutters, section rhythms) */
  --space-4:   1rem;     /* 16px */
  --space-5:   1.25rem;  /* 20px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-10:  2.5rem;   /* 40px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-20:  5rem;     /* 80px */
  --space-24:  6rem;     /* 96px */
  --space-32:  8rem;     /* 128px */
}
```

### Layout Max-Width Containers
```css
:root {
  --container-sm:   640px;
  --container-md:   768px;
  --container-lg:   1024px;
  --container-xl:   1280px;
  --container-2xl:  1440px; /* Primary Hanva Grid Container */
}
```

---

## 5. BORDER RADII, ELEVATIONS & Z-INDEX

```css
:root {
  /* Radii */
  --radius-none: 0px;
  --radius-sm:   4px;   /* Micro buttons, tags, chips */
  --radius-md:   8px;   /* Standard inputs, small cards */
  --radius-lg:   12px;  /* Standard content cards, modals */
  --radius-xl:   16px;  /* Feature showcase cards */
  --radius-2xl:  24px;  /* Hero containers, callouts */
  --radius-full: 9999px;/* Status pills, avatar circles */

  /* Z-Index Hierarchy */
  --z-base:       0;
  --z-card-hover: 10;
  --z-sticky-nav: 100;
  --z-dropdown:   200;
  --z-drawer:     500;
  --z-modal-back: 900;
  --z-modal:      1000;
  --z-toast:      1100;
  --z-tooltip:    1200;
}
```

---

## 6. SYNCHRONIZED RESPONSIVE BREAKPOINTS

Synchronized across all responsive guidelines, tokens, and CSS media queries:

```css
/* Standard Breakpoints (Mobile-First System) */
--bp-sm-mobile: 360px;  /* Small Mobile Devices */
--bp-mobile:    390px;  /* Standard Mobile Viewports */
--bp-tablet:    768px;  /* Tablet Landscape & iPad Portrait */
--bp-laptop:    1024px; /* Standard Laptops & Small Desktops */
--bp-desktop:   1280px; /* Standard Enterprise Desktop */
--bp-wide:      1440px; /* Wide Desktop Workstations */
--bp-ultra:     1920px; /* 4K & Ultra-Wide Monitors */
```

---

## 7. TAILWIND CSS V3 & V4 CONFIGURATION COMPATIBILITY

### Tailwind CSS v3 Compatibility (`tailwind.config.js`)
```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      'sm-mob': '360px',
      'mob': '390px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        hanva: {
          navy: '#0F172A',
          blue: '#2563EB',
          'blue-horizon': '#3B82F6',
          canvas: 'var(--color-canvas)',
          surface: 'var(--color-surface-subtle)',
          'surface-raised': 'var(--color-surface-raised)',
          border: 'var(--color-border-default)',
          'text-primary': 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-muted': 'var(--color-text-muted)',
          emerald: '#16A34A',
          amber: '#D97706',
          rose: '#E11D48',
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        'hanva-sm': 'var(--shadow-sm)',
        'hanva-md': 'var(--shadow-md)',
        'hanva-lg': 'var(--shadow-lg)',
        'hanva-xl': 'var(--shadow-xl)',
        'hanva-popover': 'var(--shadow-popover)',
      }
    }
  }
}
```

### Tailwind CSS v4 Theme CSS Block (`app.css`)
```css
@theme {
  --color-hanva-navy: #0F172A;
  --color-hanva-blue: #2563EB;
  --color-hanva-blue-horizon: #3B82F6;
  --color-hanva-emerald: #16A34A;
  --color-hanva-amber: #D97706;
  --color-hanva-rose: #E11D48;
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'Geist Mono', monospace;
  --breakpoint-sm-mob: 360px;
  --breakpoint-mob: 390px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1440px;
}
```
