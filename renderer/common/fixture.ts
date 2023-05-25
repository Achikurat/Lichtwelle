import electron from "electron";
import { Addressing, Fixture, FixtureDefinition } from "../../lib/types";
import { useSessionStore } from "./store/sessionStore";
import { IpcMessageType, UidType } from "../../lib/enums";
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

export function createAutoAddressing(
  startAddress: number,
  addressOffest: number,
  fixtureCount: number,
  channelCount: number
): Addressing[] {
  const addressings: Addressing[] = [];
  for (var i = 0; i < fixtureCount; i++) {
    const firstChannel = startAddress + i * addressOffest;
    const lastChannel = firstChannel + channelCount - 1;
    addressings.push({
      firstChannel: firstChannel,
      lastChannel: lastChannel,
      intersections: [],
      universe: "A",
    });
  }
  return addressings;
}

export function nextFreeUidKey() {
  const fixtureUidKeys = useSessionStore
    .getState()
    .uids.filter((uid) => uid.type === UidType.FIXTURE)
    .map((uid) => uid.key)
    .sort((a, b) => a - b);
  var cKey = 1;
  fixtureUidKeys.every((key) => {
    if (cKey === key) {
      cKey = key + 1;
      return true;
    }
  });
  return cKey;
}

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
