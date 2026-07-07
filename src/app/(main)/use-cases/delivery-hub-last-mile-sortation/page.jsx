import Component from "@/views/use-cases/DeliveryHubLastMileSortationPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/use-cases/delivery-hub-last-mile-sortation");
}

export default async function Page() {
  const { meta } = await staticPageProps("/use-cases/delivery-hub-last-mile-sortation");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
