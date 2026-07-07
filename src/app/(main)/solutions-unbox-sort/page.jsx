import Component from "@/views/solutions/SolutionUnboxSortPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/solutions-unbox-sort");
}

export default async function Page() {
  const { meta } = await staticPageProps("/solutions-unbox-sort");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
