# WordPress Headless CMS Setup

This project reads `/blogs` and `/case-study` content from the WordPress REST API. The WordPress theme is irrelevant — only the REST endpoints and custom fields matter.

Set the public WordPress site origin (no trailing slash) in the Next.js app:

```bash
NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.example
```

The app calls `{NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/...`. If the variable is unset or a request fails, the app falls back to local mock fixtures so pages still render.

Public content is read without authentication. An Application Password is only needed if you later seed or edit content via the REST API from scripts.

## Hosting

Any managed WordPress host works (Hostinger, Kinsta, WP Engine, Pressable, etc.) or a self-hosted WordPress install with pretty permalinks enabled (`/%postname%/`) so REST works at `/wp-json/`.

Recommended plugins:

- **Advanced Custom Fields (ACF)** — free tier is enough; enable “Show in REST API” on every field group and field.
- Optional: **Custom Post Type UI** if you prefer a UI over the must-use plugin below.

## Blogs

Use native WordPress **Posts**.

| Site field | WordPress source |
|---|---|
| `title` | Post title |
| `slug` | Post slug |
| `description` | Excerpt |
| `content` | Post meta `content_json` (TipTap JSON string) |
| `image` | Featured image |
| `category` / `type` | Primary category name |
| `date` | Publish date |
| Quote / featured extras | ACF fields below |

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

**Hostinger / large imports:** A full `import-prod` run may time out on
Hostinger. If responses exceed Next’s fetch cache limit, strip `data:image`
base64 strings from `content_json` after import to keep payloads lean.

**Cache:** Purge LiteSpeed cache after `content_json` changes so REST responses
reflect the updated body.

### ACF field group: Blog extras

Attach to Post type `post`. Enable Show in REST API.

| Field name | Type | Maps to |
|---|---|---|
| `quote_message` | Textarea | `quoteMessage` |
| `quote_owner` | Text | `quoteOwner` |
| `quote_owner_image` | Image (return URL) | `quoteOwnerImage` |
| `quote_role` | Text | `quoteRole` |
| `redirect_url` | URL | `redirectUrl` |
| `featured` | True / False | Featured blog selection |

## Case studies

Register a `case_study` custom post type with REST enabled, plus a `case_study_tag` taxonomy.

### Must-use plugin

Deploy the repo copy of `wordpress/mu-plugins/unbox-headless.php` to
`wp-content/mu-plugins/` on the WordPress host. That file is the **source of
truth** — it registers the `case_study` CPT and `case_study_tag` taxonomy,
exposes `content_json` and other meta on REST, and provides the
`unbox/v1/import-prod` endpoint. Do not maintain a separate
`unbox-case-study.php` or duplicate CPT/import code in the theme.

### ACF field group: Case study extras

Attach to Post type `case_study`. Enable Show in REST API.

| Field name | Type | Maps to |
|---|---|---|
| `media` | File or URL | `media` |
| `media_type` | Select (`image` / `video`) | `mediaType` |
| `thumbnail` | Image (return URL) | `thumbnail_url` |
| `client_name` | Text | `clientName` |
| `client_message` | Textarea | `clientMessage` |
| `client_image` | Image (return URL) | `clientImage` |
| `pdf` | File (return URL) | `pdf` |
| `read_time` | Number | `read_time` |
| `total_pages` | Number | `totalPages` |
| `featured` | True / False | Featured case study selection |
| `type` | Text (optional) | Card badge / type |

Featured image can also be used as a fallback cover when `thumbnail` / `media` are empty.

## REST endpoints used by the app

| Resource | Endpoint |
|---|---|
| Blog list | `GET /wp-json/wp/v2/posts?page=&per_page=&_embed=1` |
| Blog by slug | `GET /wp-json/wp/v2/posts?slug={slug}&_embed=1` |
| Case study list | `GET /wp-json/wp/v2/case-study?page=&per_page=&_embed=1` |
| Case study by slug | `GET /wp-json/wp/v2/case-study?slug={slug}&_embed=1` |

Pagination totals come from response headers `X-WP-Total` and `X-WP-TotalPages`.

Featured items are selected by ACF `featured === true`. If none are flagged, the newest published item is used.

## CORS (if WordPress and Next.js are on different origins)

Allow the frontend origin to read the REST API. Example in the WordPress theme/`mu-plugins`:

```php
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();
        $allowed = [
            'http://localhost:3000',
            'https://www.unboxrobotics.com',
            'https://unboxrobotics.com',
        ];
        if (in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
        }
        return $value;
    });
}, 15);
```

## Lead capture

Case-study PDF downloads still post leads to the existing backend (`/front/case-studies/download`). WordPress only supplies the content and the PDF URL.

## Application Password (optional)

Users → Profile → Application Passwords. Only needed for authenticated write access (seeding/editing via REST). Reading published posts does not require it.
