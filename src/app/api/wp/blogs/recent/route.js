import { NextResponse } from "next/server";
import { getRecentBlogs } from "@/lib/wordpress";

export const revalidate = 3600;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const excludeSlug = searchParams.get("excludeSlug") || undefined;
  const data = await getRecentBlogs(excludeSlug);
  return NextResponse.json(data, { headers: CACHE_HEADERS });
}
