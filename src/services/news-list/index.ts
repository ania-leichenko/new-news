import { NewsItem } from "types";
import { useState, useEffect } from "react";
import { client } from "api/axios";

export const useNewsList = (tags?: string[]) => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.get<NewsItem[]>("/api/newsItem", {
          params: { tags: tags ?? [] },
        });
        setNews(result.data);
      } catch (error) {
        setNews([]);
      }
    };

    fetchData();
  }, [tags]);

  return news;
};
