import type { AppProps } from "next/app";
import Head from "next/head";

import "@/app/globals.css";
import { wrapper } from "@/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pratham</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
