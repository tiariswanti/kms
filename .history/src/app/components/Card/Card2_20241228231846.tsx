import Image from "next/image";
import Link from "next/link";
import { FaEye, FaUser } from "react-icons/fa";

interface Card2Props {
  src: string;
  title: string;
  category: string;
  author: string;
  summary: string;
  slug: string;
  id: string;
  //views: number;
}

export default function Card2({
  src,
  title,
  category,
  author,
  summary,
  slug,
  id,
}: //views,
Card2Props) {
  const authors = author ? author.split(",") : [];
  let authorText = "Anonim";

  if (authors.length === 1) {
    authorText = authors[0];
  } else if (authors.length === 2) {
    authorText = authors.join(", ");
  } else if (authors.length > 2) {
    authorText = `${authors[0]}, dkk.`;
  }

  return (
    <div className=" bg-white shadow-md rounded-xl w-auto sm:max-w-[320px] md:max-w-[350px]">
      <div className="relative h-48 sm:h-52 lg:h-44 overflow-hidden rounded-t-xl ">
        <Link href={`/article/${id}/${slug}`} passHref>
          <div className="relative h-48 sm:h-52 lg:h-44 overflow-hidden rounded-t-xl cursor-pointer">
            <Image
              src={src}
              alt={title}
              className="object-cover w-full h-full transform transition-transform duration-200 hover:scale-105"
              layout="fill"
            />
            {/* Eye icon and view count side by side */}
            <div className="absolute flex items-center bg-gray-900 bg-opacity-60 text-white rounded-r-full p">
              <FaEye size={16} />
              <span className="ml-2 text-sm">345</span>{" "}
              {/* Display views count */}
            </div>
            {/* Category tag */}
            <div className="absolute bottom-0 left-0 bg-primary text-gray-50 text-sm rounded-r-full py-1 pl-4 pr-6 inline-block z-10">
              {category}
            </div>
          </div>
        </Link>
      </div>
      <div className="px-4 py-3 space-y-0.5 sm:space-y-1 sm:p-3 z-10">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 cursor-pointer hover:underline hover:text-primary">
          <Link href={`/article/${id}/${slug}`}>{title}</Link>
        </h3>
        <div className="flex items-center text-gray-500">
          <FaUser size={15} className="mr-1" />
          <p className="ml-2 text-md">{authorText}</p>
        </div>
        <p className="text-base line-clamp-3 lg:line-clamp-2 text-left text-gray-900">
          {summary}
        </p>
      </div>
    </div>
  );
}
