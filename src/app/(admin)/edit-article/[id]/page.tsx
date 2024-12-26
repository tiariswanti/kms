"use client";

import ArticleForm from "@/app/components/Article/ArticleForm";
import { useEffect, useState } from "react";

interface ArticleData {
  id?: string;
  title?: string;
  author?: string;
  image?: File | null;
  keywords?: string[];
  summary?: string;
  content?: string;
  references?: string;
  publishedAt?: string;
  urlToImage?: string;
  category?: string;
}

interface EditArticleProps {
  params: {
    id: string;
  };
}

export default function EditArticle({ params }: EditArticleProps) {
  const { id } = params;
  const [articleData, setArticleData] = useState<ArticleData | null>(null);

  useEffect(() => {
    async function fetchArticleData() {
      try {
        const response = await fetch(`http://localhost:5000/articles/${id}`); //replace
        if (!response.ok) {
          throw new Error("Failed to fetch article data");
        }
        const article = await response.json();
        setArticleData(article);
      } catch (error) {
        console.error("Failed to fetch article data:", error);
      }
    }
    fetchArticleData();
  }, [id]);

  if (!articleData) return <p>Loading...</p>;

  return <ArticleForm initialData={articleData} isEditing={true} />;
}
