export interface Advancements{
    id: string,
    title: string,
    description: string,
    tier: string,
    interface: string,
    parent: string,
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

export interface Blocks{
    id: string,
    name: string,
    tier: string,
    renewable: boolean,
    tool: string,
    stackable: number,
    blastResistance: number,
    hardness: number,
    luminous: number,
    transparent: boolean,
    flammable: boolean,
    waterloggeable: boolean,
    recipe?: {
        ingredient_id: string[],
        shaped: boolean, //True shaped, False shapeless
    }
}

export interface Items{
    id: string,
    name: string,
    tier: string,
    renewable: boolean,
    stackable: number,
    armor?: number,
    durability?: number,
    flammable?: boolean,
    restores?: number,
    recipe?: {
        ingredient_id: string[],
        shaped: boolean, //True shaped, False shapeless
    }
}

export interface Mobs{
    id: string,
    name: string,
    health_points: number,
    behavior: string,
    type: Array<string>,
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

