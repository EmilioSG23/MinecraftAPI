"use client";

/** Client view that renders the items catalogue. */
import { EntityListView } from "@/features/information/components/EntityListView";
import { ItemCard } from "@/features/information/components/cards/ItemCard";
import { useItems } from "@/features/information/hooks/useInformationData";

/**
 * Renders the items information grid.
 *
 * @returns Items entity list view.
 */
export function ItemsInformationClient() {
	return (
		<EntityListView
			title="Items"
			filterDataName="item"
			queryParam="item"
			useData={useItems}
			showTooltip
			renderCard={({ data, onLoad, tooltip }) => (
				<ItemCard data={data} onLoad={onLoad} tooltip={tooltip} />
			)}
		/>
	);
}
