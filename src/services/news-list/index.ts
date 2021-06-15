import axios from "axios";
import { NewsItem } from "pages/types";
import Qs from "qs";
import { useState, useEffect } from "react";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.paramsSerializer = (params) => {
  return Qs.stringify(params, { arrayFormat: "repeat" });
};

export const useNewsList = (tags?: string[]) => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = !tags ? undefined : { params: { tags } };
        const result = await axios.get<NewsItem[]>("/api/news", request);
        setNews(result.data);
      } catch (error) {
        setNews([]);
      }
    }

    fetchData();
  }, [tags]);

  return news;
};
