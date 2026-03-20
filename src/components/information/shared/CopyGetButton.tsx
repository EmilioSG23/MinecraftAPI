/** Reusable button that copies a GET endpoint to the clipboard. */
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
 *
 * @param props.path Endpoint path copied to the clipboard.
 * @param props.className CSS utility classes applied to the button.
 * @param props.iconClassName CSS classes for the icon element.
 * @param props.label Optional label rendered next to the icon.
 * @param props.labelClassName Optional CSS classes for the label span.
 * @returns Copy button element.
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
