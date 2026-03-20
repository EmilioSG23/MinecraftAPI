import type { TooltipType } from "@/types/tooltip.interface";
import type { MouseEvent, ReactNode, SyntheticEvent } from "react";

interface CopyableTooltipCardProps<T extends { id: string }> {
	data: T;
	tooltip: TooltipType;
	onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
	getCopyPath: (data: T) => string;
	renderTooltipContent: (data: T, isDesktop: boolean) => ReactNode;
	children: (params: {
		data: T;
		isDesktop: boolean;
		onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
	}) => ReactNode;
	className: string;
}

/**
 * Generic card wrapper for items that copy endpoint on click and show tooltip.
 */
export function CopyableTooltipCard<T extends { id: string }>({
	data,
	tooltip,
	onLoad,
	getCopyPath,
	renderTooltipContent,
	children,
	className,
}: CopyableTooltipCardProps<T>) {
	const isDesktop = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

	const getTooltipContent = (): ReactNode => renderTooltipContent(data, isDesktop);

	const handleDesktop = (): void => {
		navigator.clipboard.writeText(getCopyPath(data));
	};

	const handleMobile = (event: MouseEvent<HTMLButtonElement>): void => {
		const newContent = getTooltipContent();
		const isSameContent = tooltip.visible && tooltip.content !== null;

		if (isSameContent) {
			tooltip.setVisible(false);
			return;
		}

		tooltip.setContent(newContent);
		tooltip.setVisible(true);

		const rect = event.currentTarget.getBoundingClientRect();
		let x = rect.right + 8;
		let y = rect.top + rect.height / 2;

		tooltip.setPosition({ x, y });

		setTimeout(() => {
			const tooltipEl = document.querySelector(".mc-tooltip");
			if (!tooltipEl) return;

			const ttRect = tooltipEl.getBoundingClientRect();
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;
			const padding = 8;

			if (x + ttRect.width > viewportWidth) {
				x = rect.left - ttRect.width - padding;
			}
			if (x < 0) {
				x = padding;
			}

			if (y + ttRect.height > viewportHeight) {
				y = viewportHeight - ttRect.height - padding;
			}
			if (y < 0) {
				y = padding;
			}

			tooltip.setPosition({ x, y });
		}, 0);
	};

	return (
		<button
			type="button"
			className={className}
			onMouseEnter={() => {
				tooltip.setVisible(true);
				tooltip.setContent(getTooltipContent());
			}}
			onMouseLeave={() => tooltip.setVisible(false)}
			onClick={(event) => {
				if (isDesktop) handleDesktop();
				else handleMobile(event);
			}}
		>
			{children({ data, isDesktop, onLoad })}
		</button>
	);
}
