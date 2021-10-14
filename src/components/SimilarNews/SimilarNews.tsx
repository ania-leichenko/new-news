import Button from "@material-ui/core/Button";
import { NewsComponent } from "@/components/NewsComponent";
import useSimilarNews from "./useSimilarNews";

export default function SimilarNews() {
  const { news, loadMore, canLoadMore } = useSimilarNews();
  return (
    <div>
      <h3>ЧИТАЙТЕ ЕЩЁ:</h3>
      <NewsComponent news={news} />
      <Button
        variant="contained"
        color="primary"
        onClick={loadMore}
        disabled={!canLoadMore}
      >
        ЕЩЁ
      </Button>
    </div>
  );
}
