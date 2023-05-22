import electron from "electron";
import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Layout } from "../components/layout";
import { reloadFixtureDefinitions } from "../common/fixture";
import { useSessionStore } from "../common/store/sessionStore";
import Store from "electron-store";
import { PersistentSettings } from "../../lib/types";

const ipcRenderer = electron.ipcRenderer || false;

export default function App({ Component, pageProps }: AppProps) {
  const updateSessionState = useSessionStore(
    (state) => state.updateSessionState
  );

  /*
  Possible backchannel for midi etc.

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.on(IpcMessageType.EngineStateChange, (event, data) => {});   
    }

    return () => {
      if (ipcRenderer) {
        ipcRenderer.removeAllListeners(IpcMessageType.EngineStateChange);
      }
    };
  }, []);
  */

  useEffect(() => {
    //load settings from File
    const store = new Store();
    const loadedSettings = store.get(
      "persistentSettings"
    ) as PersistentSettings;
    updateSessionState({ persistentSettings: loadedSettings });
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
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
