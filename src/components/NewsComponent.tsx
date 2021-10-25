import { makeStyles } from "@material-ui/core/styles";
import { FC } from "react";
import { NewsItem } from "@/types";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import NewsItemComponent from "./NewsItemComponent";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  links: {
    outline: "none",
    textDecoration: "none",
  },
}));

export interface NewsItemComponentProps {
  news: NewsItem[];
}

export const NewsComponent: FC<NewsItemComponentProps> = ({ news }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        {news.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} className={classes.paper}>
            <Link href={`/completenew/${item.id}`} >
              <a className={classes.links}>
                <NewsItemComponent item={item} />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};