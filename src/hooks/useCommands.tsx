/** Local terminal state hook used by the in-app command console. */
import { useState } from "react";

/** Rendered terminal entry composed of a stable id and a React node payload. */
export interface DisplayCommandEntry {
	id: string;
	content: React.ReactNode;
}

/**
 * Stores terminal command input, history and rendered output entries.
 */
export function useCommands() {
	const [inputCommand, setInputCommand] = useState<string>("");
	const [historyCommands, setHistoryCommands] = useState<string[]>([]);
	const [displayCommands, setDisplayCommands] = useState<DisplayCommandEntry[]>([]);
	const [historyIndex, setHistoryIndex] = useState<number>(-1);

	/**
	 * Pushes a command into the terminal history.
	 *
	 * @param command Raw command entered by the user.
	 */
	const addHistoryCommand = (command: string) => {
		setHistoryCommands((prevHistory) => [...prevHistory, command]);
		setHistoryIndex((prev) => prev + 1);
	};

	/**
	 * Appends a rendered command result to the terminal output list.
	 *
	 * @param result React node returned by a command executor.
	 */
	const addResultCommand = (result: React.ReactNode) => {
		setDisplayCommands((prevDisplay) => [
			...prevDisplay,
			{ id: crypto.randomUUID(), content: result },
		]);
	};

	/** Selects the previous command in the history list. */
	const previousHistoryCommand = () => {
		const index = historyIndex > 0 ? historyIndex - 1 : historyIndex;
		setHistoryIndex(index);
		setInputCommand(historyCommands[index] ?? "");
	};
	/** Selects the next command in the history list. */
	const nextHistoryCommand = () => {
		const index = historyIndex < historyCommands.length ? historyIndex + 1 : historyIndex;
		setHistoryIndex(index);
		setInputCommand(historyCommands[index] ?? "");
	};

	return {
		inputCommand,
		setInputCommand,
		historyCommands,
		displayCommands,
		addHistoryCommand,
		addResultCommand,
		setHistoryIndex,
		previousHistoryCommand,
		nextHistoryCommand,
		setDisplayCommands,
	};
}
