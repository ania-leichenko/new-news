import { useState, useEffect } from "react";
import { client } from "api/axios";
import { Comment } from "@/types";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {createStyles, Theme} from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    root: {
      maxWidth: 345,
      justifyContent: "center",
    },
    media: {
      textAlign: "right",
    }
  }),
);

export default function Home() {
  const classes = useStyles();
  let [comments, setComments] = useState<Comment[]>([]);
  
  const value = comments.map((comment) => (
    <p key={comment._id}>
      {comment.value}
    </p>
  ));

  const userEmail = comments.map((comment) => (
    <p key={comment._id}>
      {comment.userEmail}
    </p>
  ));

  const userImage = comments.map((comment) => (
    <p key={comment._id}>
      {comment.userImage}
    </p>
  ));
  
  function clickHandler() {
    return (<input></input>)
   }
   
  useEffect(() => {
    client.get('/api/admin/comments').then((result) => {
      setComments(result.data);
    });
  }, []);
 
  return (
    <div>
      <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
             {userImage}
          </Avatar>
        }
        title={userEmail}
        subheader={value}
      />
      <CardMedia className={classes.media}>
        <IconButton aria-label="edit" onClick={clickHandler}> 
          <EditIcon/>
        </IconButton>
        <IconButton aria-label="delete" className={classes.margin}>
          <DeleteIcon />
        </IconButton>
      </CardMedia>
      </Card>
    </div>
  );
}
