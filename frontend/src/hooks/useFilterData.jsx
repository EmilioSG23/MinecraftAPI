import { useMemo, useState } from "react";

export function useFilterData(datas, key = "name"){
    const [filter, setFilter] = useState("");
    
    const filteredDatas = useMemo(() => {
        return datas.map(data => ({
            ...data,
            hidden: filter ? !data[key].toLowerCase().includes(filter.toLowerCase()) : false
        }));
    }, [datas, filter]);

    return {filteredDatas, filter, setFilter}
}