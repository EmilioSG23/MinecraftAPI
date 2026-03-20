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
import { useBlocks } from "@/services/useDatas";
import type { SyntheticEvent } from "react";
import { CopyableTooltipCard } from "./shared/CopyableTooltipCard";
import { getTierColor } from "./shared/tier";
import type { TooltipType } from "./shared/types";

interface BlockInformationProps {
	data: any;
	tooltip: TooltipType;
	onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
}

function BlockInformation({ data, tooltip, onLoad }: BlockInformationProps) {
	return (
		<CopyableTooltipCard
			data={data}
			tooltip={tooltip}
			onLoad={onLoad}
			getCopyPath={(block) => `${API_URL}/items/${block.id}`}
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
						loading="eager"
						onLoad={handleLoad}
						onError={handleLoad}
						alt={`${block.id} sprite`}
					/>
				</div>
			)}
		</CopyableTooltipCard>
	);
}

export function BlocksInformation() {
	useChangeSection("information");

	const { datas, status } = useBlocks();
	const { filteredDatas, filters, setFilter } = useFilterData(datas);
	const { updateFilter } = useQueryFilter("block", setFilter);
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
							<h1 className="font-bold text-[20px] sm:text-[40px] text-center">Blocks</h1>
							<Filter data="block" value={filters.name || ""} onChange={updateFilter} />
							<div className="w-full flex flex-wrap overflow-y-scroll h-156 my-5 gap-y-2 justify-center items-center">
								{filteredDatas.map((data) => (
									<BlockInformation
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
