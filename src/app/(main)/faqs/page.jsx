import Component from "@/views/faqs/FaqsPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/faqs");
}

export default async function Page() {
  const { meta } = await staticPageProps("/faqs");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
