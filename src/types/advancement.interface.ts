/** Domain types describing advancement dataset entries. */
/** Supported advancement tiers shown by the UI. */
export type AdvancementTier = "Advancement" | "Goal" | "Challenge";
/** Supported advancement tab groups used by the filters. */
export type AdvancementInterface = "Minecraft" | "Nether" | "The End" | "Adventure" | "Husbandry";

/* In the future: include minecraftId: string */
/** Canonical advancement payload shape served by the API. */
export interface Advancement {
	id: string;
	title: string;
	description: string;
	tier: AdvancementTier;
	interface: AdvancementInterface;
	parent: string;
}
