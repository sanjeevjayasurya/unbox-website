import Component from "@/views/resources/PrNews";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export const revalidate = 3600;

export async function generateMetadata() {
  return staticPageMetadata("/pr-news");
}

export default async function Page() {
  const { meta } = await staticPageProps("/pr-news");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
