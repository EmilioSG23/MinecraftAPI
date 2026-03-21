/** Compact item card used inside the item catalogue grid. */
import { API_URL } from "@/config/config";
import { CopyableTooltipCard } from "@/features/information/components/common/CopyableTooltipCard";
import type { EntityWithImage } from "@/features/information/hooks/useInformationData";
import { getTierColor } from "@/features/information/lib/get-tier-color";
import type { TooltipState } from "@/features/information/types";
import { PREFIX_MC } from "@/shared/minecraft/constants";
import type { Item } from "@/shared/minecraft/types";
import type { SyntheticEvent } from "react";

interface ItemCardProps {
	data: EntityWithImage<Item>;
	tooltip: TooltipState;
	onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Renders a compact item card with tooltip and copy action.
 *
 * @param props.data Item payload enriched with its image URL.
 * @param props.tooltip Shared tooltip controller.
 * @param props.onLoad Image load callback propagated by the list view.
 * @returns Clickable item card.
 */
export function ItemCard({ data, tooltip, onLoad }: ItemCardProps) {
	return (
		<CopyableTooltipCard
			data={data}
			tooltip={tooltip}
			onLoad={onLoad}
			getCopyPath={(item) => `${API_URL}/items/${item.id}`}
			renderTooltipContent={(item, isDesktop) => (
				<div className="text-left">
					<h3 className={`${getTierColor(item.tier)} text-[16px]`}>{item.name}</h3>
					<span className="text-[#545454]">
						{PREFIX_MC}
						{item.id}
					</span>
					<div className="text-[#a0a0a0]">
						<p>{`Renewable: ${item.renewable ? "Yes" : "No"}`}</p>
						<p>{`Stackable: ${item.stackable}`}</p>
					</div>
					{isDesktop && <footer className="text-[#545454]">Click to GET</footer>}
				</div>
			)}
			className="flex relative group cursor-pointer size-12 sm:size-14"
		>
			{({ data: item, onLoad: handleLoad }) => (
				<>
					<figure className="flex flex-col bg-[#8b8b8b] border-2 border-gray-800 overflow-hidden justify-center">
						<img
							src={item.image}
							className="object-contain size-10 sm:size-12 m-auto"
							loading="lazy"
							onLoad={handleLoad}
							onError={handleLoad}
							width={48}
							height={48}
							alt={`${item.id} sprite`}
						/>
					</figure>
				</>
			)}
		</CopyableTooltipCard>
	);
}
