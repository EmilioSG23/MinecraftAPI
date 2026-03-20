import { readFile } from "fs/promises";
import path from "path";

export const ENTITY_DATA_FILES = {
	blocks: "blocks.json",
	items: "items.json",
	mobs: "mobs.json",
	biomes: "biomes.json",
	advancements: "advancements.json",
	structures: "structures.json",
} as const;

export type EntityDataType = keyof typeof ENTITY_DATA_FILES;

export type EntityDataItem = { id: string; [key: string]: unknown };
type DataCollection = Record<string, unknown> | EntityDataItem[];

const dataCache = new Map<string, EntityDataItem[]>();

async function safeReadJson(filePath: string): Promise<DataCollection | null> {
	try {
		const raw = await readFile(filePath, "utf8");
		return JSON.parse(raw) as DataCollection;
	} catch {
		return null;
	}
}

/**
 * Loads and caches entity JSON data from data directory.
 */
export async function loadEntityData(entity: string): Promise<EntityDataItem[] | null> {
	if (!(entity in ENTITY_DATA_FILES)) {
		return null;
	}

	const cached = dataCache.get(entity);
	if (cached) return cached;

	const typedEntity = entity as EntityDataType;
	const candidate = path.join(process.cwd(), "data", ENTITY_DATA_FILES[typedEntity]);

	const candidateData = await safeReadJson(candidate);
	if (Array.isArray(candidateData) && candidateData.length > 0) {
		dataCache.set(entity, candidateData as EntityDataItem[]);
		return candidateData as EntityDataItem[];
	}

	const rootDataPaths = [
		path.join(process.cwd(), "data.json"),
		path.join(process.cwd(), "data", "data.json"),
	];

	for (const rootDataPath of rootDataPaths) {
		const loaded = await safeReadJson(rootDataPath);
		if (!loaded) continue;

		if (Array.isArray(loaded)) {
			dataCache.set(entity, loaded as EntityDataItem[]);
			return loaded as EntityDataItem[];
		}

		const directEntity = loaded[entity];
		if (Array.isArray(directEntity)) {
			dataCache.set(entity, directEntity as EntityDataItem[]);
			return directEntity as EntityDataItem[];
		}

		const pluralEntity = loaded[`${entity}s`];
		if (Array.isArray(pluralEntity)) {
			dataCache.set(entity, pluralEntity as EntityDataItem[]);
			return pluralEntity as EntityDataItem[];
		}
	}

	return null;
}

/** Runtime guard for supported entity names. */
export function isEntityDataType(entity: string): entity is EntityDataType {
	return entity in ENTITY_DATA_FILES;
}
