import { staticRouteMap, normalizeConfig } from "@/lib/seo";

const frontendUrl = normalizeConfig().frontendUrl;

export default function sitemap() {
  const lastModified = new Date("2026-05-18");

  const staticEntries = Object.keys(staticRouteMap).map((route) => ({
    url: `${frontendUrl}${route}`,
    lastModified,
    changeFrequency: route.includes("blogs") || route.includes("pr-news")
      ? "weekly"
      : "monthly",
    priority: route === "/" ? 1 : route.includes("terms") || route.includes("privacy") || route.includes("gdpr") || route.includes("data-processing") ? 0.5 : 0.8,
  }));

  return staticEntries;
}
