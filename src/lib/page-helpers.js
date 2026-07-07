import { getPageMeta, metaToNextMetadata } from "./seo";

export async function staticPageMetadata(routePath) {
  const meta = await getPageMeta(routePath);
  return metaToNextMetadata(meta);
}

export async function staticPageProps(routePath) {
  const meta = await getPageMeta(routePath);
  return { meta };
}
