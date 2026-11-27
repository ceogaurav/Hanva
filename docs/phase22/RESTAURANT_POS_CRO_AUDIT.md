# RESTAURANT POS CRO AUDIT (`/products/restaurant-pos/`)

**Audited Source:** `app/products/restaurant-pos/page.tsx`  
**Verified Capabilities Reference:** `docs/phase13/PHASE_13_RESTAURANT_POS_FEATURE_AUDIT.md` (`seobanks/POS`)  
**Target Audience:** Dine-in restaurants, cafes, bakeries, QSR counters, food courts, and cloud kitchens.

---

## 1. Conversion & Factual Evaluation

| Section | Current State | CRO Findings & Action Plan |
|---|---|---|
| **Hero & Product Identity (`170-208`)** | Distinct Amber badge, crisp `Hanva Restaurant POS` H1, `"Request Demo on WhatsApp"` (`I'm interested in a demo of Hanva Restaurant POS.`), `"Contact Us for Pricing"` -> `/company/contact/?product=restaurant-pos`. | **CRITICAL Downstream Bug Found:** Same downstream disconnect as Salon—`/company/contact/?product=restaurant-pos` currently lacks Restaurant POS options and defaults to telecom voice scoping; mobile sticky bar drops exact `"I'm interested in a demo of Hanva Restaurant POS."` message! Must be fixed cleanly. |
| **POS, Kitchen & Inventory Storytelling (`281-353`)** | Highlights `DINE_IN / TAKEAWAY / DELIVERY`, IndexedDB offline queue (`hanva_pos_offline`), multi-tender split payments, dynamic NPCI UPI QR, CGST/SGST splits, KDS duplicate-print guard (`409`), floor designer, rotating QR ordering (`/order/[qrToken]`), Captain PWA, Kiosk PWA, FIFO/WAC recipe BOM, PR->PO->GRN procurement, Partner REST API & 22 reports. | Clear and compelling across both dine-in and cloud kitchen formats without fake aggregator badges. |
| **Explicit Boundary Transparency** | Currently exclusions (`no native Swiggy/Zomato connectors`, `split payment only — no 1-order split bill`, `thermal USB/LAN & Windows print-bridge hardware check`, `partial multi-branch RBAC`) are scattered across FAQ / prose or articles. | **Low-Risk CRO Improvement:** Surface a clean **"Verified Capabilities vs Important Scope Clarifications"** box directly on `/products/restaurant-pos/` above FAQs so restaurateurs understand native Partner API vs aggregators and split payment vs split bill upfront. |
