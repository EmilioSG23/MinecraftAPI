import { errorJson, okJson } from "@/api/utils/response";

/**
 * Returns a full entity by id or a specific key from that entity.
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
