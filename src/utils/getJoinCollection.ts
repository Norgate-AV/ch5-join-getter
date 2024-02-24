import { JoinCollection, JoinRecord } from "../@types/index.js";

export function getJoinCollection(
    record: Record<string, JoinRecord>,
): JoinCollection {
    return Object.values(record).reduce<JoinCollection>(
        (acc: JoinCollection, { event, state }) => {
            const pattern = /\./g;

            if (event) {
                const key = event
                    .replace(pattern, "_")

                    // Replace any special characters with their word equivalent
                    // as these cannot be used as object keys

                    // This will only apply to Digital Event: Csig.Dial_*
                    .replace(/\*$/g, "Star")

                    // This will only apply to Digital Event: Csig.Dial_/#
                    .replace(/\/#$/g, "Hash");

                acc.Event[key] = event;
            }

            if (state) {
                const key = state.replace(pattern, "_");
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
