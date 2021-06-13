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

export default function New() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.hot}>
      <CardMedia
        className={classes.media}
        image="/image/polaroid.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Keith Haring × Polaroid: когда все, что вы фотографируете, становится
          искусством
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
            Ищете себе такую камеру, которая не только хорошо снимает, но и с
            интересной историей? Тогда предлагаем взглянуть на Polaroid Now
            Keith Haring Edition — результат коллаборации Фонда Кита Харинга и
            Polaroid.
          </Typography>
          <Typography paragraph>
            Камера мгновенной печати впитала в себя настроения Нью-Йорка 80-х
            годов, когда весь мир наблюдал за творчеством Кита Харинга.
            Знаменитые иллюстрации художника удачно перекочевали на небольшой
            корпус фотоаппарата, представленный в красной расцветке. Кроме того,
            этот же паттерн прослеживается и на картриджах для камеры.
          </Typography>
          <Typography paragraph>
            Но Polaroid Now может похвастаться не только стильным дизайном:
            точно настроенная вспышка и двухлинзовая автофокусировка — как раз
            то, что нужно для резких кадров.
          </Typography>
          <Typography>
            Обойдется такая камера в $ 120, или же $ 170 за стартовый набор, в
            который вошли фотоаппарат и 3 набора картриджей.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
