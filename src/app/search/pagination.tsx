import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalPages]);

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = 1;
    if (currentPage > 9) {
      startPage = currentPage - 9;
    }

    for (let i = startPage; i <= Math.min(totalPages, startPage + 9); i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`bg-gray-200 inline py-1 md:py-2 px-2 md:px-4 text-center cursor-pointer hover:bg-gray-300 ${
            currentPage === i ? "font-bold bg-gray-300" : ""
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <ul className="flex justify-center mt-4">
      <li
        className={`bg-gray-200 inline py-1 md:py-2 px-1 md:px-4 text-center cursor-pointer hover:bg-gray-300 rounded-l-lg ${
          currentPage === 1 ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={() => handleClick(currentPage - 1)}
      >
        <span className="hidden md:inline">Previous</span>
        <IoIosArrowBack size={22} className="md:hidden" />
      </li>
      {renderPageNumbers()}
      <li
        className={`bg-gray-200 inline py-1 md:py-2 px-1 md:px-4 text-center cursor-pointer hover:bg-gray-300 rounded-r-lg ${
          currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={() => handleClick(currentPage + 1)}
      >
        <span className="hidden md:inline">Next</span>
        <IoIosArrowForward size={22} className="md:hidden" />
      </li>
    </ul>
  );
}
