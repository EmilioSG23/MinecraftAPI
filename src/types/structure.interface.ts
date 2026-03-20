/** Domain types describing structure dataset entries. */
/** Loot table entry associated with a structure. */
export type LootBox = {
	id: string;
	chance: number;
};
/** Canonical structure payload shape served by the API. */
export interface Structure {
	id: string;
	name: string;
	biomes: string[];
	lootBox?: LootBox[];
}
