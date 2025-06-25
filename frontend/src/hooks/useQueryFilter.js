import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryFilter(paramName, setFilter) {
	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		setFilter(searchParams.get(paramName) || "");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paramName, searchParams]);

	const updateFilter = (value, key) => {
		setFilter(key, value);
		setSearchParams({ [paramName]: value });
	};
	return { updateFilter };
}
