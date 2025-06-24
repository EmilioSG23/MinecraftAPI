export type AdvancementTier = "Advancement" | "Goal" | "Challenge";
export type AdvancementInterface = "Minecraft" | "Nether" | "The End" | "Adventure" | "Husbandry";

/* In the future: include minecraftId: string */
export interface Advancements {
	id: string;
	title: string;
	description: string;
	tier: AdvancementTier; //Advancement, Goal, Challenge
	interface: AdvancementInterface; //Minecraft, Nether, The End, Adventure, Husbandry
	parent: string;
}

export interface Biomes {
	id: string;
	name: string;
	temperature: number;
	downfall: number;
	precipitation: boolean;
	blocks: string[];
	structures?: string[];
}

type Tier = "Uncommon" | "Common" | "Rare" | "Epic";
type Tool = "Axe" | "Hoe" | "Pickaxe" | "Shears" | "Sword" | "Shovel" | "";

export interface Blocks {
	id: string;
	name: string;
	tier: Tier; //Uncommon, Common, Rare, Epic
	renewable: boolean;
	tool: Tool; //Axe, Hoe, Pickaxe, Shears, Sword Shovel
	stackable: number;
	blastResistance: number;
	hardness: number;
	luminous: number;
	transparent: boolean;
	flammable: boolean;
	waterloggeable: boolean;
	recipe?: {
		ingredient_id: string[];
		shaped: boolean; //True shaped, False shapeless
	};
}

type Stackable = 1 | 16 | 64;

export interface Items {
	id: string;
	name: string;
	tier: Tier; //Uncommon, Common, Rare, Epic
	renewable: boolean;
	stackable: Stackable; //1, 16, 64
	armor?: number;
	durability?: number;
	flammable?: boolean;
	restores?: number;
	recipe?: {
		ingredient_id: string[];
		shaped: boolean; //True shaped, False shapeless
	};
}

type Behavior = "Passive" | "Neutral" | "Hostile" | "Boss";
type Type =
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
export type Drop = {
	id: string;
	min: number;
	max: number;
};

export interface Mobs {
	id: string;
	name: string;
	health_points: number;
	behavior: Behavior;
	type: Type[];
	speed?: number;
	hitbox: Hitbox[];
	drop: Drop[];
}

export type LootBox = {
	id: string;
	chance: number;
};
export interface Structures {
	id: string;
	name: string;
	biomes: string[];
	lootBox?: LootBox[];
}
