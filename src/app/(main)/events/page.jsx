import Component from "@/views/Events/NewsAndEventsPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/events");
}

export default async function Page() {
  const { meta } = await staticPageProps("/events");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
