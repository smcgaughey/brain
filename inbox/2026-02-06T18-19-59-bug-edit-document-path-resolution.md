# Bug Report: edit_document Path Resolution Issue

**Date:** 2026-02-06
**Context:** Trying to update the daily log file after initial creation

## What Happened

1. **`create_document`** at `knowledge/work/daily/2026-02-06.md` → ✅ **Success**

2. **`edit_document`** at `knowledge/work/daily/2026-02-06.md` → ❌ **"File not found"**
   - Suggested: `brains/971f7139-311d-410e-b6ec-5c6e34935c31/knowledge/work/daily/2026-02-06.md`

3. **`edit_document`** at the suggested full path `brains/971f7139.../knowledge/work/daily/2026-02-06.md` → ❌ **"File not found"**
   - Suggested: `knowledge/work/daily/2026-02-06.md` (the original path!)

4. **`get_document`** at `knowledge/work/daily/2026-02-06.md` → ❌ **"Document not found"**

5. **`create_document`** at `knowledge/work/daily/2026-02-06.md` → ❌ **"File already exists"**

## Summary

The file exists (create confirms it) but neither `edit_document` nor `get_document` can resolve the path. The two error messages ping-pong between the short path and the full `brains/{uuid}/...` path, each suggesting the other. This creates a deadlock where the file is **not editable after creation**.

## Possible Causes

- Path resolution may work differently for `create_document` vs `edit_document`/`get_document`
- The `brains/{uuid}/` prefix may need to be included for read/edit but excluded for create, or vice versa — but neither works for edit
- Could be a race condition if the file index hasn't updated after creation
- The "did you mean" suggestions creating a circular loop suggests the path matching logic may have a bug when files are in newly created subdirectories (the `daily/` folder didn't exist before this file was created)

## Impact

Daily workflow depends on creating a log in the morning and editing it throughout the day. If `edit_document` can't update files after creation, the workflow breaks. Workaround was logging updates via `inbox` notes and the `update` tool instead.
