import { useEffect, useState } from "react";
import { FETCH_STATUS } from "../consts";

function useDatas(type){
    const [datas, setDatas] = useState([]);
    const [status, setStatus] = useState(FETCH_STATUS.LOADING)

    useEffect(() => {
        fetch(`/api/${type}`).then((response) => response.json()).then((data) => {
            setDatas(data);
            setStatus(FETCH_STATUS.LOADED)
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setStatus(FETCH_STATUS.ERROR)
        });
    }, [type]);
    
    return {datas, status}
}

export function useAdvancements(){
    return useDatas("advancements")
}
export function useBiomes(){
    return useDatas("biomes")
}
export function useBlocks(){
    return useDatas("blocks")
}
export function useItems(){
    return useDatas("items")
}
export function useMobs(){
    return useDatas("mobs")
}
export function useStructures(){
    return useDatas("structures")
}