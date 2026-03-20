import { findImageBuffer, imageResponse } from "@/api/utils/image";
import { errorJson } from "@/api/utils/response";

/** Returns image binary response for an entity id. */
export async function imageHandler(entityType: string, id: string) {
	const result = await findImageBuffer(entityType, id);
	if (result) return imageResponse(result.imageBuffer, result.mimeType);
	return errorJson(`Image for ${id} not found.`, 404);
}
