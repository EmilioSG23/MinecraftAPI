import { useEffect, useRef } from "react";
import { useChangeSection } from "../hooks/useSection";
import { useCommands } from "../components/useCommands";
import { executeCommand } from "../components/commands";

export function Terminal({ setPanorama, setBlur, setDisplayMode }) {
	const {
		inputCommand,
		setInputCommand,
		historyCommands,
		displayCommands,
		setDisplayCommands,
		addHistoryCommand,
		addResultCommand,
		setHistoryIndex,
		previousHistoryCommand,
		nextHistoryCommand,
	} = useCommands();

	const scrollRef = useRef(null);
	useEffect(() => {
		if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	}, [displayCommands]);

	const executeInputCommand = (command) => {
		addHistoryCommand(command);
		setHistoryIndex(historyCommands.length + 1);
		const result = executeCommand(command, {
			setDisplayCommands,
			setBlur,
			setDisplayMode,
			setPanorama,
		});
		setInputCommand("");
		if (result) addResultCommand(result);
	};

	useChangeSection("terminal");

	return (
		<section className="flex flex-col bg-black/75 mx-auto max-w-6xl justify-center items-center mt-10 h-[82vh] xl:h-[85vh] border-4 border-gray-400 text-white">
			<h2 className="flex-none text-white w-full border-b-4 border-gray-400 p-2 text-[16px] sm:text-[20px] lg:text-[24px] bg-gray-700 font-bold text-center">
				Minecraft API - Terminal
			</h2>
			<div ref={scrollRef} className="flex-1 w-full p-1 overflow-y-scroll text-left">
				{displayCommands.map((display, index) => (
					<article className="mb-1 text-[12px] sm:text-[16px]" key={index}>
						{display}
					</article>
				))}
			</div>
			<input
				id="terminalInput"
				className="flex-none bg-gray-900 bottom-0 text-white w-full border-t-4 border-gray-400 text-[16px] sm:text-[20px] p-2 focus:outline-none"
				type="text"
				placeholder="Write a command..."
				value={inputCommand}
				onChange={(e) => setInputCommand(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						executeInputCommand(e.target.value);
					}
					if (e.key === "ArrowUp") {
						previousHistoryCommand();
						setTimeout(() => {
							e.target.setSelectionRange(e.target.value.length, e.target.value.length);
						}, 0);
					}
					if (e.key === "ArrowDown") {
						nextHistoryCommand();
						setTimeout(() => {
							e.target.setSelectionRange(e.target.value.length, e.target.value.length);
						}, 0);
					}
				}}
			/>
		</section>
	);
}
