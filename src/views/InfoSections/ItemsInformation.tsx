import {
	AlertErrorMessage,
	AlertImageLoading,
	AlertLoadingMessage,
} from "@/components/AlertMessage";
import { Container } from "@/components/Container";
import { Filter } from "@/components/Filter";
import { Tooltip } from "@/components/Tooltip";
import { API_URL, FETCH_STATUS, PREFIX_MC } from "@/consts";
import { useFilterData } from "@/hooks/useFilterData";
import { useImageLoaded } from "@/hooks/useImageLoaded";
import { useQueryFilter } from "@/hooks/useQueryFilter";
import { useChangeSection } from "@/hooks/useSection";
import { useTooltip } from "@/hooks/useTooltip";
import { useItems } from "@/services/useDatas";
import type { SyntheticEvent } from "react";
import { CopyableTooltipCard } from "./shared/CopyableTooltipCard";
import { getTierColor } from "./shared/tier";
import type { TooltipType } from "./shared/types";

interface ItemInformationProps {
	data: any;
	tooltip: TooltipType;
	onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
}

function ItemInformation({ data, tooltip, onLoad }: ItemInformationProps) {
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
							loading="eager"
							onLoad={handleLoad}
							onError={handleLoad}
							alt={`${item.id} sprite`}
						/>
					</figure>
					<div className="flex flex-col items-center justify-center bg-gray-300 text-center border-2 border-black rounded-lg w-[64] hover:border-white">
						<i className="fa-regular fa-copy text-[16px] px-2" />
						<span className="text-[20px]">GET</span>
					</div>
				</>
			)}
		</CopyableTooltipCard>
	);
}

export function ItemsInformation() {
	useChangeSection("information");

	const { datas, status } = useItems();
	const { filteredDatas, filters, setFilter } = useFilterData(datas);
	const { updateFilter } = useQueryFilter("item", setFilter);
	const tooltip = useTooltip();
	const { isAllImageLoaded, addImageLoaded } = useImageLoaded(filteredDatas.length);

	return (
		<>
			<Tooltip tooltip={tooltip} />
			{status === FETCH_STATUS.LOADING && <AlertLoadingMessage />}
			{status === FETCH_STATUS.ERROR && <AlertErrorMessage />}
			{status === FETCH_STATUS.LOADED && (
				<>
					{!isAllImageLoaded && <AlertImageLoading />}
					<Container
						className={`${
							isAllImageLoaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
						}`}
					>
						<div className="w-full flex flex-col justify-center items-center gap-4">
							<h1 className="font-bold text-[20px] sm:text-[40px] text-center">Items</h1>
							<Filter data="item" value={filters.name || ""} onChange={updateFilter} />
							<div className="w-full flex flex-wrap overflow-y-scroll h-156 my-5 gap-y-2 justify-center items-center">
								{filteredDatas.map((data) => (
									<ItemInformation
										key={data.id}
										data={data}
										tooltip={tooltip}
										onLoad={addImageLoaded}
									/>
								))}
							</div>
						</div>
					</Container>
				</>
			)}
		</>
	);
}
