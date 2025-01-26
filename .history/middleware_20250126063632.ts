// app/middleware.ts
import { NextResponse } from "next/server";

export function middleware(request: any) {
  const token = request.cookies["token"];
  const pathname = request.nextUrl.pathname;

  // Cek apakah token ada (untuk authentication)
  if (!token && pathname.startsWith("/admin")) {
    // Redirect ke login jika tidak ada token dan path menuju /admin
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logika tambahan untuk path tertentu yang memerlukan navbar
  const navbarPaths = ["/", "/search", "/article"];
  if (navbarPaths.some((path) => pathname.startsWith(path))) {
    // Lakukan sesuatu jika path membutuhkan navbar, misalnya menambahkan header atau metadata
    // Anda bisa memanipulasi response atau melakukan logika lain jika diperlukan
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/", "/search", "/article"], // Tentukan paths yang akan dijaga oleh middleware
};
