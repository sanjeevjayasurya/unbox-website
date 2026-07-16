import { NextResponse } from "next/server";
import { getBlogBySlug } from "@/lib/wordpress";

export const revalidate = 3600;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

export async function GET(_request, { params }) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);
  if (!data?.blog) {
    return NextResponse.json({ blog: null }, { status: 404, headers: CACHE_HEADERS });
  }
  return NextResponse.json(data, { headers: CACHE_HEADERS });
}
