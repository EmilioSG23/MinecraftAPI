import { useState } from "react";
import {
	AlertErrorMessage,
	AlertImageLoading,
	AlertLoadingMessage,
} from "../../components/AlertMessage";
import { Filter } from "../../components/Filter";
import { MCTooltip } from "../../components/MCTooltip";
import { API_URL, FETCH_STATUS, PREFIX_MC } from "../../consts";
import { useFilterData } from "../../hooks/useFilterData";
import { useImageLoaded } from "../../hooks/useImageLoaded";
import { useQueryFilter } from "../../hooks/useQueryFilter";
import { useTooltip } from "../../hooks/useTooltip";
import { useMobs } from "../../services/useDatas";

const TYPE_STYLES = {
	ALL: {
		header: "bg-gray-600/25",
		hover: "hover:bg-gray-600/50",
	},
	PASSIVE: {
		header: "text-black bg-black/25",
		bg: "bg-black/10",
		hover: "hover:bg-black/50",
	},
	NEUTRAL: {
		header: "text-[#ffff55] bg-yellow-700/25",
		bg: "bg-yellow-700/10",
		hover: "hover:bg-yellow-700/50",
	},
	HOSTILE: {
		header: "text-white bg-red-600/25",
		bg: "bg-red-600/10",
		hover: "hover:bg-red-600/50",
	},
	BOSS: {
		header: "text-[#ff55ff] bg-gray-700",
		bg: "bg-gray-700/25",
		hover: "hover:bg-gray-700/50",
	},
};

function getTypeStyle(type) {
	const key = type?.toUpperCase?.() || "ALL";
	return TYPE_STYLES[key] || TYPE_STYLES.ALL;
}

function MobInformation({ data, tooltip, onLoad }) {
	return (
		<article
			className="w-full sm:w-[45%] lg:w-[30%] flex-col rounded-xl border border-black overflow-hidden max-h-[247px]"
			style={{ display: data.hidden ? "none" : "flex" }}
		>
			<h2
				className={`w-full text-center font-bold border-b border-black p-1 text-xl ${getTypeStyle(data.behavior).header}`}
			>
				{data.name}
			</h2>
			<div className="w-full flex flex-col xs:flex-row">
				<figure
					className={`flex-1 min-w-1/3 h-full border-b xs:border-b-0 xs:border-r border-black p-1 sm:p-2 flex items-center justify-center ${getTypeStyle(data.behavior).bg}`}
				>
					<img
						src={data.image}
						className={`object-cover xs:object-contain size-18 xs:size-48 mx-auto`}
						onLoad={onLoad}
						onError={onLoad}
						alt={`${data.name} mob image`}
						onMouseEnter={() => {
							tooltip.setVisible(true);
							tooltip.setContent(
								<>
									<h3 className="font-bold text-left underline italic">Hitboxes</h3>
									{Object.values(data.hitbox).map((hitbox, index) => {
										return (
											<div key={data.id + index} className="text-left gap-x-5">
												{hitbox.state && (
													<span>
														<b>{hitbox.state}</b>
														{" - "}
													</span>
												)}
												<span>
													<b>h: </b>
													{hitbox.height}
													{" - "}
												</span>
												<span>
													<b>w: </b>
													{hitbox.width}
												</span>
											</div>
										);
									})}
								</>
							);
						}}
						onMouseLeave={() => tooltip.setVisible(false)}
					/>
				</figure>
				<div className="flex flex-2 flex-col justify-between">
					<div className="p-1 text-sm">
						<p className="text-gray-800 underline">{PREFIX_MC + data.id}</p>
						<p>
							<b>Health: </b>
							{data.health_points} pts
						</p>
						<p>
							<b>Behavior: </b>
							{data.behavior}
						</p>
						<p>
							<b>Type: </b>
							{Array(data.type).join(", ")}
						</p>
						{data.speed && (
							<p>
								<b>Speed: </b>
								{data.speed}
							</p>
						)}
					</div>
					<button
						type="button"
						className="flex items-center self-center justify-center w-2/3 mb-2 text-center bg-gray-300 border-2 border-black rounded-lg cursor-pointer hover:border-white"
						onClick={() => {
							const path = `${API_URL}/mobs/${data.id}`;
							navigator.clipboard.writeText(path);
						}}
					>
						<i className="fa-regular fa-copy text-[16px] px-2" />
						<span className="text-[20px]">GET</span>
					</button>
				</div>
			</div>
		</article>
	);
}

export function MobsInformation() {
	const { datas, status } = useMobs();
	const { filteredDatas, filter, setFilter } = useFilterData(datas);
	const { updateFilter } = useQueryFilter("mob", setFilter);
	const tooltip = useTooltip();
	const { isAllImageLoaded, addImageLoaded } = useImageLoaded(datas.length);

	const [activeFilter, setActiveFilter] = useState("All");

	return (
		<>
			<MCTooltip tooltip={tooltip} />
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
						<h1 className="font-bold text-[20px] sm:text-[40px] text-center">Mobs</h1>
						<div className="w-full pb-4 justify-center items-center text-center">
							{["All", "Passive", "Neutral", "Hostile", "Boss"].map((type) => (
								<button
									key={type}
									className={`px-1 border w-1/3 sm:w-1/6 cursor-pointer
										${getTypeStyle(type).header} ${getTypeStyle(type).hover} ${activeFilter === type ? "outline" : ""}
										hover:outline border-black`}
									onClick={() => {
										if (type !== "All") setFilter("behavior", type);
										else setFilter("behavior", "");
										setActiveFilter(type);
									}}
								>
									{type || "All"}
								</button>
							))}
						</div>
						<Filter data="mob" value={filter} onChange={updateFilter} />
						<div className="w-full flex flex-wrap overflow-y-scroll h-[624px] my-4 gap-4 justify-center">
							{filteredDatas.map((data) => (
								<MobInformation
									key={data.id}
									data={data}
									tooltip={tooltip}
									onLoad={addImageLoaded}
								/>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
}
