/** Entity-fetching services shared by the information pages and terminal helpers. */
import type { Advancement } from "@/types/advancement.interface";
import type { Biome } from "@/types/biome.interface";
import type { Block } from "@/types/block.interface";
import type { Item } from "@/types/item.interface";
import type { Mob } from "@/types/mob.interface";
import type { Structure } from "@/types/structure.interface";
import { FETCH_STATUS } from "@/utils/consts";
import { useEffect, useState } from "react";

/** Union of all possible fetch status values exposed by the service hooks. */
export type FetchStatus = (typeof FETCH_STATUS)[keyof typeof FETCH_STATUS];
/** Entity shape enriched with the absolute image URL produced by the API. */
export type EntityWithImage<T> = T & { image: string };

/** Standard result object returned by each entity-fetching hook. */
export interface UseFetchResult<T> {
	datas: EntityWithImage<T>[];
	status: FetchStatus;
	errorMessage: string | null;
	refetch: () => void;
}

interface FetchByUrlResult {
	data: any;
	status: number;
}

/**
 * Fetches a specific API URL and returns both payload and status code.
 *
 * @param url Relative API path without the /api prefix.
 * @returns Parsed payload together with the raw HTTP status code.
 */
export async function obtainDatasByURL(url: string): Promise<FetchByUrlResult> {
	try {
		const response = await fetch(`/api/${url}`);
		const data = await response.json();
		return { data, status: response.status };
	} catch (e) {
		return { data: `Unexpected Error 400 occurred. ${e}.`, status: 400 };
	}
}

/**
 * Generic entity fetch hook used by all information sections.
 *
 * @param url Relative API path representing the requested entity collection.
 * @returns Normalized loading state, data and retry callback.
 */
function useFetch<T>(url: string): UseFetchResult<T> {
	const [datas, setDatas] = useState<EntityWithImage<T>[]>([]);
	const [status, setStatus] = useState(FETCH_STATUS.LOADING);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [requestKey, setRequestKey] = useState(0);

	/** Triggers a new fetch cycle without changing the target endpoint. */
	const refetch = () => {
		setRequestKey((prev) => prev + 1);
	};

	useEffect(() => {
		setStatus(FETCH_STATUS.LOADING);
		setErrorMessage(null);
		fetch(`/api/${url}`)
			.then(async (res) => {
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data?.message || "Unexpected API error");
				}
				return data;
			})
			.then((data) => {
				setDatas(Array.isArray(data) ? data : []);
				setStatus(FETCH_STATUS.LOADED);
			})
			.catch((error: unknown) => {
				const message = error instanceof Error ? error.message : "Failed to fetch entity data";
				setErrorMessage(message);
				setStatus(FETCH_STATUS.ERROR);
			});
	}, [url, requestKey]);

	return { datas, status, errorMessage, refetch };
}

/**
 * Fetches the advancements collection.
 *
 * @returns Advancements list query state.
 */
export function useAdvancements(): UseFetchResult<Advancement> {
	return useFetch<Advancement>("advancements");
}

/**
 * Fetches the biomes collection.
 *
 * @returns Biomes list query state.
 */
export function useBiomes(): UseFetchResult<Biome> {
	return useFetch<Biome>("biomes");
}

/**
 * Fetches the blocks collection.
 *
 * @returns Blocks list query state.
 */
export function useBlocks(): UseFetchResult<Block> {
	return useFetch<Block>("blocks");
}

/**
 * Fetches the items collection.
 *
 * @returns Items list query state.
 */
export function useItems(): UseFetchResult<Item> {
	return useFetch<Item>("items");
}

/**
 * Fetches the mobs collection.
 *
 * @returns Mobs list query state.
 */
export function useMobs(): UseFetchResult<Mob> {
	return useFetch<Mob>("mobs");
}

/**
 * Fetches the structures collection.
 *
 * @returns Structures list query state.
 */
export function useStructures(): UseFetchResult<Structure> {
	return useFetch<Structure>("structures");
}
