"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/app/search/pagination";
import SearchBar from "@/app/components/Searchbar/Searchbar";
import SectionResult from "./sectionResult";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: URLSearchParams;
}): Promise<Metadata> {
  const query = searchParams.get("query");
  const category = searchParams.get("category");
/*************  ✨ Codeium Command ⭐  *************/
/**
 * A Next.js page component that renders a search bar and a section to
 * display search results. The search results are fetched from the News API
 * and paginated. The component also handles updating the URL query parameters
 * based on the search query and category.
 *
 * @returns A JSX element representing the search page.
 */
/******  1a4c1374-0836-4996-b720-a2504706436e  *******/
  const title =
    query && category
      ? `Search result for category "${category}" and query "${query}"`
      : query
      ? `Search result for "${query}"`
      : category
      ? `Search result for category "${category}"`
      : "Search Articles";

  const description =
    query && category
      ? `Search articles by category "${category}" and query "${query}"`
      : query
      ? `Search articles by query "${query}"`
      : category
      ? `Search articles by category "${category}"`
      : "Browse all articles";

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
  const [hasResults, setHasResults] = useState(false);
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
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || null;
    const page = parseInt(searchParams.get("page") || "1");
    setSearchQuery(query);
    setSelectedCategory(category);
    setCurrentPage(isNaN(page) ? 1 : page);
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
    updateUrl(searchQuery, selectedCategory, 1);
  }, [searchQuery, selectedCategory, updateUrl]);

  const handleResultUpdate = (newTotalPages: number, resultsExist: boolean) => {
    setTotalPages(newTotalPages);
    setHasResults(resultsExist);
  };

  return (
    <div className="flex flex-col mt-24 mx-4 sm:mx-20">
      <div className="flex flex-col items-center">
        <SearchBar
          onSearch={handleSearch}
          pageType="search"
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onCategoryChange={(newCategory) => setSelectedCategory(newCategory)}
        />
      </div>
      <div className="px-6 mb-10 md:px-10 xl:px-20">
        {(searchQuery || selectedCategory) && (
          <>
            <SectionResult
              query={searchQuery}
              selectedCategory={selectedCategory}
              currentPage={currentPage}
              articlesPerPage={articlesPerPage}
              setTotalPages={handleResultUpdate}
              onPageChange={handlePageChange}
            />
            {hasResults && totalPages > 1 && (
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
