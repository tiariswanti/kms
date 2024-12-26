"use client";
import { useState } from "react";
import { Link } from "react-scroll/modules";

export default function TableOfContent() {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const links = [
    { id: "title", text: "Title", offset: -100 },
    { id: "summary", text: "Summary", offset: -80 },
    { id: "keywords", text: "Key Words", offset: -80 },
    { id: "content", text: "Content", offset: -80 },
    { id: "references", text: "References", offset: -80 },
  ];

  const handleClick = (index: number) => {
    setClickedIndex(index === clickedIndex ? null : index);
  };

  return (
    <div className="fixed flex  bg-primary h-full w-32 md:w-52 rounded-md md:rounded-lg">
      <div>
        <div className="text-white text-sm md:text-lg font-semibold ml-4 md:ml-6 mt-4 mb-1 md:mt-6">
          Outline
        </div>
        <ul className="ml-4 md:ml-6">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                activeClass="active"
                to={link.id}
                spy={true}
                smooth={true}
                offset={link.offset}
                duration={500}
                className={`flex items-center p-1 md:p-2 ml-0 md:ml-4 mt-2 md:mt-3 text-white rounded-md md:rounded-lg group ${
                  clickedIndex === index
                    ? "bg-secondary"
                    : "hover:bg-secondary focus:bg-secondary"
                }`}
                onClick={() => handleClick(index)}
              >
                <span className="ml-1  mr-3 md:mr-8 text-sm md:text-lg font-regular ">
                  {link.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
