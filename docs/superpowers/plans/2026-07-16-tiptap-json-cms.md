# TipTap JSON CMS Body Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve TipTap JSON from WordPress (`meta.content_json`) as the canonical blog/case-study body, rewrite base64 images to Media Library URLs on import, and consume that JSON in the Next.js adapter.

**Architecture:** A versioned MU plugin in-repo (`wordpress/mu-plugins/unbox-headless.php`) registers `content_json`, exposes it on REST, and updates `/unbox/v1/import-prod` to store rewritten TipTap docs. Next.js pure helpers parse TipTap JSON and plain-text; `wordpress.js` maps detail responses to TipTap objects; list fetches continue to omit bodies for the 2MB fetch-cache limit.

**Tech Stack:** WordPress REST + post meta, Next.js 16, Node built-in test runner (`node --test`), existing `TiptapContent` renderer.

**Spec:** [`docs/superpowers/specs/2026-07-16-tiptap-json-cms-design.md`](../specs/2026-07-16-tiptap-json-cms-design.md)

## Global Constraints

- Meta key name: `content_json` (string of TipTap JSON).
- Public REST **read** of `content_json` allowed; write gated by `edit_posts` / `edit_post`.
- List / featured / recent must **not** request `content`, `content_json`, or full `meta` (keep `LIST_FIELDS` lean).
- Detail fetches include `meta` so `content_json` is available.
- Prefer TipTap object for `content`; HTML string only as legacy/mock fallback.
- After import, `post_content` is empty or plain excerpt — not a full HTML dump with base64.
- No TipTap wp-admin UI in this plan.
- Commits: conventional commits (`feat`, `fix`, `docs`, `test`, `chore`); only when the executing agent is asked to commit or the task step explicitly commits locally.

---

## File structure

| File | Responsibility |
|---|---|
| `src/lib/wordpressContent.js` | Pure helpers: parse TipTap JSON from meta, TipTap → plain text |
| `src/lib/wordpressContent.test.js` | Node test runner coverage for those helpers |
| `src/lib/wordpress.js` | WP fetch + map posts; use helpers for `content` |
| `src/lib/seo.js` | Description fallback when `content` is TipTap object |
| `src/data/resourceMocks.js` | Mock bodies as TipTap docs |
| `wordpress/mu-plugins/unbox-headless.php` | Meta registration + import-prod (source of truth for Hostinger) |
| `docs/wordpress-setup.md` | Operator docs for body field + re-import |
| `package.json` | Add `"test": "node --test src/lib/**/*.test.js"` |

---

### Task 1: TipTap content helpers + tests

**Files:**
- Create: `src/lib/wordpressContent.js`
- Create: `src/lib/wordpressContent.test.js`
- Modify: `package.json` (add `test` script)

**Interfaces:**
- Consumes: nothing
- Produces:
  - `parseContentJson(raw: unknown): { type: "doc", content?: unknown[] } | null`
  - `tiptapToPlainText(doc: unknown): string`

- [ ] **Step 1: Add the test script**

In `package.json` scripts, add:

```json
"test": "node --test src/lib/**/*.test.js"
```

- [ ] **Step 2: Write failing tests**

Create `src/lib/wordpressContent.test.js`:

```js
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  parseContentJson,
  tiptapToPlainText,
} from "./wordpressContent.js";

describe("parseContentJson", () => {
  it("returns null for empty input", () => {
    assert.equal(parseContentJson(null), null);
    assert.equal(parseContentJson(""), null);
  });

  it("parses a TipTap doc string", () => {
    const doc = {
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "Hi" }] }],
    };
    assert.deepEqual(parseContentJson(JSON.stringify(doc)), doc);
  });

  it("accepts an already-parsed TipTap doc object", () => {
    const doc = { type: "doc", content: [] };
    assert.deepEqual(parseContentJson(doc), doc);
  });

  it("rejects non-doc JSON", () => {
    assert.equal(parseContentJson('{"type":"paragraph"}'), null);
    assert.equal(parseContentJson("not-json"), null);
  });
});

describe("tiptapToPlainText", () => {
  it("walks text nodes", () => {
    const doc = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Hello" },
            { type: "text", text: " world" },
          ],
        },
      ],
    };
    assert.equal(tiptapToPlainText(doc), "Hello world");
  });

  it("returns empty string for non-objects", () => {
    assert.equal(tiptapToPlainText(null), "");
    assert.equal(tiptapToPlainText("<p>Hi</p>"), "");
  });
});
```

- [ ] **Step 3: Run tests — expect FAIL**

Run: `npm test`

Expected: FAIL with `Cannot find module './wordpressContent.js'` (or similar).

- [ ] **Step 4: Implement helpers**

Create `src/lib/wordpressContent.js`:

```js
/**
 * Parse TipTap JSON from WP meta (string or object).
 * @param {unknown} raw
 * @returns {{ type: "doc", content?: unknown[] } | null}
 */
export function parseContentJson(raw) {
  if (raw == null || raw === "") return null;

  let value = raw;
  if (typeof raw === "string") {
    try {
      value = JSON.parse(raw);
    } catch {
      return null;
    }
  }

  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    value.type === "doc"
  ) {
    return value;
  }

  return null;
}

/**
 * Flatten TipTap doc text nodes for excerpts / SEO fallbacks.
 * @param {unknown} doc
 * @returns {string}
 */
export function tiptapToPlainText(doc) {
  if (!doc || typeof doc !== "object") return "";

  const parts = [];

  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (typeof node.text === "string") {
      parts.push(node.text);
    }
    if (node.content) walk(node.content);
  };

  walk(doc);
  return parts.join("").replace(/\s+/g, " ").trim();
}
```

- [ ] **Step 5: Run tests — expect PASS**

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 6: Commit**

```bash
git add package.json src/lib/wordpressContent.js src/lib/wordpressContent.test.js
git commit -m "$(cat <<'EOF'
test: add TipTap content_json parse helpers

EOF
)"
```

---

### Task 2: Map WP posts to TipTap `content`

**Files:**
- Modify: `src/lib/wordpress.js`

**Interfaces:**
- Consumes: `parseContentJson`, `tiptapToPlainText` from `./wordpressContent.js` (or `@/lib/wordpressContent`)
- Produces: `mapBlogPost` / `mapCaseStudyPost` set `content` to TipTap object when `meta.content_json` is present; `DETAIL_FIELDS` includes `meta`

- [ ] **Step 1: Extend field lists and import helpers**

At the top of `src/lib/wordpress.js`, add:

```js
import { parseContentJson, tiptapToPlainText } from "@/lib/wordpressContent";
```

Replace the field constants with:

```js
// List/featured/recent only need cards — omit body fields so Next can cache
// responses (full TipTap JSON with media can still be large on detail).
const LIST_FIELDS =
  "id,date,modified,slug,title,excerpt,acf,featured_media,_links";
const DETAIL_FIELDS =
  "id,date,modified,slug,title,excerpt,content,acf,meta,featured_media,_links";
```

- [ ] **Step 2: Add `resolvePostContent` helper in the same file**

Place above `mapBlogPost`:

```js
function resolvePostContent(post) {
  const fromMeta = parseContentJson(
    post?.meta?.content_json ?? post?.acf?.content_json,
  );
  if (fromMeta) return fromMeta;

  const html = post?.content?.rendered || "";
  return html;
}

function resolveDescription(post, content) {
  const excerpt = stripHtml(post?.excerpt?.rendered || "");
  if (excerpt) return excerpt;
  if (content && typeof content === "object") {
    return tiptapToPlainText(content).slice(0, 180);
  }
  return stripHtml(typeof content === "string" ? content : "").slice(0, 180);
}
```

- [ ] **Step 3: Wire mappers**

In `mapBlogPost`, replace description/content assignment:

```js
  const content = resolvePostContent(post);
  const description = resolveDescription(post, content);

  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post?.title?.rendered || ""),
    description,
    content,
    // ...rest unchanged
```

In `mapCaseStudyPost`, same pattern for `description` / `content`.

- [ ] **Step 4: Smoke-check mapper with a fixture (optional Node one-liner)**

Run:

```bash
node --input-type=module -e "
import { parseContentJson } from './src/lib/wordpressContent.js';
const doc = parseContentJson(JSON.stringify({ type: 'doc', content: [] }));
console.log(doc?.type);
"
```

Expected: `doc`

- [ ] **Step 5: Commit**

```bash
git add src/lib/wordpress.js
git commit -m "$(cat <<'EOF'
feat: prefer WordPress content_json TipTap bodies

EOF
)"
```

---

### Task 3: SEO description fallback for TipTap objects

**Files:**
- Modify: `src/lib/seo.js`

**Interfaces:**
- Consumes: `tiptapToPlainText` from `@/lib/wordpressContent`
- Produces: `mapContentToMeta` handles object `content`

- [ ] **Step 1: Import helper**

Near other imports in `src/lib/seo.js`:

```js
import { tiptapToPlainText } from "@/lib/wordpressContent";
```

- [ ] **Step 2: Update `mapContentToMeta` description line**

Replace:

```js
  const rawDescription =
    item?.description || item?.excerpt || stripHtml(item?.content || "");
```

With:

```js
  const bodyText =
    item?.content && typeof item.content === "object"
      ? tiptapToPlainText(item.content)
      : stripHtml(item?.content || "");
  const rawDescription =
    item?.description || item?.excerpt || bodyText;
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/seo.js
git commit -m "$(cat <<'EOF'
fix: derive SEO description from TipTap JSON bodies

EOF
)"
```

---

### Task 4: TipTap mock fixtures

**Files:**
- Modify: `src/data/resourceMocks.js`

**Interfaces:**
- Consumes: none
- Produces: mock `content` values are TipTap `{ type: "doc", ... }` objects

- [ ] **Step 1: Replace `LOREM_HTML` with TipTap doc**

Replace the `LOREM_HTML` constant with:

```js
const LOREM_DOC = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Key takeaways" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Integer in mauris eu nibh euismod gravida.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Duis ac tellus et risus vulputate vehicula.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Donec vitae dolor nulla malesuada.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
```

- [ ] **Step 2: Point all mock `content` fields at `LOREM_DOC`**

Replace every `content: LOREM_HTML` with `content: LOREM_DOC` in blogs and case studies in this file.

- [ ] **Step 3: Commit**

```bash
git add src/data/resourceMocks.js
git commit -m "$(cat <<'EOF'
chore: use TipTap JSON for resource mock bodies

EOF
)"
```

---

### Task 5: WordPress MU plugin — meta + TipTap-aware importer

**Files:**
- Create: `wordpress/mu-plugins/unbox-headless.php`

**Interfaces:**
- Consumes: Unbox admin `GET /api/front/blogs|case-studies/...` TipTap JSON
- Produces:
  - REST `meta.content_json` on `post` and `case_study`
  - `POST /wp-json/unbox/v1/import-prod` (capability `manage_options`) stores rewritten TipTap + sideloads images

- [ ] **Step 1: Create the MU plugin file**

Create `wordpress/mu-plugins/unbox-headless.php` with the full contents below (single file, drop into Hostinger `wp-content/mu-plugins/`).

```php
<?php
/**
 * Plugin Name: Unbox Headless CMS
 * Description: TipTap content_json meta, case_study CPT helpers, prod import.
 */

if (!defined('ABSPATH')) {
    exit;
}

const UNBOX_ADMIN_API = 'https://unboxadmin.4tysixapplabs.com/api';
const UNBOX_ADMIN_ORIGIN = 'https://unboxadmin.4tysixapplabs.com';

/**
 * Case study CPT + taxonomy (idempotent).
 */
add_action('init', function () {
    register_post_type('case_study', [
        'labels' => [
            'name' => 'Case Studies',
            'singular_name' => 'Case Study',
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'case-study',
        'menu_icon' => 'dashicons-portfolio',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'],
        'has_archive' => false,
        'rewrite' => ['slug' => 'case-study'],
    ]);

    register_taxonomy('case_study_tag', ['case_study'], [
        'labels' => [
            'name' => 'Case Study Tags',
            'singular_name' => 'Case Study Tag',
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'case-study-tag',
        'hierarchical' => false,
    ]);
});

/**
 * Register content_json + existing extras for REST.
 */
add_action('init', function () {
    $post_types = ['post', 'case_study'];

    $string_metas = [
        'content_json',
        'quote_message',
        'quote_owner',
        'quote_owner_image',
        'quote_role',
        'redirect_url',
        'type',
        'media',
        'media_type',
        'thumbnail',
        'client_name',
        'client_message',
        'client_image',
        'pdf',
    ];

    foreach ($post_types as $post_type) {
        foreach ($string_metas as $key) {
            register_post_meta($post_type, $key, [
                'type' => 'string',
                'single' => true,
                'show_in_rest' => true,
                'auth_callback' => function () {
                    return current_user_can('edit_posts');
                },
            ]);
        }

        register_post_meta($post_type, 'featured', [
            'type' => 'boolean',
            'single' => true,
            'show_in_rest' => true,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ]);

        register_post_meta($post_type, 'read_time', [
            'type' => 'number',
            'single' => true,
            'show_in_rest' => true,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ]);

        register_post_meta($post_type, 'total_pages', [
            'type' => 'number',
            'single' => true,
            'show_in_rest' => true,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ]);
    }
});

/**
 * Allow public REST reads of registered meta (show_in_rest still needs this
 * for unauthenticated GET /wp/v2/posts).
 */
add_filter('is_protected_meta', function ($protected, $meta_key) {
    $public = [
        'content_json',
        'quote_message',
        'quote_owner',
        'quote_owner_image',
        'quote_role',
        'redirect_url',
        'type',
        'featured',
        'media',
        'media_type',
        'thumbnail',
        'client_name',
        'client_message',
        'client_image',
        'pdf',
        'read_time',
        'total_pages',
    ];
    if (in_array($meta_key, $public, true)) {
        return false;
    }
    return $protected;
}, 10, 2);

add_action('rest_api_init', function () {
    register_rest_route('unbox/v1', '/import-prod', [
        'methods' => 'POST',
        'permission_callback' => function () {
            return current_user_can('manage_options');
        },
        'callback' => 'unbox_import_prod_content',
    ]);
});

function unbox_asset_url($url) {
    if (!$url) {
        return '';
    }
    if (strpos($url, 'data:') === 0) {
        return $url;
    }
    if (preg_match('#^https?://#i', $url)) {
        return $url;
    }
    return UNBOX_ADMIN_ORIGIN . (strpos($url, '/') === 0 ? $url : '/' . $url);
}

function unbox_fetch_json($url) {
    $response = wp_remote_get($url, ['timeout' => 90]);
    if (is_wp_error($response)) {
        throw new Exception($response->get_error_message());
    }
    $code = wp_remote_retrieve_response_code($response);
    $body = wp_remote_retrieve_body($response);
    if ($code < 200 || $code >= 300) {
        throw new Exception('HTTP ' . $code . ' for ' . $url);
    }
    $data = json_decode($body, true);
    if (!is_array($data)) {
        throw new Exception('Invalid JSON from ' . $url);
    }
    return $data;
}

function unbox_sideload_media($url, $parent_id = 0, $filename = '') {
    if (!$url || strpos($url, '.m3u8') !== false) {
        return 0;
    }
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';
    require_once ABSPATH . 'wp-admin/includes/image.php';

    if (strpos($url, 'data:') === 0) {
        if (!preg_match('#^data:(image/[a-zA-Z0-9.+-]+);base64,(.+)$#s', $url, $m)) {
            return 0;
        }
        $mime = $m[1];
        $binary = base64_decode($m[2], true);
        if ($binary === false) {
            return 0;
        }
        $ext = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/gif' => 'gif',
            'image/webp' => 'webp',
            'image/svg+xml' => 'svg',
        ][$mime] ?? 'bin';
        $name = $filename ?: ('inline-' . wp_generate_password(8, false) . '.' . $ext);
        $tmp = wp_tempnam($name);
        if (!$tmp) {
            return 0;
        }
        file_put_contents($tmp, $binary);
        $file_array = ['name' => $name, 'tmp_name' => $tmp];
        $id = media_handle_sideload($file_array, $parent_id);
        if (is_wp_error($id)) {
            @unlink($tmp);
            return 0;
        }
        return intval($id);
    }

    $tmp = download_url($url, 90);
    if (is_wp_error($tmp)) {
        return 0;
    }
    $name = $filename ?: basename(parse_url($url, PHP_URL_PATH) ?: 'file.bin');
    $file_array = ['name' => $name, 'tmp_name' => $tmp];
    $id = media_handle_sideload($file_array, $parent_id);
    if (is_wp_error($id)) {
        @unlink($tmp);
        return 0;
    }
    return intval($id);
}

/**
 * Walk TipTap tree; rewrite image srcs to Media Library URLs.
 */
function unbox_rewrite_tiptap_images($node, $parent_id, $slug, &$index = 0) {
    if (!is_array($node)) {
        return $node;
    }

    if (isset($node[0]) || $node === []) {
        $out = [];
        foreach ($node as $child) {
            $out[] = unbox_rewrite_tiptap_images($child, $parent_id, $slug, $index);
        }
        return $out;
    }

    $type = $node['type'] ?? '';
    if (($type === 'image' || $type === 'imageBlock') && !empty($node['attrs']['src'])) {
        $src = $node['attrs']['src'];
        // Fix broken "https://admin.../data:image..." prefixes from older imports.
        if (preg_match('#https?://[^/]+/(data:image/.+)$#', $src, $m)) {
            $src = $m[1];
        }
        $src = unbox_asset_url($src);
        $index++;
        $media_id = unbox_sideload_media($src, $parent_id, $slug . '-inline-' . $index . '.webp');
        if ($media_id) {
            $node['attrs']['src'] = wp_get_attachment_url($media_id);
        } elseif (strpos($src, 'data:') === 0) {
            // Drop unusable base64 so payloads stay lean.
            $node['attrs']['src'] = '';
        } else {
            $node['attrs']['src'] = $src;
        }
    }

    if (!empty($node['content']) && is_array($node['content'])) {
        $node['content'] = unbox_rewrite_tiptap_images($node['content'], $parent_id, $slug, $index);
    }

    return $node;
}

function unbox_upsert_by_slug($post_type, $slug, $args) {
    $existing = get_posts([
        'name' => $slug,
        'post_type' => $post_type,
        'post_status' => 'any',
        'numberposts' => 1,
        'fields' => 'ids',
    ]);
    if ($existing) {
        $args['ID'] = $existing[0];
        $id = wp_update_post($args, true);
    } else {
        $id = wp_insert_post($args, true);
    }
    if (is_wp_error($id)) {
        throw new Exception($id->get_error_message());
    }
    return intval($id);
}

function unbox_import_prod_content() {
    try {
        $api = UNBOX_ADMIN_API;
        $blogs_page = unbox_fetch_json($api . '/front/blogs?page=1&limit=50');
        $cases_page = unbox_fetch_json($api . '/front/case-studies?page=1&limit=50');
        $featured_blog = unbox_fetch_json($api . '/front/blogs/featured')['blog'] ?? null;
        $featured_case = unbox_fetch_json($api . '/front/case-studies/featured')['caseStudy'] ?? null;

        $blog_slugs = [];
        foreach (($blogs_page['blogs'] ?? []) as $b) {
            $blog_slugs[$b['slug']] = true;
        }
        if (!empty($featured_blog['slug'])) {
            $blog_slugs[$featured_blog['slug']] = true;
        }

        $case_slugs = [];
        foreach (($cases_page['caseStudies'] ?? []) as $c) {
            $case_slugs[$c['slug']] = true;
        }
        if (!empty($featured_case['slug'])) {
            $case_slugs[$featured_case['slug']] = true;
        }

        $created_posts = [];
        foreach (array_keys($blog_slugs) as $slug) {
            $blog = unbox_fetch_json($api . '/front/blogs/' . rawurlencode($slug))['blog'];
            $is_featured = (!empty($featured_blog['slug']) && $featured_blog['slug'] === $slug) || !empty($blog['featured']);
            $category = $blog['category'] ?: 'Blog';
            $term = term_exists($category, 'category');
            if (!$term) {
                $term = wp_insert_term($category, 'category');
            }
            $cat_id = is_array($term) ? intval($term['term_id']) : intval($term);

            $post_id = unbox_upsert_by_slug('post', $slug, [
                'post_type' => 'post',
                'post_name' => $slug,
                'post_status' => 'publish',
                'post_title' => $blog['title'] ?? '',
                'post_excerpt' => $blog['description'] ?? '',
                'post_content' => '',
                'post_date' => !empty($blog['date']) ? gmdate('Y-m-d H:i:s', strtotime($blog['date'])) : current_time('mysql', true),
                'post_date_gmt' => !empty($blog['date']) ? gmdate('Y-m-d H:i:s', strtotime($blog['date'])) : current_time('mysql', true),
            ]);

            wp_set_post_terms($post_id, [$cat_id], 'category');

            $doc = $blog['content'] ?? ['type' => 'doc', 'content' => []];
            if (is_string($doc)) {
                $decoded = json_decode($doc, true);
                $doc = is_array($decoded) ? $decoded : ['type' => 'doc', 'content' => []];
            }
            $index = 0;
            $doc = unbox_rewrite_tiptap_images($doc, $post_id, $slug, $index);
            update_post_meta($post_id, 'content_json', wp_json_encode($doc));

            $image_url = unbox_asset_url($blog['image'] ?? '');
            if ($image_url && strpos($image_url, 'data:') !== 0) {
                $media_id = unbox_sideload_media($image_url, $post_id, $slug . '-cover.jpg');
                if ($media_id) {
                    set_post_thumbnail($post_id, $media_id);
                }
            }

            $quote_img = unbox_asset_url($blog['quoteOwnerImage'] ?? '');
            if ($quote_img && strpos($quote_img, 'data:') !== 0) {
                $qid = unbox_sideload_media($quote_img, $post_id, $slug . '-quote.jpg');
                if ($qid) {
                    $quote_img = wp_get_attachment_url($qid);
                }
            }

            update_post_meta($post_id, 'featured', (bool) $is_featured);
            update_post_meta($post_id, 'quote_message', $blog['quoteMessage'] ?? '');
            update_post_meta($post_id, 'quote_owner', $blog['quoteOwner'] ?? '');
            update_post_meta($post_id, 'quote_owner_image', $quote_img);
            update_post_meta($post_id, 'quote_role', $blog['quoteRole'] ?? '');
            update_post_meta($post_id, 'redirect_url', $blog['redirectUrl'] ?? '');
            update_post_meta($post_id, 'type', $category);

            $created_posts[] = ['id' => $post_id, 'slug' => $slug, 'featured' => $is_featured];
        }

        $created_cases = [];
        foreach (array_keys($case_slugs) as $slug) {
            $cs = unbox_fetch_json($api . '/front/case-studies/' . rawurlencode($slug))['caseStudy'];
            $is_featured = (!empty($featured_case['slug']) && $featured_case['slug'] === $slug) || !empty($cs['featured']);
            $tag = $cs['tags'] ?? '';
            $tag_ids = [];
            if ($tag) {
                $term = term_exists($tag, 'case_study_tag');
                if (!$term) {
                    $term = wp_insert_term($tag, 'case_study_tag');
                }
                $tag_ids[] = is_array($term) ? intval($term['term_id']) : intval($term);
            }

            $post_id = unbox_upsert_by_slug('case_study', $slug, [
                'post_type' => 'case_study',
                'post_name' => $slug,
                'post_status' => 'publish',
                'post_title' => $cs['title'] ?? '',
                'post_excerpt' => $cs['description'] ?? '',
                'post_content' => '',
                'post_date' => !empty($cs['date']) ? gmdate('Y-m-d H:i:s', strtotime($cs['date'])) : current_time('mysql', true),
                'post_date_gmt' => !empty($cs['date']) ? gmdate('Y-m-d H:i:s', strtotime($cs['date'])) : current_time('mysql', true),
            ]);

            if ($tag_ids) {
                wp_set_post_terms($post_id, $tag_ids, 'case_study_tag');
            }

            $doc = $cs['content'] ?? ['type' => 'doc', 'content' => []];
            if (is_string($doc)) {
                $decoded = json_decode($doc, true);
                $doc = is_array($decoded) ? $decoded : ['type' => 'doc', 'content' => []];
            }
            $index = 0;
            $doc = unbox_rewrite_tiptap_images($doc, $post_id, $slug, $index);
            update_post_meta($post_id, 'content_json', wp_json_encode($doc));

            $thumb_url = unbox_asset_url($cs['thumbnail_url'] ?? ($cs['image'] ?? ''));
            $thumb_id = 0;
            if ($thumb_url && strpos($thumb_url, 'data:') !== 0) {
                $thumb_id = unbox_sideload_media($thumb_url, $post_id, $slug . '-thumb.jpg');
                if ($thumb_id) {
                    set_post_thumbnail($post_id, $thumb_id);
                }
            }

            $pdf_url = unbox_asset_url($cs['pdf'] ?? '');
            if ($pdf_url && strpos($pdf_url, 'data:') !== 0) {
                $pdf_id = unbox_sideload_media($pdf_url, $post_id, $slug . '.pdf');
                if ($pdf_id) {
                    $pdf_url = wp_get_attachment_url($pdf_id);
                }
            }

            $client_image = unbox_asset_url($cs['clientImage'] ?? '');
            if ($client_image && strpos($client_image, 'data:') !== 0) {
                $cid = unbox_sideload_media($client_image, $post_id, $slug . '-client.png');
                if ($cid) {
                    $client_image = wp_get_attachment_url($cid);
                }
            }

            update_post_meta($post_id, 'featured', (bool) $is_featured);
            update_post_meta($post_id, 'media', unbox_asset_url($cs['media'] ?? ''));
            update_post_meta($post_id, 'media_type', $cs['mediaType'] ?? 'image');
            update_post_meta($post_id, 'thumbnail', $thumb_id ? wp_get_attachment_url($thumb_id) : $thumb_url);
            update_post_meta($post_id, 'client_name', $cs['clientName'] ?? '');
            update_post_meta($post_id, 'client_message', $cs['clientMessage'] ?? '');
            update_post_meta($post_id, 'client_image', $client_image);
            update_post_meta($post_id, 'pdf', $pdf_url);
            update_post_meta($post_id, 'read_time', $cs['read_time'] ?? 0);
            update_post_meta($post_id, 'total_pages', $cs['totalPages'] ?? 0);
            update_post_meta($post_id, 'type', $tag ?: ($cs['type'] ?? 'Case Study'));

            $created_cases[] = ['id' => $post_id, 'slug' => $slug, 'featured' => $is_featured];
        }

        return [
            'ok' => true,
            'posts' => $created_posts,
            'caseStudies' => $created_cases,
            'featuredBlog' => $featured_blog['slug'] ?? null,
            'featuredCaseStudy' => $featured_case['slug'] ?? null,
        ];
    } catch (Exception $e) {
        return new WP_Error('import_failed', $e->getMessage(), ['status' => 500]);
    }
}
```

- [ ] **Step 2: Commit the MU plugin source**

```bash
git add wordpress/mu-plugins/unbox-headless.php
git commit -m "$(cat <<'EOF'
feat: add WordPress MU plugin for TipTap content_json

EOF
)"
```

---

### Task 6: Deploy MU plugin to Hostinger + re-import

**Files:**
- Hostinger: `wp-content/mu-plugins/unbox-headless.php`
- Hostinger: remove Unbox importer markers from Twenty Twenty-Five `functions.php` (avoid duplicate `unbox_import_prod_content` / route registration)

**Interfaces:**
- Consumes: Task 5 PHP file
- Produces: Live REST with `meta.content_json`; lean TipTap payloads

- [ ] **Step 1: Upload MU plugin**

Via Hostinger File Manager or SFTP, copy repo file to:

`/public_html/wp-content/mu-plugins/unbox-headless.php`

(Create `mu-plugins` if missing.)

- [ ] **Step 2: Disable duplicate theme importer**

In wp-admin → Appearance → Theme File Editor → `functions.php`, remove the block between:

`/* Unbox Prod Importer Start */` … `/* Unbox Prod Importer End */`

If those markers are missing, search for `unbox/v1/import-prod` and remove that registration + functions so only the MU plugin owns the route.

- [ ] **Step 3: Confirm meta registration**

While logged into wp-admin, open browser console on any admin page (or use the Cursor browser) and run via Network:

`GET /wp-json/wp/v2/posts?per_page=1&_fields=id,meta`

Expected: `meta` includes `content_json` key (may be empty string until import).

- [ ] **Step 4: Run import**

From an authenticated wp-admin session (browser console or Cursor CDP):

```js
(async () => {
  const html = await (await fetch('/wp-admin/', { credentials: 'same-origin' })).text();
  const m = html.match(/wpApiSettings\s*=\s*(\{[\s\S]*?\});/);
  const nonce = m ? JSON.parse(m[1]).nonce : window.wpApiSettings?.nonce;
  const res = await fetch('/wp-json/unbox/v1/import-prod', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': nonce },
    body: '{}',
  });
  return { status: res.status, data: await res.json() };
})();
```

Expected: `{ status: 200, data: { ok: true, posts: [...], caseStudies: [...] } }`  
(May take several minutes while images sideload.)

- [ ] **Step 5: Verify TipTap payload quality**

```bash
curl -s "https://darkorange-antelope-596479.hostingersite.com/wp-json/wp/v2/posts?slug=unbox-robotics-manifesto-why-sortation-needs-a-reset&_fields=id,meta" | python3 -c "
import sys,json,re
p=json.load(sys.stdin)[0]
raw=p['meta'].get('content_json') or ''
print('bytes', len(raw))
print('has_data_image', 'data:image' in raw)
doc=json.loads(raw)
print('type', doc.get('type'))
print('hostinger_media', len(re.findall(r'hostingersite.com/wp-content/uploads', raw)))
"
```

Expected:

- `type` = `doc`
- `has_data_image` = `False`
- `bytes` roughly tens of KB (not ~1_000_000)
- `hostinger_media` ≥ 1 if the post had inline images

- [ ] **Step 6: No repo commit** (Hostinger-only ops). Note results in the PR/MR description when opening one.

---

### Task 7: Update WordPress setup docs

**Files:**
- Modify: `docs/wordpress-setup.md`

**Interfaces:**
- Consumes: design + MU plugin behavior
- Produces: operator instructions

- [ ] **Step 1: Update the Blogs field table**

Change the `content` row from “Post content (HTML)” to:

| `content` | Post meta `content_json` (TipTap JSON string) |

Add a short subsection after the blogs table:

```markdown
### Body format (TipTap JSON)

The site does **not** render Gutenberg `post_content` for blogs/case studies.
Canonical body is post meta `content_json`: a TipTap document

`{ "type": "doc", "content": [ ... ] }`

exposed on REST as `meta.content_json`.

List/featured/recent Next.js fetches omit `meta` / `content` so responses stay
under Next’s ~2MB fetch cache. Detail-by-slug includes `meta`.

#### Re-import from Unbox admin

1. Ensure `wordpress/mu-plugins/unbox-headless.php` is deployed to
   `wp-content/mu-plugins/` on the WordPress host.
2. Remove any duplicate `unbox/v1/import-prod` code from the theme `functions.php`.
3. While logged into wp-admin, `POST /wp-json/unbox/v1/import-prod` with the
   WP REST nonce (capability: `manage_options`).
4. Confirm a post’s `meta.content_json` parses as TipTap and contains no
   `data:image` base64 payloads (inline images should be Media Library URLs).
```

- [ ] **Step 2: Point CPT section at the MU plugin**

Note that case study CPT registration also lives in `unbox-headless.php` (in addition to any earlier snippet), and the repo copy under `wordpress/mu-plugins/` is the source of truth.

- [ ] **Step 3: Commit**

```bash
git add docs/wordpress-setup.md
git commit -m "$(cat <<'EOF'
docs: document TipTap content_json as WP body of record

EOF
)"
```

---

### Task 8: End-to-end smoke test (Next + WP)

**Files:**
- None (verification only)

**Interfaces:**
- Consumes: Tasks 1–7 complete; `NEXT_PUBLIC_WP_API_URL` points at Hostinger

- [ ] **Step 1: Ensure env**

Confirm `.env.local` contains:

```bash
NEXT_PUBLIC_WP_API_URL=https://darkorange-antelope-596479.hostingersite.com
```

- [ ] **Step 2: Start Next and hit detail API path**

```bash
npm run dev
```

In another shell:

```bash
curl -s "http://localhost:3000/api/wp/blogs/unbox-robotics-manifesto-why-sortation-needs-a-reset" | python3 -c "
import sys,json
d=json.load(sys.stdin)
b=d.get('blog') or {}
c=b.get('content')
print('content_type', type(c).__name__)
print('tiptap', isinstance(c, dict) and c.get('type')=='doc')
print('title', (b.get('title') or '')[:60])
"
```

Expected:

- `content_type` = `dict`
- `tiptap` = `True`

- [ ] **Step 3: Open pages in browser**

- `http://localhost:3000/blogs/unbox-robotics-manifesto-why-sortation-needs-a-reset`
- One case-study slug from the import response

Expected: body renders (headings/paragraphs/images), not a blank content area; images load from `hostingersite.com/wp-content/uploads/...`.

- [ ] **Step 4: Confirm list still caches lean**

```bash
curl -s "http://localhost:3000/api/wp/blogs?page=1&limit=3" | python3 -c "
import sys,json
d=json.load(sys.stdin)
for b in d.get('blogs') or []:
  print(b.get('slug'), 'content' in b, type(b.get('content')).__name__ if 'content' in b else 'n/a')
"
```

Expected: list items either omit `content` or have empty/absent body fields (cards only). No multi-MB response.

- [ ] **Step 5: Run unit tests once more**

Run: `npm test`  
Expected: PASS

---

## Plan self-review

| Spec requirement | Task |
|---|---|
| `content_json` meta + REST | Task 5–6 |
| Import stores TipTap + rewrites images | Task 5–6 |
| `post_content` not site body | Task 5 (`post_content` => `''`) |
| Next prefers TipTap JSON | Task 2 |
| List omits body | Task 2 (`LIST_FIELDS`) |
| SEO TipTap text fallback | Task 3 |
| Mocks TipTap | Task 4 |
| Docs | Task 7 |
| Smoke / success checks | Task 6 Step 5, Task 8 |
| MU plugin preferred over theme | Task 5–6 |
| No TipTap admin UI | Explicitly omitted |

No intentional placeholders left in task steps.
