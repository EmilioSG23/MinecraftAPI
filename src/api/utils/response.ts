import { NextResponse } from "next/server";

const CACHE_HEADERS = {
	"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
};

export const okJson = (data: unknown) => NextResponse.json(data, { headers: CACHE_HEADERS });

export const errorJson = (message: string, status = 400) =>
	NextResponse.json({ message }, { status, headers: CACHE_HEADERS });
