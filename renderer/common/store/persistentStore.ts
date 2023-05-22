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

export const usePersistentStore = create<PersistentStore>((set) => ({
  ...((store.get("persistentSettings") as PersistentSettings) ||
    initialPersistentSettings),
  updatePersistentStore: (partialSettings: Partial<PersistentSettings>) =>
    set((state) => {
      const newSettings = { ...state, partialSettings };
      return newSettings;
    }),
}));

usePersistentStore.subscribe((settings) =>
  store.set("persistentSettings", settings)
);
