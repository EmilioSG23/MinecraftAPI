import { useEffect, useState } from "react";
import { DATAS_TYPE, FETCH_STATUS } from "../consts";

export async function obtainDatasByURL(url) {
	try {
		const response = await fetch(`/api/${url}`);
		const data = await response.json();
		return { data, status: response.status };
	} catch (e) {
		return { data: "Unexpected Error 400 occurred. Check again your input command or use /help.", status: 400 };
	}
}

function useDatas(url) {
	const [datas, setDatas] = useState([]);
	const [status, setStatus] = useState(FETCH_STATUS.LOADING);

	useEffect(() => {
		obtainDatasByURL(url)
			.then(({ data, status }) => {
				setDatas(data);
				setStatus(status === 200 ? FETCH_STATUS.LOADED : FETCH_STATUS.ERROR);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setStatus(FETCH_STATUS.ERROR);
			});
	}, [url]);

	return { datas, status };
}

function useAllDatas(type) {
	return useDatas(`${type}`);
}

export function useAdvancements() {
	return useAllDatas(DATAS_TYPE.advancements);
}
export function useBiomes() {
	return useAllDatas(DATAS_TYPE.biomes);
}
export function useBlocks() {
	return useAllDatas(DATAS_TYPE.blocks);
}
export function useItems() {
	return useAllDatas(DATAS_TYPE.items);
}
export function useMobs() {
	return useAllDatas(DATAS_TYPE.mobs);
}
export function useStructures() {
	return useAllDatas(DATAS_TYPE.structures);
}
