# Task 5 Report — WordPress prod import

**Status:** Complete (Important fix applied)

**Branch:** `feat/tiptap-json-cms`

## Changes

- `unbox_find_existing_attachment()` now reuses attachments only when `_unbox_import_source` hash matches the incoming source URL.
- Filename-only fallback applies only to legacy attachments with no stored hash; hash is backfilled on first match so later re-imports can detect content changes.
- When stored hash differs from incoming source, import sideloads a new attachment instead of reusing stale `slug-inline-N.webp` files.

## Commits

| SHA | Message |
|-----|---------|
| `3eb4d36` | fix: require source hash match for attachment reuse |

## Quality fix (Important)

**Problem:** Stable inline filenames (`slug-inline-1.webp`) caused stale Media Library files to be reused on re-import when TipTap image content changed but the slot index stayed the same.

**Fix:** Skip filename fallback when a stored hash exists and differs from the incoming source. Legacy no-hash attachments still match by filename once, then receive `_unbox_import_source` for future hash-based matching.

## Verification

- [x] Hash match reuses existing attachment
- [x] Hash mismatch sideloads new attachment (no filename-only reuse)
- [x] Legacy no-hash attachment matches by filename and backfills hash
- [x] Pagination + overall import flow unchanged

## Final branch review fix

- Media filename arguments are now basename hints: data URLs receive the extension sniffed from their MIME type, while remote files prefer a recognized URL extension and otherwise sniff the downloaded file before falling back to a hint extension.
- Import call sites no longer force `.webp`, `.jpg`, or `.png`; this prevents WordPress from rejecting JPEG, PNG, GIF, and other valid media under a mismatched filename.
- `unbox_fetch_all_pages()` now stops after page 100 as a soft safety limit.
- `npm test` passed (6 tests). PHP CLI is unavailable in this environment, so `php -l` could not be run.
