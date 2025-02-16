import { useChangeSection } from "../hooks/useSection.jsx";
import * as commands from "../services/commands.jsx";

export function Terminal({ setPanorama, setBlur, setDisplayMode }) {
    const {
        inputCommand,
        setInputCommand,
        displayAuto,
        historyCommands,
        displayCommands,
        executeInputCommand,
        previousHistoryCommand,
        nextHistoryCommand
    } = commands.useCommands({ setPanorama, setBlur, setDisplayMode });

    useChangeSection("terminal");

    return (
        <section className="flex flex-col bg-black/75 mx-auto max-w-6xl justify-center items-center mt-10 h-[82vh] xl:h-[85vh] border-4 border-gray-400 text-white">
            <h2 className="flex-none text-white w-full border-b-4 border-gray-400 p-2 text-[24px] bg-gray-700 font-bold text-center">Minecraft API - Terminal</h2>
            <div className="flex-1 p-1 text-left w-full overflow-y-scroll">
                {displayCommands.map((display, index) => (
                    <div className="mb-1" key={index}>{display}</div>
                ))}
            </div>
            <input
                className="flex-none bg-gray-900 bottom-0 text-white w-full border-t-4 border-gray-400 text-[20px] p-2 focus:outline-none"
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