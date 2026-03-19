import {
	AlertErrorMessage,
	AlertImageLoading,
	AlertLoadingMessage,
} from "@/components/AlertMessage";
import { Filter } from "@/components/Filter";
import { Tooltip } from "@/components/Tooltip";
import { API_URL, FETCH_STATUS, PREFIX_MC } from "@/consts";
import { useFilterData } from "@/hooks/useFilterData";
import { useImageLoaded } from "@/hooks/useImageLoaded";
import { useQueryFilter } from "@/hooks/useQueryFilter";
import { useChangeSection } from "@/hooks/useSection";
import { useTooltip } from "@/hooks/useTooltip";
import { useBiomes } from "@/services/useDatas";
import type { ReactNode } from "react";
import { CopyGetButton } from "./shared/CopyGetButton";
import type { TooltipType } from "./shared/types";

interface BiomeItemInformationProps {
	children: ReactNode;
	label: string;
	tooltip: TooltipType;
}

function BiomeItemInformation({ children, label, tooltip }: BiomeItemInformationProps) {
	return (
		<div
			className="flex relative gap-x-2 border-2 border-white px-1 rounded-lg w-[30%] sm:w-[25%] md:w-[20%] justify-center items-center"
			onMouseEnter={() => {
				tooltip.setContent(<p>{label}</p>);
				tooltip.setVisible(true);
			}}
			onMouseLeave={() => tooltip.setVisible(false)}
		>
			{children}
		</div>
	);
}

export function BiomesInformation() {
	useChangeSection("information");

	const { datas, status } = useBiomes();
	const { filteredDatas, filters, setFilter } = useFilterData(datas);
	const { updateFilter } = useQueryFilter("biome", setFilter);
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
					<div
						className={`mc-container mx-auto max-w-7xl mt-7 flex flex-col items-center p-4 sm:p-8 ${
							isAllImageLoaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
						}`}
					>
						<h1 className="font-bold text-[20px] sm:text-[40px] text-center">Biomes</h1>
						<Filter data="biome" value={filters.name || ""} onChange={updateFilter} />
						<div className="w-full flex flex-wrap overflow-y-scroll h-156 my-5 gap-y-10 justify-center">
							{filteredDatas.map((data) => {
								return (
									<article
										key={data.id}
										className="flex flex-col gap-x-1 w-full sm:w-[48%] lg:w-[32%] mx-1 bg-green-600 rounded-2xl border-3 border-green-900 overflow-hidden justify-center max-h-90"
										style={{ display: data.hidden ? "none" : "flex" }}
									>
										<img
											src={data.image}
											className="min-w-[384px] h-50 object-cover"
											loading="lazy"
											onLoad={addImageLoaded}
											onError={addImageLoaded}
											alt={`${data.id} sprite`}
										/>
										<img
											src={data.image}
											className="min-w-[384px] h-50 object-cover"
											loading="eager"
											onLoad={addImageLoaded}
											onError={addImageLoaded}
											alt={`${data.id} sprite`}
										/>
										<h2 className="text-center font-bold text-[20px] sm:text-[26px] text-white border-t-3 border-green-900">
											{data.name}
										</h2>
										<span className="text-center text-gray-700 -translate-y-2">{`${PREFIX_MC}${data.id}`}</span>
										<div className="flex items-center justify-center mb-3 gap-x-5 text-gray-200 text-[20px]">
											<BiomeItemInformation tooltip={tooltip} label="Temperature">
												<i className="fa-solid fa-temperature-half text-amber-800" />
												<span>{data.temperature}</span>
											</BiomeItemInformation>
											<BiomeItemInformation tooltip={tooltip} label="Downfall">
												<i className="text-white fa-solid fa-mountain" />
												<span>{data.downfall}</span>
											</BiomeItemInformation>
											<BiomeItemInformation tooltip={tooltip} label="Precipitation">
												<i className="text-blue-300 fa-solid fa-cloud-rain" />
												<span>{data.precipitation ? "Yes" : "No"}</span>
											</BiomeItemInformation>
										</div>
										<CopyGetButton
											path={`${API_URL}/biomes/${data.id}`}
											className="flex items-center self-center justify-center w-1/2 mb-2 text-center bg-gray-300 border-2 border-black rounded-lg cursor-pointer hover:border-white"
											iconClassName="fa-regular fa-copy text-[16px] px-2"
											labelClassName="text-[20px]"
										/>
									</article>
								);
							})}
						</div>
					</div>
				</>
			)}
		</>
	);
}
