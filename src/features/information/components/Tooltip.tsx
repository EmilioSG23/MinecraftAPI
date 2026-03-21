/** Floating tooltip renderer shared by the information cards. */
interface TooltipProps {
	tooltip: {
		visible: boolean;
		content: React.ReactNode;
		position: {
			x: number;
			y: number;
		};
	};
}

/**
 * Renders the current tooltip content at the tracked pointer position.
 *
 * @param props.tooltip Tooltip state returned by useTooltip.
 * @returns Tooltip element or null when hidden.
 */
export function Tooltip({ tooltip }: TooltipProps) {
	if (!tooltip.visible || !tooltip.content) return null;

	return (
		<span
			className="fixed pointer-events-none mc-tooltip"
			style={{
				left: `${tooltip.position.x}px`,
				top: `${tooltip.position.y}px`,
			}}
		>
			{tooltip.content}
		</span>
	);
}
