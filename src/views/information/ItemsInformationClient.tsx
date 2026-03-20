"use client";

import { EntityListView } from "@/components/information/EntityListView";
import { ItemCard } from "@/components/information/cards/ItemCard";
import { useItems } from "@/services/useDatas";

/** Client view for items information. */
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
