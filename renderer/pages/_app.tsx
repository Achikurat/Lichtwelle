import electron from "electron";
import React from "react";
import { IpcMessageType } from "../../shared/enums";
import {EngineState} from "../../shared/types"
import { create } from "zustand";
import { AppProps } from "next/app";

const ipcRenderer = electron.ipcRenderer || false;

const initialEngineState = {

}

type EngineStore = EngineState & {
  updateEngineState: (partialState: Partial<EngineState>) => void;
}

function compileOnUpdate(partialState: EngineState, newState: EngineState) {
  //TODO: Check need for reduced updates
  if(ipcRenderer){
    ipcRenderer.send(IpcMessageType.EngineStateChange, newState)
  }
}

const useEngineStore = create<EngineStore>((set) => ({
  ...initialEngineState,
  updateEngineState: (partialState: Partial<EngineState>) =>
    set((state) => {
      const newState = {...state, partialState};
      compileOnUpdate(partialState, newState);
      return newState;
    })
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
