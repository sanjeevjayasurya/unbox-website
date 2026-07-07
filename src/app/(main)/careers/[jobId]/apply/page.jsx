import Component from "@/views/careers/OpenPositionForm";
import SeoTags from "@/components/seo/SeoTags";
import { generatePageMetadata, getPageMeta } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { jobId } = await params;
  return generatePageMetadata(`/careers/${jobId}`);
}

export default async function Page({ params }) {
  const { jobId } = await params;
  const meta = await getPageMeta(`/careers/${jobId}`);
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
