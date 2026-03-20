/** Handler for collection list endpoints. */
import { okJson } from "@/api/utils/response";
import { NextRequest } from "next/server";

/**
 * Returns all entities adding their image endpoint URL.
 *
 * @param req Incoming request used to compute absolute image URLs.
 * @param datas Entity collection to expose.
 * @param entityType Entity collection name used to build image paths.
 * @returns JSON response with the full collection and image URLs.
 */
export async function listHandler<T extends { id: string }>(
	req: NextRequest,
	datas: T[],
	entityType: string,
) {
	const dataWithImage = datas.map((data) => ({
		...data,
		image: `${req.nextUrl.origin}/api/${entityType}/${data.id}/image`,
	}));
	return okJson(dataWithImage);
}
