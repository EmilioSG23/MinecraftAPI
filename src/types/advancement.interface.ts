export type AdvancementTier = "Advancement" | "Goal" | "Challenge";
export type AdvancementInterface = "Minecraft" | "Nether" | "The End" | "Adventure" | "Husbandry";

/* In the future: include minecraftId: string */
export interface Advancement {
	id: string;
	title: string;
	description: string;
	tier: AdvancementTier;
	interface: AdvancementInterface;
	parent: string;
}
