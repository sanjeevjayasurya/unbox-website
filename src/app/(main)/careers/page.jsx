import Component from "@/views/company/CareersCompanyPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/careers");
}

export default async function Page() {
  const { meta } = await staticPageProps("/careers");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
