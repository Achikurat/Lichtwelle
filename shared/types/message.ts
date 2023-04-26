import { EngineState } from "./app";

export type IpcMessage = EngineStateChangeRequest;

export type EngineStateChangeRequest = Partial<EngineState>;
