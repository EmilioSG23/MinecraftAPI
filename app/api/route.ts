/** Root API health-check endpoint. */
import { NextResponse } from "next/server";

/**
 * Returns a welcome payload that confirms the API is reachable.
 *
 * @returns JSON health-check response.
 */
export async function GET() {
	return NextResponse.json({ message: "Welcome to Minecraft API" });
}
