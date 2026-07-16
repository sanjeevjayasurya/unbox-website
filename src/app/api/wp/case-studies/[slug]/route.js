import { NextResponse } from "next/server";
import { getCaseStudyBySlug } from "@/lib/wordpress";

export const revalidate = 3600;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

export async function GET(_request, { params }) {
  const { slug } = await params;
  const data = await getCaseStudyBySlug(slug);
  if (!data?.caseStudy) {
    return NextResponse.json(
      { caseStudy: null },
      { status: 404, headers: CACHE_HEADERS },
    );
  }
  return NextResponse.json(data, { headers: CACHE_HEADERS });
}
