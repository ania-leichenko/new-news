import { useState, useEffect } from "react";
import { client } from "api/axios";
import { NewsItem } from "@/types";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    justifyContent: "center",
    margin: theme.spacing(1), 
  },
  main: {
    textAlign: "center",
  },
  description: {
    fontSize: "20px",
    width: 800,
    margin: 50,
  },
  title: {
    width: 800,
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
          <img src={item.image} />
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
           <TextField defaultValue={item.description} 
           className={classes.description}
           onChange={(e) => {
            changeDescription(e.target.value);
           }}>
           </TextField>
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
        <main className={classes.main}>Новость не найдена</main>
      )}
    </div>
  );
}