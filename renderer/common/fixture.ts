import electron from "electron";
import { Fixture, FixtureDefinition } from "../../lib/types";
import { useSessionStore } from "./store/sessionStore";
import { IpcMessageType } from "../../lib/enums";

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
  const persistentSettings = useSessionStore(
    (state) => state.persistentSettings
  );

  const ipcRenderer = electron.ipcRenderer || false;
  const fixtureDefinitions =
    ipcRenderer &&
    ipcRenderer.sendSync(
      IpcMessageType.ReloadFixtureDefinitions,
      persistentSettings
    );

  callback(fixtureDefinitions);
}
