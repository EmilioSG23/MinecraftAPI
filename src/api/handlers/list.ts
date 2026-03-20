import { okJson } from "@/api/utils/response";
import { NextRequest } from "next/server";

/**
 * Returns all entities adding their image endpoint URL.
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
