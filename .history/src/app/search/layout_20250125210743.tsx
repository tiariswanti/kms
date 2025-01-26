// app/search/layout.tsx (Layout component for metadata and wrapping content)
import { generateMetadata as generateSearchMetadata } from "./page"; // Import metadata logic
import React from "react";

export function generateMetadata({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  // Example: Generate metadata based on search params
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "All Categories";

  return {
    title: `Search Articles | ${query ? `Results for ${query}` : category}`,
    description: `Search articles by category "${category}" and query "${query}".`,
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
