import {
	createErrorOutput,
	createTextOutput,
	validateArgs,
} from "@/features/terminal/command-helpers";
import { obtainDatasByURL } from "@/services/useDatas";

export async function executeCount(args: string[]) {
	const err = validateArgs(1, args, '/count "<type>"');
	if (err) return err;

	const { data, status } = await obtainDatasByURL(`${args[0]}/count`);

	if (status === 200) {
		return createTextOutput(`There are ${data} elements available for ${args[0]}`);
	}

	return createErrorOutput(
		`${args[0]} is not a valid data type. Check the available data types with /list.`,
	);
}
