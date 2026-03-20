import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const IMAGE_EXTENSIONS = ["png", "webp", "gif"];

/** Finds entity image buffer and mime type from public assets. */
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

/** Creates a binary image response with cache headers. */
export function imageResponse(buffer: Buffer, mimeType: string) {
	return new NextResponse(buffer, {
		headers: {
			"Content-Type": mimeType,
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	});
}
