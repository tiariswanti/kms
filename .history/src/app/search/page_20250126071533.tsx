"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/app/search/pagination";
import SearchBar from "@/app/components/Searchbar/Searchbar";
import SectionResult from "./sectionResult";
import { Metadata } from "next";

// Fungsi untuk menghasilkan metadata berdasarkan query dan kategori
export async function generateMetadata({
  searchParams,
}: {
  searchParams: URLSearchParams; // Menambahkan tipe untuk searchParams
}): Promise<Metadata> {
  const { query, category } = Object.fromEntries(searchParams.entries()); // Mengambil query dan category

  let title = "Search Articles";
  let description = "Search articles by category or query";

  if (query && category) {
    title = `Search Results for ${category} and ${query}`;
    description = `Search articles for category: ${category} and query: ${query}`;
  } else if (query) {
    title = `Search Results for Query: ${query}`;
    description = `Search articles for query: ${query}`;
  } else if (category) {
    title = `Search Results for Category: ${category}`;
    description = `Search articles for category: ${category}`;
  }

  return {
    title: title, // Set title sesuai input
    description: description, // Set description sesuai input
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
  const searchParams = useSearchParams(); // Mendapatkan parameter pencarian dari URL

  // Fungsi untuk memperbarui URL ketika melakukan pencarian atau berpindah halaman
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
      router.push(`?${queryString}`); // Perbarui URL dengan query string
    },
    [router]
  );

  // Fungsi untuk menangani pencarian dan mengupdate URL
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset halaman ke 1 setiap kali pencarian baru
    updateUrl(query, selectedCategory, 1);
  };

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrl(searchQuery, selectedCategory, page);
  };

  // Menangani perubahan nilai pencarian dan kategori saat URL berubah
  useEffect(() => {
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || null;
    const page = parseInt(searchParams.get("page") || "1");
    setSearchQuery(query);
    setSelectedCategory(category);
    setCurrentPage(isNaN(page) ? 1 : page);
  }, [searchParams]);

  // Update URL ketika searchQuery atau selectedCategory berubah
  useEffect(() => {
    setCurrentPage(1);
    updateUrl(searchQuery, selectedCategory, 1);
  }, [searchQuery, selectedCategory, updateUrl]);

  // Mengupdate hasil pencarian berdasarkan jumlah total halaman dan apakah ada hasil
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
