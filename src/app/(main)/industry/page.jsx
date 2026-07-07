import Component from "@/views/industry/IndustryPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/industry");
}

export default async function Page() {
  const { meta } = await staticPageProps("/industry");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
