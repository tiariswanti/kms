export default function LoadingCard() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="mb-4 animate-pulse">
          <div className="flex flex-col sm:flex-row mx-10 md:mx-1 xl:mx-6">
            <div className="relative h-48 bg-gray-300 rounded-lg w-full sm:w-[280px] sm:mr-4 lg:mr-6 mb-2 flex-shrink-0"></div>
            <div className="w-full sm:ml-2">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="flex space-x-2">
                <div className="h-9 w-24 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
