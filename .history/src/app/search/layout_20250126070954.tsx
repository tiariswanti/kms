import React from "react";

export async function generateMetadata() {
  return {
    title: "Search Articles",
    description: "Search articles by category and query",
    robots: "index, nfollow",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
