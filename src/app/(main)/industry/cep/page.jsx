import Component from "@/views/solutions/industry/IndustryCEPPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/industry/cep");
}

export default async function Page() {
  const { meta } = await staticPageProps("/industry/cep");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
