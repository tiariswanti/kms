// app/search/layout.tsx (Layout component for metadata and wrapping content)
import { generateMetadata as generateSearchMetadata } from "./page"; // Import metadata logic
import React from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: URLSearchParams;
}): Promise<Metadata> {
  const query = searchParams.get("query");
  const category = searchParams.get("category");

  const title =
    query && category
      ? `Search result for category "${category}" and query "${query}"`
      : query
      ? `Search result for "${query}"`
      : category
      ? `Search result for category "${category}"`
      : "Search Articles";

  const description =
    query && category
      ? `Search articles by category "${category}" and query "${query}"`
      : query
      ? `Search articles by query "${query}"`
      : category
      ? `Search articles by category "${category}"`
      : "Browse all articles";

  return {
    title,
    description,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Here you could also add common layout structure like header, footer, etc. */}
      {children}
    </div>
  );
}
