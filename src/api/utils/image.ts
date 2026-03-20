/** Image resolution helpers for entity asset endpoints. */
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const IMAGE_EXTENSIONS = ["png", "webp", "gif"];

/**
 * Searches the public asset directory for an entity image in the supported formats.
 *
 * @param entityType Entity collection name used as the image directory.
 * @param id Entity identifier used as the image filename.
 * @returns Image buffer and MIME type when found, otherwise null.
 */
export async function findImageBuffer(entityType: string, id: string) {
	const basePath = path.join(process.cwd(), "public", "information", entityType.toLowerCase(), id);
	for (const ext of IMAGE_EXTENSIONS) {
		const imagePath = `${basePath}.${ext}`;
		try {
			const imageBuffer = await readFile(imagePath);
			const mimeType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/gif";
			return { imageBuffer, mimeType } as const;
		} catch {
			continue;
		}
	}
	return null;
}

/**
 * Wraps a raw image buffer in a Next.js response with cache headers.
 *
 * @param buffer Binary image content.
 * @param mimeType Response MIME type derived from the detected image extension.
 * @returns Cached binary response.
 */
export function imageResponse(buffer: Buffer, mimeType: string) {
	return new NextResponse(buffer, {
		headers: {
			"Content-Type": mimeType,
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	});
}
