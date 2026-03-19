import { useMemo, useState } from "react";

interface FilterableData {
	[key: string]: any;
}

interface FilteredData extends FilterableData {
	hidden: boolean;
}

export function useFilterData<T extends FilterableData>(datas: T[] = [], defaultKey = "name") {
	const [filters, setFilters] = useState<Record<string, string>>({ [defaultKey]: "" });

	const setFilter = (key: string, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const filteredDatas = useMemo(() => {
		if (!Array.isArray(datas)) return [] as (T & FilteredData)[];

		return datas.map((data) => {
			let visible = true;

			for (const [key, value] of Object.entries(filters)) {
				if (value && !data[key]?.toLowerCase?.().includes(value.toLowerCase())) {
					visible = false;
					break;
				}
			}

			return { ...data, hidden: !visible } as T & FilteredData;
		});
	}, [datas, filters]);

	return { filteredDatas, filters, setFilter };
}
