import { createTextOutput } from "@/features/terminal/command-helpers";

/**
 * Returns the temporary placeholder response for the filter command.
 *
 * @returns A muted message indicating that the command is not implemented yet.
 */
export function executeFilter() {
	return createTextOutput("This command is not available at this moment.", "muted");
}
