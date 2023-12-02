import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/util/theme";
import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Adventskalender</title>
      </Head>
      <ChakraProvider theme={theme}>
        <NavigationBar />
        <Component {...pageProps} />
      </ChakraProvider>
      <div id={"__chakra-manual-mount-point-do-not-use"}></div>
      <div id={"manual-mount-point"}></div>
    </>
  );
}
