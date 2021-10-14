import { NewsItem } from "types";
import { useState, useEffect } from "react";
import { client } from "api/axios";

export default function useSimilarNews() {
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
          params: { page },
        });
        setNews([...news, ...result.data.items]);
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

  return {
    news,
    loadMore,
    canLoadMore,
  };
}
