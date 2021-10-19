import { NewsItem } from "types";
import { useState, useEffect, useCallback } from "react";
import { client } from "api/axios";

export default function useSimilarNews(id: string) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.get<{
          items: NewsItem[];
          count: number;
        }>("/api/articles", {
          params: { page, id },
        });
        if (page === 1) {
          setNews(result.data.items);
        } else {
          setNews([...news, ...result.data.items]);
        }
        setPagesCount(result.data.count);
      } catch (error) {
        setNews([]);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    setCanLoadMore(page < pagesCount);
  }, [pagesCount, page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.get<{
          items: NewsItem[];
          count: number;
        }>("/api/articles", {
          params: { page: 1, id },
        });
        setNews(result.data.items);
        setPage(1);
        setPagesCount(result.data.count);
      } catch (error) {
        setNews([]);
      }
    };

    fetchData();
  }, [id]);

  return {
    news,
    loadMore,
    canLoadMore,
  };
}