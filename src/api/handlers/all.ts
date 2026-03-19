import { errorJson, okJson } from "../utils/response";

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
    (item: T & Record<string, unknown>) => item[key] !== undefined && String(item[key]) === expectedValue,
  );

  if (datasByKey.length > 0) return okJson(datasByKey);
  return errorJson(`Key ${key} not exists.`);
}
