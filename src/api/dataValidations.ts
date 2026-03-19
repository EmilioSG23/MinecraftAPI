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

export const advancements = advancementsData as Advancement[];
export const biomes = biomesData as Biome[];
export const blocks = blocksData as Block[];
export const items = itemsData as Item[];
export const mobs = mobsData as Mob[];
export const structures = structuresData as Structure[];
