/** Helpers for styling Minecraft rarity tiers in information UIs. */
const TIER_COLOR: Record<string, string> = {
	COMMON: "text-white",
	UNCOMMON: "text-[#ffff55]",
	RARE: "text-[#55ffff]",
	EPIC: "text-[#ff55ff]",
};

/**
 * Returns Tailwind text color class for a Minecraft rarity tier.
 *
 * @param tier Rarity tier string coming from an item or block dataset entry.
 * @returns Tailwind class that colors the tier label consistently.
 */
export function getTierColor(tier: string): string {
	switch (tier.toLowerCase()) {
		case "uncommon":
			return TIER_COLOR.UNCOMMON;
		case "rare":
			return TIER_COLOR.RARE;
		case "epic":
			return TIER_COLOR.EPIC;
		default:
			return TIER_COLOR.COMMON;
	}
}
