import { SessionState } from "./app";

export type IpcMessage = EngineStateChangeRequest;

export type EngineStateChangeRequest = Partial<SessionState>;