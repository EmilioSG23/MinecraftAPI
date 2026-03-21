import type {
	TerminalCommandOutput,
	TerminalCommandSummary,
	TerminalTextTone,
} from "@/features/terminal/types";

export function createTextOutput(
	text: string,
	tone: TerminalTextTone = "default",
	weight: "normal" | "bold" = "normal",
): TerminalCommandOutput {
	return {
		blocks: [{ type: "text", text, tone, weight }],
	};
}

export function createErrorOutput(text: string): TerminalCommandOutput {
	return createTextOutput(text, "error");
}

export function createSuccessOutput(text: string): TerminalCommandOutput {
	return createTextOutput(text, "success");
}

export function createJsonOutput(title: string, data: unknown): TerminalCommandOutput {
	return {
		blocks: [
			{ type: "text", text: title, weight: "bold" },
			{ type: "json", title, data },
		],
	};
}

export function createCommandListOutput(commands: TerminalCommandSummary[]): TerminalCommandOutput {
	return {
		blocks: [{ type: "command-list", commands }],
	};
}

export function validateArgs(expected: number, args: string[], usage: string) {
	if (args.length !== expected) {
		return createErrorOutput(`Syntax Error: ${usage}`);
	}
	return null;
}
