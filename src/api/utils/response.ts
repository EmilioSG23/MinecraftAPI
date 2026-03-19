import { NextResponse } from "next/server";

export const okJson = (data: unknown) => NextResponse.json(data);

export const errorJson = (message: string, status = 400) =>
	NextResponse.json({ message }, { status });
