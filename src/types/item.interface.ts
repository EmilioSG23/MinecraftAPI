import { Tier } from "@/types/tier";

type Stackable = 1 | 16 | 64;

export interface Item {
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
