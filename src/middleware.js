import { NextResponse } from "next/server";

// Legacy WordPress-only URLs with no equivalent page: return 410 Gone so search
// engines drop them (mirrors the old Express server behavior).
export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (/^\/(team|tag)(\/|$)/.test(pathname)) {
    return new NextResponse("Gone", { status: 410 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/team/:path*", "/tag/:path*"],
};
