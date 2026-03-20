import type { Advancement } from "@/types/advancement.interface";
import type { Biome } from "@/types/biome.interface";
import type { Block } from "@/types/block.interface";
import type { Item } from "@/types/item.interface";
import type { Mob } from "@/types/mob.interface";
import type { Structure } from "@/types/structure.interface";
import { FETCH_STATUS } from "@/utils/consts";
import { useEffect, useState } from "react";

export type FetchStatus = (typeof FETCH_STATUS)[keyof typeof FETCH_STATUS];
export type EntityWithImage<T> = T & { image: string };

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
 */
function useFetch<T>(url: string): UseFetchResult<T> {
	const [datas, setDatas] = useState<EntityWithImage<T>[]>([]);
	const [status, setStatus] = useState(FETCH_STATUS.LOADING);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [requestKey, setRequestKey] = useState(0);

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

/** Returns advancements list hook. */
export function useAdvancements(): UseFetchResult<Advancement> {
	return useFetch<Advancement>("advancements");
}

/** Returns biomes list hook. */
export function useBiomes(): UseFetchResult<Biome> {
	return useFetch<Biome>("biomes");
}

/** Returns blocks list hook. */
export function useBlocks(): UseFetchResult<Block> {
	return useFetch<Block>("blocks");
}

/** Returns items list hook. */
export function useItems(): UseFetchResult<Item> {
	return useFetch<Item>("items");
}

/** Returns mobs list hook. */
export function useMobs(): UseFetchResult<Mob> {
	return useFetch<Mob>("mobs");
}

/** Returns structures list hook. */
export function useStructures(): UseFetchResult<Structure> {
	return useFetch<Structure>("structures");
}
