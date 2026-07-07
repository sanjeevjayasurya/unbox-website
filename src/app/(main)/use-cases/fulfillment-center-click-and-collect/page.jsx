import Component from "@/views/use-cases/FulfillmentCenterClickAndCollectPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/use-cases/fulfillment-center-click-and-collect");
}

export default async function Page() {
  const { meta } = await staticPageProps("/use-cases/fulfillment-center-click-and-collect");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
