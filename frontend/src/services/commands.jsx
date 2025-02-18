import { useState } from "react";
import { API_VERSION, DATAS_TYPE, MC_VERSION, PREFIX_MC } from "../consts.js";
import { DISPLAY_MODE } from "../hooks/useConfigBackground.jsx";

export const COMMANDS = {
	"/list": () => executeList(),
	"/get": (args) => executeGet(args),
	"/key": (args) => executeKey(args),
	"/filter": (args) => executeFilter(args),
	"/count": (args) => executeCount(args),
	"/keys": (args) => executeKeys(args),
	"/help": () => executeHelp(),
	"/clear": (args, { setDisplayCommands }) => executeClear(setDisplayCommands),
	"/status": () => executeStatus(),
	"/version": (args) => executeVersion(args),
	"/setblur": (args, { setBlur }) => executeBlur(args, setBlur),
	"/setdisplay": (args, { setDisplayMode }) => executeDisplay(args, setDisplayMode),
	"/setpanorama": (args, { setPanorama }) => executePanorama(args, setPanorama),
};

async function obtainDatasByURL(url) {
	try {
		const response = await fetch(`api/${url}`);
		const data = await response.json();
		return { data, status: response.status };
	} catch (e) {
		return { data: "Unexpected Error 400 occurred. Check again your input command or use /help.", status: 400 };
	}
}

export function useCommands({ setPanorama, setBlur, setDisplayMode }) {
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

	const executeInputCommand = (command) => {
		addHistoryCommand(command);
		setHistoryIndex(historyCommands.length + 1);
		const result = executeCommand(command, { setDisplayCommands, setBlur, setDisplayMode, setPanorama });
		setInputCommand("");
		if (result) addResultCommand(result);
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
		executeInputCommand,
		previousHistoryCommand,
		nextHistoryCommand,
		setDisplayCommands,
	};
}

export function executeCommand(inputCommand, context) {
	const [command, ...args] = inputCommand.split(" ");
	if (COMMANDS[command]) {
		return COMMANDS[command](args, context);
	}
	return (
		<p className="text-red-500">
			{"Unknown Command. Enter a new command and try again. Use /help to see all the commands."}
		</p>
	);
}

// - /list Obtiene todos los tipos de datos: advancements, biomes, ...
function executeList() {
	return (
		<>
			<p>The data types available are: {Object.values(DATAS_TYPE).join(", ")}</p>
		</>
	);
}

// - /find o /get <type> <id> Obtiene la información de un dato en formato JSON
async function executeGet(args) {
	if (args.length !== 2) {
		return (
			<p className="text-red-500">
				Syntax Error: /get needs only two arguments. The correct syntax is: /get {"<type> <id>"}
			</p>
		);
	}
	const { data, status } = await obtainDatasByURL(`${args.join("/")}`);

	return (
		(status === 200 && (
			<>
				<h2 className="font-bold">{PREFIX_MC + data.id} has the next information:</h2>
				{Object.entries(data).map(([key, value]) => {
					return (
						<p key={key + "-" + value}>
							<span className="underline">{key}:</span> {value.toString()}
						</p>
					);
				})}
			</>
		)) ||
		(status === 404 && <p className="text-red-500">Data not found. {data.message}.</p>) ||
		(status === 400 && <p className="text-red-500">{data}</p>)
	);
}

// - /key <type> <id> <key> Obtiene la información de esa key
async function executeKey(args) {
	if (args.length !== 3) {
		return (
			<p className="text-red-500">
				Syntax Error: /key needs only three arguments. The correct syntax is: /key {"<type> <id> <key>"}
			</p>
		);
	}
	const { data, status } = await obtainDatasByURL(`${args.join("/")}`);

	return (
		(status === 200 && (
			<>
				<h2 className="font-bold">{PREFIX_MC + data.id} has the next information:</h2>
				{Object.entries(data).map(([key, value]) => {
					return (
						<p key={key + "-" + value}>
							<span className="underline">{key}:</span> {value.toString()}
						</p>
					);
				})}
			</>
		)) ||
		(status === 404 && <p className="text-red-500">This data doesn&apos;t have this key. {data.message}.</p>) ||
		(status === 400 && <p className="text-red-500">{data}</p>)
	);
}

// - /filter <type> <filter> Devuelve ids de datos de cierto tipo que cumplan con el filtro
function executeFilter(args) {
	// Execute command
}

// - /count <type> Cantidad de elementos de tipo de dato
async function executeCount(args) {
	if (args.length !== 1) {
		return (
			<p className="text-red-500">
				Syntax Error: /count needs only one argument. The correct syntax is: /count {"<type>"}
			</p>
		);
	}

	const { data, status } = await obtainDatasByURL(`${args[0]}/count`);

	return (
		(status === 200 && <p>{`There are ${data} elements available for ${args[0]}`}</p>) ||
		((status === 404 || status === 400) && (
			<p className="text-red-500">{`${args[0]} is not a valid data type. Check the available data types with /list.`}</p>
		))
	);
}

// - /keys <type> Claves de tipo de dato
async function executeKeys(args) {
	if (args.length !== 1) {
		return (
			<p className="text-red-500">
				Syntax Error: /keys needs only one argument. The correct syntax is: /keys {"<type>"}
			</p>
		);
	}
	const { data, status } = await obtainDatasByURL(`${args[0]}/keys`);

	return (
		(status === 200 && (
			<>
				<p>{args[0] + " has the next keys: " + data.join(", ")}</p>
			</>
		)) ||
		((status === 404 || status === 400) && (
			<p className="text-red-500">{`${args[0]} is not a valid data type. Check the available data types with /list.`}</p>
		))
	);
}

// - /help Muestra los comandos
function executeHelp() {
	return (
		<>
			<p>{"/list Obtain all the data types: advancements, biomes, ..."}</p>
			<p>{"/find o /get <type> <id> Obtain data information in JSON format."}</p>
			<p>{"/key <type> <id> <key> Obtain data information by a key."}</p>
			<p>{"/filter <type> <filter> Returns IDs of data of a certain type that match the filter"}</p>
			<p>{"/count <type> Returns the number of elements of a given data type"}</p>
			<p>{"/keys <type> Returns the available keys for a given data type"}</p>
			<br />
			<p>{"/help Displays the list of available commands"}</p>
			<p>{"/clear Clears the terminal screen"}</p>
			<p>{"/status Displays the current API status"}</p>
			<p>{"/version <mc|api> Shows the API version or the latest available Minecraft data version"}</p>
			<br />
			<p>{"/setblur <value> Adjusts the blur intensity of the terminal background"}</p>
			<p>{"/setdisplay <mode> Changes the display mode of the terminal interface"}</p>
			<p>{"/setpanorama <panorama> Sets a custom panorama background for the terminal"}</p>
		</>
	);
}

// - /clear Limpia terminal
function executeClear(setDisplayCommands) {
	setDisplayCommands([]);
	return null;
}

// - /status Muestra estado API
async function executeStatus() {
	// Execute command
	const { status } = await obtainDatasByURL(``);
	return status === 200 ? (
		<p>You are connected with the Minecraft API! Status: 200</p>
	) : (
		<p className="text-red-500">Error: You are not connected with the Minecraft API! Status: 404</p>
	);
}

// - /version <mc|api> Muestra versión de api o versión de hasta donde hay datos de MC
function executeVersion(args) {
	if (args.length !== 1) {
		return (
			<p className="text-red-500">
				{"Syntax Error: /version needs only one argument between <mc|api>. The correct syntax is: /version <type>"}
			</p>
		);
	}
	if (args[0].toLowerCase() === "mc") return <p>{`Minecraft API has all game datas until version: ${MC_VERSION}`}</p>;
	if (args[0].toLowerCase() === "api") return <p>{`Minecraft API version: ${API_VERSION}`}</p>;
	return <p className="text-red-500">{"Syntax Error: You have to use only <mc> or <api> as an argument."}</p>;
}

// - /setblur <value>
function executeBlur(args, setBlur) {
	if (args.length !== 1) {
		return (
			<p className="text-red-500">
				{"Syntax Error: /setblur needs only one value between 0 and 10. The correct syntax is: /setblur <value>"}
			</p>
		);
	}
	const value = parseInt(args[0]);
	if (value >= 0 && value <= 10) {
		setBlur(value);
		return <p>{`The blur has changed to a new value: ${value}`}</p>;
	}
	return <p className="text-red-500">{"Args Error: The input value must be a number betwwen 0 and 10."}</p>;
}

// - /setdisplay <mode>
function executeDisplay(args, setDisplayMode) {
	if (args.length !== 1) {
		return (
			<p className="text-red-500">
				{
					"Syntax Error: /setdisplay needs only one argument between <random|select>. The correct syntax is: /setdisplay <mode>"
				}
			</p>
		);
	}
	const mode = args[0].toLowerCase();
	if (mode === DISPLAY_MODE.SELECT || mode === DISPLAY_MODE.RANDOM) {
		setDisplayMode(mode);
		return <p>{`The display mode has changed to ${mode} mode`}</p>;
	}
	return (
		<p className="text-red-500">
			{"Input Error: The input mode is not valid, make sure you choose between random or select."}
		</p>
	);
}

// - /setpanorama <panorama>
function executePanorama(args, setPanorama) {
	if (args.length !== 1) {
		return (
			<p className="text-red-500">
				{
					"Syntax Error: /setpanorama needs only one argument between 1 and 10. The correct syntax is: /setpanorama <panorama>"
				}
			</p>
		);
	}
	const panorama = parseInt(args[0]);
	if (panorama >= 0 && panorama <= 10) {
		setPanorama(panorama);
		return <p>{`The panorama has changed to a new panorama: ${panorama}`}</p>;
	}
	return <p className="text-red-500">{"Input Error: The input value must be a number betwwen 0 and 10."}</p>;
}
