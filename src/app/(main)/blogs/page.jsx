import Component from "@/views/resources/Blogs";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export const revalidate = 3600;

export async function generateMetadata() {
  return staticPageMetadata("/blogs");
}

export default async function Page() {
  const { meta } = await staticPageProps("/blogs");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
