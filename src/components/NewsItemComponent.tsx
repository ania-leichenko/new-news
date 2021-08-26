import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { NewsItem } from "../types/newsItem";

const useStyles = makeStyles((theme) => ({
  hot: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

interface NewsItemComponentProps {
  item: NewsItem;
}

export default function NewsItemComponent({ item }: NewsItemComponentProps) {
  const classes = useStyles();

  return (
    <Card className={classes.hot}>
      <CardMedia className={classes.media} image={item.image} />
      <CardContent>
        <Typography variant="body2" component="h2">
          {item.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
