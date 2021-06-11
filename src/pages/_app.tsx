function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

const getInitialProps = async ({ Component, ctx }) => {
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };

  return { pageProps };
};

App.getInitialProps = getInitialProps;

export default App
