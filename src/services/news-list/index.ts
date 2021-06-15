import { NewsItem } from "pages/types";
import { useState, useEffect } from "react";
import { client } from 'api/axios';

export const useNewsList = (tags?: string[]) => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = !tags ? undefined : { params: { tags } };
        const result = await client.get<NewsItem[]>("/api/news", request);
        setNews(result.data);
      } catch (error) {
        setNews([]);
      }
    }

    fetchData();
  }, [tags]);

  return news;
};
