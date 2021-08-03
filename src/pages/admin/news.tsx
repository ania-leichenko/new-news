import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { NewsItem } from "../../types/newsItem";
import { client } from "api/axios";
import Link from "@material-ui/core/Link";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
//import TextField from "@material-ui/core/TextField";

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
   const [news, setNews] =  useState<NewsItem[]>([]);
   useEffect(() => {
    client
    .get("/api/newsItem", {
      
    })
    .then((result) => {
      setNews(result.data);
    })
    .catch(() => {}); 
    
  }, [])
  const classes = useStyles();

  return (
    <div>
      {news.map((item) => (
      <Card key={item.id} className={classes.hot}>
        <CardMedia
            className={classes.media}
            image={item.image}
            title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.title}
          </Typography>
          <Link href={`/admin/editnew?id=${item.id}`}>
            <IconButton aria-label="edit" className={classes.margin}>
                <EditIcon />
            </IconButton>
          </Link>
            <IconButton aria-label="delete" className={classes.margin}>
              <DeleteIcon />
            </IconButton>
        </CardContent>
      </Card>
      ))}
    </div>
  );
}


// <TextField>{item.title}</TextField>
// <TextField>{item.description}</TextField>