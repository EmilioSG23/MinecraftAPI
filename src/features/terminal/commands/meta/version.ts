import {
	createErrorOutput,
	createTextOutput,
	validateArgs,
} from "@/features/terminal/commands/command-helpers";
import { API_VERSION, MC_VERSION } from "@/shared/minecraft/constants";

/**
 * Returns either the Minecraft dataset version or the API version.
 *
 * @param args Command arguments containing the requested version target: mc or api.
 * @returns A text response with the version information or a syntax error for invalid input.
 */
export function executeVersion(args: string[]) {
	const err = validateArgs(1, args, '/version "mc|api"');
	if (err) return err;
	const type = args[0].toLowerCase();
	if (type === "mc") {
		return createTextOutput(`Minecraft API has all game datas until version: ${MC_VERSION}`);
	}
	if (type === "api") return createTextOutput(`Minecraft API version: ${API_VERSION}`);
	return createErrorOutput("Syntax Error: You have to use only <mc> or <api> as an argument.");
}
