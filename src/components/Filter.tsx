import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

interface FilterProps {
  filter: string;
  setFilter: Function;
}

export default function Filter({ filter, setFilter }: FilterProps) {
  function allClickHandler() {
    setFilter("all");
  }
  function hotClickHandler() {
    setFilter("hot");
  }

  return (
    <Grid container justify="center">
      <Box m={1}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={allClickHandler}
        >
          Все
        </Button>
      </Box>
      <Box m={1}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={hotClickHandler}
        >
          Горячие
        </Button>
      </Box>
    </Grid>
  );
}
