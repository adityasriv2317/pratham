import type { AppProps } from "next/app";
import { StoreProvider } from "@/store/StoreProvider";

import "@/app/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
        <Component {...pageProps} />
    </StoreProvider>
  );
}