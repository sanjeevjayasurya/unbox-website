# TipTap JSON as WordPress body of record

**Date:** 2026-07-16  
**Status:** Approved  
**Scope:** Blogs (`post`) and case studies (`case_study`) on the Hostinger WordPress CMS + Next.js adapter

## Problem

- The Next app’s `TiptapContent` already renders **TipTap JSON** (`{ type: "doc", content: [...] }`) and treats HTML strings as a legacy fallback.
- The old Unbox admin API serves TipTap JSON for blog/case-study bodies.
- The WordPress import path converted TipTap → HTML into `post_content` and dropped the JSON. Public REST then exposes that HTML as `content.rendered`.
- Imported HTML is large (~0.5–1MB/post) and includes broken image URLs (base64 data URIs wrongly prefixed with the old admin host). That blows past Next’s ~2MB fetch Data Cache when list endpoints include bodies.

## Goal

WordPress stores and serves **TipTap JSON** as the canonical body. Next consumes that JSON (not Gutenberg HTML) for detail pages. List/featured/recent keep omitting bodies so caching stays healthy. Inline images become **Media Library URLs**, not base64.

## Non-goals (this iteration)

- Building a TipTap WYSIWYG inside wp-admin (can come later on the same field).
- Migrating PR news / white papers / legal pages.
- Changing lead-capture / PDF download flows.
- Removing Gutenberg entirely from WordPress (it can remain unused or hold a short admin-only preview).

---

## 1. Content contract

| Field | Source of truth | Consumers |
|---|---|---|
| Title, slug, excerpt, dates, featured image | WP post fields | List cards, SEO, detail chrome |
| Body | TipTap JSON in post meta `content_json` | Detail pages via `TiptapContent` |
| Quote / featured / case-study extras | Existing post meta / ACF-shaped meta | Detail + cards (unchanged) |
| `post_content` (Gutenberg HTML) | Optional; not used by the site | WP admin preview only (may be empty or a short plain summary) |

**Parsed `content` shape in the Next app (unchanged):**

- Prefer object: `{ type: "doc", content: Node[] }`
- Fallback: HTML string (legacy / mock fixtures only)

---

## 2. WordPress storage

### Register meta (posts + `case_study`)

Register `content_json` with `show_in_rest: true`, type `string` (JSON text), auth callback allowing public **read** and capability-gated **write**.

Expose on REST as:

```json
"meta": {
  "content_json": "{\"type\":\"doc\",\"content\":[...]}"
}
```

(Alternatively register as an object schema if WP version/plugins make that reliable; string + `json_decode` on the client is fine and matches how many headless setups store TipTap.)

Also keep existing meta keys (`featured`, `quote_*`, case-study fields, etc.).

### Theme / MU plugin home

Today the prod importer lives in the Twenty Twenty-Five `functions.php` (`/unbox/v1/import-prod`). Prefer moving Unbox PHP (meta registration + importer) into an MU plugin file under `wp-content/mu-plugins/` so theme updates do not wipe it. If moving is inconvenient short-term, update `functions.php` in place and document the markers.

---

## 3. Import pipeline changes

Update `POST /wp-json/unbox/v1/import-prod` (admin-only) to:

1. Fetch TipTap JSON from the Unbox admin API (as today).
2. **Walk the TipTap tree** and for every `image` / `imageBlock` (and similar) `src`:
   - If `data:` base64 → decode, sideload into Media Library, replace `src` with the attachment URL.
   - If relative / old-admin URL → sideload (or rewrite) to a Hostinger media URL.
   - Never prepend the admin host onto `data:` URLs.
3. Persist the **rewritten TipTap doc** as `content_json` meta.
4. Set `post_content` to either empty, a plain-text excerpt, or a minimal HTML preview **without** inlining base64 (do not use the current lossy HTML dump as the site body).
5. Keep existing featured-image / quote-image / PDF sideloads.

Re-run import for all published blogs and case studies after deploy so REST returns lean TipTap JSON with real media URLs.

**Success check (per post):**

- `meta.content_json` parses to `{ type: "doc", ... }`
- No `data:image` in `content_json`
- Detail payload size typically tens of KB, not ~1MB
- Site detail page renders via TipTap nodes (not `dangerouslySetInnerHTML` HTML path)

---

## 4. Next.js adapter (`src/lib/wordpress.js`)

### Resolve body

```text
content =
  parseJson(meta.content_json | acf.content_json)
  ?? post.content.rendered   // string fallback only
```

`parseJson` returns an object when valid TipTap doc; otherwise ignore.

### `_fields` / cache policy (keep)

| Call | Include body? |
|---|---|
| List / featured / recent (`LIST_FIELDS`) | **No** — omit `content` and `content_json` / do not request full meta blob |
| By slug (`DETAIL_FIELDS`) | **Yes** — include `meta` (or specifically `content_json`) plus existing detail fields |

Mocks in `resourceMocks.js` should use TipTap JSON objects where they currently use HTML strings (or keep HTML only for the string fallback path).

### SEO (`src/lib/seo.js`)

Descriptions already prefer excerpt; if falling back to body text, strip from TipTap JSON (walk text nodes) instead of HTML when `content` is an object. Small helper; no UI change.

### UI components

No change required to `BlogsDetails` / `CaseStudyDetails` / `TiptapContent` once `content` is a TipTap object. Verify `imageBlock` nodes still render (they do today).

---

## 5. Authoring (v1)

- **Primary:** re-import from Unbox admin; optional raw JSON edit via meta/custom field for fixes.
- **Later (out of scope):** TipTap editor in wp-admin writing the same `content_json` field.

Editors should not rely on the block editor for site body until a TipTap UI exists.

---

## 6. Docs / ops

Update `docs/wordpress-setup.md`:

- Body = `content_json` TipTap JSON, not `post_content` HTML.
- Document re-import steps and the media-rewrite rule.
- Note list endpoints must not fetch `content_json`.

---

## 7. Implementation order

1. Register `content_json` meta + expose on REST (posts + case studies).
2. Update importer: store TipTap JSON + rewrite/sideload images.
3. Re-run import; spot-check REST payload size and image URLs.
4. Update Next `mapBlogPost` / `mapCaseStudyPost` (+ SEO text helper + mocks).
5. Smoke-test `/blogs/[slug]` and `/case-study/[slug]` locally against Hostinger.
6. Update wordpress-setup doc.

## 8. Risks

| Risk | Mitigation |
|---|---|
| Theme update wipes importer | Move to MU plugin |
| Base64 sideload failures | Log per-image failures; leave placeholder or skip node; import still stores JSON |
| Meta not in REST without registration | Explicit `register_post_meta` with `show_in_rest` |
| List payloads still huge if someone adds `content_json` to list `_fields` | Keep `LIST_FIELDS` without it; document in setup |

## 9. Open decisions (defaults assumed)

| Topic | Default in this spec |
|---|---|
| Meta key name | `content_json` |
| `post_content` after import | Empty or plain excerpt (not full HTML dump) |
| Public REST read of `content_json` | Allowed (needed for Next server + optional client) |
| TipTap admin UI | Deferred |
