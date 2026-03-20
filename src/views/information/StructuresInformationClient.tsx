"use client";

import { EntityListView } from "@/components/information/EntityListView";
import { StructureCard } from "@/components/information/cards/StructureCard";
import { useStructures } from "@/services/useDatas";

/** Client view for structures information. */
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
