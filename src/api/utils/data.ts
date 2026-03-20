/** Disk-loading helpers for the read-only JSON datasets used by the API. */
import { readFile } from "fs/promises";
import path from "path";

/** Maps each supported entity type to the JSON file that stores its dataset. */
export const ENTITY_DATA_FILES = {
	blocks: "blocks.json",
	items: "items.json",
	mobs: "mobs.json",
	biomes: "biomes.json",
	advancements: "advancements.json",
	structures: "structures.json",
} as const;

export type EntityDataType = keyof typeof ENTITY_DATA_FILES;

/** Generic shape required by the entity router. */
export type EntityDataItem = { id: string; [key: string]: unknown };
type DataCollection = Record<string, unknown> | EntityDataItem[];

const dataCache = new Map<string, EntityDataItem[]>();

/**
 * Safely reads and parses a JSON file, returning null when the file is absent or invalid.
 *
 * @param filePath Absolute path to the JSON file.
 * @returns Parsed JSON payload or null when the operation fails.
 */
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
 *
 * @param entity Entity collection name requested by the API route.
 * @returns Cached entity list, resolved dataset from disk or null when unsupported.
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

/**
 * Runtime guard that narrows a raw path segment to a supported entity type.
 *
 * @param entity Raw entity segment extracted from the route.
 * @returns True when the entity has a mapped dataset file.
 */
export function isEntityDataType(entity: string): entity is EntityDataType {
	return entity in ENTITY_DATA_FILES;
}
