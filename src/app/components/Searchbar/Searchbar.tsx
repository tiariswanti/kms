import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import SelectCategory from "./SelectCategory";

interface SearchBarProps {
  onSearch: (query: string, category: string | null) => void;
  pageType: "search" | "manage-article";
  currentPage: number;
  onPageChange: (page: number) => void;
  onCategoryChange: (newCategory: string | null) => void;
}

export default function SearchBar({
  onSearch,
  pageType,
  currentPage,
  onCategoryChange,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    console.log("Search Params Updated:", searchParams.toString());
    setQuery(searchParams.get("query") || "");
    setCategory(searchParams.get("category") || null);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query, category);
    updateUrl();
  };

  const updateUrl = () => {
    let url = `/${pageType}`;
    const params = new URLSearchParams();

    if (query) params.set("query", query);
    if (category) params.set("category", category);
    params.set("page", currentPage.toString());

    url += `?${params.toString()}`;

    router.push(url);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory || null);
    onCategoryChange(newCategory || null);
    updateUrl();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-5/6 sm:max-w-2xl relative">
        <div className="relative text-gray-600 w-full">
          <input
            type="search"
            name="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 md:h-12 px-5 pr-10 rounded-md md:rounded-lg text-sm md:text-md focus:outline-none focus:bg-white flex-grow w-full"
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <AiOutlineSearch className="text-gray-600 h-4 md:h-8 fill-current -mt-2 md:-mt-3" />
          </button>
        </div>
      </form>
      <SelectCategory
        selectedCategory={category || ""}
        onChange={handleCategoryChange}
      />
    </>
  );
}
