/** Information feature constants. */

/** Standard fetch lifecycle labels used by the information data hooks. */
export const FETCH_STATUS = {
	LOADED: "loaded",
	LOADING: "loading",
	ERROR: "error",
} as const;

/** Union of all possible fetch status values exposed by the information data hooks. */
export type FetchStatus = (typeof FETCH_STATUS)[keyof typeof FETCH_STATUS];
