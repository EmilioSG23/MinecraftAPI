import { useMemo, useState } from "react";

export function useFilterData(datas = [], key = "name") {
	const [filter, setFilter] = useState("");

	const filteredDatas = useMemo(() => {
		if (Array.isArray(datas)) {
			return datas.map((data) => ({
				...data,
				hidden: filter ? !data[key].toLowerCase().includes(filter.toLowerCase()) : false,
			}));
		}
		return [];
	}, [datas, filter, key]);

	return { filteredDatas, filter, setFilter };
}
