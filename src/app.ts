import "dotenv/config";
import axios from "axios";
import { Ch5Data, CrestronCH5 } from "./@types/index.js";

console.log(`Running in ${process.env.NODE_ENV} mode`);

const endpoint =
    process.env["CH5_ENDPOINT"] ||
    "https://siproducts.blob.core.windows.net/ch5-release/rjviewapp.json";

const response = await axios.get<Ch5Data>(endpoint);
const { data } = response;

const { analogRecords, digitalRecords, serialRecords } = data;

const analog = Object.values(analogRecords).map(({ event, state }) => {
    return { event, state };
});

const digital = Object.values(digitalRecords).map(({ event, state }) => {
    return { event, state };
});

const serial = Object.values(serialRecords).map(({ event, state }) => {
    return { event, state };
});

const joins = {
    analog,
    digital,
    serial,
};

const filter = /.*/i;
console.log(
    joins.analog.filter((value) => {
        return value.state.match(filter) || value.event.match(filter);
    }),
);

console.log(
    joins.digital.filter((value) => {
        return value.state.match(filter) || value.event.match(filter);
    }),
);

console.log(
    joins.serial.filter((value) => {
        return value.state.match(filter) || value.event.match(filter);
    }),
);

console.log(`Analog Records: ${Object.keys(analog).length}`);
console.log(`Digital Records: ${Object.keys(digital).length}`);
console.log(`Serial Records: ${Object.keys(serial).length}`);

const obj: CrestronCH5 = {
    ReservedJoin: {
        Analog: {
            Event: {},
            State: {},
        },
        Digital: {
            Event: {},
            State: {},
        },
        Serial: {
            Event: {},
            State: {},
        },
    },
};

for (const item of Object.values(analog)) {
    if (!item.event) {
        continue;
    }
    const key = item.event.replace(/\./g, "_");
    obj.ReservedJoin.Analog.Event[key] = item.event;
}

for (const item of Object.values(analog)) {
    if (!item.state) {
        continue;
    }
    const key = item.state.replace(/\./g, "_");
    obj.ReservedJoin.Analog.State[key] = item.state;
}

console.log(obj);
