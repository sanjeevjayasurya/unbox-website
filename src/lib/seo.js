import fs from "fs";
import path from "path";
import { cache } from "react";

const SCHEMA_DIR = path.join(process.cwd(), "public", "schema");

export const staticRouteMap = {
  "/": {
    pageTitle: "Unbox Robotics - Enter the world of new age parcel distribution",
    title: "Unbox Robotics - Enter the world of new age parcel distribution",
    description:
      "Unleash blazing fast sortation & order consolidation through swarm robotics! Reach your customers faster via scalable automation that adapts to your business needs.",
    schemaFile: "home.json",
    lcpImage: "/images/hero-poster.webp",
  },
  "/technology": {
    pageTitle: "Technology | Unbox Robotics",
    title: "Technology | Unbox Robotics",
    description:
      "Unbox Robotics is built on a focused set of core technologies",
    schemaFile: "technology.json",
    lcpImage: "/images/technology-poster.webp",
  },
  "/about-us": {
    pageTitle: "About Us | Unbox Robotics",
    title: "About Us | Unbox Robotics",
    description:
      "Elevating Fulfillment for digital commerce with intelligent vertical robotic sortation",
    schemaFile: "about.json",
    lcpImage: "/images/about-company.webp",
  },
  "/solutions-overview": {
    pageTitle: "Solutions | Unbox Robotics",
    title: "Solutions | Unbox Robotics",
    description:
      "Enabling the Next Generation of Logistics & Fulfillment Operations",
    schemaFile: "solutions-overview.json",
    lcpImage: "/images/unbox-overview.webp",
  },
  "/solutions-unbox-sort": {
    pageTitle: "UnboxSort | Unbox Robotics",
    title: "UnboxSort | Unbox Robotics",
    description:
      "Enabling the Next Generation of Logistics & Fulfillment Operations",
    schemaFile: "solutions-unboxsort.json",
    lcpImage: "/images/3pl.webp",
  },
  "/get-in-touch": {
    pageTitle: "Get In Touch | Unbox Robotics",
    title: "Get In Touch | Unbox Robotics",
    description:
      "Ready to transform your logistics? Contact Unbox Robotics to book a demo or request a consultation.",
    schemaFile: "get-in-touch.json",
  },
  "/blogs": {
    pageTitle: "Blogs | Unbox Robotics",
    title: "Blogs | Unbox Robotics",
    description:
      "Updates, innovations, and insights powering the next evolution of robotic logistics.",
    schemaFile: "blogs.json",
  },
  "/case-study": {
    pageTitle: "Case Study | Unbox Robotics",
    title: "Case Study | Unbox Robotics",
    description:
      "Dive into real-world examples of how Unbox Robotics is helping logistics, e-commerce, and retail leaders achieve operational excellence.",
    schemaFile: "case-study.json",
    lcpDynamic: {
      endpoint: "/front/case-studies/featured",
      responseKey: "caseStudy",
      imageFields: ["thumbnail_url", "media", "image"],
    },
  },
  "/pr-news": {
    pageTitle: "PR & News | Unbox Robotics",
    title: "PR & News | Unbox Robotics",
    description:
      "Press releases, company milestones, product announcements and coverage from across the world of warehouse automation.",
    schemaFile: "pr-news.json",
    lcpDynamic: {
      endpoint: "/front/pr-news/featured",
      responseKey: "prNews",
      imageFields: ["thumbnail_url", "media"],
    },
  },
  "/industry": {
    pageTitle: "Industry | Unbox Robotics",
    title: "Industry | Unbox Robotics",
    description:
      "Optimized Sortation for Leading Industries — e-commerce, retail, 3PL, and CEP.",
    schemaFile: "industry.json",
    lcpImage: "/images/industry-poster.webp",
  },
  "/faqs": {
    pageTitle: "FAQ | Unbox Robotics",
    title: "FAQ | Unbox Robotics",
    description:
      "Quick answers to questions you may have about Unbox Robotics and UnboxSort.",
    schemaFile: "faqs.json",
  },
  "/terms-of-services": {
    pageTitle: "Terms of Use | Unbox Robotics",
    title: "Terms of Use | Unbox Robotics",
    description: "UNBOXROBOTICS LABS PRIVATE LIMITED - Terms of Use",
    schemaFile: "terms.json",
  },
  "/privacy-policy": {
    pageTitle: "Privacy and Cookie Policy | Unbox Robotics",
    title: "Privacy and Cookie Policy | Unbox Robotics",
    description: "Website Privacy and Cookie Policy for Unbox Robotics.",
    schemaFile: "privacy-policy.json",
  },
  "/gdpr-compliance": {
    pageTitle: "GDPR Compliance Statement | Unbox Robotics",
    title: "GDPR Compliance Statement | Unbox Robotics",
    description:
      "Unbox Robotics GDPR compliance information and your rights under the General Data Protection Regulation.",
    schemaFile: "gdpr.json",
  },
  "/data-processing-agreement": {
    pageTitle: "Data Processing Agreement | Unbox Robotics",
    title: "Data Processing Agreement | Unbox Robotics",
    description:
      "Data Processing Agreement outlining how Unbox Robotics processes personal data on behalf of customers.",
    schemaFile: "data-processing-agreement.json",
  },
  "/events": {
    pageTitle: "News & Events | Unbox Robotics",
    title: "News & Events | Unbox Robotics",
    description:
      "Discover the latest news, funding updates, and breakthrough innovations in warehouse robotics.",
    schemaFile: "events.json",
    lcpImage: "/images/events-hero.webp",
  },
  "/events/logimat2026": {
    pageTitle: "LogiMAT 2026 | Unbox Robotics",
    title: "LogiMAT 2026 | Unbox Robotics",
    description:
      "Experience a complete, automated parcel workflow at LogiMAT 2026. From Delta robotic induction to UnboxSort's 3D vertical sortation. Hall 8, Stand 8A37.",
    schemaFile: "events-logimat-2026.json",
    lcpImage: "/images/logimat-hero.webp",
  },
  "/events/deliver-europe-2026": {
    pageTitle: "DELIVER Europe 2026 | Unbox Robotics",
    title: "DELIVER Europe 2026 | Unbox Robotics",
    description:
      "Meet UnboxSort at DELIVER Europe 2026 — World's First Vertical Mobile Sortation. Join us at Booth C66, TAETS Event Park, Amsterdam, June 3–4, 2026.",
    image: "https://unboxrobotics.com/og-deliver-europe-2026.jpg",
    schemaFile: "deliver-europe-2026.json",
    lcpImage: "/images/deliver-europe-hero.webp",
  },
  "/events/cemat-australia-2026": {
    pageTitle: "CeMAT Australia 2026 | Unbox Robotics",
    title: "CeMAT Australia 2026 | Unbox Robotics",
    description:
      "Meet Unbox Robotics at CeMAT Australia 2026 — the premier intralogistics trade show.",
    schemaFile: "events.json",
    lcpImage: "/images/events-hero.webp",
  },
  "/careers": {
    pageTitle: "Careers | Unbox Robotics",
    title: "Careers | Unbox Robotics",
    description:
      "Join Unbox Robotics and help build the future of warehouse automation.",
    schemaFile: "about.json",
  },
  "/product-overview": {
    pageTitle: "Product Overview | Unbox Robotics",
    title: "Product Overview | Unbox Robotics",
    description:
      "Discover UnboxSort — modular vertical robotic parcel sortation for modern logistics.",
    schemaFile: "solutions-unboxsort.json",
  },
  "/product/series-b-funded": {
    pageTitle: "Series B Funding | Unbox Robotics",
    title: "Series B Funding | Unbox Robotics",
    description:
      "Unbox Robotics raises Series B funding to accelerate global warehouse automation.",
    schemaFile: "about.json",
  },
  "/industry/retail": {
    pageTitle: "Retail | Unbox Robotics",
    title: "Retail | Unbox Robotics",
    description:
      "Robotic sortation solutions optimized for retail logistics and fulfillment.",
    schemaFile: "industry-retail.json",
  },
  "/industry/e-commerce": {
    pageTitle: "E-Commerce | Unbox Robotics",
    title: "E-Commerce | Unbox Robotics",
    description:
      "High-speed robotic sortation for e-commerce fulfillment centers.",
    schemaFile: "industry-ecommerce.json",
  },
  "/industry/3pl": {
    pageTitle: "3PL | Unbox Robotics",
    title: "3PL | Unbox Robotics",
    description:
      "Scalable sortation automation for third-party logistics providers.",
    schemaFile: "industry-3pl.json",
  },
  "/industry/cep": {
    pageTitle: "CEP | Unbox Robotics",
    title: "CEP | Unbox Robotics",
    description:
      "Courier, express and parcel sortation powered by swarm robotics.",
    schemaFile: "industry-cep.json",
  },
  "/use-cases/fulfillment-center-order-consolidation": {
    pageTitle: "Order Consolidation | Unbox Robotics",
    title: "Fulfillment Center Order Consolidation | Unbox Robotics",
    description:
      "Automate order consolidation in fulfillment centers with UnboxSort.",
    schemaFile: "use-case-order-consolidation.json",
  },
  "/use-cases/fulfillment-center-click-and-collect": {
    pageTitle: "Click and Collect | Unbox Robotics",
    title: "Fulfillment Center Click and Collect | Unbox Robotics",
    description:
      "Streamline click-and-collect operations with intelligent robotic sortation.",
    schemaFile: "use-case-click-and-collect.json",
  },
  "/use-cases/fulfillment-center-outbound-sortation": {
    pageTitle: "Outbound Sortation | Unbox Robotics",
    title: "Fulfillment Center Outbound Sortation | Unbox Robotics",
    description:
      "High-throughput outbound sortation for fulfillment centers.",
    schemaFile: "use-case-outbound-sortation.json",
  },
  "/use-cases/sort-center-mid-mile-sortation": {
    pageTitle: "Mid-Mile Sortation | Unbox Robotics",
    title: "Sort Center Mid-Mile Sortation | Unbox Robotics",
    description:
      "Mid-mile sortation automation for sort centers and hubs.",
    schemaFile: "use-case-mid-mile-sortation.json",
  },
  "/use-cases/distribution-center-returns-sortation": {
    pageTitle: "Returns Sortation | Unbox Robotics",
    title: "Distribution Center Returns Sortation | Unbox Robotics",
    description:
      "Efficient returns sortation for distribution centers.",
    schemaFile: "use-case-returns-sortation.json",
  },
  "/use-cases/b2b-store-order-fulfillment": {
    pageTitle: "B2B Store Fulfillment | Unbox Robotics",
    title: "B2B Store Order Fulfillment | Unbox Robotics",
    description:
      "B2B store order fulfillment powered by vertical robotic sortation.",
    schemaFile: "use-case-b2b-fulfillment.json",
  },
  "/use-cases/delivery-hub-last-mile-sortation": {
    pageTitle: "Last-Mile Sortation | Unbox Robotics",
    title: "Delivery Hub Last-Mile Sortation | Unbox Robotics",
    description:
      "Last-mile sortation automation for delivery hubs.",
    schemaFile: "use-case-delivery-hub.json",
  },
};

export const dynamicRouteConfigs = [
  {
    pattern: /^\/blogs\/([^/]+)\/?$/,
    endpoint: "/front/blogs",
    responseKey: "blog",
    urlPrefix: "/blogs",
    type: "article",
    imageField: "image",
  },
  {
    pattern: /^\/case-study\/([^/]+)\/?$/,
    endpoint: "/front/case-studies",
    responseKey: "caseStudy",
    urlPrefix: "/case-study",
    type: "article",
    imageField: "media",
    imagePredicate: (item) => item?.mediaType === "image",
  },
  {
    pattern: /^\/pr-news\/([^/]+)\/?$/,
    endpoint: "/front/pr-news",
    responseKey: "prNews",
    urlPrefix: "/pr-news",
    type: "article",
    imageField: "media",
  },
  {
    pattern: /^\/white-paper\/([^/]+)\/?$/,
    endpoint: "/front/white-papers",
    responseKey: "whitePaper",
    urlPrefix: "/white-paper",
    type: "article",
    imageField: "image",
  },
  {
    pattern: /^\/careers\/([^/]+)\/apply\/?$/,
    endpoint: "/front/jobs",
    responseKey: "job",
    urlPrefix: "/careers",
    type: "website",
    imageField: "image",
    slugFromMatch: 1,
  },
  {
    pattern: /^\/careers\/([^/]+)\/?$/,
    endpoint: "/front/jobs",
    responseKey: "job",
    urlPrefix: "/careers",
    type: "website",
    imageField: "image",
    slugFromMatch: 1,
  },
];

export function normalizeConfig(config = {}) {
  const frontendUrl = (
    config.frontendUrl ||
    process.env.NEXT_PUBLIC_FRONTEND_URL ||
    "https://unboxrobotics.com"
  ).replace(/\/$/, "");
  const apiBaseUrl = (
    config.apiBaseUrl ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://unboxadmin.4tysixapplabs.com/api"
  ).replace(/\/$/, "");
  const backendUrl = (
    config.backendUrl ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://unboxadmin.4tysixapplabs.com"
  ).replace(/\/$/, "");

  return {
    frontendUrl,
    apiBaseUrl,
    backendUrl,
    defaultImage: `${frontendUrl}/logo512.png`,
  };
}

export function getDefaultMeta() {
  const { frontendUrl, defaultImage } = normalizeConfig();
  return {
    pageTitle:
      "Unbox Robotics - Enter the world of new age parcel distribution",
    title: "Unbox Robotics - Enter the world of new age parcel distribution",
    description:
      "Unleash blazing fast sortation & order consolidation through swarm robotics! Reach your customers faster via scalable automation that adapts to your business needs.",
    image: defaultImage,
    url: `${frontendUrl}/`,
    type: "website",
  };
}

export function loadSchema(filename) {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(SCHEMA_DIR, filename), "utf8"),
    );
  } catch {
    return null;
  }
}

export function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function trimText(value = "", maxLength = 180) {
  if (!value || value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength - 1).trim()}…`;
}

export function resolveAssetUrl(value, backendUrl, defaultImage) {
  if (!value) {
    return defaultImage;
  }
  if (/^https?:\/\//i.test(value)) {
    return value;
  }
  return `${backendUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

export function getRouteConfig(routePath) {
  for (const config of dynamicRouteConfigs) {
    const match = routePath.match(config.pattern);
    if (match) {
      return { config, slug: match[1] };
    }
  }
  return null;
}

export function mapContentToMeta(item, routeConfig, slug, config, defaultMeta) {
  const title = item?.title || defaultMeta.title;
  const rawDescription =
    item?.description || item?.excerpt || stripHtml(item?.content || "");
  const description = trimText(rawDescription || defaultMeta.description);
  const canUseImage = routeConfig.imagePredicate
    ? routeConfig.imagePredicate(item)
    : true;
  const image = canUseImage
    ? resolveAssetUrl(
        item?.[routeConfig.imageField],
        config.backendUrl,
        config.defaultImage,
      )
    : resolveAssetUrl(
        item?.thumbnail_url,
        config.backendUrl,
        config.defaultImage,
      );
  const url = `${config.frontendUrl}${routeConfig.urlPrefix}/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": routeConfig.type === "article" ? "BlogPosting" : "WebPage",
    headline: title,
    description,
    image,
    url,
    publisher: {
      "@type": "Organization",
      name: "Unbox Robotics",
      logo: {
        "@type": "ImageObject",
        url: "https://unboxrobotics.com/logo512.png",
      },
    },
    author: {
      "@type": "Organization",
      name: "Unbox Robotics",
    },
    datePublished: item?.date || item?.created_at || new Date().toISOString(),
  };

  return {
    pageTitle: `${title} | Unbox Robotics`,
    title,
    description,
    image,
    url,
    type: routeConfig.type,
    schema,
  };
}

async function fetchJson(url, timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function getStaticMeta(routePath, config = normalizeConfig()) {
  const route = staticRouteMap[routePath];
  if (!route) return null;

  const meta = {
    pageTitle: route.pageTitle,
    title: route.title,
    description: route.description,
    image: route.image || config.defaultImage,
    url: `${config.frontendUrl}${routePath}`,
    type: "website",
    schema: loadSchema(route.schemaFile),
    lcpImage: route.lcpImage || null,
  };

  if (route.lcpDynamic && !meta.lcpImage) {
    try {
      const data = await fetchJson(
        `${config.apiBaseUrl}${route.lcpDynamic.endpoint}`,
        3000,
      );
      const item = data?.[route.lcpDynamic.responseKey];
      const rawUrl = route.lcpDynamic.imageFields.reduce(
        (acc, field) => acc || item?.[field],
        null,
      );
      if (rawUrl) {
        meta.lcpImage = resolveAssetUrl(rawUrl, config.backendUrl, null);
      }
    } catch {
      // fail silently
    }
  }

  return meta;
}

export async function fetchMetaForPath(routePath, config = normalizeConfig()) {
  const defaultMeta = getDefaultMeta();
  const staticMeta = await getStaticMeta(routePath, config);
  if (staticMeta) return staticMeta;

  const matchedRoute = getRouteConfig(routePath);
  if (!matchedRoute) return defaultMeta;

  const { config: routeConfig, slug } = matchedRoute;
  const data = await fetchJson(
    `${config.apiBaseUrl}${routeConfig.endpoint}/${slug}`,
  );
  const item = data?.[routeConfig.responseKey];
  if (!item) return defaultMeta;

  return mapContentToMeta(item, routeConfig, slug, config, defaultMeta);
}

export const fetchDynamicContent = cache(async (routeConfig, slug) => {
  const config = normalizeConfig();
  const data = await fetchJson(
    `${config.apiBaseUrl}${routeConfig.endpoint}/${slug}`,
  );
  return data?.[routeConfig.responseKey] ?? null;
});

export function metaToNextMetadata(meta) {
  return {
    title: { absolute: meta.pageTitle },
    description: meta.description,
    alternates: {
      canonical: meta.url,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.url,
      type: meta.type === "article" ? "article" : "website",
      images: [{ url: meta.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.image],
    },
  };
}

export async function generatePageMetadata(routePath) {
  const meta = await fetchMetaForPath(routePath);
  return metaToNextMetadata(meta);
}

export async function getPageMeta(routePath) {
  return fetchMetaForPath(routePath);
}
