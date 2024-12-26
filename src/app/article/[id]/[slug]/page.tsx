import MainContent from "@/app/components/Content/MainContent";
import TableOfContent from "@/app/components/Content/TableOfContent";
import { createSlug } from "@/utils/slug";

type ArticlePageProps = {
  params: {
    id: string;
    slug: string;
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

async function getData() {
  const res = await fetch("http://localhost:5000/articles", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const articleData: Article[] = await getData();
  const { id, slug } = params;

  const article: Article | undefined = articleData.find((article) => {
    const articleSlug = createSlug(article.title);
    return article.id === id && articleSlug === slug;
  });

  if (!article) {
    return <p>Article not found</p>;
  }

  const formattedKeywords = article.keywords.join(", ");

  return (
    <div className="flex ms-4 md:ms-14 mt-20">
      <TableOfContent />
      <div
        id="containerElement"
        className="mr-4 md:mr-8 ml-32 md:ml-60 px-4 md:px-6"
        style={{ maxHeight: "calc(100vh - 64px)" }}
      >
        <MainContent
          category={article.category}
          title={article.title}
          author={article.author}
          src={article.urlToImage || "/pict2.webp"}
          keywords={formattedKeywords}
          summary={article.summary}
          content={article.content}
          references={article.references}
        />
      </div>
    </div>
  );
}
