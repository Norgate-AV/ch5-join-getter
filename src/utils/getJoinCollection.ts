import { JoinCollection, JoinRecord } from "../@types/index.js";

export function getJoinCollection(
    record: Record<string, JoinRecord>,
): JoinCollection {
    return Object.values(record).reduce<JoinCollection>(
        (acc: JoinCollection, { event, state }) => {
            const pattern = /\./g;

            if (event) {
                const key = event.replace(pattern, "_");
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
