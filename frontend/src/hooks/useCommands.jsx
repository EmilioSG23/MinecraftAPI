import { useState } from "react";

export function useCommands() {
	const [inputCommand, setInputCommand] = useState("");
	const [displayAuto, setDisplayAuto] = useState(false);
	const [historyCommands, setHistoryCommands] = useState([]);
	const [displayCommands, setDisplayCommands] = useState([]);
	const [historyIndex, setHistoryIndex] = useState(-1);

	const addHistoryCommand = (command) => {
		setHistoryCommands((prevHistory) => [...prevHistory, command]);
		setHistoryIndex((prev) => prev + 1);
	};

	const addResultCommand = (result) => {
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
