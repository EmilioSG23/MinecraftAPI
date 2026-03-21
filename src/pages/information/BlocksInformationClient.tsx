"use client";

/** Client view that renders the blocks catalogue. */
import { BlockCard } from "@/components/information/cards/BlockCard";
import { EntityListView } from "@/components/information/EntityListView";
import { useBlocks } from "@/services/useDatas";

/**
 * Renders the blocks information grid.
 *
 * @returns Blocks entity list view.
 */
export function BlocksInformationClient() {
	return (
		<EntityListView
			title="Blocks"
			filterDataName="block"
			queryParam="block"
			useData={useBlocks}
			showTooltip
			renderCard={({ data, onLoad, tooltip }) => (
				<BlockCard data={data} onLoad={onLoad} tooltip={tooltip} />
			)}
		/>
	);
}
