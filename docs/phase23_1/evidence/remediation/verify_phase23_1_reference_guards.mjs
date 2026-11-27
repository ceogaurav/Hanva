#!/usr/bin/env node
/**
 * Isolated Phase 23.1 Reference Security Guard Verification
 * Compiles & executes the actual TypeScript reference module (`crm_security_guard_reference.ts`)
 * strictly offline with zero production DB calls and zero CRM workspace mutation.
 */

import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const compiledPath =
  "/Users/apple/.gemini/antigravity/brain/5dd5a464-4d64-4198-8b93-df6241973fc8/scratch/compiled_guards/crm_security_guard_reference.js";
const guards = require(compiledPath);

const results = [];
function test(name, fn) {
  try {
    fn();
    results.push({ name, ok: true });
    console.log(`[PASS] ${name}`);
  } catch (err) {
    results.push({ name, ok: false, error: String(err) });
    console.error(`[FAIL] ${name}:`, err);
    process.exitCode = 1;
  }
}

// 1. Fail-closed secret & cron verification
test("require_server_secret_fails_closed_when_missing", () => {
  delete process.env.CRON_SECRET;
  assert.throws(() => guards.requireServerSecret("CRON_SECRET", 24), /Missing or insufficient/);
});

test("cron_rejects_bearer_undefined_when_secret_unset", () => {
  delete process.env.CRON_SECRET;
  const res = guards.verifyCronAuthorization("Bearer undefined");
  assert.equal(res.ok, false);
  assert.equal(res.reason, "CRON_SECRET_UNCONFIGURED");
});

test("cron_rejects_wrong_secret_when_real_secret_set", () => {
  process.env.CRON_SECRET = "9f2a".repeat(8);
  const res = guards.verifyCronAuthorization("Bearer synthetic_wrong_secret_000");
  assert.equal(res.ok, false);
  assert.equal(res.reason, "INVALID_CRON_TOKEN");
});

test("cron_accepts_valid_bearer_secret", () => {
  const sec = "9f2a".repeat(8);
  process.env.CRON_SECRET = sec;
  const res = guards.verifyCronAuthorization(`Bearer ${sec}`);
  assert.equal(res.ok, true);
});

// 2. Webhook fail-closed HMAC & timestamp replay protection
const testSecret = "synthetic_test_hmac_secret_32chars";
const rawBody = JSON.stringify({ event: "payment.captured", tenant_id: "tenant_a" });

test("webhook_rejects_missing_signature_fixes_razorpay_fail_open", () => {
  process.env.RAZORPAY_WEBHOOK_SECRET = testSecret;
  const res = guards.verifyHmacWebhook({
    rawBody,
    signatureHeader: null,
    secretEnvName: "RAZORPAY_WEBHOOK_SECRET",
  });
  assert.equal(res.ok, false);
  assert.equal(res.reason, "MISSING_SIGNATURE");
});

test("webhook_rejects_tampered_payload", () => {
  process.env.TEST_WEBHOOK_SECRET = testSecret;
  const ts = String(Math.floor(Date.now() / 1000));
  const sig = "v1=" + createHmac("sha256", testSecret).update(`${ts}.${rawBody}`).digest("hex");
  const tampered = JSON.stringify({ event: "payment.captured", tenant_id: "tenant_b" });
  const res = guards.verifyHmacWebhook({
    rawBody: tampered,
    signatureHeader: sig,
    secretEnvName: "TEST_WEBHOOK_SECRET",
    timestampHeader: ts,
    signaturePrefix: "v1=",
  });
  assert.equal(res.ok, false);
  assert.equal(res.reason, "SIGNATURE_MISMATCH");
});

test("webhook_rejects_stale_replay_over_300s", () => {
  process.env.TEST_WEBHOOK_SECRET = testSecret;
  const staleTs = String(Math.floor(Date.now() / 1000) - 600);
  const sig = "v1=" + createHmac("sha256", testSecret).update(`${staleTs}.${rawBody}`).digest("hex");
  const res = guards.verifyHmacWebhook({
    rawBody,
    signatureHeader: sig,
    secretEnvName: "TEST_WEBHOOK_SECRET",
    timestampHeader: staleTs,
    signaturePrefix: "v1=",
  });
  assert.equal(res.ok, false);
  assert.equal(res.reason, "STALE_OR_INVALID_TIMESTAMP");
});

test("webhook_accepts_valid_hmac_and_fresh_timestamp", () => {
  process.env.TEST_WEBHOOK_SECRET = testSecret;
  const ts = String(Math.floor(Date.now() / 1000));
  const sig = "v1=" + createHmac("sha256", testSecret).update(`${ts}.${rawBody}`).digest("hex");
  const res = guards.verifyHmacWebhook({
    rawBody,
    signatureHeader: sig,
    secretEnvName: "TEST_WEBHOOK_SECRET",
    timestampHeader: ts,
    signaturePrefix: "v1=",
  });
  assert.equal(res.ok, true);
});

// 3. Tenant isolation & privilege escalation guards
test("tenant_context_blocks_cross_tenant_override_by_tenant_admin", () => {
  const res = guards.resolveAuthoritativeTenantId({
    sessionContext: {
      userId: "user-a",
      tenantId: "tenant-aaa",
      role: "tenant_admin",
      isActive: true,
    },
    requestedTenantId: "tenant-bbb",
  });
  assert.equal(res.ok, false);
  assert.equal(res.reason, "CROSS_TENANT_OVERRIDE_FORBIDDEN");
});

test("role_hierarchy_blocks_tenant_admin_granting_super_admin", () => {
  const res = guards.assertCanGrantRole("tenant_admin", "super_admin");
  assert.equal(res.allowed, false);
});

test("role_hierarchy_blocks_telecaller_granting_any_role", () => {
  const res = guards.assertCanGrantRole("telecaller", "admin");
  assert.equal(res.allowed, false);
});

// 4. Redacted zero-PII audit record
test("audit_record_redacts_phone_or_email", () => {
  const rec = guards.buildSafeSecurityAuditRecord({
    eventType: "lead_bulk_assigned",
    actorUserId: "user-1",
    tenantId: "tenant-aaa",
    route: "/api/admin/leads/bulk-assign",
    outcome: "allowed",
    targetPhoneOrEmail: "+919876543210",
    resourceCount: 5,
  });
  const serialized = JSON.stringify(rec);
  assert.equal(serialized.includes("9876543210"), false);
  assert.match(rec.subject_digest, /^sha256:[a-f0-9]{12}$/);
});

// 5. Website fail-closed state & SQL remediation assertions
test("hanva_production_crm_integration_remains_blocked", () => {
  const adapterTxt = fs.readFileSync("/Users/apple/Downloads/HANVA/lib/leads/crm-adapter.ts", "utf8");
  const envExampleTxt = fs.readFileSync("/Users/apple/Downloads/HANVA/.env.example", "utf8");
  assert.match(adapterTxt, /CRM_STAGE_A_SECURITY_APPROVED !== "true"/);
  assert.match(envExampleTxt, /CRM_STAGE_A_SECURITY_APPROVED=false/);
});

test("sql_migration_re_enables_users_rls_and_scopes_definer_rpcs", () => {
  const sqlTxt = fs.readFileSync(
    "/Users/apple/Downloads/HANVA/docs/phase23_1/evidence/remediation/staging_migration_01_rls_and_security_definer.sql",
    "utf8"
  );
  assert.match(sqlTxt, /ALTER TABLE public\.users ENABLE ROW LEVEL SECURITY/);
  assert.match(sqlTxt, /SET search_path = public/);
  assert.match(sqlTxt, /REVOKE ALL ON FUNCTION public\.get_next_auto_dial_lead\(uuid\) FROM PUBLIC/);
  assert.match(sqlTxt, /REVOKE ALL ON FUNCTION public\.get_telecaller_lead_counts\(uuid\) FROM PUBLIC/);
});

fs.writeFileSync(
  "/Users/apple/Downloads/HANVA/docs/phase23_1/evidence/phase23_1_reference_tests.json",
  JSON.stringify({ total: results.length, passed: results.filter((r) => r.ok).length, results }, null, 2)
);
console.log(`\nReference security tests completed: ${results.filter((r) => r.ok).length}/${results.length} passed.`);
