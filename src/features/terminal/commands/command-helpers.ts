import type {
	TerminalCommandOutput,
	TerminalCommandSummary,
	TerminalTextTone,
} from "@/features/terminal/types";

/**
 * Creates a single text block response for simple command messages.
 *
 * @param text Message content shown in the terminal.
 * @param tone Semantic tone that controls the rendered text color.
 * @param weight Font weight used to emphasize the message.
 * @returns Structured terminal output containing one text block.
 */
export function createTextOutput(
	text: string,
	tone: TerminalTextTone = "default",
	weight: "normal" | "bold" = "normal",
): TerminalCommandOutput {
	return {
		blocks: [{ type: "text", text, tone, weight }],
	};
}

/**
 * Creates a standardized error response for terminal commands.
 *
 * @param text Error message shown to the user.
 * @returns Structured terminal output styled as an error.
 */
export function createErrorOutput(text: string): TerminalCommandOutput {
	return createTextOutput(text, "error");
}

/**
 * Creates a standardized success response for terminal commands.
 *
 * @param text Success message shown to the user.
 * @returns Structured terminal output styled as a success.
 */
export function createSuccessOutput(text: string): TerminalCommandOutput {
	return createTextOutput(text, "success");
}

/**
 * Wraps arbitrary data in a JSON block preceded by a bold title.
 *
 * @param title Label rendered before the serialized JSON payload.
 * @param data Arbitrary value returned by a terminal command.
 * @returns Structured output containing a title and JSON block.
 */
export function createJsonOutput(title: string, data: unknown): TerminalCommandOutput {
	return {
		blocks: [
			{ type: "text", text: title, weight: "bold" },
			{ type: "json", title, data },
		],
	};
}

/**
 * Builds the structured output used by the help command.
 *
 * @param commands Summaries of the commands that should be listed.
 * @returns Structured output containing the terminal command catalog.
 */
export function createCommandListOutput(commands: TerminalCommandSummary[]): TerminalCommandOutput {
	return {
		blocks: [{ type: "command-list", commands }],
	};
}

/**
 * Validates the expected number of arguments for a command.
 *
 * @param expected Exact number of arguments required by the command.
 * @param args Raw arguments parsed from the terminal input.
 * @param usage Usage string returned to the user when validation fails.
 * @returns A syntax error output when the argument count is invalid, otherwise null.
 */
export function validateArgs(expected: number, args: string[], usage: string) {
	if (args.length !== expected) {
		return createErrorOutput(`Syntax Error: ${usage}`);
	}
	return null;
}
