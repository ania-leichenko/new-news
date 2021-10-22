import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "api/axios";
import { NewsItem } from "@/types";
import { makeStyles } from "@material-ui/core/styles";
import { signIn, useSession } from "next-auth/client";
import Head from "next/head";
import Header from "@/components/Header/Header";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SimilarNews from "@/components/SimilarNews";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    isplay: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
  },
  sobutia: {
    marginBottom: "30px",
  },
  line: {
    borderBottom: "5px solid #0000FF",
  },
  main: {
    marginTop: "40px",
    textAlign: "center",
  },
  image: {
    maxWidth: 800,
  },
  description: {
    fontSize: "20px",
  },
  comment: {
    width: "500px",
    height: "35px",
  },
  stylesComment: {
    textAlign: "center",
    marginTop: "50px",
  },
  add: {
    marginLeft: "8px",
  },
  buttonPrimary: {
    borderRadius: ".3rem",
    lineHeight: "1.4rem",
    padding: ".7rem 1.4rem",
    backgroundColor: "#346df1",
    color: "#fff",
    textDecoration: "none",
    marginLeft: "15px",
  },
  paper: {
    maxWidth: 1200,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  footer: {
    marginTop: "80px",
    textAlign: "center",
  },
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query.id;
  const [item, setItem] = useState<NewsItem>();
  const [comment, setComment] = useState("");
  const [session] = useSession();

  const handleCommentChange = (e) => setComment(e.target.value);

  const onSubmitHandler = (e) => {
    e.preventDefault();
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
      .then(() => {
        setComment("");
      })
      .catch(() => {});
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
          <main>
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
            {!session && (
            <Grid container justifyContent="center">
              <p>Хочешь оставить свой коментарий?Регистрируйся!</p>
              <a
                href={`/api/auth/signin`}
                className={classes.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
               Зарегистрироваться
              </a>
            </Grid>
            )}
            {session && (
              <form onSubmit={onSubmitHandler}>
                <Grid container justifyContent="center">
                  <Grid item>
                    <textarea
                      className={classes.comment}
                      placeholder="Коментарии"
                      value={comment}
                      onChange={handleCommentChange}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      className={classes.add}
                      variant="contained"
                      color="primary"
                    >
                      Добавить
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
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