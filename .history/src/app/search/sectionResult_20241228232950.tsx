import React from "react";
import useSWR from "swr";
import Card from "../components/Card/Card";
import { createSlug } from "@/utils/slug";
import { useRouter } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface SectionResultProps {
  query: string | null;
  selectedCategory: string | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  articlesPerPage: number;
  setTotalPages: (totalPages: number, resultsExist: boolean) => void;
}

export default function SectionResult({
  query,
  selectedCategory,
  currentPage,
  onPageChange,
  articlesPerPage,
  setTotalPages,
}: SectionResultProps) {
  const router = useRouter();
  const limit = articlesPerPage;

  const { data, error, isValidating } = useSWR(() => {
    const url =
      query && selectedCategory
        ? `https://newsapi.org/v2/everything?domains=${selectedCategory}&q=${query}&apiKey=070863f7b2514087bb480971a8466e73&pageSize=${limit}&page=${currentPage}` //buat coba aja
        : query
        ? `https://newsapi.org/v2/everything?q=${query}&apiKey=070863f7b2514087bb480971a8466e73&pageSize=${limit}&page=${currentPage}`
        : selectedCategory
        ? `https://newsapi.org/v2/everything?domains=${selectedCategory}&apiKey=070863f7b2514087bb480971a8466e73&pageSize=${limit}&page=${currentPage}`
        : null;

    return url;
  }, fetcher);

  if (isValidating) {
    return <Loading;
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
  setTotalPages(totalPages, totalArticles > 0);

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
        const slug = createSlug(article.title);
        return (
          <Card
            key={article.id}
            title={article.title}
            text={article.description}
            author={article.author}
            src="/pict1.jpg"
            category={article.category}
            onClick={() =>
              router.push(`/article/${article.id}/${createSlug(article.title)}`)
            }
            url={`/article/${article.id}/${createSlug(article.title)}`}
          />
        );
      })}
    </div>
  );
}
