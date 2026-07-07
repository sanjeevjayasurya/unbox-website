import Component from "@/views/success-page/SuccessPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/thank-you");
}

export default async function Page() {
  const { meta } = await staticPageProps("/thank-you");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
