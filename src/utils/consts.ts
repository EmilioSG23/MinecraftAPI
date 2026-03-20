import menuText from "@/assets/menuTexts.json";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const MC_VERSION = "1.19";
export const API_VERSION = "1.0";

export const FETCH_STATUS = {
	LOADED: "loaded",
	LOADING: "loading",
	ERROR: "error",
};

export const SECTIONS = {
	information: "information",
	terminal: "terminal",
	documentation: "documentation",
};

export const PREFIX_MC = "minecraft:";

export const DATAS_TYPE = {
	advancements: "advancements",
	biomes: "biomes",
	blocks: "blocks",
	items: "items",
	mobs: "mobs",
	structures: "structures",
} as const;

export const ENTITY_TYPES = DATAS_TYPE;

export const ENTITY_LABELS: Record<keyof typeof ENTITY_TYPES, string> = {
	advancements: "Advancements",
	biomes: "Biomes",
	blocks: "Blocks",
	items: "Items",
	mobs: "Mobs",
	structures: "Structures",
};

export type EntityType = keyof typeof ENTITY_TYPES;

export const MENU_TEXTS = menuText;
