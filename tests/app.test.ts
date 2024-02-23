import { describe, expect, it } from "vitest";
import { getCh5ReservedJoins } from "../dist/index.js";
import { assertJoinCollection } from "./helpers.js";

describe("getCh5ReservedJoins", () => {
    it("should import without error", () => {
        expect(getCh5ReservedJoins).toBeDefined();
    });

    it("should contain an object of the correct schema", async () => {
        const CrestronCH5 = await getCh5ReservedJoins();

        expect(Object.keys(CrestronCH5)).toEqual(["ReservedJoin"]);

        expect(Object.keys(CrestronCH5.ReservedJoin)).toEqual([
            "Analog",
            "Digital",
            "Serial",
        ]);

        expect(Object.keys(CrestronCH5.ReservedJoin.Analog)).toEqual([
            "Event",
            "State",
        ]);

        expect(Object.keys(CrestronCH5.ReservedJoin.Digital)).toEqual([
            "Event",
            "State",
        ]);

        expect(Object.keys(CrestronCH5.ReservedJoin.Serial)).toEqual([
            "Event",
            "State",
        ]);

        assertJoinCollection(CrestronCH5.ReservedJoin.Analog.Event);
        assertJoinCollection(CrestronCH5.ReservedJoin.Analog.State);
        assertJoinCollection(CrestronCH5.ReservedJoin.Digital.Event);
        assertJoinCollection(CrestronCH5.ReservedJoin.Digital.State);
        assertJoinCollection(CrestronCH5.ReservedJoin.Serial.Event);
        assertJoinCollection(CrestronCH5.ReservedJoin.Serial.State);
    });

    it("should always pass", () => {
        expect(1).toEqual(1);
    });
});
