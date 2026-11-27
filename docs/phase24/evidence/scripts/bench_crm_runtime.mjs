import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";

const CRM_DIR = "/Users/apple/Downloads/CRM-reconciled";
const outFile = process.argv[2];

function startMockSupabase(port) {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      if (req.url === "/auth/v1/user") {
        const tok = (req.headers.authorization || "").replace(/^Bearer\s+/i, "").trim();
        if (tok === "tok-admin-a") {
          return res.end(JSON.stringify({ id: "aaaaaaaa-0000-4000-8000-000000000001", email: "admin_a@alpha.test", app_metadata: { role: "admin" } }));
        }
        res.statusCode = 401;
        return res.end(JSON.stringify({ message: "Unauthorized" }));
      }
      if (req.url?.startsWith("/rest/v1/users")) {
        return res.end(JSON.stringify({ id: "aaaaaaaa-0000-4000-8000-000000000001", email: "admin_a@alpha.test", full_name: "Admin Alpha", role: "admin", tenant_id: "11111111-1111-4111-8111-111111111111", is_active: true }));
      }
      return res.end(JSON.stringify([]));
    });
    srv.listen(port, "127.0.0.1", () => resolve(srv));
  });
}

async function timeReq(url, opts = {}) {
  const t0 = performance.now();
  const res = await fetch(url, { redirect: "manual", ...opts });
  await res.text();
  return { status: res.status, ms: Number((performance.now() - t0).toFixed(2)) };
}

async function getRssMb(pid) {
  const { execSync } = await import("node:child_process");
  try {
    const out = execSync(`ps -o rss= -p ${pid}`).toString().trim();
    return Number((Number(out) / 1024).toFixed(1));
  } catch { return null; }
}

async function run() {
  const mockSrv = await startMockSupabase(3998);
  const startT0 = performance.now();
  const proc = spawn(`${CRM_DIR}/node_modules/.bin/next`, ["start", "-p", "3011"], {
    cwd: CRM_DIR,
    env: {
      ...process.env,
      PORT: "3011",
      NODE_ENV: "production",
      NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:3998",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "bench_anon_key_placeholder_32_chars_ok",
      SUPABASE_SERVICE_ROLE_KEY: "bench_service_role_key_placeholder_32_ok",
      CRON_SECRET: "bench_cron_secret_placeholder_32_chars",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let readyMs = null;
  try {
    for (let i = 0; i < 80; i++) {
      try {
        const r = await fetch("http://127.0.0.1:3011/auth/login");
        if (r.status > 0) { readyMs = Number((performance.now() - startT0).toFixed(2)); break; }
      } catch {}
      await new Promise((r) => setTimeout(r, 100));
    }

    const coldLogin = await timeReq("http://127.0.0.1:3011/auth/login");
    const warmLogins = [];
    for (let i = 0; i < 5; i++) warmLogins.push((await timeReq("http://127.0.0.1:3011/auth/login")).ms);

    const apiUnauth = [];
    for (let i = 0; i < 5; i++) apiUnauth.push((await timeReq("http://127.0.0.1:3011/api/admin/reports/calls")).ms);

    const apiCron = [];
    for (let i = 0; i < 5; i++) apiCron.push((await timeReq("http://127.0.0.1:3011/api/cron/ozonetel-campaign-sync", { headers: { Authorization: "Bearer bench_cron_secret_placeholder_32_chars" } })).ms);

    const rssMb = await getRssMb(proc.pid);
    const avg = (arr) => Number((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2));
    const report = {
      nextVersion: JSON.parse(fs.readFileSync(`${CRM_DIR}/node_modules/next/package.json`, "utf8")).version,
      reactVersion: JSON.parse(fs.readFileSync(`${CRM_DIR}/node_modules/react/package.json`, "utf8")).version,
      startupReadyMs: readyMs,
      coldLoginMs: coldLogin,
      warmLoginAvgMs: avg(warmLogins),
      apiUnauthAvgMs: avg(apiUnauth),
      apiCronValidAvgMs: avg(apiCron),
      serverRssMb: rssMb,
    };
    fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally {
    proc.kill("SIGTERM");
    mockSrv.close();
  }
}
run().catch((e) => { console.error(e); process.exit(1); });
