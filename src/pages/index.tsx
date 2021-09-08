import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header/Header";
import { NewsComponent } from "components/NewsComponent";
import Filter from "components/Filter";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { useRouter } from "next/router";
import { useNewsList } from "@/services/news-list";

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
  let nextPage = page + 1;
  const [filter, setFilter] = useState("all");
  const [tags, setTags] = useState<string[]>([]);

  const { news, pagesCount } = useNewsList(tags, page);

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
        <NewsComponent news={news} />
      </main>
      <footer>
        <Grid container justify="center">
          <h2>New-news</h2>
          <Button href={"/?page=" + nextPage}>
            <ArrowForwardIosIcon></ArrowForwardIosIcon>
          </Button>
        </Grid>
        <Grid container justify="center">
          <Box m={1}>
            {Array(pagesCount)
              .fill(null)
              .map((item, index) => (
                  <Link aria-label="Page 1" href={"/?page=" + (index + 1)}>
                    <span className={classes.nextpage}>{index + 1}</span>
                  </Link>
              ))}
            </Box>
          </Grid>
      </footer>
    </div>
  );
}
