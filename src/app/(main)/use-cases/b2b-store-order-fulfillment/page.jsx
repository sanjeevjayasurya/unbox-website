import Component from "@/views/use-cases/B2BStoreOrderFulfillmentPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/use-cases/b2b-store-order-fulfillment");
}

export default async function Page() {
  const { meta } = await staticPageProps("/use-cases/b2b-store-order-fulfillment");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
