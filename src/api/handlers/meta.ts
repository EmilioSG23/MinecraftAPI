import { okJson } from "@/api/utils/response";

/**
 * Returns computed metadata for a collection (count or keys).
 */
export async function metaHandler<T>(datas: T[], segment: string) {
	if (segment === "count") return okJson(datas.length);
	if (segment === "keys") return okJson(Object.keys((datas[0] || {}) as Record<string, unknown>));
	return okJson(null);
}
