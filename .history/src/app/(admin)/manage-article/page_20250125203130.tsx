"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SectionResultAdmin from "./SectionResultAdmin";
import Pagination from "@/app/search/pagination";
import SearchBar from "@/app/components/Searchbar/Searchbar";
import AllArticles from "./AllArticle";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: URLSearchParams;
}): Promise<Metadata> {
  const query = searchParams.get("query");
  const category = searchParams.get("category");

  // Tentukan title dan description berdasarkan kombinasi query dan category
  const title =
    query && category
      ? `Search result for category "${category}" dalam kategori "${query}"`
      : query
      ? `Search result for  "${query}"`
      : category
      ? `Search result for category "${category}"`
      : "Articles";

  const description =
    query && category
      ? `Search article by category "${category}" dalam kategori "${query}"`
      : query
      ? `Search artikel by query"${query}"`
      : category
      ? `Search article by category "${category}"`
      : "All ";

  return {
    title,
    description,
  };
}


export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(10);
  const [articlesFound, setArticlesFound] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrl = useCallback(
    (query: string, category: string | null, page: number) => {
      const queryParams = new URLSearchParams();
      if (query) {
        queryParams.set("query", query);
      }
      if (category) {
        queryParams.set("category", category);
      }
      queryParams.set("page", page.toString());
      const queryString = queryParams.toString();
      router.push(`?${queryString}`);
    },
    [router]
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    updateUrl(query, selectedCategory, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrl(searchQuery, selectedCategory, page);
  };

  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
    setSelectedCategory(searchParams.get("category") || null);
    const page = parseInt(searchParams.get("page") || "1");
    setCurrentPage(isNaN(page) ? 1 : page);
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
    updateUrl(searchQuery, selectedCategory, 1);
  }, [searchQuery, selectedCategory, updateUrl]);

  const checkArticlesExist = (total: number) => {
    setArticlesFound(total > 0);
  };

  return (
    <div className="flex flex-col mt-24 mx-4 sm:ml-60 mb-10">
      <div className="flex flex-col items-center sm:mb-8">
        <SearchBar
          onSearch={handleSearch}
          pageType="manage-article"
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onCategoryChange={setSelectedCategory}
        />
      </div>
      <div className="mx-1 sm:mx-6 lg:mx-10">
        {!searchQuery && !selectedCategory ? (
          <>
            <AllArticles
              currentPage={currentPage}
              articlesPerPage={articlesPerPage}
              setTotalPages={setTotalPages}
              checkArticlesExist={checkArticlesExist}
              onPageChange={handlePageChange}
            />
            {articlesFound && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <>
            <SectionResultAdmin
              query={searchQuery}
              selectedCategory={selectedCategory}
              currentPage={currentPage}
              articlesPerPage={articlesPerPage}
              setTotalPages={setTotalPages}
              checkArticlesExist={checkArticlesExist}
              onPageChange={handlePageChange}
            />
            {articlesFound && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
