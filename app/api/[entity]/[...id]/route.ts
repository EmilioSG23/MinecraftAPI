import { handleDataRequest } from "@/api/handler";
import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";

const ENTITY_DATA_FILES: Record<string, string> = {
	blocks: "blocks.json",
	items: "items.json",
	mobs: "mobs.json",
	biomes: "biomes.json",
	advancements: "advancements.json",
	structures: "structures.json",
};

export async function GET(req: NextRequest, context: any) {
	const { params } = await context;
	const entity = params?.entity;
	const id = params?.id as string[] | undefined;
	if (!ENTITY_DATA_FILES[entity]) {
		return new Response(JSON.stringify({ message: `Entity type '${entity}' not found.` }), {
			status: 404,
		});
	}
	const candidate = path.join(process.cwd(), "data", ENTITY_DATA_FILES[entity]);
	let datas: any[] = [];

	if (fs.existsSync(candidate)) {
		const raw = fs.readFileSync(candidate, "utf8");
		datas = JSON.parse(raw);
	} else {
		const rootDataPaths = [
			path.join(process.cwd(), "data.json"),
			path.join(process.cwd(), "data", "data.json"),
		];
		let loaded: any = null;
		for (const p of rootDataPaths) {
			if (fs.existsSync(p)) {
				const raw = fs.readFileSync(p, "utf8");
				loaded = JSON.parse(raw);
				break;
			}
		}
		if (loaded) {
			if (Array.isArray(loaded)) {
				datas = loaded;
			} else if (loaded[entity]) {
				datas = loaded[entity];
			} else if (loaded[entity + "s"]) {
				datas = loaded[entity + "s"];
			}
		}
	}

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
