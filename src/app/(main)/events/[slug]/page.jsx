import Component from "@/views/Events/GenericEventPage";
import SeoTags from "@/components/seo/SeoTags";
import { generatePageMetadata, getPageMeta } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return generatePageMetadata(`/events/${slug}`);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const meta = await getPageMeta(`/events/${slug}`);
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
