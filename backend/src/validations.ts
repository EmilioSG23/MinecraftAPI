import advancementsData from "./data/advancements.json";
import biomesData from "./data/biomes.json";
import blocksData from "./data/blocks.json";
import { Advancements, Biomes, Blocks, Items, Mobs, Structures } from "./data/interfaces";
import itemsData from "./data/items.json";
import mobsData from "./data/mobs.json";
import structuresData from "./data/structures.json";

//Validations
function validateData<T>(data: any[], isValid: (item: any) => item is T): T[] {
	return data.filter(isValid);
}

const isAdvancement = (item: any): item is Advancements => {
	return (
		typeof item.id === "string" &&
		typeof item.title === "string" &&
		typeof item.description === "string" &&
		["Advancement", "Goal", "Challenge"].includes(item.tier) &&
		["Minecraft", "Nether", "The End", "Adventure", "Husbandry"].includes(item.interface) &&
		typeof item.parent === "string"
	);
};

const isBiome = (item: any): item is Biomes => {
	return (
		typeof item.id === "string" &&
		typeof item.name === "string" &&
		typeof item.temperature === "number" &&
		typeof item.downfall === "number" &&
		typeof item.precipitation === "boolean" &&
		Array.isArray(item.blocks) &&
		item.blocks.every((b: any) => typeof b === "string") &&
		(item.structures === undefined ||
			(Array.isArray(item.structures) && item.structures.every((s: any) => typeof s === "string")))
	);
};

const isBlock = (item: any): item is Blocks => {
	return (
		typeof item.id === "string" &&
		typeof item.name === "string" &&
		["Uncommon", "Common", "Rare", "Epic"].includes(item.tier) &&
		typeof item.renewable === "boolean" &&
		["Axe", "Hoe", "Pickaxe", "Shears", "Sword", "Shovel", ""].includes(item.tool) &&
		typeof item.stackable === "number" &&
		[1, 16, 64].includes(item.stackable) &&
		typeof item.blastResistance === "number" &&
		typeof item.hardness === "number" &&
		typeof item.luminous === "number" &&
		typeof item.transparent === "boolean" &&
		typeof item.flammable === "boolean" &&
		typeof item.waterloggeable === "boolean" &&
		(item.recipe === undefined ||
			(Array.isArray(item.recipe.ingredient_id) &&
				item.recipe.ingredient_id.every((id: any) => typeof id === "string") &&
				typeof item.recipe.shaped === "boolean"))
	);
};

const isItem = (item: any): item is Items => {
	return (
		typeof item.id === "string" &&
		typeof item.name === "string" &&
		["Uncommon", "Common", "Rare", "Epic"].includes(item.tier) &&
		typeof item.renewable === "boolean" &&
		[1, 16, 64].includes(item.stackable) &&
		(item.armor === undefined || typeof item.armor === "number") &&
		(item.durability === undefined || typeof item.durability === "number") &&
		(item.flammable === undefined || typeof item.flammable === "boolean") &&
		(item.restores === undefined || typeof item.restores === "number") &&
		(item.recipe === undefined ||
			(Array.isArray(item.recipe.ingredient_id) &&
				item.recipe.ingredient_id.every((id: any) => typeof id === "string") &&
				typeof item.recipe.shaped === "boolean"))
	);
};

const isMob = (item: any): item is Mobs => {
	return (
		typeof item.id === "string" &&
		typeof item.name === "string" &&
		typeof item.health_points === "number" &&
		["Passive", "Neutral", "Hostile", "Boss"].includes(item.behavior) &&
		Array.isArray(item.type) &&
		item.type.every((t: any) => ["Animal", "Monster", "Aquatic", "Illager"].includes(t)) &&
		(item.speed === undefined || typeof item.speed === "number") &&
		Array.isArray(item.drop) &&
		item.drop.every(
			(dropItem: any) =>
				typeof dropItem.id === "string" && typeof dropItem.min === "number" && typeof dropItem.max === "number"
		)
	);
};

const isStructure = (item: any): item is Structures => {
	return (
		typeof item.id === "string" &&
		typeof item.name === "string" &&
		Array.isArray(item.biomes) &&
		item.biomes.every((b: any) => typeof b === "string") &&
		(item.lootBox === undefined ||
			(Array.isArray(item.lootBox) &&
				item.lootBox.every((loot: any) => typeof loot.id === "string" && typeof loot.chance === "number")))
	);
};

export const advancements = validateData<Advancements>(advancementsData, isAdvancement);
export const biomes = validateData<Biomes>(biomesData, isBiome);
export const blocks = validateData<Blocks>(blocksData, isBlock);
export const items = validateData<Items>(itemsData, isItem);
export const mobs = validateData<Mobs>(mobsData, isMob);
export const structures = validateData<Structures>(structuresData, isStructure);
