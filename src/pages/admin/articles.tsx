import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { NewsItem } from "../../types/newsItem";
import { client } from "api/axios";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  hot: {
    maxWidth: 345,
    border: "1px solid black",
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function NewsItemComponent() {
  const classes = useStyles();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    client
      .get("/api/articles", {})
      .then((result) => {
        setNews(result.data.items);
      })
      .catch(() => {});
  }, []);

  function handleClick(id) {
    client
      .post("/api/admin/delete-article", {
        id: id,
      })
      .catch(() => {});
  }

  return (
    <div>
      {news.map((item) => (
        <Card key={item.id} className={classes.hot}>
          <CardMedia className={classes.media} image={item.image} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.title}
            </Typography>
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
      ))}
    </div>
  );
}
