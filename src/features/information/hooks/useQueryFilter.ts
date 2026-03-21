"use client";

/** URL synchronization hook for entity list filters. */
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Synchronizes a filter value with URL query parameters.
 *
 * @param paramName Query-string key synchronized with the filter state.
 * @param setFilter State setter from useFilterData.
 * @param filterKey Data property associated with the main text filter.
 * @returns Helper used by inputs to update both local filter state and the URL.
 */
export function useQueryFilter(
	paramName: string,
	setFilter: (key: string, value: string) => void,
	filterKey = "name",
) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		setFilter(filterKey, searchParams?.get(paramName) || "");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paramName, searchParams]);

	/**
	 * Updates the filter state and mirrors the primary filter in the query string.
	 *
	 * @param value New filter value.
	 * @param key Filter key that should receive the value.
	 */
	const updateFilter = (value: string, key: string) => {
		setFilter(key, value);
		if (key !== filterKey) return;
		const params = new URLSearchParams(searchParams?.toString() || "");
		if (value) params.set(paramName, value);
		else params.delete(paramName);
		router.replace(`${pathname}?${params.toString()}`);
	};
	return { updateFilter };
}
