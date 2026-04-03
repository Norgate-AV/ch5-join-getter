import { Ch5Data } from "../@types/index.js";

const DEFAULT_ENDPOINT =
    "https://siproducts.blob.core.windows.net/ch5-release/rjviewapp.json";

export async function getCh5Data(): Promise<Ch5Data> {
    const endpoint = process.env["CH5_ENDPOINT"] || DEFAULT_ENDPOINT;

    let response: Response;

    try {
        response = await fetch(endpoint);
    } catch (error) {
        throw new Error(
            `Failed to fetch CH5 data from ${endpoint}: ${
                error instanceof Error ? error.message : String(error)
            }`,
            { cause: error },
        );
    }

    if (!response.ok) {
        throw new Error(
            `Failed to fetch CH5 data from ${endpoint}: HTTP ${response.status} ${response.statusText}`,
        );
    }

    return response.json() as Promise<Ch5Data>;
}
