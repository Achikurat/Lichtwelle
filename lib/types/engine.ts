import { QueueActionType } from "../enums";
import { CueInstance, SessionState } from "./app";

export type EngineState = {
  cueInstances: { [uidKey: number]: CueInstance[] };
  queue: { [step: number]: QueueItem[] };
  step: number;
  blackout: boolean;
  sessionState: SessionState;
};

export type QueueItem = {
  instance: CueInstance;
  action: QueueActionType;
};
