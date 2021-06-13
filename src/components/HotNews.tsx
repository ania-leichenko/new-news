import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  hot: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.hot}>
      <CardMedia
        className={classes.media}
        image="/image/instagram.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            Как понять алгоритмы Instagram?» Отвечает глава соцсети Адам Моссери
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Алгоритмы Instagram всегда были для пользователей загадкой. Ведь
            иногда непонятно, почему публикации не появляются в ленте у
            подписчиков, а контент незаслуженно удаляется с платформы. Кроме
            того, в интернете существует мнение, что соцсеть любит добавлять
            юзеров в теневой бан, поэтому и активность на странице падает. Чтобы
            пролить свет на политику Instagram, Адам Моссери, глава соцсети,
            прокомментировал в блоге компании некоторые распространенные
            заблуждения насчет приложения.
          </Typography>
          <Typography paragraph>
            Первое, на что обращает внимание Адам, это приоритетность появления
            публикаций в ленте пользователя. Исходя из слов эксперта, в первую
            очередь в feed отображаются посты, похожие на те, что понравились
            вам ранее, или на те, что вы добавили в список сохраненных
            публикаций. Кроме того, Instagram скорее покажет вам обновления тех
            пользователей, с которыми вы обычно взаимодействуете. Но и о лайках
            забывать не стоит: они тоже учитываются при выводе в ленту.
          </Typography>
          <Typography>
            Что касается теневого бана и удаления контента с площадки, то в
            скором времени пользователи начнут получать соответствующие
            уведомления с расширенным описанием.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
