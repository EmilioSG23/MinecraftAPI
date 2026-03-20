import { NextResponse } from "next/server";

/** Healthcheck endpoint for Minecraft API root. */
export async function GET() {
	return NextResponse.json({ message: "Welcome to Minecraft API" });
}
