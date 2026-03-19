import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const IMAGE_EXTENSIONS = ["png", "webp", "gif"];

export async function findImageBuffer(entityType: string, id: string) {
	const basePath = path.join(process.cwd(), "public", "information", entityType.toLowerCase(), id);
	for (const ext of IMAGE_EXTENSIONS) {
		const imagePath = `${basePath}.${ext}`;
		if (fs.existsSync(imagePath)) {
			const imageBuffer = fs.readFileSync(imagePath);
			const mimeType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/gif";
			return { imageBuffer, mimeType } as const;
		}
	}
	return null;
}

export function imageResponse(buffer: Buffer, mimeType: string) {
	return new NextResponse(buffer, { headers: { "Content-Type": mimeType } });
}
