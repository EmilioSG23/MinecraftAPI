/** Static typed dataset exports kept for client-side fallbacks and validations. */
import advancementsData from "#/advancements.json";
import biomesData from "#/biomes.json";
import blocksData from "#/blocks.json";
import itemsData from "#/items.json";
import mobsData from "#/mobs.json";
import structuresData from "#/structures.json";

import { Advancement } from "@/types/advancement.interface";
import { Biome } from "@/types/biome.interface";
import { Block } from "@/types/block.interface";
import { Item } from "@/types/item.interface";
import { Mob } from "@/types/mob.interface";
import { Structure } from "@/types/structure.interface";

/** Typed advancements dataset loaded from the bundled JSON file. */
export const advancements = advancementsData as Advancement[];
/** Typed biomes dataset loaded from the bundled JSON file. */
export const biomes = biomesData as Biome[];
/** Typed blocks dataset loaded from the bundled JSON file. */
export const blocks = blocksData as Block[];
/** Typed items dataset loaded from the bundled JSON file. */
export const items = itemsData as Item[];
/** Typed mobs dataset loaded from the bundled JSON file. */
export const mobs = mobsData as Mob[];
/** Typed structures dataset loaded from the bundled JSON file. */
export const structures = structuresData as Structure[];
