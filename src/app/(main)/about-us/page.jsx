import Component from "@/views/company/AboutCompanyPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/about-us");
}

export default async function Page() {
  const { meta } = await staticPageProps("/about-us");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
