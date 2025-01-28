export interface Items{
    id: string,
    name: string,
    tier: "Common" | "Uncommon" | "Rare" | "Epic",
    renewable: boolean,
    stackable: number,
    armor?: number,
    durability?: number,
    flammable?: boolean,
    restores?: number,
    recipe?: {
        ingredient_id: string[9],
        shaped: boolean, //True shaped, False shapeless
    }
}

export interface Blocks{
    id: string,
    name: string,
    tier: "Common" | "Uncommon" | "Rare" | "Epic",
    renewable: boolean,
    tool: "None" | "Axe" | "Hoe" | "Pickaxe" | "Shovel" | "Sword",
    stackable: number,
    blastResistance: number,
    hardness: number,
    luminous: boolean,
    transparent: boolean,
    flammable: boolean,
    waterloggeable: boolean,
    image: string,
    recipe?: {
        ingredient_id: string[9],
        shaped: boolean, //True shaped, False shapeless
    }
}

export interface Biomes{
    id: string,
    name: string,
    temperature: number,
    downfall: number,
    precipitation: boolean,
    blocks: string[],
    structures?: string[],
}

export interface Mobs{
    id: string,
    name: string,
    health_points: number,
    behavior: "Passive" | "Neutral" | "Hostile" | "Boss",
    type: Array<"Animal" | "Monster" | "Undead" | "Illager" | "Arthropod">,
    speed?: number,
    drop: Array<{
        id: string,
        min: number,
        max: number,
    }>
}

export interface Structures{
    id: string,
    name: string,
    biomes: string[],
    lootBox?: Array<{
        id: string,
        chance: number
    }>
}

export interface Advancements{
    id: string,
    title: string,
    description: string,
    tier: "Advancement" | "Goal" | "Challenge",
    interface: "Minecraft" | "Nether" | "The End" | "Adventure" | "Husbandry"
    parent: string,
}