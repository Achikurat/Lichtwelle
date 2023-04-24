import { MessageType } from "../enums/message";
import { AppState } from "./app";

export type Message = AppStateChangeRequest | AppStateChangeResponse;

export type AppStateChangeRequest = Partial<AppState>;
export type AppStateChangeResponse = AppState;
