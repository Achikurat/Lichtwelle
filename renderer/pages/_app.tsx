import electron from "electron";
import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import theme from "../theme";
import { Layout } from "../components/layout";
import { reloadFixtureDefinitions } from "../common/fixture";
import { useSessionStore } from "../common/store/sessionStore";

import "../public/css/gambetta.css";
import "../public/css/general-sans.css";
import { Router } from "next/router";

const ipcRenderer = electron.ipcRenderer || false;

export default function App({ Component, pageProps }: AppProps) {
  const updateSessionState = useSessionStore(
    (state) => state.updateSessionState
  );

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteStart = () => setLoading(true);
    const handleRouteDone = () => setLoading(false);

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  useEffect(() => {
    //reload Fixture Definitions
    reloadFixtureDefinitions((fixtureDefinitions) => {
      updateSessionState({
        fixtureDefinitions: fixtureDefinitions,
      });
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        {isLoading ? (
          <Center w="100%" h="100%">
            <Spinner size="xl" color="primary" />
          </Center>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </ChakraProvider>
  );
}
