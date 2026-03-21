import { createTextOutput } from "@/features/terminal/commands/command-helpers";
import { MINECRAFT_ENTITY_TYPES } from "@/shared/minecraft/constants";

/**
 * Lists the entity categories supported by the API.
 *
 * @returns A text response containing every available data type.
 */
export function executeList() {
	return createTextOutput(
		`The data types available are: ${Object.values(MINECRAFT_ENTITY_TYPES).join(", ")}`,
	);
}
