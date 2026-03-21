/**
 * Clears the terminal output by invoking the injected UI callback.
 *
 * @param clearOutput Callback that resets the visible command output.
 * @returns Null because clearing the screen does not append a new output block.
 */
export function executeClear(clearOutput: () => void) {
	clearOutput();
	return null;
}
