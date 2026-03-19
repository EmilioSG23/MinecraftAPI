"use client";

import { Layout } from "@/layout/Layout";
import { ErrorPage } from "@/views/ErrorPage";

export default function NotFound() {
	return (
		<Layout>
			<ErrorPage />
		</Layout>
	);
}
