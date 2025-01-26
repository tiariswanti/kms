"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/app/components/Content/MainContent";
import { MdEdit } from "react-icons/md";
import FloatingActionButton from "@/app/components/Button/FAB";
import DeleteArticle from "@/app/components/Article/DeleteArticle";

type ArticlePageProps = {
  params: {
    id: string;
  };
};

type Article = {
  id: string;
  title: string;
  author: string;
  urlToImage: string;
  description: string;
  content: string;
  keywords: string[];
  summary: string;
  references: string;
  category: string;
};

export default function ArticlePage({ params }: ArticlePageProps) {
  const router = useRouter();
  const [article, setArticle] = React.useState<Article | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/articles", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Article[] = await res.json();

        const foundArticle = data.find((article) => article.id === params.id);

        setArticle(foundArticle);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  const handleEditClick = async () => {
    if (article) {
      try {
        await router.push(`/edit-article/${article.id}`);
      } catch (error) {
        console.error("Error navigating to edit page:", error);
      }
    } else {
      console.error("Article not found for editing");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  const formattedKeywords = article.keywords.join(", ");

  return (
    <>
      <div className="fixed bottom-10 right-5 space-y-4">
        <FloatingActionButton
          icon={<MdEdit className="w-6 h-6 md:w-8 md:h-8" />}
          onClick={handleEditClick}
          color="bg-gray-300"
          textColor="text-gray-700"
        />
        <DeleteArticle article={article} />
      </div>

      <div className="flex px-8 sm:pl-2 sm:pr-6 sm:ml-64 mr-24 mt-8">
        <MainContent
          title={article.title}
          author={article.author}
          src={article.urlToImage || "/pict2.webp"}
          keywords={formattedKeywords}
          summary={article.summary}
          content={article.content}
          references={article.references}
          category={article.category}
        />
      </div>
    </>
  );
}
