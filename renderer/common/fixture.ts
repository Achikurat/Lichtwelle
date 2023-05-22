import electron from "electron";
import { Fixture, FixtureDefinition } from "../../lib/types";
import { useSessionStore } from "./store/sessionStore";
import { IpcMessageType } from "../../lib/enums";
import { usePersistentStore } from "./store/persistentStore";

const ipcRenderer = electron.ipcRenderer || false;

export function addFixtures(fixtures: Fixture[]) {
  const [sessionFixtures, updateSessionState] = useSessionStore((state) => [
    state.fixtures,
    state.updateSessionState,
  ]);

  updateSessionState({ fixtures: [...sessionFixtures, ...fixtures] });
}

export function createFixtures() {}

export function reloadFixtureDefinitions(
  callback?: (fixtureDefinitions: FixtureDefinition[]) => void
) {
  const fixtureDefinitionsLocation =
    usePersistentStore.getState().fixtureDefinitionsLocation;

  ipcRenderer &&
    ipcRenderer
      .invoke(
        IpcMessageType.ReloadFixtureDefinitions,
        fixtureDefinitionsLocation
      )
      .then((fixtureDefinitions) => callback(fixtureDefinitions));
}
