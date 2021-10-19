import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import { client } from "api/axios";
import { NewsItem } from "@/types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import SimilarNews from "@/components/SimilarNews";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    isplay: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
  },
  main: {
    marginTop: "40px",
  },
  footer: {
    marginTop: "80px",
    textAlign: "center",
  },
  description: {
    fontSize: "20px",
    maxWidth: 1200,
    isplay: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  stylesComment: {
    textAlign: "center",
    marginTop: "50px",
  },
  add: {
    marginLeft: "8px",
  },
  comment: {
    width: "500px",
  },
  paper: {
    maxWidth: 1200,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  image: {
    maxWidth: 800,
  },
  line: {
    borderBottom: "5px solid #0000FF",
  },
  sobutia: {
    marginBottom: "30px",
  },
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  let id = router.query.id;
  let [item, setItem] = useState<NewsItem>();
  let [comment, setComment] = useState("");

  const handleCommentChange = e => setComment(e.target.value);

  function clickHandler() {
    client
      .post("/api/comments", {
        comment,
        id,
      })
      .then(() => {
        client.get(`/api/completenew?id=${id}`).then((result) => {
          setItem(result.data);
        });
      })
      .catch(() => {});
  }

  let onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      client
        .post("/api/comments", {
          comment,
          id,
        })
        .then(() => {
          client.get(`/api/completenew?id=${id}`).then((result) => {
            setItem(result.data);
          });
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    client.get(`/api/completenew?id=${id}`).then((result) => {
      setItem(result.data);
    });
  }, [id]);

  return (
    <div>
      <Head>
        <title>new-news</title>
      </Head>
      <Header />
      {item ? (
        <div className={classes.root}>
          <main className={classes.main}>
            <div>
              <Grid className={classes.sobutia}>
                <div className={classes.line}>
                  <h2>Cобытия</h2>
                </div>
              </Grid>
            </div>
            <img className={classes.image} src={item?.image} />
            <h1>{item?.title}</h1>
            <div className={classes.description}>
              <p>{item?.description}</p>
            </div>
            <div className={classes.stylesComment}>
              <TextField
                className={classes.comment}
                placeholder="Коментарии"
                value={comment}
                onChange={handleCommentChange}
                onKeyPress={onKeyPressHandler}
              />
              <Button
                className={classes.add}
                variant="contained"
                color="primary"
                onClick={clickHandler}
              >
                Добавить
              </Button>
              {item.comments.map((comment) => (
                <Paper key={comment._id} className={classes.paper}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="avatar" src={comment.userImage}></Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography noWrap>{comment.userEmail}</Typography>
                      <Typography noWrap>{comment.value}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </div>
            <footer className={classes.footer}>
              <SimilarNews id={item._id} />
            </footer>
          </main>
        </div>
      ) : (
        <main className={classes.main}>Новость не найдена</main>
      )}
    </div>
  );
}