"use client";
import { usePathname } from "next/navigation";
import CoverImage from "./CoverImage";
import Section from "./Section";
import ShareButton from "../Button/ShareButton";
import Button from "../Button/Button";

export default function MainContent({
  title,
  author,
  src,
  summary,
  keywords,
  content,
  references,
  category,
}: {
  title: string;
  author: string;
  src: string;
  summary: string;
  keywords: string;
  content: string;
  references: string;
  category: string;
}) {
  const pathname = usePathname();

  const buttonAlignment = pathname.startsWith("/article")
    ? "justify-end"
    : pathname.startsWith("/manage-article")
    ? "justify-start"
    : "";

  // Function to download the content as a PDF
  async function handleOnClick() {
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          content,
          category,
          coverImage: src,
          summary,
          keywords,
          references,
        }),
      });

      if (response.ok) {
        const pdfBlob = await response.blob();
        const pdfURL = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = pdfURL;
        link.download = `${title}.pdf`;
        link.click();
      } else {
        console.error("Error generating PDF");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div id="mainContent" className="flex-col">
        <div id="title" className="justify-between">
          <div className="bg-primary rounded-r-full sm:py-2 py-1 sm:px-6 px-4 inline-block text-white text-sm sm:text-md">
            {category}
          </div>
          <h1 className="text-lg sm:text-2xl font-bold sm:mb-2 mb-1">
            {title}
          </h1>
        </div>

        <h5
          id="author"
          className="flex items-baseline font-semibold mb-4 text-gray-600 text-sm sm:text-lg"
        >
          By {author}
        </h5>
        <CoverImage src={src} title={title} />
        <Section label="Summary" name="summary" text={summary} />
        <Section label="Key Words" name="keywords" text={keywords} />
        <Section label="Content" name="content" text={content} isHtml={true} />
        <Section label="References" name="references" text={references} />
      </div>

      {(pathname.startsWith("/article") ||
        pathname.startsWith("/manage-article")) && (
        <div className={`flex ${buttonAlignment} space-x-4 mt-5 mb-10`}>
          <ShareButton />
          <Button
            classname="bg-primary rounded-lg text-white px-7 py-2"
            onClick={handleOnClick}
          >
            Download
          </Button>
        </div>
      )}
    </div>
  );
}
