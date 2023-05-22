import { GetState, SetState, StateCreator, StoreApi, create } from "zustand";
import { PersistentSettings } from "../../../lib/types";
import Store from "electron-store";

const store = new Store();

const initialPersistentSettings: PersistentSettings = {
  stepCompileResoultion: 100,
  dmxRefreshRate: 0,
  interpolate: true,
  fixtureDefinitionsLocation: "",
};

type PersistentStore = PersistentSettings & {
  updatePersistentStore: (partialSettings: Partial<PersistentSettings>) => void;
};

type Middleware<S> = (
  config: StateCreator<S>
) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S>) => S;

const saveToFile: Middleware<PersistentStore> = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log("works");

      set(...args);
      console.log("new state", get());

      store.set("persistentSettings", get());
    },
    get,
    api
  );

export const usePersistentStore = create<PersistentStore>(
  saveToFile((set) => ({
    ...((store.get("persistentSettings") as PersistentSettings) ||
      initialPersistentSettings),
    updatePersistentStore: (partialSettings: Partial<PersistentSettings>) =>
      set((state) => {
        const newSettings = { ...state, partialSettings };
        return newSettings;
      }),
  }))
);
