import {
	AlertErrorMessage,
	AlertImageLoading,
	AlertLoadingMessage,
} from "@/components/AlertMessage";
import { Filter } from "@/components/Filter";
import { API_URL, FETCH_STATUS, PREFIX_MC } from "@/consts";
import { useFilterData } from "@/hooks/useFilterData";
import { useImageLoaded } from "@/hooks/useImageLoaded";
import { useQueryFilter } from "@/hooks/useQueryFilter";
import { useChangeSection } from "@/hooks/useSection";
import { useStructures } from "@/services/useDatas";
import { CopyGetButton } from "./shared/CopyGetButton";

export function StructuresInformation() {
	useChangeSection("information");

	const { datas, status } = useStructures();
	const { filteredDatas, filters, setFilter } = useFilterData(datas);
	const { updateFilter } = useQueryFilter("structure", setFilter);
	const { isAllImageLoaded, addImageLoaded } = useImageLoaded(filteredDatas.length);

	return (
		<>
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
						<h1 className="font-bold text-[20px] sm:text-[40px] text-center">Structures</h1>
						<Filter data="structure" value={filters.name || ""} onChange={updateFilter} />
						<div className="w-full flex flex-wrap overflow-y-scroll h-156 my-5 gap-y-10 justify-center">
							{filteredDatas.map((data) => {
								return (
									<div
										key={data.id}
										className="flex flex-col max-h-78.5 gap-x-1 w-full sm:w-[45%] lg:w-[32%] mx-1 bg-gray-500 rounded-2xl border-3 border-gray-800 overflow-hidden justify-center"
										style={{
											display: data.hidden ? "none" : "flex",
										}}
									>
										<img
											src={data.image}
											className="bg-[#afafaf] object-contain h-50"
											loading="eager"
											onLoad={addImageLoaded}
											onError={addImageLoaded}
											alt={`${data.id} sprite`}
										/>
										<h2 className="text-center font-bold text-[20px] sm:text-[26px] text-white border-t-3 border-gray-800">
											{data.name}
										</h2>
										<span className="text-center text-gray-300 -translate-y-2">{`${PREFIX_MC}${data.id}`}</span>
										<CopyGetButton
											path={`${API_URL}/structures/${data.id}`}
											className="flex items-center self-center justify-center w-1/2 mb-2 text-center bg-gray-300 border-2 border-black rounded-lg cursor-pointer hover:border-white"
											iconClassName="fa-regular fa-copy text-[16px] px-2"
											labelClassName="text-[20px]"
										/>
									</div>
								);
							})}
						</div>
					</div>
				</>
			)}
		</>
	);
}
