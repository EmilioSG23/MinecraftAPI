"use client";

/** Client view that renders the items catalogue. */
import { EntityListView } from "@/components/information/EntityListView";
import { ItemCard } from "@/components/information/cards/ItemCard";
import { useItems } from "@/services/useDatas";

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
