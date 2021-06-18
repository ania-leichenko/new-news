import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "components/Header";
import { NewsComponent } from "components/NewsComponent";
import Filter from "components/Filter";

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [tags, setTags] = useState(["hot"]);

  useEffect(() => {
    const result = filter === "all" ? [] : ["hot"];

    setTags(result);
  }, [filter]);

  return (
    <div>
      <Head>
        <title>new-news</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Filter filter={filter} setFilter={setFilter} />
        <NewsComponent tags={tags} />
      </main>
    </div>
  );
}
