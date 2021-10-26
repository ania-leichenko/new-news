import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
interface FilterProps {
  filter:  Object;
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
    <Grid container justifyContent="center">
      <Box m={1}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={allClickHandler}
          disabled={filter === "all"}
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
          disabled={filter === "hot"}
        >
          Горячие
        </Button>
      </Box>
    </Grid>
  );
}