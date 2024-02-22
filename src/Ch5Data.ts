export type JoinRecord = {
    devices: Array<string>;
    docurl: string;
    event: string;
    group: string;
    joinid: string;
    state: string;
};

export type JoinRecordKeys =
    | "analogRecords"
    | "digitalRecords"
    | "serialRecords";

export type JoinRecords = {
    [K in JoinRecordKeys]: Record<string, JoinRecord>;
};

export type DeviceKeys =
    | "CH5 Virtual Panel"
    | "Crestron One"
    | "TS-1070"
    | "TS-1070-GV"
    | "TS-770"
    | "TS-770-GV"
    | "TST-1080"
    | "TSW-1060"
    | "TSW-1060-NC"
    | "TSW-1070"
    | "TSW-1070-GV"
    | "TSW-560"
    | "TSW-560-NC"
    | "TSW-560P"
    | "TSW-570"
    | "TSW-570P"
    | "TSW-760"
    | "TSW-760-NC"
    | "TSW-770"
    | "TSW-770-GV"
    | "UC-ENGINE-FLEX-TEAMS"
    | "UC-ENGINE-FLEX-ZOOM";

export type Devices = {
    [K in DeviceKeys]: {
        [K in JoinRecordKeys]: Array<string>;
    };
};

export type Ch5Data = JoinRecords & {
    devices: Devices;
    reportName: string;
    schemaVersion: number;
    source: string;
};
