import {
	createErrorOutput,
	createSuccessOutput,
} from "@/features/terminal/commands/command-helpers";
import { fetchApiResource } from "@/shared/lib/api-client";

/**
 * Verifies that the frontend can reach the Minecraft API root endpoint.
 *
 * @returns A success message when the API is reachable, otherwise an error with the status code.
 */
export async function executeStatus() {
	const { status, data } = await fetchApiResource("");
	if (status === 200) {
		return createSuccessOutput(`You are connected with the Minecraft API! Status: ${status}`);
	}

	return createErrorOutput(
		`Error: Could not reach the Minecraft API. Status: ${String(status)}${data?.message ? ` - ${data.message}` : ""}`,
	);
}
