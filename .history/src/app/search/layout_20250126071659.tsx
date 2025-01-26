import React from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams dari next/navigation

// Fungsi generateMetadata untuk mengambil searchParams dan menyesuaikan metadata
export async function generateMetadata({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  let title = "Search Articles";
  let description = "Search articles by category or query";

  if (query && category) {
    title = `Search Results for ${category} and ${query}`;
    description = `Search articles for category: ${category} and query: ${query}`;
  } else if (query) {
    title = `Search Results for Query: ${query}`;
    description = `Search articles for query: ${query}`;
  } else if (category) {
    title = `Search Results for Category: ${category}`;
    description = `Search articles for category: ${category}`;
  }

  return {
    title: title,
    description: description,
    robots: "noindex, follow", // Untuk mencegah indexing pada hasil pencarian
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams(); // Mengambil searchParams dari URL

  return (
    <div>
      {children} {/* Menampilkan konten anak (children) di layout */}
    </div>
  );
}
