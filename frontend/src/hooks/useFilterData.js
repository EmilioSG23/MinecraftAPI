import { useMemo, useState } from "react";

export function useFilterData(datas = [], defaultKey = "name") {
	const [filters, setFilters] = useState({ [defaultKey]: "" });

	const setFilter = (key, value) => {
		console.log(key, value);
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const filteredDatas = useMemo(() => {
		if (!Array.isArray(datas)) return [];

		return datas.map((data) => {
			let visible = true;

			for (const [key, value] of Object.entries(filters)) {
				if (value && !data[key]?.toLowerCase?.().includes(value.toLowerCase())) {
					visible = false;
					break;
				}
			}

			return { ...data, hidden: !visible };
		});
	}, [datas, filters]);

	return { filteredDatas, filters, setFilter };
}
