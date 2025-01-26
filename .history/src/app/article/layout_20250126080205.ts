// app/layouts/ArticleLayout.tsx
import React from "react";
import { createSlug } from "@/utils/slug"; // Menggunakan createSlug untuk membuat slug dari judul artikel

type ArticleLayoutProps = {
  children: React.ReactNode;
  params: {
    id: string;
    slug: string;
  };
};

type Article = {
  id: string;
  title: string;
  author: string;
  urlToImage: string;
  description: string;
  content: string;
  keywords: string[];
  summary: string;
  references: string;
  category: string;
};

async function getArticleData() {
  const res = await fetch("http://localhost:5000/articles", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata({ params }: ArticleLayoutProps) {
  const { id, slug } = params;
  const articleData: Article[] = await getArticleData();

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

export default function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <div>
      {/* Metatag yang dihasilkan oleh generateMetadata akan disuntikkan di sini */}
      {children}
    </div>
  );
}
