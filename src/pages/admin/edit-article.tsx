import { useState, useEffect } from "react";
import { client } from "api/axios";
import { NewsItem } from "@/types";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: "center",
  },
  main: {
    textAlign: "center",
  },
  image: {
    width: "800px",
    marginBottom: "15px",
  },
  title: {
    width: 800,
  },
  description: {
    width: 800,
    height: 90,
    margin: 50,
  },
  button: {
    marginTop: "15px",
  },
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  let id = router.query.id;

  let [item, setItem] = useState<NewsItem>();
  let [title, setTitle] = useState<NewsItem>();
  let [description, setDescription]= useState<NewsItem>();

  const changeTitle = (valueTitle) => {
    setTitle(valueTitle);
  }
  
  const changeDescription = (valueDescription) => {
    setDescription(valueDescription);
  }

  function clickHandler () {
    client
    .post("/api/admin/save-article", {
      title: title,
      description: description,
      id: id,
    })
    .catch(() => {});
  }

  useEffect(() => {
    client.get(`/api/admin/edit-article?id=${id}`).then((result) => {
      setItem(result.data);
      setTitle(result.data);
      setDescription(result.data);
    });
  }, [id]);
  
  return (
    <div className={classes.root}>
      {item ? (
        <main className={classes.main}>
          <img src={item.image} className={classes.image}/>
          <div>
            <TextField 
              defaultValue={item.title} 
              className={classes.title}
              onChange={(e) => {
              changeTitle(e.target.value);
              }}>
            </TextField> 
          </div>
          <div>
            <textarea defaultValue={item.description} 
            className={classes.description}
            onChange={(e) => {
              changeDescription(e.target.value);
            }}>
            </textarea>
          </div>
          <footer>
            <Button
              className={classes.button}
              color="primary"
              onClick={clickHandler}
            >Save</Button>
          </footer>
        </main>
      ) : (
        <main className={classes.main}>?????????????? ???? ??????????????</main>
      )}
    </div>
  );
}