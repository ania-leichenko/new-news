import React, { useState } from "react";
import { client } from "@/api/axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  input: {
    marginBottom: "15px",
  },
}));

export default function LayoutTextFields() {
  const classes = useStyles();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [tags, setTags] = useState("");
  let [newImg, setNewImg] = useState("");

  function clickHandler() {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('newImg', newImg);
    
    client
      .post("/api/admin/create-article", formData, {headers: {Accept: "application/json"}})
      .catch(() => {});
  }

  let onKeyPressHandler = e => {
    if (e.key === 'Enter') {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('newImg', newImg);
    
    client
      .post("/api/admin/create-article", formData, {headers: {Accept: "application/json"}})
      .catch(() => {});
    }
  };

  const handleImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        const img = e.target.files[0];
        setNewImg(img);
    }
  };
  
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
        onKeyPress={onKeyPressHandler}
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
        onKeyPress={onKeyPressHandler}
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
        onKeyPress={onKeyPressHandler}
      />
      <div className={classes.input}>
        <Input type="file" onChange={handleImgChange} />
      </div>
        <Button variant="contained" color="primary" onClick={clickHandler}>
          ????????????????????????
        </Button>
    </div>
  );
}