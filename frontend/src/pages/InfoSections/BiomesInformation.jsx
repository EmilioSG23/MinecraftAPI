import { API_URL, FETCH_STATUS, PREFIX_MC } from "../../consts";
import {
	AlertErrorMessage,
	AlertImageLoading,
	AlertLoadingMessage,
} from "../../components/AlertMessage";
import { useBiomes } from "../../services/useDatas";
import { MCTooltip } from "../../components/MCTooltip";
import { useTooltip } from "../../hooks/useTooltip";
import { useImageLoaded } from "../../hooks/useImageLoaded";
import { useFilterData } from "../../hooks/useFilterData";
import { Filter } from "../../components/Filter";
import { useQueryFilter } from "../../hooks/useQueryFilter";

function BiomeItemInformation({ children, label, tooltip }) {
	return (
		<div
			className="flex relative gap-x-2 border-2 border-white px-1 rounded-lg w-[20%] justify-center items-center"
			onMouseEnter={() => {
				tooltip.setVisible(true);
				tooltip.setContent(<p>{label}</p>);
			}}
			onMouseLeave={() => tooltip.setVisible(false)}
		>
			{children}
		</div>
	);
}

export function BiomesInformation() {
	const { datas, status } = useBiomes();
	const { filteredDatas, filter, setFilter } = useFilterData(datas);
	const { updateFilter } = useQueryFilter("biome", setFilter);
	const tooltip = useTooltip();
	const { isAllImageLoaded, addImageLoaded } = useImageLoaded(datas.length);

	return (
		<>
			<MCTooltip tooltip={tooltip} />
			{status === FETCH_STATUS.LOADING && <AlertLoadingMessage />}
			{status === FETCH_STATUS.ERROR && <AlertErrorMessage />}
			{status === FETCH_STATUS.LOADED && (
				<>
					{!isAllImageLoaded && <AlertImageLoading />}
					<div
						className={`mc-container mx-auto max-w-7xl mt-7 flex flex-col items-center p-8 ${
							isAllImageLoaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
						}`}
					>
						<h1 className="font-bold text-[40px] text-center">Biomes</h1>
						<Filter data="biome" value={filter} onChange={updateFilter} />
						<div className="w-full flex flex-wrap overflow-y-scroll h-[624px] my-5 gap-y-10 justify-center">
							{filteredDatas.map((data) => {
								return (
									<article
										key={data.id}
										className="flex flex-col gap-x-1 w-[32%] mx-1 bg-green-600 rounded-2xl border-3 border-green-900 overflow-hidden justify-center max-h-[360px]"
										style={{ display: data.hidden ? "none" : "flex" }}
									>
										<img
											src={data.image}
											className="w-[384px] h-[200px]"
											onLoad={addImageLoaded}
											onError={addImageLoaded}
											alt={`${data.id} sprite`}
										/>
										<h2 className="text-center font-bold text-[26px] text-white border-t-3 border-green-900">
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
										<button
											type="button"
											className="flex items-center self-center justify-center w-1/2 mb-2 text-center bg-gray-300 border-2 border-black rounded-lg cursor-pointer hover:border-white"
											onClick={() => {
												const path = `${API_URL}/biomes/${data.id}`;
												navigator.clipboard.writeText(path);
											}}
										>
											<i className="fa-regular fa-copy text-[16px] px-2" />
											<span className="text-[20px]">GET</span>
										</button>
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
