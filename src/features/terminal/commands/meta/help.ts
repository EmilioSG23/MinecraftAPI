import { createCommandListOutput } from "@/features/terminal/command-helpers";
import { COMMAND_REGISTRY } from "@/features/terminal/command-registry";

/**
 * Returns the list of commands available in the terminal.
 *
 * @returns Structured help output derived from the command registry.
 */
export function executeHelp() {
	return createCommandListOutput(
		COMMAND_REGISTRY.map(({ name, params, description }) => ({ name, params, description })),
	);
}
