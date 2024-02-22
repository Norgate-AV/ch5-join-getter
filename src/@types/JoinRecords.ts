import { JoinRecord } from "./JoinRecord.js";
import { JoinRecordKeys } from "./JoinRecordKeys.js";

export type JoinRecords = {
    [K in JoinRecordKeys]: Record<string, JoinRecord>;
};
