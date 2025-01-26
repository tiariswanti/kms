"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/app/search/pagination";
import SearchBar from "@/app/components/Searchbar/Searchbar";
import SectionResult from "./sectionResult";

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
