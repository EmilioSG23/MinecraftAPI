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
import { useState } from "react";

const TYPE_STYLES = {
	ALL: {
		style: "bg-gray-600/25 hover:bg-gray-600/50",
	},
	MINECRAFT: {
		style: "bg-lime-300/25 hover:bg-lime-300/50",
	},
	NETHER: {
		style: "bg-red-400/25 hover:bg-red-400/50",
	},
	THE_END: {
		style: "bg-yellow-500/25 hover:bg-yellow-500/50",
	},
	ADVENTURE: {
		style: "bg-orange-500/25 hover:bg-orange-500/50",
	},
	HUSBANDRY: {
		style: "bg-blue-300/25 hover:bg-blue-300/50",
	},
};

function getTypeStyle(type) {
	if (type === "The End") return TYPE_STYLES.THE_END;
	const key = type?.toUpperCase?.() || "ALL";
	return TYPE_STYLES[key] || TYPE_STYLES.ALL;
}

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

	const [activeFilter, setActiveFilter] = useState("All");

	return (
		<>
			{status === FETCH_STATUS.LOADING && <AlertLoadingMessage />}
			{status === FETCH_STATUS.ERROR && <AlertErrorMessage />}
			{status === FETCH_STATUS.LOADED && (
				<>
					{!isAllImageLoaded && <AlertImageLoading />}
					<div
						className={`flex flex-col items-center justify-center max-w-6xl p-4 sm:p-8 mx-auto mc-container mt-7 ${
							isAllImageLoaded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
						}`}
					>
						<h1 className="font-bold text-[20px] sm:text-[40px] text-center">Advancements</h1>
						<div className="w-full my-5">
							<div className="w-full pb-4 justify-center items-center text-center">
								{["All", "Minecraft", "Nether", "The End", "Adventure", "Husbandry"].map((type) => (
									<button
										key={type}
										className={`px-1 border w-1/3 sm:w-1/6 cursor-pointer ${activeFilter === type ? "outline" : ""} hover:outline ${getTypeStyle(type).style}`}
										onClick={() => {
											if (type !== "All") setFilter("interface", type);
											else setFilter("interface", "");
											setActiveFilter(type);
										}}
									>
										{type || "All"}
									</button>
								))}
							</div>
							<Filter data="advancement" value={filter} onChange={updateFilter} />
							<div className="flex flex-col overflow-y-scroll h-[512px] my-5 gap-y-10 sm:px-2">
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
												className={`flex justify-center items-center p-3 size-[60px] sm:size-[100px] group-hover:scale-110 ${bgClass}`}
												style={{
													imageRendering: "pixelated",
													objectFit: "cover",
													backgroundSize: "100% 100%",
												}}
											>
												<img
													src={data.image}
													className="h-[32px] sm:h-[64px]"
													onLoad={addImageLoaded}
													onError={addImageLoaded}
													alt={`${data.id} sprite`}
												/>
											</figure>
											<div className="flex-1 [&>*]:px-5">
												<h2 className="bg-[#046a95] border-4 border-black text-white rounded-lg text-[20px] sm:text-[32px] group-hover:bg-[#aa7e0f] group-hover:border-[#8b670c]">
													{data.title}
												</h2>
												<p
													className={`bg-[#202020] border-4 border-[#555555] rounded-lg text-[12px] sm:text-[24px] ${data.tier === "Challenge" ? "text-purple-600" : data.tier === "Goal" ? "text-yellow-400" : "text-green-600"}`}
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
												<i className="fa-regular fa-copy text-[28px] sm:text-[56px] px-2" />
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
