import Component from "@/views/get-in-touch/GetInTouch";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/get-in-touch");
}

export default async function Page() {
  const { meta } = await staticPageProps("/get-in-touch");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
