import { NewsItem } from "types";
import { useState, useEffect } from "react";
import { client } from "api/axios";

export const useNewsList = (tags: string[], page: number) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pagesCount, setPagesCount] = useState<number>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.get<{
          items: NewsItem[];
          count: number;
        }>("/api/articles", {
          params: { tags: tags ?? [], page: page ?? 1 },
        });
        setNews(result.data.items);
        setPagesCount(result.data.count);
      } catch (error) {
        setNews([]);
      }
    };

    fetchData();
  }, [tags, page]);

  return {
    news,
    pagesCount,
  };
};
