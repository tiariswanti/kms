import { NextResponse } from "next/server";

export function middleware(request: any) {
  const token = request.cookies["token"];

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = { matcher: "/admin/:path*" };

