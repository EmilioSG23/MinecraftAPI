/** Shared Minecraft domain types used by the API, docs and information feature. */

/** Supported rarity tiers used by items and blocks. */
export type Tier = "Uncommon" | "Common" | "Rare" | "Epic";

/** Supported advancement tiers shown by the UI. */
export type AdvancementTier = "Advancement" | "Goal" | "Challenge";
/** Supported advancement tab groups used by the filters. */
export type AdvancementInterface =
	| "Minecraft"
	| "Nether"
	| "The End"
	| "Adventure"
	| "Husbandry";

/** Canonical advancement payload shape served by the API. */
export interface Advancement {
	id: string;
	title: string;
	description: string;
	tier: AdvancementTier;
	interface: AdvancementInterface;
	parent: string;
}

/** Canonical biome payload shape served by the API. */
export interface Biome {
	id: string;
	name: string;
	temperature: number;
	downfall: number;
	precipitation: boolean;
	blocks: string[];
	structures?: string[];
}

type Tool = "Axe" | "Hoe" | "Pickaxe" | "Shears" | "Sword" | "Shovel" | "";

/** Canonical block payload shape served by the API. */
export interface Block {
	id: string;
	name: string;
	tier: Tier;
	renewable: boolean;
	tool: Tool;
	stackable: number;
	blastResistance: number;
	hardness: number;
	luminous: number;
	transparent: boolean;
	flammable: boolean;
	waterloggeable: boolean;
	recipe?: {
		ingredient_id: string[];
		shaped: boolean;
	};
}

type Stackable = 1 | 16 | 64;

/** Canonical item payload shape served by the API. */
export interface Item {
	id: string;
	name: string;
	tier: Tier;
	renewable: boolean;
	stackable: Stackable;
	armor?: number;
	durability?: number;
	flammable?: boolean;
	restores?: number;
	recipe?: {
		ingredient_id: string[];
		shaped: boolean;
	};
}

type Behavior = "Passive" | "Neutral" | "Hostile" | "Boss";
type MobKind =
	| "Animal"
	| "Monster"
	| "Aquatic"
	| "Illager"
	| "Ambient"
	| "Undead"
	| "Golem"
	| "NPC"
	| "Arthropod";

type Hitbox = {
	state?: string;
	height: number;
	width: number;
};

/** Item drop range obtained from a mob. */
export type Drop = {
	id: string;
	min: number;
	max: number;
};

/** Canonical mob payload shape served by the API. */
export interface Mob {
	id: string;
	name: string;
	health_points: number;
	behavior: Behavior;
	type: MobKind[];
	speed?: number;
	hitbox: Hitbox[];
	drop: Drop[];
}

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