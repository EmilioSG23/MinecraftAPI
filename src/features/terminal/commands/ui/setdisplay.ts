import {
	createErrorOutput,
	createTextOutput,
	validateArgs,
} from "@/features/terminal/command-helpers";
import { DISPLAY_MODE } from "@/hooks/useConfigBackground";

export function executeDisplay(args: string[], setDisplayMode: (mode: string) => void) {
	const err = validateArgs(1, args, '/setdisplay "<random|select>"');
	if (err) return err;
	const mode = args[0].toLowerCase();
	if (mode === DISPLAY_MODE.SELECT || mode === DISPLAY_MODE.RANDOM) {
		setDisplayMode(mode);
		return createTextOutput(`The display mode has changed to ${mode} mode`);
	}
	return createErrorOutput(
		"Input Error: The input mode is not valid, choose between random or select.",
	);
}
