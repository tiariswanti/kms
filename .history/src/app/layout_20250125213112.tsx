"use client";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const navbar = ["/", "/search"];

function showNavbar(pathname: string): boolean {
  if (navbar.includes(pathname)) {
    return true;
  }
  if (pathname.startsWith("/article")) {
    return true;
  }
  return false;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {showNavbar(pathname) && <Navbar />}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

