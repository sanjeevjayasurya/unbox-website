import Component from "@/views/Events/CeMATAustralia2026Page";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";

export async function generateMetadata() {
  return staticPageMetadata("/events/cemat-australia-2026");
}

export default async function Page() {
  const { meta } = await staticPageProps("/events/cemat-australia-2026");
  return (
    <>
      <SeoTags meta={meta} />
      <Component />
    </>
  );
}
