import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Form from "./completenew/form"; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function LayoutTextFields() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Form/>
    </div>
  );
}