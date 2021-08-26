import { Provider } from "next-auth/client";

function App({ Component, pageProps }) {
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </Provider>
  );
}

const getInitialProps = async ({ Component, ctx }) => {
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };

  return { pageProps };
};

App.getInitialProps = getInitialProps;

export default App;