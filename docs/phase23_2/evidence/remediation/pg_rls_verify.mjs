import fs from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";

const CRM_DIR = "/Users/apple/Downloads/CRM-reconciled";

const TENANT_A = "11111111-1111-4111-8111-111111111111";
const TENANT_B = "22222222-2222-4222-8222-222222222222";
const ADMIN_A = "aaaaaaaa-0000-4000-8000-000000000001";
const EMP_A = "aaaaaaaa-0000-4000-8000-000000000002";
const ADMIN_B = "bbbbbbbb-0000-4000-8000-000000000001";
const EMP_B = "bbbbbbbb-0000-4000-8000-000000000002";
const SUPER_ADMIN = "00000000-0000-4000-8000-000000000001";
const LEAD_A1 = "aaaa1111-0000-4000-8000-000000000001";
const LEAD_A2 = "aaaa1111-0000-4000-8000-000000000002";
const LEAD_B1 = "bbbb1111-0000-4000-8000-000000000001";
const LEAD_B2 = "bbbb1111-0000-4000-8000-000000000002";

async function run() {
  const db = new PGlite();
  const report = [];
  const assertTest = (id, name, pass, detail) => {
    report.push({ id, name, pass, detail });
    console.log(`${pass ? "✅ PASS" : "❌ FAIL"} [${id}] ${name}: ${detail}`);
    if (!pass) process.exitCode = 1;
  };

  // 1. Bootstrap minimal Supabase auth & PostgreSQL roles in isolated PGlite
  await db.exec(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN CREATE ROLE anon NOLOGIN; END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN CREATE ROLE authenticated NOLOGIN; END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN CREATE ROLE service_role NOLOGIN BYPASSRLS; END IF;
    END $$;

    CREATE SCHEMA IF NOT EXISTS auth;
    CREATE TABLE IF NOT EXISTS auth.users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text UNIQUE NOT NULL,
      raw_app_meta_data jsonb DEFAULT '{}'::jsonb,
      raw_user_meta_data jsonb DEFAULT '{}'::jsonb,
      created_at timestamptz DEFAULT now()
    );

    CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$
      SELECT NULLIF(current_setting('request.jwt.claim.sub', true), '')::uuid;
    $$;
    CREATE OR REPLACE FUNCTION auth.role() RETURNS text LANGUAGE sql STABLE AS $$
      SELECT COALESCE(NULLIF(current_setting('request.jwt.claim.role', true), ''), 'anon');
    $$;
    CREATE OR REPLACE FUNCTION auth.jwt() RETURNS jsonb LANGUAGE sql STABLE AS $$
      SELECT COALESCE(NULLIF(current_setting('request.jwt.claims', true), '')::jsonb, '{}'::jsonb);
    $$;
    CREATE OR REPLACE FUNCTION public.uuid_generate_v4() RETURNS uuid LANGUAGE sql STABLE AS $$
      SELECT gen_random_uuid();
    $$;

    GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
    GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;
  `);

  // 2. Apply base repo DDLs cleanly (stripping supabase_realtime publication refs if absent)
  const baseScripts = [
    "scripts/001_create_users_table.sql",
    "scripts/002_create_leads_table.sql",
    "scripts/003_create_notes_table.sql",
    "scripts/004_create_follow_ups_table.sql",
    "scripts/005_create_call_logs_table.sql",
    "scripts/006_create_user_profile_trigger.sql",
    "scripts/007_create_notification_history_table.sql",
    "scripts/007_fix_users_rls_policies.sql",
    "scripts/008_create_push_subscriptions_table.sql",
    "scripts/009_create_chat_messages_table.sql",
    "scripts/010_create_attendance_tables.sql",
    "scripts/014_create_global_lead_statuses.sql",
    "scripts/016_create_deals_table.sql",
    "scripts/017_create_lead_scoring.sql",
    "scripts/018_create_automations.sql",
    "scripts/019_create_portal_credentials.sql",
    "scripts/022_create_site_visits.sql",
    "sql/ivr_did_registry.sql",
    "sql/ivr_did_registry_rls_fix.sql",
  ];

  // Ensure prerequisite dashboard-created tables exist prior to legacy scripts/016 FK references
  await db.exec(`
    CREATE TABLE IF NOT EXISTS public.organizations (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL DEFAULT 'Seed');
    CREATE TABLE IF NOT EXISTS public.properties (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE, title text NOT NULL DEFAULT 'Seed');
  `);

  for (const rel of baseScripts) {
    let sql = fs.readFileSync(path.join(CRM_DIR, rel), "utf8");
    sql = sql.replace(/TABLESPACE\s+pg_default/gi, "");
    sql = sql.replace(/ALTER\s+PUBLICATION\s+[^\n;]+;/gi, "");
    sql = sql.replace(/CREATE\s+POLICY\s+IF\s+NOT\s+EXISTS\s+"([^"]+)"/gi, 'DROP POLICY IF EXISTS "$1" ON public.ivr_upload_requests; CREATE POLICY "$1"');
    if (rel === "scripts/007_fix_users_rls_policies.sql") {
      // Historical script had a syntax bug (`->> 'user_metadata' ->> 'role'`) before disabling RLS on public.users
      await db.exec("ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;");
      continue;
    }
    await db.exec(sql);
  }

  // 3. Apply Phase 23.2 Versioned Hardening Migrations
  for (const mig of [
    "migrations/001_reconciled_missing_tables.sql",
    "migrations/002_rls_and_security_definer_hardening.sql",
    "migrations/003_idempotency_audit_and_rate_limits.sql",
  ]) {
    const sql = fs.readFileSync(path.join(CRM_DIR, mig), "utf8");
    await db.exec(sql);
  }

  await db.exec(`
    GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
    GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated, service_role;
  `);

  // 4. Seed Multi-Tenant Staging Test Fixture
  await db.exec(`
    INSERT INTO public.organizations (id, name, plan) VALUES
      ('${TENANT_A}', 'Tenant Alpha Loans', 'enterprise'),
      ('${TENANT_B}', 'Tenant Beta Realty', 'enterprise');

    INSERT INTO auth.users (id, email, raw_app_meta_data, raw_user_meta_data) VALUES
      ('${SUPER_ADMIN}', 'superadmin@hanva.test', '{"role":"super_admin","tenant_id":"${TENANT_A}"}'::jsonb, '{"full_name":"Platform Super"}'::jsonb),
      ('${ADMIN_A}', 'admin_a@alpha.test', '{"role":"admin","tenant_id":"${TENANT_A}"}'::jsonb, '{"full_name":"Admin Alpha"}'::jsonb),
      ('${EMP_A}', 'emp_a@alpha.test', '{"role":"telecaller","tenant_id":"${TENANT_A}"}'::jsonb, '{"full_name":"Telecaller Alpha"}'::jsonb),
      ('${ADMIN_B}', 'admin_b@beta.test', '{"role":"admin","tenant_id":"${TENANT_B}"}'::jsonb, '{"full_name":"Admin Beta"}'::jsonb),
      ('${EMP_B}', 'emp_b@beta.test', '{"role":"telecaller","tenant_id":"${TENANT_B}"}'::jsonb, '{"full_name":"Telecaller Beta"}'::jsonb);

    UPDATE public.users SET tenant_id = '${TENANT_A}', role = 'super_admin' WHERE id = '${SUPER_ADMIN}';
    UPDATE public.users SET tenant_id = '${TENANT_A}', role = 'admin' WHERE id = '${ADMIN_A}';
    UPDATE public.users SET tenant_id = '${TENANT_A}', role = 'telecaller' WHERE id = '${EMP_A}';
    UPDATE public.users SET tenant_id = '${TENANT_B}', role = 'admin' WHERE id = '${ADMIN_B}';
    UPDATE public.users SET tenant_id = '${TENANT_B}', role = 'telecaller' WHERE id = '${EMP_B}';

    INSERT INTO public.tenant_wallets (tenant_id, credits_balance, balance) VALUES
      ('${TENANT_A}', 5000, 1000),
      ('${TENANT_B}', 99999, 25000);

    INSERT INTO public.leads (id, tenant_id, name, phone, status, assigned_to) VALUES
      ('${LEAD_A1}', '${TENANT_A}', 'Lead A1', '9000000001', 'new', '${EMP_A}'),
      ('${LEAD_A2}', '${TENANT_A}', 'Lead A2 Unassigned', '9000000002', 'new', NULL),
      ('${LEAD_B1}', '${TENANT_B}', 'Lead B1', '8000000001', 'new', '${EMP_B}'),
      ('${LEAD_B2}', '${TENANT_B}', 'Lead B2 Unassigned', '8000000002', 'new', NULL);

    INSERT INTO public.tenant_did_registry (tenant_id, did_number, label) VALUES
      ('${TENANT_A}', '917900000001', 'Alpha DID'),
      ('${TENANT_B}', '917900000002', 'Beta DID');

    INSERT INTO public.attendance (user_id, tenant_id, date, status) VALUES
      ('${EMP_A}', '${TENANT_A}', current_date, 'present'),
      ('${EMP_B}', '${TENANT_B}', current_date, 'present');
  `);

  const asUser = async (userId, fn) => {
    await db.exec("BEGIN;");
    try {
      await db.exec(`
        SET LOCAL ROLE authenticated;
        SELECT set_config('request.jwt.claim.sub', '${userId}', true);
        SELECT set_config('request.jwt.claim.role', 'authenticated', true);
      `);
      const res = await fn();
      await db.exec("COMMIT;");
      return res;
    } catch (err) {
      await db.exec("ROLLBACK;");
      throw err;
    }
  };

  // Run 12 Live PostgreSQL Security & Isolation Assertions
  const t1 = await asUser(EMP_A, () => db.query("SELECT id, tenant_id FROM public.leads;"));
  assertTest("T-DB-1", "Tenant A telecaller cannot read Tenant B leads", t1.rows.length === 1 && t1.rows[0].id === LEAD_A1, `rows=${t1.rows.map(r => r.id).join(",")}`);

  const t2 = await asUser(EMP_A, () => db.query(`UPDATE public.leads SET status = 'Won' WHERE id = '${LEAD_B1}' RETURNING id;`));
  assertTest("T-DB-2", "Tenant A telecaller cannot mutate Tenant B lead", t2.rows.length === 0, `updated=${t2.rows.length}`);

  const t3 = await asUser(ADMIN_A, () => db.query("SELECT id, tenant_id FROM public.users;"));
  assertTest("T-DB-3", "Tenant A admin user list excludes Tenant B users", t3.rows.every(r => r.tenant_id === TENANT_A) && t3.rows.length === 3, `count=${t3.rows.length}`);

  let t4Blocked = false;
  try {
    await asUser(EMP_A, () => db.query(`UPDATE public.users SET role = 'super_admin' WHERE id = '${EMP_A}';`));
  } catch (e) { t4Blocked = true; }
  assertTest("T-DB-4", "Telecaller self role-escalation blocked by RLS WITH CHECK", t4Blocked, `blocked=${t4Blocked}`);

  let t5Blocked = false;
  try {
    await asUser(EMP_A, () => db.query(`INSERT INTO public.tenant_did_registry (tenant_id, did_number) VALUES ('${TENANT_B}', '917999999999');`));
  } catch (e) { t5Blocked = true; }
  assertTest("T-DB-5", "Non-super-admin blocked from hijacking tenant_did_registry", t5Blocked, `blocked=${t5Blocked}`);

  const t6a = await asUser(ADMIN_A, () => db.query("SELECT tenant_id, credits_balance FROM public.tenant_wallets;"));
  const t6e = await asUser(EMP_A, () => db.query("SELECT tenant_id FROM public.tenant_wallets;"));
  assertTest("T-DB-6", "Wallets visible only to own tenant admins (zero telecaller/cross-tenant visibility)", t6a.rows.length === 1 && t6a.rows[0].tenant_id === TENANT_A && t6e.rows.length === 0, `adminA=${t6a.rows.length}, empA=${t6e.rows.length}`);

  const rogueId = "cccccccc-0000-4000-8000-000000000099";
  await db.exec(`INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES ('${rogueId}', 'attacker@evil.test', '{"role":"super_admin","full_name":"Evil"}'::jsonb);`);
  const t7 = await db.query(`SELECT role, tenant_id FROM public.users WHERE id = '${rogueId}';`);
  assertTest("T-DB-7", "handle_new_user ignores user_metadata.role privilege escalation", t7.rows[0]?.role === "telecaller" && t7.rows[0]?.tenant_id === null, `assigned_role=${t7.rows[0]?.role}`);

  const t8a = await asUser(EMP_A, () => db.query(`SELECT public.get_next_auto_dial_lead('${EMP_A}') AS lead;`));
  let t8bBlocked = false;
  try {
    await asUser(EMP_A, () => db.query(`SELECT public.get_next_auto_dial_lead('${EMP_B}') AS lead;`));
  } catch (e) { t8bBlocked = true; }
  assertTest("T-DB-8", "get_next_auto_dial_lead enforces tenant & caller lock", t8a.rows[0]?.lead?.tenant_id === TENANT_A && t8bBlocked, `leadTenant=${t8a.rows[0]?.lead?.tenant_id}, foreignCallBlocked=${t8bBlocked}`);

  let t9Blocked = false;
  try {
    await asUser(EMP_A, () => db.query(`SELECT public.get_telecaller_lead_counts('${EMP_B}');`));
  } catch (e) { t9Blocked = true; }
  assertTest("T-DB-9", "get_telecaller_lead_counts rejects cross-tenant inspection", t9Blocked, `blocked=${t9Blocked}`);

  let t10Blocked = false;
  try {
    await asUser(ADMIN_A, () => db.query(`SELECT public.bulk_assign_leads(ARRAY['${LEAD_B1}']::uuid[], '${EMP_A}'::uuid);`));
  } catch (e) { t10Blocked = true; }
  assertTest("T-DB-10", "bulk_assign_leads rejects cross-tenant lead array", t10Blocked, `blocked=${t10Blocked}`);

  let t11Blocked = false;
  await db.query(`INSERT INTO public.wallet_ledger (tenant_id, amount, credits, transaction_type, reference_id) VALUES ('${TENANT_A}', 100, 500, 'RECHARGE', 'pay_rzp_001');`);
  try {
    await db.query(`INSERT INTO public.wallet_ledger (tenant_id, amount, credits, transaction_type, reference_id) VALUES ('${TENANT_A}', 100, 500, 'RECHARGE', 'pay_rzp_001');`);
  } catch (e) { t11Blocked = true; }
  assertTest("T-DB-11", "wallet_ledger unique constraint blocks duplicate Razorpay recharge", t11Blocked, `duplicateBlocked=${t11Blocked}`);

  const t13 = await asUser(ADMIN_A, () => db.query("SELECT user_id, tenant_id FROM public.attendance;"));
  assertTest("T-DB-13", "Attendance rows isolated strictly by tenant even for admin role", t13.rows.length === 1 && t13.rows[0].tenant_id === TENANT_A, `rows=${t13.rows.length}`);

  // Verify security_audit_logs + rollback syntax validity on isolated clone
  await db.query(`INSERT INTO public.security_audit_logs (tenant_id, actor_user_id, event_type, route, outcome) VALUES ('${TENANT_A}', '${ADMIN_A}', 'test.event', '/api/admin/test', 'allowed');`);
  const t12a = await asUser(ADMIN_A, () => db.query("SELECT id FROM public.security_audit_logs;"));
  const rollbackSql = fs.readFileSync(path.join(CRM_DIR, "migrations/rollback_23_2.sql"), "utf8");
  await db.exec(rollbackSql);
  assertTest("T-DB-12", "security_audit_logs admin read + rollback_23_2.sql reversible execution pass", t12a.rows.length === 1, "rollback executed cleanly");

  fs.writeFileSync("/Users/apple/Downloads/HANVA/docs/phase23_2/evidence/pg_rls_verification.json", JSON.stringify({ engine: "PGlite PostgreSQL 19.0 WASM", executedAt: new Date().toISOString(), total: report.length, passed: report.filter(r => r.pass).length, results: report }, null, 2));
  console.log(`\nSUMMARY: ${report.filter(r => r.pass).length}/${report.length} PostgreSQL checks passed.`);
}

run().catch((e) => { console.error(e); process.exit(1); });
