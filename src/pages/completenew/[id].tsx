import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import { client } from "api/axios";
import { NewsItem } from "@/types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: 1000,
    isplay: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
    maxWidth: 1000,
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
  footer: {
   textAlign: "center",
   marginTop: "80px",
  }
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  let id = router.query.id;
  let [item, setItem] = useState<NewsItem>();
  let [comment, setComment] = useState("");
  
  function clickHandler() {
    client
      .post("/api/comments", {
        comment,
        id,
      }).then(()=>{
        client
        .get(`/api/completenew?id=${id}`).then((result) => {
          setItem(result.data);
        });
      })
      .catch(() => {});
    }

 let onKeyPressHandler = e => {
    if (e.key === 'Enter') {
      client
      .post("/api/comments", {
        comment,
        id,
      }).then(()=>{
        client
        .get(`/api/completenew?id=${id}`).then((result) => {
          setItem(result.data);
        });
      })
      .catch(() => {});
    };
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
                onChange={function (e) {
                  setComment(e.target.value);
                }}
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
                <Paper  key={comment._id} className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={comment.userImage} ></Avatar>
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography noWrap>{comment.userEmail}</Typography>
                    <Typography noWrap>{comment.value}</Typography>
                  </Grid>
                </Grid>
              </Paper>
              ))}
            </div>
        </main>
      ) : (
        <main className={classes.main}>Новость не найдена</main>
      )}
       <footer className={classes.footer}>
        <h2>ЧИТАЙТЕ ЕЩЁ:</h2>
       </footer>
    </div>
  );
}