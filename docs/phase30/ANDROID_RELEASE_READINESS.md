# HANVA TECHNOLOGIES — ANDROID RELEASE READINESS
## Source Code Inspection, APK v1 Flaws, Missing APK v2 & Mobile Release Blocker

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 30  
**Workspace:** `/Users/apple/Downloads/hanva-telecaller-android`  
**Date:** November 2026

---

## 1. Executive Summary & Mobile Release Blocker

An inspection of the Android telecaller application in `/Users/apple/Downloads/hanva-telecaller-android` reveals an absolute, critical release blocker:

**The existing mobile application (APK v1) is completely incompatible with the hardened CRM backend and cannot be used in production.**

### The Blocker in Plain Terms:
- The hardened CRM backend (in `CRM-reconciled`) now strictly requires authenticated requests with `Authorization: Bearer <access_token>` and rejects unauthenticated traffic with `401 Unauthorized`.
- APK v1 does **NOT** transmit Bearer tokens and contains an internal bypass that falls back to a hardcoded mock user with an arbitrary tenant ID.
- Therefore, if telecallers use APK v1 against the production CRM, **every call log synchronization will fail**, and telecaller activity will be completely lost.
- **APK v2 has NOT been authored, built, signed, or tested.**

---

## 2. Code Inspection of APK v1 Flaws

### Flaw 1: Hardcoded Mock User Bypass on Auth Rejection
In `src/App.tsx` (lines 107–128):
```typescript
// When the server rejects login or network fails:
const mockUser = {
  id: "mock-user-1",
  full_name: "Demo Telecaller",
  email: "telecaller@hanva.in",
  role: "telecaller",
  tenant_id: "8698247e-2472-42f9-9608-4d311bedf108", // HARDCODED TENANT ID!
  is_active: true
};
```
- If an agent enters wrong credentials or the server returns an error, the app ignores the server and logs the telecaller into a hardcoded mock tenant.

### Flaw 2: Missing Bearer Token in Native Call Sync Service
In `android/app/src/main/java/com/hanva/telecaller/CallSyncService.java` (lines 24–67):
- The native Android service reads the phone's call log after an outbound call ends.
- It opens an `HttpURLConnection` to `POST /api/telecaller/sim-calls`.
- **It does NOT set the `Authorization: Bearer <token>` header.**
- In `CRM-reconciled`, `/api/telecaller/sim-calls/route.ts` strictly validates JWT tokens via `getAuthenticatedUser()`. Because the header is missing, the server fails closed with:
  ```json
  { "error": "Missing or invalid authorization header" } // HTTP 401
  ```
- Result: **Zero SIM calls from telecaller phones will sync to the CRM.**

---

## 3. Required Android APK v2 Engineering Specification

Before Hanva telecallers can use the Android app in production, mobile engineering must author and release APK v2 according to the following specification:

```
┌─────────────────────────────────────────────────────────────┐
│ APK v2 MANDATORY REMEDIATION SPECIFICATION                  │
├─────────────────────────────────────────────────────────────┤
│ 1. Complete Removal of Mock User Bypass:                    │
│    • Delete mockUser fallback in src/App.tsx                │
│    • Display explicit error dialog on login failure         │
├─────────────────────────────────────────────────────────────┤
│ 2. Secure Token Storage via Capacitor Preferences:          │
│    • Store access_token, refresh_token, and tenant_id       │
│    • Make token accessible to both React WebView and native │
├─────────────────────────────────────────────────────────────┤
│ 3. Native Service Header Injection:                         │
│    • CallSyncService.java reads stored access_token         │
│    • Sets conn.setRequestProperty("Authorization", Bearer)  │
├─────────────────────────────────────────────────────────────┤
│ 4. Token Refresh & Re-Authentication Flow:                  │
│    • If server returns 401, attempt refresh_token exchange  │
│    • If refresh fails, route user to login screen           │
├─────────────────────────────────────────────────────────────┤
│ 5. Release Build & Cryptographic Signing:                   │
│    • Generate production keystore (owner-managed)           │
│    • Compile release APK / AAB using Android Gradle         │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Current Android Readiness Status: BLOCKED

- **Release Blocker:** YES (CRITICAL).
- Telecalling agencies cannot adopt Hanva CRM on mobile until APK v2 is built and distributed.
- Desktop CRM telecalling (via browser WebRTC and Exotel C2C) remains functional, but native Android SIM card sync is completely blocked.
