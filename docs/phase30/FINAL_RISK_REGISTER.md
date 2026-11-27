# HANVA TECHNOLOGIES — FINAL RISK REGISTER
## Consolidated Pre-Launch Risk Matrix across Security, Functional, Legal & Operations

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 30  
**Audit Date:** November 2026  
**Total Identified Risks:** 14 (5 Critical Release Blockers, 4 High Risks, 5 Medium/Low Risks)

---

## 1. Master Risk Assessment Matrix

| Risk ID | Domain | Risk Summary | Severity | Business Impact | Release Blocker? | Required Remediation | Responsible Owner |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- | :--- |
| **RSK-01** | **Mobile** | Android APK v1 lacks Bearer auth and uses hardcoded mockUser bypass | **CRITICAL** | All mobile telecaller call sync fails (`401`); complete data loss on Android | **YES** | Author, test, sign, and distribute APK v2 with Bearer token header injection | Mobile Lead |
| **RSK-02** | **Security** | Cloud Supabase Staging unexecuted (6 cloud objects unverified) | **CRITICAL** | Potential RLS bypass or schema incompatibility under multi-tenant load | **YES** | Provision staging Supabase project; apply 001-003 migrations; verify 6 objects | Backend DBA Lead |
| **RSK-03** | **Security** | 12 external provider credential groups unrotated in production | **CRITICAL** | Compromise of historically exposed API keys across Supabase, Fonada, Razorpay | **YES** | Execute owner-approved secret rotation during scheduled cutover maintenance | DevOps / SecOps |
| **RSK-04** | **Security** | Salon Software (`hanvabill`) multi-tenancy auth fallback vulnerability | **CRITICAL** | Unauthenticated requests fall back to first active tenant; cross-tenant leak | **YES** | Patch `lib/withTenantAuth.ts` to fail closed `401`; enable RLS on Neon Postgres | Salon Tech Lead |
| **RSK-05** | **Legal** | Corporate Legal Identity Discrepancy (Set A 2021 vs Set B 2025) | **CRITICAL** | Statutory regulatory non-compliance with MCA/GST; legal risk on public website | **YES** | Verify Certificate of Incorporation on MCA portal; obtain owner sign-off | Company Directors |
| **RSK-06** | **Product** | Salon Software claims multi-branch operations, but code lacks branch entity | **HIGH** | False advertising; client onboarding disputes on multi-outlet subscriptions | **NO** | Restrict marketing copy strictly to single-outlet salons until branch engine built | Marketing Lead |
| **RSK-07** | **Product** | Restaurant POS lacks native Swiggy/Zomato aggregator integrations | **HIGH** | Customer churn if restaurateurs expect direct aggregator order pulling | **NO** | Disclose that aggregator integration is via partner webhooks; no native sync | Product Lead |
| **RSK-08** | **Integration** | Website-to-CRM API Gateway remains unverified in live staging | **HIGH** | Direct web lead injection into CRM is disabled (`CRM_STAGE_A_SECURITY=false`) | **NO** | Maintain interim WhatsApp routing (`+91 8423711043`) until CRM cutover approved | Integration Lead |
| **RSK-09** | **Operations** | Sales desk response SLA may breach during high-volume ad campaigns | **HIGH** | Drop in conversion rate if inbound WhatsApp leads wait > 30 minutes | **NO** | Assign dedicated sales desk shifts; implement automated lead acknowledgement | Operations Lead |
| **RSK-10** | **Analytics** | Third-party analytics tag changes could accidentally re-introduce PII | **MEDIUM** | Violation of DPDP Act 2023 if personal mobile numbers leak to GA4 | **NO** | Maintain active payload sanitization filter in `lib/analytics.ts` | Frontend Lead |
| **RSK-11** | **Marketing** | Paid search budget waste on irrelevant non-commercial queries | **MEDIUM** | High cost-per-acquisition if negative keyword lists are not applied | **NO** | Enforce 25-word global negative list on Google Ads account before activation | Growth Lead |
| **RSK-12** | **Infrastructure**| Automated database point-in-time recovery unverified on live cloud | **MEDIUM** | Prolonged downtime in the event of cloud provider regional outage | **NO** | Test automated backup restoration runbook on cloud staging project | DevOps Lead |
| **RSK-13** | **Search** | Google Search Console API access unconfigured in local CLI | **LOW** | Inability to programmatically inspect crawl errors from terminal | **NO** | Owner manually inspects GSC portal weekly using documented checklist | SEO Lead |
| **RSK-14** | **Frontend** | 134 pre-existing benign unused icon warnings in ESLint | **LOW** | Minor code noise; zero impact on production runtime or bundle size | **NO** | Clean up unused icon imports during routine post-launch code refactoring | Frontend Lead |

---

## 2. Analysis of the 5 Critical Release Blockers

Any single Critical blocker is sufficient to prevent an unconditional production launch:
1. **RSK-01 (Android APK):** Directly impacts telecalling operations. Deploying the CRM without an operational mobile app breaks the core value proposition for Indian sales agencies.
2. **RSK-02 (Cloud Staging):** Local WASM PGlite testing does not prove that Supabase Cloud auth triggers, storage RLS policies, and SQL views behave correctly under production conditions.
3. **RSK-03 (Exposed Secrets):** Stale credentials in Git history present an ongoing exfiltration risk until provider-side rotation is executed.
4. **RSK-04 (Salon Auth Fallback):** Cross-tenant data leakage is a fatal multi-tenant SaaS vulnerability.
5. **RSK-05 (Corporate Identity):** Discrepancies between 2021 and 2025 incorporation dates undermine corporate legitimacy and violate statutory disclosure requirements.
