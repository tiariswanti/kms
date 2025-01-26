import { NextResponse } from "next/server";

export function middleware(request: any) {
  const token = request.cookies["token"];

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = { matcher: "/admin/:path*" };

const navbarPaths = ["/", "/search", "/article"];
  if (navbarPaths.some(path => pathname.startsWith(path))) {
    // Lakukan sesuatu jika path membutuhkan navbar, misalnya menambahkan header atau metadata
    // Anda bisa memanipulasi response atau melakukan logika lain jika diperlukan
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/", "/search", "/article"], // Tentukan paths yang akan dijaga oleh middleware
};