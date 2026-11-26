# HANVA Technologies — Enterprise Cloud Telephony & Built-in CRM

Official production web application for **HANVA Technologies Private Limited** (`https://hanva.in`).

Hanva unifies enterprise cloud telephony, smart multi-level IVR, progressive sales dialers, and sales telecalling CRM into one integrated platform. Delivered via dedicated carrier trunking with transparent 15-second pulse billing.

---

## 1. Technology Stack

- **Framework:** [Next.js 14.2](https://nextjs.org/) (App Router, Pure Static Prerendering)
- **Library:** [React 18.3](https://react.dev/)
- **Language:** [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/) (v12+)
- **Testing & Verification:** [Playwright](https://playwright.dev/) & [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/)

---

## 2. Architecture & Route Structure

The application features 33 fully verified canonical routes prerendered statically:

- **Core:** `/` (Homepage)
- **Products Suite (`/products/*`):**
  - `/products/` (Products Overview)
  - `/products/auto-dialer/` (Progressive Auto-Dialer)
  - `/products/predictive-dialer/` (Predictive Dialer)
  - `/products/cloud-telephony/` (Cloud Telephony Architecture)
  - `/products/smart-ivr/` (Intelligent Multi-Level IVR)
  - `/products/ivr-system/` (IVR System Software)
  - `/products/call-center-software/` (Cloud Contact Center)
  - `/products/crm/` (Telecalling CRM)
  - `/products/telecalling-crm/` (Telecaller Management CRM)
  - `/products/virtual-numbers/` (Virtual Business Numbers)
  - `/products/toll-free-numbers/` (1800 Toll-Free Numbers)
  - `/products/whatsapp-crm/` (WhatsApp Business CRM)
- **Solutions (`/solutions/*`):**
  - `/solutions/` (Solutions Overview)
  - `/solutions/sales-automation/` (Outbound Sales Acceleration)
  - `/solutions/customer-support/` (Inbound Support Operations)
  - `/solutions/enterprise/` (Enterprise Dedicated Infrastructure)
- **Industry Verticals (`/industry/*`):**
  - `/industry/` (Industry Overview)
  - `/industry/real-estate/` (Real Estate Telephony)
  - `/industry/healthcare/` (Healthcare & Clinic Calling)
  - `/industry/education/` (Education & Admissions Telephony)
- **Transparent Pricing (`/pricing/*`):**
  - `/pricing/` (Pricing Plans & Pulse Model)
  - `/pricing/calculator/` (Interactive 15s Pulse Cost Calculator)
- **Technical Comparisons (`/compare/*`):**
  - `/compare/exotel-alternative/` (Exotel Technical Comparison)
  - `/compare/knowlarity-alternative/` (Knowlarity Technical Comparison)
  - `/compare/telecmi-alternative/` (TeleCMI Technical Comparison)
- **Company & Governance (`/company/*`):**
  - `/company/about/` (About Hanva Technologies)
  - `/company/careers/` (Careers & Openings)
  - `/company/contact/` (Sales & Engineering Desk)
  - `/company/security-and-trust/` (Security, Compliance & Data Governance)
  - `/company/privacy-policy/` (Privacy Policy)
  - `/company/terms-of-service/` (Terms of Service)
- **Resources (`/resources/*`):**
  - `/resources/dlt-compliance-guide/` (DLT Registration & TRAI Compliance Guide 2026)

---

## 3. Getting Started

### Prerequisites
- Node.js `v20+` or `v22 LTS`
- `pnpm` (`npm install -g pnpm`)

### Installation
```bash
# Clone the repository
git clone https://github.com/ceogaurav/Hanva.git
cd Hanva

# Install dependencies strictly from lockfile
pnpm install --frozen-lockfile
```

### Local Development
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 4. Production Build & Validation

The application builds cleanly into 41 prerendered static pages with 0 SSR dependencies:

```bash
# Production build
pnpm build

# Start local production preview
pnpm start -p 3000
```

### Verification Checks
- **TypeScript:** Validated with zero compilation errors (`tsconfig.json`).
- **Core Web Vitals:** 100/100 Lighthouse Performance, LCP < 900ms, CLS 0.0000, TBT 0ms.
- **Responsive Stability:** 100% verified across 10 physical device viewports (320px to 1440px) with 0px horizontal overflow.
- **Structured Data:** 33/33 routes render valid Schema.org JSON-LD structured data.

---

## 5. Deployment Guide

### Recommended Platforms
- **Vercel / AWS Amplify Gen 2:** Connect this repository directly for turnkey edge deployment. Next.js App Router, `headers()`, and permanent `redirects()` are natively handled at the edge.
- **Containerized Node.js (Cloud Run / AWS ECS / Docker):** Build with standard Node.js 22 LTS container and execute `pnpm build && pnpm start`.

---

## 6. Corporate Identity & Legal Disclosures

- **Legal Entity:** HANVA Technologies Private Limited
- **Corporate Identification Number (CIN):** `U78100KA2025PTC205168`
- **GSTIN:** `29AAICH0526K1ZF`
- **Registered Office (RoC):** No 10/35, Muniyappa Layout Papannareddy, Bommanahalli, Bengaluru, Karnataka 560068, India
- **Operational Office:** Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya, Bengaluru, Karnataka 560068, India
- **Customer Care & Sales Desk:** `+91 8423711043` | `info@hanva.in`
- **Canonical Website:** [https://hanva.in](https://hanva.in)

---

## 7. License

Proprietary © 2026 HANVA Technologies Private Limited. All rights reserved.
