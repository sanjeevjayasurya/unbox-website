import Component from "@/views/technology/Technology";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/technology");
}

export default async function Page() {
  const { meta } = await staticPageProps("/technology");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
