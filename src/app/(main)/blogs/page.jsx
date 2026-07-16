import Component from "@/views/resources/Blogs";
import SeoTags from "@/components/seo/SeoTags";
import { staticPageMetadata, staticPageProps } from "@/lib/page-helpers";
import { getBlogs, getFeaturedBlog } from "@/lib/wordpress";

export const revalidate = 3600;

export async function generateMetadata() {
  return staticPageMetadata("/blogs");
}

export default async function Page() {
  const { meta } = await staticPageProps("/blogs");

  // Server-fetch featured + first grid page so HTML includes real posts on first paint.
  const featuredResult = await getFeaturedBlog();
  const featuredBlog = featuredResult?.blog ?? null;
  const initialBlogsPage = await getBlogs(1, 3, {
    excludeSlug: featuredBlog?.slug,
  });

  return (
    <>
      <SeoTags meta={meta} />
      <Component
        initialFeaturedBlog={featuredBlog}
        initialBlogsPage={initialBlogsPage}
      />
    </>
  );
}
