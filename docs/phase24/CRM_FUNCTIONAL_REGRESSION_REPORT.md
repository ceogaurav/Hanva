# CRM FUNCTIONAL REGRESSION REPORT

**Runtime Verified:** Next.js `15.5.29` (`next start` production server), React `19.3.1`, Node `v22.23.4`  
**Evidence File:** [phase24_functional_regression.json](./evidence/phase24_functional_regression.json)

---

## 1. Automated Functional & SSR Verification (`6 / 6 PASS`)

| ID | Workflow Domain Tested | Executed Verification | Result & Honest Observations |
| --- | --- | --- | --- |
| `T-FUNC-1` | **SSR, Auth Edge & Async Dynamic Routes** | `GET /auth/login`, `GET /pay/[tenantId]`, `GET /kyc-upload/[token]?req=pan,aadhaar`, `GET /admin/leads` | **PASS** (`login=200, pay=200, kyc=200 ("Secure KYC Upload"), admin guard=307->/auth/login`); validates Next 15 `await params` & `await searchParams` in Server Components |
| `T-FUNC-2` | **Lead Assignment, XLSX & Company Search** | `POST /api/admin/leads/bulk-assign` (same-tenant), `ExcelJS` XLSX write (`uuid >= 11.1.1`), `GET /api/companies/search?q=tata` | **PASS** (`bulk=200`, XLSX binary `6407` bytes, `compSearch=200`). *Honest note:* `services/company-eligibility/data/companies.db` is a missing external symlink (`/Users/apple/Downloads/test/...`), so fallback degrades gracefully returning `total_matches: 0` |
| `T-FUNC-3` | **User Management Dynamic `[id]` Route** | `PATCH /api/admin/users/${EMP_A}` updating `full_name`, `role: "team_leader"`, `allow_wfh` | **PASS** (`patchStatus=200`); verifies `await props.params` in Next 15 App Router API handler |
| `T-FUNC-4` | **Telecalling, Reports, Ops Snapshot & Watchdog** | `POST /api/mobile/login` -> `POST /api/telecaller/sim-calls` (x2 dedupe), `POST /api/click-to-call`, `GET /api/admin/reports/calls`, `GET /api/admin/operations/snapshot`, `GET /api/admin/campaign-health-watchdog` | **PASS** (`mob=200, simDup=true, c2c=200, rep=200, snap=200, wdUnconfigured=500`). *Honest note:* Watchdog requires live Ozonetel portal credentials and fails closed (`500`) without them |
| `T-FUNC-5` | **Broadcast, Signed Webhook & Maintenance** | `POST /api/admin/broadcast` (same tenant), `POST /api/webhooks/incoming-leads` (signed HMAC + replay), `POST /api/admin/fix-checkout` (`super_admin`) | **PASS** (`bcast=200, inc=200/dup=true, fixChk=200`) |
| `T-FUNC-6` | **Next.js 15 Runtime Warning Check** | Captured `stderr` across all routes/SSR requests | **PASS** (`syncDynamicApiWarnings=false`, zero uncaught runtime exceptions) |

---

## 2. Domain Coverage Summary & Visual Note

- **Domains Covered End-to-End via API / Build:** Lead management (`bulk-assign`, CSV `leads/export`, `exceljs` XLSX, `companies/search`), Telecalling (`mobile/login`, `sim-calls` dedupe, `click-to-call`, `reports/calls`), Operations & Watchdog (`operations/snapshot`, fail-closed `campaign-health-watchdog`), Messaging & Webhooks (`broadcast`, Razorpay HMAC + dedupe, incoming-leads HMAC + dedupe, WhatsApp verification), Admin & Super-Admin (`users/[id]` PATCH, `fix-checkout`), Public dynamic portals (`/pay/[tenantId]`, `/kyc-upload/[token]`).
- **UI Screenshots:** Not applicable — **zero** visual markup, CSS, or layout changes were made in Phase 24 (`git diff` confined strictly to Next 15 `Promise<params>` / `use()` / `"use client"` on `analytics/page.tsx` and JSX `React.ReactNode` type annotation). Interactive client clicks against live Supabase (face auth camera, Recharts live queries, Fonada OBD/WhatsApp outbound vendor calls) remain unexecuted pending cloud Supabase staging and live vendor keys.
