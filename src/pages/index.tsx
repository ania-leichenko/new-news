import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header/Header";
import { NewsComponent } from "components/NewsComponent";
import Filter from "components/Filter";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useNewsList } from "@/services/news-list";
import {Pagination} from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  nextpage: {
    color: "black",
    marginLeft: "5px",
  },
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  let page = Number(router.query.page) || 1;
  const [filter, setFilter] = useState("all");
  const [tags, setTags] = useState<string[]>([]);
  const { news, pagesCount } = useNewsList(tags, page);

  useEffect(() => {
    const result = filter === "all" ? [] : ["hot"];

    setTags(result);
  }, [filter]);

  function handleClick(event, page) {
    {Array(page)
      .fill(null)
      .map((item, index) => ( 
        <Link href={"/?page=" + (index + 1)}>
          <a key={index} className={classes.nextpage}>
            {index + 1}
          </a>
        </Link>
      ))}
  }
  
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
        <NewsComponent news={news} />
      </main>
      <footer>
         <Grid container justify="center">
          <Box m={1}>
            <h2>New-news</h2>
          </Box>
        </Grid>
        <Grid container justify="center">
          <Box m={1}>
            <Pagination defaultPage={1} count={2} color="primary" onChange={handleClick}/>
          </Box>
        </Grid>
      </footer>
    </div>
  );
}