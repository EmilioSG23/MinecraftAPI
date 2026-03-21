/** Local terminal state hook used by the in-app command console. */
import type { TerminalCommandOutput, TerminalOutputEntry } from "@/features/terminal/types";
import { useState } from "react";

/**
 * Stores terminal command input, history and rendered output entries.
 */
export function useTerminalSession() {
	const [inputCommand, setInputCommand] = useState<string>("");
	const [historyCommands, setHistoryCommands] = useState<string[]>([]);
	const [displayCommands, setDisplayCommands] = useState<TerminalOutputEntry[]>([]);
	const [historyIndex, setHistoryIndex] = useState<number | null>(null);

	/**
	 * Pushes a command into the terminal history.
	 *
	 * @param command Raw command entered by the user.
	 */
	const addHistoryCommand = (command: string) => {
		setHistoryCommands((prevHistory) => [...prevHistory, command]);
		setHistoryIndex(null);
	};

	/**
	 * Appends a command result to the terminal output list.
	 *
	 * @param result Structured output returned by a command executor.
	 */
	const addResultCommand = (result: TerminalCommandOutput) => {
		setDisplayCommands((prevDisplay) => [
			...prevDisplay,
			{ id: crypto.randomUUID(), content: result },
		]);
	};

	/** Clears the terminal output while keeping the command history. */
	const clearOutput = () => {
		setDisplayCommands([]);
	};

	/** Selects the previous command in the history list. */
	const previousHistoryCommand = () => {
		if (historyCommands.length === 0) return;
		const nextIndex =
			historyIndex === null ? historyCommands.length - 1 : Math.max(historyIndex - 1, 0);
		setHistoryIndex(nextIndex);
		setInputCommand(historyCommands[nextIndex] ?? "");
	};

	/** Selects the next command in the history list. */
	const nextHistoryCommand = () => {
		if (historyIndex === null) return;
		const nextIndex = historyIndex < historyCommands.length - 1 ? historyIndex + 1 : null;
		setHistoryIndex(nextIndex);
		setInputCommand(nextIndex === null ? "" : (historyCommands[nextIndex] ?? ""));
	};

	return {
		inputCommand,
		setInputCommand,
		historyCommands,
		displayCommands,
		addHistoryCommand,
		addResultCommand,
		clearOutput,
		previousHistoryCommand,
		nextHistoryCommand,
	};
}
