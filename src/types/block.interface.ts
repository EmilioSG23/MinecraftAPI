/** Domain types describing block dataset entries. */
import { Tier } from "@/types/tier";

/** Allowed tool names for harvesting blocks. */
type Tool = "Axe" | "Hoe" | "Pickaxe" | "Shears" | "Sword" | "Shovel" | "";

/** Canonical block payload shape served by the API. */
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
