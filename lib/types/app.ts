import {
  UidType,
  LayoutType,
  EasingFunction,
  TriggerType,
  View,
} from "../enums/";

export type SessionState = {
  uids: { [type: string]: number[] };
  fixtures: Fixture[];
  fixtureDefinitions: FixtureDefinition[];
  groups: Group[];
  cues: Cue[];
  layouts: Layout[];
  directMappings: undefined[];
  activeView: View;
  sessionSettings: SessionSettings;
};

export type SessionSettings = {
  maxStep: number;
  bpm: number;
};

export type PersistentSettings = {
  stepCompileResoultion: number;
  interpolate: boolean;
  dmxRefreshRate: number;
  fixtureDefinitionsLocation: string;
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
  name: string;
  capabilities: Capability[];
  isFine?: boolean;
  defaultValue?: number;
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
  src: Uid;
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
  addressing: Addressing;
  definition: FixtureDefinition;
  mode: string;
  channels: Channel[];
};

export type FixtureDefinition = {
  name: string;
  manufacturer: string;
  channels: { [key: string]: Channel };
  src: string;
  modes: { [key: string]: string[] };
};

export type Addressing = {
  universe: string;
  firstChannel: number;
  lastChannel: number;
  intersections: Addressing[];
};

export type Group = {
  uid: Uid;
  name: string;
  fixtures: Uid[];
};

export type Cue = {
  uid: Uid;
  tracks: { [groupName: string]: CueTrack[] };
  fixtures: Uid[];
  length: number;
};

export type Layout = {
  uid: Uid;
  type: LayoutType;
  mappings: Mapping[];
};
