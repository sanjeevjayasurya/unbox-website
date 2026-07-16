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
        'args' => [
            'type' => [
                'type' => 'string',
                'required' => false,
                'enum' => ['blogs', 'case-studies', 'all'],
            ],
            'slug' => [
                'type' => 'string',
                'required' => false,
            ],
        ],
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

/**
 * Fetch every page from an Unbox admin list endpoint.
 */
function unbox_fetch_all_pages($path, $items_key, $limit = 50) {
    $items = [];
    $page = 1;

    while (true) {
        if ($page > 100) {
            break;
        }
        $response = unbox_fetch_json(UNBOX_ADMIN_API . $path . '?page=' . $page . '&limit=' . $limit);
        $page_items = $response[$items_key] ?? [];

        if (!is_array($page_items) || !$page_items) {
            break;
        }

        $items = array_merge($items, $page_items);
        $total_pages = intval($response['pages'] ?? 0);
        if (!$total_pages && isset($response['total'])) {
            $total_pages = (int) ceil(intval($response['total']) / $limit);
        }
        if ($total_pages && $page >= $total_pages) {
            break;
        }

        $page++;
    }

    return $items;
}

/**
 * Reuse an attachment already imported for this post.
 */
function unbox_find_existing_attachment($parent_id, $filename, $source_url = '') {
    if (!$parent_id) {
        return 0;
    }

    $filename = sanitize_file_name($filename);
    $source_hash = $source_url ? hash('sha256', $source_url) : '';
    $attachments = get_posts([
        'post_parent' => $parent_id,
        'post_type' => 'attachment',
        'post_status' => 'inherit',
        'numberposts' => -1,
        'fields' => 'ids',
    ]);

    foreach ($attachments as $attachment_id) {
        $stored_hash = get_post_meta($attachment_id, '_unbox_import_source', true);

        if ($source_hash && $stored_hash === $source_hash) {
            return intval($attachment_id);
        }

        // Stored hash differs from incoming source — do not reuse by filename.
        if ($stored_hash && $source_hash) {
            continue;
        }

        // Legacy attachment without hash metadata — filename match is OK once.
        if ($filename && sanitize_file_name(basename(get_attached_file($attachment_id))) === $filename) {
            if ($source_hash) {
                update_post_meta($attachment_id, '_unbox_import_source', $source_hash);
            }
            return intval($attachment_id);
        }
    }

    return 0;
}

function unbox_media_extension_from_mime($mime) {
    return [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/gif' => 'gif',
        'image/webp' => 'webp',
        'image/avif' => 'avif',
        'image/svg+xml' => 'svg',
        'application/pdf' => 'pdf',
    ][strtolower($mime)] ?? '';
}

function unbox_media_extension_from_url($url) {
    $path = parse_url($url, PHP_URL_PATH) ?: '';
    $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
    return in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg', 'pdf'], true) ? $ext : '';
}

function unbox_media_extension_from_file($path) {
    $mime = wp_get_image_mime($path);
    if (!$mime && function_exists('mime_content_type')) {
        $mime = mime_content_type($path);
    }
    if (!$mime && function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        if ($finfo) {
            $mime = finfo_file($finfo, $path);
            finfo_close($finfo);
        }
    }
    return unbox_media_extension_from_mime($mime);
}

function unbox_media_filename($filename, $ext) {
    $filename = sanitize_file_name($filename);
    $basename = pathinfo($filename, PATHINFO_FILENAME);
    if (!$basename) {
        $basename = 'media-' . wp_generate_password(8, false);
    }
    return $basename . '.' . $ext;
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
        $ext = unbox_media_extension_from_mime($mime) ?: 'bin';
        $name = unbox_media_filename($filename, $ext);
        $existing_id = unbox_find_existing_attachment($parent_id, $name, $url);
        if ($existing_id) {
            return $existing_id;
        }
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
        update_post_meta($id, '_unbox_import_source', hash('sha256', $url));
        return intval($id);
    }

    $tmp = download_url($url, 90);
    if (is_wp_error($tmp)) {
        return 0;
    }
    $ext = unbox_media_extension_from_url($url);
    if (!$ext) {
        $ext = unbox_media_extension_from_file($tmp);
    }
    if (!$ext) {
        $ext = strtolower(pathinfo(sanitize_file_name($filename), PATHINFO_EXTENSION));
    }
    $name = unbox_media_filename($filename, $ext ?: 'bin');
    $existing_id = unbox_find_existing_attachment($parent_id, $name, $url);
    if ($existing_id) {
        @unlink($tmp);
        return $existing_id;
    }
    $file_array = ['name' => $name, 'tmp_name' => $tmp];
    $id = media_handle_sideload($file_array, $parent_id);
    if (is_wp_error($id)) {
        @unlink($tmp);
        return 0;
    }
    update_post_meta($id, '_unbox_import_source', hash('sha256', $url));
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
        $media_id = unbox_sideload_media($src, $parent_id, $slug . '-inline-' . $index);
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

function unbox_import_prod_content(WP_REST_Request $request = null) {
    @set_time_limit(0);
    @ini_set('max_execution_time', '0');

    try {
        $api = UNBOX_ADMIN_API;
        $only_type = $request ? sanitize_text_field((string) $request->get_param('type')) : '';
        $only_slug = $request ? sanitize_title((string) $request->get_param('slug')) : '';
        if (!$only_type) {
            $only_type = 'all';
        }

        $featured_blog = null;
        $featured_case = null;
        $blog_slugs = [];
        $case_slugs = [];

        $import_blogs = ($only_type === 'all' || $only_type === 'blogs');
        $import_cases = ($only_type === 'all' || $only_type === 'case-studies');

        if ($import_blogs) {
            if ($only_slug) {
                $blog_slugs[$only_slug] = true;
            } else {
                $blogs = unbox_fetch_all_pages('/front/blogs', 'blogs');
                $featured_blog = unbox_fetch_json($api . '/front/blogs/featured')['blog'] ?? null;
                foreach ($blogs as $b) {
                    $blog_slugs[$b['slug']] = true;
                }
                if (!empty($featured_blog['slug'])) {
                    $blog_slugs[$featured_blog['slug']] = true;
                }
            }
        }

        if ($import_cases) {
            if ($only_slug) {
                // When type=all with a slug, try both; with type=case-studies only cases.
                if ($only_type === 'case-studies' || $only_type === 'all') {
                    $case_slugs[$only_slug] = true;
                }
            } else {
                $cases = unbox_fetch_all_pages('/front/case-studies', 'caseStudies');
                $featured_case = unbox_fetch_json($api . '/front/case-studies/featured')['caseStudy'] ?? null;
                foreach ($cases as $c) {
                    $case_slugs[$c['slug']] = true;
                }
                if (!empty($featured_case['slug'])) {
                    $case_slugs[$featured_case['slug']] = true;
                }
            }
        }

        // Single-slug + type=all: only keep the matching collection after probing.
        if ($only_slug && $only_type === 'all') {
            $blog_slugs = [$only_slug => true];
            $case_slugs = [$only_slug => true];
        } elseif ($only_slug && $only_type === 'blogs') {
            $case_slugs = [];
        } elseif ($only_slug && $only_type === 'case-studies') {
            $blog_slugs = [];
        }

        $created_posts = [];
        foreach (array_keys($blog_slugs) as $slug) {
            try {
                $blog = unbox_fetch_json($api . '/front/blogs/' . rawurlencode($slug))['blog'] ?? null;
            } catch (Exception $e) {
                if ($only_slug) {
                    continue;
                }
                throw $e;
            }
            if (!$blog) {
                continue;
            }
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
            update_post_meta($post_id, 'content_json', wp_slash(wp_json_encode($doc)));

            $image_url = unbox_asset_url($blog['image'] ?? '');
            if ($image_url && strpos($image_url, 'data:') !== 0) {
                $media_id = unbox_sideload_media($image_url, $post_id, $slug . '-cover');
                if ($media_id) {
                    set_post_thumbnail($post_id, $media_id);
                }
            }

            $quote_img = unbox_asset_url($blog['quoteOwnerImage'] ?? '');
            if ($quote_img && strpos($quote_img, 'data:') !== 0) {
                $qid = unbox_sideload_media($quote_img, $post_id, $slug . '-quote');
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
            try {
                $cs = unbox_fetch_json($api . '/front/case-studies/' . rawurlencode($slug))['caseStudy'] ?? null;
            } catch (Exception $e) {
                if ($only_slug) {
                    continue;
                }
                throw $e;
            }
            if (!$cs) {
                continue;
            }
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
            update_post_meta($post_id, 'content_json', wp_slash(wp_json_encode($doc)));

            $thumb_url = unbox_asset_url($cs['thumbnail_url'] ?? ($cs['image'] ?? ''));
            $thumb_id = 0;
            if ($thumb_url && strpos($thumb_url, 'data:') !== 0) {
                $thumb_id = unbox_sideload_media($thumb_url, $post_id, $slug . '-thumb');
                if ($thumb_id) {
                    set_post_thumbnail($post_id, $thumb_id);
                }
            }

            $pdf_url = unbox_asset_url($cs['pdf'] ?? '');
            if ($pdf_url && strpos($pdf_url, 'data:') !== 0) {
                $pdf_id = unbox_sideload_media($pdf_url, $post_id, $slug);
                if ($pdf_id) {
                    $pdf_url = wp_get_attachment_url($pdf_id);
                }
            }

            $client_image = unbox_asset_url($cs['clientImage'] ?? '');
            if ($client_image && strpos($client_image, 'data:') !== 0) {
                $cid = unbox_sideload_media($client_image, $post_id, $slug . '-client');
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
