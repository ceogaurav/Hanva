# ANDROID API COMPATIBILITY REPORT

**CRM Endpoints Verified Under Next.js `15.5.29`:** `app/api/mobile/login/route.ts` and `app/api/telecaller/sim-calls/route.ts`  
**Android Workspace Status (`/Users/apple/Downloads/hanva-telecaller-android`):** Preserved strictly **READ-ONLY** (not modified or released).

---

## 1. Preserved Next.js 15 Backend Contract Verification (`T-FUNC-4` PASS)

Upgrading to Next.js `15.5.29` + React `19.3.1` preserved the exact hardened Phase 23.2 mobile contract:

1. **`POST /api/mobile/login`**
   - Request: `{ "email": "...", "password": "..." }`
   - Brute-force limit: `10` requests / `300s` per IP+email (`429` + `Retry-After`, verified in `T-SEC-8`).
   - Success response (`200`): `{ success: true, token: <jwt>, access_token: <jwt>, refresh_token: <refresh>, expires_in, user: { id, full_name, email, role, tenant_id, is_active } }` (verified in `T-FUNC-4`).
2. **`POST /api/telecaller/sim-calls`**
   - Required Header: **`Authorization: Bearer <access_token>`** (unauthenticated fails closed `401` in `T-SEC-1`).
   - Tenant/User Integrity: Derives `tenant_id` and `agent_id` strictly from authenticated JWT + `public.users`; rejects mismatched body `tenant_id` (`403`, verified in `T-SEC-4`) and deduplicates identical call timestamps (`deduplicated: true`, verified in `T-FUNC-4`).

---

## 2. APK v1 Compatibility Gap & Required APK v2 Specification (Out of Phase 24 Scope)

Read-only inspection of APK v1 confirms existing field builds remain incompatible with the hardened backend:
- **`src/App.tsx:107-128`:** Ignores returned `token`/`access_token` and includes an offline `mockUser` bypass (`tenant_id: '8698247e-2472-42f9-9608-4d311bedf108'`) when `!res.ok`.
- **`src/App.tsx:171-184` & `CallSyncService.java:24-67`:** Neither WebView `fetch` nor Android native `HttpURLConnection` sends `Authorization: Bearer <access_token>` when calling `/api/telecaller/sim-calls`.

### Required Android APK v2 Specification Before Production Cutover
1. Remove the `mockUser` local bypass in `src/App.tsx`; block login on server rejection.
2. Persist `{ access_token, refresh_token, user }` cleanly in `CapacitorStorage` (`Preferences`) so both JS WebView and `CallSyncService.java` can read the Bearer JWT.
3. Set `Authorization: Bearer <access_token>` header on both `src/App.tsx` fetch and `CallSyncService.java` `conn.setRequestProperty("Authorization", "Bearer " + token)` + prompt re-auth on `401`.
