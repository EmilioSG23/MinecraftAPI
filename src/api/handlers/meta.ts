/** Handler for metadata endpoints such as count and keys. */
import { okJson } from "@/api/utils/response";

/**
 * Returns computed metadata for a collection (count or keys).
 *
 * @param datas Entity collection used to derive metadata.
 * @param segment Metadata selector supported by the API.
 * @returns JSON response with the requested metadata payload.
 */
export async function metaHandler<T>(datas: T[], segment: string) {
	if (segment === "count") return okJson(datas.length);
	if (segment === "keys") return okJson(Object.keys((datas[0] || {}) as Record<string, unknown>));
	return okJson(null);
}
