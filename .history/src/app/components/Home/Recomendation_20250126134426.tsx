import { useEffect, useState } from "react";
import Card2 from "../Card/Card2";
import { createSlug } from "@/utils/slug";
import LoadingCard2 from "../Card/LoadingCard2";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Recom() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetcher(
          "http://localhost:5000/articles?sort=publishedAt&order=desc"
        );

        if (!response || !Array.isArray(response)) {
          throw new Error("No articles found");
        }

        setArticles(response);
      } catch (error) {
        setError(
          "Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <LoadingCard2 />;
  if (error) return <p className="m">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 sm:gap-x-6 lg:gap-6 mt-4 sm:mt-6 lg:mx-52 mx-10">
      {articles.slice(0, 3).map((article, index) => (
        <Card2
          key={index}
          id={article.id}
          src={article.urlToImage}
          category={article.category}
          title={article.title}
          author={article.author}
          summary={article.summary}
          slug={createSlug(article.title)}
        />
      ))}
    </div>
  );
}
