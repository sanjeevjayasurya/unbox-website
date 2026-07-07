import Component from "@/views/product/SeriesBFundedPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/product/series-b-funded");
}

export default async function Page() {
  const { meta } = await staticPageProps("/product/series-b-funded");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
