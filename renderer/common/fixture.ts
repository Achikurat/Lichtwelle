import electron from "electron";
import { Addressing, Fixture, FixtureDefinition } from "../../lib/types";
import { useSessionStore } from "./store/sessionStore";
import { IpcMessageType, UidType } from "../../lib/enums";
import { usePersistentStore } from "./store/persistentStore";
import next from "next/types";

const ipcRenderer = electron.ipcRenderer || false;

export function addFixtures(fixtures: Fixture[]) {
  useSessionStore.setState({
    fixtures: [...useSessionStore.getState().fixtures, ...fixtures],
  });
  updateFixtureUids();
  console.log(useSessionStore.getState().fixtures);
}

export function updateFixtureUids() {
  const fixtureUidKeys = useSessionStore
    .getState()
    .fixtures.map((fixture) => fixture.uid.key);
  useSessionStore.setState({
    uids: {
      ...useSessionStore.getState().uids,
      [UidType.FIXTURE]: fixtureUidKeys,
    },
  });
}

export function createFixtures(
  addressings: Addressing[],
  fixtureDefinition: FixtureDefinition,
  channelMode: string,
  name: string
) {
  const fixtureUidKeys = nextFreeUidKeys(addressings.length);
  addFixtures(
    addressings.map((addressing, idx): Fixture => {
      return {
        uid: {
          type: UidType.FIXTURE,
          key: fixtureUidKeys[idx],
        },
        name: name,
        addressing: addressing,
        definition: fixtureDefinition,
        mode: channelMode,
        channels: fixtureDefinition.modes[channelMode].map(
          (string) => fixtureDefinition.channels[string]
        ),
      };
    })
  );
}

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

export function nextFreeUidKeys(amount: number): number[] {
  const originalUidKeys = useSessionStore
    .getState()
    .uids[UidType.FIXTURE].sort((a, b) => a - b);
  const collectedUidKeys = [];
  for (var i = 0; i < amount; i++) {
    collectedUidKeys.push(
      nextFreeUidKey([...originalUidKeys, ...collectedUidKeys])
    );
  }
  return collectedUidKeys;
}

export function nextFreeUidKey(overrideUids?: number[]) {
  const fixtureUidKeys =
    overrideUids ||
    useSessionStore.getState().uids[UidType.FIXTURE].sort((a, b) => a - b);
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
