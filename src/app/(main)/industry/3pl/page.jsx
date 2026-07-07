import Component from "@/views/solutions/industry/Industry3PLPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/industry/3pl");
}

export default async function Page() {
  const { meta } = await staticPageProps("/industry/3pl");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
