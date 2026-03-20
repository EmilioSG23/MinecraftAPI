import { handleDataRequest } from "@/api/handler";
import { isEntityDataType, loadEntityData } from "@/api/utils/data";
import { NextRequest } from "next/server";

interface EntityPathRouteContext {
	params: Promise<{ entity: string; id?: string[] }>;
}

/** Handles /api/[entity]/[...id] requests. */
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

	// Normalize id: if undefined or [""] treat as empty array
	let pathSegments: string[] = [];
	if (id && !(id.length === 1 && id[0] === "")) {
		pathSegments = id;
	}
	return await handleDataRequest(req, datas, entity, pathSegments);
}
