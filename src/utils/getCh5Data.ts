import "dotenv/config";
import axios from "axios";
import { Ch5Data } from "../@types/index.js";

export async function getCh5Data(): Promise<Ch5Data> {
    const endpoint =
        process.env["CH5_ENDPOINT"] ||
        "https://siproducts.blob.core.windows.net/ch5-release/rjviewapp.json";

    const response = await axios.get<Ch5Data>(endpoint);

    return response.data;
}
