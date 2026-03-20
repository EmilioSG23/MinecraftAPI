"use client";

import { EntityListView } from "@/components/information/EntityListView";
import { MobCard, getMobTypeStyle } from "@/components/information/cards/MobCard";
import { useMobs } from "@/services/useDatas";
import { useState } from "react";

/** Client view for mobs information. */
export function MobsInformationClient() {
	const [activeFilter, setActiveFilter] = useState<string>("All");

	return (
		<EntityListView
			title="Mobs"
			filterDataName="mob"
			queryParam="mob"
			useData={useMobs}
			showTooltip
			containerClassName="max-h-[85vh]"
			listClassName="w-full flex flex-wrap overflow-y-scroll h-156 my-4 gap-4 justify-center"
			onRenderTopControls={({ setFilter }) => (
				<div className="w-full pb-4 justify-center items-center text-center">
					{["All", "Passive", "Neutral", "Hostile", "Boss"].map((type) => (
						<button
							key={type}
							type="button"
							className={`px-1 border w-1/3 sm:w-1/6 cursor-pointer
							${getMobTypeStyle(type).header} ${getMobTypeStyle(type).hover} ${activeFilter === type ? "outline" : ""}
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
			)}
			renderCard={({ data, onLoad, tooltip }) => (
				<MobCard data={data} onLoad={onLoad} tooltip={tooltip} />
			)}
		/>
	);
}
