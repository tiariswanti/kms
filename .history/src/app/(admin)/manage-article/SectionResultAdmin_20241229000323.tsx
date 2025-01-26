import Card from "@/app/components/Card/Card";
import LoadingCard from "@/app/components/Card/LoadingCard";
import { createSlug } from "@/utils/slug";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface SectionResultProps {
  query: string | null;
  selectedCategory: string | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  articlesPerPage: number;
  setTotalPages: (totalPages: number) => void;
}

export default function SectionResult({
  query,
  selectedCategory,
  currentPage,
  onPageChange,
  articlesPerPage,
  setTotalPages,
}: SectionResultProps) {
  const limit = articlesPerPage;
  const router = useRouter();

  const { data, error, isValidating } = useSWR(() => {
    return query && selectedCategory
      ? `https://newsapi.org/v2/everything?domains=${selectedCategory}&q=${query}&apiKey=5bc684a4fcb340e3bb6dade32f332609&pageSize=${limit}&page=${currentPage}`
      : query
      ? `https://newsapi.org/v2/everything?q=${query}&apiKey=5bc684a4fcb340e3bb6dade32f332609&pageSize=${limit}&page=${currentPage}`
      : selectedCategory
      ? `https://newsapi.org/v2/everything?domains=${selectedCategory}&apiKey=5bc684a4fcb340e3bb6dade32f332609&pageSize=${limit}&page=${currentPage}`
      : null;
  }, fetcher);

  if (isValidating) {
    return <LoadingCard />;
  }

  if (error || !data || !data.articles || data.articles.length === 0) {
    let message = "Not Found";

    if (selectedCategory && query) {
      message = `Category "${selectedCategory}" and "${query}" ${message}`;
    } else if (selectedCategory) {
      message = `Category "${selectedCategory}" ${message}`;
    } else if (query) {
      message = `"${query}" ${message}`;
    }

    return (
      <p className="text-md font-semibold text-gray-900 mt-6">
        Search Result for {message}
      </p>
    );
  }

  const totalArticles = data.totalResults;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  setTotalPages(totalPages);

  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-4 ml-10 md:ml-0 xl:ml-6">
        Search Result for{" "}
        {selectedCategory && query
          ? `Category "${selectedCategory}" and "${query}"`
          : selectedCategory
          ? `Category "${selectedCategory}"`
          : `"${query}"`}
      </h2>

      {data.articles.map((article: any, index: number) => {
        return (
          <Card
            key={index}
            title={article.title}
            author={article.author}
            text={article.description}
            src="/pict1.jpg"
            url={`/manage-article/${article.source.id}}`}
            onClick={() => router.push(`/manage-article/${article.source.id}`)}
            category={article.source.name}
          />
        );
      })}
    </div>
  );
}
