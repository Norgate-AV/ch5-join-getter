import { describe, expect, it, vi, beforeEach } from "vitest";
import { getCh5ReservedJoins } from "../src/app.js";
import { assertJoinCollection } from "./helpers.js";
import type { Ch5Data } from "../src/@types/index.js";

vi.mock("../src/utils/getCh5Data.js", () => ({
    getCh5Data: vi.fn(),
}));

import { getCh5Data } from "../src/utils/getCh5Data.js";

const mockCh5Data: Ch5Data = {
    reportName: "test",
    schemaVersion: 1,
    source: "test",
    devices: {} as Ch5Data["devices"],
    analogRecords: {
        "0": {
            devices: [],
            docurl: "",
            event: "Csig.Ramp_Command",
            group: "Analog",
            joinid: "0",
            state: "Csig.Ramp_State",
        },
        "1": {
            devices: [],
            docurl: "",
            event: "Csig.Touch_Sensing_Sensitivity_Parameter",
            group: "Analog",
            joinid: "1",
            state: "Csig.Touch_Sensing_Sensitivity_Feedback",
        },
    },
    digitalRecords: {
        "0": {
            devices: [],
            docurl: "",
            event: "Csig.Backlight_Control",
            group: "Digital",
            joinid: "0",
            state: "Csig.Backlight_State",
        },
        "1": {
            devices: [],
            docurl: "",
            event: "Csig.Dial_*",
            group: "Digital",
            joinid: "1",
            state: "",
        },
    },
    serialRecords: {
        "0": {
            devices: [],
            docurl: "",
            event: "Csig.Set_Local_Date_Time",
            group: "Serial",
            joinid: "0",
            state: "Csig.Date_Time_Feedback",
        },
    },
};

describe("getCh5ReservedJoins", () => {
    beforeEach(() => {
        vi.mocked(getCh5Data).mockResolvedValue(mockCh5Data);
    });

    it("should import without error", () => {
        expect(getCh5ReservedJoins).toBeDefined();
    });

    it("should call getCh5Data to fetch remote data", async () => {
        await getCh5ReservedJoins();
        expect(getCh5Data).toHaveBeenCalledOnce();
    });

    it("should return an object with a ReservedJoin key", async () => {
        const result = await getCh5ReservedJoins();
        expect(Object.keys(result)).toEqual(["ReservedJoin"]);
    });

    it("should return Analog, Digital, and Serial sections", async () => {
        const result = await getCh5ReservedJoins();
        expect(Object.keys(result.ReservedJoin)).toEqual([
            "Analog",
            "Digital",
            "Serial",
        ]);
    });

    it("should return Event and State for each signal type", async () => {
        const result = await getCh5ReservedJoins();

        for (const section of ["Analog", "Digital", "Serial"] as const) {
            expect(Object.keys(result.ReservedJoin[section])).toEqual([
                "Event",
                "State",
            ]);
        }
    });

    it("should correctly transform all join collection keys", async () => {
        const result = await getCh5ReservedJoins();

        assertJoinCollection(result.ReservedJoin.Analog.Event);
        assertJoinCollection(result.ReservedJoin.Analog.State);
        assertJoinCollection(result.ReservedJoin.Digital.Event);
        assertJoinCollection(result.ReservedJoin.Digital.State);
        assertJoinCollection(result.ReservedJoin.Serial.Event);
        assertJoinCollection(result.ReservedJoin.Serial.State);
    });

    it("should propagate errors thrown by getCh5Data", async () => {
        vi.mocked(getCh5Data).mockRejectedValue(
            new Error("Failed to fetch CH5 data"),
        );
        await expect(getCh5ReservedJoins()).rejects.toThrow(
            "Failed to fetch CH5 data",
        );
    });
});
