import { createTextOutput } from "@/features/terminal/command-helpers";
import { DATAS_TYPE } from "@/utils/consts";

export function executeList() {
	return createTextOutput(`The data types available are: ${Object.values(DATAS_TYPE).join(", ")}`);
}
