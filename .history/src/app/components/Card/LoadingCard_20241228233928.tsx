import { FaUser, FaEye } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

export default function LoadingCard() {
  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row mx-10 md:mx-1 xl:mx-6">
        {/* Skeleton for Image */}
        <div className="relative h-48 sm:h-52 lg:h-44 overflow-hidden rounded-lg w-full sm:w-[280px] sm:mr-4 lg:mr-6 mb-2 flex-shrink-0">
          <div className="animate-pulse w-full h-full bg-gray-200 rounded-lg"></div>{" "}
          {/* Skeleton loader for image */}
        </div>

        <div className="w-full sm:ml-2">
          {/* Skeleton for Title */}
          <h3 className="mb-1 text-gray-900 font-bold text-lg md:text-xl sm:line-clamp-2 cursor-pointer hover:underline hover:text-primary">
            <div className="animate-pulse w-1/3 h-5 bg-gray-200 rounded-md"></div>{" "}
            {/* Skeleton loader for title */}
          </h3>

          {/* Skeleton for Author */}
          <div className="flex items-center text-gray-700 mb-1">
            <FaUser size={15} className="mr-1" />
            <div className="animate-pulse w-1/4 h-4 bg-gray-200 rounded-md"></div>{" "}
            {/* Skeleton loader for author */}
          </div>

          {/* Skeleton for Text */}
          <div className="text-gray-700 line-clamp-3 md:line-clamp-2 text-left">
            <div className="animate-pulse w-full h-12 bg-gray-200 rounded-md"></div>{" "}
            {/* Skeleton loader for text */}
          </div>

          {/* Skeleton for Button */}
          <div className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-gray-300 text-gray-700 hover:bg-primary hover:text-gray-100 focus:ring-slate-500 mt-3">
            <div className="animate-pulse w-20 h-6 bg-gray-200 rounded-md"></div>{" "}
            {/* Skeleton loader for button */}
          </div>
        </div>
      </div>
    </div>
  );
}
