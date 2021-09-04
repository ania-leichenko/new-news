import { NewsItem } from "types";
import { useState, useEffect } from "react";
import { client } from "api/axios";

export const useNewsList = (tags: string[], page: number) => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.get<NewsItem[]>("/api/articles", {
          params: { tags: tags ?? [], page: page ?? 1 },
        });
        setNews(result.data);
      } catch (error) {
        setNews([]);
      }
    };

    fetchData();
  }, [tags, page]);

  return news;
};
