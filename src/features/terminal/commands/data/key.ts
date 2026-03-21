import {
	createErrorOutput,
	createJsonOutput,
	validateArgs,
} from "@/features/terminal/command-helpers";
import { obtainDatasByURL } from "@/services/useDatas";
import { PREFIX_MC } from "@/utils/consts";

export async function executeKey(args: string[]) {
	const err = validateArgs(3, args, '/key "<type> <id> <key>"');
	if (err) return err;

	const { data, status } = await obtainDatasByURL(`${args.join("/")}`);

	if (status === 200) {
		const reqKey = args[2];
		if (Object.prototype.hasOwnProperty.call(data, reqKey)) {
			return createJsonOutput(`${PREFIX_MC + data.id} - ${reqKey}:`, data[reqKey]);
		}
		return createErrorOutput(`This data doesn't have the key "${reqKey}".`);
	}

	if (status === 404) return createErrorOutput(`Data not found. ${data.message}.`);
	if (status === 400) return createErrorOutput(data.message);
	return createErrorOutput(`Unexpected error. Status: ${String(status)}`);
}
