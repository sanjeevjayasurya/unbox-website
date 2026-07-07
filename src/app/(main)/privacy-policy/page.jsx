import Component from "@/views/privacy/PrivacyPolicyPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/privacy-policy");
}

export default async function Page() {
  const { meta } = await staticPageProps("/privacy-policy");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
