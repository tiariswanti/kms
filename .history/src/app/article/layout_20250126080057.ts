// app/layouts/ArticleLayout.tsx
import React from "react";
import { generateMetadata } from "@/utils/generateMetadata"; // Fungsi generateMetadata yang sudah Anda buat sebelumnya

type ArticleLayoutProps = {
  children: React.ReactNode;
  params: {
    id: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: ArticleLayoutProps) {
  return await generateMetadata({ params }); // Panggil generateMetadata yang sudah ada
}

export default function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <div>
      {/* Metatag yang dihasilkan oleh generateMetadata akan disuntikkan di sini */}
      {children}
    </div>
  );
}
