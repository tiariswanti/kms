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

export default function Page({ navbar }: { navbar: string[] }) {
  // Menampilkan navbar berdasarkan prop navbar yang dikirim dari getStaticProps
  return (
    <div>
      {navbar.includes("/search") && <Navbar />}
      <h1>Welcome to the Page!</h1>
    </div>
  );
}

export default function RootLayou({ navbar }: { navbar: string[] }) {
  const pathname = usePathname();

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
