/** Route handler for nested entity endpoints such as /api/blocks/stone/image. */
import { handleDataRequest } from "@/api/handler";
import { isEntityDataType, loadEntityData } from "@/api/utils/data";
import { NextRequest } from "next/server";

interface EntityPathRouteContext {
	params: Promise<{ entity: string; id?: string[] }>;
}

/**
 * Normalizes nested path segments and dispatches the request to the shared entity router.
 *
 * @param req Incoming Next.js request.
 * @param context Route parameters containing the entity and optional nested path segments.
 * @returns Item response, metadata response, image response or an error payload.
 */
export async function GET(req: NextRequest, context: EntityPathRouteContext) {
	const { entity, id } = await context.params;
	if (!isEntityDataType(entity)) {
		return new Response(JSON.stringify({ message: `Entity type '${entity}' not found.` }), {
			status: 404,
		});
	}

	const datas = await loadEntityData(entity);

	if (!datas || datas.length === 0) {
		return new Response(JSON.stringify({ message: `Data file for '${entity}' not found.` }), {
			status: 404,
		});
	}

	/** Normalizes empty catch-all parameters to the same shape used by the base collection route. */
	let pathSegments: string[] = [];
	if (id && !(id.length === 1 && id[0] === "")) {
		pathSegments = id;
	}
	return await handleDataRequest(req, datas, entity, pathSegments);
}
