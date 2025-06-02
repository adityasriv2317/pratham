import type { AppProps } from "next/app";
import { StoreProvider } from "@/store/StoreProvider";
import Head from "next/head";

import "@/app/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <>
        <Head>
          <title>Pratham</title>
        </Head>
        <Component {...pageProps} />
      </>
    </StoreProvider>
  );
}
