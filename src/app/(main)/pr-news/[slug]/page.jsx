import Component from "@/views/resources/PrNewsDetails";
import SeoTags from "@/components/seo/SeoTags";
import { generatePageMetadata, getPageMeta } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return generatePageMetadata(`/pr-news/${slug}`);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const meta = await getPageMeta(`/pr-news/${slug}`);
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
