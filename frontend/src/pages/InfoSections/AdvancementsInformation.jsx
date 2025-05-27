import { API_URL, FETCH_STATUS } from "../../consts";
import {
	AlertErrorMessage,
	AlertImageLoading,
	AlertLoadingMessage,
} from "../../components/AlertMessage";
import { useAdvancements } from "../../services/useDatas";
import { useImageLoaded } from "../../hooks/useImageLoaded";
import { Filter } from "../../components/Filter";
import { useFilterData } from "../../hooks/useFilterData";
import { useQueryFilter } from "../../hooks/useQueryFilter";

function getFrame(tier) {
	if (tier === "Challenge") {
		return {
			bg: "bg-[url(/information/challenge_frame.png)]",
			bgHover: "group-hover:bg-[url(/information/challenge_frame_obtained.png)]",
		};
	}
	if (tier === "Goal") {
		return {
			bg: "bg-[url(/information/goal_frame.png)]",
			bgHover: "group-hover:bg-[url(/information/goal_frame_obtained.png)]",
		};
	}
	return {
		bg: "bg-[url(/information/advancement_frame.png)]",
		bgHover: "group-hover:bg-[url(/information/advancement_frame_obtained.png)]",
	};
}

export function AdvancementsInformation() {
	const { datas, status } = useAdvancements();
	const { filteredDatas, filter, setFilter } = useFilterData(datas, "title");
	const { updateFilter } = useQueryFilter("advancement", setFilter);
	const { isAllImageLoaded, addImageLoaded } = useImageLoaded(datas.length);

	return (
		<>
			{status === FETCH_STATUS.LOADING && <AlertLoadingMessage />}
			{status === FETCH_STATUS.ERROR && <AlertErrorMessage />}
			{status === FETCH_STATUS.LOADED && (
				<>
					{!isAllImageLoaded && <AlertImageLoading />}
					<div
						className={`flex flex-col items-center justify-center max-w-6xl p-8 mx-auto mc-container mt-7 ${
							isAllImageLoaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
						}`}
					>
						<h1 className="font-bold text-[40px] text-center">Advancements</h1>
						<div className="w-full my-5">
							<Filter data="advancement" value={filter} onChange={updateFilter} />
							<div className="flex flex-col overflow-y-scroll h-[512px] my-5 gap-y-10 px-2">
								{filteredDatas.map((data) => {
									const { bg, bgHover } = getFrame(data.tier);
									const bgClass = `${bg} ${bgHover}`;
									return (
										<div
											key={data.id}
											className="flex gap-x-1 group"
											style={{
												display: data.hidden ? "none" : "flex",
											}}
										>
											<figure
												className={`flex justify-center items-center p-3 h-[100px] w-[100px] group-hover:scale-110 ${bgClass}`}
												style={{
													imageRendering: "pixelated",
													objectFit: "cover",
													backgroundSize: "100% 100%",
												}}
											>
												<img
													src={data.image}
													className="h-[64px]"
													onLoad={addImageLoaded}
													onError={addImageLoaded}
													alt={`${data.id} sprite`}
												/>
											</figure>
											<div className="flex-1 [&>*]:px-5">
												<h2 className="bg-[#046a95] border-4 border-black text-white rounded-lg text-[32px] group-hover:bg-[#aa7e0f] group-hover:border-[#8b670c]">
													{data.title}
												</h2>
												<p
													className={`bg-[#202020] border-4 border-[#555555] rounded-lg text-[24px] ${data.tier === "Challenge" ? "text-purple-600" : data.tier === "Goal" ? "text-yellow-400" : "text-green-600"}`}
												>
													{data.description}
												</p>
											</div>
											{/*<a className="hidden cursor-pointer flex flex-col bg-gray-300 text-center border-2 border-black rounded-lg items-center justify-center w-[64] hover:border-white">
												<i className="fa-solid fa-magnifying-glass text-[56px] px-2" />
												<span>See</span>
											</a>*/}
											<button
												type="button"
												className="cursor-pointer flex flex-col bg-gray-300 text-center border-2 border-black rounded-lg items-center justify-center w-[64] hover:border-white"
												onClick={() => {
													const path = `${API_URL}/advancements/${data.id}`;
													navigator.clipboard.writeText(path);
												}}
											>
												<i className="fa-regular fa-copy text-[56px] px-2" />
												<span>GET</span>
											</button>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
