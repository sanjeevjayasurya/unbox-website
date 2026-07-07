import Component from "@/views/terms/TermsPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/terms-of-services");
}

export default async function Page() {
  const { meta } = await staticPageProps("/terms-of-services");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
