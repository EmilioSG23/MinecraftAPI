/** Domain types describing mob dataset entries. */
/** Supported mob behavior categories shown by the UI filters. */
type Behavior = "Passive" | "Neutral" | "Hostile" | "Boss";
/** Supported mob taxonomy categories. */
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

/** Hitbox dimensions for a mob state. */
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
	type: Type[];
	speed?: number;
	hitbox: Hitbox[];
	drop: Drop[];
}
