import { createSlug } from "@/app/lib/slug";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

interface CardProps {
  title: string;
  text: string;
  author: string;
  src: string;
  slug: string;
}

export default function Card3({ title, text, author, src }: CardProps) {
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
    <div className="mb-6">
      <div className=" flex flex-col sm:flex-row mx-10 md:mx-1 xl:mx-6">
        <div className="relative h-56 md:h-48 overflow-hidden bg-blue-gray-500 rounded-lg w-full md:w-[350px] md:mr-4 lg:mr-6 mb-2 md:mb-0">
          <Image
            src={src}
            alt={title}
            className="object-cover w-full h-full"
            layout="fill"
          />
        </div>
        <div className="w-full sm:ml-6">
          <h3 className="mb-1 text-gray-900 font-bold text-xl md:line-clamp-2 cursor-pointer hover:underline hover:text-primary">
            <Link href={`/articles/${createSlug(title)}`}>{title}</Link>
          </h3>
          <div className="flex items-center text-gray-700 mb-1">
            <FaUser size={15} className="mr-1" />
            <div className="ml-2 text-md sm:line-clamp-1">{authorText}</div>
          </div>
          <div className="text-gray-700 line-clamp-3 md:line-clamp-2 text-justify">
            <p>{text}</p>
          </div>
          <Link
            className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-gray-300 text-gray-700 hover:bg-primary hover:text-gray-100 focus:ring-slate-500 mt-3"
            href={`/articles/${createSlug(title)}`}
          >
            Read more
            <IoIosArrowForward
              className="ml-3 text-gray-700 group-hover:text-gray-100"
              size={20}
              style={{ strokeWidth: "15px" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
