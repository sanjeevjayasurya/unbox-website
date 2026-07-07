import Component from "@/views/solutions/SolutionOverviewPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/solutions-overview");
}

export default async function Page() {
  const { meta } = await staticPageProps("/solutions-overview");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
