import {
	createErrorOutput,
	createJsonOutput,
	validateArgs,
} from "@/features/terminal/command-helpers";
import { obtainDatasByURL } from "@/services/useDatas";
import { PREFIX_MC } from "@/utils/consts";

export async function executeGet(args: string[]) {
	const err = validateArgs(2, args, '/get "<type> <id>"');
	if (err) return err;

	const { data, status } = await obtainDatasByURL(`${args.join("/")}`);

	if (status === 200) {
		return createJsonOutput(`${PREFIX_MC + data.id} has the next information:`, data);
	}

	if (status === 404) return createErrorOutput(`Data not found. ${data.message}.`);
	if (status === 400) return createErrorOutput(data.message);
	return createErrorOutput(`Unexpected error. Status: ${String(status)}`);
}
