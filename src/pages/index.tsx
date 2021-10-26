import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useRouter } from "next/router";
import { useNewsList } from "@/services/news-list";
import Head from "next/head";
import Header from "../components/Header/Header";
import Grid from "@material-ui/core/Grid";
import Filter from "components/Filter";
import { NewsComponent } from "components/NewsComponent";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1000,
    isplay: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
  },
  nextpage: {
    color: "black",
    marginLeft: "5px",
  },
  line: {
    borderBottom: "5px solid #0000FF",
  },
  novosti: {
    marginBottom: "30px",
  },
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  let currentPage = Number(router.query.page) || 1;
  const [filter, setFilter] = useState(router.query.tags || "all");
  const [tags, setTags] = useState<string[]>([]);
  const { news, pagesCount } = useNewsList(tags, currentPage);

  useEffect(() => {
    const result = filter === "all" ? [] : ["hot"];

    setTags(result);
    router.push(`/?tags=${result}&page=1`);
  }, [filter]);

  function handleClick(event, page) {
    router.push(`/?tags=${tags}&page=${page}`);
  }

  return (
    <div>
      <Head>
        <title>new-news</title>
        <meta name="description" />
      </Head>
      <Header />
      <main className={classes.root}>
        <div>
          <Grid className={classes.novosti}>
            <div className={classes.line}>
              <h2>Новости</h2>
            </div>
          </Grid>
        </div>
        <Filter filter={filter} setFilter={setFilter} />
        <NewsComponent news={news} />
      </main>
      <footer>
        <Grid container justifyContent="center">
          <Box m={1}>
            <h2>new-news</h2>
          </Box>
        </Grid>
        <Grid container justifyContent="center">
          <Box m={1}>
            <Pagination
              defaultPage={currentPage}
              count={Math.round(pagesCount)}
              color="primary"
              onChange={handleClick}
            />
          </Box>
        </Grid>
      </footer>
    </div>
  );
}
