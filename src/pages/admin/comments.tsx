import { useState, useEffect } from "react";
import { client } from "api/axios";
import { Comment } from "@/types";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {createStyles, Theme} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
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
  function click() {
    
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
 
  return (
    <div>
      {comments.map((comment, index) => (
        <Card key={comment._id} className={classes.root}>
          <CardHeader
            avatar={
              <Avatar alt="Remy Sharp" src={comment.userImage} />
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
            
            <IconButton aria-label="delete" className={classes.margin} onClick={click}>
              <DeleteIcon />
            </IconButton>
          </CardMedia>
        </Card>
      ))}
    </div>
  );
}
