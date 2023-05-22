import electron from "electron";
import { create } from "zustand";
import { View, IpcMessageType } from "../../../lib/enums";
import {
  PersistentSettings,
  SessionSettings,
  SessionState,
} from "../../../lib/types";

const ipcRenderer = electron.ipcRenderer || false;

const initalSessionSettings: SessionSettings = {
  bpm: 0,
  maxStep: 7,
};

const initialSessionState: SessionState = {
  uids: [],
  fixtures: [],
  fixtureDefinitions: [],
  cues: [],
  groups: [],
  directMappings: [],
  layouts: [],
  activeView: View.HOME,
  sessionSettings: initalSessionSettings,
};

type SessionStore = SessionState & {
  updateSessionState: (partialState: Partial<SessionState>) => void;
};

function compileOnUpdate(
  partialState: Partial<SessionState>,
  newState: SessionState
) {
  //TODO: Check need for reduced updates
  /*
  if (ipcRenderer) {
    ipcRenderer.send(IpcMessageType.SessionStateChange, newState);
  }
  */
}

export const useSessionStore = create<SessionStore>((set) => ({
  ...initialSessionState,
  updateSessionState: (partialState: Partial<SessionState>) =>
    set((state) => {
      const newState = { ...state, partialState };
      compileOnUpdate(partialState, newState);
      return newState;
    }),
}));
