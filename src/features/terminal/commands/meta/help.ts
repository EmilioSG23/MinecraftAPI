import { createCommandListOutput } from "@/features/terminal/command-helpers";
import { COMMAND_REGISTRY } from "@/features/terminal/command-registry";

export function executeHelp() {
	return createCommandListOutput(
		COMMAND_REGISTRY.map(({ name, params, description }) => ({ name, params, description })),
	);
}
