import Card from "@/app/components/Card/Card";
import LoadingCard from "@/app/components/Card/LoadingCard";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

interface AllArticlesProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  articlesPerPage: number;
  setTotalPages: (totalPages: number) => void;
}

export default function AllArticles({
  currentPage,
  articlesPerPage,
  setTotalPages,
}: AllArticlesProps) {
  const limit = articlesPerPage;
  const router = useRouter();
  const { data, error, isValidating } = useSWR(
    `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=7e8937881e9b457b8d5de1ccc01ede05&pageSize=${limit}&page=${currentPage}`,
    fetcher
  );

  if (isValidating) {
    return <LoadingCard />;
  }

  if (error || !data || !data.articles || data.articles.length === 0) {
    return (
      <p className="text-md font-semibold text-gray-900 mt-6">
        No articles found
      </p>
    );
  }

  const totalArticles = data.totalResults;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  setTotalPages(totalPages);

  return (
    <div className="flex flex-col gap-4">
      {data.articles.map((article: any) => (
        <Card
          key={article.id}
          title={article.title}
          author={article.author}
          text={article.description || "No description available"}
          src="/pict1.jpg"
          url={`/manage-article/${article.id}/{createSlug(article.title)}`}
          onClick={() =>
            router.push(
              `/manage-article/${article.id}/{createSlug(article.title)}`
            )
          }
          category={article.category}
        />
      ))}
    </div>
  );
}
