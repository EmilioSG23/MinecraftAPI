/** Compact block card used inside the block catalogue grid. */
import { CopyableTooltipCard } from "@/features/information/components/shared/CopyableTooltipCard";
import type { EntityWithImage } from "@/services/useDatas";
import type { Block } from "@/types/block.interface";
import type { TooltipType } from "@/types/tooltip.interface";
import { API_URL, PREFIX_MC } from "@/utils/consts";
import { getTierColor } from "@/utils/tier";
import type { SyntheticEvent } from "react";

interface BlockCardProps {
	data: EntityWithImage<Block>;
	tooltip: TooltipType;
	onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Renders a compact block card with tooltip and copy action.
 *
 * @param props.data Block payload enriched with its image URL.
 * @param props.tooltip Shared tooltip controller.
 * @param props.onLoad Image load callback propagated by the list view.
 * @returns Clickable block card.
 */
export function BlockCard({ data, tooltip, onLoad }: BlockCardProps) {
	return (
		<CopyableTooltipCard
			data={data}
			tooltip={tooltip}
			onLoad={onLoad}
			getCopyPath={(block) => `${API_URL}/blocks/${block.id}`}
			renderTooltipContent={(block, isDesktop) => (
				<div className="text-left">
					<h2 className={`${getTierColor(block.tier)} text-[16px]`}>{block.name}</h2>
					<small className="text-[#545454]">
						{PREFIX_MC}
						{block.id}
					</small>
					<div className="text-[#a0a0a0]">
						<p>{`Renewable: ${block.renewable ? "Yes" : "No"}`}</p>
						<p>{`Stackable: ${block.stackable}`}</p>
						<p>{`Tool: ${block.tool}`}</p>
						<p>{`Blast Resistance: ${block.blastResistance}`}</p>
						<p>{`Hardness: ${block.hardness}`}</p>
						<p>{`Luminous: ${block.luminous}`}</p>
						<p>{`Transparent: ${block.transparent}`}</p>
						<p>{`Flammable: ${block.flammable}`}</p>
						<p>{`Water Loggeable: ${block.waterloggeable}`}</p>
					</div>
					{isDesktop && <span className="text-[#545454]">Click to GET</span>}
				</div>
			)}
			className="cursor-pointer size-12 sm:size-14"
		>
			{({ data: block, onLoad: handleLoad }) => (
				<div className="flex flex-col bg-[#8b8b8b] border-2 border-gray-800 overflow-hidden justify-center">
					<img
						src={block.image}
						className="object-contain size-10 sm:size-12 m-auto"
						loading="lazy"
						onLoad={handleLoad}
						onError={handleLoad}
						width={48}
						height={48}
						alt={`${block.id} sprite`}
					/>
				</div>
			)}
		</CopyableTooltipCard>
	);
}

