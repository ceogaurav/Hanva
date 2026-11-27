# THREE-WAY COMPARISON AND CONFLICT REPORT

**Comparison Baseline:** Common ancestor `3d3f81a7` (`gauravhotstar/CRM` `HEAD`) vs. `seobanks/CRM` (`bec603f9`, +10 commits) vs. Local Dirty Working Tree (`/Users/apple/Downloads/CRM`, 75 modified/untracked paths).  
**Full Per-File Register:** [CONFLICT_DECISION_REGISTER.csv](./CONFLICT_DECISION_REGISTER.csv) (`85` entries).

---

## 1. Divergence Summary

- **12 Overlapping Modified Paths** (touched in `seobanks/CRM` AND dirty in `/Users/apple/Downloads/CRM`):
  - **11 Diverged Content (`three_way_overlap_diffs.txt`):** `app/actions/tenant-settings.ts`, `app/actions/whatsapp.ts`, `app/admin/ivr-upload/page.tsx`, `app/admin/page.tsx`, `app/admin/settings/page.tsx`, `app/api/webhooks/cloudconnect/route.ts`, `app/api/webhooks/ivr/route.ts`, `app/api/webhooks/whatsapp/route.ts`, `app/telecaller/leads/page.tsx`, `components/leads-table.tsx`, `components/telecaller-lead-filters.tsx`.
  - **1 Byte-Identical Overlap:** `lib/whatsapp-rate-limiter.ts`.
- **10 Upstream-Only Files (`seobanks/CRM` `bec603f9` absent locally):** Added cached call reports (`app/api/admin/reports/calls/route.ts`), shared DID cache (`lib/did-registry-cache.ts`), modal share exports, `AttendanceReminderModal.tsx`, and logo assets.
- **63 Local-Dirty-Only Paths (`/Users/apple/Downloads/CRM` Nov 11–25):** Added GST invoice actions/UI, Razorpay billing flows, Ozonetel campaign health watchdog & crons, mobile SIM login/sync routes, middleware changes, branding assets, and 3 non-code artifacts excluded by security/hygiene policy.

---

## 2. Conflict Resolution Principles & Specific Overlap Decisions

1. **Preserve Both Feature Sets Without Data Loss:**
   - All `10` `seobanks/CRM` additions (`reports/calls`, `did-registry-cache.ts`, share modals) were imported onto `security/phase-23-2-reconciled` (`6cebadb`).
   - All `60` legitimate local Nov 11–25 business code/UI/route additions were overlaid cleanly on top.
2. **Semantic Merges Across Critical 11 Diverged Overlaps:**
   - `app/actions/whatsapp.ts`: Kept both `seobanks` rate-limiting helpers AND local `loan_status` template additions while stripping all hardcoded tokens/emails.
   - `app/api/webhooks/cloudconnect/route.ts`: Merged local CloudConnect campaign enhancements WITH `seobanks` `broadcastScreenPop` channel-cleanup refactor (eliminating Supabase Realtime WebSocket memory leaks), then stripped the hardcoded backdoor key and enforced `verifySharedWebhookToken`.
   - `app/api/webhooks/ivr/route.ts`: Combined local IVR disposition routing with `seobanks` cached DID lookup (`lib/did-registry-cache.ts`) and added `verifySharedWebhookToken`.
   - `app/api/webhooks/whatsapp/route.ts`: Retained `seobanks` richer WABA routing and local Fonada logic, hardened GET challenge/POST HMAC & shared token checks, and replaced raw `createClient` usage with `getSupabaseAdminStrict()`.
   - `app/admin/ivr-upload/page.tsx`, `app/admin/page.tsx`, `app/admin/settings/page.tsx`, `app/telecaller/leads/page.tsx`, `components/leads-table.tsx`, `components/telecaller-lead-filters.tsx`, `app/actions/tenant-settings.ts`: Adopted the newer Nov 14–25 local operational UX/workflows cleanly and repaired TypeScript/ESLint errors introduced by upstream/local edits.
3. **Policy Exclusions (`3` paths):**
   - `recovered_failed_leads.json` (local operational customer PII dump), `.DS_Store`, and `.agents/` were explicitly excluded from `/Users/apple/Downloads/CRM-reconciled` and Git commits.
