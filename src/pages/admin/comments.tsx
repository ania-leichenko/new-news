import { useState, useEffect } from "react";
import { client } from "api/axios";
import { Comment } from "@/types";
import { makeStyles } from "@material-ui/core/styles";
import {createStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import  TextField  from "@material-ui/core/TextField";
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "1px solid black",
      maxWidth: 345,
      justifyContent: "center",
      margin: theme.spacing(1),
    },
    media: {
      textAlign: "right",
    }
  }),
);

export default function Home() {
  const classes = useStyles();
  let [comments, setComments] = useState<Comment[]>([]);
 
  function clickHandler(index) {
    const comment = comments[index];
    client
      .post("/api/admin/savecomments", {
        comment: comment.value, 
        id: comment._id,
      })
      .catch(() => {});
  } 

  const changeComment = (index, value) => {
    setComments((arr) => {
      arr[index].value = value;
      return arr;
    });
  }

  useEffect(() => {
    client.get('/api/admin/comments').then((result) => {
      setComments(result.data);
    });
  }, []);

  function click(index) {
    const comment = comments[index];
    client
      .post("/api/admin/deletecomments", {
        id: comment._id,
      })
      .catch(() => {});
  } 
 
  return (
    <div>
      {comments.map((comment, index) => (
        <Card key={comment._id} className={classes.root}>
          <CardHeader
            avatar={
              <Avatar alt="User Image" src={comment.userImage} />
            }
            title={comment.userEmail}
            subheader={(
              <TextField 
                defaultValue={comment.value}
                onChange={(e) => {
                  changeComment(index, e.target.value);
                }}>
              </TextField>
            )}
          />
          <CardMedia className={classes.media}>
            <Button
              color="primary"
              onClick={() => clickHandler(index)}
            >Save</Button>
            <IconButton aria-label="delete" onClick={() => click(index)}>
              <DeleteIcon />
            </IconButton>
          </CardMedia>
        </Card>
      ))}
    </div>
  );
}
