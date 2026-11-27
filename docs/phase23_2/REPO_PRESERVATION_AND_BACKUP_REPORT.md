# REPOSITORY PRESERVATION AND BACKUP REPORT

**Date:** 2026-11-27  
**Preserved Targets:** `/Users/apple/Downloads/CRM` (`gauravhotstar/CRM` + dirty local tree), `https://github.com/seobanks/CRM.git`, `/Users/apple/Downloads/hanva-telecaller-android`, `/Users/apple/Downloads/HANVA`

---

## 1. Preservation Actions Completed Before Any Code Mutation

Before creating `/Users/apple/Downloads/CRM-reconciled` or editing any CRM source file, immutable offline archives and Git bundles were created under scratch storage (`/Users/apple/.gemini/antigravity/brain/5dd5a464-4d64-4198-8b93-df6241973fc8/scratch/backups_23_2/`) and checksummed in `evidence/preservation_checksums.sha256`:

| Archive File | Contents & Exclusion Safeguards | SHA-256 Digest |
| --- | --- | --- |
| `crm_gauravhotstar_local_3d3f81a7.bundle` | Full git bundle of `/Users/apple/Downloads/CRM` (`HEAD = 3d3f81a7`) | `1facb30f0b92ec06d4bbbd8fba1e921627a6e4145e2e77a827dd35694bb33c51` |
| `crm_local_working_tree_preserved.tar.gz` | Secret-free archive of dirty working tree (`node_modules`, `.next`, `.env*`, and `recovered_failed_leads.json` excluded) | `587bfb11bd9c96fdd71a515931902a6f2437ca7ea6893855777a22324c4e0ded` |
| `crm_seobanks_bec603f9.bundle` | Full git bundle of `https://github.com/seobanks/CRM.git` (`HEAD = bec603f9`, +10 upstream commits) | `76555fe9721927be04ce20b0cd06706a046771e529ec771da10216c2a547cedd` |
| `crm_seobanks_bec603f9_src.tar.gz` | Clean source snapshot of `seobanks/CRM` @ `bec603f9` | `308791ee921e6c97c427ec01afb84dade489c72c24933178eff1935f9f21a89c` |

---

## 2. Integrity Guarantees Across Original Workspaces

1. **`/Users/apple/Downloads/CRM` (Untouched):** Remains on `main` @ `3d3f81a` with its original `75` uncommitted working-tree paths untouched so emergency rollbacks or local inspections never lose in-flight state.
2. **`/Users/apple/Downloads/hanva-telecaller-android` (Read-Only):** Zero edits, builds, or key/manifest modifications were performed.
3. **`/Users/apple/Downloads/HANVA` (Isolated Website):** Application code (`c5ec9928`) remains unmodified; only documentation artifacts under `docs/phase23_2/` were added.
4. **GitHub Remotes (Unmodified):** Neither `gauravhotstar/CRM` nor `seobanks/CRM` was pushed to. Reconciled history lives strictly on local worktree branch `security/phase-23-2-reconciled` in `/Users/apple/Downloads/CRM-reconciled` (`6cebadb` -> `4ee83f0` -> `122466d`).
