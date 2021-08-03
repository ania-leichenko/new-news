import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { client } from "@/api/axios";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

export default function LayoutTextFields() {
  const classes = useStyles();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [tags, setTags] = useState("");
  function clickHandler() {
    client
      .post("/api/admin/createnew", {
        title,
        description,
        tags,
      })
      .catch(() => {});
  }

  return (
    <div>
      <TextField
        id="standard-full-width"
        label="title"
        style={{ margin: 8 }}
        placeholder="name your article"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={function (e) {
          setTitle(e.target.value);
        }}
      />
      <TextField
        id="standard-full-width"
        label="description"
        style={{ margin: 8 }}
        placeholder="introduce description"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={function (e) {
          setDescription(e.target.value);
        }}
      />
      <TextField
        id="standard-full-width"
        label="tags"
        style={{ margin: 8 }}
        placeholder="introduce tags"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={function (e) {
          setTags(e.target.value);
        }}
      />
        <Button variant="contained" color="primary" onClick={clickHandler}>
          Опубликовать
        </Button>
    </div>
  );
}