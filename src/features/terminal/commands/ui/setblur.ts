import {
	createErrorOutput,
	createTextOutput,
	validateArgs,
} from "@/features/terminal/command-helpers";

export function executeBlur(args: string[], setBlur: (value: number) => void) {
	const err = validateArgs(1, args, '/setblur "<value>" (0-10)');
	if (err) return err;
	const value = Number(args[0]);
	if (!Number.isFinite(value)) {
		return createErrorOutput("Args Error: The input value must be a number between 0 and 10.");
	}
	if (value >= 0 && value <= 10) {
		setBlur(value);
		return createTextOutput(`The blur has changed to a new value: ${value}`);
	}
	return createErrorOutput("Args Error: The input value must be a number between 0 and 10.");
}
