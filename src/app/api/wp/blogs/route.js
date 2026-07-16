import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/wordpress";

export const revalidate = 3600;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 3);
  const excludeSlug = searchParams.get("excludeSlug") || undefined;

  const data = await getBlogs(page, limit, { excludeSlug });
  return NextResponse.json(data, { headers: CACHE_HEADERS });
}
