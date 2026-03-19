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

export interface Mob {
	id: string;
	name: string;
	health_points: number;
	behavior: Behavior;
	type: Type[];
	speed?: number;
	hitbox: Hitbox[];
	drop: Drop[];
}
