import { CopyableTooltipCard } from "@/components/information/shared/CopyableTooltipCard";
import type { EntityWithImage } from "@/services/useDatas";
import type { Item } from "@/types/item.interface";
import type { TooltipType } from "@/types/tooltip.interface";
import { API_URL, PREFIX_MC } from "@/utils/consts";
import { getTierColor } from "@/utils/tier";
import type { SyntheticEvent } from "react";

interface ItemCardProps {
	data: EntityWithImage<Item>;
	tooltip: TooltipType;
	onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
}

/** Renders a compact item card with tooltip and copy action. */
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
