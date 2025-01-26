import { useEffect, useState } from "react";
import axios from "axios";
import { createSlug } from "@/utils/slug";
import { getViewerId } from "@/utils/getViewerID";

type LayoutProps = {
  children: React.ReactNode;
  params: { id: string; slug: string };
};

async function getData() {
  const res = await fetch("http://localhost:5000/articles", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// Generate metadata
export async function generateMetadata({ params }: LayoutProps) {
  const { id, slug } = params;
  const articleData = await getData();

  const article = articleData.find((article) => {
    const articleSlug = createSlug(article.title);
    return article.id === id && articleSlug === slug;
  });

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
      robots: "noindex, follow",
    };
  }

  const formattedKeywords = article.keywords.join(", ");

  return {
    title: article.title,
    description: article.summary,
    keywords: formattedKeywords,
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://localhost:3000/article/${article.id}/${slug}`,
      images: [
        {
          url: article.urlToImage || "/pict2.webp",
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: [article.urlToImage || "/pict2.webp"],
    },
  };
}

export default function Layout({ children, params }: LayoutProps) {
  return <div>{children}</div>;
}
