/** Terminal command executors used by the in-app command console. */
import { createErrorOutput } from "@/features/terminal/command-helpers";
import { COMMAND_REGISTRY } from "@/features/terminal/command-registry";
import type { TerminalCommandContext, TerminalCommandExecutor } from "@/features/terminal/types";

const COMMANDS: Record<string, TerminalCommandExecutor> = Object.fromEntries(
	COMMAND_REGISTRY.map((command) => [command.name, command.execute]),
);

/**
 * Parses a terminal input string and dispatches it to the matching command implementation.
 *
 * @param inputCommand Raw command line entered by the user.
 * @param context Mutable UI callbacks available to command executors.
 * @returns Structured command result.
 */
export function executeCommand(inputCommand: string, context: TerminalCommandContext) {
	const normalizedInput = inputCommand.trim();
	if (!normalizedInput) return null;

	const [command, ...args] = normalizedInput.split(/\s+/);
	const executor = COMMANDS[command];
	if (executor) {
		return executor(args, context);
	}

	return createErrorOutput(
		"Unknown Command. Enter a new command and try again. Use /help to see all the commands.",
	);
}
