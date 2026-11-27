import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import crypto from "node:crypto";
import { spawn } from "node:child_process";

const CRM_DIR = "/Users/apple/Downloads/CRM-reconciled";
const EVIDENCE_OUT = "/Users/apple/Downloads/HANVA/docs/phase23_2/evidence/staging_api_verification.json";

const TENANT_A = "11111111-1111-4111-8111-111111111111";
const TENANT_B = "22222222-2222-4222-8222-222222222222";
const SUPER_ID = "00000000-0000-4000-8000-000000000001";
const ADMIN_A = "aaaaaaaa-0000-4000-8000-000000000001";
const EMP_A = "aaaaaaaa-0000-4000-8000-000000000002";
const ADMIN_B = "bbbbbbbb-0000-4000-8000-000000000001";
const EMP_B = "bbbbbbbb-0000-4000-8000-000000000002";
const LEAD_A1 = "aaaa1111-0000-4000-8000-000000000001";
const LEAD_B1 = "bbbb1111-0000-4000-8000-000000000001";

// Synthetic staging secrets (valid for ephemeral localhost test run ONLY)
const STAGING_CRON_SECRET = "staging_cron_secret_min_24_chars_001";
const STAGING_RZP_SECRET = "staging_rzp_hmac_secret_min_24_chars";
const STAGING_CC_SECRET = "staging_cloudconnect_secret_001";
const STAGING_WA_VERIFY = "staging_wa_verify_token_min_16";
const STAGING_WA_APP_SECRET = "staging_wa_app_secret_min_24_chars";
const STAGING_INCOMING_HMAC = "staging_incoming_leads_hmac_secret_24";
const STAGING_CALENDARIFIC = "staging_calendarific_key_001";
const STAGING_SERVICE_ROLE = "staging_service_role_key_placeholder_32chars_ok";
const STAGING_ANON_KEY = "staging_anon_key_placeholder_32chars_ok";

const TOKENS = {
  "tok-super": { id: SUPER_ID, email: "super@hanva.test", full_name: "Super Admin", role: "super_admin", tenant_id: TENANT_A, is_active: true, user_metadata: { role: "super_admin" } },
  "tok-admin-a": { id: ADMIN_A, email: "admin_a@alpha.test", full_name: "Admin Alpha", role: "admin", tenant_id: TENANT_A, is_active: true, user_metadata: { role: "admin" } },
  "tok-emp-a": { id: EMP_A, email: "emp_a@alpha.test", full_name: "Emp Alpha", role: "telecaller", tenant_id: TENANT_A, is_active: true, user_metadata: { role: "admin" } }, // Note spoofed user_metadata.role='admin'!
  "tok-admin-b": { id: ADMIN_B, email: "admin_b@beta.test", full_name: "Admin Beta", role: "admin", tenant_id: TENANT_B, is_active: true, user_metadata: { role: "admin" } },
  "tok-emp-b": { id: EMP_B, email: "emp_b@beta.test", full_name: "Emp Beta", role: "telecaller", tenant_id: TENANT_B, is_active: true, user_metadata: { role: "telecaller" } },
};

const DB = {
  users: Object.values(TOKENS).map(({ user_metadata, ...u }) => u),
  leads: [
    { id: LEAD_A1, tenant_id: TENANT_A, name: "Alpha Lead", phone: "9000000001", email: "alpha@example.com", status: "new", assigned_to: EMP_A, custom_fields: {}, created_at: "2026-11-27T01:00:00Z" },
    { id: "aaaa1111-0000-4000-8000-000000000002", tenant_id: TENANT_A, name: "=cmd|'/C calc'!A0", phone: "9000000002", email: "+SUM(1,2)@example.com", status: "new", assigned_to: EMP_A, custom_fields: {}, created_at: "2026-11-27T01:05:00Z" },
    { id: LEAD_B1, tenant_id: TENANT_B, name: "Beta Lead", phone: "8000000001", email: "beta@example.com", status: "new", assigned_to: EMP_B, custom_fields: {}, created_at: "2026-11-27T01:00:00Z" },
  ],
  portal_credentials: [],
  organizations: [
    { id: TENANT_A, name: "Tenant Alpha" },
    { id: TENANT_B, name: "Tenant Beta" },
  ],
  tenant_settings: [
    { tenant_id: TENANT_A, fonada_waba_number: "917900000001", webhook_secret: "tenant_a_webhook_secret_16chars", cron_daily_report: false, cron_sla: false, cron_auto_checkout: false, cron_auto_refill: false, cron_smart_notifications: false },
    { tenant_id: TENANT_B, fonada_waba_number: "917900000002", webhook_secret: "tenant_b_webhook_secret_16chars", cron_daily_report: false, cron_sla: false, cron_auto_checkout: false, cron_auto_refill: false, cron_smart_notifications: false },
  ],
  tenant_wallets: [
    { tenant_id: TENANT_A, credits_balance: 5000, balance: 1000 },
    { tenant_id: TENANT_B, credits_balance: 2000, balance: 400 },
  ],
  wallet_ledger: [],
  call_logs: [],
  notifications: [],
  security_audit_logs: [],
  api_rate_limits: [],
};

function parseFilter(sp, rows) {
  let out = [...rows];
  for (const [k, v] of sp.entries()) {
    if (["select", "order", "limit", "offset"].includes(k)) continue;
    if (v.startsWith("eq.")) out = out.filter((r) => String(r[k]) === v.slice(3));
    else if (v.startsWith("ilike.")) {
      const needle = v.slice(6).replace(/%/g, "").toLowerCase();
      out = out.filter((r) => String(r[k] || "").toLowerCase().includes(needle));
    } else if (v.startsWith("in.(")) {
      const set = new Set(v.slice(4, -1).split(","));
      out = out.filter((r) => set.has(String(r[k])));
    } else if (v === "not.is.null") {
      out = out.filter((r) => r[k] !== null && r[k] !== undefined);
    } else if (v.startsWith("cs.")) {
      try {
        const obj = JSON.parse(v.slice(3));
        out = out.filter((r) => r[k] && Object.entries(obj).every(([ok, ov]) => r[k][ok] === ov));
      } catch {}
    }
  }
  const lim = Number(sp.get("limit"));
  if (lim > 0) out = out.slice(0, lim);
  return out;
}

function startMockSupabase(port) {
  return new Promise((resolve) => {
    const srv = http.createServer(async (req, res) => {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const raw = Buffer.concat(chunks).toString("utf8");
      const u = new URL(req.url, `http://127.0.0.1:${port}`);
      const accept = req.headers["accept"] || "";
      const isSingle = accept.includes("vnd.pgrst.object+json");

      const sendJson = (code, data) => {
        res.writeHead(code, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      };

      if (u.pathname === "/auth/v1/user") {
        const auth = req.headers["authorization"] || "";
        const tok = auth.replace(/^Bearer\s+/i, "").trim();
        const user = TOKENS[tok];
        if (!user) return sendJson(401, { message: "Invalid JWT" });
        return sendJson(200, { id: user.id, email: user.email, user_metadata: user.user_metadata, app_metadata: { role: user.role } });
      }

      if (u.pathname === "/auth/v1/token") {
        const body = raw ? JSON.parse(raw) : {};
        const match = Object.entries(TOKENS).find(([, v]) => v.email === body.email);
        if (!match || body.password !== "ValidStagePass#2026") {
          return sendJson(400, { error: "invalid_grant", error_description: "Invalid login credentials" });
        }
        return sendJson(200, {
          access_token: match[0],
          refresh_token: "refresh-" + match[0],
          expires_in: 3600,
          user: { id: match[1].id, email: match[1].email },
        });
      }

      if (u.pathname === "/auth/v1/admin/users") {
        const body = raw ? JSON.parse(raw) : {};
        const id = "dddddddd-0000-4000-8000-" + String(Date.now()).slice(-12).padStart(12, "0");
        return sendJson(200, { id, email: body.email, app_metadata: body.app_metadata, user_metadata: body.user_metadata });
      }

      if (u.pathname.startsWith("/rest/v1/rpc/bulk_assign_leads")) {
        return sendJson(200, null);
      }

      if (u.pathname.startsWith("/rest/v1/")) {
        const table = u.pathname.replace("/rest/v1/", "");
        if (!DB[table]) return sendJson(200, isSingle ? null : []);
        if (req.method === "GET") {
          const rows = parseFilter(u.searchParams, DB[table]);
          if (isSingle) return rows[0] ? sendJson(200, rows[0]) : sendJson(406, { code: "PGRST116", message: "0 rows" });
          return sendJson(200, rows);
        }
        if (req.method === "POST") {
          const parsed = raw ? JSON.parse(raw) : {};
          const items = Array.isArray(parsed) ? parsed : [parsed];
          const inserted = items.map((item) => {
            const rec = { id: item.id || crypto.randomUUID(), created_at: item.created_at || new Date().toISOString(), ...item };
            if (table === "api_rate_limits" && u.searchParams.get("on_conflict")) {
              const idx = DB[table].findIndex((r) => r.bucket_key === rec.bucket_key);
              if (idx >= 0) { DB[table][idx] = rec; return rec; }
            }
            DB[table].push(rec);
            return rec;
          });
          return sendJson(201, isSingle ? inserted[0] : inserted);
        }
        if (req.method === "PATCH") {
          const patch = raw ? JSON.parse(raw) : {};
          const matched = parseFilter(u.searchParams, DB[table]);
          matched.forEach((r) => Object.assign(r, patch));
          return sendJson(200, isSingle ? (matched[0] || null) : matched);
        }
      }

      sendJson(200, { status: "ok" });
    });
    srv.listen(port, "127.0.0.1", () => resolve(srv));
  });
}

async function waitForServer(url) {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(url);
      if (r.status > 0) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("Timed out waiting for staging server");
}

async function run() {
  const mockSrv = await startMockSupabase(3999);
  const crmProc = spawn("pnpm", ["start", "-p", "3009"], {
    cwd: CRM_DIR,
    env: {
      ...process.env,
      PORT: "3009",
      NODE_ENV: "production",
      NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:3999",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: STAGING_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: STAGING_SERVICE_ROLE,
      CRON_SECRET: STAGING_CRON_SECRET,
      RAZORPAY_WEBHOOK_SECRET: STAGING_RZP_SECRET,
      CLOUDCONNECT_WEBHOOK_SECRET: STAGING_CC_SECRET,
      WHATSAPP_VERIFY_TOKEN: STAGING_WA_VERIFY,
      WHATSAPP_APP_SECRET: STAGING_WA_APP_SECRET,
      INCOMING_LEADS_HMAC_SECRET: STAGING_INCOMING_HMAC,
      CALENDARIFIC_API_KEY: STAGING_CALENDARIFIC,
      FONADA_OBD_UKEY: "staging_obd_key",
      FONADA_OBD_CLIENT_ID: "staging_client",
      FONADA_WEBHOOK_SECRET: "staging_fonada_secret_16chars",
      OZONETEL_WEBHOOK_SECRET: "staging_ozonetel_secret_16chars",
      UNICORN_WEBHOOK_SECRET: "staging_unicorn_secret_16chars",
      INTERNAL_WEBHOOK_SECRET: "staging_internal_secret_16chars",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  const results = [];
  const check = (id, name, pass, detail) => {
    results.push({ id, name, pass, detail });
    console.log(`${pass ? "✅ PASS" : "❌ FAIL"} [${id}] ${name}: ${detail}`);
    if (!pass) process.exitCode = 1;
  };

  try {
    await waitForServer("http://127.0.0.1:3009/api/cron/ozonetel-campaign-sync");

    const req = async (pathUrl, { method = "GET", token, headers = {}, body } = {}) => {
      const h = { ...headers };
      if (token) h["Authorization"] = `Bearer ${token}`;
      if (body !== undefined && typeof body === "object") {
        h["Content-Type"] = "application/json";
        body = JSON.stringify(body);
      }
      const res = await fetch(`http://127.0.0.1:3009${pathUrl}`, { method, headers: h, body, redirect: "manual" });
      const text = await res.text();
      let json = null;
      try { json = JSON.parse(text); } catch {}
      return { status: res.status, text, json };
    };

    // 1. Unauthenticated 401 checks
    const unauthRoutes = [
      ["GET", "/api/admin/reports/calls?startDate=2026-11-01&endDate=2026-11-27"],
      ["POST", "/api/admin/broadcast"],
      ["POST", "/api/admin/leads/bulk-assign"],
      ["POST", "/api/admin/users"],
      ["GET", "/api/admin/leads/export"],
      ["GET", "/api/admin/campaign-health-watchdog"],
      ["GET", "/api/admin/holidays?year=2026"],
      ["POST", "/api/assistant"],
      ["POST", "/api/click-to-call"],
      ["GET", "/api/companies/search?q=tcs"],
      ["GET", "/api/kyc-members"],
      ["POST", "/api/transfer-lead"],
      ["POST", "/api/notifications/send"],
      ["POST", "/api/telecaller/sim-calls"],
    ];
    const unauthStatuses = await Promise.all(
      unauthRoutes.map(([m, p]) => req(p, { method: m, body: m === "POST" ? {} : undefined }))
    );
    check(
      "T-API-1",
      "All 14 protected/user/admin/mobile endpoints fail closed with 401 unauthenticated",
      unauthStatuses.every((r) => r.status === 401),
      unauthStatuses.map((r, i) => `${unauthRoutes[i][1].split("?")[0]}=${r.status}`).join(", ")
    );

    // 2. Method hardening (unauth hits 401 at middleware; authenticated GET hits 405; non-super-admin POST hits 403)
    const fixCheckoutUnauth = await req("/api/admin/fix-checkout");
    const fixCheckoutGet = await req("/api/admin/fix-checkout", { token: "tok-admin-a" });
    const fixIvrGet = await req("/api/admin/fix-ivr-logs", { token: "tok-admin-a" });
    const fixCheckoutEmp = await req("/api/admin/fix-checkout", { method: "POST", token: "tok-emp-a" });
    check(
      "T-API-2",
      "Maintenance GET routes fail closed (401 unauth / 405 auth) & non-super-admin POST blocked (403)",
      fixCheckoutUnauth.status === 401 && fixCheckoutGet.status === 405 && fixIvrGet.status === 405 && fixCheckoutEmp.status === 403,
      `unauth=${fixCheckoutUnauth.status}, fixCheckoutGet=${fixCheckoutGet.status}, fixIvrGet=${fixIvrGet.status}, empPost=${fixCheckoutEmp.status}`
    );

    // 3. Role privilege escalation checks (tok-emp-a even carries spoofed user_metadata.role='admin'!)
    const empReports = await req("/api/admin/reports/calls?startDate=2026-11-01&endDate=2026-11-27", { token: "tok-emp-a" });
    const empNotifSend = await req("/api/notifications/send", { method: "POST", token: "tok-emp-a", body: { userIds: [EMP_B], title: "x", message: "y" } });
    const adminGrantSuper = await req("/api/admin/users", { method: "POST", token: "tok-admin-a", body: { email: "new@alpha.test", password: "StrongPassword#1", role: "super_admin" } });
    const adminPatchSuper = await req(`/api/admin/users/${EMP_A}`, { method: "PATCH", token: "tok-admin-a", body: { role: "super_admin" } });
    check(
      "T-API-3",
      "Telecaller w/ spoofed metadata & Admin role escalation blocked (403)",
      empReports.status === 403 && empNotifSend.status === 403 && adminGrantSuper.status === 403 && adminPatchSuper.status === 403,
      `empReports=${empReports.status}, empNotif=${empNotifSend.status}, grantSuper=${adminGrantSuper.status}, patchSuper=${adminPatchSuper.status}`
    );

    // 4. Cross-tenant isolation across API handlers
    const crossCalls = await req(`/api/admin/reports/calls?startDate=2026-11-01&endDate=2026-11-27&tenantId=${TENANT_B}`, { token: "tok-admin-a" });
    const crossBulk = await req("/api/admin/leads/bulk-assign", { method: "POST", token: "tok-admin-a", body: { leadIds: [LEAD_B1], assignedTo: EMP_A } });
    const crossNotif = await req("/api/notifications/send", { method: "POST", token: "tok-admin-a", body: { userIds: [EMP_B], type: "sys", title: "hi", message: "cross" } });
    const crossAiCall = await req("/api/admin/ai-call", { method: "POST", token: "tok-admin-a", body: { leadId: LEAD_B1, phoneNumber: "8000000001" } });
    const crossSim = await req("/api/telecaller/sim-calls", { method: "POST", token: "tok-emp-a", body: { tenant_id: TENANT_B, phone_number: "9000000001", duration_seconds: 30 } });
    check(
      "T-API-4",
      "Cross-tenant API access rejected with 403 across reports/bulk/notif/ai-call/sim-calls",
      crossCalls.status === 403 && crossBulk.status === 403 && crossNotif.status === 403 && [403].includes(crossAiCall.status) && crossSim.status === 403,
      `calls=${crossCalls.status}, bulk=${crossBulk.status}, notif=${crossNotif.status}, aiCall=${crossAiCall.status}, sim=${crossSim.status}`
    );

    // 5. Same-tenant valid operations + Mobile login/sim-calls
    const validCalls = await req("/api/admin/reports/calls?startDate=2026-11-01&endDate=2026-11-27", { token: "tok-admin-a" });
    const mobLogin = await req("/api/mobile/login", { method: "POST", body: { email: "emp_a@alpha.test", password: "ValidStagePass#2026" } });
    const simPayload = { phone_number: "9000000001", duration_seconds: 55, timestamp: "2026-11-27T04:00:00.000Z", disposition: "Interested" };
    const simOk = await req("/api/telecaller/sim-calls", { method: "POST", token: "tok-emp-a", body: simPayload });
    const simDup = await req("/api/telecaller/sim-calls", { method: "POST", token: "tok-emp-a", body: simPayload });
    check(
      "T-API-5",
      "Same-tenant Admin reports, Mobile Login JWT, and SIM-call deduplication succeed",
      validCalls.status === 200 && mobLogin.status === 200 && Boolean(mobLogin.json?.token) && simOk.status === 200 && simDup.json?.deduplicated === true,
      `calls=${validCalls.status}, login=${mobLogin.status}, sim1=${simOk.status}, simDup=${simDup.json?.deduplicated}`
    );

    // 6. Cron & Debug strict Bearer verification + zero secret/PII leakage
    const cronUnauth = await req("/api/cron/campaign-health-watchdog");
    const cronQueryLeak = await req(`/api/cron/daily-report?key=${STAGING_CRON_SECRET}`);
    const debugQueryLeak = await req(`/api/debug/daily-report?key=${STAGING_CRON_SECRET}`);
    const cronValid = await req("/api/cron/ozonetel-campaign-sync", { headers: { Authorization: `Bearer ${STAGING_CRON_SECRET}` } });
    const debugValid = await req("/api/debug/daily-report", { headers: { Authorization: `Bearer ${STAGING_CRON_SECRET}` } });
    check(
      "T-API-6",
      "Cron & Debug enforce Bearer CRON_SECRET, reject ?key= query auth, omit PII/key prefixes",
      cronUnauth.status === 401 && cronQueryLeak.status === 401 && debugQueryLeak.status === 401 && cronValid.status === 200 && !debugValid.text.includes("starts with") && !debugValid.text.includes("@"),
      `unauth=${cronUnauth.status}, cronQuery=${cronQueryLeak.status}, dbgQuery=${debugQueryLeak.status}, cronValid=${cronValid.status}, dbgValid=${debugValid.status}`
    );

    // 7. Signed Webhook Enforcement & Idempotency (Razorpay, CloudConnect, WhatsApp, Incoming Leads)
    const rzpBody = JSON.stringify({ event: "payment.captured", payload: { payment: { entity: { id: "pay_stg_1", amount: 11800, notes: { tenant_id: TENANT_A, credits: "500" } } } } });
    const rzpNoSig = await req("/api/payments/razorpay/webhook", { method: "POST", body: rzpBody, headers: { "Content-Type": "application/json" } });
    const rzpSig = crypto.createHmac("sha256", STAGING_RZP_SECRET).update(rzpBody).digest("hex");
    const rzpValid = await req("/api/payments/razorpay/webhook", { method: "POST", body: rzpBody, headers: { "Content-Type": "application/json", "x-razorpay-signature": rzpSig } });
    const rzpReplay = await req("/api/payments/razorpay/webhook", { method: "POST", body: rzpBody, headers: { "Content-Type": "application/json", "x-razorpay-signature": rzpSig } });

    const ccBackdoor = await req("/api/webhooks/cloudconnect", { method: "POST", body: { api_key: "HANVA_OZT_7X9Q2P4L" } });
    const ccValid = await req("/api/webhooks/cloudconnect", { method: "POST", headers: { "x-api-key": STAGING_CC_SECRET }, body: {} });

    const waBadGet = await req("/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=1234");
    const waGoodGet = await req(`/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=${STAGING_WA_VERIFY}&hub.challenge=CHAL999`);
    const waNoSigPost = await req("/api/webhooks/whatsapp", { method: "POST", body: { _test: true } });

    const incBody = JSON.stringify({ name: "Intl Lead", phone: "+447911123456", idempotency_key: "idem_001" });
    const incTs = String(Math.floor(Date.now() / 1000));
    const incSig = "sha256=" + crypto.createHmac("sha256", STAGING_INCOMING_HMAC).update(`${incTs}.${incBody}`).digest("hex");
    const incQueryRejected = await req("/api/webhooks/incoming-leads?token=tenant_a_webhook_secret_16chars", { method: "POST", body: incBody, headers: { "Content-Type": "application/json" } });
    const incHmacValid = await req("/api/webhooks/incoming-leads", { method: "POST", body: incBody, headers: { "Content-Type": "application/json", "x-hanva-signature": incSig, "x-hanva-timestamp": incTs, "x-tenant-id": TENANT_A, "x-idempotency-key": "idem_001" } });
    const incReplay = await req("/api/webhooks/incoming-leads", { method: "POST", body: incBody, headers: { "Content-Type": "application/json", "x-hanva-signature": incSig, "x-hanva-timestamp": incTs, "x-tenant-id": TENANT_A, "x-idempotency-key": "idem_001" } });

    check(
      "T-API-7",
      "Signed Webhooks verify HMAC/headers, reject backdoors/?token=, and deduplicate replays",
      rzpNoSig.status === 401 && rzpValid.status === 200 && rzpReplay.json?.message === "Already credited" &&
      ccBackdoor.status === 401 && ccValid.status === 200 &&
      waBadGet.status === 403 && waGoodGet.status === 200 && waGoodGet.text === "CHAL999" && waNoSigPost.status === 401 &&
      incQueryRejected.status === 401 && incHmacValid.status === 200 && incReplay.json?.deduplicated === true,
      `rzp(${rzpNoSig.status}/${rzpValid.status}/${rzpReplay.json?.message}), cc(${ccBackdoor.status}/${ccValid.status}), wa(${waBadGet.status}/${waGoodGet.status}/${waNoSigPost.status}), inc(${incQueryRejected.status}/${incHmacValid.status}/${incReplay.json?.deduplicated})`
    );

    // 8. Check HANVA Marketing Site (port 3001) remains isolated from CRM
    const uniqPhone = "+91 98" + String(Date.now()).slice(-8);
    const hanvaRes = await fetch("http://127.0.0.1:3001/api/leads/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "http://localhost:3001" },
      body: JSON.stringify({
        full_name: "Phase 23.2 Isolation Check",
        phone: uniqPhone,
        product_or_service: "crm",
        source_page: "/crm",
        consent_accepted: true,
      }),
    });
    const hanvaJson = await hanvaRes.json();
    check(
      "T-HANVA-ISO",
      "HANVA website /api/leads/ stays isolated (non-prod sandbox_mock only, zero prod sync, WhatsApp preserved)",
      hanvaRes.status === 201 &&
        hanvaJson.integration_mode === "sandbox_mock" &&
        hanvaJson.production_crm_synced === false &&
        hanvaJson.fallback?.phone === "+91 8423711043" &&
        String(hanvaJson.fallback?.whatsapp_url || "").startsWith("https://wa.me/918423711043"),
      `status=${hanvaRes.status}, mode=${hanvaJson.integration_mode}, synced=${hanvaJson.production_crm_synced}, waPhone=${hanvaJson.fallback?.phone}`
    );

    // 9. CSV Export tenant isolation + spreadsheet formula injection neutralization
    const exportCsv = await req("/api/admin/leads/export", { token: "tok-admin-a" });
    const csvNeutralized = exportCsv.text.includes(`"'=cmd|'/C calc'!A0"`) && exportCsv.text.includes(`"'+SUM(1,2)@example.com"`);
    const csvTenantIsolated = exportCsv.text.includes("Alpha Lead") && !exportCsv.text.includes("Beta Lead") && !exportCsv.text.includes("8000000001");
    check(
      "T-API-8",
      "CSV export neutralizes formula cells (=,+,...) and excludes cross-tenant rows",
      exportCsv.status === 200 && csvNeutralized && csvTenantIsolated,
      `status=${exportCsv.status}, neutralized=${csvNeutralized}, isolated=${csvTenantIsolated}`
    );

    // 10. All remaining telephony/portal/internal webhooks fail closed without secret/signature
    const remHooks = await Promise.all([
      req("/api/webhooks/ivr", { method: "POST", body: { caller: "9000000001" } }),
      req("/api/webhooks/fonada", { method: "POST", body: { dst: "9000000001" } }),
      req("/api/webhooks/c2c", { method: "POST", body: { caller: "9000000001" } }),
      req("/api/webhooks/ai-obd", { method: "POST", body: { caller: "9000000001" } }),
      req("/api/webhooks/portals", { method: "POST", body: { portal_name: "99acres", phone: "9000000001" } }),
      req("/api/webhooks/unicorn-call-outcomes", { method: "POST", body: { phone: "9000000001" } }),
      req("/api/webhooks/ozonetel/sticky", { method: "POST", body: { caller: "9000000001" } }),
      req("/api/webhooks/inbound-routing", { method: "POST", body: { caller: "9000000001" } }),
      req("/api/webhooks/trigger-push", { method: "POST", body: { record: {} } }),
      req("/api/webhooks/fonada/worker", { method: "POST", body: { rawPayload: "{}" } }),
    ]);
    const remPass = remHooks.slice(0, 9).every((r) => r.status === 401) && remHooks[9].status === 503;
    check(
      "T-API-9",
      "All 10 telephony/portal/worker webhooks fail closed unauthenticated (401 / 503 unconfigured QStash)",
      remPass,
      remHooks.map((r) => r.status).join("/")
    );

    // 11. Brute-force rate limiter triggers HTTP 429 on /api/mobile/login
    const loginStatuses = [];
    for (let i = 0; i < 12; i++) {
      const r = await req("/api/mobile/login", { method: "POST", body: { email: "ratelimit_probe@alpha.test", password: "WrongPassword#1" } });
      loginStatuses.push(r.status);
    }
    const triggered429 = loginStatuses.slice(10).every((s) => s === 429) && loginStatuses[0] === 401;
    check(
      "T-API-10",
      "Shared rate limiter triggers HTTP 429 on mobile login brute force (>10 requests)",
      triggered429,
      loginStatuses.join(",")
    );

    const payload = {
      executedAt: new Date().toISOString(),
      auditLogsRecorded: DB.security_audit_logs.length,
      total: results.length,
      passed: results.filter((r) => r.pass).length,
      results,
    };
    fs.writeFileSync(EVIDENCE_OUT, JSON.stringify(payload, null, 2));
    console.log(`\nSUMMARY: ${payload.passed}/${payload.total} staging HTTP & isolation checks passed. Audit logs written: ${payload.auditLogsRecorded}`);
  } finally {
    crmProc.kill("SIGTERM");
    mockSrv.close();
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
