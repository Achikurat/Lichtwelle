import electron from "electron";
import React from "react";
import { IpcMessageType } from "../../lib/enums";
import { SessionSettings, SessionState } from "../../lib/types";
import { create } from "zustand";
import { AppProps } from "next/app";

const ipcRenderer = electron.ipcRenderer || false;

const initalSessionSettings: SessionSettings = {
  bpm: 0,
  stepCompileResoultion: 100,
  dmxRefreshRate: 0,
  interpolate: true,
  maxStep: 7,
};

const initialSessionState: SessionState = {
  uids: [],
  fixtures: [],
  cues: [],
  groups: [],
  directMappings: [],
  layouts: [],
  settings: initalSessionSettings,
};

type SessionStore = SessionState & {
  updateSessionState: (partialState: Partial<SessionState>) => void;
};

function compileOnUpdate(
  partialState: Partial<SessionState>,
  newState: SessionState
) {
  //TODO: Check need for reduced updates
  if (ipcRenderer) {
    ipcRenderer.send(IpcMessageType.SessionStateChange, newState);
  }
}

const useSessionStore = create<SessionStore>((set) => ({
  ...initialSessionState,
  updateSessionState: (partialState: Partial<SessionState>) =>
    set((state) => {
      const newState = { ...state, partialState };
      compileOnUpdate(partialState, newState);
      return newState;
    }),
}));

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

  return <Component {...pageProps} />;
}
