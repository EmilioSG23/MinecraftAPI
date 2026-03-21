import { createTextOutput } from "@/features/terminal/command-helpers";
import { DATAS_TYPE } from "@/utils/consts";

/**
 * Lists the entity categories supported by the API.
 *
 * @returns A text response containing every available data type.
 */
export function executeList() {
	return createTextOutput(`The data types available are: ${Object.values(DATAS_TYPE).join(", ")}`);
}
