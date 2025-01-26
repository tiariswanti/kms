// app/layout.tsx
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";
import Navbar from "./components/Navbar/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Site Title",
  description: "Description of your site for SEO",
};

const navbarPaths = ["/", "/search", "/article"];

function showNavbar(pathname: string): boolean {
  return navbarPaths.some((path) => pathname.startsWith(path));
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
