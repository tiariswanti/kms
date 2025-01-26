"use client";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
// app/page.tsx
export async function getStaticProps() {
  // Logika untuk menentukan navbar berdasarkan path jika diperlukan
  return {
    props: {
      navbar: ["/", "/search"],
    },
  };
}

export default function RootLayout({
  navbar,
  children,
}: {
  navbar: string[];
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {navbar.includes("/search") && <Navbar />}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
