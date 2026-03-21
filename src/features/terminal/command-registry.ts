import { createErrorOutput } from "@/features/terminal/command-helpers";
import { executeCount } from "@/features/terminal/commands/data/count";
import { executeFilter } from "@/features/terminal/commands/data/filter";
import { executeGet } from "@/features/terminal/commands/data/get";
import { executeKey } from "@/features/terminal/commands/data/key";
import { executeKeys } from "@/features/terminal/commands/data/keys";
import { executeHelp } from "@/features/terminal/commands/meta/help";
import { executeList } from "@/features/terminal/commands/meta/list";
import { executeStatus } from "@/features/terminal/commands/meta/status";
import { executeVersion } from "@/features/terminal/commands/meta/version";
import { executeClear } from "@/features/terminal/commands/ui/clear";
import { executeBlur } from "@/features/terminal/commands/ui/setblur";
import { executeDisplay } from "@/features/terminal/commands/ui/setdisplay";
import { executePanorama } from "@/features/terminal/commands/ui/setpanorama";
import type { TerminalCommandDefinition } from "@/features/terminal/types";

/** Canonical list of commands exposed by the in-app terminal. */
export const COMMAND_REGISTRY: TerminalCommandDefinition[] = [
	{
		name: "/list",
		description: "Obtain all the data types: advancements, biomes, ...",
		execute: () => executeList(),
	},
	{
		name: "/get",
		params: "<type> <id>",
		description: "Obtain data information in JSON format.",
		execute: (args) => executeGet(args),
	},
	{
		name: "/key",
		params: "<type> <id> <key>",
		description: "Obtain data information by a key.",
		execute: (args) => executeKey(args),
	},
	{
		name: "/filter",
		params: "<type> <filter>",
		description: "Returns IDs of data of a certain type that match the filter.",
		execute: () => executeFilter(),
	},
	{
		name: "/count",
		params: "<type>",
		description: "Returns the number of elements of a given data type.",
		execute: (args) => executeCount(args),
	},
	{
		name: "/keys",
		params: "<type>",
		description: "Returns the available keys for a given data type.",
		execute: (args) => executeKeys(args),
	},
	{
		name: "/help",
		description: "Displays the list of available commands.",
		execute: () => executeHelp(),
	},
	{
		name: "/clear",
		description: "Clears the terminal screen.",
		execute: (_args, context) => {
			if (!context.clearOutput) {
				return createErrorOutput("Callback not available to clear the terminal.");
			}
			return executeClear(context.clearOutput);
		},
	},
	{
		name: "/status",
		description: "Displays the current API status.",
		execute: () => executeStatus(),
	},
	{
		name: "/version",
		params: "<mc|api>",
		description: "Shows the API version or the latest available Minecraft data version.",
		execute: (args) => executeVersion(args),
	},
	{
		name: "/setblur",
		params: "<value>",
		description: "Adjusts the blur intensity of the terminal background (0-10).",
		execute: (args, context) => {
			if (!context.setBlur) {
				return createErrorOutput("Callback not available to set blur.");
			}
			return executeBlur(args, context.setBlur);
		},
	},
	{
		name: "/setdisplay",
		params: "<random|select>",
		description: "Changes the display mode of the terminal interface.",
		execute: (args, context) => {
			if (!context.setDisplayMode) {
				return createErrorOutput("Callback not available to set display mode.");
			}
			return executeDisplay(args, context.setDisplayMode);
		},
	},
	{
		name: "/setpanorama",
		params: "<panorama>",
		description: "Sets a custom panorama background for the terminal (1-10).",
		execute: (args, context) => {
			if (!context.setPanorama) {
				return createErrorOutput("Callback not available to set panorama.");
			}
			return executePanorama(args, context.setPanorama);
		},
	},
];
