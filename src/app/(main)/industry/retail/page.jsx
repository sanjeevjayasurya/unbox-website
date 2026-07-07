import Component from "@/views/solutions/industry/IndustryRetailPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/industry/retail");
}

export default async function Page() {
  const { meta } = await staticPageProps("/industry/retail");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
