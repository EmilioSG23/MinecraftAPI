import { okJson } from "../utils/response";

export async function metaHandler<T>(datas: T[], segment: string) {
  if (segment === "count") return okJson(datas.length);
  if (segment === "keys") return okJson(Object.keys((datas[0] || {}) as Record<string, unknown>));
  return okJson(null);
}
