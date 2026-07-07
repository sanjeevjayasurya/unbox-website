import HomePage from "@/views/home/HomePage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/");
}

export default async function Page() {
  const { meta } = await staticPageProps("/");
  return (
    <>
      <SeoTags meta={meta} />
      <HomePage />
    </>
  );
}
