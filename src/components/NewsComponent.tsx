import NewsItemComponent from "./NewsItemComponent";
import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNewsList } from "services/news-list";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export interface NewsItemComponentProps {
  tags: string[];
  page: number;
}

export const NewsComponent: FC<NewsItemComponentProps> = (props) => {
  const { tags, page} = props;
  const classes = useStyles();
  const news = useNewsList(tags, page);

  return (
    <div className={classes.root}>
      <Grid container>
        {news.map((item) => (
          <Grid key={item.id} item xs={4} className={classes.paper}>
            <Link href={`/completenew/${item.id}`}>
              <NewsItemComponent item={item} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};