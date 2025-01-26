export default function LoadingCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 sm:gap-x-6 lg:gap-6 mt-4 sm:mt-6 lg:mx-52 mx-10">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex justify-center">
          <div className="bg-white shadow-md rounded-xl w-auto sm:max-w-[320px] md:max-w-[350px]">
            <div className="relative h-48 sm:h-52 lg:h-44 bg-gray-200 animate-pulse rounded-t-xl"></div>
            <div className="px-4 py-3 space-y-0.5 sm:space-y-1 sm:p-3">
              <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
              <div className="flex items-center text-gray-500">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4 mr-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3"></div>
              </div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
