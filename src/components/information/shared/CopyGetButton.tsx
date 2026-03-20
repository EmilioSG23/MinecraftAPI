import type { ReactNode } from "react";

interface CopyGetButtonProps {
	path: string;
	className: string;
	iconClassName: string;
	label?: ReactNode;
	labelClassName?: string;
}

/**
 * Renders a button that copies an API endpoint to clipboard.
 */
export function CopyGetButton({
	path,
	className,
	iconClassName,
	label = "GET",
	labelClassName,
}: CopyGetButtonProps) {
	return (
		<button
			type="button"
			className={className}
			onClick={() => {
				navigator.clipboard.writeText(path);
			}}
		>
			<i className={iconClassName} />
			<span className={labelClassName}>{label}</span>
		</button>
	);
}
