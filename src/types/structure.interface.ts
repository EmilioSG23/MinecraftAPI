export type LootBox = {
	id: string;
	chance: number;
};
export interface Structure {
	id: string;
	name: string;
	biomes: string[];
	lootBox?: LootBox[];
}
