import { JoinCollection, JoinRecord } from "../@types/index.js";

const DOT_PATTERN = /\./g;

export function getJoinCollection(
    record: Record<string, JoinRecord>,
): JoinCollection {
    return Object.values(record).reduce<JoinCollection>(
        (acc: JoinCollection, { event, state }) => {
            if (event) {
                const key = event
                    .replace(DOT_PATTERN, "_")

                    // Replace any special characters with their word equivalent
                    // as these cannot be used as object keys

                    // This will only apply to Digital Event: Csig.Dial_*
                    .replace(/\*$/, "Star")

                    // This will only apply to Digital Event: Csig.Dial_/#
                    .replace(/\/#$/, "Hash");

                acc.Event[key] = event;
            }

            if (state) {
                const key = state.replace(DOT_PATTERN, "_");
                acc.State[key] = state;
            }

            return acc;
        },
        {
            Event: {},
            State: {},
        },
    );
}
