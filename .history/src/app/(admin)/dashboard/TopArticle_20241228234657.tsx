"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Card from "@/app/components/Card/Card";
import router, { useRouter } from "next/navigation";
import LoadingCard from "@/app/components/Card/LoadingCard";

interface Article {
  id: string;
  title: string;
  summary: string;
  author: string;
  urlToImage: string;
  views: number;
  publishedAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TopArticles() {
  const router = useRouter();
  const [topArticles, setTopArticles] = useState<Article[]>([]);

  const { data, error } = useSWR<Article[]>(
    `http://localhost:5000/articles`,
    fetcher
  );

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const filteredArticles = data.filter((article) => {
        const articleDate = new Date(article.publishedAt);
        return articleDate >= lastMonth;
      });

      setTopArticles(filteredArticles.slice(0, 3));
    }
  }, [data]);

  if (error) {
    return <p>Error loading top articles.</p>;
  }

  if (!topArticles.length) {
    return <LoadingCard;
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 mx-6">
        Top Articles This Month
      </h2>
      {topArticles.map((article) => (
        <Card
          key={article.id}
          title={article.title}
          text={article.summary}
          author={article.author}
          //src={article.urlToImage}
          category={article.category}
          src="/pict1.jpg"
          url={`manage-article/${article.id}`}
          onClick={() => router.push(`/manage-article/${article.id}`)}
        />
      ))}
    </div>
  );
}
