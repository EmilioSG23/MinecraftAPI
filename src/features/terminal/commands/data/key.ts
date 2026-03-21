import {
	createErrorOutput,
	createJsonOutput,
	validateArgs,
} from "@/features/terminal/commands/command-helpers";
import { fetchApiResource } from "@/shared/lib/api-client";
import { PREFIX_MC } from "@/shared/minecraft/constants";

/**
 * Fetches a specific top-level key from an entity payload.
 *
 * @param args Command arguments containing the entity type, entity id and key name.
 * @returns A JSON response with the requested key value or an error when it cannot be resolved.
 */
export async function executeKey(args: string[]) {
	const err = validateArgs(3, args, '/key "<type> <id> <key>"');
	if (err) return err;

	const { data, status } = await fetchApiResource(`${args.join("/")}`);

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
