"use client";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import Button from "../Button/Button";

export default function Banner() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/search");
  };

  return (
    <div className="flex flex-col items-center my-4">
      <div className="w-3/4 lg:w-1/2 text-center">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-left mb-3 text-gray-800">
          Knowledge Management System
        </h1>
        <p className="text-left text-lg mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          nobis animi excepturi nostrum fugit cum ullam omnis culpa labore
          obcaecati! Incidunt cupiditate iure corporis aspernatur ad maiores
          libero iusto sunt.
        </p>
        <Button
          onClick={handleSearchClick}
          classname="bg-primary text-lg text-white rounded-lg py-2 px-4 inline-flex items-center hover:bg-tertiary"
        >
          <span className="flex items-center w-6 h-6">
            <IoSearch />
          </span>
          Search Article
        </Button>
      </div>
    </div>
  );
}
