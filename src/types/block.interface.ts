import { Tier } from "@/types/tier";

type Tool = "Axe" | "Hoe" | "Pickaxe" | "Shears" | "Sword" | "Shovel" | "";

export interface Block {
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
