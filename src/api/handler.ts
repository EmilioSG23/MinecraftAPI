import { allHandler } from "@/api/handlers/all";
import { imageHandler } from "@/api/handlers/image";
import { itemHandler } from "@/api/handlers/item";
import { listHandler } from "@/api/handlers/list";
import { metaHandler } from "@/api/handlers/meta";
import { errorJson } from "@/api/utils/response";
import { NextRequest } from "next/server";

/**
 * Routes entity API requests to the proper specialized handler.
 */
export async function handleDataRequest<T extends { id: string }>(
	req: NextRequest,
	datas: T[],
	entityType: string,
	pathSegments: string[],
) {
	// GET /api/[entity]/
	if (pathSegments.length === 0 || (pathSegments.length === 1 && pathSegments[0] === "")) {
		return listHandler(req, datas, entityType);
	}

	const first = pathSegments[0];

	// meta endpoints (count, keys)
	if (first === "count" || first === "keys") {
		return metaHandler(datas, first);
	}

	// /all/:key or /all/:key/:value
	if (first === "all") {
		const key = pathSegments[1];
		const value = pathSegments[2];
		if (!key) return errorJson("Key required", 400);
		return allHandler(datas, key, value);
	}

	// id-based routes
	const id = first;
	const second = pathSegments[1];

	// /:id/image
	if (second === "image") {
		const exists = datas.find((d) => d.id === id);
		if (!exists) return errorJson(`${entityType} with id ${id} not found.`, 404);
		return imageHandler(entityType, id);
	}

	// /:id or /:id/:key
	return itemHandler(datas, id, second, entityType);
}
