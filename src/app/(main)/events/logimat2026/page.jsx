import Component from "@/views/Events/EventPage";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/events/logimat2026");
}

export default async function Page() {
  const { meta } = await staticPageProps("/events/logimat2026");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
