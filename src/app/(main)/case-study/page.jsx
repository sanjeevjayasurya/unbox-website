import Component from "@/views/resources/CaseStudy";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export const revalidate = 3600;

export async function generateMetadata() {
  return staticPageMetadata("/case-study");
}

export default async function Page() {
  const { meta } = await staticPageProps("/case-study");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
