/** Domain types describing item dataset entries. */
import { Tier } from "@/types/tier";

/** Valid stack sizes used by Minecraft items in this dataset. */
type Stackable = 1 | 16 | 64;

/** Canonical item payload shape served by the API. */
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
