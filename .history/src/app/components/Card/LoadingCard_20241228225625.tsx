import { FaUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../Button/Button";

export default function LoadingCard() {
  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row mx-10 md:mx-1 xl:mx-6">
        {/* Image Placeholder */}
        <div className="relative h-48 overflow-hidden rounded-lg w-full sm:w-[280px] sm:mr-4 lg:mr-6 mb-2 flex-shrink-0 bg-gray-300 animate-pulse"></div>

        <div className="w-full sm:ml-2">
          {/* Title Placeholder */}
          <div className="mb-1 h-6 bg-gray-300 animate-pulse rounded w-3/4"></div>

          {/* Author Placeholder */}
          <div className="flex items-center text-gray-700 mb-1">
            <FaUser size={15} className="mr-1 text-gray-400 animate-pulse" />
            <div className="ml-2 h-4 w-24 bg-gray-300 animate-pulse rounded"></div>
          </div>

          {/* Text Placeholder */}
          <div className="text-gray-700 line-clamp-3 md:line-clamp-2 text-left">
            <div className="h-4 bg-gray-300 animate-pulse rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
          </div>

          {/* Button Placeholder */}
          <Button
            classname="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-gray-300 text-gray-700 hover:bg-primary hover:text-gray-100 focus:ring-slate-500 mt-3"
            disabled={true}
          >
            <div className="w-12 h-4 bg-gray-300 animate-pulse rounded"></div>
            <span className="ml-2">
              {<IoIosArrowForward size={20} className="text-gray-300" />}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
