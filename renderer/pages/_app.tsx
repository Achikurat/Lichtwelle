import electron from "electron";
import { useEffect } from "react";
import { MessageType } from "../../common/enums";
import { create } from "zustand";
import { AppState } from "../../common/types";

const ipcRenderer = electron.ipcRenderer || false;

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.on(MessageType.AppStateChange, (event, data) => {});
    }

    return () => {
      if (ipcRenderer) {
        ipcRenderer.removeAllListeners(MessageType.AppStateChange);
      }
    };
  }, []);

  return <Component {...pageProps} />;
}
