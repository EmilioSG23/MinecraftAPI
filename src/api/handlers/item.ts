import { errorJson, okJson } from "../utils/response";

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
