import { CrestronCH5 } from "./@types/index.js";
import { getCh5Data, getJoinCollection } from "./utils/index.js";

export async function getCh5ReservedJoins(): Promise<CrestronCH5> {
    const { analogRecords, digitalRecords, serialRecords } = await getCh5Data();

    return {
        ReservedJoin: {
            Analog: getJoinCollection(analogRecords),
            Digital: getJoinCollection(digitalRecords),
            Serial: getJoinCollection(serialRecords),
        },
    };
}

export default getCh5ReservedJoins;
