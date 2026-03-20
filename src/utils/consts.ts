/** Shared constants that define routing, entity names and static version metadata. */
import menuText from "@/assets/menuTexts.json";

/** Base API path used by the client-side application. */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

/** Latest Minecraft version covered by the bundled datasets. */
export const MC_VERSION = "1.19";
/** Public version identifier for the API contract. */
export const API_VERSION = "1.0";

/** Standard fetch lifecycle labels used by the data hooks. */
export const FETCH_STATUS = {
	LOADED: "loaded",
	LOADING: "loading",
	ERROR: "error",
};

/** Section ids used by the header state. */
export const SECTIONS = {
	information: "information",
	terminal: "terminal",
	documentation: "documentation",
};

/** Prefix prepended to Minecraft ids when shown to the user. */
export const PREFIX_MC = "minecraft:";

/** Canonical entity route names supported by the API and information pages. */
export const DATAS_TYPE = {
	advancements: "advancements",
	biomes: "biomes",
	blocks: "blocks",
	items: "items",
	mobs: "mobs",
	structures: "structures",
} as const;

/** Alias maintained for semantic clarity in documentation-related code. */
export const ENTITY_TYPES = DATAS_TYPE;

/** Human-friendly labels for each entity type. */
export const ENTITY_LABELS: Record<keyof typeof ENTITY_TYPES, string> = {
	advancements: "Advancements",
	biomes: "Biomes",
	blocks: "Blocks",
	items: "Items",
	mobs: "Mobs",
	structures: "Structures",
};

/** Union of all supported entity type names. */
export type EntityType = keyof typeof ENTITY_TYPES;

/** Randomized splash texts displayed next to the homepage logo. */
export const MENU_TEXTS = menuText;
