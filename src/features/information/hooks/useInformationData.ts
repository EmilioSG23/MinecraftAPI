/** Entity-fetching hooks used exclusively by the information feature. */
import { FETCH_STATUS, type FetchStatus } from "@/features/information/constants";
import type { Advancement, Biome, Block, Item, Mob, Structure } from "@/shared/minecraft/types";
import { useEffect, useState } from "react";

/** Entity shape enriched with the absolute image URL produced by the API. */
export type EntityWithImage<T> = T & { image: string };

/** Standard result object returned by each entity-fetching hook. */
export interface UseFetchResult<T> {
	datas: EntityWithImage<T>[];
	status: FetchStatus;
	errorMessage: string | null;
	refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
	const [datas, setDatas] = useState<EntityWithImage<T>[]>([]);
	const [status, setStatus] = useState<FetchStatus>(FETCH_STATUS.LOADING);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [requestKey, setRequestKey] = useState(0);

	const refetch = () => {
		setRequestKey((prev) => prev + 1);
	};

	useEffect(() => {
		setStatus(FETCH_STATUS.LOADING);
		setErrorMessage(null);
		fetch(`/api/${url}`)
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok) {
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

export function useAdvancements(): UseFetchResult<Advancement> {
	return useFetch<Advancement>("advancements");
}

export function useBiomes(): UseFetchResult<Biome> {
	return useFetch<Biome>("biomes");
}

export function useBlocks(): UseFetchResult<Block> {
	return useFetch<Block>("blocks");
}

export function useItems(): UseFetchResult<Item> {
	return useFetch<Item>("items");
}

export function useMobs(): UseFetchResult<Mob> {
	return useFetch<Mob>("mobs");
}

export function useStructures(): UseFetchResult<Structure> {
	return useFetch<Structure>("structures");
}
