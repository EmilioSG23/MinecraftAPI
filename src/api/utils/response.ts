/** Shared JSON response helpers used by the API handlers. */
import { NextResponse } from "next/server";

const CACHE_HEADERS = {
	"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
};

/** Creates a successful cached JSON response. */
export const okJson = (data: unknown) => NextResponse.json(data, { headers: CACHE_HEADERS });

/** Creates a cached JSON error response with a message payload. */
export const errorJson = (message: string, status = 400) =>
	NextResponse.json({ message }, { status, headers: CACHE_HEADERS });
