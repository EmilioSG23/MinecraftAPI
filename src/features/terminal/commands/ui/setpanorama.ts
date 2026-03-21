import {
	createErrorOutput,
	createTextOutput,
	validateArgs,
} from "@/features/terminal/command-helpers";

export function executePanorama(args: string[], setPanorama: (panorama: number) => void) {
	const err = validateArgs(1, args, '/setpanorama "<panorama>" (1-10)');
	if (err) return err;
	const panorama = Number(args[0]);
	if (!Number.isFinite(panorama)) {
		return createErrorOutput("Input Error: The input value must be a number between 1 and 10.");
	}
	if (panorama >= 1 && panorama <= 10) {
		setPanorama(panorama);
		return createTextOutput(`The panorama has changed to a new panorama: ${panorama}`);
	}
	return createErrorOutput("Input Error: The input value must be a number between 1 and 10.");
}
