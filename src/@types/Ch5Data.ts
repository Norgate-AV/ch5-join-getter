import { Devices } from "./Devices.js";
import { JoinRecords } from "./JoinRecords.js";

export type Ch5Data = JoinRecords & {
    devices: Devices;
    reportName: string;
    schemaVersion: number;
    source: string;
};
