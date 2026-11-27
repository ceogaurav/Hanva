/**
 * Hanva Technologies — Bounded Lead Idempotency & Cooldown Deduplication Store
 * Phase 23 (Stage D): Non-destructive retry & cooldown protection preventing duplicate CRM inserts
 * or accidental overwrite of existing telecaller notes/status.
 */

import { sha256Hex } from "@/lib/leads/security";
import type { NormalizedLeadRecord } from "@/lib/leads/schema";

const DEDUPE_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const MAX_STORE_ENTRIES = 2000;

interface StoredDedupeEntry {
  leadReference: string;
  idempotencyKey: string;
  dedupeFingerprint: string;
  payloadHash: string;
  createdAtMs: number;
}

export type DedupeDecision =
  | { action: "create"; leadReference: string }
  | { action: "duplicate_replay"; leadReference: string }
  | { action: "idempotency_conflict" }
  | { action: "duplicate_conflict"; leadReference: string };

const entriesByIdempotencyKey = new Map<string, StoredDedupeEntry>();
const entriesByFingerprint = new Map<string, StoredDedupeEntry>();

function pruneExpired(nowMs: number): void {
  if (entriesByIdempotencyKey.size < MAX_STORE_ENTRIES && entriesByFingerprint.size < MAX_STORE_ENTRIES) {
    return;
  }

  for (const [key, entry] of entriesByIdempotencyKey.entries()) {
    if (nowMs - entry.createdAtMs > DEDUPE_COOLDOWN_MS) {
      entriesByIdempotencyKey.delete(key);
    }
  }
  for (const [fp, entry] of entriesByFingerprint.entries()) {
    if (nowMs - entry.createdAtMs > DEDUPE_COOLDOWN_MS) {
      entriesByFingerprint.delete(fp);
    }
  }
}

export function generateLeadReference(seed: string): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = sha256Hex(`${seed}|${Date.now()}|${Math.random()}`).slice(0, 8).toUpperCase();
  return `HNV-${datePart}-${suffix}`;
}

export function evaluateLeadDeduplication(lead: NormalizedLeadRecord): DedupeDecision {
  const nowMs = Date.now();
  pruneExpired(nowMs);

  const existingByKey = entriesByIdempotencyKey.get(lead.idempotencyKey);
  if (existingByKey && nowMs - existingByKey.createdAtMs <= DEDUPE_COOLDOWN_MS) {
    if (existingByKey.payloadHash === lead.payloadHash) {
      return { action: "duplicate_replay", leadReference: existingByKey.leadReference };
    }
    return { action: "idempotency_conflict" };
  }

  const existingByFp = entriesByFingerprint.get(lead.dedupeFingerprint);
  if (existingByFp && nowMs - existingByFp.createdAtMs <= DEDUPE_COOLDOWN_MS) {
    return { action: "duplicate_conflict", leadReference: existingByFp.leadReference };
  }

  return {
    action: "create",
    leadReference: generateLeadReference(lead.idempotencyKey),
  };
}

export function commitLeadDeduplication(lead: NormalizedLeadRecord, leadReference: string): void {
  const entry: StoredDedupeEntry = {
    leadReference,
    idempotencyKey: lead.idempotencyKey,
    dedupeFingerprint: lead.dedupeFingerprint,
    payloadHash: lead.payloadHash,
    createdAtMs: Date.now(),
  };
  entriesByIdempotencyKey.set(lead.idempotencyKey, entry);
  entriesByFingerprint.set(lead.dedupeFingerprint, entry);
}
