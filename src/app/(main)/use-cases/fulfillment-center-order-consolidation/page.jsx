import Component from "@/views/use-cases/FulfillmentCenterOrderConsolidationPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/use-cases/fulfillment-center-order-consolidation");
}

export default async function Page() {
  const { meta } = await staticPageProps("/use-cases/fulfillment-center-order-consolidation");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
