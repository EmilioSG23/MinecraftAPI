import {
	createErrorOutput,
	createTextOutput,
	validateArgs,
} from "@/features/terminal/command-helpers";
import { obtainDatasByURL } from "@/services/useDatas";

/**
 * Lists the available top-level keys for a given entity type.
 *
 * @param args Command arguments where the first value is the requested entity type.
 * @returns A text response listing the keys or an error when the type is invalid.
 */
export async function executeKeys(args: string[]) {
	const err = validateArgs(1, args, '/keys "<type>"');
	if (err) return err;

	const { data, status } = await obtainDatasByURL(`${args[0]}/keys`);

	if (status === 200) return createTextOutput(`${args[0]} has the next keys: ${data.join(", ")}`);
	return createErrorOutput(
		`${args[0]} is not a valid data type. Check the available data types with /list.`,
	);
}
