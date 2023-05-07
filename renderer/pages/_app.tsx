import electron from "electron";
import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Navigation } from "../components";

const ipcRenderer = electron.ipcRenderer || false;

export default function App({ Component, pageProps }: AppProps) {
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

  return (
    <ChakraProvider theme={theme}>
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </ChakraProvider>
  );
}
