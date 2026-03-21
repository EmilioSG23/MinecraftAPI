"use client";

/** Client view that renders the advancements catalogue and its category filters. */
import { AdvancementCard } from "@/components/information/cards/AdvancementCard";
import { EntityListView } from "@/components/information/EntityListView";
import { useAdvancements } from "@/services/useDatas";
import { useState } from "react";

interface TypeStyle {
	style: string;
}

const TYPE_STYLES: Record<string, TypeStyle> = {
	ALL: { style: "bg-gray-600/25 hover:bg-gray-600/50" },
	MINECRAFT: { style: "bg-lime-300/25 hover:bg-lime-300/50" },
	NETHER: { style: "bg-red-400/25 hover:bg-red-400/50" },
	THE_END: { style: "bg-yellow-500/25 hover:bg-yellow-500/50" },
	ADVENTURE: { style: "bg-orange-500/25 hover:bg-orange-500/50" },
	HUSBANDRY: { style: "bg-blue-300/25 hover:bg-blue-300/50" },
};

/**
 * Maps an advancement interface label to its button styling.
 *
 * @param type Advancement interface name.
 * @returns Visual style definition for the filter button.
 */
function getTypeStyle(type: string): TypeStyle {
	if (type === "The End") return TYPE_STYLES.THE_END;
	const key = type?.toUpperCase?.() || "ALL";
	return TYPE_STYLES[key] || TYPE_STYLES.ALL;
}

/**
 * Renders the advancements page with interface-based quick filters.
 *
 * @returns Advancements entity list view.
 */
export function AdvancementsInformationClient() {
	const [activeFilter, setActiveFilter] = useState<string>("All");

	return (
		<EntityListView
			title="Advancements"
			filterDataName="advancement"
			queryParam="advancement"
			useData={useAdvancements}
			filterKey="title"
			listClassName="w-full flex flex-col overflow-y-scroll h-128 my-5 gap-y-10 sm:px-2"
			onRenderTopControls={({ setFilter }) => (
				<div className="w-full pb-4! justify-center items-center text-center">
					{["All", "Minecraft", "Nether", "The End", "Adventure", "Husbandry"].map((type) => (
						<button
							key={type}
							type="button"
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
			)}
			renderCard={({ data, onLoad }) => <AdvancementCard data={data} onLoad={onLoad} />}
		/>
	);
}
