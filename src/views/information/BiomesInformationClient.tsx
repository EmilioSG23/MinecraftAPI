"use client";

/** Client view that renders the biomes catalogue. */
import { BiomeCard } from "@/components/information/cards/BiomeCard";
import { EntityListView } from "@/components/information/EntityListView";
import { useBiomes } from "@/services/useDatas";

/**
 * Renders the biomes information list.
 *
 * @returns Biomes entity list view.
 */
export function BiomesInformationClient() {
	return (
		<EntityListView
			title="Biomes"
			filterDataName="biome"
			queryParam="biome"
			useData={useBiomes}
			showTooltip
			listClassName="w-full flex flex-wrap overflow-y-scroll h-156 my-5 gap-4 justify-center"
			renderCard={({ data, onLoad, tooltip }) => (
				<BiomeCard data={data} onLoad={onLoad} tooltip={tooltip} />
			)}
		/>
	);
}
