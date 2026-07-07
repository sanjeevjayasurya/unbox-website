import Component from "@/views/dpa/DataProcessingAgreementPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/data-processing-agreement");
}

export default async function Page() {
  const { meta } = await staticPageProps("/data-processing-agreement");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
