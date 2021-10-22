import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NewsItem } from "../types/newsItem";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
   width: "300px",
   height: "300px",
  },
  media: {
    paddingTop: "56.25%",
  },
}));

interface NewsItemComponentProps {
  item: NewsItem;
}

export default function NewsItemComponent({ item }: NewsItemComponentProps) {
  const classes = useStyles();

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={item.image} />
        <CardContent>
          <Typography variant="body2" component="h2">
            {item.title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}