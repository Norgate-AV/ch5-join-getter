import { describe, expect, it } from "vitest";
import { getJoinCollection } from "../src/utils/getJoinCollection.js";
import type { JoinRecord } from "../src/@types/index.js";

function makeRecord(overrides: Partial<JoinRecord> = {}): JoinRecord {
    return {
        devices: [],
        docurl: "",
        group: "",
        joinid: "",
        ...overrides,
    };
}

describe("getJoinCollection", () => {
    it("should return an object with Event and State keys", () => {
        const result = getJoinCollection({});
        expect(Object.keys(result)).toEqual(["Event", "State"]);
    });

    it("should return empty Event and State for an empty record", () => {
        const result = getJoinCollection({});
        expect(result.Event).toEqual({});
        expect(result.State).toEqual({});
    });

    it("should transform dots to underscores in event keys", () => {
        const record = { a: makeRecord({ event: "Csig.Foo_Bar" }) };
        const result = getJoinCollection(record);
        expect(result.Event).toHaveProperty("Csig_Foo_Bar", "Csig.Foo_Bar");
    });

    it("should transform dots to underscores in state keys", () => {
        const record = { a: makeRecord({ state: "Csig.Foo_State" }) };
        const result = getJoinCollection(record);
        expect(result.State).toHaveProperty("Csig_Foo_State", "Csig.Foo_State");
    });

    it("should transform trailing * to 'Star' in event keys", () => {
        const record = { a: makeRecord({ event: "Csig.Dial_*" }) };
        const result = getJoinCollection(record);
        expect(result.Event).toHaveProperty("Csig_Dial_Star", "Csig.Dial_*");
    });

    it("should transform trailing /# to 'Hash' in event keys", () => {
        const record = { a: makeRecord({ event: "Csig.Dial_/#" }) };
        const result = getJoinCollection(record);
        expect(result.Event).toHaveProperty("Csig_Dial_Hash", "Csig.Dial_/#");
    });

    it("should not transform * that is not at the end of the string", () => {
        const record = { a: makeRecord({ event: "Csig.Dial_*_Extra" }) };
        const result = getJoinCollection(record);
        expect(result.Event).toHaveProperty(
            "Csig_Dial_*_Extra",
            "Csig.Dial_*_Extra",
        );
    });

    it("should not transform /# that is not at the end of the string", () => {
        const record = { a: makeRecord({ event: "Csig.Dial_/#_Extra" }) };
        const result = getJoinCollection(record);
        expect(result.Event).toHaveProperty(
            "Csig_Dial_/#_Extra",
            "Csig.Dial_/#_Extra",
        );
    });

    it("should handle records with only event (no state)", () => {
        const record = { a: makeRecord({ event: "Csig.OnlyEvent" }) };
        const result = getJoinCollection(record);
        expect(result.Event).toHaveProperty("Csig_OnlyEvent", "Csig.OnlyEvent");
        expect(result.State).toEqual({});
    });

    it("should handle records with only state (no event)", () => {
        const record = { a: makeRecord({ state: "Csig.OnlyState" }) };
        const result = getJoinCollection(record);
        expect(result.State).toHaveProperty("Csig_OnlyState", "Csig.OnlyState");
        expect(result.Event).toEqual({});
    });

    it("should handle records where both event and state are undefined", () => {
        const record = { a: makeRecord() };
        const result = getJoinCollection(record);
        expect(result.Event).toEqual({});
        expect(result.State).toEqual({});
    });

    it("should preserve original values in Event and State objects", () => {
        const record = {
            a: makeRecord({ event: "Csig.Foo", state: "Csig.Bar" }),
        };
        const result = getJoinCollection(record);
        expect(result.Event["Csig_Foo"]).toBe("Csig.Foo");
        expect(result.State["Csig_Bar"]).toBe("Csig.Bar");
    });

    it("should handle multiple records", () => {
        const record = {
            a: makeRecord({ event: "Csig.Alpha", state: "Csig.AlphaState" }),
            b: makeRecord({ event: "Csig.Beta", state: "Csig.BetaState" }),
        };
        const result = getJoinCollection(record);
        expect(Object.keys(result.Event)).toHaveLength(2);
        expect(Object.keys(result.State)).toHaveLength(2);
    });

    it("should handle events with multiple dots", () => {
        const record = { a: makeRecord({ event: "Csig.A.B.C" }) };
        const result = getJoinCollection(record);
        expect(result.Event).toHaveProperty("Csig_A_B_C", "Csig.A.B.C");
    });

    it("should not mutate the input record", () => {
        const record = {
            a: makeRecord({ event: "Csig.Foo", state: "Csig.Bar" }),
        };
        const original = JSON.stringify(record);
        getJoinCollection(record);
        expect(JSON.stringify(record)).toBe(original);
    });
});
