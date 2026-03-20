import { useState } from "react";

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

	const addHistoryCommand = (command: string) => {
		setHistoryCommands((prevHistory) => [...prevHistory, command]);
		setHistoryIndex((prev) => prev + 1);
	};

	const addResultCommand = (result: React.ReactNode) => {
		setDisplayCommands((prevDisplay) => [
			...prevDisplay,
			{ id: crypto.randomUUID(), content: result },
		]);
	};

	const previousHistoryCommand = () => {
		const index = historyIndex > 0 ? historyIndex - 1 : historyIndex;
		setHistoryIndex(index);
		setInputCommand(historyCommands[index] ?? "");
	};
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
