import { useTooltip } from "../hooks/useTooltip";

export function MCTooltip({tooltip}) {
    if (!tooltip.visible || !tooltip.content) return null;

    return (
        <span className="mc-tooltip fixed pointer-events-none"
              style={{ left: `${tooltip.position.x}px`, top: `${tooltip.position.y}px` }}>
            {tooltip.content}
        </span>
    );
}
