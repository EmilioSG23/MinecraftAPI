import { useEffect, useState } from "react";
import { FETCH_STATUS } from "../consts";

export function useDatas(url){
    const [datas, setDatas] = useState([]);
    const [status, setStatus] = useState(FETCH_STATUS.LOADING)

    useEffect(() => {
        fetch(`/api/${url}`).then((response) => response.json()).then((data) => {
            setDatas(data);
            setStatus(FETCH_STATUS.LOADED)
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setStatus(FETCH_STATUS.ERROR)
        });
    }, [url]);
    
    return {datas, status}
}

function useAllDatas(type){
    return useDatas(`${type}`)
}

export function useAdvancements(){
    return useAllDatas("advancements")
}
export function useBiomes(){
    return useAllDatas("biomes")
}
export function useBlocks(){
    return useAllDatas("blocks")
}
export function useItems(){
    return useAllDatas("items")
}
export function useMobs(){
    return useAllDatas("mobs")
}
export function useStructures(){
    return useAllDatas("structures")
}