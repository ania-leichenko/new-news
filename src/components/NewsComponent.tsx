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
    textAlign: 'center',
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
      <Grid container>
        {news.map((item) => (
          <Grid item xs={4} className={classes.paper}> 
            <Link href={`/completenew/${item.id}`} >
              <NewsItemComponent key={item.id} item={item} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};