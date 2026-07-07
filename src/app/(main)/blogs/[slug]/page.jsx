import Component from "@/views/resources/BlogsDetails";
import SeoTags from "@/components/seo/SeoTags";
import { generatePageMetadata, getPageMeta } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return generatePageMetadata(`/blogs/${slug}`);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const meta = await getPageMeta(`/blogs/${slug}`);
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
