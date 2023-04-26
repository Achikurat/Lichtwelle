export type EngineState = {
    fixtures: Fixture[]
};

export type Capability = {
    valueRange: [number, number];
    label: string;
}

export type Channel = {
    nane: string;
    type: undefined;
    capabilities: Capability[]; 
}

export type Fixture = {
    address: number;
    channels: (Channel | Channel[])[];
    src: string;
}

