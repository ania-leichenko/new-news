import New from "./New";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  hotnews: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

interface INew {
  id: string | number;
  h1: string;
  paragraphs: string;
  image: string;
}
interface IProps {
  news: INew[];
}

export default function News({ news = [] }: IProps) {
  const classes = useStyles();
  const newsList = news.map((item) => <New key={item.id} item={item} />);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <div className={classes.hotnews}>{newsList}</div>
      </Grid>
    </div>
  );
}
