import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryFilter(paramName, setFilter) {
	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		setFilter(searchParams.get(paramName) || "");
	}, [paramName, searchParams, setFilter]);

	const updateFilter = (value) => {
		setFilter(value);
		setSearchParams({ [paramName]: value });
	};
	return { updateFilter };
}
