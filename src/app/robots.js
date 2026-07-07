import { normalizeConfig } from "@/lib/seo";

export default function robots() {
  const frontendUrl = normalizeConfig().frontendUrl;

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${frontendUrl}/sitemap.xml`,
  };
}
