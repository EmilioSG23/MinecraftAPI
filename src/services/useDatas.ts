import { FETCH_STATUS } from "@/consts";
import type { Advancement } from "@/types/advancement.interface";
import type { Biome } from "@/types/biome.interface";
import type { Block } from "@/types/block.interface";
import type { Item } from "@/types/item.interface";
import type { Mob } from "@/types/mob.interface";
import type { Structure } from "@/types/structure.interface";
import { useEffect, useState } from "react";

interface UseFetchResult<T> {
	datas: T[];
	status: string;
}

interface FetchByUrlResult {
	data: any;
	status: number;
}

export async function obtainDatasByURL(url: string): Promise<FetchByUrlResult> {
	try {
		const response = await fetch(`/api/${url}`);
		const data = await response.json();
		return { data, status: response.status };
	} catch (e) {
		return { data: `Unexpected Error 400 occurred. ${e}.`, status: 400 };
	}
}

function useFetch<T>(url: string): UseFetchResult<T> {
	const [datas, setDatas] = useState<T[]>([]);
	const [status, setStatus] = useState(FETCH_STATUS.LOADING);

	useEffect(() => {
		setStatus(FETCH_STATUS.LOADING);
		fetch(`/api/${url}`)
			.then((res) => res.json())
			.then((data) => {
				setDatas(data);
				setStatus(FETCH_STATUS.LOADED);
			})
			.catch(() => {
				setStatus(FETCH_STATUS.ERROR);
			});
	}, [url]);

	return { datas, status };
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
