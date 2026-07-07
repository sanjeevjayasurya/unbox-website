import Component from "@/views/use-cases/FulfillmentCenterOutboundSortationPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/use-cases/fulfillment-center-outbound-sortation");
}

export default async function Page() {
  const { meta } = await staticPageProps("/use-cases/fulfillment-center-outbound-sortation");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
