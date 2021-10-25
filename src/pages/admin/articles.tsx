import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { client } from "api/axios";
import { useRouter } from "next/router";
import { useNewsList } from "@/services/news-list";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    isplay: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
  },
  card: {
    width: "350px",
    height: "350px",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  media: {
    paddingTop: "56.25%",
  },
  margin: {
    margin: theme.spacing(1),
  },
  content: {
    textAlign: "right",
  },
  footer: {
    marginTop: 30,
  },
}));

export default function NewsItemComponent() {
  const classes = useStyles();
  const router = useRouter();
  let currentPage = Number(router.query.page) || 1;
  const [tags, setTags] = useState<string[]>([]);
  const { pagesCount,  news } = useNewsList(tags, currentPage);

  function handleClick(id) {
    client
      .post("/api/admin/delete-article", {
        id: id,
      })
      .catch(() => {});
  }

  function clickHeadler(event, page) {
    router.push(`/admin/articles/?page=${page}`);
  }

  return (
    <div>
      <Grid container justifyContent="center" className={classes.root}>
        {news.map((item) => (
          <main key={item.id}>
            <Grid item sm={6}>
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={item.image} />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.title}
                  </Typography>
                </CardContent>
                <CardContent className={classes.content}>
                  <Link href={`/admin/edit-article?id=${item.id}`}>
                    <IconButton aria-label="edit" className={classes.margin}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={() => handleClick(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          </main>
        ))}
      </Grid>
      <footer className={classes.footer}>
        <Grid container justifyContent="center">
          <Box m={1}>
            <Pagination
              defaultPage={currentPage}
              count={Math.round(pagesCount)}
              color="primary"
              onChange={clickHeadler}
            />
          </Box>
        </Grid>
      </footer>
    </div>
  );
}