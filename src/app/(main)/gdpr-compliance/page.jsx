import Component from "@/views/gdpr/PrivacyPolicyPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/gdpr-compliance");
}

export default async function Page() {
  const { meta } = await staticPageProps("/gdpr-compliance");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
