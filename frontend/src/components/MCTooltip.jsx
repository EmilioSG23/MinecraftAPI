export function MCTooltip({ tooltip }) {
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
