/** Domain types describing biome dataset entries. */
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
