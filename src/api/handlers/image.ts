/** Handler for image asset requests. */
import { findImageBuffer, imageResponse } from "@/api/utils/image";
import { errorJson } from "@/api/utils/response";

/**
 * Resolves and returns the binary image for a concrete entity id.
 *
 * @param entityType Entity collection name used to resolve the public folder path.
 * @param id Entity identifier used as the image filename.
 * @returns Binary image response or a JSON error when the asset is missing.
 */
export async function imageHandler(entityType: string, id: string) {
	const result = await findImageBuffer(entityType, id);
	if (result) return imageResponse(result.imageBuffer, result.mimeType);
	return errorJson(`Image for ${id} not found.`, 404);
}
