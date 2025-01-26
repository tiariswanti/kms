import Card from "@/app/components/Card/Card";
import LoadingCard from "@/app/components/Card/LoadingCard";
import { createSlug } from "@/utils/slug";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface SectionResultAdminProps {
  query: string | null;
  selectedCategory: string | null;
  currentPage: number;
  articlesPerPage: number;
  onPageChange: (page: number) => void;
}

export default function SectionResultAdmin({
  query,
  selectedCategory,
  currentPage,
  articlesPerPage,
  onPageChange,
}: SectionResultAdminProps) {
  const router = useRouter();

  const { data, error, isValidating } = useSWR(() => {
    return query && selectedCategory
      ? `https://newsapi.org/v2/everything?domains=${selectedCategory}&q=${query}&apiKey=5bc684a4fcb340e3bb6dade32f332609&pageSize=${articlesPerPage}&page=${currentPage}`
      : query
      ? `https://newsapi.org/v2/everything?q=${query}&apiKey=5bc684a4fcb340e3bb6dade32f332609&pageSize=${articlesPerPage}&page=${currentPage}`
      : selectedCategory
      ? `https://newsapi.org/v2/everything?domains=${selectedCategory}&apiKey=5bc684a4fcb340e3bb6dade32f332609&pageSize=${articlesPerPage}&page=${currentPage}`
      : null;
  }, fetcher);

  if (isValidating) {
    return <LoadingCard />;
  }

  if (error || !data || !data.articles || data.articles.length === 0) {
    return (
      <p className="text-md font-semibold text-gray-900 mt-6">
        {query || selectedCategory
          ? "No results found."
          : "No articles available."}
      </p>
    );
  }

  const totalArticles = data.totalResults;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

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
            url={`/manage-article/${article.source.id}/${createSlug(
              article.title
            )}`}
            onClick={() =>
              router.push(
                `/manage-article/${article.source.id}/${createSlug(
                  article.title
                )}`
              )
            }
            category={article.source.name}
          />
        );
      })}

      {/* Render pagination only if there are articles */}
      {totalArticles > 0 && totalPages > 1 && (
        <div className="pagination">
          {/* Here you can render your pagination buttons */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
