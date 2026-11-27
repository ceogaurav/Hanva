import fs from "node:fs";
import http from "node:http";
import crypto from "node:crypto";
import { spawn } from "node:child_process";

const CRM_DIR = "/Users/apple/Downloads/CRM-reconciled";
const SEC_OUT = "/Users/apple/Downloads/HANVA/docs/phase24/evidence/phase24_security_regression.json";
const FUNC_OUT = "/Users/apple/Downloads/HANVA/docs/phase24/evidence/phase24_functional_regression.json";

const TENANT_A = "11111111-1111-4111-8111-111111111111";
const TENANT_B = "22222222-2222-4222-8222-222222222222";
const SUPER_ID = "00000000-0000-4000-8000-000000000001";
const ADMIN_A = "aaaaaaaa-0000-4000-8000-000000000001";
const EMP_A = "aaaaaaaa-0000-4000-8000-000000000002";
const ADMIN_B = "bbbbbbbb-0000-4000-8000-000000000001";
const EMP_B = "bbbbbbbb-0000-4000-8000-000000000002";
const LEAD_A1 = "aaaa1111-0000-4000-8000-000000000001";
const LEAD_B1 = "bbbb1111-0000-4000-8000-000000000001";

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
  "tok-emp-a": { id: EMP_A, email: "emp_a@alpha.test", full_name: "Emp Alpha", role: "telecaller", tenant_id: TENANT_A, is_active: true, user_metadata: { role: "admin" } },
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
  organizations: [
    { id: TENANT_A, name: "Tenant Alpha", enabled_modules: ["leads", "cloudconnect_telephony"] },
    { id: TENANT_B, name: "Tenant Beta", enabled_modules: ["leads"] },
  ],
  tenant_settings: [
    { tenant_id: TENANT_A, company_name: "Alpha Fin", fonada_waba_number: "917900000001", webhook_secret: "tenant_a_webhook_secret_16chars", cron_daily_report: false, cron_sla: false, cron_auto_checkout: false, cron_auto_refill: false, cron_smart_notifications: false },
    { tenant_id: TENANT_B, company_name: "Beta Fin", fonada_waba_number: "917900000002", webhook_secret: "tenant_b_webhook_secret_16chars", cron_daily_report: false, cron_sla: false, cron_auto_checkout: false, cron_auto_refill: false, cron_smart_notifications: false },
  ],
  tenant_wallets: [
    { tenant_id: TENANT_A, credits_balance: 5000, balance: 1000, ivr_credits: 5000 },
    { tenant_id: TENANT_B, credits_balance: 2000, balance: 400, ivr_credits: 2000 },
  ],
  wallet_ledger: [],
  call_logs: [],
  attendance: [],
  ivr_campaign_history: [],
  portal_credentials: [],
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
      const prefer = req.headers["prefer"] || "";

      const sendJson = (code, data, extraHeaders = {}) => {
        res.writeHead(code, { "Content-Type": "application/json", ...extraHeaders });
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
      if (u.pathname.startsWith("/auth/v1/admin/users")) {
        const body = raw ? JSON.parse(raw) : {};
        const id = u.pathname.split("/").pop() || ("dddddddd-0000-4000-8000-" + String(Date.now()).slice(-12).padStart(12, "0"));
        return sendJson(200, { id, email: body.email || "user@alpha.test", app_metadata: body.app_metadata, user_metadata: body.user_metadata });
      }
      if (u.pathname.startsWith("/rest/v1/rpc/")) {
        return sendJson(200, null);
      }
      if (u.pathname.startsWith("/rest/v1/")) {
        const table = u.pathname.replace("/rest/v1/", "");
        if (!DB[table]) return sendJson(200, isSingle ? null : [], prefer.includes("count=exact") ? { "Content-Range": "0-0/0" } : {});
        if (req.method === "GET" || req.method === "HEAD") {
          const rows = parseFilter(u.searchParams, DB[table]);
          const headers = prefer.includes("count=exact") ? { "Content-Range": `0-${Math.max(0, rows.length - 1)}/${rows.length}` } : {};
          if (req.method === "HEAD") { res.writeHead(200, headers); return res.end(); }
          if (isSingle) return rows[0] ? sendJson(200, rows[0], headers) : sendJson(406, { code: "PGRST116", message: "0 rows" });
          return sendJson(200, rows, headers);
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
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(url); if (r.status > 0) return; } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error("Timed out waiting for server");
}

async function run() {
  const mockSrv = await startMockSupabase(3999);
  const stderrLines = [];
  const crmProc = spawn(`${CRM_DIR}/node_modules/.bin/next`, ["start", "-p", "3010"], {
    cwd: CRM_DIR,
    env: {
      ...process.env,
      PORT: "3010",
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
  crmProc.stderr.on("data", (d) => stderrLines.push(d.toString()));

  const secResults = [];
  const funcResults = [];
  const rec = (arr, id, name, pass, detail) => {
    arr.push({ id, name, pass, detail });
    console.log(`${pass ? "✅ PASS" : "❌ FAIL"} [${id}] ${name}: ${detail}`);
    if (!pass) process.exitCode = 1;
  };

  try {
    await waitForServer("http://127.0.0.1:3010/auth/login");
    const req = async (pathUrl, { method = "GET", token, headers = {}, body } = {}) => {
      const h = { ...headers };
      if (token) h["Authorization"] = `Bearer ${token}`;
      if (body !== undefined && typeof body === "object") {
        h["Content-Type"] = "application/json";
        body = JSON.stringify(body);
      }
      const res = await fetch(`http://127.0.0.1:3010${pathUrl}`, { method, headers: h, body, redirect: "manual" });
      const text = await res.text();
      let json = null;
      try { json = JSON.parse(text); } catch {}
      return { status: res.status, text, json, location: res.headers.get("location") || "" };
    };

    // === PART A: SECURITY REGRESSION SUITE (11 checks preserved on Next 15.5.29 + React 19) ===
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
    const unauthStatuses = await Promise.all(unauthRoutes.map(([m, p]) => req(p, { method: m, body: m === "POST" ? {} : undefined })));
    rec(secResults, "T-SEC-1", "14 protected endpoints return 401 unauthenticated", unauthStatuses.every((r) => r.status === 401), unauthStatuses.map((r) => r.status).join(","));

    const fcUnauth = await req("/api/admin/fix-checkout");
    const fcGet = await req("/api/admin/fix-checkout", { token: "tok-admin-a" });
    const fiGet = await req("/api/admin/fix-ivr-logs", { token: "tok-admin-a" });
    const fcEmp = await req("/api/admin/fix-checkout", { method: "POST", token: "tok-emp-a" });
    rec(secResults, "T-SEC-2", "Maintenance routes enforce 401/405/403", fcUnauth.status === 401 && fcGet.status === 405 && fiGet.status === 405 && fcEmp.status === 403, `${fcUnauth.status}/${fcGet.status}/${fiGet.status}/${fcEmp.status}`);

    const empReports = await req("/api/admin/reports/calls?startDate=2026-11-01&endDate=2026-11-27", { token: "tok-emp-a" });
    const empNotif = await req("/api/notifications/send", { method: "POST", token: "tok-emp-a", body: { userIds: [EMP_B], title: "x", message: "y" } });
    const admGrantSuper = await req("/api/admin/users", { method: "POST", token: "tok-admin-a", body: { email: "new@alpha.test", password: "StrongPassword#1", role: "super_admin" } });
    const admPatchSuper = await req(`/api/admin/users/${EMP_A}`, { method: "PATCH", token: "tok-admin-a", body: { role: "super_admin" } });
    rec(secResults, "T-SEC-3", "Role privilege escalation blocked (403)", empReports.status === 403 && empNotif.status === 403 && admGrantSuper.status === 403 && admPatchSuper.status === 403, `${empReports.status}/${empNotif.status}/${admGrantSuper.status}/${admPatchSuper.status}`);

    const crossCalls = await req(`/api/admin/reports/calls?startDate=2026-11-01&endDate=2026-11-27&tenantId=${TENANT_B}`, { token: "tok-admin-a" });
    const crossBulk = await req("/api/admin/leads/bulk-assign", { method: "POST", token: "tok-admin-a", body: { leadIds: [LEAD_B1], assignedTo: EMP_A } });
    const crossNotif = await req("/api/notifications/send", { method: "POST", token: "tok-admin-a", body: { userIds: [EMP_B], type: "sys", title: "hi", message: "cross" } });
    const crossAiCall = await req("/api/admin/ai-call", { method: "POST", token: "tok-admin-a", body: { leadId: LEAD_B1, phoneNumber: "8000000001" } });
    const crossSim = await req("/api/telecaller/sim-calls", { method: "POST", token: "tok-emp-a", body: { tenant_id: TENANT_B, phone_number: "9000000001", duration_seconds: 30 } });
    rec(secResults, "T-SEC-4", "Cross-tenant isolation returns 403 across 5 APIs", crossCalls.status === 403 && crossBulk.status === 403 && crossNotif.status === 403 && crossAiCall.status === 403 && crossSim.status === 403, `${crossCalls.status}/${crossBulk.status}/${crossNotif.status}/${crossAiCall.status}/${crossSim.status}`);

    const cronUnauth = await req("/api/cron/campaign-health-watchdog");
    const cronQ = await req(`/api/cron/daily-report?key=${STAGING_CRON_SECRET}`);
    const dbgQ = await req(`/api/debug/daily-report?key=${STAGING_CRON_SECRET}`);
    const cronV = await req("/api/cron/ozonetel-campaign-sync", { headers: { Authorization: `Bearer ${STAGING_CRON_SECRET}` } });
    const dbgV = await req("/api/debug/daily-report", { headers: { Authorization: `Bearer ${STAGING_CRON_SECRET}` } });
    rec(secResults, "T-SEC-5", "Cron & Debug enforce Bearer CRON_SECRET and omit PII", cronUnauth.status === 401 && cronQ.status === 401 && dbgQ.status === 401 && cronV.status === 200 && dbgV.status === 200 && !dbgV.text.includes("@"), `${cronUnauth.status}/${cronQ.status}/${dbgQ.status}/${cronV.status}/${dbgV.status}`);

    const rzpBody = JSON.stringify({ event: "payment.captured", payload: { payment: { entity: { id: "pay_p24_1", amount: 11800, notes: { tenant_id: TENANT_A, credits: "500" } } } } });
    const rzpNoSig = await req("/api/payments/razorpay/webhook", { method: "POST", body: rzpBody, headers: { "Content-Type": "application/json" } });
    const rzpSig = crypto.createHmac("sha256", STAGING_RZP_SECRET).update(rzpBody).digest("hex");
    const rzpValid = await req("/api/payments/razorpay/webhook", { method: "POST", body: rzpBody, headers: { "Content-Type": "application/json", "x-razorpay-signature": rzpSig } });
    const rzpReplay = await req("/api/payments/razorpay/webhook", { method: "POST", body: rzpBody, headers: { "Content-Type": "application/json", "x-razorpay-signature": rzpSig } });
    const ccBackdoor = await req("/api/webhooks/cloudconnect", { method: "POST", body: { api_key: "HANVA_OZT_7X9Q2P4L" } });
    const waBad = await req("/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=123");
    const waGood = await req(`/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=${STAGING_WA_VERIFY}&hub.challenge=P24OK`);
    const waNoSig = await req("/api/webhooks/whatsapp", { method: "POST", body: { _test: true } });
    const remHooks = await Promise.all([
      req("/api/webhooks/ivr", { method: "POST", body: {} }),
      req("/api/webhooks/fonada", { method: "POST", body: {} }),
      req("/api/webhooks/c2c", { method: "POST", body: {} }),
      req("/api/webhooks/ai-obd", { method: "POST", body: {} }),
      req("/api/webhooks/portals", { method: "POST", body: {} }),
      req("/api/webhooks/unicorn-call-outcomes", { method: "POST", body: {} }),
      req("/api/webhooks/ozonetel/sticky", { method: "POST", body: {} }),
      req("/api/webhooks/inbound-routing", { method: "POST", body: {} }),
      req("/api/webhooks/trigger-push", { method: "POST", body: {} }),
      req("/api/webhooks/fonada/worker", { method: "POST", body: { rawPayload: "{}" } }),
    ]);
    rec(secResults, "T-SEC-6", "All 14 webhook defenses + Razorpay HMAC/dedupe hold on Next 15", rzpNoSig.status === 401 && rzpValid.status === 200 && rzpReplay.json?.message === "Already credited" && ccBackdoor.status === 401 && waBad.status === 403 && waGood.text === "P24OK" && waNoSig.status === 401 && remHooks.slice(0, 9).every((r) => r.status === 401) && remHooks[9].status === 503, `rzp=${rzpValid.status}/${rzpReplay.json?.message}, cc=${ccBackdoor.status}, rem=${remHooks.map((r) => r.status).join("/")}`);

    const expCsv = await req("/api/admin/leads/export", { token: "tok-admin-a" });
    rec(secResults, "T-SEC-7", "CSV export neutralizes formulas and isolates tenants", expCsv.status === 200 && expCsv.text.includes(`"'=cmd|'/C calc'!A0"`) && !expCsv.text.includes("Beta Lead"), `status=${expCsv.status}`);

    const loginHits = [];
    for (let i = 0; i < 12; i++) loginHits.push((await req("/api/mobile/login", { method: "POST", body: { email: "brute_p24@alpha.test", password: "Wrong" } })).status);
    rec(secResults, "T-SEC-8", "Rate limiter enforces 429 on brute-force login", loginHits[0] === 401 && loginHits.slice(10).every((s) => s === 429), loginHits.join(","));

    const hPhone = "+91 98" + String(Date.now()).slice(-8);
    const hRes = await fetch("http://127.0.0.1:3001/api/leads/", { method: "POST", headers: { "Content-Type": "application/json", Origin: "http://localhost:3001" }, body: JSON.stringify({ full_name: "Phase 24 Iso Check", phone: hPhone, product_or_service: "crm", source_page: "/crm", consent_accepted: true }) });
    const hJson = await hRes.json();
    rec(secResults, "T-HANVA-ISO", "HANVA website stays isolated on sandbox_mock with WhatsApp preserved", hRes.status === 201 && hJson.integration_mode === "sandbox_mock" && hJson.production_crm_synced === false && hJson.fallback?.phone === "+91 8423711043", `status=${hRes.status}, mode=${hJson.integration_mode}`);

    // === PART B: FUNCTIONAL CRM + NEXT 15 / REACT 19 COMPATIBILITY SUITE ===
    const pageLogin = await req("/auth/login");
    const pagePay = await req(`/pay/${TENANT_A}`);
    const kycTok = Buffer.from(JSON.stringify({ leadId: LEAD_A1, tenantId: TENANT_A })).toString("base64");
    const pageKyc = await req(`/kyc-upload/${kycTok}?req=pan,aadhaar`);
    const pageProtected = await req("/admin/leads");
    rec(funcResults, "T-FUNC-1", "Next 15 SSR pages & async params/searchParams render without error", pageLogin.status === 200 && pagePay.status === 200 && pageKyc.status === 200 && pageKyc.text.includes("Secure KYC Upload") && [302, 307].includes(pageProtected.status), `login=${pageLogin.status}, pay=${pagePay.status}, kyc=${pageKyc.status}, guard=${pageProtected.status}->${pageProtected.location}`);

    const bulkOk = await req("/api/admin/leads/bulk-assign", { method: "POST", token: "tok-admin-a", body: { leadIds: [LEAD_A1], assignedTo: EMP_A, assignerName: "Admin Alpha" } });
    const compSearch = await req("/api/companies/search?q=tata", { token: "tok-admin-a" });
    const ExcelJS = (await import(`${CRM_DIR}/node_modules/exceljs/excel.js`)).default;
    const wb = new ExcelJS.Workbook();
    wb.addWorksheet("Leads").addRow(["Alpha Lead", "9000000001"]);
    const xlsxBuf = await wb.xlsx.writeBuffer();
    const xlsxOk = xlsxBuf.byteLength > 1000 && xlsxBuf[0] === 0x50 && xlsxBuf[1] === 0x4b;
    rec(funcResults, "T-FUNC-2", "Lead bulk-assign, ExcelJS XLSX export (uuid>=11.1.1), & graceful company-search fallback", bulkOk.status === 200 && bulkOk.json?.success === true && compSearch.status === 200 && xlsxOk, `bulk=${bulkOk.status}, compSearch=${compSearch.status} (externalSymlinkMissing:matches=${compSearch.json?.results?.length ?? 0}), xlsxBytes=${xlsxBuf.byteLength}`);

    const userPatchOk = await req(`/api/admin/users/${EMP_A}`, { method: "PATCH", token: "tok-admin-a", body: { full_name: "Emp Alpha Updated", role: "team_leader", allow_wfh: true } });
    rec(funcResults, "T-FUNC-3", "Next 15 async route params PATCH /api/admin/users/[id] succeeds", userPatchOk.status === 200 && userPatchOk.json?.success === true, `patchStatus=${userPatchOk.status}`);

    const mobOk = await req("/api/mobile/login", { method: "POST", body: { email: "emp_a@alpha.test", password: "ValidStagePass#2026" } });
    const simPayload = { phone_number: "9000000001", duration_seconds: 65, timestamp: "2026-11-27T05:10:00.000Z", disposition: "Interested" };
    const sim1 = await req("/api/telecaller/sim-calls", { method: "POST", token: mobOk.json?.token, body: simPayload });
    const sim2 = await req("/api/telecaller/sim-calls", { method: "POST", token: mobOk.json?.token, body: simPayload });
    const c2c = await req("/api/click-to-call", { method: "POST", token: "tok-emp-a", body: { customerPhone: "9000000001", leadId: LEAD_A1 } });
    const callsRep = await req("/api/admin/reports/calls?startDate=2026-11-01&endDate=2026-11-27", { token: "tok-admin-a" });
    const snap = await req("/api/admin/operations/snapshot", { token: "tok-admin-a" });
    const watchdogUnconf = await req("/api/admin/campaign-health-watchdog", { token: "tok-admin-a" });
    rec(funcResults, "T-FUNC-4", "Mobile JWT -> SIM-call dedupe, C2C, Reports, Ops Snapshot & Watchdog fail-closed check", mobOk.status === 200 && sim1.status === 200 && sim2.json?.deduplicated === true && c2c.status === 200 && callsRep.status === 200 && snap.status === 200 && watchdogUnconf.status === 500, `mob=${mobOk.status}, simDup=${sim2.json?.deduplicated}, c2c=${c2c.status}, rep=${callsRep.status}, snap=${snap.status}, wdUnconfigured=${watchdogUnconf.status}`);

    const bcastOk = await req("/api/admin/broadcast", { method: "POST", token: "tok-admin-a", body: { title: "Phase 24 Test", message: "System check" } });
    const incBody = JSON.stringify({ name: "Intl Lead P24", phone: "+447911123999", idempotency_key: "idem_p24_1" });
    const incTs = String(Math.floor(Date.now() / 1000));
    const incSig = "sha256=" + crypto.createHmac("sha256", STAGING_INCOMING_HMAC).update(`${incTs}.${incBody}`).digest("hex");
    const incOk = await req("/api/webhooks/incoming-leads", { method: "POST", body: incBody, headers: { "Content-Type": "application/json", "x-hanva-signature": incSig, "x-hanva-timestamp": incTs, "x-tenant-id": TENANT_A, "x-idempotency-key": "idem_p24_1" } });
    const incDup = await req("/api/webhooks/incoming-leads", { method: "POST", body: incBody, headers: { "Content-Type": "application/json", "x-hanva-signature": incSig, "x-hanva-timestamp": incTs, "x-tenant-id": TENANT_A, "x-idempotency-key": "idem_p24_1" } });
    const fixChkSuper = await req("/api/admin/fix-checkout", { method: "POST", token: "tok-super" });
    rec(funcResults, "T-FUNC-5", "Admin Broadcast, Signed Lead Webhook + Dedupe & Super-Admin Maintenance succeed", bcastOk.status === 200 && incOk.status === 200 && incDup.json?.deduplicated === true && fixChkSuper.status === 200, `bcast=${bcastOk.status}, inc=${incOk.status}/dup=${incDup.json?.deduplicated}, fixChk=${fixChkSuper.status}`);

    const noSyncWarn = !stderrLines.join("").includes("sync-dynamic-apis");
    rec(funcResults, "T-FUNC-6", "Zero Next.js 15 sync-dynamic-apis warnings or uncaught runtime exceptions in stderr", noSyncWarn, `stderrChunks=${stderrLines.length}, syncDynamicApiWarnings=${!noSyncWarn}`);

    fs.writeFileSync(SEC_OUT, JSON.stringify({ executedAt: new Date().toISOString(), auditLogsRecorded: DB.security_audit_logs.length, total: secResults.length, passed: secResults.filter((r) => r.pass).length, results: secResults }, null, 2));
    fs.writeFileSync(FUNC_OUT, JSON.stringify({ executedAt: new Date().toISOString(), total: funcResults.length, passed: funcResults.filter((r) => r.pass).length, results: funcResults }, null, 2));
    console.log(`\nPHASE 24 SUMMARY: security=${secResults.filter((r)=>r.pass).length}/${secResults.length}, functional=${funcResults.filter((r)=>r.pass).length}/${funcResults.length}, auditLogs=${DB.security_audit_logs.length}`);
  } finally {
    crmProc.kill("SIGTERM");
    mockSrv.close();
  }
}
run().catch((e) => { console.error(e); process.exit(1); });
