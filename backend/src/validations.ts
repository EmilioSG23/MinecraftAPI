import advancementsData from "./data/advancements.json";
import biomesData from "./data/biomes.json";
import blocksData from "./data/blocks.json";
import itemsData from "./data/items.json";
import mobsData from "./data/mobs.json";
import structuresData from "./data/structures.json";
import type { Advancements, Biomes, Blocks, Items, Mobs, Structures } from "./data/interfaces";

export const advancements = advancementsData as Advancements[];
export const biomes = biomesData as Biomes[];
export const blocks = blocksData as Blocks[];
export const items = itemsData as Items[];
export const mobs = mobsData as Mobs[];
export const structures = structuresData as Structures[];
