export interface Biome {
	id: string;
	name: string;
	temperature: number;
	downfall: number;
	precipitation: boolean;
	blocks: string[];
	structures?: string[];
}
