import Image from "next/image";
import Link from "next/link";
import { FaUser, FaEye } from "react-icons/fa"; // Import FaEye for the view icon
import { IoIosArrowForward } from "react-icons/io";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  text: string;
  author: string;
  src: string;
  url: string;
  viewers: number; // Add the viewers count as a prop
  onClick?: () => void;
}

export default function Card({
  title,
  text,
  author,
  src,
  url,
  viewers,
  onClick,
}: CardProps) {
  const router = useRouter();
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
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row mx-10 md:mx-1 xl:mx-6">
        <div className="relative h-48 overflow-hidden rounded-lg w-full sm:w-[280px] sm:mr-4 lg:mr-6 mb-2 flex-shrink-0">
          <Image
            src={src}
            alt={title}
            className="object-cover w-full h-full"
            layout="fill"
          />
          {/* Eye icon in the top left corner with viewer count */}
          <div className="absolute  p-2 bg-black bg-opacity-50 rounded-full shadow-lg flex items-center">
            <FaEye size={20} className="text-white" />
            <span className="ml-2 text-sm text-white">{viewers}</span>{" "}
            {/* Display viewers count */}
          </div>
        </div>
        <div className="w-full sm:ml-2">
          <h3 className="mb-1 text-gray-900 font-bold text-lg md:text-xl sm:line-clamp-2 cursor-pointer hover:underline hover:text-primary">
            <Link href={url}>{title}</Link>
          </h3>
          <div className="flex items-center text-gray-700 mb-1">
            <FaUser size={15} className="mr-1" />
            <p className="ml-2 text-md sm:line-clamp-1">{authorText}</p>
          </div>
          <div className="text-gray-700 line-clamp-3 md:line-clamp-2 text-left">
            <p>{text}</p>
          </div>
          <Button
            onClick={onClick}
            classname="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-gray-300 text-gray-700 hover:bg-primary hover:text-gray-100 focus:ring-slate-500 mt-3"
          >
            Read more
            <span className="ml-2">
              <IoIosArrowForward size={20} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
