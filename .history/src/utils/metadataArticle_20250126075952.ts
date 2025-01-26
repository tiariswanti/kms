import { createSlug } from "@/utils/slug";

export async function generateMetadata({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const { id, slug } = params;
  const articleData = await fetch("http://localhost:5000/articles", {
    cache: "no-store",
  }).then((res) => res.json());

  const article = articleData.find((article: any) => {
    const articleSlug = createSlug(article.title);
    return article.id === id && articleSlug === slug;
  });

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
      robots: "noindex, follow",
    };
  }

  const formattedKeywords = article.keywords.join(", ");

  return {
    title: article.title,
    description: article.summary,
    keywords: formattedKeywords,
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://localhost:3000/article/${article.id}/${slug}`,
      images: [
        {
          url: article.urlToImage || "/pict2.webp",
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: [article.urlToImage || "/pict2.webp"],
    },
  };
}
