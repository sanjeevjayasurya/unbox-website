import { NextResponse } from "next/server";
import { getFeaturedCaseStudy } from "@/lib/wordpress";

export const revalidate = 3600;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

export async function GET() {
  const data = await getFeaturedCaseStudy();
  return NextResponse.json(data, { headers: CACHE_HEADERS });
}
