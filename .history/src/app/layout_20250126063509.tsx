// app/layout.tsx
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

const navbarPaths = ["/", "/search", "/article"]; // Paths yang perlu menampilkan navbar

// Fungsi untuk menentukan apakah navbar perlu ditampilkan
function showNavbar(pathname: string): boolean {
  return navbarPaths.some((path) => pathname.startsWith(path));
}

export default function RootLayout({
  children,
  pathname, // Dapatkan path dari props atau context
}: {
  children: React.ReactNode;
  pathname: string; // Bisa didapatkan dari context atau langsung diteruskan
}) {
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
