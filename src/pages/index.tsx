import Head from "next/head";
import Header from "../components/Header";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export default function Home() {
  return (
    <div>
      <Head>
        <title>new-news</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Box m={1}>
          <Button size="medium" variant="contained" color="primary">
            Small
          </Button>
          <Button size="medium" variant="contained" color="primary">
            Medium
          </Button>
        </Box>
      </main>
    </div>
  );
}