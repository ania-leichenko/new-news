import New from "./New";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {NewComponentNew} from "../types";

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

interface NewComponentProps {
  news: NewComponentNew[];
}

export default function News({ news = [] }: NewComponentProps) {
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
