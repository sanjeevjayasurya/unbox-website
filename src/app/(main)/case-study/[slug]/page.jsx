import Component from "@/views/resources/CaseStudyDetails";
import SeoTags from "@/components/seo/SeoTags";
import { generatePageMetadata, getPageMeta } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return generatePageMetadata(`/case-study/${slug}`);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const meta = await getPageMeta(`/case-study/${slug}`);
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
