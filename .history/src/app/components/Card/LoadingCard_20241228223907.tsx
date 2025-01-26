
export default function LoadingCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 sm:gap-x-6 lg:gap-6 mt-4 sm:mt-6 lg:mx-52 mx-10">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 animate-pulse rounded-lg h-64"
        />
      ))}
    </div>
  );
}
