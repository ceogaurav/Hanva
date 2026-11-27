# HANVA TECHNOLOGIES — LEGAL & PRIVACY READINESS
## Corporate Credentials Discrepancy, Statutory Compliance & DPDP Act Alignment

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 30  
**Status:** BLOCKED BY UNVERIFIED CORPORATE CREDENTIALS  
**Date:** November 2026

---

## 1. Corporate Legal Identity Discrepancy & Audit Finding

During our pre-launch audit of public legal credentials, a historical discrepancy was identified between two sets of corporate identifiers:

### The Two Conflicting Sets:
- **Set A (Appeared in historical documentation reports):**
  - Company: Hanva Technologies Private Limited
  - CIN: `U72900KA2021PTC148882` (Incorporated 2021)
  - GSTIN: `29AAACH7423P1Z6`
  - PAN: `AAACH7423P`
- **Set B (Present in active codebase and live web pages):**
  - Company: Hanva Technologies Private Limited
  - CIN: `U78100KA2025PTC205168` (Incorporated 2025)
  - GSTIN: `29AAICH0526K1ZF`
  - PAN: `AAICH0526K`

### Codebase Locations of Set B:
1. `lib/config.ts` (lines 22–24)
2. `app/company/about/page.tsx` (lines 12, 22, 28, 101)
3. `app/company/privacy-policy/page.tsx` (line 86)
4. `app/company/terms-of-service/page.tsx` (lines 86, 171)
5. `app/locations/bengaluru/page.tsx` (line 43)
6. `components/layout/footer.tsx` (line 388)

### Audit Evaluation & Legal Blocker:
- In strict adherence to our mandate (*"Do not assume either reported set is correct... Do not publish legal information without official company records and owner confirmation"*), **this discrepancy constitutes a CRITICAL LEGAL RELEASE BLOCKER.**
- Publishing inaccurate or conflicting Ministry of Corporate Affairs (MCA) registration numbers or GST identification numbers creates statutory regulatory risk under the Companies Act, 2013 and Central Goods and Services Tax Act, 2017.
- **Mandatory Action:** The company directors must physically inspect the original MCA Certificate of Incorporation and PAN card, and issue written confirmation before live production advertising is initiated.

---

## 2. Statutory Legal Verification Checklist

The following verification steps must be completed by the company director before final go-live:

- [ ] **Step 1: MCA Master Data Verification:** Log into `mca.gov.in` under "View Company Master Data" and search *Hanva Technologies Private Limited*. Confirm whether CIN is `U72900KA2021PTC148882` or `U78100KA2025PTC205168`.
- [ ] **Step 2: Certificate of Incorporation Inspection:** Review official MCA Certificate PDF (`Hanva Technologies Certificate of Incorporation.pdf`) stored in company archives.
- [ ] **Step 3: GST Portal Cross-Check:** Query the GST Search Taxpayer tool (`services.gst.gov.in`) to verify active GSTIN status and registered principal place of business.
- [ ] **Step 4: Director Written Sign-Off:** Execute written authorization confirming the authoritative set of credentials.
- [ ] **Step 5: Codebase Harmonization:** Update `lib/config.ts` and documentation files to ensure 100% uniformity across all 87 routes.

---

## 3. Privacy Policy & DPDP Act 2023 Compliance

### A. Privacy Policy Audit (`/company/privacy-policy/`)
- Fully drafted in accordance with the **Digital Personal Data Protection Act, 2023 (DPDP Act)**.
- Specifies Data Fiduciary identity, purpose limitation, data retention schedules, and grievance officer contact (`gaurav@hanva.in`).
- Discloses that WhatsApp enquiries transfer user-initiated text over Meta's end-to-end encrypted messaging infrastructure.

### B. Cookie Consent & Non-PII Safeguards
- Reusable consent banner implemented via `components/shared/cookie-consent-banner.tsx`.
- Respects user consent choices stored under `hanva_analytics_consent`.
- Strips personal identifiable information (PII) before firing Google Tag Manager or GA4 events.
- **Honeypot Protection:** Lead submission endpoint includes bot prevention fields without tracking intrusive user biometric data.

---

## 4. Terms of Service & Consumer Protection

### Terms of Service Audit (`/company/terms-of-service/`)
- Clearly defines SaaS subscription terms, acceptable use policies, payment obligations, intellectual property rights, and limitation of liability.
- Explicitly states that product enquiries on the website or WhatsApp do not constitute binding commercial software licenses until a formal agreement is executed.
- Jurisdiction specified: Courts of Bengaluru, Karnataka, India.
