/** Handler for id-based entity lookups and field extraction. */
import { errorJson, okJson } from "@/api/utils/response";

/**
 * Returns a full entity by id or a specific key from that entity.
 *
 * @param datas Entity collection to search.
 * @param id Entity identifier to resolve.
 * @param key Optional top-level property to extract from the entity.
 * @param entityType Optional entity label used in error messages.
 * @returns JSON response with the entity payload, projected field or a not found error.
 */
export async function itemHandler<T extends { id: string }>(
	datas: T[],
	id: string,
	key?: string,
	entityType?: string,
) {
	const data = datas.find((d) => d.id === id);
	if (!data) return errorJson(`${entityType || "Item"} with id ${id} not found.`, 404);

	if (key) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			return okJson({ id: id, [key]: (data as Record<string, unknown>)[key] });
		} else {
			return errorJson(`Key ${key} not exists in ${id}.`);
		}
	}

	return okJson(data);
}
