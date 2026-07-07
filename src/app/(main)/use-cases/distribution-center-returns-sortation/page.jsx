import Component from "@/views/use-cases/DistributionCenterReturnsSortationPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/use-cases/distribution-center-returns-sortation");
}

export default async function Page() {
  const { meta } = await staticPageProps("/use-cases/distribution-center-returns-sortation");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
