import Component from "@/views/marketing/ProductOverviewPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/product-overview");
}

export default async function Page() {
  const { meta } = await staticPageProps("/product-overview");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
