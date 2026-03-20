import { handleDataRequest } from "@/api/handler";
import { isEntityDataType, loadEntityData } from "@/api/utils/data";
import { NextRequest } from "next/server";

interface EntityRouteContext {
	params: Promise<{ entity: string }>;
}

/** Handles /api/[entity] requests. */
export async function GET(req: NextRequest, context: EntityRouteContext) {
	const { entity } = await context.params;
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

	return await handleDataRequest(req, datas, entity, []);
}
