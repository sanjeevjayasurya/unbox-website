import Component from "@/views/solutions/industry/IndustryECommercePage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/industry/e-commerce");
}

export default async function Page() {
  const { meta } = await staticPageProps("/industry/e-commerce");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
