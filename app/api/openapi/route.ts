import { buildOpenApiDocument } from "@/api/openapi";
import { NextResponse } from "next/server";

/**
 * Serves the generated OpenAPI document used by the in-app documentation endpoint.
 *
 * @returns JSON representation of the API contract.
 */
export async function GET() {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

	return NextResponse.json(buildOpenApiDocument(siteUrl), {
		headers: {
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	});
}
