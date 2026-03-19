import { useState } from "react";

export function useCommands() {
	const [inputCommand, setInputCommand] = useState<string>("");
	const [displayAuto] = useState<boolean>(false);
	const [historyCommands, setHistoryCommands] = useState<string[]>([]);
	const [displayCommands, setDisplayCommands] = useState<React.ReactNode[]>([]);
	const [historyIndex, setHistoryIndex] = useState<number>(-1);

	const addHistoryCommand = (command: string) => {
		setHistoryCommands((prevHistory) => [...prevHistory, command]);
		setHistoryIndex((prev) => prev + 1);
	};

	const addResultCommand = (result: React.ReactNode) => {
		setDisplayCommands((prevDisplay) => [...prevDisplay, result]);
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
		displayAuto,
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
