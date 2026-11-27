# MOBILE API SECURITY REPORT & ANDROID COMPATIBILITY ASSESSMENT

**CRM Reconciled Endpoints:** `app/api/mobile/login/route.ts` and `app/api/telecaller/sim-calls/route.ts`  
**Android Workspace Reviewed (Read-Only):** `/Users/apple/Downloads/hanva-telecaller-android` (zero edits made).

---

## 1. Security Remediations Implemented in CRM Backend

1. **`/api/mobile/login` (`app/api/mobile/login/route.ts`):**
   - Replaced unrestricted login flow with distributed IP+email rate limiting (`checkSharedRateLimit`, `10` requests / `300` seconds -> HTTP `429` + `Retry-After`).
   - Authenticates strictly via public Supabase Auth client (`signInWithPassword`), verifies active profile in `public.users`, logs audit event (`emitSecurityAuditLog`, redacted SHA-256 email digest), and returns `{ success: true, token, access_token, refresh_token, expires_in, user }` so both Capacitor WebView and native Java can store JWTs.
2. **`/api/telecaller/sim-calls` (`app/api/telecaller/sim-calls/route.ts`):**
   - Requires verified authentication via `requireAuthenticatedSession(request)` (Bearer JWT or SSR session -> `401` if absent/invalid).
   - Derives `agent_id` (`actor.userId`) and `tenant_id` (`actor.tenantId`) strictly from database profile; explicitly rejects mismatched body `tenant_id` overrides with HTTP `403` and removes the legacy `organizations LIMIT 1` cross-tenant fallback!
   - Enforces timestamp deduplication (`deduplicated: true` when matching call timestamp exists, verified in `T-API-5`).

---

## 2. Verified Breaking Compatibility With Existing Android APK v1 (Cutover Blocker)

Direct read-only code inspection of `/Users/apple/Downloads/hanva-telecaller-android` confirms APK v1 is **incompatible** with the hardened CRM API until updated to APK v2:

| File & Lines | Observed Existing APK v1 Behavior | Impact Against Hardened CRM | Required APK v2 Change (Out of Phase 23.2 Scope) |
| --- | --- | --- | --- |
| `src/App.tsx:107-128` | Calls `/api/mobile/login`, stores `data.user` only (ignores tokens); if `!res.ok` and email has `@`, creates a fake local `mockUser` with hardcoded `tenant_id: '8698247e-2472-42f9-9608-4d311bedf108'` | Fake fallback user lacks any JWT, silently failing syncs (`401`) while appearing logged in locally | Remove `mockUser` offline bypass; persist `access_token` & `refresh_token` securely in Capacitor `Preferences` alongside `hanva_agent_user` |
| `src/App.tsx:171-184` | Posts call disposition JSON (`agent_id`, `tenant_id`) to `/api/telecaller/sim-calls` with **no `Authorization` header** | Blocked with HTTP `401` (`T-API-1`) | Attach `Authorization: Bearer <access_token>` header + refresh flow |
| `android/app/src/main/java/in/hanva/telecaller/CallSyncService.java:24-67` | Background Android `HttpURLConnection` reads only `id` and `tenant_id` from `CapacitorStorage/hanva_agent_user` JSON; sends **no `Authorization` header** | Background SIM sync blocked with HTTP `401` | Store `access_token` in shared storage and set `conn.setRequestProperty("Authorization", "Bearer " + accessToken)` |

**Deployment Mandate:** Coordinate Phase 24 CRM backend cutover with APK v2 rollout so field telecallers do not lose SIM-call tracking.
