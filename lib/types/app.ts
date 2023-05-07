import {
  UidType,
  LayoutType,
  EasingFunction,
  TriggerType,
  View,
} from "../enums/";

export type SessionState = {
  uids: Uid[];
  fixtures: Fixture[];
  groups: Group[];
  cues: Cue[];
  layouts: Layout[];
  directMappings: undefined[];
  activeView: View;
  settings: SessionSettings;
};

export type SessionSettings = {
  maxStep: number;
  bpm: number;
  stepCompileResoultion: number;
  interpolate: boolean;
  dmxRefreshRate: number;
};

export type Uid = {
  type: UidType;
  key: number;
};

export type Capability = {
  valueRange: [number, number];
  label: string;
};

export type Channel = {
  nane: string;
  type: undefined;
  capabilities: Capability[];
  fineChannel: number;
};

export type CueTrack = {
  name: string;
  absoulteChannels: number[];
  abosulteFineChannels: number[];
  capabilities: Capability[];
  vertecies: number[];
  edges: EasingFunction[];
};

export type CueInstance = {
  uid: Uid;
  priority: number;
  currentStep: number;
  syncWithTransport: boolean;
  valueMap: { [channel: number]: number[][] };
  src: Cue;
};

export type Mapping = {
  uid: Uid;
  name: string;
  cueInstance: CueInstance;
  trigger: TriggerType;
  slot?: number;
};

export type Fixture = {
  uid: Uid;
  name: string;
  universe: string;
  address: number;
  channels: (Channel | Channel[])[];
  src: string;
};

export type Group = {
  uid: Uid;
  name: string;
  fixtures: Fixture[];
};

export type Cue = {
  uid: Uid;
  tracks: { [groupName: string]: CueTrack[] };
  fixtures: Fixture[];
  length: number;
};

export type Layout = {
  uid: Uid;
  type: LayoutType;
  mappings: Mapping[];
};
