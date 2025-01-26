"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import MainContent from "@/app/components/Content/MainContent";
import TableOfContent from "@/app/components/Content/TableOfContent";
import { getViewerId } from "@/utils/getViewerID";
import { createSlug } from "@/utils/slug";

type ArticlePageProps = {
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

async function getData() {
  const res = await fetch("http://localhost:5000/articles", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { id, slug } = params;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const articleData: Article[] = await getData();
        const foundArticle = articleData.find((article) => {
          const articleSlug = createSlug(article.title);
          return article.id === id && articleSlug === slug;
        });
        setArticle(foundArticle || null);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    }
    fetchData();
  }, [id, slug]);

  // Dapatkan viewerId dari localStorage
  const viewerId = getViewerId();

  useEffect(() => {
    if (article && viewerId) {
      // Kirim data view ke backend
      axios
        .post("http://localhost:5000/api/views", {
          articleId: article.id,
          viewerId,
        })
        .then((response) => {
          console.log("View counted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Failed to count view:", error);
        });
    }
  }, [article, viewerId]);

  if (!article) {
    return <p>Article not found</p>;
  }

  const formattedKeywords = article.keywords.join(", ");

  return (
    <div className="flex ms-4 md:ms-14 mt-20">
      <TableOfContent />
      <div
        id="containerElement"
        className="mr-4 md:mr-8 ml-32 md:ml-60 px-4 md:px-6"
        style={{ maxHeight: "calc(100vh - 64px)" }}
      >
        <MainContent
          category={article.category}
          title={article.title}
          author={article.author}
          src={article.urlToImage || "/pict2.webp"}
          keywords={formattedKeywords}
          summary={article.summary}
          content={article.content}
          references={article.references}
        />
      </div>
    </div>
  );
}
