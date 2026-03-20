/** Terminal command executors used by the in-app command console. */
import type { DisplayCommandEntry } from "@/hooks/useCommands";
import { DISPLAY_MODE } from "@/hooks/useConfigBackground";
import { obtainDatasByURL } from "@/services/useDatas";
import { API_VERSION, DATAS_TYPE, MC_VERSION, PREFIX_MC } from "@/utils/consts";

interface CommandContext {
	setDisplayCommands?: React.Dispatch<React.SetStateAction<DisplayCommandEntry[]>>;
	setBlur?: (value: number) => void;
	setDisplayMode?: (mode: string) => void;
	setPanorama?: (panorama: number) => void;
}

type CommandFunction = (
	args: string[],
	context: CommandContext,
) => React.ReactNode | Promise<React.ReactNode>;

/** Lookup table from command names to their execution handlers. */
const COMMANDS: Record<string, CommandFunction> = {
	"/list": () => executeList(),
	"/get": (args) => executeGet(args),
	"/key": (args) => executeKey(args),
	"/filter": (args) => executeFilter(args),
	"/count": (args) => executeCount(args),
	"/keys": (args) => executeKeys(args),
	"/help": () => executeHelp(),
	"/clear": (_args, { setDisplayCommands }) => executeClear(setDisplayCommands!),
	"/status": () => executeStatus(),
	"/version": (args) => executeVersion(args),
	"/setblur": (args, { setBlur }) => executeBlur(args, setBlur!),
	"/setdisplay": (args, { setDisplayMode }) => executeDisplay(args, setDisplayMode!),
	"/setpanorama": (args, { setPanorama }) => executePanorama(args, setPanorama!),
};

/**
 * Parses a terminal input string and dispatches it to the matching command implementation.
 *
 * @param inputCommand Raw command line entered by the user.
 * @param context Mutable UI callbacks available to command executors.
 * @returns Renderable command result node.
 */
export function executeCommand(
	inputCommand: string,
	context: CommandContext,
): React.ReactNode | Promise<React.ReactNode> {
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

/**
 * Lists every supported entity type exposed by the API.
 *
 * @returns Rendered paragraph containing the available entity collections.
 */
function executeList() {
	return (
		<>
			<p>The data types available are: {Object.values(DATAS_TYPE).join(", ")}</p>
		</>
	);
}

/**
 * Fetches a single entity by type and id.
 *
 * @param args Command arguments in the form [type, id].
 * @returns Rendered result or validation error node.
 */
async function executeGet(args: string[]) {
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
				{Object.entries(data).map(([key, value]) => (
					<p key={`${key} - ${value}`}>
						<span className="underline">{key}:</span> {String(value)}
					</p>
				))}
			</>
		)) ||
		(status === 404 && <p className="text-red-500">Data not found. {data.message}.</p>) ||
		(status === 400 && <p className="text-red-500">{data.message}</p>)
	);
}

/**
 * Fetches a specific top-level field from one entity.
 *
 * @param args Command arguments in the form [type, id, key].
 * @returns Rendered result or validation error node.
 */
async function executeKey(args: string[]) {
	if (args.length !== 3) {
		return (
			<p className="text-red-500">
				Syntax Error: /key needs only three arguments. The correct syntax is: /key{" "}
				{"<type> <id> <key>"}
			</p>
		);
	}
	const { data, status } = await obtainDatasByURL(`${args.join("/")}`);

	return (
		(status === 200 && (
			<>
				<h2 className="font-bold">{PREFIX_MC + data.id} has the next information:</h2>
				{Object.entries(data).map(([key, value]) => (
					<p key={`${key} - ${value}`}>
						<span className="underline">{key}:</span> {String(value)}
					</p>
				))}
			</>
		)) ||
		(status === 404 && (
			<p className="text-red-500">This data doesn&apos;t have this key. {data.message}.</p>
		)) ||
		(status === 400 && <p className="text-red-500">{data.message}</p>)
	);
}

/**
 * Placeholder for a future server-side filtering command.
 *
 * @param _args Command arguments reserved for a future implementation.
 * @returns Informational message indicating that the command is unavailable.
 */
function executeFilter(_args: string[]) {
	return <p>This command is not available at this moment.</p>;
}

/**
 * Returns the number of elements available for a given entity collection.
 *
 * @param args Command arguments in the form [type].
 * @returns Rendered count or validation error node.
 */
async function executeCount(args: string[]) {
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

/**
 * Returns the top-level keys available for a given entity collection.
 *
 * @param args Command arguments in the form [type].
 * @returns Rendered key list or validation error node.
 */
async function executeKeys(args: string[]) {
	if (args.length !== 1) {
		return (
			<p className="text-red-500">
				Syntax Error: /keys needs only one argument. The correct syntax is: /keys {"<type>"}
			</p>
		);
	}
	const { data, status } = await obtainDatasByURL(`${args[0]}/keys`);

	return (
		(status === 200 && <p>{`${args[0]} has the next keys: ${data.join(", ")}`}</p>) ||
		((status === 404 || status === 400) && (
			<p className="text-red-500">{`${args[0]} is not a valid data type. Check the available data types with /list.`}</p>
		))
	);
}

/**
 * Prints the list of supported terminal commands.
 *
 * @returns Rendered help output.
 */
function executeHelp() {
	return (
		<>
			<p>{"/list Obtain all the data types: advancements, biomes, ..."}</p>
			<p>{"/get <type> <id> Obtain data information in JSON format."}</p>
			<p>{"/key <type> <id> <key> Obtain data information by a key."}</p>
			<p>{"/filter <type> <filter> Returns IDs of data of a certain type that match the filter"}</p>
			<p>{"/count <type> Returns the number of elements of a given data type"}</p>
			<p>{"/keys <type> Returns the available keys for a given data type"}</p>
			<br />
			<p>{"/help Displays the list of available commands"}</p>
			<p>{"/clear Clears the terminal screen"}</p>
			<p>{"/status Displays the current API status"}</p>
			<p>
				{"/version <mc|api> Shows the API version or the latest available Minecraft data version"}
			</p>
			<br />
			<p>{"/setblur <value> Adjusts the blur intensity of the terminal background"}</p>
			<p>{"/setdisplay <mode> Changes the display mode of the terminal interface"}</p>
			<p>{"/setpanorama <panorama> Sets a custom panorama background for the terminal"}</p>
		</>
	);
}

/**
 * Clears the rendered terminal output.
 *
 * @param setDisplayCommands React state setter for the terminal output list.
 * @returns Null because the command only mutates state.
 */
function executeClear(
	setDisplayCommands: React.Dispatch<React.SetStateAction<DisplayCommandEntry[]>>,
) {
	setDisplayCommands([]);
	return null;
}

/**
 * Verifies whether the API root endpoint is reachable.
 *
 * @returns Rendered connectivity status message.
 */
async function executeStatus() {
	// Execute command
	const { status } = await obtainDatasByURL("");
	return status === 200 ? (
		<p>You are connected with the Minecraft API! Status: 200</p>
	) : (
		<p className="text-red-500">Error: You are not connected with the Minecraft API! Status: 404</p>
	);
}

/**
 * Displays either the API version or the latest Minecraft version covered by the data.
 *
 * @param args Command arguments in the form [mc|api].
 * @returns Rendered version message or validation error node.
 */
function executeVersion(args: string[]) {
	if (args.length !== 1) {
		return (
			<p className="text-red-500">
				{
					"Syntax Error: /version needs only one argument between <mc|api>. The correct syntax is: /version <type>"
				}
			</p>
		);
	}
	if (args[0].toLowerCase() === "mc")
		return <p>{`Minecraft API has all game datas until version: ${MC_VERSION}`}</p>;
	if (args[0].toLowerCase() === "api") return <p>{`Minecraft API version: ${API_VERSION}`}</p>;
	return (
		<p className="text-red-500">
			{"Syntax Error: You have to use only <mc> or <api> as an argument."}
		</p>
	);
}

/**
 * Updates the background blur from the terminal.
 *
 * @param args Command arguments in the form [value].
 * @param setBlur Callback that persists the selected blur level.
 * @returns Rendered success or validation error node.
 */
function executeBlur(args: string[], setBlur: (value: number) => void) {
	if (args.length !== 1) {
		return (
			<p className="text-red-500">
				{
					"Syntax Error: /setblur needs only one value between 0 and 10. The correct syntax is: /setblur <value>"
				}
			</p>
		);
	}
	const value = Number(args[0]);
	if (value >= 0 && value <= 10) {
		setBlur(value);
		return <p>{`The blur has changed to a new value: ${value}`}</p>;
	}
	return (
		<p className="text-red-500">
			{"Args Error: The input value must be a number betwwen 0 and 10."}
		</p>
	);
}

/**
 * Changes the terminal background display mode.
 *
 * @param args Command arguments in the form [random|select].
 * @param setDisplayMode Callback that updates the display mode.
 * @returns Rendered success or validation error node.
 */
function executeDisplay(args: string[], setDisplayMode: (mode: string) => void) {
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

/**
 * Updates the selected panorama background from the terminal.
 *
 * @param args Command arguments in the form [panorama].
 * @param setPanorama Callback that updates the panorama index.
 * @returns Rendered success or validation error node.
 */
function executePanorama(args: string[], setPanorama: (panorama: number) => void) {
	if (args.length !== 1) {
		return (
			<p className="text-red-500">
				{
					"Syntax Error: /setpanorama needs only one argument between 1 and 10. The correct syntax is: /setpanorama <panorama>"
				}
			</p>
		);
	}
	const panorama = Number(args[0]);
	if (panorama >= 0 && panorama <= 10) {
		setPanorama(panorama);
		return <p>{`The panorama has changed to a new panorama: ${panorama}`}</p>;
	}
	return (
		<p className="text-red-500">
			{"Input Error: The input value must be a number betwwen 0 and 10."}
		</p>
	);
}
