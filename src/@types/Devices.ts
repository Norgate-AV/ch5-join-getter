import { DeviceKeys } from "./DeviceKeys.js";
import { JoinRecordKeys } from "./JoinRecordKeys.js";

export type Devices = {
    [K in DeviceKeys]: {
        [K in JoinRecordKeys]: Array<string>;
    };
};
