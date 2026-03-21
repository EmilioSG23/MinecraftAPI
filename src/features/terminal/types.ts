export interface TerminalOutputEntry {
	id: string;
	content: TerminalCommandOutput;
}

export interface TerminalCommandContext {
	clearOutput?: () => void;
	setBlur?: (value: number) => void;
	setDisplayMode?: (mode: string) => void;
	setPanorama?: (panorama: number) => void;
}

export type TerminalTextTone = "default" | "error" | "success" | "muted";

export interface TerminalTextBlock {
	type: "text";
	text: string;
	tone?: TerminalTextTone;
	weight?: "normal" | "bold";
}

export interface TerminalJsonBlock {
	type: "json";
	title?: string;
	data: unknown;
}

export interface TerminalCommandSummary {
	name: string;
	params?: string;
	description: string;
}

export interface TerminalCommandListBlock {
	type: "command-list";
	commands: TerminalCommandSummary[];
}

export type TerminalOutputBlock = TerminalTextBlock | TerminalJsonBlock | TerminalCommandListBlock;

export interface TerminalCommandOutput {
	blocks: TerminalOutputBlock[];
}

export type TerminalCommandResult =
	| TerminalCommandOutput
	| null
	| Promise<TerminalCommandOutput | null>;

export type TerminalCommandExecutor = (
	args: string[],
	context: TerminalCommandContext,
) => TerminalCommandResult;

export interface TerminalCommandDefinition {
	name: string;
	params?: string;
	description: string;
	execute: TerminalCommandExecutor;
}
