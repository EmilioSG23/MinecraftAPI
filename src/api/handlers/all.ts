/** Handler for projection and key/value filtered entity queries. */
import { errorJson, okJson } from "@/api/utils/response";

/**
 * Returns all values of a key or key/value filtered entries.
 *
 * @param datas Entity collection to inspect.
 * @param key Top-level property name to project or filter.
 * @param expectedValue Optional value used for strict string filtering.
 * @returns JSON response containing the projected collection or a validation error.
 */
export async function allHandler<T extends { id: string }>(
	datas: T[],
	key: string,
	expectedValue?: string,
) {
	if (!expectedValue) {
		const datasByKey = datas
			.map((data: T & Record<string, unknown>) => ({ id: data.id, [key]: data[key] }))
			.filter((item) => item[key] !== undefined);

		if (datasByKey.length > 0) return okJson(datasByKey);
		return errorJson(`Key ${key} not exists.`);
	}

	const datasByKey = datas.filter(
		(item: T & Record<string, unknown>) =>
			item[key] !== undefined && String(item[key]) === expectedValue,
	);

	if (datasByKey.length > 0) return okJson(datasByKey);
	return errorJson(`Key ${key} not exists.`);
}
