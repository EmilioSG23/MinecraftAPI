"use client";

/** Client view that renders the structures catalogue. */
import { EntityListView } from "@/features/information/components/EntityListView";
import { StructureCard } from "@/features/information/components/cards/StructureCard";
import { useStructures } from "@/features/information/hooks/useInformationData";

/**
 * Renders the structures information grid.
 *
 * @returns Structures entity list view.
 */
export function StructuresInformationClient() {
	return (
		<EntityListView
			title="Structures"
			filterDataName="structure"
			queryParam="structure"
			useData={useStructures}
			listClassName="w-full flex flex-wrap overflow-y-scroll h-156 my-5 gap-y-10 justify-center"
			renderCard={({ data, onLoad }) => <StructureCard data={data} onLoad={onLoad} />}
		/>
	);
}
