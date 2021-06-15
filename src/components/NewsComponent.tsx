import NewsItemComponent from "./NewsItemComponent";
import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNewsList } from "services/news-list";

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

export interface NewsItemComponentProps {
  tags: string[];
}

export const NewsComponent: FC<NewsItemComponentProps> = (props) => {
  const { tags } = props;
  const classes = useStyles();

  const news = useNewsList(tags);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <div className={classes.hotnews}>
          {news.map((item) => (
            <NewsItemComponent key={item.id} item={item} />
          ))}
        </div>
      </Grid>
    </div>
  );
};
