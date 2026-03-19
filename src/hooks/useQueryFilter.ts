"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useQueryFilter(paramName: string, setFilter: (key: string, value: string) => void) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		setFilter(paramName, searchParams.get(paramName) || "");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paramName, searchParams]);

	const updateFilter = (value: string, key: string) => {
		setFilter(key, value);
		const params = new URLSearchParams(searchParams.toString());
		params.set(paramName, value);
		router.replace(`${pathname}?${params.toString()}`);
	};
	return { updateFilter };
}
