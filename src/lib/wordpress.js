import {
  getMockBlogBySlug,
  getMockBlogs,
  getMockCaseStudies,
  getMockCaseStudyBySlug,
  getMockFeaturedBlog,
  getMockFeaturedCaseStudy,
  getMockRecentBlogs,
} from "@/data/resourceMocks";
import { parseContentJson } from "@/lib/wordpressContent";

const PLACEHOLDER_IMAGE = "/images/resource-placeholder.svg";

function getWpBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_WP_API_URL || "";
  return raw.replace(/\/$/, "");
}

function decodeHtmlEntities(value = "") {
  return String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(value = "") {
  return decodeHtmlEntities(
    String(value)
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function getAcf(post) {
  return post?.acf && typeof post.acf === "object" ? post.acf : {};
}

function getFeaturedImage(post) {
  const embedded = post?._embedded?.["wp:featuredmedia"]?.[0];
  return (
    embedded?.source_url ||
    embedded?.media_details?.sizes?.large?.source_url ||
    ""
  );
}

function getPrimaryCategory(post) {
  const categories = post?._embedded?.["wp:term"]?.flat?.() || [];
  const category = categories.find((term) => term?.taxonomy === "category");
  return category?.name || "";
}

function getCaseStudyTags(post) {
  const terms = post?._embedded?.["wp:term"]?.flat?.() || [];
  const tags = terms
    .filter((term) => term?.taxonomy === "case_study_tag")
    .map((term) => term.name)
    .filter(Boolean);
  return tags.join(", ");
}

function acfImageUrl(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return value.url || value.source_url || "";
  }
  return "";
}

function acfFileUrl(value) {
  return acfImageUrl(value);
}

function isFeaturedFlag(acf) {
  const value = acf?.featured;
  return value === true || value === 1 || value === "1" || value === "true";
}

function resolvePostContent(post) {
  const tiptapContent = parseContentJson(
    post?.meta?.content_json ?? post?.acf?.content_json,
  );
  return tiptapContent || post?.content?.rendered || "";
}

function mapBlogPost(post) {
  const acf = getAcf(post);
  const category = getPrimaryCategory(post) || acf.type || "Blog";
  const image = getFeaturedImage(post) || PLACEHOLDER_IMAGE;
  const description =
    stripHtml(post?.excerpt?.rendered || "") ||
    stripHtml(post?.content?.rendered || "").slice(0, 180);

  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post?.title?.rendered || ""),
    description,
    content: resolvePostContent(post),
    image,
    category,
    type: category,
    date: post.date,
    createdAt: post.date,
    updatedAt: post.modified,
    quoteMessage: acf.quote_message || "",
    quoteOwner: acf.quote_owner || "",
    quoteOwnerImage: acfImageUrl(acf.quote_owner_image),
    quoteRole: acf.quote_role || "",
    redirectUrl: acf.redirect_url || "",
    featured: isFeaturedFlag(acf),
  };
}

function mapCaseStudyPost(post) {
  const acf = getAcf(post);
  const featuredImage = getFeaturedImage(post);
  const media = acfFileUrl(acf.media) || featuredImage || PLACEHOLDER_IMAGE;
  const thumbnail =
    acfImageUrl(acf.thumbnail) || featuredImage || PLACEHOLDER_IMAGE;
  const description =
    stripHtml(post?.excerpt?.rendered || "") ||
    stripHtml(post?.content?.rendered || "").slice(0, 180);
  const mediaType = acf.media_type || "image";
  const tags = getCaseStudyTags(post) || acf.type || "";

  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post?.title?.rendered || ""),
    description,
    content: post?.content?.rendered || "",
    media,
    mediaType,
    thumbnail_url: thumbnail,
    image: featuredImage || thumbnail,
    type: acf.type || tags || "Case Study",
    tags,
    date: post.date,
    createdAt: post.date,
    updatedAt: post.modified,
    clientName: acf.client_name || "",
    clientMessage: acf.client_message || "",
    clientImage: acfImageUrl(acf.client_image),
    pdf: acfFileUrl(acf.pdf) || "",
    read_time: Number(acf.read_time) || 0,
    totalPages: Number(acf.total_pages) || 0,
    featured: isFeaturedFlag(acf),
  };
}

function logWpError(action, error) {
  if (process.env.NODE_ENV !== "production" && error?.code !== "WP_NOT_CONFIGURED") {
    console.warn(`[wordpress] ${action} failed, using mock fallback`, error);
  }
}

function isWordpressConfigured() {
  return Boolean(getWpBaseUrl());
}

async function wpFetch(path) {
  const base = getWpBaseUrl();
  if (!base) {
    const error = new Error("NEXT_PUBLIC_WP_API_URL is not configured");
    error.code = "WP_NOT_CONFIGURED";
    throw error;
  }

  const url = `${base}/wp-json/wp/v2${path}`;
  const response = await fetch(url, {
    // Cache WP responses on the Next server for an hour (ISR-style).
    next: { revalidate: 3600, tags: ["wordpress"] },
  });

  if (!response.ok) {
    const error = new Error(`WordPress request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return {
    data,
    total: Number(response.headers.get("X-WP-Total") || 0),
    pages: Number(response.headers.get("X-WP-TotalPages") || 0),
  };
}

// List/featured/recent only need cards — omit `content` so Next can cache
 // responses (full posts with inlined media often exceed the 2MB fetch cache).
const LIST_FIELDS =
  "id,date,modified,slug,title,excerpt,acf,featured_media,_links";
const DETAIL_FIELDS =
  "id,date,modified,slug,title,excerpt,content,acf,meta,featured_media,_links";

async function fetchCollection(resourcePath, page = 1, limit = 3) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(limit),
    _embed: "1",
    status: "publish",
    _fields: LIST_FIELDS,
  });
  return wpFetch(`${resourcePath}?${params.toString()}`);
}

async function fetchBySlug(resourcePath, slug) {
  const params = new URLSearchParams({
    slug,
    _embed: "1",
    status: "publish",
    _fields: DETAIL_FIELDS,
  });
  const { data } = await wpFetch(`${resourcePath}?${params.toString()}`);
  return Array.isArray(data) ? data[0] || null : null;
}

async function fetchFeaturedOrLatest(resourcePath, mapFn) {
  // Small recent window is enough — featured posts are usually near the top.
  const { data } = await fetchCollection(resourcePath, 1, 5);
  const mapped = (Array.isArray(data) ? data : []).map(mapFn);
  return mapped.find((item) => item.featured) || mapped[0] || null;
}

/**
 * @param {number} page
 * @param {number} limit
 * @param {{ excludeSlug?: string }} [options] - featured slug to keep out of the grid
 */
export async function getBlogs(page = 1, limit = 3, options = {}) {
  if (!isWordpressConfigured()) return getMockBlogs(page, limit);
  try {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.max(1, Number(limit) || 3);
    const excludeSlug = options.excludeSlug || null;

    // Fetch only this page (+1 when excluding featured) instead of the full catalog.
    const requestLimit = Math.min(100, safeLimit + (excludeSlug ? 1 : 0));
    const { data, total } = await fetchCollection(
      "/posts",
      safePage,
      requestLimit,
    );

    const blogs = (Array.isArray(data) ? data : [])
      .map(mapBlogPost)
      .filter(
        (blog) =>
          !blog.featured && (!excludeSlug || blog.slug !== excludeSlug),
      )
      .slice(0, safeLimit);

    // Assume at most one featured post exists in the catalog (matches production).
    const finalTotal = excludeSlug
      ? Math.max(0, (Number(total) || 0) - 1)
      : Number(total) || blogs.length;
    const pages = Math.max(1, Math.ceil(finalTotal / safeLimit) || 1);

    return {
      blogs,
      page: safePage,
      pages,
      total: finalTotal,
    };
  } catch (error) {
    logWpError("getBlogs", error);
    return getMockBlogs(page, limit);
  }
}

export async function getBlogBySlug(slug) {
  if (!slug) return null;
  if (!isWordpressConfigured()) return getMockBlogBySlug(slug);
  try {
    const post = await fetchBySlug("/posts", slug);
    if (!post) {
      // Fall back so detail routes remain browsable without WordPress content.
      return getMockBlogBySlug(slug);
    }
    return { blog: mapBlogPost(post) };
  } catch (error) {
    logWpError("getBlogBySlug", error);
    return getMockBlogBySlug(slug);
  }
}

export async function getFeaturedBlog() {
  if (!isWordpressConfigured()) return getMockFeaturedBlog();
  try {
    const blog = await fetchFeaturedOrLatest("/posts", mapBlogPost);
    if (!blog) return getMockFeaturedBlog();
    return { blog };
  } catch (error) {
    logWpError("getFeaturedBlog", error);
    return getMockFeaturedBlog();
  }
}

export async function getRecentBlogs(excludeSlug) {
  if (!isWordpressConfigured()) return getMockRecentBlogs(excludeSlug);
  try {
    const { data } = await fetchCollection("/posts", 1, 6);
    const recentBlogs = (Array.isArray(data) ? data : [])
      .map(mapBlogPost)
      .filter((blog) => blog.slug !== excludeSlug)
      .slice(0, 3);
    if (!recentBlogs.length) return getMockRecentBlogs(excludeSlug);
    return { recentBlogs };
  } catch (error) {
    logWpError("getRecentBlogs", error);
    return getMockRecentBlogs(excludeSlug);
  }
}

export async function getCaseStudies(page = 1, limit = 3) {
  if (!isWordpressConfigured()) return getMockCaseStudies(page, limit);
  try {
    // Match production API: featured case studies appear in the featured slot, not the grid.
    const { data } = await fetchCollection("/case-study", 1, 100);
    const caseStudies = (Array.isArray(data) ? data : [])
      .map(mapCaseStudyPost)
      .filter((item) => !item.featured);
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.max(1, Number(limit) || 3);
    const total = caseStudies.length;
    const pages = Math.max(1, Math.ceil(total / safeLimit));
    const start = (safePage - 1) * safeLimit;
    return {
      caseStudies: caseStudies.slice(start, start + safeLimit),
      page: safePage,
      pages,
      total,
    };
  } catch (error) {
    logWpError("getCaseStudies", error);
    return getMockCaseStudies(page, limit);
  }
}

export async function getCaseStudyBySlug(slug) {
  if (!slug) return null;
  if (!isWordpressConfigured()) return getMockCaseStudyBySlug(slug);
  try {
    const post = await fetchBySlug("/case-study", slug);
    if (!post) return getMockCaseStudyBySlug(slug);
    return { caseStudy: mapCaseStudyPost(post) };
  } catch (error) {
    logWpError("getCaseStudyBySlug", error);
    return getMockCaseStudyBySlug(slug);
  }
}

export async function getFeaturedCaseStudy() {
  if (!isWordpressConfigured()) return getMockFeaturedCaseStudy();
  try {
    const caseStudy = await fetchFeaturedOrLatest(
      "/case-study",
      mapCaseStudyPost,
    );
    if (!caseStudy) return getMockFeaturedCaseStudy();
    return { caseStudy };
  } catch (error) {
    logWpError("getFeaturedCaseStudy", error);
    return getMockFeaturedCaseStudy();
  }
}
