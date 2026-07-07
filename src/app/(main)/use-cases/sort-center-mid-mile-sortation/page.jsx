import Component from "@/views/use-cases/SortCenterMidMileSortationPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/use-cases/sort-center-mid-mile-sortation");
}

export default async function Page() {
  const { meta } = await staticPageProps("/use-cases/sort-center-mid-mile-sortation");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
