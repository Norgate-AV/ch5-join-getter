import { expect } from "vitest";

export function assertJoinCollection(object: { [key: string]: string }): void {
    const pattern = /^Csig_/g;
    const replace = "Csig.";

    for (const [key, value] of Object.entries(object)) {
        expect(key).toEqual(expect.any(String));
        expect(value).toEqual(key.replace(pattern, replace));
    }
}
