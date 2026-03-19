import { findImageBuffer, imageResponse } from "../utils/image";
import { errorJson } from "../utils/response";

export async function imageHandler(entityType: string, id: string) {
	const result = await findImageBuffer(entityType, id);
	if (result) return imageResponse(result.imageBuffer, result.mimeType);
	return errorJson(`Image for ${id} not found.`, 404);
}
