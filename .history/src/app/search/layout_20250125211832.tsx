import { Metadata } from "next";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Search Article",
    description:
      "Temukan berbagai mobil bekas dan baru yang dijual dengan harga terbaik di website kami.",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
